const Tour = require("./../model/tourModel");

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.send(200).json({
      status: "sucess",
      tour: newTour
    });
  } catch (err) {
    res.send(400).json({
      status: "failed",
      msg: err
    });
  }
};

exports.getTour = (req, res) => {
  res.status(200).json({ msg: "working" });
};
