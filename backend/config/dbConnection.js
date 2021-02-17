// Chemin d'accès pour le fichier .env
require('dotenv').config({path: './config/.env'});

// Permet de se connecter à MySQL
const mysql = require('mysql');
const mysql = require('mysql2');

// Permet de configurer l'accès à la base de données
var dbConnection = mysql.createConnection({
host : 'localhost',
port: 3308,
user : process.env.DB_USER,
password : process.env.DB_PASSWORD,
database : process.env.DB_NAME
});
 
// Permet de se connecter à la base de données
dbConnection.connect(function(error) {
    if (error) {
        console.error("La connexion à MySQL a échoué " + error.stack); 
        return;
    }
    console.log("Connexion à MySQL réussie !");
});

module.exports = dbConnection;