require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "great_bay_db",
    password: process.env.DB_PASSWORD
})


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadID);
    mainMenu();
    connection.end();
})

function mainMenu() {
    inquirer
        .prompt([{
            type: "list",
            name: "action",
            message: "Would you like to Post an item or Bid on an item?",
            choices: [
                "Post",
                "Bid",
                "Exit"
            ]
        }]).then(function (response) {
            console.log(response.action + " selected!");
        })
}

