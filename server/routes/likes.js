/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const likeController = require("../controllers/likes");

router.put("/", likeController.addLikeByPostId);
router.delete("/", likeController.deleteLikeByPostId);

module.exports = router;
