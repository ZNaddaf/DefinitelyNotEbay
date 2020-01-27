require("dotenv").config();
const mysql = require("mysql");


const connection = mysql.connection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "great_bay_db",
    password: process.env.DB_PASSWORD
})


console.log(process.env.DB_PASSWORD);

