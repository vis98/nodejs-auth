const passport = require('passport');
const config = require('./config');
const User = require('./model/user');

// Below are the integration of passport library for google and facebook auth which after validation calls ourconfigured api
//To do client id and secret id should be stored in some kind of secure vault or on env variables

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy(config.google,
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log("insde GoogleStrategy",profile)
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          loginMethod: 'Google'
        });

        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // Callback function
  // You can store user data in your database or perform other actions here
  try {
    console.log("insde facebook",profile)
  let user = await User.findOne({ facebookId: profile.id });

  if (!user) {
    user = new User({
      facebookId: profile.id,
      displayName: profile.displayName,
      loginMethod: 'facebook'
    });

    await user.save();
  }

  return done(null, user);
} catch (err) {
  return done(err);
}
}));


passport.serializeUser(function(user,done){
    done(null,user);

})

passport.deserializeUser(function(user,done){
    done(null,user);
    
})