const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authenticationController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
router.patch(
  "/UpdateMe",
  userController.uploadUserPhoto,
  userController.resize,
  userController.updateMe,
);
router.delete("/deleteMe", userController.deleteMe);
router.route("/me").get(userController.getMe, userController.getUser);

router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
