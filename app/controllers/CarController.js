var Car = require('../models/car');
const passport = require("passport");


async function getCars(req, res, next) {
  
  passport.authenticate('jwt', async function(err, user, info) {  
    if(user){
      var cars = await Car.find().populate('comments');
        res.json({
        success: true,
        data: cars
      })
    }
    else{
      var cars = await Car.find({},'-comments');
      res.json({
        success: true,
        data: cars
      });
    }
  })(req, res, next);
  }
module.exports = {
  getCars,
};
