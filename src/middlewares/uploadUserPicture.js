const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/users')      
    },
    filename: function (req, file, cb) {
      const filenameFormat = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, filenameFormat)
    }
  })
  
  const uploadUserPicture = multer({ storage });

  module.exports = {
    uploadUserPicture
  }
