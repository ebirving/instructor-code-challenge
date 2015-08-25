var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser'); //Needed to require body-parser in order to use it in lines 8-9

// app.use(express.static(path.join(__dirname, '/public'))); //Duplicate code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/favorites', function(req, res){
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.post('/favorites', function(req, res){
  var data = JSON.parse(fs.readFileSync('./data.json'));
  if(!req.body.name || !req.body.oid){
    res.send("Error");
  }
  else {
    data.push(req.body);
    fs.writeFile('./data.json', JSON.stringify(data));
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  }
});

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
