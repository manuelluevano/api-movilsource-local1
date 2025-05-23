const dotenv = (require("dotenv").config()).parsed

let config = {
    "username": process.env['MYSQL_USER'],
    "password": process.env['MYSQL_PASSWORD'],
    "database": process.env['MYSQL_DB'],
    "host": process.env['MYSQL_HOST'],
    "dialect": "mysql"
}
module.exports = {
  development: config,
  test: config,
  production: config
}