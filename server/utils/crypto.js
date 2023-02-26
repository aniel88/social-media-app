/* Crypto-js */
const CryptoJS = require("crypto-js");

const encrypt = (data) => {
  let encJson = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson));
  return encData;
};

const decrypt = (data) => {
  const decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(
    decData,
    process.env.CRYPTO_JS_PRIVATE_KEY.toString()
  ).toString(CryptoJS.enc.Utf8);
  return JSON.parse(bytes);
};

module.exports = { encrypt, decrypt };
