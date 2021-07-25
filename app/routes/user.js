const { errorWrap } = require("./errorWrap");

const express = require("express");
const router = express.Router();
var User = require("../models/user");
const userController = require("../controllers/UserController");
const passport = require("passport");
router.post("/register", userController.registerUser);

router.post("/login", errorWrap(userController.loginUser));


module.exports = router;
