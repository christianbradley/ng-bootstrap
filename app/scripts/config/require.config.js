(function($require) {
  "use strict";

  $require.config({
    urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl: "scripts/lib",
    paths: {
      "main": "/scripts/main",
      "angular": "/scripts/vendor/angular",
      "lodash": "/scripts/vendor/lodash"
    },
    shim: {
      "angular": {
        exports: "angular"
      }
    }
  });

}(require));

