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

//tours-within/500/center/40,44/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;

  [lat, lng] = latlng.split(",");

  const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    return next(new AppError("Please provide in the format lat,lng", 400));
  }

  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: "sucess",
    result: tours.length,
    data: {
      data: tours
    }
  });
});

//distances/40,44/unit/mi
exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(",");

  const multiplier = unit === "mi" ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide latitutr and longitude in the format lat,lng.",
        400
      )
    );
  }

  const distances = await Tour.aggregate([
    {
      $geoNear: {
        key: "startLocation",
        near: {
          type: "Point",
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: "distance",
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    status: "success",
    data: {
      data: distances
    }
  });
});
