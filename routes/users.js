const express = require("express");
const router = express.Router(); 

const passport = require('passport');

const usersController = require('../controller/users_controller');

router.get('/profile/:id', passport.checkAuthentication , usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

// logged Out
router.get('/log-out', usersController.destroySession);


// google oauth2 stategy 
router.get('/auth/google', passport.authenticate('google',{scope:['profile', 'email']}));
//function(request, response, next) { passport.authenticate('google', {scope: ['profile', 'email']})(request, response, next);}
router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}), usersController.createSession);

//reset password
router.get('/reset-password', usersController.resetPassword);
router.post('/generate-token', usersController.generateToken);

module.exports = router;