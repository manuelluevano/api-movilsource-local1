//IMPORTAR DEPENDENCIAS Y MODULOS

const { Op } = require("sequelize");
const pedidoAccesorios = require("../models/pedidoAccesorios");
const Venta_accesorios = require("../models/venta_accesorios");
// Ejemplo de uso en otro archivo
const db = require('../db/database');

const nuevoPedido = async (req, res) => {
  let params = req.body;
  let newParams = params.venta

  // console.log(newParams);
  
 
//CREAR OBJETO
  let user_to_save = new Venta_accesorios(newParams);

    // Actualizar cada producto
    for (const item of newParams.items) {
      await db.query(
        `UPDATE accesorios 
        SET stock = stock - ? 
        WHERE id = ? AND stock >= ?`,
       [item.cantidad, item.id, item.cantidad]
      );
      // return { success: true, message: "Venta completada exitosamente" };
    }
    

    // Confirmar transacción
    await db.query('COMMIT');

 //Guardar la venta en la base de datos
 user_to_save
   .save()
   .then((pedidoGuardado) => {
     return res.status(200).json({
       //Devolver resultado
       status: "success",
       mensaje: "Pedido registrado correctamente",
       message: "Stock actualizado correctamente",
       pedido: pedidoGuardado,
     });
   })
   .catch((error) => {
     return res.status(400).json({
       //devolver error
       status: "error",
       mensaje: "No se ha guardado el pedido: " + error.message,
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
