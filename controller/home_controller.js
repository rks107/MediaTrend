
// module.exports.actionName = function(err, res){};

module.exports.home = function(req, res) {

    // cookies
    // console.log(req.cookies);
    // res.cookie('user_id', 30);
    // res.cookie('user', 31);

      return res.render('home', {
          title: "Home"
      });
    // return res.end('<h1> Express is set-up for codeial </h1>');
}