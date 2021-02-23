// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le controller utilisateurs
const userCtrl = require('../controllers/user');



// Routes de l'API pour les utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login',userCtrl.login);
router.delete('/:id',userCtrl.deleteAccount);




// Permet d'exporter le router
module.exports = router;