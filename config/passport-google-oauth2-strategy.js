const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// TELL PASSPORT TO USE NEW STRATEGY FOR GOOGLE LOGIN
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
    },
    function(accessToken, refreshToken, profile, done) {
       // FIND USER
console.log(accessToken);
       User.findOne({email: profile.emails[0].value}).exec(function(err, user){
           if(err){console.log('Error in google passport-stategy', err); return;}
           
           console.log(profile);
           if(user) {
                // IF FOUND,  USE THIS AS req.user
                return done(null, user);
            } else {
                // IF NOT FOUND, CREATE THE USER AND USE IT AS req.user
                User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                   password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                   if(err){console.log('Error in creating user google passport-stategy', err); return;}

                   return done(null,user);
                });
            }
       });
    }
));

module.exports = passport;