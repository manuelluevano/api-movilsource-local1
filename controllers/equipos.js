//IMPORTAR DEPENDENCIAS Y MODULOS
const uploadImage = require("../services/uploadImage");
const Equipos = require("../models/equipos");

const addEquipo = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  let obj = params.imagen;
  // DESTRUCTURING
  // let img = obj.imagen;

  console.log(params);

  // REVISAR SI INGRESAMOS LOS PARAMETROS
  if (!params.nombre 
    || !params.precio 
    || !params.descripcion
   ) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  const linkImg = await uploadImage(params.imagen);

  //CREAR OBJETO
  const newEquipo = new Equipos({
    nombre: params.nombre,
    precio: params.precio,
    descripcion: params.descripcion,
    imagen: linkImg,
  });

  //  Guardar el articulo en la base de datos
  newEquipo
    .save()
    .then((equipoGuardado) => {
      return res.status(200).json({
        //DEVOLVER DATOS EL ACCESORIO
        status: "success",
        mensaje: "Celular Agregado correctamente",
        equipo: equipoGuardado,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        //devolver error
        status: "error",
        mensaje: "No se ha guardado el celular: " + error.message,
      });
    });
};

const listEquipo = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let equipos = await Equipos.find({});

    if (!equipos.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado Celulares",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: equipos.length,
      equipos,
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
  addEquipo,
  listEquipo,
};
