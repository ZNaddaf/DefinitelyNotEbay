require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
// let post = require("./post.js");
// let bid = require("./bid.js")


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
            if (response.action === "Post") {
                console.log(response.action + " selected!");
                mainMenu();
            }
            else if (response.action === "Bid") {
                console.log(response.action + " selected!");
                mainMenu();
            }
            else if (response.action === "Exit") {
                console.log("Later!");
                connection.end();
            }
        })
}

