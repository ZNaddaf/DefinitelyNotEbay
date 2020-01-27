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
                postItem();
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

// Z'S CODE - POST FUNCTION
// -------------------------------------------
// -- Post Item Function
// -------------------------------------------

function postItem() {
    console.log("Let's get some information about the item:")

    // Inquirer Post questions Begin Here
    inquirer.prompt(
        [
            {
                type: "input",
                name: "name",
                message: "What is this item called?"
            },
            {
                type: "input",
                name: "section",
                message: "What type of item is this?"
            },
            {
                type: "input",
                name: "bid",
                message: "What is the price of this item?"
            },
        ]

        // Function to Create Post based on answers        
    ).then(function (data) {
        console.log("Creating a new Post...\n");
        var query = connection.query(
            "INSERT INTO posts SET ?",
            data,
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "Post created!\n");
                mainMenu();
            }
        );
    });
}