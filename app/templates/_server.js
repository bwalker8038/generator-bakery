
/** Module dependencies */

var hapi = require('hapi');
var config = require('./config');

// ENV Config Options
var envConf;
if ( process.env.NODE_ENV === 'dev' ) {
  envConf = config.dev;
} else {
  envConf = config.prod;
}

exports.start = function () {
  var app = new hapi.Server(config.host, config.port, config.app);

  // Routes
  var routes = [
    'static',
    'home'
  ];

  routes.map(function( name) {
    var controller = require('./controllers/' + name);
    controller.setup(app);
  });

  app.start(function () {
    console.log('Server running in ' + process.env.NODE_ENV + ' environment');
    console.log('Hapi server listening on port ' + config.port);
  });
};
