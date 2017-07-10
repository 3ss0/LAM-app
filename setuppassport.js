var passport = require("passport");
var User = require("./models/user");
var mongocrypt=require('mongoose-bcrypt');
module.exports = function() {
	passport.serializeUser(function(user, done) { 
	done(null, user._id); 
});
passport.deserializeUser(function(id, done) { 
	User.findById(id, function(err, user) { 
	done(err, user); 
});
});
};
var LocalStrategy = require("passport-local").Strategy;

passport.use("login", new LocalStrategy( function(username, password, done) { 
User.findOne({ username: username }, function(err, user) { 
if (err) { return done(err); }
if (!user) { 
return done(null, false, { message: "No user has that username!" }); 
} 
user.verifyPassword(password, function(err, valid) {
      if (err) {
        return done(err);
      } else if (valid) {
        return done(null, user);
      } else if  (!valid) {
       return done(null, false,{ message: "Invalid password." });
      }
    });

});
}));