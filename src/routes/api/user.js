const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    path = require('path'),
    User = require('../../model/User'),
    jwt = require('jsonwebtoken');



// Format of token 
// Authentication: Bearer <access_token>
/**
 * Verifying token
 */
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        // Spliting String
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;

        let isVerified = jwt.verify(req.header.jwt, 'key');

        if (isVerified)
            next();
    }
    else {
        res.status(403);
        res.end('forbidden');
    }
}




/**
 * User Login
 */
router.post('/user/login', (req, res) => {
    const user = {
        _id: 1,
        username: 'Seerat Ahmed Khan',
        email: 'seerat@seerat.com'
    };

    jwt.sign({ user }, 'key', (error, token) => {
        res.json({ token })
    });
});


/**
 * Test Route
 */
router.get('/user', (req, res) => {
    res.end('User Api')
});


module.exports = router;