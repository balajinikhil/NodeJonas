const Tour = require("./../model/tourModel");
const APIfeatures = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");

//GET ALL TOURS
exports.getTours = catchAsync(async (req, res, next) => {
  const feature = new APIfeatures(Tour.find(), req.query)
    .find()
    .sort()
    .pagenation();

  const tours = await feature.query;
  res.status(200).json({
    status: "sucess",
    tours
  });
});

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
