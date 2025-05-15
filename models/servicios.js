const { DataTypes } = require('sequelize');
const sequelize = require('./secuelize-config'); // Asegúrate de importar tu configuración de Sequelize


const Servicios = sequelize.define('servicios_celulares', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  folio: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  numero_contacto: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  servicio: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  imei: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  numero_serie: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  precio_servicio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  abono_servicio: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    allowNull: true
  },
  saldo_pendiente: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  gaveta: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  // En tu modelo Servicios (probablemente en models/servicios.js)
  estado: {
      type: DataTypes.ENUM('recibido', 'en_proceso', 'terminado', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'recibido',
      validate: {
        isIn: [['recibido', 'en_proceso', 'terminado', 'entregado', 'cancelado']]
      }
    },
}, {
  tableName: 'servicios_celulares', // equivalente al tercer parámetro en Mongoose
  timestamps: false // opcional: crea createdAt y updatedAt automáticamente
});

module.exports = Servicios;