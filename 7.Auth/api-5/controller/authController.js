const utils = require("utils");
const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");

exports.protect = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("There is no token please login againg"));
  }

  const token = req.headers.authorization.split(" ")[1];

  const verify = utils.promisify(jwt.verify);
  const decoded = verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError("User no longer exists", 404));
  }

  if (user.checkPasswordUpdate(decoded.iat)) {
    return next(new AppError("Password changed recently login again", 403));
  }

  req.user = user;
  next();
};

//route auhtController.rectritTo('admin','lead-guide')
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("you are not authorized to do this", 403));
    }

    next();
  };
};

module.exports.forgotPassword = async (req, res, next) => {
  //check email exists
  const fooUser = await User.findOne({ email: req.body.email });

  if (!fooUser) {
    return next(
      new AppError("User with this email does not exists signup", 404)
    );
  }

  //create password reset token
  const resetToken = fooUser.createPasswordResetToken();
  fooUser.save({ validateBeforeSave: false });

  //send mail to user
};
