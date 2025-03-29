const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    // Добавляем кастомную валидацию
    validate: {
      validator: function (v) {
        return typeof v === "string" || mongoose.Types.ObjectId.isValid(v);
      },
      message: (props) => `${props.value} is not a valid owner ID!`,
    },
  },
  title: { type: String, required: true },
  address: { type: String, required: true },
  addedPhotos: [String],
  description: { type: String, required: true },
  perks: [String],
  extraInfo: String,
  levels: {
    type: [String],
    enum: ["Beginner", "Intermediate", "Advanced", "IELTS"],
    required: true,
  },
  checkIn: { type: String, required: true }, // Changed to String
  checkOut: { type: String, required: true }, // Changed to String
  maxGuests: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
