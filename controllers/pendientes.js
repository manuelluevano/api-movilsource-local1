//IMPORTAR DEPENDENCIAS Y MODULOS

const Pendientes = require("../models/pendientes");

const addPendiente = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  console.log(params);

  // REVISAR SI INGRESAMOS LOS PARAMETROS
  if (!params.pendiente || !params.detalle) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //CREAR OBJETO
  const newPendiente = new Pendientes(params);

  //  Guardar el articulo en la base de datos
  newPendiente
    .save()
    .then((pendienteGuardado) => {
      return res.status(200).json({
        //DEVOLVER DATOS EL ACCESORIO
        status: "success",
        mensaje: "Pendiente registrado",
        pendiente: pendienteGuardado,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        //devolver error
        status: "error",
        mensaje: "No se ha guardado el accesorio: " + error.message,
      });
    });
};

const listPendientes = async (req, res) => {
  // Consulta a DB
  try {
    // obtener todos los pendientes
    let listPendientes = await Pendientes.find({});

    if (!Pendientes.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado pendientes",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: listPendientes.length,
      listPendientes,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

const updateComplete = async (req, res) => {
  try {
    //BUSCAR SERVICIO EN DB
    let pendienteUpdate = await Pendientes.findById(id);

    //VERIFICAR QUE EL ESTADO SEA FALSE
    const verificarStado = pendienteUpdate.status;
    // console.log(verificarStado);

    if (verificarStado) {
      return res.status(200).send({
        status: "Success",
        message: "Equipo Entregado a Cliente 🛠️",
        service: pendienteUpdate.status,
      });
    }

    //CAMBIAR ESTADO DE SERVICIO
    let status = true;
    pendienteUpdate.status = status;

    console.log("Cmabiar", pendienteUpdate);

    //   let serviceUpdateStatus = await Pendientes.findByIdAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     pendienteUpdate,
    //     { new: true }
    //   );

    //   if (!serviceUpdateStatus) {
    //     return res.status(500).json({
    //       status: "Error",
    //       mensaje: "Error al actualziar",
    //     });
    //   }
    //   //MOSTRAR EL SERVICIO
      return res.status(200).json({
        status: "Success",
        message: "SERVICIO ENTREGADO :)",
        service: pendienteUpdate,
      });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      mensaje: "Error en la consulta",
      error,
    });
  }
};
//EXPORTAR ACCIONES
module.exports = {
  addPendiente,
  listPendientes,
  updateComplete,
};
