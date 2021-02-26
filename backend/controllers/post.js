// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');


// Permet de créer un nouveau message
exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    
    // Permet de vérifier que tous les champs sont complétés
    if (title == null || title == '' || content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    } 

    // Permet de contrôler la longueur du titre et du contenu du message
    if (title.length <= 2 || content.length <= 4) {
        return res.status(400).json({ error: 'Le titre doit contenir au moins 2 caractères et le contenu doit contenir au moins 4 caractères' });
    }

    db.User.findOne({
        where: { id: userId }
    })
    .then(userFound => {
        if(userFound) {
            const post = db.Post.build({
                title: title, 
                content: content,
                link: '',
                likes: 0,
                UserId: userFound.id
            })
            post.save()
                .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
                .catch(error => res.status(400).json({ error }));
        } else {
            return res.status(404).json({ error: 'Utilisateur non trouvé'})
        }
    })
    .catch(error => res.status(500).json({ error }));
};


// Permet d'afficher un message
exports.getOnePost = (req, res, next) => {
    const id = req.params.id;
    db.Post.findOne({
        where: { id: id },
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
    var fields = req.query.fields;
    var limit =  parseInt(req.query.limit);
    var offset =  parseInt(req.query.offset);
    var order =   req.query.order;

    if (limit > 50) {
        limit = 50;
    }

    db.Post.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
        limit: (!isNaN(limit)) ? limit : null,
        offset: (!isNaN(offset)) ? offset : null,
        include: [{
            model: db.User,
            attributes: [ 'username' ]
        }]
    })
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ "error": "Aucun message trouvé" });
        }
    })
    .catch(error => res.status(500).json({error: 'Invalid fields'}));
}
