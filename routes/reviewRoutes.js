const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authenticationController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restrictTo("user"),
    reviewController.fillTourANdUserForCreate,
    reviewController.createReview,
  )
  .get(reviewController.getReviews);

router
  .route("/:id")
  .delete(
    authController.restrictTo("user", "admin"),
    reviewController.deleteReview,
  )
  .patch(
    authController.restrictTo("user", "admin"),
    reviewController.updateReview,
  );

module.exports = router;
