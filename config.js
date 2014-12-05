/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
	"module",
	"mu-merge"
], function (module, merge) {
	"use strict";

	/**
	 * Provides configuration for the {@link compose.factory}
	 * @class compose.config
	 * @private
	 * @alias feature.config
	 */

	return merge.call({
		/**
		 * @cfg {compose.pragma[]} pragmas Pragmas used to rewrite methods before processing
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
