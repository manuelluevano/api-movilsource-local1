// const { Sequelize } = require('sequelize');

// // Configuración de la base de datos (modifica con tus credenciales)
// const sequelize = new Sequelize(
//   'sql5777999', // Nombre de la DB
//   'sql5777999',                 // Usuario de MySQL (ej: 'root')
//   'x5DJWpgyfs',              // Contraseña
//   {
//     host: 'sql5.freesqldatabase.com',          // Host de la DB (puede ser '127.0.0.1')
//     dialect: 'mysql',           // Usamos MySQL
//     port: 3306,                 // Puerto por defecto de MySQL
//     logging: false,             // Desactiva logs de SQL en consola (opcional)
//     pool: {                     // Configuración de conexiones (opcional)
//       max: 5,                   // Máximo de conexiones
//       min: 0,                   // Mínimo de conexiones
//       acquire: 30000,           // Tiempo máximo de espera para adquirir conexión (ms)
//       idle: 10000               // Tiempo máximo de inactividad (ms)
//     },
//     define: {
//       timestamps: true,         // Añade createdAt y updatedAt automáticamente (opcional)
//       freezeTableName: true     // Evita que Sequelize pluralice los nombres de tablas (opcional)
//     }
//   }
// );

// // Verifica la conexión
// sequelize.authenticate()
//   .then(() => console.log('✅ Conexión a MySQL establecida correctamente.'))
//   .catch(err => console.error('❌ Error al conectar a MySQL:', err));

// module.exports = sequelize;


const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'movilsource', // Nombre de tu base de datos
  username: 'root',        // Usuario por defecto es 'root'
  password: '',            // Deja vacío si no tiene contraseña
  host: '127.0.0.1',       // Usa 127.0.0.1 en lugar de localhost
  dialect: 'mysql',
  port: 3306,              // Puerto por defecto de MySQL
  dialectOptions: {
    connectTimeout: 60000, // Aumenta el timeout a 60 segundos
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log,    // Para ver las consultas SQL en consola
});

// Función para probar la conexión con reintentos
async function testConnectionWithRetry(maxRetries = 3, delay = 2000) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Conexión establecida con MySQL');
      return;
    } catch (error) {
      retries++;
      console.error(`❌ Intento ${retries} de ${maxRetries}:`, error.message);
      
      if (retries < maxRetries) {
        console.log(`⌛ Esperando ${delay}ms antes de reintentar...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('🔥 No se pudo conectar después de varios intentos');
        throw error;
      }
    }
  }
}

// Llama a la función con manejo de errores
testConnectionWithRetry()
  .then(() => {
    console.log('🚀 Base de datos lista para usar');
  })
  .catch(error => {
    console.error('💥 Error crítico al conectar a MySQL:', error);
    process.exit(1); // Termina el proceso con error
  });

module.exports = sequelize;