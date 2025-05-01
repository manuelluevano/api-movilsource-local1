// const { Schema, model } = require("mongoose");

// const AccesorioSchema = Schema({
//   nombre: {
//     type: String,
//     required: true,
//   },
//   precio: {
//     type: Number,
//     required: true,
//   },
//   stock: {
//     type: Number,
//     required: true,
//   },
//   categoria: {
//     type: String,
//   },
//   imagen: {
//     type: String,
//   },
// });

// module.exports = model("Accesorio", AccesorioSchema, "accesorio");


const { DataTypes } = require('sequelize');
const sequelize = require('./secuelize-config'); // Asegúrate de importar tu configuración de Sequelize

const Accesorio = sequelize.define('accesorios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // equivalente a required: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false, // equivalente a required: true
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  precio_original: {
    type: DataTypes.DECIMAL,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  stock: {
    type: DataTypes.NUMBER,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  }
}, {
  tableName: 'accesorios', // equivalente al tercer parámetro en Mongoose
  timestamps: true // opcional: crea createdAt y updatedAt automáticamente
});

module.exports = Accesorio;