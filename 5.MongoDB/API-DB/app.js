const express = require("express");
const tourRoutes = require("./routes/tourRoutes");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/", (req, res, next) => {
  res.send("Hello World");
  next();
});

app.use("/api/v1/tours", tourRoutes);

module.exports = app;
