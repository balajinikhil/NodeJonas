const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const tourRoutes = require("./routes/tourRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many request from same IP \n Try again after an hour"
});

//global-middelware
app.use(express.json({ limit: "1mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//security-headers -- additional security headers
app.use(helmet());

//rate-limiter -- DOS attack
app.use("/api", limiter);

//data sanitization -- code injection
app.use(mongoSanitize());
app.use(xss());

//preventing-parameter-pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price"
    ]
  })
);

//api-routes
app.use("/api/v1/tours", tourRoutes);

//unhandeled routes
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl}`, 404));
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
