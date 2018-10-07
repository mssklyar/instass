var Account = require('../models/account');

module.exports = function(app, db) {
    app.post('/account', (req, res) => {
        var account = new Account();
        res.send('Hello');
    });
};