const { Schema, model } = require("mongoose");

const PendientesSchema = Schema({
  pendiente: {
    type: String,
    required: true,
  },
  detalle: {
    type: String,
  },
  telefono: {
    type: Number,
  },
  dia: {
    type: String,
  },
  status:{
    type: Boolean,
    default: false,
  }
});

module.exports = model("Pendientes", PendientesSchema, "pendientes");
