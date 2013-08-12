// jshint camelcase: false
(function($require, $karma) {
  "use strict";

  function isSpec(file) {
    return (/-spec\.js$/).test(file);
  }

  function getSpecs(files) {
    var file, specs = [];

    for(file in files) {
      if(files.hasOwnProperty(file) && isSpec(file)) {
        specs.push(file);
      }
    }

    return specs;
  }

  $require.config({
    baseUrl: "/base/app/scripts/lib",
    deps: getSpecs($karma.files),
    callback: $karma.start
  });

}(require, window.__karma__));
