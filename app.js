var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var filePath = 'text';
var info = JSON.parse(fs.readFileSync(filePath));
// Connect to MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk(' luffy.ee.ncku.edu.tw:27017/team19');
// Allow router to access db
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/users', users);
app.use(express.static('public'));
//app.get('/',function(req,res){
//	res.sendFile(path.join(__dirname+'/index.html'));
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));



app.use(bodyParser.urlencoded({extended:false}));


app.post('/Signup', function(req, res) {
  user = {
    username: req.body.username,
    email: req.body.email
  };
  info.push(user);
  fs.writeFileSync(filePath, JSON.stringify(info));
});



app.get('/', function (req, res) {
 
  console.log('gogosister');
  res.sendFile(path.join(__dirname+'/public/html/index.html'));
  });

app.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/html/products.html'));
  });

app.get('/aboutus', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/html/aboutus.html'));
  });

app.get('/contact', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/html/contact.html'));
  });

app.get('/Signup', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/html/signup.html'));
  });



app.listen(8177);
console.log('Server run');



