const authHelper = require("../helpers/authHelper");
const passport = require("passport");


async function registerUser(req, res){
    const user = await authHelper.createUser(
        req.body.email, req.body.name, req.body.password
    )
    const token = authHelper.genenrateUserToken(user);

    res.apiSuccess({
        user,
        token
    }) 
}

async function loginUser(req, res, next) {
    passport.authenticate("login", (err, user, meta) => {
      if(err) {
        next(err)
        return
      }
      if(!user) {
        res.apiFailure(meta.message, 400)
      }    
      const token = authHelper.genenrateUserToken(user);
      return res.apiSuccess({ token, user });
    })(req, res, next)
  }


module.exports = {
    registerUser,
    loginUser
};