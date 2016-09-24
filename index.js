var express = require('express');
var app = express();
require('./models/db');
var routes = require('./routes/index');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Use Simple Frontend:
app.set('view engine', 'html');
app.use(express.static(__dirname+'/frontend'));

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(routes);

var config = {
  ip: process.env.IP || undefined,
  port: process.env.PORT || 8080
};

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d', config.port);
});
