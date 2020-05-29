const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsConroller = require('../controller/posts_controller');

router.post('/create', passport.checkAuthentication , postsConroller.create);

// for Deleting post
router.get('/destroy/:id', passport.checkAuthentication, postsConroller.destroy);


module.exports = router;