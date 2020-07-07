const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res) {

    User.findById(req.params.id, function(err, user) {
        return res.render('user_profile',{
            title: 'User profile',
            profile_user: user
      });
    });
    
    // res.end('<h1> Users Profile </h1>');
}

module.exports.update = async function(req, res) {
  if(req.user.id == req.params.id) {
    try{
       let user = await User.findById(req.params.id);
       User.uploadedAvatar(req, res, function(err){
           if(err){ console.log('###### MulterError ', err);}
        
        //    console.log(req.file);
           user.name = req.body.name;
           user.email = req.body.email;

           if(req.file){

            if(user.avatar)
            {
               fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
            }
            //    this is saving the path of uploaded file into the avatar field in the user
            user.avatar = User.avatarPath + '/' + req.file.filename;
           }
           user.save();
           return res.redirect('back');
       });
    } catch(err) {

        req.flash('error', err);
        return res.redirect('back');
    }
} else {
    req.flash('Unauthorized');
    res.status(401).send('Unauthorized user');
}
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //           res.redirect('back');
    //     });
    // } else {
    //     res.status(401).send('Unauthorized user');
    // }
    
}

// render Sign in page
module.exports.signIn = function(req, res) {

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

// render sign up page
module.exports.signUp = function(req, res ){

    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

// get the sign up data
module.exports.create = function(req, res) {
    // TODO Later
    if(req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email},function(err, user){
        if(err) {
            console.log('error in finding user in Signing up');
            return;
        }

        if(!user) {
            User.create(req.body, function(err , user){
                if(err) {
                    console.log('error in creating user while Signing Up'); 
                    return;
                }
                res.redirect('/users/sign-in');
            });
        } else {
            return res.redirect('back');
        }
    });

}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in Succesfully');
    return res.redirect('/');
}

// Log-Out
module.exports.destroySession = function(req,res) {
    req.logout();
    req.flash('success', 'You have logged out');
    return res.redirect('/');
}