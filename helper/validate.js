const validator = require("validator");

const validarRegistro = (params) => {
  //VALIDAR DATOS
  console.log(params);

  let validarName =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: 15 }) &&
    validator.isAlpha(params.name, "es-ES");

    let validarLastname =
    !validator.isEmpty(params.lastname) &&
    validator.isLength(params.lastname, { min: 3, max: 15 }) &&
    validator.isAlpha(params.lastname, "es-ES");

  let validateUsername =
    !validator.isEmpty(params.username) &&
    validator.isLength(params.username, { min: 2, max: 15 })


  let validarEmail =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);

  let validarPassword = !validator.isEmpty(params.password);


  if (
    !validarName ||
    !validarLastname ||
    !validateUsername ||
    !validarEmail ||
    !validarPassword
  ) {
    throw new Error("No se ha validado la información");
  } else {
    console.log("Validacion superada");
  }
};



module.exports = {
  validarRegistro,
};
