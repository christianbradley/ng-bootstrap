define(["identity/incremental"], function(Identity) {

	describe("Incremental Identity", function() {

		var subject = new Identity();

		it("generates an incremental identity", function() {
			var a = subject.generate();
			var b = subject.generate();

			expect(a).toBe(0);
			expect(b).toBe(1);
		});

	});

});
