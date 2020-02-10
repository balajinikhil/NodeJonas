const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const createJWT = async function(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo
  });

  //JWT
  const token = await createJWT(newUser._id);

  res.status(201).json({
    status: "sucess",
    token,
    user: newUser
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1.check if email and password exists
  if (!email || !password) {
    return next(new AppError("Please enter email and password", 400));
  }

  //2.check if user exists and password is correct
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Email or Password incorrect"), 400);
  }

  const token = await createJWT(user._id);

  //3.everything is ok send response with token
  res.status(200).json({
    status: "sucess",
    token,
    user
  });
});
