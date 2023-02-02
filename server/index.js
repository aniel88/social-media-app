const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

const authRoutes = require("./routes/auth");

//middlewares

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.listen(PORT || 3030, () => {
  console.log(`Server listening on ${PORT}`);
});
