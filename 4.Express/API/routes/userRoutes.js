const express = require("express");
const router = express.Router();
const controller = require("./../controller/usersController");

router
  .route("/")
  .get(controller.getUsers)
  .post(controller.createUsers);

router
  .route("/:id")
  .get(controller.getUser)
  .patch(controller.editUser)
  .delete(controller.deleteUser);

module.exports = router;
