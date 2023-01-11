const bcrypt = require("bcryptjs");

const hash = async (password) => {
  const hashedPassword = await new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync();
    if (password.length)
      bcrypt.hash(password, salt, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    else reject({ message: "Something went wront!...Try again" });
  });
  return hashedPassword;
};

const compare = async (password, hash) => {
  const result = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isChecked) => {
      if (err || !isChecked) reject(err);
      resolve(isChecked);
    });
  });
  return result;
};

module.exports = { hash, compare };
