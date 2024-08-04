const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');

const clientID = process.env.FACEBOOK_APP_ID;
const clientSecret = process.env.FACEBOOK_APP_SECRET;
const callbackURL = process.env.FACEBOOK_CALLBACK_URL;

const strategy = new FacebookStrategy({
  clientID,
  clientSecret,
  callbackURL,
  profileFields: ['id', 'emails', 'first_name', 'last_name']
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
});

const configServiceLogInFacebook = () => passport.use(strategy);

module.exports = {
  configServiceLogInFacebook
};