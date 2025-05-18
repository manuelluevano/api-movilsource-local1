const express = require("express");
const morgan = require("morgan");
const cors = require('cors'); // Instala con: npm install cors
// const config = require("./config");

// const clientes = require("./modulos/clientes/rutas");
// const auth = require("./modulos/auth/rutas");
const errors = require("./errors");
const config = require("./db/config");

//CREAR SERVIDOR DE NODE
const app = express();

// Configuración CORS detallada
const corsOptions = {
  origin: [
    'http://localhost:5173', // Desarrollo local
    'https://manuelluevano.github.io', // Producción
    'https://tu-frontend.com' // Otros dominios permitidos
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antiguos
};

// Middlewares importantes
app.use(cors(corsOptions));
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true }));

// Manejar preflight requests
app.options('*', cors(corsOptions));

  
//MIDDLEWARE
app.use(morgan('dev'));

//RECONOCER LOS OBJETOS JSON
//CONVERTIR LOS DATOS DEL BODY A OBJETO JS
app.use(express.json({
    limit: '50mb'
}));

app.use(express.urlencoded({extended: true}));

//CONFIGURACION
app.set("port", config.app.port);

//CARGAR LAS RUTAS
//RUTAS
const UserRutes = require("./routes/user")
const AccesorioRutes = require("./routes/accesorios")
const VentaAccesorioRutes = require("./routes/pedidoAccesorios")
const ServicioRutes = require("./routes/service")


app.use("/user", UserRutes);
app.use("/accesorio", AccesorioRutes);
app.use("/venta", VentaAccesorioRutes);
app.use("/service", ServicioRutes);


app.use(errors)

module.exports = app;