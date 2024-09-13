const express = require("express");
const router = express.Router();
const equipoController = require("../controllers/equipos");

//importar middleware
const check = require("../middlewares/auth");

router.post("/equipo", equipoController.addEquipo);
router.get("/equipos", check.auth, equipoController.listEquipo);


//Exportar router
module.exports = router;
