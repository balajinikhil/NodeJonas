const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const APIfeature = require("./../utils/apiFeature");
const factory = require("./handlerFactory");

//update me
const filterObj = (obj, ...allowedFields) => {
  const respObj = {};

  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) {
      respObj[el] = obj[el];
    }
  });

  return respObj;
};

exports.getUsers = catchAsync(async (req, res, next) => {
  const feature = new APIfeature(User.find(), req.query);
  const users = await feature.query;

  res.status(200).json({
    status: "sucess",
    users
  });
});

module.exports.updatePassword = catchAsync(async (req, res, next) => {
  //get user from collection
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("Please login again", 403));
  }

  //check posted password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Check password is incorrect", 400));
  }

  //update the password
  user.password = req.body.Password;
  user.passwordConfirm = req.body.PasswordConfirm;
  await user.save();

  createSendToken(user, 201, res);
});

module.exports.updateMe = catchAsync(async (req, res, next) => {
  //1.error if your are trying to update password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "You cannot update password here, \n go to /password-update",
        400
      )
    );
  }

  //2.update document
  const user = await User.findByIdAndUpdate(
    req.user.id,
    filterObj(req.body, "name", "email"),
    {
      new: true,
      runValidators: true
    }
  );
  res.status(201).json({
    status: "sucess",
    message: "user updated",
    user
  });
});

module.exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "sucess",
    message: "account deleted"
  });
});

module.exports.getMe = catchAsync((req, res, next) => {
  req.params.id = req.user.id;
  next();
});

module.exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new AppError("cannot find user", 404));
  }

  res.status(200).json({
    status: "sucess",
    data: user
  });
});

module.exports.deleteUser = factory.deleteOne(User);
