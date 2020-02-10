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

userSchema.methods.correctPassword = function(candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
