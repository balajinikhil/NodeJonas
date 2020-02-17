const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIfeature = require("./../utils/apiFeature");

exports.deleteOne = Model => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("cannot find document", 404));
    }

    res.status(205).json({
      status: "sucess",
      data: null
    });
  });
};

exports.updateOne = Model => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError("cannot find document ", 404));
    }

    res.status(201).json({
      status: "sucess",
      data: doc
    });
  });
};

exports.createOne = Model => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError("Something went wrong try again", 500));
    }

    res.status(201).json({
      status: "sucess",
      data: doc
    });
  });
};

exports.getOne = (Model, popOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("cannot find document", 404));
    }

    res.status(200).json({
      status: "sucess",
      data: doc
    });
  });
};

exports.getAll = Model => {
  return catchAsync(async (req, res, next) => {
    const features = new APIfeature(Model.find(), req.query)
      .find()
      .sort()
      .pagenation();

    const doc = await features.query;

    if (!doc) {
      return next("Something went wrong ", 500);
    }

    res.status(200).json({
      status: "sucess",
      result: doc.length,
      data: doc
    });
  });
};
