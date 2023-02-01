const jwt = require("jsonwebtoken");

const privateKey = process.env.CONFIRM_ADDRESS_PRIVATE_KEY;

const generate = async (data) => {
  const token = await new Promise((resolve, reject) => {
    jwt.sign{}
  });
};
