const { toNumber } = require("lodash");
const db = require("../db/connection");
const { decrypt } = require("../utils/crypto");

const addLikeByPostId = async (req, res) => {
  const { postId: postIdEncrypted, userId: userIdEncrypted } = req.query;
  const postIdEncryptedFormatted = postIdEncrypted
    .replace("xMl3Jk", "+")
    .replace("Por21Ld", "/")
    .replace("Ml32", "=");
  const postIdDecrypted = decrypt(postIdEncryptedFormatted);

  const userIdEncryptedFormatted = userIdEncrypted
    .replace("xMl3Jk", "+")
    .replace("Por21Ld", "/")
    .replace("Ml32", "=");
  const userIdDecrypted = decrypt(userIdEncryptedFormatted);

  try {
    await db.execute(`INSERT INTO likes (userId, postId) VALUES (?, ?)`, [
      parseInt(userIdDecrypted),
      parseInt(postIdDecrypted),
    ]);
    res.status(200).json("Like added");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteLikeByPostId = async (req, res) => {
  const { postId: postIdEncrypted, userId: userIdEncrypted } = req.query;
  const postIdEncryptedFormatted = postIdEncrypted
    .replace("xMl3Jk", "+")
    .replace("Por21Ld", "/")
    .replace("Ml32", "=");
  const postIdDecrypted = decrypt(postIdEncryptedFormatted);
  const userIdEncryptedFormatted = userIdEncrypted
    .replace("xMl3Jk", "+")
    .replace("Por21Ld", "/")
    .replace("Ml32", "=");
  const userIdDecrypted = decrypt(userIdEncryptedFormatted);

  try {
    const x = await db.execute(
      `DELETE FROM likes WHERE postId= ? AND userId= ?`,
      [parseInt(postIdDecrypted), parseInt(userIdDecrypted)]
    );

    res.status(200).json("Like deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { addLikeByPostId, deleteLikeByPostId };
