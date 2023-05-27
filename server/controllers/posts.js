const db = require("../db/connection");
const { queries } = require("../utils/queries");

/* Controllers */
const addPost = async (req, res) => {
  let imagePostName = "";
  if (req.file !== undefined) {
    imagePostName = req.file.filename;
  }

  const { id: userId } = req.userData;
  const { description: desc, img } = req.body;
  const currentDate = new Date();

  try {
    const queryData = await db.execute(queries.ADD_POST, [
      userId,
      desc,
      imagePostName,
      currentDate,
    ]);
    if (queryData.length === 0) res.status(404).json("Error");

    res.status(200).json(queryData[0].insertId);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAllPostByUserId = async (req, res) => {
  const { userId } = req.params;
  const { limit: queryLimit, page: queryPage } = req.query;
  const skip = queryPage * queryLimit;
  const limit = `${skip}, ${queryLimit}`;

  try {
    const posts = await db.execute(
      `SELECT users.firstName, users.lastName, posts.*, (SELECT COUNT(comments.id) FROM comments WHERE comments.userId = ? AND comments.postId = posts.id) as comments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = posts.id) as likes, (SELECT IF ((SELECT COUNT(*) FROM likes WHERE likes.userId = ? AND likes.postId = posts.id), 'yes', 'no')) as liked FROM posts INNER JOIN users ON users.id = posts.userID WHERE userId = ? ORDER BY posts.createdAt desc limit ${limit}`,
      [userId, userId, userId]
    );

    return res.status(200).send(posts[0]);
  } catch (err) {
    if (err) res.status(500).send(err);
  }
};

const getAllPostByUsername = async (req, res) => {
  const { username } = req.params;

  const { limit: queryLimit, page: queryPage } = req.query;
  const skip = queryPage * queryLimit;
  const limit = `${skip}, ${queryLimit}`;

  const skipForMorePosts = (parseFloat(queryPage) + 1) * queryLimit;
  const limitForMorePosts = `${skipForMorePosts}, ${queryLimit}`;

  try {
    const userIdArray = await db.execute(
      `SELECT users.id FROM users WHERE users.userName = ?`,
      [username]
    );
    const userId = userIdArray[0][0].id;
    const posts = await db.execute(
      `SELECT users.firstName, users.lastName, posts.*, (SELECT COUNT(comments.id) FROM comments WHERE comments.userId = ? AND comments.postId = posts.id) as comments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = posts.id) as likes, (SELECT IF ((SELECT COUNT(*) FROM likes WHERE likes.userId = ? AND likes.postId = posts.id), 'yes', 'no')) as liked FROM posts INNER JOIN users ON users.id = posts.userID WHERE userId = ? ORDER BY posts.createdAt desc limit ${limit}`,
      [userId, userId, userId]
    );

    const hasMorePosts = await db.execute(
      `SELECT users.firstName, users.lastName, posts.*, (SELECT COUNT(comments.id) FROM comments WHERE comments.userId = ? AND comments.postId = posts.id) as comments, (SELECT COUNT(likes.id) FROM likes WHERE likes.postId = posts.id) as likes, (SELECT IF ((SELECT COUNT(*) FROM likes WHERE likes.userId = ? AND likes.postId = posts.id), 'yes', 'no')) as liked FROM posts INNER JOIN users ON users.id = posts.userID WHERE userId = ? ORDER BY posts.createdAt desc limit ${limitForMorePosts}`,
      [userId, userId, userId]
    );
    if (hasMorePosts[0].length > 0) {
      console.log("has more posts");
    }
    return res.status(200).send(posts[0]);
  } catch (err) {
    if (err) res.status(500).send(err);
  }
};

const deletePostById = async (req, res) => {
  const { postId } = req.params;

  try {
    await db.execute(`DELETE FROM posts where id = ?`, [postId]);
    await db.execute(`DELETE FROM comments where postId = ? `, [postId]);
    await db.execute(`DELETE FROM likes where postId = ? `, [postId]);
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addPost,
  getAllPostByUserId,
  getAllPostByUsername,
  deletePostById,
};
