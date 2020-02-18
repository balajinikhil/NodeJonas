const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId
  }
});
