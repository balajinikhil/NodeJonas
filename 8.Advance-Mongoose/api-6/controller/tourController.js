const Tour = require("./../model/tourModel");
const APIfeatures = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

//GET ALL TOURS
exports.getTours = factory.getAll(Tour);

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const stats = await Tour.aggregate([
    {
      $unwind: "$startDates"
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}/01/01`),
          $lte: new Date(`${year}/12/31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: "$startDates" },
        numTours: { $sum: 1 },
        tours: { $push: "$name" }
      }
    },
    {
      $sort: {
        numTours: -1
      }
    }
  ]);

  res.status(200).json({
    status: "sucess",
    stats
  });
});

exports.createTour = factory.createOne(Tour);

exports.getTourById = factory.getOne(Tour, { path: "reviews" });

exports.updateTourById = factory.updateOne(Tour);

exports.deleteTourById = factory.deleteOne(Tour);

exports.top5Tours = catchAsync(async (req, res, next) => {
  req.query.sort = "-ratingsAverage,price";
  req.query.limit = 5;
  req.query.fields = "ratingsAverage,price,name,difficulty";

  next();
});
