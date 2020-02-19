const Router = require("express").Router();
const tourController = require("./../controller/tourController");
const authController = require("./../controller/authController");
const reviewRouter = require("./reviewRouter");

//user can acess
Router.get("/top-5-tours", tourController.top5Tours, tourController.getTours);
Router.use("/:tourId/reviews", reviewRouter);
Router.get("/", tourController.getTours);
//GEOSPATIAL QUERY
Router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(
  tourController.getToursWithin
);
Router.route("/distances/:latlng/unit/:unit").get(tourController.getDistances);

//user's can't acess
Router.use(authController.protect);
Router.use(authController.ristrictTo("admin", "lead-guide", "guide"));

Router.get("/monthly-plan/:year", tourController.monthlyPlan);
Router.post("/", tourController.createTour);

Router.route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(
    authController.ristrictTo("admin", "lead-guide"),
    tourController.deleteTourById
  );

module.exports = Router;
