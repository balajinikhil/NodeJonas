const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");

const reqObj = async (obj, ...allowObj) => {
  const respObj = {};

  Object.keys(obj).forEach(el => {
    if (allowObj.includes(el)) {
      respObj[el] = obj[el];
    }
  });

  return respObj;
};

module.exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "sucess",
    users
  });
});

module.exports.deleteUsers = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "sucess",
    message: user
  });
});

module.exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    reqObj(req.body, "name", "email"),
    {
      new: true,
      runValidators: true
    }
  );

  res.status(201).json({
    status: "sucess",
    user
  });
});
