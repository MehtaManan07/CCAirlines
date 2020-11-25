const passport = require('passport');
const User = require('../models/UserModel');
const GStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');

passport.serializeUser((user,done) => {
  done(null,user.id);
})

passport.deserializeUser((id,done) => {
  User.findById(id).then((user) => {
    done(null,user)
  })
})

passport.use(
  new GStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/api/v1/users/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ email: profile._json.email });
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile._json.name,
          email: profile._json.email,
          photo: profile._json.picture,
          password: crypto.randomBytes(8).toString('hex')
        });
        console.log(profile)
        done(null,newUser)
      }
      console.log(`aaiva pacha, heh`)
      done(null,user)
    }
  )
);