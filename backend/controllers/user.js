// Imports
const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');

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
    var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    if (email == null || email == '' || username == null || username == ''|| password == null || password == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    db.User.findOne({
        attributes: ['email'],
        where: { email: email}
    })
        .then(userExist => {
            if(!userExist) {
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
                return res.status(409).json({ error: 'Cet utilisateur existe déjà'})
            }
        })
        .catch(error => res.status(500).json({ error }));
};
