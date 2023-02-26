/* Express */
const express = require("express");

/* Dotenv */
const dotenv = require("dotenv");

/* Morgan */
const morgan = require("morgan");

/* Cors */
const cors = require("cors");

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

/* Add uploads file as static */
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/like", likeRoutes);

app.listen(PORT || 3030, () => {
  console.log(`Server listening on ${PORT}`);
});
