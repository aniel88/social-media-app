/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Routers */
const registerRoutes = require("./register/index");
const checkRoutes = require("./check/index");

/* Controller */
const authController = require("../controllers/auth");

/* Routers */
/* Login router */
router.post("/login", authController.login);

/* Register routers */
router.post("/register", authController.register);
router.use("/register", registerRoutes);

/* Check availability routers */
router.use("/check", checkRoutes);
// router.get("/checkUsername/:username", authController.checkUsernameValidation);
// router.get("/checkEmail/:email", authController.checkEmailValidation);

/* Logout router */
router.post("/logout", authController.logout);

module.exports = router;
