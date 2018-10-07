var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    password: String,
    email: String,
    name: String,
    lastName: String,
    created: {
        type: Date,
        default: Date.now
    }
});