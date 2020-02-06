const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "name is required"],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, "duration is required"]
  },
  maxGroupSize: {
    type: Number,
    required: [true, "group size is required"]
  },
  difficulty: {
    type: String,
    required: [true, "difficulty is required"]
  },
  ratingsAverage: {
    type: Number
  },
  ratingsQuantity: {
    type: Number
  },
  price: {
    type: Number,
    required: [true, "price is required"]
  },
  priceDiscount: {
    type: Number
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "summary is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  imageCover: {
    type: String,
    required: [true, "cover image is required"]
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});

const Tour = mongoose.model("tours", tourSchema);

module.exports = Tour;
