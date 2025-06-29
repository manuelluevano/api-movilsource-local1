const { Sequelize } = require('sequelize');

// Configuración remota
const remoteDB = new Sequelize('sql5777999', 'sql5777999', 'x5DJWpgyfs', {
  host: 'sql5.freesqldatabase.com',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Configuración local
const localDB = new Sequelize({
  database: 'movilsource',
  username: 'root',
  password: '',
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: console.log
});

// Elige cuál usar cambiando este valor
const USE_LOCAL_DB = false; // Cambia a false para usar la remota
const sequelize = USE_LOCAL_DB ? localDB : remoteDB;

// Verificar conexión
sequelize.authenticate()
  .then(() => console.log(`✅ Conectado a ${USE_LOCAL_DB ? 'local' : 'remoto'}`))
  .catch(err => console.error('❌ Error de conexión:', err));

module.exports = sequelize;