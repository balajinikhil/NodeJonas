const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide us your name"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please give us your email"],
    validate: [validator.isEmail, "Provide valid email"]
  },
  role: {
    type: String,
    enum: ["admin", "user", "guide", "lead-guide"],
    default: "user"
  },
  passwordResetToken: String,
  passwordResetTokenExpire: Date,
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: "Password is not matching"
    },
    passwordCreatedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

//dcrypt password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  return next();
});

//check login password
userSchema.methods.checkPassword = async function(reqPassword, userPassword) {
  return bcrypt.compare(reqPassword, userPassword);
};

userSchema.methods.protectChangePassword = function(jwtExpire) {
  if (this.passwordCreatedAt) {
    const timeStamp = parseInt(this.passwordCreatedAt.getTime() / 1000, 10);

    return jwtExpire < timeStamp;
  }

  return false;
};

//forgot password reset token
userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//password updated
userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.passwordCreatedAt = Date.now() - 2000;
  next();
});

userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });

  next();
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
