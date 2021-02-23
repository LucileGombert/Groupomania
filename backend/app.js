// Permet d'importer express
const express = require('express');

// Permet de créer l'application express
const app = express();

// Permet d'importer body-parser
const bodyParser = require('body-parser');


// Permet d'importer les routers user et post
const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/post');

// Permet d'importer le fichier de connexion à la base de données
const dbConnection = require('./config/dbConnection');

// Transforme le corps de la requête en objet JS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permet d'accéder aux routes pour les utilisateurs et les publications
app.use('/api/user', userRoutes);
// app.use('/api/post', postRoutes);

// Permet d'exporter l'application express pour pouvoir y accéder depuis les autres fichiers du projet 
module.exports = app;

