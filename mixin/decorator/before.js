define([ "../decorator" ], function BeforeDecoratorModule(Decorator) {

	var UNDEFINED;
	var VALUE = "value";

	/**
	 * Create a decorator function that is to be run ahead of the original.
	 * @static
	 * @param {Function} func The decorator function which receives the same arguments as with the original, it's return
	 * value (if not undefined) will be send as the arguments of original function.
	 * @returns {Decorator}
	 */
	return Decorator["before"] = function before(func) {
		return new Decorator(function(descriptor) {
			var next = descriptor[VALUE];

			descriptor[VALUE] = next
				? function() {
					var me = this;
					var retval = func.apply(me, arguments);

					return next.apply(me, retval !== UNDEFINED ? retval : arguments);
				}
				: func;

			return descriptor;
		});
	}
});