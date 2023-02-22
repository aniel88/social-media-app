const jwt = require("jsonwebtoken");
const token = require("../utils/token");

const isAuth = async (req, res, next) => {
 
  const accessToken =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (accessToken) {
    try {
      const decoded = await token.decode(accessToken);
      req.userData = decoded;

      next();
    } catch (_err) {
      res.status(401).json("Invalid Token");
    }
  } else {
    res.status(403).json("A token is required for authentication");
  }

  next();
};

module.exports = isAuth;
