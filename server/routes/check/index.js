/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const checkController = require("../../controllers/check/index");

/* Middlewares */
const auth = require("../../middlewares/isAuth");

/* Routers */
/* Check auth  */
router.post("/", auth, (req, res) => res.status(200).json("Token valid"));

/* Check username availability  */
router.get("/username/:username", checkController.checkUsernameValidation);

/* Check email availability */
router.get("/email/:email", checkController.checkEmailValidation);

module.exports = router;
