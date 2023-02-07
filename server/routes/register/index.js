/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const registerController = require("../../controllers/register/index");

/* Routers */
/* Account created successfully routers */
router.post("/success/:token", registerController.validationToken("success"));

/* Confirm email routers */
/* [get] */
router.get("/confirm/:token", registerController.confirmAddress);

/* [post] */
router.post("/confirm/:token", registerController.validationToken("confirm"));

module.exports = router;
