/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([ "poly/object" ], function DecoratorModule() {
	"use strict";

	/**
	 * Decorator provides customized way to add properties/methods to object created by {@link composer.mixin.factory}.
	 * @class composer.mixin.decorator
	 */

	/**
	 * Creates a new decorator
	 * @method constructor
	 * @param {Function} decorate Function that defines how to override the original one.
	 */
	return function Decorator(decorate) {

		// Define properties
		Object.defineProperties(this, {
			/**
			 * Function that decides what decoration is to make.
			 * @method decorate
			 * @param {Object} descriptor The object descriptor that is the current property.
			 * @param {String} name The property name.
			 * @param {Object} descriptors List of all property descriptors of the host object.
			 */
			"decorate": {
				"value": decorate
			}
		});
	}
});
