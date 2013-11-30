
exports.setup = function(app) {
  app.route({ 
    method: 'GET', 
    path: '/{path*}', 
    handler: {
      directory: { path: './public', listing: false, index: true }
    }
  });
};
