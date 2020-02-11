const AppError = require("./../utils/appError");

const handelDuplicateField = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const msg = `Duplicate field ${value}`;

  return new AppError(msg, 400);
};

const handelCastError = err => {
  const msg = `Invalid ${err.path} with ${err.value}`;

  return new AppError(msg, 400);
};

const handelValidationError = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const msg = `Invalid ${errors.join(". ")}`;

  return new AppError(msg, 400);
};

const errorDev = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    error: err,
    status: err.status,
    message: err.message,
    stack: err.stack
  });
};

const errorProd = (err, res) => {
  //OPERATIONAL ERROR
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    //UNKNOWN ERROR
    console.log(`Prod err`, err);
    res.status(500).json({
      status: "fail",
      message: "Something Went Wrong...!!!"
    });
  }
};

const handeljwtError = () => {
  return new AppError("Invalid token", 401);
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    //DEVELOPMENT ERROR
    errorDev(err, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = { ...err };

    //CAST ERROR invalid ID
    if (error.name == "CastError") {
      error = handelCastError(error);
    }
    if (error.name == "ValidationError") {
      error = handelValidationError(error);
    }
    if (error.code == 11000) {
      error = handelDuplicateField(error);
    }
    if ((error.name = "JsonWebTokenError")) {
      error = handeljwtError();
    }

    //PRODUCTION ERROR
    errorProd(error, res);
  }
};
