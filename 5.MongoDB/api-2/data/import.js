const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("../model/tourModel");

dotenv.config({ path: "../config.env" });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

// const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(`DB couldn't connect ${err}`);
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "UTF-8")
);

const importTour = async () => {
  try {
    const created = await Tour.create(tours);
    console.log("Import sucessfull");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTour = async () => {
  try {
    const del = await Tour.deleteMany();
    console.log("Delete Sucessfull");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importTour();
} else if (process.argv[2] === "--delete") {
  deleteTour();
} else {
  console.log("error");
}
