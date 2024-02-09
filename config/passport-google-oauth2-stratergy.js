const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new startergy for google login
passport.use(new googleStrategy( {
    clientID : '1037400733033-9nnovadrghspvallv8e8j2j9eqjg1k4b.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){
        //find the user
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log("Error in google startergy", err);
                return;
            }
            console.log(accessToken, refreshToken);
            console.log(profile);

            //if found set this user as req.user
            if(user){
                
                return done(null, user);
            }

            //if not found create user and signing user
            else{
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')
                },
                function(err, user){
                    if(err){
                        console.log("Error in google startergy", err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
    
    
));

module.exports = passport;