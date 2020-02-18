const Router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

//public acess
Router.post("/signup", authController.signUp);
Router.post("/signin", authController.signIn);
Router.post("/forgot-password", authController.forgotPassword);
Router.patch("/reset-password/:token", authController.resetPassword);

//logged in acess
Router.use(authController.protect);

Router.patch("/update-password", userController.updatePassword);
Router.patch("/updateMe", userController.updateMe);
Router.delete("/deleteMe", userController.deleteMe);
Router.route("/getMe").get(userController.getMe, userController.getUserById);
Router.route("/").get(userController.getUsers);

//Admin only acess
Router.use(authController.ristrictTo("admin"));

Router.route("/:id").delete(userController.deleteUser);

module.exports = Router;
