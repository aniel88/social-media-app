/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const likeController = require("../controllers/likes");

/* Middlewares */
const isAuth = require("../middlewares/isAuth");

router.put("/", likeController.addLikeByPostId);
router.delete("/", likeController.deleteLikeByPostId);

module.exports = router;
