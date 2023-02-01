const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../db/connection");
const password = require("../utils/password");
const token = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const { queries } = require("../utils/queries");

const register = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password: userPassword,
    userName,
  } = req.body;

  //#Check if user exists
  db.query(
    queries.SELECT_USER_BY_USERNAME_OR_EMAIL,
    [userName, email],
    async (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length) return res.status(409).json("User already exists");

      //#Create a new user if does not exists
      //##Hash password
      try {
        const hashedPassword = await password.hash(userPassword);
        const generatedToken = await token.generate({ userName: userName });

        /* Add in database */
        db.query(
          queries.ADD_USER,
          [
            userName,
            email,
            hashedPassword,
            firstName,
            lastName,
            0,
            generatedToken,
          ],
          (err, data) => {
            if (err) return res.status(500).json("Error");

            /*           Send email if data has been added to db */
            if (data.length !== 0) {
              /* Send email */
              sendEmail(email, "Confirm your account", generatedToken).then(
                (info) => {
                  return res.status(200).json("Account verified");
                }
              );
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  );
};

const login = (req, res) => {
  const { username, password: userPassword } = req.body;

  db.query(queries.SELECT_USER_BY_USERNAME, [username], (err, data) => {
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

const confirmAddress = (req, res) => {
  const tokenConfirm = req.params.token;

  token
    .decode(tokenConfirm)
    .then((decoded) => {
      const { userName } = decoded;

      db.query(
        queries.UPDATE_USER_VALIDATION_BY_ID,
        [1, userName],
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res.redirect(
            `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}/#/confirmRegister/${tokenConfirm}`
          );
        }
      );
    })
    .catch((err) => console.log(err));
};

const checkUsernameValidation = (req, res) => {
  const { username } = req.params;

  db.query(
    queries.SELECT_USER_USERNAME_BY_USERNAME,
    [username],
    (err, data) => {
      if (err) res.status(500).json("error");
      if (data.length) res.status(200).json({ exist: true });
      if (data.length === 0) res.status(200).json({ exist: false });
    }
  );
};

const checkEmailValidation = (req, res) => {
  const { email } = req.params;

  db.query(queries.SELECT_USER_EMAIL_BY_EMAIL, [email], (err, data) => {
    if (err) res.status(500).json("error");
    if (data.length) res.status(200).json({ exist: true });
    if (data.length === 0) res.status(200).json({ exist: false });
  });
};

const validationToken = (req, res) => {
  const userToken = req.params.token;

  token
    .decode(userToken)
    .then((resp) => {
      if (resp) {
        const { userName } = resp;

        db.query(
          queries.UPDATE_USER_VALIDATION_TOKEN,
          [userName, userToken],
          (err, data) => {
            if (err) res.status(500).json(err);
            if (data.changedRows === 0) {
              res.status(500).json("ALready validate");
            } else {
              res.status(200).json("Validate");
            }
          }
        );
      } else {
        res.status(500).json("User not found");
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  register,
  login,
  logout,
  confirmAddress,
  checkUsernameValidation,
  checkEmailValidation,
  validationToken,
};
