const express = require("express");
const router = express.Router();
const controller = require("./../controller/toursController");

router.param("id", controller.checkId);
router
  .route("/")
  .get(controller.getTours)
  .post(controller.checkBody, controller.createTour);

router
  .route("/:id")
  .get(controller.getTour)
  .patch(controller.editTour)
  .delete(controller.deleteTour);

module.exports = router;
