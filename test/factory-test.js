define([
  "buster",
  "../factory"
], function (buster, Factory) {
  "use strict";

  var assert = buster.referee.assert;

  buster.testCase("troopjs-compose/factory", {
    "create": function () {
      var o;

      function method () {}

      o = Factory.create(function () {
        this.prop2 = "bar";
      }, {
        "prop1": "foo",
        "func1": method
      });

      assert.equals(o.prop2, "bar");
      assert.equals(o.prop1, "foo");
      assert.equals(o.func1, method);
    }
  });
});
