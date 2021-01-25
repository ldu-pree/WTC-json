var express = require('express');
var app = express();
var config = require('./config/config.json');
var port = 3000;

// our router
var publicR = require('./routeHandlers/public');
app.use('/', publicR);

// start the server
app.listen(port, function() {
  console.log(config.PF.green+"App started on port: "+String(port).rainbow);
  console.log(config.PF.green+"Link to app: "+"http://localhost:".rainbow+String(port).rainbow);
});