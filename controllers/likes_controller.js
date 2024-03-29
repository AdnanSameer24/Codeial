const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.toggleLike = async function(req, res){
    try{
        let likable;
        let deleted = false;


        if(req.query.Type == 'Post'){
            likable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }


        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.Type,
            user : req.user._id
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }

        else{
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.Type
            });

            likable.likes.push(newLike._id);
            likable.save();
        }

        return res.json(200, {
            message : "Request Successfull",
            data : {
                deleted : deleted
            }
        })
    }
    catch(err){
        if(err){
            console.log(err);
            return res.json(500, {
                message : 'Internal Server Error'
            });
        }
    }
}