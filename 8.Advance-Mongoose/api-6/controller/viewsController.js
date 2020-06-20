const Tour = require("./../model/tourModel");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  //1.get tour data from collection
  const tours = await Tour.find();

  //2.Build template

  //3.render the template using tour data form 1
  res.status(200).render("overview", {
    title: "All tours",
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user"
  });

  res.status(200).render("tour", {
    title: tour.name,
    tour
  });
});

exports.logInForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login"
  });
});
