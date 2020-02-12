const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"]
  },
  email: {
    type: String,
    required: [true, "Please provide us your email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 8,
    select: false,
    validate: [validator.isEmail, "Please enter valid email"]
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: "Password is not matching"
    }
  },
  picture: String,
  passwordCreatedAt: {
    type: Date,
    default: Date.now()
  },
  passwordResetToken: String,
  passwordResetExpire: Date
});

userSchema.methods.checkPasswordUpdate = function(jwtTime) {
  if (this.passwordCreatedAt) {
    let createTimeStamp = parseInt(this.passwordCreatedAt.getTime() / 1000, 10);

    return jwtTime < createTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
