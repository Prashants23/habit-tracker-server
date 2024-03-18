// // config/passport.js
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
// const User = require("../models/User");
// const keys = require("./config");

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       User.findById(jwt_payload.id)
//         .then((user) => {
//           console.log("Passport:", user);
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((err) => console.log(err));
//     })
//   );
// };

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
      console.log("JWT payload:", jwt_payload); // Log JWT payload
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            console.log("Authenticated user:", user); // Log authenticated user
            return done(null, user);
          }
          console.log("User not found"); // Log user not found
          return done(null, false);
        })
        .catch((err) => {
          console.error("Error finding user:", err); // Log error
          return done(err, false);
        });
    })
  );
};
