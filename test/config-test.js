define([
  "buster",
  "../config"
], function (buster, config) {
  "use strict";

  var assert = buster.referee.assert;
  var refute = buster.referee.refute;
  var PATTERN = config.specials;

  buster.testCase("troopjs-compose/config", {
    "specialsPattern": function () {
      refute.match("prefix", PATTERN);
      refute.match("prefix()", PATTERN);
      refute.match("prefix(args)", PATTERN);
      assert.match("prefix/type", PATTERN);
      assert.match("prefix/type()", PATTERN);
      assert.match("prefix/type(args)", PATTERN);
      assert.match("prefix/type(a,r,g,s)", PATTERN);
      assert.match("prefix/type(a, (r), g, s)", PATTERN);
      assert.match("prefix/type()()", PATTERN);
    }
  });
});
