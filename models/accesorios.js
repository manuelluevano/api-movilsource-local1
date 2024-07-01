const { Schema, model } = require("mongoose");

const AccesorioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
  },
});

module.exports = model("Accesorio", AccesorioSchema, "accesorio");
