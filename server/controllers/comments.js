const db = require("../db/connection");
const querystring = require("node:querystring");
const { queries } = require("../utils/queries");

const getCommentsByPostId = (req, res) => {
  const { postId } = req.params;
  const { limit: queryLimit, page: queryPage } = req.query;
  const skip = queryPage * queryLimit;
  const limit = `${skip}, ${queryLimit}`;

  db.query(
    `SELECT comments.id, comments.description, comments.createdAt, users.id, users.userName, users.firstName, users.lastName, users.profilePic FROM comments INNER JOIN users ON comments.userId=users.id WHERE comments.postId = ? ORDER BY comments.createdAt desc limit ${limit}`,
    [postId],
    (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(200).json(data);
    }
  );
};

const addCommentByPostId = (req, res) => {
  const { postId } = req.params;
  const { userId, description } = req.body;
  const currentDate = new Date();

  db.query(
    "INSERT INTO comments (description, createdAt, userId, postId) values (?, ?, ?, ?)",
    [description, currentDate, userId, postId],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0)
        return res.status(404).json("Post doesn't exists!");
    }
  );
  res.status(200).json("comment addded");
};

module.exports = { getCommentsByPostId, addCommentByPostId };
