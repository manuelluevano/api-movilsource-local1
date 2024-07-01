const { Schema, model } = require("mongoose");

const ServiceSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  servicio: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  marca: {
    type: String,
    required: true,
  },
  imei: {
    type: Number,
  },
  sn: {
    type: String,
  },
  precio: {
    type: Number,
    required: true,
  },
  abono: {
    type: Number,
    default: "0",
  },
  folio: {
    type: Number,
    default: "0000",
  },
  observaciones: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Service", ServiceSchema, "services");
