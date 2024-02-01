const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const User = require('../models/user');


//authentictaion using passport
passport.use(new LocalStratergy({
    usernameField : 'email'
}, function(email, password, done){
    User.findOne({email : email}, function(err, user){
        if(err){
            console.log('Error in finding the user surtsy to passport');
            return done(err);
        }

        if(!user || user.password != password){
            console.log('Invalid Username / Password');
            return done(null, false);
        }

        return done(null, user);
    });
}

));


//serializing the user to decide which cookie to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//desrializing the user key from the cookie
passport.deserializeUser( function(id, done){
        User.findById(id, function(err, user){
            if(err){
                console.log('Error in finding the user surtsy to passport');
                return done(err);
            }

            return done(null, user);
        });
});


//check if the user is authenticted
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the cur signed in user from the session cookies
        //and we are just sending the locals for views
        res.locals.user = req.user;

    }

    next();
}

module.exports = passport;