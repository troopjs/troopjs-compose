/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
	"module",
	"troopjs-utils/merge"
], function (module, merge) {
	"use strict";

	/**
	 * @class composer.mixin.config
	 * @mixin requirejs.config
	 * @inheritdoc requirejs.config
	 * @localdoc This module is to provide configuration for the {@link composer.mixin.factory}.
	 * @protected
	 * @static
	 * @alias config.composer.mixin.config
	 */

	return merge.call({
		/**
		 * @cfg {RegExp} pattern RegExp used to determine if a method is a special
		 * @private
		 */
		"pattern": /^(\w+)(?::(.+?))?\/(.+)/,

		/**
		 * @cfg {Object[]} pragmas Pragmas used to rewrite methods before processing
		 * @cfg {RegExp} pragmas.pattern Matching pattern
		 * @cfg {String} pragmas.replace Replacement string
		 * @protected
		 */
		"pragmas": []
	}, module.config());
});
