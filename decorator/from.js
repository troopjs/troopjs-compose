/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([ "../mixin/decorator" ], function FromDecoratorModule(Decorator) {
	"use strict";

	/**
	 * @class compose.decorator.from
	 * @static
	 * @alias feature.decorator
	 */

	var UNDEFINED;
	var VALUE = "value";
	var PROTOTYPE = "prototype";

	/**
	 * Create a decorator that is to lend from a particular property from this own or the other factory.
	 * @method constructor
	 * @param {Function} [which] The other class from which to borrow the method, otherwise to borrow from the host class.
	 * @param {String} [prop] The property name to borrow from, otherwise to borrow the same property name.
	 * @return {compose.mixin.decorator}
	 */
	return function from(which, prop) {
		// Shifting arguments.
		if (typeof which === "string") {
			prop = which;
			which = UNDEFINED;
		}

		return new Decorator(function (descriptor, name, descriptors) {
			// To override a specified property, otherwise simply this property.
			name = prop || name;

			// Property is from the the other's prototype, otherwise from own descriptor.
			descriptor[VALUE] = which
				? which[PROTOTYPE][name]
				: descriptors[name][VALUE];

			return descriptor;
		});
	}
});
