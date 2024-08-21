//IMPORTAR DEPENDENCIAS Y MODULOS

const Pendientes = require("../models/pendientes");

const addPendiente = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;


  console.log(params);

  // REVISAR SI INGRESAMOS LOS PARAMETROS
  if (!params.pendiente 
    || !params.detalle
   ) {
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
  //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
  const id = req.params.id;
  console.log("ID", id);

  try {
    //BUSCAR SERVICIO EN DB
    let serviceToDB = await Pendientes.findById(id);

    //VERIFICAR QUE EL ESTADO SEA FALSE
    const verificarStado = serviceToDB.complete;
    // console.log(verificarStado);

    if (verificarStado) {
      return res.status(200).send({
        status: "Success",
        message: "REPARACION TERMINADA!",
        service: serviceToDB.complete,
      });
    }

    //CAMBIAR ESTADO DE SERVICIO
    let complete = true;
    serviceToDB.complete = complete;

    let serviceUpdateStatus = await Pendientes.findByIdAndUpdate(
      {
        _id: id,
      },
      serviceToDB,
      { new: true }
    );

    if (!serviceUpdateStatus) {
      return res.status(500).json({
        status: "Error",
        mensaje: "Error al actualziar",
      });
    }
    //MOSTRAR EL SERVICIO
    return res.status(200).json({
      status: "Success",
      message: "Pendiente Termiando 👌",
      service: serviceUpdateStatus,
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
  listPendientes
};
