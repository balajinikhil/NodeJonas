const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Tour requires a name"]
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: true
  }
});

const Tour = new mongoose.model("Tour", tourSchema);

module.exports = Tour;
