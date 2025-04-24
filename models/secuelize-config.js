const { Sequelize } = require('sequelize');

// Configuración de la base de datos (modifica con tus credenciales)
const sequelize = new Sequelize(
  'sql3775146', // Nombre de la DB
  'sql3775146',                 // Usuario de MySQL (ej: 'root')
  'MzZps47jrB',              // Contraseña
  {
    host: 'sql3.freesqldatabase.com',          // Host de la DB (puede ser '127.0.0.1')
    dialect: 'mysql',           // Usamos MySQL
    port: 3306,                 // Puerto por defecto de MySQL
    logging: false,             // Desactiva logs de SQL en consola (opcional)
    pool: {                     // Configuración de conexiones (opcional)
      max: 5,                   // Máximo de conexiones
      min: 0,                   // Mínimo de conexiones
      acquire: 30000,           // Tiempo máximo de espera para adquirir conexión (ms)
      idle: 10000               // Tiempo máximo de inactividad (ms)
    },
    define: {
      timestamps: true,         // Añade createdAt y updatedAt automáticamente (opcional)
      freezeTableName: true     // Evita que Sequelize pluralice los nombres de tablas (opcional)
    }
  }
);

// Verifica la conexión
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a MySQL establecida correctamente.'))
  .catch(err => console.error('❌ Error al conectar a MySQL:', err));

module.exports = sequelize;


