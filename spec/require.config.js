(function($require, $karma) {

	var specs = [];

	for(var file in $karma.files) {
		var isSpec = /\-spec\.js$/.test(file);
		if(isSpec) { specs.push(file); }
	}

	$require.config({
		baseUrl: "/base/app/scripts/lib",
		deps: specs,
		callback: $karma.start
	});

}(require, window.__karma__));
