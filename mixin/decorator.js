/*
 * TroopJS composer/mixin/decorator
 * @license MIT http://troopjs.mit-license.org/ © Mikael Karon mailto:mikael@karon.se
 */
define([
	"troopjs-utils/merge",
	"poly/object"
], function DecoratorModule(merge) {
	"use strict";

	var PROTOTYPE = "prototype";
	var UNDEFINED = undefined;
	var DECORATE = "decorate";
	var VALUE = "value";
	var ARRAY_PROTO = Array[PROTOTYPE];
	var ARRAY_CONCAT = ARRAY_PROTO.concat;
	function NOOP() {}

	/**
	 * Decorator provides customized way to add properties/methods to object created by {@link composer.mixin.factory}.
	 * Several decorators are provided by this module.
	 * @class composer.mixin.decorator
	 * @constructor
	 * @param {Function} decorate Function that defines how to override the original one.
	 */
	function Decorator(decorate) {
		var descriptor = {};

		/**
		 * Function that decides what decoration is to make.
		 * @method decorate
		 * @param {Object} descriptor The object descriptor that is the current property.
		 * @param {String} name The property name.
		 * @param {Object} descriptors List of all property descriptors of the host object.
		 * @member composer.mixin.decorator
		 */
		descriptor[DECORATE] = {
			"value": decorate
		};

		// Define properties
		Object.defineProperties(this, descriptor);
	}

	// List of decorators.
	var decorators = {

		/**
		 * Create a decorator function that is to be run ahead of the original.
		 * @member composer.mixin.decorator
		 * @static
		 * @param {Function} func The decorator function which receives the same arguments as with the original, it's return
		 * value (if not undefined) will be send as the arguments of original function.
		 * @returns {composer.mixin.decorator}
		 */
		"before": function decorateBefore(func) {
			return new Decorator(function(descriptor) {
				var next = descriptor[VALUE];

				descriptor[VALUE] = next ? function() {
					var me = this;
					var retval = func.apply(me, arguments);
					return next.apply(me, retval !== UNDEFINED? retval : arguments);
				} : func;

				return descriptor;
			});
		},

		/**
		 * Create a decorator function that is to be run following the original.
		 * @member composer.mixin.decorator
		 * @static
		 * @param {Function} func The decorator function which receives the arguments of the original, it's return value (if
		 * not undefined) will be the used as the new return value.
		 * @returns {composer.mixin.decorator}
		 */
		"after": function decorateAfter(func) {
			return new Decorator(function(descriptor) {
				var previous = descriptor[VALUE];

				descriptor[VALUE] = previous ? function() {
					var me = this;
					var retval = previous.apply(me, arguments);
					var newRet = func.apply(me, arguments);
					return newRet !== UNDEFINED ? newRet : retval;
				} : func;

				return descriptor;
			});
		},

		/**
		 * Create a decorator which is to replace a function property with
		 *
		 * @member composer.mixin.decorator
		 * @static
		 * @param {Function} func The decorator function which receives the original function as parameter and is supposed to
		 * return a function that is to replace the original.
		 * @returns {composer.mixin.decorator}
		 */
		"around": function decorateAround(func) {
			return new Decorator(function(descriptor) {
				descriptor[VALUE] = func(descriptor[VALUE] || NOOP);
				return descriptor;
			});
		},

		/**
		 * Create a decorator that is to lend from a particular property from this own or the other class.
		 *
		 *  Decorator.from(Foo);
		 *  Decorator.from("prop");
		 *  Decorator.from(Foo, "other");
		 *
		 * @member composer.mixin.decorator
		 * @static
		 * @param {Function} [which] The other class from which to borrow the method, otherwise to borrow from the host class.
		 * @param {String} [prop] The property name to borrow from, otherwise to borrow the same property name.
		 * @returns {composer.mixin.decorator}
		 */
		"from": function decorateFrom(which, prop) {
			// Shifting arguments.
			if (typeof which === 'string') {
				prop = which;
				which = UNDEFINED;
			}

			return new Decorator(function(descriptor, name, descriptors) {
				// To override a specified property, otherwise simply this property.
				name = prop || name;
				// Property is from the the other's prototype, otherwise from own descriptor.
				descriptor[VALUE] = which ? which[PROTOTYPE][name] : descriptors[name][VALUE];
				return descriptor;
			});
		},

		/**
		 * Create a decorator upon an existing object property in order to augment it further.
		 *
		 * @member composer.mixin.decorator
		 * @static
		 * @param {Function|Object...} ext One or more objects to merge into this property, or a function that returns a new object to be used.
		 * @returns {composer.mixin.decorator}
		 */
		"extend": function decorateExtend(ext) {
			var args = arguments;
			return new Decorator(function(descriptor, name, descriptors) {
				var previous = descriptors[name][VALUE];
				var val;

				if (typeof ext === 'function') {
					val = ext(previous);
				}
				else if (previous !== UNDEFINED) {
					val = merge.apply({}, ARRAY_CONCAT.apply([previous], args));
				}
				descriptor[VALUE] = val;
				return descriptor;
			});
		}
	};

	// Add decorators as function statics.
	var descriptors = {};
	Object.keys(decorators).forEach(function(name) {
		descriptors[name] = {
			"value": decorators[name]
		};
	});
	Object.defineProperties(Decorator, descriptors);

	return Decorator;
});
