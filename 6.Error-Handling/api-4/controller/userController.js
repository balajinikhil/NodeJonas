const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const APIfeature = require("./../utils/apiFeature");

exports.getUsers = catchAsync(async (req, res, next) => {
  const feature = new APIfeature(User.find(), req.query);
  const users = await feature.query;

  res.status(200).json({
    status: "sucess",
    users
  });
});
