const { DataTypes } = require('sequelize');
const sequelize = require('./secuelize-config'); // Asegúrate de importar tu configuración de Sequelize

const Pendientes = sequelize.define('pendientes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  pendiente: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: "Descripción breve del pendiente (ej. 'Cambio de batería')"
  },
  detalle: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: "Información adicional del servicio/reparación"
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    comment: "Fecha y hora de registro"
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    comment: "Fecha estimada o real de entrega"
  },
  telefono: {
    type: DataTypes.STRING(20),
    allowNull: true,
    comment: "Teléfono del cliente para contacto"
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado'),
    defaultValue: 'pendiente',
    allowNull: false,
    validate: {
      isIn: [['pendiente', 'completado', 'cancelado']]
    },
    comment: "Estado del trabajo"
  }
}, {
  tableName: 'pendientes',
  timestamps: false, // Desactiva los campos createdAt y updatedAt
  comment: "Tabla para gestionar pendientes de reparación de celulares"
});

module.exports = Pendientes;