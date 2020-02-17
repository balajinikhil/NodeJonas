const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./../model/tourModel");

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

const data = JSON.parse(fs.readFileSync("./tours.json", "UTF-8"));

const importData = async () => {
  try {
    await Tour.create(data);
    console.log("import sucess");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
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
