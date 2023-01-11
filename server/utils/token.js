const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./private.key");

const generate = async (data) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign(data, privateKey, { algorithm: "HS256" }, (err, token) => {
      if (err) {
        reject(err);
      } else resolve(token);
    });
  });

  return token;
};

module.exports = { generate };
