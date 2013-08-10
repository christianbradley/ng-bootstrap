define(["require"], function(require) {

	function IncrementalIdentity(config) {
		config = typeof config === "object" ? config : {};
		var index = config.hasOwnProperty("start") ? config.start : 0;
		var step = config.hasOwnProperty("step") ? config.step : 1;

		this.generate = function() {
			var generated = index;
			index += step;
			return generated;
		}
	}

	return IncrementalIdentity;
});
