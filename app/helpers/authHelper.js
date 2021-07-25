const jwt = require("jsonwebtoken");
var User = require("../models/user");

const genenrateUserToken = user => {
  return jwt.sign(user.toJSON(), process.env.APP_SECRET);
};

const createUser = (email, name, password) => {
  var user = new User();
  user.name = name;
  user.email = email;
  user.password = password;

  return user.save()
};

module.exports = {
  genenrateUserToken,
  createUser
};
