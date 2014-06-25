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
  	}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['test']);
};