/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([ "../mixin/decorator" ], function AfterDecoratorModule(Decorator) {
	"use strict";

	/**
	 * @class compose.decorator.after
	 * @static
	 * @alias feature.decorator
	 */

	var UNDEFINED;
	var VALUE = "value";

	/**
	 * Create a decorator method that is to add code that will be executed after the original method.
	 * @method constructor
	 * @param {Function} func The decorator function which receives the arguments of the original, it's return value (if
	 * not undefined) will be the used as the new return value.
	 * @return {compose.mixin.decorator}
	 */
	return function after(func) {
		return new Decorator(function (descriptor) {
			var previous = descriptor[VALUE];

			descriptor[VALUE] = previous
				? function decorated_after() {
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
