var express = require('express');
var router = express.Router();

var Account = require('../models/account');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login.js page
    res.redirect('/');
}

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
});

router.get('/', (req, res) => {
    res.render('account/create');
});

router.post('/', (req, res) => {
    var accountData = {
        login: req.body.login,
        password: req.body.password,
        author: req.user._id
    };
    Account.create(accountData, (err,account) => {
        if (err){
            console.log('Error in Saving user: '+err);
            throw err;
        }
        res.redirect('/home');
    })
});

module.exports = router;