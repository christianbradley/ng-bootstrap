// Karma configuration
// Generated on Fri Aug 09 2013 18:20:01 GMT-0500 (CDT)

module.exports = function(config) {
  "use strict";

  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '../../',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'app/scripts/lib/**/*.js', included: false},
      {pattern: 'spec/**/*-spec.js', included: false},
			'spec/require.config.js'
    ],


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 15000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

		plugins: [
			'karma-jasmine',
			'karma-requirejs',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher'
		]
  });
};
