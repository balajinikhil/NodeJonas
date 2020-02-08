const Router = require("express").Router();
const userController = require("./../controller/userController");
const authController = require("./../controller/authController");

Router.post("/signup", authController.signUp);

Router.route("/").get(userController.getUsers);

module.exports = Router;
