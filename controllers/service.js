//IMPORTAR DEPENDENCIAS Y MODULOS
const sequelize = require("../models/secuelize-config");
const Servicios = require("../models/servicios");

//Acciones de pruebas
const pruebaService = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador Servicio",
  });
};

const addService = async (req, res) => {
  try {
    // Validar campos requeridos
    const requiredFields = [
      'nombre', 'apellido', 'numero_contacto', 
      'servicio', 'modelo', 'marca'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "error",
        message: `Faltan los siguientes campos: ${missingFields.join(', ')}`
      });
    }

    // Procesar valores numéricos
    const precio = parseFloat(req.body.precio_servicio) || 0;
    const abono = parseFloat(req.body.abono_servicio) || 0;
    const saldo = precio - abono;

    // Crear objeto de servicio con Sequelize
    const newService = await Servicios.create({
      folio: req.body.folio || await generarFolioAutomatico(),
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      numero_contacto: req.body.numero_contacto,
      servicio: req.body.servicio,
      modelo: req.body.modelo,
      marca: req.body.marca,
      imei: req.body.imei || null,
      numero_serie: req.body.numero_serie || null,
      precio_servicio: precio,
      abono_servicio: abono,
      saldo_pendiente: saldo,
      gaveta: req.body.gaveta || null,
      observaciones: req.body.observaciones || null,
      fecha_registro: req.body.fecha_registro || new Date(),
      fecha_entrega: req.body.fecha_entrega || null,
      estado: req.body.estado || 'recibido',
      userId: req.user.id
    });

    res.status(201).json({
      status: "success",
      message: "Servicio registrado correctamente",
      service: newService,
      folio: newService.folio
    });

  } catch (error) {
    console.error("Error al guardar servicio:", error);
    
    // Manejo específico de errores de validación de Sequelize
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        status: "error",
        message: "Error de validación",
        errors
      });
    }
    
    // Manejo de errores de duplicados (folio único)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: "error",
        message: "El folio ya existe",
        field: error.errors[0].path
      });
    }
    
    res.status(500).json({
      status: "error",
      message: "Error interno del servidor al guardar el servicio",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const listServices = async (req, res) => {

  //Consulta a DB
  try {
    console.log("PRESS");
    
    // obtener todos los articulos
    const servicios = await Servicios.findAll();
    console.log(servicios);
    
     if (!servicios.length > 0) {
       return res.status(404).json({
         status: "error",
         mensaje: "No se han encontrado Servicios",
       });
     }

     return res.status(200).send({
       status: "Success",
       contador: servicios.length,
       servicios,
     });
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Error datos",
    });
  }
};

// CAMBIAR EL ESTADO DEL SERVICIO 
const actualizarEstado = async (req, res) => {
  let t;
  
  try {
    t = await sequelize.transaction();

    const { id } = req.params;
    const { estado } = req.body;
    const userId = req.user.id;

    // Validación de estados
    const estadosPermitidos = Servicios.rawAttributes.estado.values;
    if (!estadosPermitidos.includes(estado)) {
      await t.rollback();
      return res.status(400).json({ 
        success: false,
        message: `Estado no válido. Valores permitidos: ${estadosPermitidos.join(', ')}`,
        received: estado
      });
    }

    // Actualizar el servicio
    const [updatedRows] = await Servicios.update(
      { 
        estado,
        fecha_actualizacion: sequelize.fn('NOW')
      },
      { 
        where: { id },
        transaction: t
      }
    );

    if (updatedRows === 0) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Servicio no encontrado'
      });
    }

    // Obtener el servicio actualizado por separado
    const servicioActualizado = await Servicios.findOne({
      where: { id },
      transaction: t
    });

    await t.commit();

    return res.json({
      success: true,
      message: 'Estado actualizado correctamente',
      data: servicioActualizado
    });

  } catch (error) {
    if (t) await t.rollback();
    
    console.error('Detalles del error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor al actualizar el estado',
      ...(process.env.NODE_ENV === 'development' && {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack
        }
      })
    });
  }
};


const updateStatus = async (req, res) => {
  //RECIBIR EL PARAMETRO DEL ID DEL USUARIO POR URL
  const id = req.params.id;
  console.log("ID", id);

  try {
    //BUSCAR SERVICIO EN DB
    let serviceToDB = await Servicios.findById(id);

    //VERIFICAR QUE EL ESTADO SEA FALSE
    const verificarStado = serviceToDB.status;
    // console.log(verificarStado);

    if (verificarStado) {
      return res.status(200).send({
        status: "Success",
        message: "Equipo Entregado a Cliente 🛠️",
        service: serviceToDB.status,
      });
    }

    //CAMBIAR ESTADO DE SERVICIO
    let status = true;
    serviceToDB.status = status;

    let serviceUpdateStatus = await Servicios.findByIdAndUpdate(
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
    let serviceToDB = await Servicios.findById(id);

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

    let serviceUpdateStatus = await Servicios.findByIdAndUpdate(
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
      message: "Reparacion Realizada con exito 👌",
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
    services = await Servicios.find({
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
    let articulo = await Servicios.findOneAndUpdate({ _id: id }, req.body, {
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
  actualizarEstado,
  updateComplete,
  updateStatus,
  buscador,
  editar,
};
