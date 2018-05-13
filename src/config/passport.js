const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');



module.exports = function (passport) {
    passport.use(new LocalStrategy(function (username, password, done) {
        let query = { username };
        User.findOne(query, (error, user) => {
            if (error)
                throw error;
            if (!user) {
                return done(null, false, { message: 'not found' })
            }

            bcrypt.compare(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'not found' });
                }
            });
        });
    }));


    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.doneserializeUser(function() {

    });
}





