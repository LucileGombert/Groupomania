// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');

// Permet de créer un nouveau commentaire
exports.createComment = (req, res, next) => {    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    
    db.Post.findOne({
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            const comment = db.Comment.build({
                content: req.body.content,
                postId: postFound.id,
                userId: userId
            })
            comment.save()
                .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet d'afficher un commentaire
exports.getOneComment = (req, res, next) => {
    console.log(req.params.commentId);
    
    db.Comment.findOne({
        where: { id: req.params.commentId },
        include: [{
            model: db.User,
            attributes: [ 'username' ]
        }]
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
        } else {
            res.status(404).json({ error: 'Commentaire non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet d'afficher tous les commentaires
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [['updatedAt', "DESC"], ['createdAt', "DESC"]],
        where: { postId: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'username' ]
        }]
    })
    .then(commentFound => {
        if(commentFound) {
            res.status(200).json(commentFound);
        } else {
            res.status(404).json({ error: "Aucun commentaire trouvé" });
        }
    })
    .catch(error => {
        res.status(500).send({ error });
    });
}


// Permet de modifier un commentaire
exports.modifyComment = (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId },
    })
    .then(commentFound => {
        if(commentFound) {
            db.Comment.update(req.body, {
                where: { id: req.params.commentId}
            })
            .then(comment => res.status(200).json({message: 'Votre commentaire a été modifié'}))
            .catch(error => res.status(400).json({ error}))
        } else {
            res.status(404).json({ error: "Commentaire non trouvé" });
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet de supprimer un commentaire
exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
      
    })
    .then(commentFound => {
        if(commentFound) {
            db.Comment.destroy({ 
                where: { id: req.params.commentId } 
                
            })
            .then(() => res.status(200).json({ message: 'Votre commentaire a été supprimé' }))
            .catch(() => res.status(500).json({ error }));
            
        } else {
            return res.status(404).json({ error: 'Commentaire non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}
