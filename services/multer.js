const multer = require("multer");
const path = require('path')


//  CONFIGURACION DE SUBIDA DE ARCHIVO
const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    //Indicar donde es el destino de subida de archivo
    cb(null, "tmp");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: almacenamiento });