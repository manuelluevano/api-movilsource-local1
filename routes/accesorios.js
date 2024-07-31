const express = require("express");
const router = express.Router();
const accesorioController = require("../controllers/accesorios");

//importar middleware
const check = require("../middlewares/auth");

router.post("/accesorio", accesorioController.addAccesorio);
router.get("/accesorios", check.auth, accesorioController.listAccesorio);
router.get("/accesorio/:id", accesorioController.detail);

router.get("/accesorios/:busqueda",check.auth, accesorioController.buscador);
router.patch("/accesorio/:id",check.auth,accesorioController.editar);

//VENTA DE ACCEOSIO
router.post("/accesorio/:id",check.auth,accesorioController.ventaAccesorio);


//Exportar router
module.exports = router;
