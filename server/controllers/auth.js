const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../db/connection");
const password = require("../utils/password");
const token = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const { queries } = require("../utils/queries");

/* Controllers */
/* Login */
const login = (req, res) => {
  const { email, password: userPassword } = req.body;

  db.query(queries.SELECT_USER_BY_EMAIL, [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const {
      id,
      username,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    } = data[0];

    /* Check if password is matching */
    try {
      await password.compare(userPassword, data[0].password);
    } catch (err) {
      return res.status(500).json("Username or password incorect!");
    }

    /* Check if email is validate */
    if (isValidate) {
      try {
        /* Generate token */
        const generatedToken = await token.generate({
          id,
          username,
          firstName,
          lastName,
          email,
          coverPic,
          profilePic,
          city,
          website,
          name,
          isValidate,
        });
        return res.status(200).json({
          token: generatedToken,
          user: {
            id,
            username,
            email,
            coverPic,
            profilePic,
            city,
            website,
            name,
          },
        });
      } catch (err) {
        res.status(500).json("Something went wrong");
      }
    } else {
      return res.status(500).json("Please validate your email!");
    }
  });
};

/* Register */
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
        const validationToken = await token.generate({ userName: userName });
        const successToken = await token.generate({ userName: userName });

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
            validationToken,
            successToken,
          ],
          (err, data) => {
            if (err) return res.status(500).json("Error");

            /*           Send email if data has been added to db */
            if (data.length !== 0) {
              /* Send email */
              sendEmail(email, "Confirm your account", validationToken).then(
                (info) => {
                  return res.status(200).json({ successToken: successToken });
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

/* Check Authentication */
const checkAuthentication = (req, res) => {
  res.status(200).json(req.userData);
};

/* Logout */
const logout = (req, res) => {
  res.send("Logout");
};

module.exports = {
  register,
  login,
  logout,
  checkAuthentication,
};
