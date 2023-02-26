const db = require("../../db/connection");
const { queries } = require("../../utils/queries");

const checkUsernameValidation = async (req, res) => {
  const { username } = req.params;

  try {
    const checkUserNameValidationPromise = await db.execute(
      queries.SELECT_USER_USERNAME_BY_USERNAME,
      [username]
    );

    if (checkUserNameValidationPromise[0].length !== 0)
      res.status(200).json({ exist: true });
    else res.status(200).json({ exist: false });
  } catch (err) {
    return res.status(500).json("error");
  }
};

const checkEmailValidation = async (req, res) => {
  const { email } = req.params;

  try {
    const checkEmailValidation = await db.execute(
      queries.SELECT_USER_EMAIL_BY_EMAIL,
      [email]
    );
    if (checkEmailValidation[0].length !== 0)
      res.status(200).json({ exist: true });
    else res.status(200).json({ exist: false });
  } catch (err) {
    return res.status(500).json("error");
  }
};

module.exports = { checkEmailValidation, checkUsernameValidation };
