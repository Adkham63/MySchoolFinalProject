const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const Comment = require("./models/Comments.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const mime = require("mime-types");
const path = require("path"); // Import path module
require("dotenv").config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
const bucket = "myschoollc";

// Middleware to parse JSON request bodies
app.use(express.json());

app.use(cookieParser()); //cookieParser
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

console.log(process.env.MONGO_URL);

async function uploadToS3(path, originalFileName, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFileName.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

// Test route
app.get("/test", (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  res.json("test ok");
});

// Registration route
app.post("/api/register", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) {
            console.log("JWT error:", err);
            return res.status(500).json("JWT error");
          }
          res
            .cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
            .json(userDoc);
        }
      );
    } else {
      res.status(422).json("Wrong password");
    }
  } else {
    res.status(404).json("User not found");
  }
});

app.get("/api/profile", (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const filePath = path.join("/tmp", newName); // Corrected file path

  try {
    // Download the image
    await imageDownloader.image({
      url: link,
      dest: filePath,
    });

    // Upload to S3
    const mimeType = mime.lookup(filePath); // Correct MIME type lookup
    const url = await uploadToS3(filePath, newName, mimeType); // Corrected function call

    console.log("Image downloaded and saved:", filePath);
    res.json(url); // Send back the S3 URL
  } catch (err) {
    console.error("Error downloading image:", err);
    res.status(500).json({
      error: "Failed to download image",
      details: err.message,
    });
  }
});

const photosMiddleware = multer({ dest: "/tmp" }); // Fix path
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path: filePath, originalname, mimetype } = req.files[i];
      // const ext = path.extname(originalname); // Use path.extname to get file extension
      // const newPath = path.join(__dirname, "uploads", `${Date.now()}${ext}`); // Ensure correct path
      // fs.renameSync(filePath, newPath);
      // uploadedFiles.push(`/uploads/${path.basename(newPath)}`); // Fix path to be accessible via URL
      const url = await uploadToS3(filePath, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles); // Send the corrected paths
  }
);

// Place Creation
app.post("/api/places", (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) return res.status(403).json("Invalid token");

    try {
      const placeDoc = await Place.create({
        owner: userData.id,
        price,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(placeDoc);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Failed to create place", details: err.message });
    }
  });
});

// Fetch User's Places
app.get("/api/user-places", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  if (!token) return res.status(401).json("Unauthorized");

  try {
    // Verify JWT token
    const userData = jwt.verify(token, jwtSecret);

    // Fetch places owned by the user
    const places = await Place.find({ owner: userData.id });

    // Respond with the places
    res.json(places);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch places", details: err.message });
  }
});

app.get("/api/places/:id", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/api/places/:id", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (!token) {
    return res.status(401).json("Unauthorized: No token provided");
  }

  try {
    // Verify the JWT token
    const userData = jwt.verify(token, jwtSecret);

    // Use req.params.id to get the place ID from the URL
    const placeDoc = await Place.findById(req.params.id); // Correct way to access the 'id'

    // Check if the place exists
    if (!placeDoc) {
      return res.status(404).json("Place not found");
    }

    // Check if the logged-in user is the owner of the place
    if (userData.id !== placeDoc.owner.toString()) {
      return res
        .status(403)
        .json("Unauthorized: You are not the owner of this place");
    }

    // Update the place with the new data
    placeDoc.set({
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    // Save the updated place
    await placeDoc.save();

    // Send a success response
    res.json("Place updated successfully");
  } catch (err) {
    // Handle errors (invalid token, database errors, etc.)
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.get("/api/places", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find());
});

app.post("/api/booking", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json("Unauthorized: No token provided");
  }

  try {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;

    // Create a new booking
    const booking = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });

    // Respond with the newly created booking
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res
      .status(500)
      .json({ error: "Failed to create booking", details: err.message });
  }
});

app.get("/api/bookings", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);

  try {
    const bookings = await Booking.find({ user: userData.id }).populate(
      "place"
    );
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch bookings", details: err.message });
  }
});

// Fetch all comments
app.get("/api/comments", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// Add a new comment
app.post("/api/comments", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { text } = req.body;
  try {
    const newComment = await Comment.create({ text });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to save comment" });
  }
});

// Delete a booking by ID
app.delete("/api/bookings/:id", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking successfully canceled" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

// Delete a place (teacher profile) and related bookings
app.delete("/api/places/:id", async (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;

  try {
    // Delete related bookings
    await Booking.deleteMany({ place: id });

    // Delete the teacher profile (place)
    await Place.findByIdAndDelete(id);

    res.status(200).send("Place and related bookings deleted successfully");
  } catch (error) {
    console.error("Error deleting place and bookings:", error);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
