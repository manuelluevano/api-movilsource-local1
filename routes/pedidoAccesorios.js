const express = require("express");
const router = express.Router();
const pedidoAccesoriosController = require("../controllers/pedidoAccesorios");

//importar middleware
const check = require("../middlewares/auth");

//AGREGAR PEDIDO
router.post("/accesorios", pedidoAccesoriosController.nuevoPedido);
//MOSTRAR PEDDOS
router.get("/accesorios", pedidoAccesoriosController.mostrarPedidos);
// MOSTRAR PEDIDO POR ID
router.get("/accesorios/:id", pedidoAccesoriosController.mostrarPedido);

//Exportar router
module.exports = router;
