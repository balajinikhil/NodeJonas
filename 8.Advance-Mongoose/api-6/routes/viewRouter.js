const Router = require("express").Router();
const viewsController = require("./../controller/viewsController");
const authController = require("./../controller/authController");

Router.get("/", authController.isLoggedIn, viewsController.getOverview);

Router.get("/tour/:slug", authController.isLoggedIn, viewsController.getTour);
Router.get("/login", authController.isLoggedIn, viewsController.logInForm);

module.exports = Router;

// app.get("/", (req, res) => {
//   res.status(200).render("base");
// });

// app.use("/overview", (req, res) => {});

// app.use("/tour", (req, res) => {
//   res.status(200).render("tour", {
//     title: "Forest Hiker"
//   });
// });
