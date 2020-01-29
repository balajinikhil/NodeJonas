const express = require("express");
const routeTour = require("./routes/tourRoutes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", routeTour);

module.exports = app;
