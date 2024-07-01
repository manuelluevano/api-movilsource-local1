const validator = require("validator");

const validarRegistro = (params) => {
  //VALIDAR DATOS
  // console.log(params);

  let validarName =
    !validator.isEmpty(params.name) &&
    validator.isLength(params.name, { min: 3, max: 15 }) &&
    validator.isAlpha(params.name, "es-ES");

  let validateSurname =
    !validator.isEmpty(params.surname) &&
    validator.isLength(params.surname, { min: 2, max: 15 }) &&
    validator.isAlpha(params.surname, "es-ES");


  let validarEmail =
    !validator.isEmpty(params.email) && validator.isEmail(params.email);

  let validarPassword = !validator.isEmpty(params.password);


  if (
    !validarName ||
    !validateSurname ||
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
