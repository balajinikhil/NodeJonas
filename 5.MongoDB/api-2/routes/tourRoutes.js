const router = require("express").Router();
const tourController = require("../controller/tourController");

router
  .route("/top-5-tours")
  .get(tourController.aliasTopTours, tourController.getTour);

router
  .route("/")
  .get(tourController.getTour)
  .post(tourController.createTour)
  .delete(tourController.deleteAll);

router
  .route("/:id")
  .get(tourController.getTourId)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
