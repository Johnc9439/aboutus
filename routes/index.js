var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = function(passport){
	router.get('/', function(req, res){
		res.render('index')
	});

	router.get('/login', function(req, res){
		res.render('login', {message: req.flash('message')});
	});
	
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/login',
		failureFlash: true
	}));
	
	router.get('/signup', function(req, res){
		res.render('register', {message: req.flash('message')});
	});
	
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', {user: req.user});
	});

	router.get('/product', isAuthenticated, function(req, res){
		res.render('product', {user: req.user});
	});

	//router.post('/product', isAuthenticated, function(req, res){
	//	var imgData = req.body.imgData;
	//	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	//	var dataBuffer = new Buffer(base64Data, 'base64');
	//		fs.writeFile("out.png", dataBuffer, function(err) {
	//		if(err){
	//	  		res.send(err);
	//		}else{
	//	  		res.send("保存成功！");
	//		}
	//	});
	//});
	
	router.get('/journal', function(req, res){
		res.render('journal');
	});
	
	router.get('/signout', function(req, res){
		req.logout();
		res.redirect('/');
	});
	
	return router;
}

