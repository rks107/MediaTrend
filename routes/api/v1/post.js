const express = require("express");
const router = express.Router();
const postsApiController = require('../../../controller/api/v1/posts_api');

router.get('/', postsApiController.index);

module.exports = router;