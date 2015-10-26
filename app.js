var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var filePath = 'text';
var info = JSON.parse(fs.readFileSync(filePath));
app.use(express.static('public/'));
//app.get('/',function(req,res){
//	res.sendFile(path.join(__dirname+'/signup.html'));
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/Signup', function(req, res) {
  user = {
    username: req.body.username,
    email: req.body.email
  };
  info.push(user);
  fs.writeFileSync(filePath, JSON.stringify(info));
});



app.listen(8179);
console.log('Server run');
