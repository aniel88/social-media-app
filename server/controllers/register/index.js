const db = require("../../db/connection");
const token = require("../../utils/token");
const { queries } = require("../../utils/queries");

const confirmAddress = async (req, res) => {
  const tokenConfirm = req.params.token;
  const isDevelopment = process.env.NODE_ENV === "DEVELOPMENT";

  try {
    const decodedToken = await token.decode(tokenConfirm);
    const { userName } = decodedToken;
    try {
      await db.execute(queries.UPDATE_USER_VALIDATION_BY_ID, [1, userName]);

      res.redirect(
        `http://${
          isDevelopment
            ? process.env.DEVELOPMENT_DOMAIN
            : process.env.PRODUCTION_DOMAIN
        }:${
          isDevelopment
            ? process.env.DEVELOPMENT_PORT
            : process.env.PRODUCTION_PORT
        }/#/register/confirm/${tokenConfirm}`
      );
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

const validationToken = (type) => {
  return async function (req, res) {
    const userToken = req.params.token;

    try {
      const decodedToken = await token.decode(userToken);

      if (decodedToken) {
        const { userName } = decodedToken;
        let q = "";

        switch (type) {
          case "confirm":
            q = queries.UPDATE_USER_VALIDATION_TOKEN;
            break;
          case "success":
            q = queries.UPDATE_USER_SUCCESS_TOKEN;
            break;
        }

        try {
          const data = await db.execute(q, [userName, userToken]);
          if (data[0].changedRows === 0) {
            res.status(500).json("Already validate");
          } else {
            res.status(200).json("Validate");
          }
        } catch (err) {
          return res.status(500).json(err);
        }
      }
    } catch (err) {
      return res.status(500).json("User not found");
    }
  };
};

module.exports = { confirmAddress, validationToken };
