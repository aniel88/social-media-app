/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const commentController = require("../controllers/comments");
const isAuth = require("../middlewares/isAuth");

/* Routers */
router.get("/:postId", commentController.getCommentsByPostId);
router.post("/:postId", commentController.addCommentByPostId);

module.exports = router;
