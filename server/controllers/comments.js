const db = require("../db/connection");
const querystring = require("node:querystring");
const { queries } = require("../utils/queries");

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  const { limit: queryLimit, page: queryPage } = req.query;
  const skip = queryPage * queryLimit;
  const limit = `${skip}, ${queryLimit}`;

  try {
    const comments = await db.execute(
      `SELECT comments.id, comments.description, comments.createdAt, users.id, users.userName, users.firstName, users.lastName, users.profilePic FROM comments INNER JOIN users ON comments.userId=users.id WHERE comments.postId = ? ORDER BY comments.createdAt desc limit ${limit}`,
      [postId]
    );
    res.status(200).json(comments[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

const addCommentByPostId = async (req, res) => {
  const { postId } = req.params;
  const { userId, description } = req.body;
  const currentDate = new Date();

  try {
    const comment = await db.execute(
      "INSERT INTO comments (description, createdAt, userId, postId) values (?, ?, ?, ?)",
      [description, currentDate, userId, postId]
    );
    res.status(200).json(comment[0].insertId);
  } catch (err) {
    console.log(postId, userId, description);
    res.status(500).json(err);
  }
};

module.exports = { getCommentsByPostId, addCommentByPostId };
