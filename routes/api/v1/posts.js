const express = require("express");
const router = express.Router();
const passport = require('passport');
const postsApiController = require('../../../controller/api/v1/posts_api');

router.get('/', postsApiController.index);
router.delete('/:id', passport.authenticate('jwt',{session:false}), postsApiController.destroy);

module.exports = router;