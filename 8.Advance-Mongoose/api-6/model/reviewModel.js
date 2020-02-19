const mongoose = require("mongoose");
const Tour = require("./tourModel");

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

//CALCULATE AVERAGE TOUR RATINGS
reviewSchema.statics.calcAverageRatings = async function(tourId) {
  //this points to model in static
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: "$tour",
        nRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    }
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].nRatings
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 0
    });
  }
};

//since agregate must be used on model we post save
reviewSchema.post("save", function() {
  //should add to model so instead adding to constructor
  this.constructor.calcAverageRatings(this.tour);
});

//RATING AVERAGE FOR UPDATE AND DELETE we don't have document middelware so we have to use query middelware
reviewSchema.pre(/^findOne/, async function(next) {
  this.r = await this.findOne();
  next();
});
reviewSchema.post(/^findOne/, async function() {
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

//DUPLICATE REVIEW
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
