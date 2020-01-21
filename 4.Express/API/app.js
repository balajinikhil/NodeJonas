const fs = require("fs");
const express = require("express");
const app = express();

const port = 4000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours.json`, "UTF-8")
);

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ msg: "sucess", tours: tours });
});

app.listen(port, () => {
  console.log(`Up and running ${port}....`);
});
