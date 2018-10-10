var express = require('express');
var router = express.Router();

var Account = require('../models/account');

module.exports = function(){
    router.post('/account', (req, res) => {

        accountData = {
            login: req.body.login,
            password: req.body.password,
            author: req.user._id};

        Account.create(accountData, function (err) {
            if (err) return handleError(err);
            // saved!
        });

    });
}
