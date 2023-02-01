const transporter = require("../transporter/transporter");

const sendEmail = (email, subject, url) => {
  const sendEmailPromise = new Promise((resolve, reject) => {
    transporter
      .sendMail({
        from: '"Lama social" <lamasocialapp@gmail.com>',
        to: email,
        subject: subject,
        text: subject,
        html: `<b>Please confirm your email address by accesing this link: <a href="http://localhost:8080/api/auth/confirm/${url}">link</a></b>`,
      })
      .then((resp) => resolve(resp))
      .catch((err) => reject(err));
  });
  return sendEmailPromise;
};

module.exports = sendEmail;
