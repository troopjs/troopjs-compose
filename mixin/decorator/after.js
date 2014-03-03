define([ "../decorator" ], function AfterDecoratorModule(Decorator) {

	var UNDEFINED;
	var VALUE = "value";

	/**
	 * Create a decorator function that is to be run following the original.
	 * @static
	 * @param {Function} func The decorator function which receives the arguments of the original, it's return value (if
	 * not undefined) will be the used as the new return value.
	 * @returns {Decorator}
	 */
	return Decorator["after"] = function after(func) {
		return new Decorator(function(descriptor) {
			var previous = descriptor[VALUE];

			descriptor[VALUE] = previous
				? function() {
					var me = this;
					var retval = previous.apply(me, arguments);
					var newRet = func.apply(me, arguments);
					return newRet !== UNDEFINED ? newRet : retval;
				}
				: func;

			return descriptor;
		});
	}
});