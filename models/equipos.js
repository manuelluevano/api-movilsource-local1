const { Schema, model } = require("mongoose");

const EquiposSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
});

module.exports = model("Equipos", EquiposSchema, "equipos");
