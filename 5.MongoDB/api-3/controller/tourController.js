const Tour = require("../model/tourModel");
const APIfeatures = require("../util/apiFeatures");

exports.top5 = (req, res, next) => {
  req.query;
  req.query.sort = "-ratingsAverage";
  req.query.limit = 5;
  req.query.field = "name,duration,difficulty,summary";

  next();
};

exports.getTours = async (req, res) => {
  try {
    const features = new APIfeatures(Tour.find(), req.query)
      .find()
      .sort()
      .limitingFields()
      .pagination();

    const tours = await features.query;

    res.status(200).json({
      status: "sucess",
      tours
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      tours: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.getTourId = async (req, res) => {
  try {
    const tourId = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "sucess",
      tour: tourId
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(202).json({
      status: "sucess",
      tours: updateTour
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const del = await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "sucess",
      del: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4 } }
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsAverage" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // { $match: { _id: { $ne: "EASY" } } }
    ]);

    res.status(200).json({
      status: "sucess",
      data: { stats }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};

exports.monthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const stats = await Tour.aggregate([
      {
        $unwind: "$startDates"
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" }
        }
      },
      { $addFields: { month: "$_id" } },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: "sucess",
      plan: { stats }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};
