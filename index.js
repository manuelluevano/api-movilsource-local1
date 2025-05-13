// //CONEXION A BASE DE DATOS
// // const connection  = require("./db/conexion");
// const express = require("express")
// const cors = require("cors")
// require("dotenv").config({ path: "variables.env" });
// const config = require("./config");


// //Conectar a la base de datos MONGO
// // connection()

// //CREAR SERVIDOR DE NODE
// const app = express()

// //CONFIGURAR EL CORS
// app.use(cors())

// //CONVERTIR LOS DATOS DEL BODY A OBJETO JS
// app.use(express.json({
//     limit: '50mb'
// }));

// app.use(express.urlencoded({extended: true}));

// //CARGAR LAS RUTAS
// const UserRutes = require("./routes/user")
// const AccesorioRutes = require("./routes/accesorios")
// const ServiceRutes = require("./routes/service")
// const PedidoAccesorioRutes =  require("./routes/pedidoAccesorios")
// const PendienteRutes = require("./routes/pendientes")
// const EquiposRutes = require("./routes/equipos")

// app.use("/accesorio", AccesorioRutes)
// app.use("/user", UserRutes)
// app.use("/service", ServiceRutes)
// app.use("/pedido", PedidoAccesorioRutes)
// app.use("/pendiente", PendienteRutes)
// app.use("/equipos", EquiposRutes)

// //RUTA PRUEBA
// app.get("/ruta-prueba", (req, res)=> {
//     return res.status(200).json(
//         {
//             id: 1,
//             nombre: "Vistor"
//         }
//     )
// })

// var host = process.env.HOST || "0.0.0.0";
// var port = process.env.PORT || 3000;

// //Crear servidor y escuchar peticiones http
// app.listen(port,host, () => {
//   console.log("Servidor corriendo en el pueto", port);
// });




const app = require("./app");

app.listen(app.get('port'), () => {
    console.log("Servidor escuchando en el puerto", app.get("port"));
})