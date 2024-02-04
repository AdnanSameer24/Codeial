const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// module.exports.profile = async function (req, res) {
//     try {
//       const user = await User.findById(req.params.id).exec();
  
//       return res.render("user_profile", {
//         title: "User Profile",
//         profile_user: user,
//       });
//     } catch (err) {
//       console.error(err);
//       return res.redirect("back");
//     }
//   };

module.exports.profile = function(req, res){

    User.findById(req.params.id , function(err, user){
      return res.render('user_profile',{
        title : 'User profile',
        profile_user : user
    });
  });

    
}

module.exports.update = async function(req, res){
  if(req.user.id == req.params.id){
    try{
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err){
          console.log('Multer errpr', err)
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));          }
          //saving the uploaded file path into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }

        user.save();
        return res.redirect('back');
      });

      }
    
    catch(err){
      req.flash('error : ', err);
      return res.redirect('back');
    }
  }
  else{
    req.flash('error', 'Unauthorized');
    return res.status(401).send('Unauthorized');
  }
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
  //     return res.redirect('back');
  //   });
  // }
  // else{
  //   return res.status(401).send('Unauthorized');
  // }
}



module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title : 'Codeial | Sign Up'
    });
}

module.exports.signIn = function(req, res){
  if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title : 'Codeial | Sign In'
    });
}

// module.exports.create = function(req, res) {
//     console.log('Signup endpoint reached');

//     if (req.body.password !== req.body.confirm_password) {
//         console.log('Passwords do not match');
//         return res.redirect('back');
//     }

//     User.findOne({ email: req.body.email }, function(err, user) {
//         if (err) {
//             console.log('Error in finding user in signing up:', err);
//             return res.status(500).send('Internal Server Error');
//         }

//         if (!user) {
//             User.create(req.body, function(err, user) {
//                 if (err) {
//                     console.log('Error in creating user while signing up:', err);
//                     return res.status(500).send('Internal Server Error');
//                 }

//                 console.log('User created successfully');
//                 return res.redirect('/users/sign-in');
//             });
//         } else {
//             console.log('User with the provided email already exists');

//             return res.redirect('back');
//         }
//     });
// };

module.exports.create = async function (req, res) {

    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

  //  console.log('Inside line 74');

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
           // console.log('Inside the line 79');
            const newUser = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
          //  console.log('Inside the line 83');
            return res.redirect('back');
        }
    } catch (err) {
        console.error('Error:', err.message);
        return res.status(500).send('Internal Server Error');
    }
  };

// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//     User.findOne({email : req.body.email}, function(err, user){
//         if(err){
//             console.log('Error in signing up');
//         }

//         if(! user){
//             User.create(req.body, function(err, user){
//                 if(err){
//                     console.log('Error in creating user while signing up');
//                 }

//                 return res.redirect('/users/sign-in');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }

module.exports.createSession = function(req, res){
    //
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
  req.flash('success', 'You have logged out :)');
  req.logout(function(err){
    
    return res.redirect('/');
  });

}