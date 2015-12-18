var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var favicon = require('static-favicon');
var path = require('path');
var fs = require('fs');
//connect to mongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb://team19:secretsecret@localhost/team19');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configuring passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var routes =require('./routes/index')(passport);
app.use('/', routes);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status =404;
	next(err);
});

if(app.get('env') === 'development'){
	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

app.listen(8177);
console.log('Sever run');

module.export =app;




// app.post('/Signup', function(req, res) {
  // user = {
    // username: req.body.username,
    // email: req.body.email
  // };
  // info.push(user);
  // fs.writeFileSync(filePath, JSON.stringify(info));
// });



// app.get('/', function (req, res) {
 
  // console.log('gogosister');
  // res.sendFile(path.join(__dirname+'/public/html/index.html'));
  // });





// app.get('/journal', function (req, res) {
  // res.sendFile(path.join(__dirname+'/public/html/journal.html'));
  // });



// app.get('/aboutus', function (req, res) {
  // res.sendFile(path.join(__dirname+'/public/html/aboutus.html'));
  // });

//app.get('/contact', function (req, res) {
 //res.sendFile(path.join(__dirname+'/public/html/contact.html'));
 //});

// app.get('/signup', function (req, res) {
  // res.sendFile(path.join(__dirname+'/public/html/signup.html'));
  // });


// app.get('/register', function (req, res) {
  // res.sendFile(path.join(__dirname+'/public/html/register.html'));
  // });

//app.get('/hello', function (req, res) {
//  res.sendFile(path.join(__dirname+'/public/html/hello.html'));
//  });





// app.listen(8171);
// console.log('Server run');



