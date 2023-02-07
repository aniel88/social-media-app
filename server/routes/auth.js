/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Routers */
const registerRoutes = require("./register/index");
const checkRoutes = require("./check/index");

/* Controller */
const authController = require("../controllers/auth");
const isAuth = require("../middlewares/isAuth");

/* Routers */
/* Login router */
router.post("/login", authController.login);

/* Check authentication route */
router.post("/isAuth", isAuth, authController.checkAuthentication);

/* Register routers */
router.post("/register", authController.register);
router.use("/register", registerRoutes);

/* Check availability for usename and email routers */
router.use("/check", checkRoutes);

/* Logout router */
router.post("/logout", authController.logout);

module.exports = router;
