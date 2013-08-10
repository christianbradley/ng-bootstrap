define(["identity/incremental"], function(Identity) {
  "use strict";

  describe("Incremental Identity", function() {

    describe("with defaults", function() {
      var subject = new Identity();

      it("starts at 0", function() {
        expect(subject.generate()).toBe(0);
      });

      it("increments by 1", function() {
        expect(subject.generate()).toBe(1);
      });

    });

    describe("configured", function() {
      var config = { start: 1000, step: 50 };
      var subject = new Identity(config);

      it("starts at the provided index", function() {
        expect(subject.generate()).toBe(config.start);
      });

      it("increments by the provided number", function() {
        expect(subject.generate()).toBe( config.step + config.start );
      });

    });

  });

});
