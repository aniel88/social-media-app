const transporter = require("../transporter/transporter");

const sendEmail = (email, subject, url) => {
  const isDevelopment = process.env.NODE_ENV === "DEVELOPMENT";

  const sendEmailPromise = new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from: '"Lama social" <lamasocialapp@gmail.com>',
        to: email,
        subject: subject,
        text: subject,
        html: `<b>Please confirm your email address by accesing this link: <a href="http://${
          isDevelopment
            ? process.env.DEVELOPMENT_DOMAIN
            : process.env.PRODUCTION_DOMAIN
        }:${
          isDevelopment
            ? process.env.DEVELOPMENT_PORT
            : process.env.PRODUCTION_PORT
        }/api/auth/register/confirm/${url}">link</a></b>`,
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
  return sendEmailPromise;
};

module.exports = sendEmail;
