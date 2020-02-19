const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongooseSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");
const reviewRouter = require("./routes/reviewRouter");

const app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP try again in an hour"
});

//SETTING UP PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//global-middelware
app.use(express.static(path.join(__dirname, "public")));
//setting security headers
app.use(helmet());

//implementing rate-limiter
app.use("/api", limiter);

//data sanitization
app.use(mongooseSanitize());
app.use(xss());

//preventing parameter pollution
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

app.use(express.json());

if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

//UI ROUTES
app.get("/", (req, res) => {
  res.status(200).render("base");
});

//API TOURS
app.use("/api/v1/tours", tourRouter);
//API USERS
app.use("/api/v1/users", userRouter);
//API REVIEWS
app.use("/api/v1/reviews", reviewRouter);

//UNHANDELED ROUTE
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl}`, 404));
});

//ERROR MIDDELWARE
app.use(globalErrorHandler);

module.exports = app;
