/**
 * La classe qui établit la connexion à la BD
 */

const mysql = require("mysql");

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "memory"
});

connection.connect(function (error) {
    if (error) throw error;
});

module.exports = connection;