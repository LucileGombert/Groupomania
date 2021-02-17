// Permet d'importer le package bcrypt
const bcrypt = require('bcrypt');

// Permet d'importer le modèle de données pour un utilisateur
const dbConnection = require('../config/dbConnection');

const User = require('../models/User');

// Permet de créer un nouvel utilisateur
// exports.signup = (req, res, next) => {
//     const {nom, mail, mdp} = req.body

//     try {
//         const user = new User({nom, mail, mdp});
//         res.status(201).json({ user: user.nom});
//     }
//     catch(err) {
//         res.status(200).send({ err})
//     }
// };


exports.signup = (req, res, next) => {
   
            //Création d'un nouvel utilisateur
            const user = new User({
                nom: req.body.nom,
                mail: req.body.email,
                mdp: hash,
 
            });
            //Enregistrement du new user dans la base de données
            
            let data = [nom, mail, mdp];
            dbConnection.query('INSERT INTO user SET nom=?, mail=?, mdp=?', data, (err, data, fields) => {
                if (err) throw err
                    
            })
       
        
}