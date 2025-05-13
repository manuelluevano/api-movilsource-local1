//importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

//clave secreta
const secret = "CLAVE_SECRETA_RED_SOCIAL";

//crear una funcion para generar tokens
const createToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    imagen: user.imagen,
    bio: user.bio,
    iat: moment().unix(),
    exp: moment().add(60000, "ms"),
  };

  // devolver jwt token codificado
  return jwt.encode(payload, secret);
};


module.exports = { secret, createToken };
