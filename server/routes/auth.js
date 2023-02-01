const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/confirm/:token", authController.confirmAddress);
router.post("/confirm/:token", authController.validationToken);
router.get("/checkUsername/:username", authController.checkUsernameValidation);
router.get("/checkEmail/:email", authController.checkEmailValidation);

module.exports = router;
