const express = require("express");
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authenticationController");
const reviewRouter = require("./reviewRoutes");

const router = express.Router();

router.use("/:tourId/reviews", reviewRouter);

// router.param("id", tourController.checkID);

router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.createTour,
  );

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.updateTour,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour,
  );

module.exports = router;
