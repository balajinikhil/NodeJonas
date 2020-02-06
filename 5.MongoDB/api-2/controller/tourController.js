const Tour = require("../model/tourModel");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = 5;
  (req.query.sort = "-ratingsAverage,price"),
    (req.query.fields = "ratingsAverage,price,summary,difficulty");

  next();
};

exports.getTour = async (req, res) => {
  try {
    //BUILD QUERY       /tours?duration=10
    const queryObj = { ...req.query };

    const excludedFields = ["page", "sort", "limit", "fields", "skip"];
    excludedFields.forEach(ele => {
      delete queryObj[ele];
    });

    //USE QUERY
    let query = Tour.find(queryObj);
    //db.tour.find({duration:10})

    //ADVANCE FILTER      /tours?duration[gt]=5

    /*
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt| gte | lt | lte)\b/g,
      match => `$${match}`
    );

    query = Tour.find(JSON.parse(queryString));
*/

    //SORT    + ascending - descending
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("createdAt");
    }

    //LIMITING FIELDS       /tours?fields=name,price
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");

      query = query.select(fields);
    } else {
      query = query.select("-v");
    }

    //PAGENATION tours?page=2&limit=10

    const page = req.query.page * 1 || 1;
    const limit = req.query.skip * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTour = await Tour.countDocuments();

      if (skip > numTour) {
        throw new Error("Limit Exceeded");
      }
    }

    //SEND RESPONSE
    const tours = await query;
    res.status(200).json({
      status: "sucess",
      length: tours.length,
      tours
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    let newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      tours: newTour
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      msg: err
    });
  }
};

exports.getTourId = async (req, res) => {
  try {
    console.log(req.params.id);
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "sucess",
      tour
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const upTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(202).json({
      status: "sucess",
      tour: upTour
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
    const delTour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "sucess",
      tour: null
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      msg: err
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Tour.deleteMany();

    res.status(204).json({
      msg: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      msg: err
    });
  }
};
