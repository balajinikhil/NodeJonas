const fs = require("fs");
const mongoose = require("mongoose");
const Tours = require("./../model/tourModel");
mongoose.connect();

console.log(process.argv);

const data = fs.readFileSync("./tours-simple.json", "UTF-8");

const importData = async d => {
  await Tours.create(data);
  console.log("Data copied");
  process.exit(1);
};

if (process.argv[2] == "--import") {
  importData();
}
