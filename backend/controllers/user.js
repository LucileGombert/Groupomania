// Permet d'importer le package bcrypt
const bcrypt = require('bcrypt');
// Permet de créer des tokens et de les vérifier
const jwt = require('jsonwebtoken');

// Permet d'importer le modèle de données pour un utilisateur
const dbConnection = require('../config/dbConnection');

const User = require('../models/User');

// Permet de créer un nouvel utilisateur
exports.signup = (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    if(username == null || email == null || password == null) {
        return res.status(400).json({ 'error': 'Tous les champs doivent être complétés'});
    } 

};
