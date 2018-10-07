var mongoose = require('mongoose');пше

module.exports = mongoose.model('User',{
    password: String,
    email: String,
    name: String,
    lastName: String
});