var express = require('express');
var router = express.Router();

var async = require('async');
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

module.exports = function(passport){

    /* GET login.js page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        if(req.isAuthenticated()){
            res.redirect('/home');
        }
        res.render('index');
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        req.flash('success', 'message');
        res.locals.message = req.flash();
        res.render('register');
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        let accounts = [];
        async.eachLimit(req.user.accounts, 1, function(accountId, callback){
            Account.findById(accountId, (err, account) => {
                if (err){
                    console.log('Error in Getting accounts: '+err);
                    throw err;
                }
                accounts.push(account);
                callback();
            });
        },function(){
            res.render('home', { user: req.user, accounts: accounts });
        });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
}
