const router = require("express").Router();
const tourController = require("../controller/tourController");

router
  .route("/")
  .get(tourController.getTour)
  .post(tourController.createTour);

module.exports = router;
