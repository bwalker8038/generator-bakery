/* jshint node: true */

'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('lodash');

var bakeryGenerator = module.exports = function(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  var packagePath = path.join(__dirname, '../package.json');
  this.pkg = JSON.parse(this.readFileAsString(packagePath));
};

util.inherits(bakeryGenerator, yeoman.generators.Base);

bakeryGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'What should we name our App?',
      require: true
    }
  ];

  this.prompt(prompts, function (props) {
    _.extend(this, props);

    cb();
  }.bind(this));
};

bakeryGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/views');

  this.mkdir('scss');

  this.mkdir('public');
  this.mkdir('public/stylesheets');
  this.mkdir('public/scripts');
  this.mkdir('public/images');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_app.js', 'app.js');
  this.copy('_config.js', 'app/config.js');
  this.copy('_server.js', 'app/server.js');
  this.copy('_static.js', 'app/controllers/static.js');
  this.copy('_home.js', 'app/controllers/home.js');

  this.copy('_main.js', 'public/scripts/main.js');

  this.write('public/stylesheets/main.css', '');

  this.copy('_layout.jade', 'app/views/layout.jade');
  this.copy('_home.jade', 'app/views/home.jade');
};

bakeryGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('nodemonignore', '.nodemonignore');
};
