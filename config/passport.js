const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
const keys = require("../config/config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

console.log("I was in passport ", opts.secretOrKey);

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            console.log("Authenticated user:", user);
            return done(null, user);
          }
          console.log("User not found");
          return done(null, false);
        })
        .catch((err) => {
          console.error("Error finding user:", err);
          return done(err, false);
        });
    })
  );
};
