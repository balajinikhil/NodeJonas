const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");

module.exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "sucess",
    users
  });
});
