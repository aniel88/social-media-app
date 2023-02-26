const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../db/connection");
const password = require("../utils/password");
const token = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const { queries } = require("../utils/queries");

/* Controllers */
/* Login */
const login = async (req, res) => {
  const { email: userEmail, password: userPassword } = req.body;

  try {
    const data = await db.execute(queries.SELECT_USER_BY_EMAIL, [userEmail]);

    if (data[0].length === 0) return res.status(404).json("User not found");

    const {
      id,
      userName,
      firstName,
      lastName,
      email,
      coverPic,
      profilePic,
      city,
      website,
      name,
      isValidate,
    } = data[0][0];

    /* Check if password is matching */
    try {
      await password.compare(userPassword, data[0][0].password);
    } catch (err) {
      return res.status(500).json("Username or password incorect!");
    }

    /* Check if the email is validate */
    if (isValidate) {
      try {
        /* Generate token */
        const generatedToken = await token.generate({
          id,
          userName,
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
            userName,
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
  } catch (err) {
    return res.status(500).json(err);
  }
};

/* Register */
const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password: userPassword,
    userName,
  } = req.body;

  //#Check if user exists
  try {
    const checkUserPromise = await db.execute(
      queries.SELECT_USER_BY_USERNAME_OR_EMAIL,
      [userName, email]
    );

    if (checkUserPromise[0].length !== 0)
      res.status(409).json("User already exists");

    //#Create a new user if does not exists
    //##Hash password
    try {
      const hashedPassword = await password.hash(userPassword);
      const validationToken = await token.generate({ userName: userName });
      const successToken = await token.generate({ userName: userName });

      /* Add in database */
      const addUserPromise = await db.execute(queries.ADD_USER, [
        userName,
        email,
        hashedPassword,
        firstName,
        lastName,
        0,
        validationToken,
        successToken,
      ]);

      /* Send email if data has been added to db */
      if (addUserPromise[0].length !== 0) {
        /* Send email */
        sendEmail(email, "Confirm your account", validationToken).then(
          (_info) => {
            return res.status(200).json({ successToken: successToken });
          }
        );
      }
    } catch (err) {
      return res.status(500).json("Error");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
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
