
/** Module dependencies */

var hapi = require('hapi');
var config = require('./config');


exports.start = function() {
  var port = process.env.port || 3030;
  var app = new Hapi.Server('localhost', config.port, config.app);

  // Routing Table
  var routes = [
    'static',
    'home'
  ];

  routes.map(function(name) {
    var controller = require('./controllers/' + name);
    controller.setup(app);
  });

  app.start(function() {
    console.log('Hapi server listening on port ' + port);
  });
};
