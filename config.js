/**
 * @license MIT http://troopjs.mit-license.org/
 */
define([
  "module",
  "mu-merge/main"
], function (module, merge) {
  "use strict";

  /**
   * Pragma interface.
   * @class compose.config.pragma
   * @interface
   * @private
   */
  /**
   * @property {RegExp} pattern Matching pattern
   */
  /**
   * @property {String|Function} replace Replacement String or function
   */

  /**
   * Provides configuration for the {@link compose.factory}
   * @class compose.config
   * @private
   * @alias feature.config
   */

  return merge.call({
    /**
     * @cfg {compose.config.pragma[]}
     * Pragmas used to rewrite methods before processing
     * @protected
     */
    "pragmas": [],


    /**
     * @cfg {RegExp}
     * Regular Expression used parse 'specials'.
     * ````
     * <special>/<type>[(<arguments>)]
     * ````
     * @protected
     */
    "specials": /^([^\/]+)\/(.+?)(?:\((.*)\))?$/
  }, module.config());
});
