const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../db/connection");
const password = require("../utils/password");
const token = require("../utils/token");

const register = (req, res) => {
  const { username, email, password: userPassword, name } = req.body;

  //#Check if user exists
  const q = "SELECT * FROM users WHERE username= ?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    //#Create a new user
    //##Hash password
    password
      .hashPassword(userPassword)
      .then((hashedPassword) => {
        const q =
          "INSERT INTO users (`username`, `email`, `password`, `name`) values (?, ?, ?, ?)";

        db.query(q, [username, email, hashedPassword, name], (err, data) => {
          if (err) return res.status(500).json("Error");
          return res.status(200).json("Account created");
        });
      })
      .catch((error) => console.log(error));
  });
};

const login = (req, res) => {
  const { username, password: userPassword } = req.body;

  const q = `SELECT * FROM users WHERE username= ?`;

  db.query(q, [username], (err, data) => {
    if (err) res.status(500).json(err);
    if (data.length === 0) res.status(500).json("User not found");

    const { id, username, email, coverPic, profilePic, city, website, name } =
      data[0];

    password
      .compare(userPassword, data[0].password)
      .then((result) => {
        if (result)
          return token.generate({
            id,
            username,
            email,
            coverPic,
            profilePic,
            city,
            website,
            name,
          });
        else {
          res.status(500).json("Username or password incorect! Try again!");
        }
      })
      .then((token) => {
        res.status(200).json({ token });
      })
      .catch((err) =>
        res.status(500).json({ error: "Something went wrong..." })
      );
  });
};

const logout = (req, res) => {
  res.send("Logout");
};

module.exports = { register, login, logout };
