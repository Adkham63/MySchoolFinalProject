const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  text: String,
  likes: {
    type: Number,
    default: 0, // Ensure default value for new comments
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
