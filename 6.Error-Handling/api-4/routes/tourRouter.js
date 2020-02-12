const Router = require("express").Router();
const tourController = require("./../controller/tourController");
const authController = require("./../controller/authController");

Router.route("/monthly-plan/:year").get(tourController.monthlyPlan);
Router.route("/")
  .get(authController.protect, tourController.getTours)
  .post(tourController.postTours);

Router.route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(
    authController.protect,
    authController.ristrictTo("admin", "lead-guide"),
    tourController.deleteTourById
  );
module.exports = Router;
