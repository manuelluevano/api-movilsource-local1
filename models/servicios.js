const { DataTypes } = require('sequelize');
const Servicio = sequelize.define('servicios_celulares', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  folio: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: true // Se actualizará con el trigger
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
  diferencia: {
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
    type: DataTypes.ENUM('recibido', 'en_reparacion', 'reparado', 'entregado', 'cancelado'),
    defaultValue: 'recibido',
    allowNull: false
  }
}, {
  tableName: 'servicios_celulares',
  timestamps: false, // Desactivamos los timestamps automáticos ya que tenemos fecha_registro
  hooks: {
    beforeCreate: (servicio, options) => {
      // Calculamos la diferencia automáticamente antes de crear
      servicio.diferencia = servicio.precio_servicio - (servicio.abono_servicio || 0);
    },
    beforeUpdate: (servicio, options) => {
      // Recalculamos la diferencia al actualizar
      if (servicio.changed('precio_servicio') || servicio.changed('abono_servicio')) {
        servicio.diferencia = servicio.precio_servicio - (servicio.abono_servicio || 0);
      }
    }
  }
});

module.exports = Servicio;