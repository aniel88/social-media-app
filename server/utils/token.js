const jwt = require("jsonwebtoken");

const privateKey = process.env.LOGIN_PRIVATE_KEY;

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

const decode = (token) => {
  const decodePromise = new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      resolve(decoded);
      if (err) reject(err);
    });
  });
  return decodePromise;
};

module.exports = { generate, decode };
