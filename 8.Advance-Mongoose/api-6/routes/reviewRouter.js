const Router = require("express").Router({ mergeParams: true });
const reviewController = require("./../controller/reviewController");
const authController = require("./../controller/authController");

Router.route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.ristrictTo("user"),
    reviewController.setTourUserId,
    reviewController.addReviews
  );

Router.route("/:id")
  .delete(authController.protect, reviewController.deleteReviewById)
  .patch(authController.protect, reviewController.updateReviewById);
module.exports = Router;
