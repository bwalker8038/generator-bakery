

exports.setup = function(app) {
  var home = new HomeController();

  app.route({ method: 'GET', path: '/', handler: home.index });
};

function HomeController() {
  console.log('home controller initialized');
}

HomeController.prototype.index = function ( req, reply ) {
  reply.view('home', {
    title: 'hello world!',
    message: 'Up and running with Yeoman and Hapi'
  });
};
