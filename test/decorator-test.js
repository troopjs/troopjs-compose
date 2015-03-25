define([
  "buster",
  "../factory",
  "../decorator/after",
  "../decorator/around",
  "../decorator/before",
  "../decorator/extend",
  "../decorator/from"
], function (buster, Factory, after, around, before, extend, from) {
  "use strict";

  var assert = buster.referee.assert;
  var Arith = Factory({
    "sub": function (a, b) {
      return a - b;
    },
    "sub2": function (a, b) {
      return b - a;
    }
  });

  buster.testCase("troopjs-compose/decorator", {
    "setUp": function () {
      this.Cal = Factory({
        "name": "cal",
        "supports": {
          "add": true
        },
        "add": function (a, b) {
          return a + b;
        },
        "sub": function (a, b) {
          return a - b;
        }
      });
    },

    "before": function () {
      var cal = Factory.create(this.Cal, {
        // Return array that spreads over arguments of original.
        "add": before(function (a, b) {
          assert.equals(a, 1);
          assert.equals(b, 2);
          return [ 1, 3 ];
        }),
        // No return value should not interfere original.
        "sub": before(function () { })
      });

      assert.equals(cal.add(1, 2), 4);
      assert.equals(cal.sub(2, 1), 1);
    },

    "after": function () {
      var cal = Factory.create(this.Cal, {
        "add": after(function (a, b) {
          assert.equals(1, a);
          assert.equals(2, b);
        }),
        "sub": after(function () {
          return -1;
        })
      });

      assert.equals(cal.add(1, 2), 3);
      assert.equals(cal.sub(2, 1), -1);
    },

    "around": function () {
      var cal = Factory.create(this.Cal, {
        "add": around(function (org) {
          return function (a, b) {
            a *= a;
            b *= b;
            return org(a, b);
          };
        })
      });

      assert.equals(cal.add(1, 2), 5);
    },

    "from": function () {
      var cal1 = Factory.create(this.Cal, {
        "sub": from(Arith)
      });

      var cal2 = Factory.create(this.Cal, {
        "sub": from(Arith, "sub2")
      });

      var cal3 = Factory.create(this.Cal, {
        "sub": from("add")
      });

      assert.equals(cal1.sub(2, 1), 1);
      assert.equals(cal2.sub(2, 1), -1);
      assert.equals(cal3.sub(2, 1), 3);
    },

    "extend": function () {
      var Cal = Factory(this.Cal, {
        "supports": extend({
          "sub": true
        })
      });

      var Cal2 = Cal.extend({
        "mul": function (a, b) { return a * b; },
        "supports": extend(function () {
          return {
            "mul": true,
            "div": false
          };
        })
      });

      var cal1 = Cal();
      var cal2 = Cal2();

      assert.equals(cal1.supports, {
        "add": true,
        "sub": true
      });

      assert.equals(cal2.supports, {
        "div": false,
        "mul": true
      });
    }
  });
});
