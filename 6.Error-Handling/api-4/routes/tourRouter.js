const Router = require("express").Router();
const tourController = require("./../controller/tourController");

Router.route("/monthly-plan/:year").get(tourController.monthlyPlan);
Router.route("/").get(tourController.getTours);

module.exports = Router;
