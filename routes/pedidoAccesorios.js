const express = require("express");
const router = express.Router();
const pedidoAccesoriosController = require("../controllers/pedidoAccesorios");

//importar middleware
const check = require("../middlewares/auth");

//AGREGAR PEDIDO
router.post("/accesorio", pedidoAccesoriosController.nuevoPedido);
//MOSTRAR PEDIDO X FECHA
router.get("/accesorios", pedidoAccesoriosController.getVentasPorFecha);
// MOSTRAR PEDIDO POR ID
// router.get("/accesorios/:id", pedidoAccesoriosController.mostrarPedido);

//Exportar router
module.exports = router;
