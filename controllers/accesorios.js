//IMPORTAR DEPENDENCIAS Y MODULOS
const uploadImage = require("../services/uploadImage");
const Accesorios = require("../models/accesorios");

const addAccesorio = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  let obj = params.imagen;
  // DESTRUCTURING
  // let img = obj.imagen;

  console.log(params);

  // REVISAR SI INGRESAMOS LOS PARAMETROS
  if (!params.nombre || !params.precio || !params.stock || !params.imagen) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  const linkImg = await uploadImage(params.imagen);

  //CREAR OBJETO
  const newAccesorio = new Accesorios({
    nombre: params.nombre,
    precio: params.precio,
    stock: params.stock,
    categoria: params.categoria,
    imagen: linkImg,
  });

  //  Guardar el articulo en la base de datos
  newAccesorio
    .save()
    .then((accesorioGuardado) => {
      return res.status(200).json({
        //DEVOLVER DATOS EL ACCESORIO
        status: "success",
        mensaje: "Accesorio registrado correctamente",
        accesorio: accesorioGuardado,
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

const listAccesorio = async (req, res) => {
  //Consulta a DB
  try {
    // obtener todos los articulos
    let accesorios = await Accesorios.find({});

    if (!accesorios.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado el accesorio",
      });
    }

    return res.status(200).send({
      status: "Success",
      // parametro: req.params.ultimos,
      contador: accesorios.length,
      accesorios,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

// const editar = async (req, res) => {
//   //recoger el id
//   let id = req.params.id;

//   console.log("Parametro", id);
//   // //RECOGER DATOS DEL BODY
//   let parametros = req.body;

//   console.log("Nuevos datos", parametros);
//   // //VALIDAR DATOS
//   // if (!id) {
//   //   return res.status(400).json({
//   //     //devolver error
//   //     status: "Error",
//   //     mensaje: "Faltan datos por enviar",
//   //   });
//   // }
//   //BUSCAR Y ACTUALIZAR ARTICULO
//   try {
//     let refaccion = await Refaccion.findOneAndUpdate({ _id: id }, req.body, {
//       new: true,
//     });

//     //MOSTRAR EL ARTICULO
//     return res.status(200).json({
//       status: "Success",
//       mensaje: "Servicio Actualizado 👌🏿",
//       refaccion: refaccion,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       status: "Error",
//       mensaje: "Faltan datos para enviar",
//     });
//   }
// };

const buscador = async (req, res) => {
  try {
    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //Find OR // OR = SELECT * FROM
    let accesorios = await Accesorios.find({
      $or: [{ nombre: { $regex: busqueda, $options: "i" } }],
    });

    if (!accesorios.length > 0) {
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado services",
      });
    }

    //Devolver resultado
    return res.status(200).send({
      status: "Success",
      contador: accesorios.length,
      accesorios,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      mensaje: "Error al buscar",
    });
  }
};

//SACAR UN ACCESORIO POR ID

const detail = async (req, res) => {
  let id = req.params.id;

  // console.log(id);
  try {
    //BUSCAR SERVICIO EN DB
    let accesorio = await Accesorios.findById(id);

    if (accesorio) {
      //Devolver resultado
      return res.status(200).send({
        status: "Success",
        accesorio,
      });
    }
  } catch (error) {
    return res.status(400).json({
      //devolver error
      status: "error",
      mensaje: "No se ha guardado el servicio: " + error.message,
    });
  }
};

const editar = async (req, res) => {
  //recoger el id
  let id = req.params.id;

  console.log("Parametro", id);
  // //RECOGER DATOS DEL BODY
  let parametros = req.body;

  console.log("Nuevos datos", parametros);
  
  //BUSCAR Y ACTUALIZAR ARTICULO
  try {
    let accesorio= await Accesorios.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    //MOSTRAR EL ARTICULO
    return res.status(200).json({
      status: "Success",
      mensaje: "Accesorio Actualizado 👌🏿",
      accesorio: accesorio,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "Error",
      mensaje: "Faltan datos para enviar",
    });
  }
};

const ventaAccesorio = async (req, res) => {
  
      //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
      const id = req.params.id;
      console.log("ID", id);
    
      try {
        //BUSCAR ACCEOSRIO EN DB
        let accesorioDB = await Accesorios.findById(id);
    
        //VERIFICAR QUE HAYA STOCK
        const verificarStock = accesorioDB.stock;
        // console.log(verificarStado);
    
          if (verificarStock < 1) {
            return res.status(400).send({
              status: "ERROR",
              message: "NO HAY STOCK!",
              error
            });
          }else{
          accesorioDB.stock = accesorioDB.stock - 1;

          let accesorioUpdateStock = await Accesorios.findByIdAndUpdate(
          {
            _id: id,
          },
          accesorioDB,
          { new: true }
        );
    
        if (!accesorioUpdateStock) {
          return res.status(500).json({
            status: "Error",
            mensaje: "Error al actualziar",
          });
        }
        // MOSTRAR EL SERVICIO
        return res.status(200).json({
          status: "Success",
          message: "Accesorio Vendido :)",
          accesorioDB: accesorioDB,
        });
          }
        } catch (error) {
          return res.status(400).send({
            status: "ERROR",
            message: "NO HAY STOCK!",
            error
          });
        }
       
      }
        // //REDUCIR 1 A STOCK
    
        
      // } catch (error) {
      //   return res.status(500).json({
      //     status: "Error",
      //     mensaje: "Error en la consulta",
      //     error,
      //   });
      // }
    

//EXPORTAR ACCIONES
module.exports = {
  addAccesorio,
  listAccesorio,
  buscador,
  editar,
  detail,
  ventaAccesorio
};
