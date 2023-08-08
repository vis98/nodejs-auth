const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports={

googleStrategy: passport.use(new GoogleStrategy(config.google,
  async (accessToken, refreshToken, profile, done) => {
    try {
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
}