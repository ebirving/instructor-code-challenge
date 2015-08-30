var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser'); //Needed to require body-parser in order to use it in lines 8-9

// app.use(express.static(path.join(__dirname, '/public'))); //Duplicate code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public'))); //Was missing closing parenthesis

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}); //Was missing closing curly bracket and parenthesis

app.post('/favorites', function(req, res){
  var data = JSON.parse(fs.readFileSync('./data.json')); //Moved variable declaration to the top for clarity
  if(!req.body.name || !req.body.oid){
    res.send("Error");
  } //Removed incomplete return statement and closed "if" statement
  else { //Added "else" statement
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

app.listen(3000, function(){ //Needed "listen" in place of "list"
  console.log("Listening on port 3000");
});
