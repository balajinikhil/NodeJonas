const Tour = require("./../model/tourModel");

exports.getAllTours = async (req, res) => {
  const tour = await Tour.find();

  res.status(200).json({
    status: "sucess",
    length: tour.length,
    tour
  });
};
