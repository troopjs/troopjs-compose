define([ "../decorator" ], function AroundDecoratorModule(Decorator) {

	var VALUE = "value";
	var NOOP = function () {};

	/**
	 * Create a decorator which is to replace a function property with
	 * @static
	 * @param {Function} func The decorator function which receives the original function as parameter and is supposed to
	 * return a function that is to replace the original.
	 * @returns {Decorator}
	 */
	return Decorator["around"] = function around(func) {
		return new Decorator(function(descriptor) {
			descriptor[VALUE] = func(descriptor[VALUE] || NOOP);
			return descriptor;
		});
	}
});