const db = require("../db/connection");
const querystring = require("node:querystring");
const { queries } = require("../utils/queries");

/* Controllers */
const addPost = (req, res) => {
  let imagePostName = "";
  if (req.file !== undefined) {
    imagePostName = req.file.filename;
  }

  const { id: userId } = req.userData;
  const { description: desc, img } = req.body;
  const currentDate = new Date();
  let insertedPostId = "";

  db.query(
    queries.ADD_POST,
    [userId, desc, imagePostName, currentDate],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found");
      console.log(data.insertedId);
      return res.status(200).json("asdsadasd addded");
    }
  );
  return res.status(200).json("post addded");
};

const getAllPostByUserId = (req, res) => {
  const { userId } = req.params;
  const { limit: queryLimit, page: queryPage } = req.query;
  const skip = queryPage * queryLimit;
  const limit = `${skip}, ${queryLimit}`;

  db.query(
    `SELECT users.firstName, users.lastName, posts.*, (SELECT COUNT(comments.id) FROM comments WHERE comments.userId = ? AND comments.postId = posts.id) as comments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = posts.id) as likes, (SELECT IF ((SELECT COUNT(*) FROM likes WHERE likes.userId = ? AND likes.postId = posts.id), 'yes', 'no')) as liked FROM posts INNER JOIN users ON users.id = posts.userID WHERE userId = ? ORDER BY posts.createdAt desc limit ${limit}`,
    [userId, userId, userId, userId],
    (err, data) => {
      if (err) return res.status(500).json(err);

      res.status(200).json(data);
    }
  );
};

module.exports = { addPost, getAllPostByUserId };
