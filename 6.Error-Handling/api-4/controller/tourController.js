const Tour = require("./../model/tourModel");
const APIfeatures = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

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

exports.postTours = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "sucess",
    newTour
  });
});

exports.getTourById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);

  if (!tour) {
    return next(new AppError("cannot find ", 404));
  }

  res.status(200).json({
    status: "sucess",
    tour
  });
});

exports.updateTourById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updated = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    return next(new AppError("cannot find ", 404));
  }

  res.status(201).json({
    status: "sucess",
    updated
  });
});

exports.deleteTourById = catchAsync(async (req, res, next) => {
  const del = await Tour.findByIdAndDelete(req.params.id);

  if (!del) {
    return next(new AppError("cannot find", 404));
  }

  res.status(205).json({
    status: null
  });
});
