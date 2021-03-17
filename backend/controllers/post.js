// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');


// Permet de créer un nouveau message
exports.createPost = (req, res, next) => {   
    const content = req.body.content;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    
    // Permet de vérifier que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (content.length <= 4) {
        return res.status(400).json({ error: 'Le titre doit contenir au moins 2 caractères et le contenu doit contenir au moins 4 caractères' });
    }
    
    db.User.findOne({
        where: { id: userId }
    })
    .then(userFound => {
        if(userFound) {
            const postObject = req.body;
            
            if(req.file) {
                const postObject = JSON.parse(req.body.post);
                // postObject.imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                // imagePost = (req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null)
            }
            const post = db.Post.build({
                ...postObject,
                UserId: userFound.id
            })
            
            // const post = db.Post.build({
            //     content: req.body.content,
            //     imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            //     UserId: userFound.id
            // })

            post.save()
                .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));


    exports.createSauce = (req, res, next) => {
        const sauceObject = JSON.parse(req.body.sauce);
        delete sauceObject._id;
        const sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauce.save()
            .then(() => res.status(201).json({message: 'Sauce enregistrée'}))
            .catch(error => res.status(400).json({error}));
    };
};


// Permet d'afficher un message
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({
        where: { id: req.params.postId },
        include: [{
            model: db.User,
            attributes: [ 'username' ]
        }]
    })
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet d'afficher tous les messages
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        order: [['updatedAt', "DESC"], ['createdAt', "DESC"]] ,
        include: [{
            model: db.User,
            attributes: [ 'username' ]
        }]
    })
    .then(postFound => {
        if(postFound) {
            res.status(200).json(postFound);
        } else {
            res.status(404).json({ error: "Aucun message trouvé" });
        }
    })
    .catch(error => {
        res.status(500).send({ error });
    });
}


// Permet de modifier un message
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
    {
    ...JSON.parse(req.body.post),
    imagePost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    db.Post.findOne({
        where: { id: req.params.postId },
    })
    .then(postFound => {
        if(postFound) {
            db.Post.update(postObject, {
                where: { id: req.params.postId}
            })
            .then(post => res.status(200).json({message: 'Votre message a bien été modifié !'}))
            .catch(error => res.status(400).json({ error}))
        } else {
            res.status(404).json({ error: "Message non trouvé" });
        }
    })
    .catch(error => res.status(500).json({ error }));
}


// Permet de supprimer un message
exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        attributes: ['id'],
        where: { id: req.params.postId }
    })
    .then(postFound => {
        if(postFound) {
            db.Post.destroy({ 
                where: { id: req.params.postId } 
            })
            .then(() => res.status(200).json({ message: 'Votre message a été supprimé' }))
            .catch(() => res.status(500).json({ error }));
            
        } else {
            return res.status(404).json({ error: 'Message non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
}



