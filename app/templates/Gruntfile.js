'use strict';

module.exports = function ( grunt ) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['app/**/*.js', 'public/scripts/**/*.js']
    },

    concurrent: {
      start: {
        tasks: ['nodemon', 'watch', 'sass'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        }
      },
      scripts: {
        files: ['public/scripts/*.js', 'scss/*.scss'],
        tasks: ['browserify', 'sass', 'uglify'],
        options: {
          debounceDelay: 250
        }
      },
      layout: {
        files: ['public/images/*', 'public/stylesheets/*', 'app/views/*']
      }
    },

    nodemon: {
      dev: {
        script: ['app.js'],
        options: {
          env: {
            NODE_ENV: 'dev',
            PORT: 8080
          },

          cwd: __dirname,
          nodeArgs: ['--debug'],
          ignore: ['*.log'],
          delay: 1000,
          legacyWatch: true
        }
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: 'public/stylesheets',
          ext: '.css'
        }]
      }
    },

    browserify: {
      options: {
        transform: ['minifyify'],
        debug: true
      },
      basic: {
        src: ['public/scripts/app.js'],
        dest: 'public/scripts/app.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'concurrent', 'sass']);
};
