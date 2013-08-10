// jshint camelcase: false
(function($require, $karma) {
  "use strict";

  function getSpecs(files) {
    var i, len, file;
    var matcher = /\-spec\.js$/;
    var matches = [];

    for(i = 0, len = files.length; i < len; i++) {
      file = files[i];
      if(matcher.test(file)) { matches.push(file); }
    }

    return matches;
  }


	$require.config({
		baseUrl: "/base/app/scripts/lib",
		deps: getSpecs($karma.files),
		callback: $karma.start
	});

}(require, window.__karma__));
