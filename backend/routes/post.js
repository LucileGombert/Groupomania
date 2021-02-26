// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le controller message
const postCtrl = require('../controllers/post');

// Permet d'importer le middleware auth
const auth = require('../middleware/auth');


// Routes de l'API pour les messages
router.post('', auth, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.get('', auth, postCtrl.getAllPosts);
// router.put('/:id', auth, postCtrl.modifyPost);
// router.delete('/:id', auth, postCtrl.deletePost);

// router.post('/:id/like', auth, postCtrl.likePost);

// router.post('/:id/comment', auth, postCtrl.createPost);
// router.get('/:id/comment/:id', auth, postCtrl.getOnePost);
// router.get('/:id/comment', auth, postCtrl.getAllPosts);
// router.put('/:id/comment/:id', auth, postCtrl.modifyPost);
// router.delete('/:id/comment/:id', auth, postCtrl.deletePost);


// Permet d'exporter le router
module.exports = router;