const { DataTypes } = require('sequelize');
const sequelize = require('./secuelize-config'); // Asegúrate de importar tu configuración de Sequelize

const User = sequelize.define('usuarios', {
  name: {
    type: DataTypes.STRING,
    allowNull: false, // equivalente a required: true
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // esto es opcional ya que es el valor por defecto
  }
}, {
  tableName: 'usuarios', // equivalente al tercer parámetro en Mongoose
  timestamps: true // opcional: crea createdAt y updatedAt automáticamente
});

module.exports = User;