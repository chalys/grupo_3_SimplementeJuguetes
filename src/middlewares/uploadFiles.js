const path = require("path");
const multer = require("multer");

// Función para generar la configuración de almacenamiento dinámicamente
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

// Función para filtrar archivos de imagen
const imageFilter = function (req, file, cb) {
  // Comprueba la extensión del archivo
  const extValid = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (extValid.includes(ext)) {
    // Si es una imagen, acepta el archivo
    cb(null, true);
  } else {
    // Si no es una imagen, rechaza el archivo y captura el error
    //cb(new Error('El archivo no es una imagen válida'));
    cb({ message: 'El archivo no es una imagen válida' });
    //cb(null);
  }
};

//Middleware de subida para productos
const uploadProducts = multer({
  storage: storage("products"),
  fileFilter: imageFilter,
});

//Middleware de subida para autentication
const uploadAuthentication = multer({storage: storage("authentication"), fileFilter: imageFilter});
//const uploadAuthentication = multer({ storage: storage("authentication") });
module.exports = {
  uploadProducts,
  uploadAuthentication,
};
