//IMPORTAR DEPENDENCIAS Y MODULOS
const User = require("../models/user");
const bcrypt = require("bcrypt");

//IMPORTAR SERVICIOS
const jwt = require("../services/jwt");
const { validarRegistro } = require("../helper/validate");

//Acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    mensaje: "Mensaje enviado desde el controlador user",
    usuario: req.user,
  });
};

const login = async (req, res) => {
  //RECOGER PARAMETROS
  let params = req.body;

  console.log(req.body);

  //REVISAR SI HAY EMAIL Y PASSWORD ENVIADOS
  if (!params.email || !params.password) {
    return res.status(400).json({
      //devolver error
      status: "Error",
      mensaje: "Faltan datos por enviar",
    });
  }

  //BUSCAR USUARIO SI EXISTE EN LA BASE DE DATOS //
  // con .select ocultamos la password del usuario
  const userSearch = await User.findOne({ email: params.email.toLowerCase() });
  // .select({"password": 0})

  if (!userSearch) {
    return res.status(400).json({
      status: "error",
      mensaje: "Email no encontrado 🤷",
    });
  }

  //COMPROBAR SU CONTRASEBA
  const pwd = bcrypt.compareSync(params.password, userSearch.password);

  if (!pwd) {
    return res.status(400).json({
      status: "error",
      mensaje: "Password incorrecta 😐",
    });
  }

  //CONSEGUIR EL TOKEN
  const token = jwt.createToken(userSearch);

  //DEVOLVER TOKEN
  //ELIMINAR PASSWORD DEL OBJETO

  //DEVOLVER DATOS DEL USUARIO
  return res.status(200).json({
    //devolver error
    status: "Success",
    mensaje: "Te Has Identificado Correctamente",
    userSearch: {
      id: userSearch._id,
      name: userSearch.name
    },
    token,
  });
};

const register = async (req, res) => {
  //Recoger  los parametros  por postt a guardar
  let params = req.body;

  //COMPROBAR QUE LLEGUEN BIEN + (VALIDACION)
  try {
    validarRegistro(params);
  } catch (error) {
    return res.status(400).json({
      status: "Error",
      mensaje: "No se ha validado la información",
    });
  }

  //CONTROL DE USUARIOS DUPLICADOS
  let userSearch = await User.find({
    $or: [{ email: params.email.toLowerCase() }],
  });

  if (userSearch && userSearch.length >= 1) {
    return res.status(200).send({
      status: "Success",
      message: "El usuario ya existe",
    });
  }

  //CIFRAR LA CONTRASENA
  let newPass = await bcrypt.hash(params.password, 10);

  params.password = newPass;

  //CREAR OBJETO DE USUARIO
  let user_to_save = new User(params);

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

const update = async (req, res) => {
  //RECOGER INFO DEL USER A ACTUALIZAR
  let userIdentify = req.params.id;

  //RECOGER NUEVOS DATOS
  let userToUpdate = req.body;

  //Eliminar campos sobrantes
  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;
  delete userToUpdate.imagen;

  console.log(userToUpdate);

  // //VALIDAR DATOS
  // try {
  //   validarUpdate(userToUpdate);
  // } catch (error) {
  //   return res.status(400).json({
  //     status: "Error",
  //     mensaje: "Faltan datos para enviar",
  //   });
  // }

  //COMPROBAR SI EL USUARIO A ACTUALIZAR TIENE LOS MISMO DATOS QUE VAMOS A ENVIAR
  // let userSearch = await User.find({
  //   $or: [
  //     { name: userToUpdate.name.toLowerCase() },
  //     { surname: userToUpdate.surname.toLowerCase() },
  //     { email: userToUpdate.email.toLowerCase() },
  //   ],
  // });

  // let userIsset = false;

  // //BUSCAR SI EXISTE EN LA BASE DE DATOS EL USUARIO INGRESASO (email Y name)
  // userSearch.forEach((user) => {
  //   if (user && user._id != userIdentify) userIsset = true;
  // });

  // if (userIsset) {
  //   return res.status(200).send({
  //     status: "Success",
  //     message: "El usuario ya existe y es igual a los datos que envia",
  //     userIsset,
  //     userToUpdate,
  //   });
  // }

  //CIFRAR LA NUEVA CONTRASENA
  if (userToUpdate.password) {
    let newPass = await bcrypt.hash(userToUpdate.password, 10);

    userToUpdate.password = newPass;
  } else {
    //SI NO ENVIAS PASSWORD - REMOVER CAMPO PARA NO ENVIARLO VACIO
    delete userToUpdate.password;
  }

  //BUSCAR Y ACTUALIZAR INFORMACION DE USUARIO
  try {
    let UserActualizado = await User.findByIdAndUpdate(
      {
        _id: userIdentify,
      },
      userToUpdate,
      { new: true }
    );

    if (!UserActualizado) {
      return res.status(500).json({
        status: "Error",
        mensaje: "Error al actualziar",
      });
    }

    //MOSTRAR EL USUARIO
    return res.status(200).json({
      status: "Success",
      message: "Usuario Actualizado Correctamente",
      user: UserActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      mensaje: "Error en la consulta",
      error,
    });
  }
};
//EXPORTAR ACCIONES
module.exports = {
  pruebaUser,
  login,
  register,
  update,
};
