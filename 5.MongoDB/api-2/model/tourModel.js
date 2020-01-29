const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "name is required"]
  },
  rating: {
    default: 4.5,
    type: Number
  },
  price: {
    type: Number,
    required: [true, "price is required"]
  }
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;
