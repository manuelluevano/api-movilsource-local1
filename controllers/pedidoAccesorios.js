//IMPORTAR DEPENDENCIAS Y MODULOS

const { Op } = require("sequelize");
const pedidoAccesorios = require("../models/pedidoAccesorios");
const Venta_accesorios = require("../models/venta_accesorios");

const nuevoPedido = async (req, res) => {
  let params = req.body;

  let newParams = params.venta


//CREAR OBJETO
  let user_to_save = new Venta_accesorios(newParams);

 //Guardar el articulo en la base de datos
 user_to_save
   .save()
   .then((usuarioGuardado) => {
     return res.status(200).json({
       //Devolver resultado
       status: "success",
       mensaje: "usuario registrado correctamente",
       usuario: usuarioGuardado,
     });
   })
   .catch((error) => {
     return res.status(400).json({
       //devolver error
       status: "error",
       mensaje: "No se ha guardado el usuario: " + error.message,
     });
   });

};

const getVentasPorFecha = async (req, res) => {
  try {

    const { fechaInicio, fechaFin } = req.query;

    // Consulta por rango de fechas
    const pedidosRango = await Venta_accesorios.findAll({
      where: {
        fecha_pedido: {
          [Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
        }
      },
      order: [['fecha_pedido', 'DESC']]
    });

    console.log(pedidosRango);
        
    if (pedidosRango.length === 0) {
      return res.status(404).send({
        status: "error",
        mensaje: "No hay pedidos",
      });
    }

    return res.status(200).send({
      status: "Success",
      ventas: pedidosRango
    });
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    res.status(500).json({ error: 'Error al obtener las ventas' });
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
  getVentasPorFecha,
  mostrarPedido
};
