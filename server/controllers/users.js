const db = require("../db/connection");
const { queries } = require("../utils/queries");
const token = require("../utils/token");
const fs = require("fs");

/* Controllers */
const changeUserProfileImage = async (req, res) => {
  let userProfileImage = "";
  const userId = req.userData.id;
  const userEmail = req.userData.email;
  const userProfileImagePath =
    __dirname.split("/").slice(0, -1).join("/") + "/uploads/users/profile";
  const userProfileImageNameObj = await db.execute(
    `SELECT profilePic FROM users WHERE id = ?`,
    [userId]
  );
  const userProfileImageName = userProfileImageNameObj[0][0].profilePic;

  if (req.file !== undefined) {
    userProfileImage = req.file.filename;
  }

  if (userProfileImageName) {
    fs.unlink(userProfileImagePath + "/" + userProfileImageName, (err) => {
      console.log(err);
    });
  }

  try {
    const queryData = await db.execute(
      `UPDATE users SET profilePic = ? WHERE id = ?`,
      [userProfileImage, userId]
    );
    if (queryData.length === 0) res.status(404).json("Error");

    const data = await db.execute(queries.SELECT_USER_BY_EMAIL, [userEmail]);
    const {
      id,
      userName,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    } = data[0][0];

    /* Generate token */
    const generatedToken = await token.generate({
      id,
      userName,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    });

    res.status(200).json({ image: profilePic, token: generatedToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const changeCoverProfileImage = async (req, res) => {
  let userCoverImage = "";
  const userId = req.userData.id;
  const userEmail = req.userData.email;
  const userCoverImagePath =
    __dirname.split("/").slice(0, -1).join("/") + "/uploads/users/cover";
  const userCoverImageNameObj = await db.execute(
    `SELECT coverPic FROM users WHERE id = ?`,
    [userId]
  );
  const userCoverImageName = userCoverImageNameObj[0][0].coverPic;

  if (userCoverImagePath) {
    fs.unlink(userCoverImagePath + "/" + userCoverImageName, (err) => {
      console.log(err);
    });
  }
  if (req.file !== undefined) {
    userCoverImage = req.file.filename;
  }
  try {
    const queryData = await db.execute(
      `UPDATE users SET coverPic = ? WHERE id = ?`,
      [userCoverImage, userId]
    );
    if (queryData.length === 0) res.status(404).json("Error");

    const data = await db.execute(queries.SELECT_USER_BY_EMAIL, [userEmail]);
    const {
      id,
      userName,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    } = data[0][0];

    /* Generate token */
    const generatedToken = await token.generate({
      id,
      userName,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    });

    res.status(200).json(generatedToken);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { changeUserProfileImage, changeCoverProfileImage };
