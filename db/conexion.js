// const mongoose = require("mongoose");
// require("dotenv").config({ path: "variables.env" });

// const connection = async () => {
//   mongoose.Promise = global.Promise;
//   mongoose
//    .connect(process.env.MONGO_DB_URL || process.env.DB_URL)
//     .then(() => console.log("Conectado a la base de datos"))
//     .catch((error) => console.log(error));
// };


// module.exports =  connection;




// --------------- MYSQL ---------------- ///


const mysql2Promise = require("mysql2/promise");
const mysql = require("mysql");
const config = require("./config");


const mysqlpool = mysql2Promise.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.databaase,
})




//CONFIGURACION MYSQL
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.databaase,
}

let conexion;

function conexionMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((error) => {
        if(error){
            console.log("db error", error);
            setTimeout(conexionMysql, 200);
        }else{
            console.log("DB conected");
        }
    })

    conexion.on("error", error => {
        console.log("db error", error);
        if(error.code === "PROTOCOL_CONNECTION_LOSE"){
            conexionMysql();
        }else{
            throw err;
        }
    })
}

conexionMysql();