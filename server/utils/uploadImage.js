/* Multer */
const multer = require("multer");

const uploadImage = (path) => {
  /* Storage */
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${path}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.fieldname + ".png");
    },
  });

  return multer({ storage: storage });
};

module.exports = uploadImage;
