const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./../model/tourModel");
const User = require("./../model/userModel");
const Review = require("./../model/reviewModel");

dotenv.config({ path: "./../config.env" });

let DB = process.env.DATABASE;
DB = DB.replace("<PASSWORD>", process.env.PASSWORD);

//CONNECT TO DATABASE
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("DB connected");
  });

const tour = JSON.parse(fs.readFileSync("./data/tours.json", "UTF-8"));
const user = JSON.parse(fs.readFileSync("./data/users.json", "UTF-8"));
const review = JSON.parse(fs.readFileSync("./data/reviews.json", "UTF-8"));

const importData = async () => {
  try {
    await Tour.create(tour);
    await User.create(user, { validateBeforeSave: false });
    await Review.create(review, { validateBeforeSave: false });
    console.log("import sucess");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("delete sucess");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
};

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}
