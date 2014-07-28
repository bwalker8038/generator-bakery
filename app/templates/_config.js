var config = {
  host: 'localhost',
  port: parseInt(+process.env.PORT, 10) || 3030,

  app: {
    cache: {
      engine: require("<%= _.slugify(cacheModule) %>")
    },

    // Currently set to debug all errors, change if needed
    debug: {
      request: ['error'],
    },

    views: {
      path: __dirname + '/views',
      engines: { jade: require('jade') },
      compileOptions: { pretty: true }
    }
  },

  dev: {
    /* Dev specific config options here
     * i.e. enviroment specific credentials, database connections
     */
  },

  prod: {
    /* Prod specific config options here
     * i.e. enviroment specific credentials, database connections
     */
  }
};

module.exports = config;
