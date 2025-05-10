// database.js
const mysql = require('mysql2/promise'); // Usamos la versión con promesas

// Configuración de la conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'sql5.freesqldatabase.com	',
  user: process.env.DB_USER || 'sql5777999',
  password: process.env.DB_PASSWORD || 'x5DJWpgyfs',
  database: process.env.DB_NAME || 'sql5777999',
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0
});

// Función para ejecutar consultas
async function query(sql, params) {
  const connection = await pool.getConnection();
  try {
    const [results] = await connection.execute(sql, params || []);
    return results;
  } catch (error) {
    console.error('Error en la consulta SQL:', error);
    throw error;
  } finally {
    connection.release(); // Liberar la conexión al pool
  }
}


module.exports = {
  query,
  pool // Exportamos el pool por si se necesita acceso directo
};