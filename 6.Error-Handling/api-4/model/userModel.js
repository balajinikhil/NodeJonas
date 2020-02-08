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
    minlength: 8
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

//DOCUMENT MIDDELWARE
/*on save()  */
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

const User = mongoose.model("Users", userSchema);

module.exports = User;
