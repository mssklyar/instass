var mongoose = require('mongoose');

module.exports = mongoose.model('Account',{
    login: String,
    password: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});