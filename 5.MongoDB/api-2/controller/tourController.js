const Tour = require("../model/tourModel");

exports.getTour = (req, res) => {
  res.status(200).json({ msg: "working 1" });
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
