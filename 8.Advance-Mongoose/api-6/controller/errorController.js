const devError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  res.status(statusCode).json({
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
      message: "something went wrong"
    });
  } else {
    console.log(err);

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    devError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    prodError(error, res);
  }
};
