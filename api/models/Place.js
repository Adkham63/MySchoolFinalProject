const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  address: { type: String, required: true },
  addedPhotos: [String],
  description: { type: String, required: true },
  perks: [String],
  extraInfo: String,
  checkIn: { type: String, required: true }, // Changed to String
  checkOut: { type: String, required: true }, // Changed to String
  maxGuests: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
