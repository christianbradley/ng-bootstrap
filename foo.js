(function() {
  "use strict";

  function Foo() {
    this.shouldHaveASemicolon = function() {
      return "foo";
    };
  }

  var foo = new Foo();
  foo.shouldHaveASemicolon();

}());
