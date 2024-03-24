const path = require('path');
const multer = require('multer')

// Función para generar la configuración de almacenamiento dinámicamente
const storage = (folder) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./public/images/${folder}`)      
  },
  filename: function (req, file, cb) {
    const filenameFormat = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filenameFormat)
  }
})

//Middleware de subida para productos
const uploadProducts = multer({ storage: storage('products')});

//Middleware de subida para autentication
const uploadAuthentication = multer({ storage: storage('authentication')});

module.exports = {
  uploadProducts,
  uploadAuthentication
}


/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/products')      
    },
    filename: function (req, file, cb) {
      const filenameFormat = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, filenameFormat)
    }
  })
  
  const uploadProducts = multer({ storage });

  module.exports = {
    uploadProducts
  }
*/