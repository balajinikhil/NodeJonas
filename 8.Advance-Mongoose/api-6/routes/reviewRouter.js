const Router = require("express").Router({ mergeParams: true });
const reviewController = require("./../controller/reviewController");
const authController = require("./../controller/authController");

//logged in to acess reviews
Router.use(authController.protect);

Router.route("/").get(reviewController.getAllReviews);

//only user can delete write and edit review
Router.use(authController.ristrictTo("user", "admin"));

Router.post("/", reviewController.setTourUserId, reviewController.addReviews);
Router.route("/:id")
  .delete(reviewController.deleteReviewById)
  .patch(reviewController.updateReviewById);
module.exports = Router;
