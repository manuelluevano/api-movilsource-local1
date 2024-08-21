const express = require("express");
const router = express.Router();
const pendientesController = require("../controllers/pendientes");

//importar middleware
// const check = require("../middlewares/auth");

router.post("/pendiente",  pendientesController.addPendiente);
router.get("/pendientes",  pendientesController.listPendientes);
router.post("/status/:id" , pendientesController.updateComplete)

//Exportar router
module.exports = router;

