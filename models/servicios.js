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
  estado: {
    type: DataTypes.ENUM('recibido', 'proceso', 'terminado', 'entregado', 'cancelado'),
    allowNull: false,
    defaultValue: 'recibido',
    validate: {
      isIn: [['recibido', 'proceso', 'terminado', 'entregado', 'cancelado']]
    }
  },
  // Nuevos campos para funda y chip
  tiene_funda: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  tiene_chip: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  compania_chip: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['Telcel', 'Movistar', 'AT&T México', 'Unefón', 'Virgin Mobile', 'Bait', 'Oui', 'Weex', null]]
    }
  }
}, {
  tableName: 'servicios_celulares',
  timestamps: false
});

module.exports = Servicios;