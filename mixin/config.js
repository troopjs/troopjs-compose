/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
	"module",
	"troopjs-util/merge"
], function (module, merge) {
	"use strict";

	/**
	 * Provides configuration for the {@link compose.mixin.factory}
	 * @class compose.mixin.config
	 * @protected
	 * @alias feature.config
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
