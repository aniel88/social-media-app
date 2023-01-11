const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db/connection");

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const authRoutes = require("./routes/auth");

//middlewares

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT || 3030, () => {
  console.log(`Server listening on ${PORT}`);
});
