const jwt = require("jsonwebtoken");
const User = require("./../model/userModel");

const createToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SCERET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

module.exports.signup = async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = await createToken(newUser._id);

  res.status(201).json({
    status: "sucess",
    token,
    newUser
  });
};

module.exports.singin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new AppError("please enter your email and password", 400));
  }

  const user = User.findOne({ email: email }).select("+password");

  if (!user.email || !(await user.confirmPassword(password, user.password))) {
    next(new AppError("check your email and password", 400));
  }

  const token = await createToken(user._id);

  res.status(200).json({
    status: "sucess",
    token,
    user
  });
};
