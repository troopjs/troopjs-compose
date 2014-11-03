/*globals buster:false*/
buster.testCase("troopjs-compose/mixin/config", function(run) {
	"use strict";

	var assert = buster.referee.assert;
	var refute = buster.referee.refute;

	require([ "troopjs-compose/mixin/config" ], function(config) {

		var RE = config["specialsPattern"];

		run({
			"specialsPattern": function() {
				refute.match("prefix", RE);
				refute.match("prefix/type", RE);
				assert.match("prefix()", RE);
				assert.match("prefix(args)", RE);
				assert.match("prefix(a,r,g,s)", RE);
				assert.match("prefix(a, (r), g, s)", RE);
				assert.match("prefix()()", RE);
				assert.match("prefix/type()", RE);
				assert.match("prefix/type(args)", RE);
			}
		});
	});
});
