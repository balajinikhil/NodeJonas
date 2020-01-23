const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours.json`, "UTF-8")
);

exports.createTour = (req, res) => {
  let newId = tours[tours.length - 1].id + 1;
  let newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../data/tours.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({ status: "Sucessfull", tours: [newTour] });
    }
  );
};

exports.getTours = (req, res) => {
  res.status(200).json({ msg: "sucess", length: tours.length, tours: tours });
};

exports.getTour = (req, res) => {
  let id = req.params.id;

  let tour = tours.filter(ele => {
    return ele.id == id;
  });

  res.status(201).json({ msg: "sucess", tour });
};

exports.editTour = (req, res) => {
  let id = req.params.id;

  res.status(201).json({ status: "sucess" });
};

exports.deleteTour = (req, res) => {
  let id = req.params.id;

  tours.forEach(ele => {
    if (ele.id == id) {
      let index = tours.indexOf(ele);
      let del = tours.splice(index, 1);
      fs.writeFile(
        `${__dirname}/../data/tours.json`,
        JSON.stringify(tours),
        err => {
          res.status(200).json({
            status: "deleted",
            tours: del
          });
        }
      );
    }
  });
};

exports.checkBody = (req, res, next) => {
  let data = req.body;
  if (data.name && data.price) {
    next();
  } else {
    return res.status(400).json({
      status: "failed",
      msg: "missing name or price"
    });
  }
};

exports.checkId = (req, res, next, val) => {
  if (val * 1 > tours.length - 1) {
    return res.status(404).json({ status: "failed", msg: "file not found" });
  } else {
    next();
  }
};
