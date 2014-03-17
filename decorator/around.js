/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([ "../mixin/decorator" ], function AroundDecoratorModule(Decorator) {
	"use strict";

	/**
	 * @class composer.decorator.around
	 * @extends composer.decorator
	 * @static
	 */

	var VALUE = "value";
	var NOOP = function () {};

	/**
	 * Create a decorator that is to override an existing method.
	 * @method constructor
	 * @static
	 * @param {Function} func The decorator function which receives the original function as parameter and is supposed to
	 * return a function that is to replace the original.
	 * @returns {composer.mixin.decorator}
	 */
	return function around(func) {
		return new Decorator(function (descriptor) {
			descriptor[VALUE] = func(descriptor[VALUE] || NOOP);
			return descriptor;
		});
	}
});
