const express = require("express");
// create a route handlers
const router = express.Router();
const homeConroller = require("../controller/home_controller");

console.log("router loaded");

router.get("/", homeConroller.home);

// for any further routes, access from here
// router.use('/routerName', require('/routerFileName'));
router.use("/users", require("./users"));
router.use("/posts", require("./posts"));
router.use("/comments", require("./comments"));
router.use("/likes", require('./likes'));


router.use("/api", require("./api"));


module.exports = router;
