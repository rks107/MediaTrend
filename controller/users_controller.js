module.exports.profile = function(req, res) {

    return res.render('user_profile',{
          title: 'User profile'
    });
    // res.end('<h1> Users Profile </h1>');
}

// render Sign in page
module.exports.signIn = function(req, res) {

    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    })
}

// render sign up page
module.exports.signUp = function(req, res ){

    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    })
}

// get the sign up data
module.exports.create = function(req, res) {
    // TODO Later
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    // TODO later
}