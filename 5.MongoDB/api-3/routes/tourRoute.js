const Router = require("express").Router();
const tourController = require("../controller/tourController");

Router.route("/top-5-tours").get(tourController.top5, tourController.getTours);

Router.route("/tour-stats").get(tourController.getTourStats);

Router.route('/monthly-plan/:year').get(tourController.monthlyPlan)

Router.route("/")
  .get(tourController.getTours)
  .post(tourController.createTour);

Router.route("/tour-stats").get(tourController.getTourStats);

Router.route("/:id")
  .get(tourController.getTourId)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = Router;
