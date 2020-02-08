const Router = require("express").Router();
const tourController = require("./../controller/tourController");

Router.route("/monthly-plan/:year").get(tourController.monthlyPlan);
Router.route("/")
  .get(tourController.getTours)
  .post(tourController.postTours);

Router.route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);
module.exports = Router;
