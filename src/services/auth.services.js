import passport from 'passport';
import LocalStrategy from 'passport-local';
import FacebookStrategy from 'passport-facebook';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../modules/users/user.model';
import constants from '../../config/constants';

const localOpts = {
  usernameField: 'email',
};
const localStrategy = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({
        email,
      });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

// Jwt strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    // Identify user by ID
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);
const { FB_CLIENT_ID, FB_CLIENT_SECRET } = process.env;

passport.use(
  new FacebookStrategy({
      clientID: FB_CLIENT_ID,
      clientSecret: FB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/facebook/auth/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile)
    }
  )
)

export const authLocal = passport.authenticate('local', {
  session: false,
});
export const authJwt = passport.authenticate('jwt', {
  session: false,
});
export const facebookAuth = passport.authenticate('facebook', {
  session: false,
});
