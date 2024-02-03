const Post = require('../models/post');

module.exports.home = function(req, res){

    console.log(req.cookies);

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title : "Codeial | Home" ,
    //         posts : posts
    //     });
    // });


    //by adding this we know the full details of user of each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, posts){
        return res.render('home',{
            title : "Codeial | Home" ,
            posts : posts
        });
    })    
    
}