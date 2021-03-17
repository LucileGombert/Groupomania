// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');


// Permet d'aimer un message
// exports.likePost = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     const userId = decodedToken.userId;

//     if(req.body.like == 1) {
//         const likeFound = db.Like.findOne({
//             attributes: ['userId', 'postId'],
//             where: { 
//                 userId: userId,
//                 postId: req.params.postId
//             }
//         })
//         if(!likeFound) {
//             console.log("J'aime");
//             db.Like.create({
//                 userId: userId,
//                 postId: req.params.postId
//             })
//             .then(() => res.status(200).json({message: 'Vous aimez ce message !'}))
//             .catch(error => res.status(400).json({ error }));
        
//         } else {
//             console.log("J'aime plus");
//             db.Like.destroy({
//                 where: { 
//                     userId: userId,
//                     postId: req.params.postId
//                 }
//             })
//             .then(() => res.status(200).json({message: 'Vous n\'aimez plus ce message'}))
//             .catch(error => res.status(400).json({ error }));
//         }
//     }
// }

// exports.likePost = (req, res, next) => {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
//     const userId = decodedToken.userId;

//     if(req.body.like == false) {
//         console.log("J'aime");

//         const likeFound = db.Like.findOne({
//             attributes: ['userId', 'postId'],
//             where: { 
//                 userId: userId,
//                 postId: req.params.postId
//             }
//         })
//         if(likeFound) {
//             console.log("J'aime");
//             db.Like.create({
//                 userId: userId,
//                 postId: req.params.postId
//             })
//             .then(() => res.status(200).json({message: 'Vous aimez ce message !'}))
//             .catch(error => res.status(400).json({ error }));
//         }// } else {
//         //     console.log("J'aime déjà");
//         //     return res.status(401).json({ error: 'Vous aimez déjà ce message' });
//         // }
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

    if(req.body.like == false) {
        console.log("J'aime");
        
        db.Like.create({
            userId: userId,
            postId: req.params.postId
        })
        .then(() => res.status(200).json({message: 'Vous aimez ce message !'}))
        .catch(error => res.status(400).json({ error }));
        
    } else if(req.body.like == true) {
        console.log("J'aime plus");
        db.Like.destroy({
            where: { 
                userId: userId,
                postId: req.params.postId
            }
        })
        .then(() => res.status(200).json({message: 'Vous n\'aimez plus ce message'}))
        .catch(error => res.status(400).json({ error }));
    }
}