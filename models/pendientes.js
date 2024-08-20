const { Schema, model } = require("mongoose");

const PendientesSchema = Schema({
  pendiente: {
    type: String,
    required: true,
  },
  detalle: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  dia: {
    type: String,
  },
  status:{
    type: Boolean,
  }
});

module.exports = model("Pendientes", PendientesSchema, "pendientes");
