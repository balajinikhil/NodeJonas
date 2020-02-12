const Router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

Router.post("/signup", authController.signUp);

Router.post("/signin", authController.signIn);

Router.post("/forgot-password", authController.forgotPassword);

Router.patch("/reset-password/:token", authController.resetPassword);

Router.route("/").get(userController.getUsers);

Router.route("/:id").delete(
  authController.protect,
  authController.ristrictTo("admin", "lead-guide"),
  userController.deleteTours
);

module.exports = Router;
