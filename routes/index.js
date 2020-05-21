const express = require('express');
// create a route handlers
const router = express.Router();
const homeConroller = require('../controller/home_controller');

console.log('router loaded');

router.get('/',homeConroller.home);

module.exports = router;