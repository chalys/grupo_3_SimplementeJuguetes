const path = require('path');
const multer = require('multer')

const storage = (folder) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${folder}`);
    },
    filename: function (req, file, cb) {
      const filenameFormat =
        file.fieldname + "-" + Date.now() + path.extname(file.originalname);
      cb(null, filenameFormat);
    },
  });
  
  const uploadProducts = multer({ storage: storage("products")});

  const uploadAuthentication = multer({storage: storage("authentication")});

  module.exports = {
    uploadProducts,
    uploadAuthentication
  }
