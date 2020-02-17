const Review = require("./../model/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "sucess",
    result: reviews.length,
    data: {
      reviews
    }
  });
});

exports.setTourUserId = (req, res, next) => {
  //NESTED ROUTES adding default tour and user
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

exports.addReviews = factory.createOne(Review);

exports.deleteReviewById = factory.deleteOne(Review);
exports.updateReviewById = factory.updateOne(Review);
