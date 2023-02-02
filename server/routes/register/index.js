/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const authController = require("../../controllers/auth");

/* Routers */
/* Account created successfully routers */
router.post("/success/:token", authController.validationToken("success"));

/* Confirm email routers */
/* [get] */
router.get("/confirm/:token", authController.confirmAddress);

/* [post] */
router.post("/confirm/:token", authController.validationToken("confirm"));

module.exports = router;
