const bcrypt = require("bcrypt");

var findOrCreate = require('mongoose-findorcreate')
const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [false, "can't be blank"]
      },
      email: {
        type: String,
        required: [false, "can't be blank"]
      },
      password: {
        type: String,
        required: [false, "can't be blank"]
      },
      comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
      car: { type: Schema.Types.ObjectId, ref: "Car" },
    },
    { timestamps: true }
  );
  userSchema.plugin(findOrCreate);
  userSchema.pre("save", async function(next) {
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10);  
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
