const express = require("express");
const router = express.Router();
const pendientesController = require("../controllers/pendientes");

//importar middleware
const check = require("../middlewares/auth");

router.post("/pendiente", check.auth, pendientesController.addPendiente);
router.get("/pendentes", check.auth, pendientesController.listPendientes);

//Exportar router
module.exports = router;
