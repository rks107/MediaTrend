const express = require('express');
const router = express.Router();

const postConroller = require('../controller/post_controller');

router.get('/post', postConroller.post);


module.exports = router;