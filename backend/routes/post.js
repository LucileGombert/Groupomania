// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le middleware auth
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


// Permet d'importer le controller message
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like');
const commentCtrl = require('../controllers/comment');




// Routes de l'API pour les messages
router.post('', multer, postCtrl.createPost);
router.get('/:postId', postCtrl.getOnePost);
router.get('',  postCtrl.getAllPosts);
router.put('/:postId', auth, multer, postCtrl.modifyPost);
router.delete('/:postId', auth, postCtrl.deletePost);

router.post('/:postId/like', auth, likeCtrl.likePost);

router.post('/:postId/comment', auth, commentCtrl.createComment);
router.get('/:postId/comment/:commentId', auth, commentCtrl.getOneComment);
router.get('/:postId/comment', auth, commentCtrl.getAllComments);
router.put('/:postId/comment/:commentId', auth, commentCtrl.modifyComment);
router.delete('/:postId/comment/:commentId', auth, commentCtrl.deleteComment);


// Permet d'exporter le router
module.exports = router;