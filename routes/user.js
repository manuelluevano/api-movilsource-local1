const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const multer = require("multer");

//importar middleware
const check = require("../middlewares/auth");

//CONFIGURACION DE SUBIDA DE ARCHIVO
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars/");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

//DEFINIR RUTAS
router.get("/prueba-usuario",  UserController.pruebaUser);
router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.put("/update/:id", UserController.update)

//Exportar router
module.exports = router;