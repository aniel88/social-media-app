/* Express */
const express = require("express");

/* Router */
const router = express.Router();

/* Controller */
const userController = require("./../controllers//users");

/* Middlewares */
const isAuth = require("../middlewares/isAuth");

/* Upload images */
const uploadImage = require("../utils/uploadImage");

router.post(
  "/profile",
  uploadImage(process.env.USER_PROFILE_IMAGES_PATH).single(
    process.env.USER_PROFILE_IMAGES_NAME
  ),
  isAuth,
  userController.changeUserProfileImage
);

router.post(
  "/cover",
  uploadImage(process.env.USER_COVER_IMAGES_PATH).single(
    process.env.USER_COVER_IMAGES_NAME
  ),
  isAuth,
  userController.changeCoverProfileImage
);

module.exports = router;
