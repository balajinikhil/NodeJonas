const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"]
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user"
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Password is not matching"
    }
  },
  passwordResetToken: String,
  passwordResetTokenExpire: String,
  passwordCreatedAt: {
    type: Date,
    default: Date.now()
  }
});

//BCRYPT PASSWORD
userSchema.pre("save", async function(next) {
  //Only if password is changed
  if (!this.isModified("password")) {
    return next();
  }

  //hash password with cost of 12 using bcrypt -- encrypted version of password
  this.password = await bcrypt.hash(this.password, 10);

  //delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

//login correct password
userSchema.methods.correctPassword = function(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

//password update check
userSchema.methods.changePasswordAfter = function(jwtTime) {
  if (this.passwordCreatedAt) {
    const changedTimeStamp = parseInt(
      //conversion of time
      this.passwordCreatedAt.getTime() / 1000,
      10
    );
    //jwt time must be less than created time
    return jwtTime < changedTimeStamp;
  }

  //NOT CHANGED
  return false;
};

//forgot password reset token
userSchema.methods.forgotPasswordResetToken = function() {
  //creates a random token and converts to hex string
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //sets 10 min expire time                  m*sec*milisec
  this.passwordResetTokenExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//update passwordCreated for reset password action

userSchema.pre("save", function(next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  //creating jwt is little slow so
  this.passwordCreatedAt = Date.now() - 2000;

  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
