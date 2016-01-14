// Karma configuration
// Generated on Thu Jan 14 2016 15:48:20 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    plugins: [
      'karma-mocha',
      'karma-chai-sinon',
      'karma-jasmine',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/chai-as-promised/lib/chai-as-promised.js',
      'http://code.jquery.com/jquery-2.1.0.min.js',
      'http://code.angularjs.org/1.2.13/angular.js',
      'http://code.angularjs.org/1.2.13/angular-mocks.js',
      'http://code.angularjs.org/1.2.13/angular-route.js',
      'bind-shim.js',
      'app.js',
      'test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for. Do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress','coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
