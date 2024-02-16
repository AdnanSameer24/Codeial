const Post = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes');

module.exports.home = async function(req, res){

    console.log(req.cookies);

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
            path : 'user'
            },
            populate : {
                path : 'likes'
            }
    }).populate('likes');
    let users = await User.find({});
    // console.log(posts);
    // console.log(posts.comments);
    return res.render('home',{
        title : "Codeial | Home" ,
        posts : posts,
        all_users : users
    // .exec(function(err, posts){

    //     //finding list of all users to show in home page
        
    //     });
        
    });
}

    catch(err){
        console.log("Error", err);
        return;
    }
}

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title : "Codeial | Home" ,
    //         posts : posts
    //     });
    // });


    //by adding this we know the full details of user of each post
    