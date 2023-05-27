const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_PRIVATE_KEY;

const generate = async (data) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign(
      data,
      privateKey,
      { algorithm: "HS256", expiresIn: "12h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else resolve(token);
      }
    );
  });

  return token;
};

const decode = (token) => {
  const decodePromise = new Promise((resolve, reject) => {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  return decodePromise;
};

module.exports = { generate, decode };
