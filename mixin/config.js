/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
	"module",
	"mu-merge"
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
		 * @cfg {Object[]} pragmas Pragmas used to rewrite methods before processing
		 * @cfg {RegExp} pragmas.pattern Matching pattern
		 * @cfg {String|Function} pragmas.replace Replacement String or function
		 * @protected
		 */
		"pragmas": [],


		/**
		 * @cfg {RegExp} specials Regular Expression used parse 'specials'.
		 * A special must be in form of a function call (ended in parenthesis), and have an optional type following a slash
		 *
		 * ````
		 * <special>[/<type>](<arguments>)
		 * ````
		 * @protected
		 */
		"specialsPattern": /^([^\/]+)(?:\/(.+?))?\((.*)\)$/
	}, module.config());
});
