const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const Comment = require("./models/Comments.js");
const ForumPost = require("./models/ForumPost.js");
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
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) return reject(err);

      if (userData.id === "admin") {
        return resolve({
          id: "admin",
          email: process.env.VITE_ADMIN_EMAIL,
          role: "admin",
          name: process.env.ADMIN_NAME || "Admin",
        });
      }

      const user = await User.findById(userData.id);
      if (!user) return reject("User not found");
      resolve(user);
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

// Connect to MongoDB once at startup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/test", (req, res) => {
  // Connect to MongoDB (Only need this once)
  mongoose.connect(process.env.MONGO_URL);
  res.json("test ok");
});

// Registration route
app.post("/api/register", async (req, res) => {
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

// Update login routes
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin login
  if (
    email === process.env.VITE_ADMIN_EMAIL &&
    password === process.env.VITE_ADMIN_PASSWORD
  ) {
    const adminUser = {
      id: "admin",
      name: process.env.ADMIN_NAME || "Admin",
      email: process.env.VITE_ADMIN_EMAIL,
      role: "admin",
    };

    jwt.sign(
      { email: adminUser.email, id: adminUser.id, role: "admin" },
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
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            path: "/",
            domain: "localhost", // Add this for local development
          })
          .json(adminUser);
      }
    );
    return;
  }

  // Regular user login
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
              sameSite: "lax",
              maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
              path: "/",
              domain: "localhost", // Add this for local development
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

// Profile route (returns admin data if token corresponds to admin)
app.get("/api/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json(null); // Explicit 401 for no token
  }

  try {
    const userData = jwt.verify(token, jwtSecret);
    console.log("Decoded user data:", userData);

    // Check for admin first
    if (userData.email === process.env.VITE_ADMIN_EMAIL) {
      return res.json({
        id: "admin",
        name: process.env.ADMIN_NAME || "Admin",
        email: process.env.VITE_ADMIN_EMAIL,
        role: "admin",
      });
    }

    // Regular user lookup
    const user = await User.findOne({ email: userData.email });
    if (!user) return res.status(404).json(null);

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: "user",
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.clearCookie("token");
    res.status(401).json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// Upload-by-link route
app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const filePath = path.join("/tmp", newName);
  try {
    await imageDownloader.image({ url: link, dest: filePath });
    const mimeType = mime.lookup(filePath);
    const url = await uploadToS3(filePath, newName, mimeType);
    console.log("Image downloaded and saved:", filePath);
    res.json(url);
  } catch (err) {
    console.error("Error downloading image:", err);
    res.status(500).json({
      error: "Failed to download image",
      details: err.message,
    });
  }
});

// Upload via file route
const photosMiddleware = multer({ dest: "/tmp" });
app.post(
  "/api/upload",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path: filePath, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(filePath, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  }
);

// Place Creation route
app.post("/api/places", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const userData = jwt.verify(token, jwtSecret);

    // Validate required fields
    const requiredFields = [
      "title",
      "address",
      "description",
      "levels",
      "checkIn",
      "checkOut",
      "maxGuests",
      "price",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields,
      });
    }

    const placeData = {
      ...req.body,
      owner: userData.id, // Add owner from token
      price: Number(req.body.price),
      maxGuests: Number(req.body.maxGuests),
    };

    const placeDoc = await Place.create(placeData);
    res.status(201).json(placeDoc);
  } catch (err) {
    console.error("Error creating place:", err);
    res.status(500).json({
      error: "Failed to create place",
      details: err.message,
    });
  }
});
// Fetch User's Places route
app.get("/api/user-places", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json("Unauthorized");

  try {
    const userData = jwt.verify(token, jwtSecret);
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    let places, total;

    // For admin - get all places with owner info
    if (userData.id === "admin" || userData.role === "admin") {
      [places, total] = await Promise.all([
        Place.find().skip(skip).limit(limit).lean(),
        Place.countDocuments(),
      ]);

      const userIds = places
        .filter((place) => place.owner !== "admin")
        .map((place) => place.owner);

      const owners = await User.find({ _id: { $in: userIds } }).select(
        "name email"
      );
      const ownerMap = owners.reduce((acc, user) => {
        acc[user._id.toString()] = user;
        return acc;
      }, {});

      places = places.map((place) => ({
        ...place,
        ownerInfo:
          place.owner === "admin"
            ? {
                id: "admin",
                name: process.env.ADMIN_NAME || "Admin",
                email: process.env.VITE_ADMIN_EMAIL,
              }
            : ownerMap[place.owner.toString()] || {
                name: "Unknown",
                email: "",
              },
      }));
    } else {
      // For regular users - only their places
      [places, total] = await Promise.all([
        Place.find({ owner: userData.id }).skip(skip).limit(limit),
        Place.countDocuments({ owner: userData.id }),
      ]);
    }

    res.json({
      success: true,
      places,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

// Get Place by ID route
app.get("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
});

// Update Place route
app.put("/api/places/:id", async (req, res) => {
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
    levels,
  } = req.body;
  if (!token) return res.status(401).json("Unauthorized: No token provided");

  try {
    const userData = jwt.verify(token, jwtSecret);
    const placeDoc = await Place.findById(req.params.id);
    if (!placeDoc) return res.status(404).json("Place not found");
    if (userData.id !== placeDoc.owner.toString())
      return res
        .status(403)
        .json("Unauthorized: You are not the owner of this place");

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
      levels,
    });
    await placeDoc.save();
    res.json("Place updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Get all Places route
app.get("/api/places", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// Booking routes
app.post("/api/booking", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json("Unauthorized: No token provided");
  try {
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
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
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res
      .status(500)
      .json({ error: "Failed to create booking", details: err.message });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    let bookings;
    if (userData.id === "admin") {
      // Для администратора: все бронирования с данными пользователя и места
      bookings = await Booking.find()
        .populate("place")
        .populate("user", "name email");
    } else {
      // Для обычных пользователей: только их бронирования
      bookings = await Booking.find({ user: userData.id }).populate("place");
    }

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({
      error: "Failed to fetch bookings",
      details: err.message,
    });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking successfully canceled" });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
});

// Delete Place and its related bookings
app.delete("/api/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.deleteMany({ place: id });
    await Place.findByIdAndDelete(id);
    res.status(200).send("Place and related bookings deleted successfully");
  } catch (error) {
    console.error("Error deleting place and bookings:", error);
    res.status(500).send("Server error");
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

// Add this route to handle likes
app.post("/api/comments/:id/like", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL); // Ensure connection
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    comment.likes = (comment.likes || 0) + 1; // Increment likes
    await comment.save();
    res.json({ likes: comment.likes });
  } catch (error) {
    console.error("Error liking comment:", error);
    res.status(500).json({ error: "Failed to like comment" });
  }
});

// Forum Routes
app.get("/api/forum", async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch forum posts" });
  }
});

app.post("/api/forum", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { title, content, category } = req.body;

  const post = await ForumPost.create({
    title,
    content,
    author: userData.id,
    category,
  });

  res.status(201).json(post);
});

app.post("/api/forum/:postId/replies", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { content } = req.body;

  const post = await ForumPost.findByIdAndUpdate(
    req.params.postId,
    { $push: { replies: { content, author: userData.id } } },
    { new: true }
  ).populate("replies.author", "name");

  res.json(post);
});

// Add to index.js
app.get("/api/forum/:postId", async (req, res) => {
  const post = await ForumPost.findById(req.params.postId)
    .populate("author", "name")
    .populate("replies.author", "name");
  res.json(post);
});

// Start the server
app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
