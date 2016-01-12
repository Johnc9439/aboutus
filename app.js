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

var imageSchema = new mongoose.Schema({
	 name: String
});

var imageDetails = mongoose.model('image', imageSchema);

app.use(bodyParser.urlencoded({extended:false}));

app.post('/callname', function(req,res){
	imageDetails.find({}, function(err,names){
		if(!err){
			console.log(names);
			res.send(names);
		}else {throw err;}
	});
});

app.post('/imgname', function (req, res) {
	var imgname = req.body.imgname;
	console.log(imgname);
	var Newimage = new imageDetails({
		name: imgname
	});
	Newimage.save(function(err){
		if (err){ throw err}
		console.log('imagesave');
	});
        var imgdata  = req.body.canvas;
	var base64 = imgdata.replace(/^data:image\/\w+;base64,/, "");
	base64=base64.replace(/\s/g,"+");
	console.log(base64);
	var buffer = new Buffer(base64,'base64');
	fs.writeFile("public/drawimg/"+imgname+".png",buffer,function(err){
		if(err){
			res.send(err);
			console.log(err);
		}
		else{
			res.send("success");
		}
	});
});

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status =404;
	next(err);
});

app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});


app.listen(2314);
console.log('Server run');

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



