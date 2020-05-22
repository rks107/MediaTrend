
// module.exports.actionName = function(err, res){};

module.exports.home = function(err, res) {
      return res.render('home', {
          title: "Home"
      });
    // return res.end('<h1> Express is set-up for codeial </h1>');
}