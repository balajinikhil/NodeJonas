const Router = require("express").Router();
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");

Router.post("/signup", authController.signup);
Router.post("/signin", authController.signin);
Router.post("/forgotPassword", authController.forgotPassword);
Router.post("/resetPassword/:token", authController.resetPassword);

Router.route("/").get(
  authController.protect,
  authController.restrictTo("admin"),
  userController.getUsers
);
module.exports = Router;
