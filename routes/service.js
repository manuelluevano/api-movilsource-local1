const express = require("express");
const router = express.Router();
const ServicioSchema = require("../controllers/service");

//importar middleware
const check = require("../middlewares/auth");

//DEFINIR RUTAS
router.get("/prueba-servicio",  ServicioSchema.pruebaService);
router.post("/servicio",check.auth , ServicioSchema.addService)
router.get("/servicios",check.auth , ServicioSchema.listServices)
router.post("/servicio/complete/:id",check.auth , ServicioSchema.updateComplete)
router.post("/servicio/status/:id",check.auth , ServicioSchema.updateStatus)
router.get("/servicios/:busqueda", check.auth ,ServicioSchema.buscador);
router.put("/servicio/:id",check.auth,ServicioSchema.editar);



//Exportar router
module.exports = router;
