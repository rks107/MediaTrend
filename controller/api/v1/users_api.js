const User  = require('../../../models/user');
const jwt =  require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function(req, res) {
  try {
         const user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password) {
           return res.json(422, {
               message : 'Invalid user or password'
            });
        }
        return res.json(200, {
            message: 'Sign is Succesfully, Here is your token, keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '100000'})
            } 
        })
  } catch(err) {
    return res.status(500, {
            message: 'Internal Server Error'
         });
  }
}