const Router = require("express").Router();
const tourController = require("./../controller/tourController");

Router.route("/").get(tourController.getAllTours);

module.exports = Router;
