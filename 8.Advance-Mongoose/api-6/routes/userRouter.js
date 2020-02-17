const Router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

Router.post("/signup", authController.signUp);
Router.post("/signin", authController.signIn);
Router.post("/forgot-password", authController.forgotPassword);
Router.patch("/reset-password/:token", authController.resetPassword);
Router.patch(
  "/update-password",
  authController.protect,
  userController.updatePassword
);

Router.patch("/updateMe", authController.protect, userController.updateMe);
Router.delete("/deleteMe", authController.protect, userController.deleteMe);

Router.route("/").get(userController.getUsers);

Router.route("/getMe").get(
  authController.protect,
  userController.getMe,
  userController.getUserById
);

Router.route("/:id").delete(
  authController.protect,
  authController.ristrictTo("admin"),
  userController.deleteUser
);

module.exports = Router;
