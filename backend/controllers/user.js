// Imports
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');

require('dotenv').config({path: './config/.env'});

const db = require('../models/index');


// Permet de créer un schéma de validation de mot de passe
const schemaPassword = new passwordValidator();

schemaPassword
.is().min(8)                                    
.is().max(20)                                 
.has().uppercase()                              
.has().lowercase()                              
.has().digits(2)
.has().symbols(1)                                 
.has().not().spaces();


// Permet de créer un nouvel utilisateur
exports.signup = (req, res, next) => {
    var username = req.body.username;
    var email    = req.body.email;
    var password = req.body.password;

    // Permet de vérifier que tous les champs sont complétés
    if (email == null || email == '' || username == null || username == ''|| password == null || password == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de vérifier que l'utilisateur que l'on souhaite créer n'existe pas déjà
    db.User.findOne({
        attributes: ['email'],
        where: { email: email}
    })
    .then(userExist => {
        if(!userExist) {
            // Si le mot de passe comporte les caractères nécessaires, le compte sera créé et enregistré dans la base de données
            if(schemaPassword.validate(req.body.password)) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = db.User.build({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        isAdmin: 0
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Votre compte a bien été créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error: "Une erreur s'est produite lors de la création de votre compte" }));
            } else {
                throw 'Le mot de passe doit contenir entre 8 et 20 caractères dont au moins une lettre majuscule, une lettre minusucle, deux chiffres et un symbole';
            }
        } else {
            return res.status(404).json({ error: 'Cet utilisateur existe déjà'})
        }
    })
    .catch(error => res.status(500).json({ error }));
};


// Permet à un utilisateur de se connecter
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect' });
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        {userId: user.id},
                        process.env.JWT_SECRET_TOKEN,
                        {expiresIn: '1h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(404).json({ error: "Cet utilisateur n'existe pas, veuillez créer un compte"})
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet à un utilisateur de supprimer son compte
exports.deleteAccount = (req, res, next) => {
    db.User.findOne({
        attributes: ['email'],
        where: { email: req.body.email}
    })
    .then(user => {
        if(user) {
            db.User.destroy({ 
                where: { email: req.body.email } 
            })
            .then(() => res.status(200).json({ message: 'Votre compte a été supprimé' }))
            .catch(() => res.status(500).json({ error }));
            
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé'})
        }
    })
}