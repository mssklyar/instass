var express = require('express');
var path = require('path');
//var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');


var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB

mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(
    () => { console.log() },
    err => { console.log(err) }
    );

var User = require('./models/user');

/*
user = new User({name: "Max", password: "lol", email: "ravonta@yandex.ru", lastname: "sklyar"});
user.save(function (err) {
    if (err) return handleError(err);
    // saved!
});
*/


User.findOne({ name: 'Max' }, function (err, user) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log(user);
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
// TODO - Why Do we need this key ?
app.use(session({secret: 'mySecretKey', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

app.use('/', require('./routes/index')(passport));

require('./routes/account')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
