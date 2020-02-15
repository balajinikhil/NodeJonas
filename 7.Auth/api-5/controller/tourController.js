const Tour = require("./../model/tourModel");
const APIfeature = require("./../utils/apiFeature");
const catchAsync = require("./../utils/catchAsync");

module.exports.getAllTours = async (req, res) => {
  console.log(req.query);

  const features = new APIfeature(Tour.find(), req.query)
    .find()
    .sort()
    .pageination()
    .limitField();

  const tours = await features.query;

  res.status(200).json({
    status: "sucess",
    tours
  });
};
