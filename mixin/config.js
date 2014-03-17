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
	 * @extends requirejs.config
	 * @inheritdoc
	 * @localdoc This module is to provide configuration for the {@link composer.mixin.factory}.
	 * @protected
	 * @static
	 */
	return merge.call({
		/**
		 * @cfg {RegExp} pattern RegExp used to determine if a method is a special
		 */
		"pattern": /^(\w+)(?::(.+?))?\/(.+)/,

		/**
		 * @cfg {Object[]} pragmas Pragmas used to rewrite methods before processing
		 * @cfg {RegExp} pragmas.pattern Matching pattern
		 * @cfg {String} pragmas.replace Replacement string
		 */
		"pragmas": []
	}, module.config());
});
