//IMPORTAR DEPENDENCIAS Y MODULOS

const pendientes = require("../models/Pendientes");

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
  const newPendiente = new pendientes(params);

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

   //RECOGER PARAMETROS
   let params = req.body;


   console.log(params);

  // Consulta a DB
  try {
    // obtener todos los pendientes
    let Pendientes = await pendientes.find({});

    if (!Pendientes.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado pendientes",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: Pendientes.length,
      Pendientes,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};


//EXPORTAR ACCIONES
module.exports = {
  addPendiente,
  listPendientes
};
