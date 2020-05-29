const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

// for deleting a comment
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;