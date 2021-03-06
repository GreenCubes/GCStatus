var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');

var app = express();

/* Set up config */

global.cfg = require('./config.js');


/* Set up database connection */

global.appdbconn = require('mysql').createPool({
	host: cfg.appdb.host,
	database: cfg.appdb.database,
	user: cfg.appdb.user,
	password: cfg.appdb.password
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('short', {
	skip: function (req, res) { return res.statusCode < 400 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('*', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		console.log(err);

		if (err) {
			res.status(err.status || 500).render('500', {
				message: err.message,
				error: err
			});
		} else {
			res.status(404).render('404', {
				message: err.message,
				error: err
			});
		}
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	if (err) {
		res.status(err.status || 500).render('500', {
			message: err.message,
			error: {}
		});
	} else {
		res.status(404).render('404', {
			message: err.message,
			error: {}
		});
	}
});


module.exports = app;
