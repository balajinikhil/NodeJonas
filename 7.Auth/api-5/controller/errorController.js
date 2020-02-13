const devError = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    return devError(err, res);
  }
};
