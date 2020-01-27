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
                bidItem();
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

function bidItem() {
    connection.query("SELECT * FROM posts", function(err, res) {
        const items = res; // Store the list of all items for the question
        inquirer.prompt(
            [
                {
                    type: "list",
                    name: "name",
                    message: "What item do you want to bid on?",
                    choices: items,
                },
                {
                    type: "input",
                    name: "bid",
                    message: "How much do you want to bid?"
                }
            ]
        ).then(function (data) {
            // data is the response object containing data.name and data.bid
            // See if we can update the database
            var query = connection.query(
                `UPDATE posts SET bid = ${data.bid} WHERE name = "${data.name}" AND bid < ${data.bid}`, function (err, res) {
                    if (err) throw err;

                    const rowsUpdated = res.affectedRows; // Get the # of rows updated
                    if (rowsUpdated > 0) {
                        console.log("Congratulations - Your bid went through!");
                    } else {
                        console.log("SORRY - Your bid was too low!");
                    }
                    
                    mainMenu();
                }
            );
        });
    });   
}