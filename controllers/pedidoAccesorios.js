//IMPORTAR DEPENDENCIAS Y MODULOS

const pedidoAccesorios = require("../models/pedidoAccesorios");

const nuevoPedido = async (req, res) => {
  //RECOGER PARAMETROS
  const pedido = new pedidoAccesorios(req.body);

  try {
    await pedido.save();
    res.json({ mensaje: "Reporte Generadop Correctamente" });
  } catch (error) {
    return res.status(400).json({
      //devolver error
      status: "error",
      mensaje: "No se ha generado el pedido: " + error.message,
    });
  }
};

const mostrarPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoAccesorios.find({}).populate('user').populate('accesorio')
    res.json(pedidos);
  } catch (error) {
    return res.status(400).json({
      //devolver error
      status: "error",
      mensaje: "No se ha generado el pedido: " + error.message,
    });
  }
}

//SACAR UNA PUBLICACION POR ID

const mostrarPedido = async (req, res) => {
  let pedidoID = req.params.id;

  try {
    let pedido = await pedidoAccesorios.findById(pedidoID).populate('user').populate({
      path: 'pedido.accesorio',
      model: "Accesorio"
    })

    if (!pedido) {
      return res.status(404).send({
        status: "error",
        mensaje: "No existe el pedido",
      });
    }

    return res.status(200).send({
      status: "Success",
      pedido
    });

  }catch{
    return res.status(400).json({
      status: "Error",
      mensaje: "No existe la el pedido",
    });
  }
  
};

//EXPORTAR ACCIONES
module.exports = {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido
};
