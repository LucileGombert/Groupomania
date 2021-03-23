// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');


// Permet d'aimer un message
// exports.likePost = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     const userId = decodedToken.userId;
//     console.log(req.body.like);
//     if(req.body.like == "false") {
//         console.log("J'aime");
        
//         db.Like.create({
//             userId: userId,
//             postId: req.params.postId
//         })
//         .then(() => res.status(200).json({message: 'Vous aimez ce message !'}))
//         .catch(error => res.status(400).json({ error }));
        
//     } else if(req.body.like == true) {
//         console.log("J'aime plus");
//         db.Like.destroy({
//             where: { 
//                 userId: userId,
//                 postId: req.params.postId
//             }
//         })
//         .then(() => res.status(200).json({message: 'Vous n\'aimez plus ce message'}))
//         .catch(error => res.status(400).json({ error }));
//     }
// }


exports.likePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const isliked = req.body.like
    

    db.Post.findOne({
      
        where: { id: req.params.postId },
    })

    .then(postfound => {
        if(!postfound) {
            console.log('pas trouvé');
            return res.status(404).json({ error: 'Le message n\'a pas été trouvé' })
        } else if (isliked == false) {
            console.log('trouvé mais pas encore liké');

            // db.Like.create({
            //     userId: userId,
            //     postId: req.params.postId
            // })
            // .then(() => res.status(200).json({message: 'Vous aimez ce message !'}))
            // .catch(error => res.status(400).json({ error }));
                
            db.Like.create({ 
                postId: req.params.postId, 
                userId: userId 
            })
            
            .then(response => {
                console.log(postfound.likes);
                db.Post.update({ 
                    likes: postfound.likes +1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous aimez ce message !' }))
                .catch(error => res.status(500).json({ error })) 
            })
            .catch(error => res.status(400).json({ error }))
        } else if(isliked == true) {
            console.log('trouvé mais déjà liké');

            // db.Like.create({
            //     userId: userId,
            //     postId: req.params.postId
            // })
            // .then(() => res.status(200).json({message: 'Vous n\'aimez plus ce message'}))
            // .catch(error => res.status(400).json({ error }));


            db.Like.destroy({ 
                where: { 
                    postId: req.params.postId, 
                    userId: userId 
                } 
            })
            .then(() => {
                db.Post.update({ 
                    likes: postfound.likes -1
                },{
                    where: { id: req.params.postId }
                })
                .then(() => res.status(201).json({ message: 'Vous n\'aimez plus ce message' }))
                .catch(error => res.status(500).json({ error })) 
            })
            .catch(error => res.status(400).json({ error }))
        } else {
            console.log('ko');
        }
    })
    .catch(error => res.status(400).json({ error }))  
}