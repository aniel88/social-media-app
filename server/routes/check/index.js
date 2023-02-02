/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const authController = require("../../controllers/auth");

/* Routers */
/* Check username availability  */
router.get("/username/:username", authController.checkUsernameValidation);

/* Check email availability */
router.get("/email/:email", authController.checkEmailValidation);

module.exports = router;
