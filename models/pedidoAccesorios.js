const { Schema, model } = require("mongoose");

const pedidoAccesoriosSchema = Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  accesorio: {
    type: Schema.ObjectId,
    ref: "Accesorio",
  },
  total: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model(
  "PedidoAccesorio",
  pedidoAccesoriosSchema,
  "pedidoAccesorios"
);
