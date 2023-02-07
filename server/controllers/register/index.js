const db = require("../../db/connection");
const token = require("../../utils/token");
const { queries } = require("../../utils/queries");

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
            `http://${process.env.DOMAIN}:${process.env.CLIENT_PORT}/#/register/confirm/${tokenConfirm}`
          );
        }
      );
    })
    .catch((err) => console.log(err));
};

const validationToken = (type) => {
  return function (req, res) {
    const userToken = req.params.token;

    token
      .decode(userToken)
      .then((resp) => {
        if (resp) {
          const { userName } = resp;
          let q = "";

          switch (type) {
            case "confirm":
              q = queries.UPDATE_USER_VALIDATION_TOKEN;
              break;
            case "success":
              q = queries.UPDATE_USER_SUCCESS_TOKEN;
              break;
          }

          db.query(q, [userName, userToken], (err, data) => {
            if (err) res.status(500).json(err);
            if (data.changedRows === 0) {
              res.status(500).json("ALready validate");
            } else {
              res.status(200).json("Validate");
            }
          });
        } else {
          res.status(500).json("User not found");
        }
      })
      .catch((error) => console.log(error));
  };
};

module.exports = { confirmAddress, validationToken };
