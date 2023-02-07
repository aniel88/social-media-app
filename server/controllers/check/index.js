const db = require("../../db/connection");
const { queries } = require("../../utils/queries");

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

module.exports = { checkEmailValidation, checkUsernameValidation };
