const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRouter");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

//API TOURS
app.use("/api/v1/tours", tourRouter);

//UNHANDELED ROUTE
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`, 404));
});

//ERROR MIDDELWARE
app.use(globalErrorHandler);

module.exports = app;
