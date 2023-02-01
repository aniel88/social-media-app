const queries = {
  /* ADD */
  ADD_USER:
    "INSERT INTO users (`userName`, `email`, `password`, `firstName`, `lastName`,`isValidate`, `validationToken`) values (?, ?, ?, ?, ?, ?, ?)",

  /* SELECT */
  SELECT_USER_BY_USERNAME_OR_EMAIL:
    "SELECT * FROM users WHERE userName = ? OR email= ?",
  SELECT_USER_BY_USERNAME: "SELECT * FROM users WHERE userName= ?",
  SELECT_USER_BY_EMAIL: "SELECT * FROM users WHERE email= ?",
  SELECT_USER_EMAIL_BY_EMAIL: "SELECT email FROM users WHERE email= ?",
  SELECT_USER_USERNAME_BY_USERNAME:
    "SELECT userName FROM users WHERE userName = ?",

  /* UPDATE */
  UPDATE_USER_VALIDATION_BY_ID:
    "UPDATE users SET isValidate = ? WHERE userName = ?",
  UPDATE_USER_VALIDATION_TOKEN:
    "UPDATE users SET validationToken='' WHERE userName = ? AND validationToken = ?",
};
module.exports = { queries };
