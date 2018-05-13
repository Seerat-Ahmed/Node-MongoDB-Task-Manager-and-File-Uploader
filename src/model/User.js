/**
 * Modules
 */
const mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    bcrypt = require('bcrypt');



/**
 * Creating User Schema
 */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
    },
}, { collection: 'users' });


/**
 * User Schema 
 */
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
        .exec((error, user) => {
            if (error)
                return callback(error);
            else if (!user) {
                let error = new Error('User not found');
                error.status = 401;
                return callback(error);
            }

            bcrypt.compare(password, user.password, (error, result) => {
                if (result)
                    return callback(null, user);
                else
                    return callback();
            });
        });
}



/**
 * Creating Hash before saving user password
 */
UserSchema.pre('save', function (next) {
    let user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        if (error)
            console.log(error);
        else {
            user.password = hash;
            next();
        }
    });
});

// Adding Timestamp plugin
UserSchema.plugin(timestamps);

const User = mongoose.model('User', UserSchema);

module.exports = User;