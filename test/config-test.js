/*globals buster:false*/
buster.testCase("troopjs-compose/config", function(run) {
	"use strict";

	var assert = buster.referee.assert;
	var refute = buster.referee.refute;

	require([ "troopjs-compose/config" ], function(config) {

		var PATTERN = config.specials;

		run({
			"specialsPattern": function() {
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
});
