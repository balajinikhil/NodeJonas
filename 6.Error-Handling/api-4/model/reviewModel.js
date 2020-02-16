const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, "Review cannot be empty"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tours",
      required: [true, "Tour cannot be empty"]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "User cannot be empty"]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//POPULATE TOUR AND USERS
reviewSchema.pre(/^find/, async function(next) {
  // this.populate({
  //   path: "tour",
  //   select: "name"
  // });

  this.populate({
    path: "user",
    select: "name photo"
  });

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
