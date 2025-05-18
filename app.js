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

// Configure CORS options
const corsOptions = {
    origin: [
        'https://manuelluevano.github.io', // Your GitHub Pages domain
        'http://localhost:5173',           // For local development
        'http://localhost:4000'            // Another common local port
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
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