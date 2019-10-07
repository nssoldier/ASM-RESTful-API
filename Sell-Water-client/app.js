var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var editRouter = require('./routes/edit');
var deleteRouter = require('./routes/delete');
var app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/asm-wd01', {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	bodyParser.json({
		limit: 1024 * 1024 * 2000
	})
);

app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: 1024 * 1024 * 20
	})
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
