/* jshint node: true */

module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  	jshint: {
      all: [
        "Gruntfile.js",
        "src/**/*.js",
        "spec/**/*.js"
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jasmine: {
      src: "src/**/*.js",
      options: {
        specs: "spec/**/*.js",
        vendor: "bower_components/**/*.js",
        version: '2.0.0'
    	}
  	},
    concat: {
      options: {
        separator: ';',
      },
      js: {
        src: ['bower_components/lexer/lexer.js', 'src/measure.js'],
        dest: 'dist/measure.js',
      }
    },
    uglify: {
      js: {
        files: {
          'dist/measure.min.js': ['dist/measure.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test']);
  grunt.registerTask('build', ['concat:js', 'uglify:js']);
};