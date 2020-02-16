const Review = require("./../model/reviewModel");
const catchAsync = require("./../utils/catchAsync");

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

exports.addReviews = catchAsync(async (req, res, next) => {
  //NESTED ROUTES
  if (!req.body.tour) {
    req.body.tour = req.params.tourId;
  }

  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "sucess",
    newReview
  });
});
