//Importation du module mysql
var mysql = require("mysql");

//Constructeur
const User = function(user) {
    this.id = user.id;
    this.nom = user.nom;
    this.mail = user.mail;
    this.mdp = user.mdp;
};

//Exportation du modèle de données
module.exports = User;