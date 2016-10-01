"use strict";

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get(/.+/, function (req, res) {
  let pathValue = req.path.replace('/', '');
  let timestamp;
  
  if (!isNumeric(pathValue)) {
    pathValue = decodeURI(pathValue);
    timestamp = Date.parse(pathValue);
  }
  else {
    timestamp = +pathValue;
  }
  
  let date = new Date(timestamp);
  let isValidDate = date.getTime() > 0;
  
  if (!isValidDate) {
      res.json({"unix":null, "natural":null});
      return;
  }
    
  let options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  
  let formattedDate = date.toLocaleDateString('en-US', options);
  
  res.json({"unix":timestamp, "natural":formattedDate});
});

app.listen(port, function () {
  console.log('Example app listening on port 80!');
});