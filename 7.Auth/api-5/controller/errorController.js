const devError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err
  });
};

const prodError = (err, res) => {
  if (!err.isOperational) {
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong"
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};

//mongoose cast error
const handelCastError = err => {};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") {
      error = handelCastError(error);
    }

    prodError(error, res);
  }
};
