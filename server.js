/**
 * We require all the node modules needed
 * to create a simple HTTP server
 */

// This is the paper-paypal-component
// It create all necessary routes to use Paypal APIs
var paypal = require('paper-paypal-component');

// The follow dependencies are required to create a simple HTTP server
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').Server(app);

app.use(bodyParser());

/**
 * We should think that is's a good idea but not
 * it's create a route for everything and
 * can't be overrided
 */
// app.use("/", express.static(__dirname + '/'));

app.use("/service-worker.js", express.static(__dirname + '/service-worker.js'));
app.use("/src", express.static(__dirname + '/src'));
app.use("/data", express.static(__dirname + '/data'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

/**
 * As it is a SPA all request should return to index.html
 * But not the api request
 * so we need to user the wildcast '*'
 */
// FIXME: rewriting user hash
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');

  paypal.init(app, __dirname);
});

http.listen(8000, function() {
  console.log('listening on *:8000');
});