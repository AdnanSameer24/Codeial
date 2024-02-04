const Comment = require('../models/comment');
const Post = require('../models/post');


module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
    
        if(post){
            let comment = await Comment.create({
                content : req.body.content ,
                post : req.body.post ,
                user : req.user._id
            });

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            }
    }
    catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let postid = comment.post;
            comment.remove();

            //$pull is inbuit function which pulls the data related to arguement given
            Post.findByIdAndUpdate(postid, { $pull : {comments : req.params.id}}, function(err, post){
                if(err){
                    return res.redirect('back');
                }
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    });
}