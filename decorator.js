/**
 * @license MIT http://troopjs.mit-license.org/
 */
define(function () {
  "use strict";

  /**
   * Decorator provides customized way to add properties/methods to object created by {@link compose.factory}.
   * @class compose.decorator
   * @protected
   */

  /**
   * Creates a new decorator
   * @method constructor
   * @param {Function} decorate Function that defines how to override the original one.
   * @param {Object} decorate.descriptor The object descriptor that is the current property.
   * @param {String} decorate.name The property name.
   * @param {Object} decorate.descriptors List of all property descriptors of the host object.
   */
  return function (decorate) {

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
  };
});
