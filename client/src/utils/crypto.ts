/* Crypto-js */
import * as CryptoJS from "crypto-js";

export const encrypt = (data: string) => {
  const stringData = data.toString();
  const encJson = CryptoJS.AES.encrypt(
    JSON.stringify(stringData),
    process.env.REACT_APP_CRYPTO_JS_PRIVATE_KEY!.toString()
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );

  return encData;
};

export const decrypt = (data: string) => {
  const decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  const bytes = CryptoJS.AES.decrypt(
    decData,
    process.env.REACT_APP_CRYPTO_JS_PRIVATE_KEY!.toString()
  ).toString(CryptoJS.enc.Utf8);

  return JSON.parse(bytes);
};
