var mongoose = require("mongoose");
var passportLocalMomgoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

 
UserSchema.plugin(passportLocalMomgoose);
module.exports = mongoose.model("User", UserSchema);