define(["require"], function(require) {

	function IncrementalIdentity() {
		var index = 0;

		this.generate = function() {
			return index++;
		}
	}

	return IncrementalIdentity;
});
