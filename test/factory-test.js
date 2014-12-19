define([ "../factory" ], function(Factory) {
	"use strict";

	var assert = buster.referee.assert;

	buster.testCase("troopjs-compose/factory", {
		"create": function() {
			function method() {}

			var o = Factory.create(function() {
				this["prop2"] = "bar";
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
