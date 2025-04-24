require("dotenv").config();

module.exports = {
    app: {
        port: process.env.PORT || 3306,
    },
    jwt: {
        secret: process.env.JET_SECRET || 'notasecreta!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || "sql3.freesqldatabase.com",
        user: process.env.MYSQL_USER || "sql3775146",
        password: process.env.MYSQL_PASSWORD || "MzZps47jrB",
        databaase: process.env.MYSQL_DB || "sql3775146",
    }
} 

