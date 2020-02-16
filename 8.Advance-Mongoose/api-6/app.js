const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const tourRouter = require("./router/tourRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();

//GLOBAL MIDDELWARE
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

//API
app.use("/api/v1/tours", tourRouter);

//global error handlers
app.all("*", (req, res, next) => {
  const appError = new AppError(`can't find ${req.originalUrl}`, 404);
  console.log(appError);

  next(appError);
});

app.use(globalErrorHandler);

//export to server
module.exports = app;
