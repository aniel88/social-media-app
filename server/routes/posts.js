/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const postController = require("../controllers/posts");

/* Middlewares */
const isAuth = require("../middlewares/isAuth");

/* Upload images */
const uploadImage = require("../utils/uploadImage");

/* Routers */
router.post(
  "/add",
  uploadImage(process.env.POST_IMAGES_PATH).single(
    process.env.POST_IMAGES_NAME
  ),
  isAuth,
  postController.addPost
);

router.get("/:userId", postController.getAllPostByUserId);
router.delete("/:postId", postController.deletePostById);

module.exports = router;
