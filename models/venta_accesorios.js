const { DataTypes } = require('sequelize');
const sequelize = require('./secuelize-config'); // Asegúrate de importar tu configuración de Sequelize

const Venta_accesorios = sequelize.define('venta_accesorios', {
  id_vendedor: {
    type: DataTypes.NUMBER,
    allowNull: false, // equivalente a required: true
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  total: {
    type: DataTypes.NUMBER,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  comentarios: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  detalles: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  }
}, {
  tableName: 'venta_accesorios', // equivalente al tercer parámetro en Mongoose
  timestamps: false // opcional: crea createdAt y updatedAt automáticamente
});

module.exports = Venta_accesorios;