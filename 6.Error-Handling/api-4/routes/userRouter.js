const Router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

Router.post("/signup", authController.signUp);

Router.post("/signin", authController.signIn);

Router.route("/").get(userController.getUsers);

module.exports = Router;
