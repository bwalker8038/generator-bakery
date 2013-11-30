var config = {
  host: 'localhost',
  port: process.env.PORT || 3030,

  app: {
    cache: {
      engine: 'memory'
    },

    views: {
      path: __dirname + '/views',
      engines: { jade: 'jade' },
      compileOptions: { pretty: true }
    }
  }
};

module.exports = config;
