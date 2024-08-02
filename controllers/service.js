//IMPORTAR DEPENDENCIAS Y MODULOS
// const Service = require("../models/service");
// const bcrypt = require("bcrypt");

const Service = require("../models/service");
// const { infoUserId } = require("../services/userService");

//IMPORTAR services
// const jwt = require("../services/jwt");
// const { validarRegistro } = require("../helper/validate");

//Acciones de pruebas
const pruebaService = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador Servicio",
  });
};

const addService = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  console.log(req.body);

  //REVISAR SI INGRESAMOS LOS PARAMETROS
  if (
    !params.name ||
    !params.apellido ||
    !params.telefono ||
    !params.servicio ||
    !params.modelo ||
    !params.marca ||
    !params.precio || 
    !params.folio  ||
    !params.firma

  ) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //CREAR OBJETO DE USUARIO
  let service_to_save = new Service(params);
  service_to_save.user = req.user.id;

  // Guardar el articulo en la base de datos
  service_to_save
    .save()
    .then((servicioGuardado) => {
      return res.status(200).json({
        //DEVOLVER DATOS DEL SERVICIO
        status: "success",
        mensaje: "Servicio registrado correctamente",
        servicio: servicioGuardado,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        //devolver error
        status: "error",
        mensaje: "No se ha guardado el servicio: " + error.message,
      });
    });
};

const listServices = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let services = await Service.find({})
      .sort({
        fecha: 1,
      })
      .populate("user");

    if (!services.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado articulos",
      });
    }

    //OBTENER SERVICIOS REALIZADO Y NO REALIZADOS
    let servicesPendient = await Service.find({ status: false })
      .sort({
        fecha: 1,
      })
      .populate("user");

    let servicesFinished = await Service.find({ status: true })
      .sort({
        fecha: 1,
      })
      .populate("user");

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: services.length,
      servicesPendient: servicesPendient.length,
      servicesFinished: servicesFinished.length,
      services,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

const updateStatus = async (req, res) => {
  //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
  const id = req.params.id;
  console.log("ID", id);

  try {
    //BUSCAR SERVICIO EN DB
    let serviceToDB = await Service.findById(id);

    //VERIFICAR QUE EL ESTADO SEA FALSE
    const verificarStado = serviceToDB.status;
    // console.log(verificarStado);

    if (verificarStado) {
      return res.status(200).send({
        status: "Success",
        message: "El Servicio ya se entrego",
        service: serviceToDB.status,
      });
    }

    //CAMBIAR ESTADO DE SERVICIO
    let status = true;
    serviceToDB.status = status;

    let serviceUpdateStatus = await Service.findByIdAndUpdate(
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
      message: "SERVICIO ENTREGADO :)",
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
const updateComplete = async (req, res) => {
  //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
  const id = req.params.id;
  console.log("ID", id);

  try {
    //BUSCAR SERVICIO EN DB
    let serviceToDB = await Service.findById(id);

    //VERIFICAR QUE EL ESTADO SEA FALSE
    const verificarStado = serviceToDB.complete;
    // console.log(verificarStado);

    if (verificarStado) {
      return res.status(200).send({
        status: "Success",
        message: "El EQUIPO YA SE TERMINO!",
        service: serviceToDB.complete,
      });
    }

    //CAMBIAR ESTADO DE SERVICIO
    let complete = true;
    serviceToDB.complete = complete;

    let serviceUpdateStatus = await Service.findByIdAndUpdate(
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
      message: "Servicio Terminado :)",
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


const buscador = async (req, res) => {
  try {
    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //Find OR // OR = SELECT * FROM
    services = await Service.find({
      $or: [
        { name: { $regex: busqueda, $options: "i" } },
        { telefono: { $regex: busqueda, $options: "i" } },
        { servicio: { $regex: busqueda, $options: "i" } },
        { modelo: { $regex: busqueda, $options: "i" } },
        { marca: { $regex: busqueda, $options: "i" } },
        { folio: { $regex: busqueda, $options: "i" } },
        { observaciones: { $regex: busqueda, $options: "i" } },
      ],
    })
      .sort({ fecha: 1 })
      .populate("user"); //Orden

    if (!services.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado services",
      });
    }

    //Devolver resultado
    return res.status(200).send({
      status: "Success",
      contador: services.length,
      services,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      mensaje: "Error al buscar",
    });
  }
};

const editar = async (req, res) => {
  //recoger el id
  let id = req.params.id;

  console.log("Parametro", id);
  // //RECOGER DATOS DEL BODY
  let parametros = req.body;

  console.log("Nuevos datos", parametros)
  // //VALIDAR DATOS
  // if (!id) {
  //   return res.status(400).json({
  //     //devolver error
  //     status: "Error",
  //     mensaje: "Faltan datos por enviar",
  //   });
  // }
  //BUSCAR Y ACTUALIZAR ARTICULO
  try {
    let articulo = await Service.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    //MOSTRAR EL ARTICULO
    return res.status(200).json({
      status: "Success",
      mensaje: "Accesorio Actualizado 👌🏿",
      articulo: articulo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos para enviar",
    });
  }
};
//EXPORTAR ACCIONES
module.exports = {
  pruebaService,
  addService,
  listServices,
  updateComplete,
  updateStatus,
  buscador,
  editar,
};
