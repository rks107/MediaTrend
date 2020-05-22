module.exports.profile = function(req, res) {

    return res.render('user_profile',{
          title: 'User profile'
    });
    // res.end('<h1> Users Profile </h1>');
}