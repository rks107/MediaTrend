const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsConroller = require('../controller/posts_controller');

router.post('/create', passport.checkAuthentication , postsConroller.create);


module.exports = router;