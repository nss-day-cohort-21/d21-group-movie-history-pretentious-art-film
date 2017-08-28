module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      '../dist/app.js': ['../js/**/*.js'],
      options: {
        browserifyOptions: {
          paths: ['./node_modules']
        }
      }
    },
    jshint: {
      options: {
        predef: ['document', 'console'],
        esnext: true,
        strict: 'global',
        globals: { $: true, jQuery: true, Fuse: true },
        browserify: true,
        reporter: require('jshint-stylish')
      },
      files: ['../js/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/styles.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 8080,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ['../index.html']
      },
      javascripts: {
        files: ['../js/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass'],
        loadPath: ['~/.rbenv/shims/ruby', '~/.rbenv/shims/sass', '/usr/bin/ruby', '/usr/local/bin/sass']
      },
      browserify: {
        files: ['../js/*.js'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'connect', 'watch']);
};
