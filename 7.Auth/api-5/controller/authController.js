const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../model/userModel");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");

const createJWT = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = await createJWT(newUser._id);

  res.status(201).json({
    status: "sucess",
    newUser,
    token: token
  });
});

module.exports.signin = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Please enter email and password", 400));
  }

  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  if (!user || !(await user.checkPassword(req.body.password, user.password))) {
    return next(new AppError("Check email and password ", 400));
  }

  const token = await createJWT(user._id);

  res.status(200).json({
    status: "sucess",
    user,
    token
  });
});

module.exports.protect = catchAsync(async (req, res, next) => {
  //check token

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("Invalid token ", 400));
  }

  let token = req.headers.authorization.split(" ")[1];

  //decode the token
  const prom = promisify(jwt.verify);
  const decoded = await prom(token, process.env.JWT_SECRET);

  //check user exists
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User no longer exists", 400));
  }

  if (user.protectChangePassword(decoded.iat)) {
    return next(new AppError("password updated, login again", 400));
  }
  req.user = user;
  next();
});

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authoried to do this", 403));
    }

    next();
  };
};

module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  //check email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User does not exists", 400));
  }

  //create passwordReset Token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send mail to user
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;
  const message = `Forgot Password ? \n Click on the URL ${resetURL} \n If this is not relevant ignore this mail`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Password reset link active for 10 min",
      message
    });

    res.status(200).json({
      status: "sucess",
      message: "mail sent"
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    user.save({ validateBeforeSave: false });
    next(new AppError("Failed to send email, Tryagain", 500));
  }
});

module.exports.resetPassword = catchAsync(async (req, res, next) => {
  //find user with token
  const resetToken = req.params.token;

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpire: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError("Token invalid or expired ", 400));
  }

  //update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  await user.save();

  //respond
  const token = await createJWT(user._id);
  res.status(201).json({
    status: "sucess",
    message: "password updated",
    token
  });
});
