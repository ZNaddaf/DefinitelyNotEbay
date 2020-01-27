// -------------------------------------------
// -- NPM Databases
// -------------------------------------------
const mysql = require("mysql");
const inquirer = require("inquierer");


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