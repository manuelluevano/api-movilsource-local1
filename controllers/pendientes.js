const Pendientes = require("../models/pendientes");

const addPendiente = async (req, res) => {
  // RECOGER PARÁMETROS
  const { pendiente, detalle, fecha_entrega, telefono, estado } = req.body;

  // VALIDAR CAMPOS OBLIGATORIOS
  if (!pendiente) {
    return res.status(400).json({
      status: "error",
      message: "El campo 'pendiente' es obligatorio",
    });
  }

  try {
    // CREAR Y GUARDAR EL PENDIENTE (usando Sequelize)
    const pendienteGuardado = await Pendientes.create({
      pendiente,
      detalle: detalle || null,
      fecha_entrega: fecha_entrega || null,
      telefono: telefono || null,
      estado: estado || 'pendiente' // Valor por defecto
    });

    return res.status(200).json({
      status: "success",
      message: "Pendiente registrado correctamente",
      pendiente: pendienteGuardado
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al guardar el pendiente: " + error.message
    });
  }
};

// OPCIONAL: Controlador para listar pendientes
const listPendientes = async (req, res) => {
  try {
    const pendientes = await Pendientes.findAll({
      order: [['fecha_ingreso', 'DESC']] // Ordenar por fecha más reciente
    });

    return res.status(200).json({
      status: "success",
      pendientes
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al obtener pendientes: " + error.message
    });
  }
};

module.exports = {
  addPendiente,
  listPendientes
};