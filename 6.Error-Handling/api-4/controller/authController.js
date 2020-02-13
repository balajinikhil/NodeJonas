const crypto = require("crypto");
const util = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");

/*  //how promisify works
const del = require("./reference-promisify");
*/

const createJWT = async function(id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN
  });
};

const createSendToken = async (user, statusCode, res) => {
  const token = await createJWT(user._id);

  res.status(statusCode).json({
    status: "sucess",
    token,
    user
  });
};

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

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    photo: req.body.photo
  });

  createSendToken(newUser, 201, res);
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

  //3.everything is ok send response with token
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1.get token and check it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("login to continue", 401));
  }

  //2.verification

  /* //using promise
  const decoded = await del.jwt(token, process.env.JWT_SECRET);
  */

  const jwtverify = util.promisify(jwt.verify);
  const decoded = await jwtverify(token, process.env.JWT_SECRET);

  //3.check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("User belonging to this token no longer exists"));
  }

  //4.check if user changed password

  if (currentUser.changePasswordAfter(decoded.iat)) {
    return next(
      new AppError("Password recently changed please login again", 401)
    );
  }

  req.user = currentUser;
  next();
});

//USER ROLE

/*
exports.RistrictTo = (req, res, next) => {
  if (req.user.role == "admin" || req.user.role == "lead-guide") {
   return next();
  } else {
     return next(new AppError("You are not authorized to acess this route", 403));
  }
};
*/

exports.ristrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to acess this route", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  //1.ger user based based on posted email
  if (!user) {
    return next(new AppError("User with that email does not exists", 404));
  }

  //2.generate random reset token
  const resetToken = user.forgotPasswordResetToken();

  await user.save({
    validateBeforeSave: false
  });

  //3.send email to user
  const resetURL = `${req.protocol}//:${req.get(
    "host"
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: req.body.email,
      subject: "password reset",
      message: message
    });

    res.status(201).json({
      status: "sucess",
      message: "token sent"
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save();

    return next(new AppError("Fail to send email try again", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get token from url and hash it
  const resetToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  //check if user with that token exists
  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpire: { $gte: Date.now() }
  });

  if (!user) {
    return next(new AppError("Token invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpire = undefined;
  await user.save();

  createSendToken(user, 201, res);
});
