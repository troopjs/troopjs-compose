define([
  "buster",
  "../factory"
], function (buster, Factory) {
  "use strict";

  var assert = buster.referee.assert;

  buster.testCase("troopjs-compose/factory", {
    "compose": function () {
      var Widget = Factory({
        "render": function (_node) {
          _node.innerHTML = "<div>hi</div>";
        }
      });
      var node = {};
      var widget = Widget();
      widget.render(node);
      assert.equals(node.innerHTML, "<div>hi</div>");
    },

    "compose with constructor": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var node = {};
      var widget = Widget(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>hi</div>");
    },

    "inheritance": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var MessageWidget = Factory(Widget, {
        "message": "Hello, World",
        "render": function () {
          this.node.innerHTML = "<div>" + this.message + "</div>";
        }
      });
      var node = {};
      var widget = MessageWidget(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>Hello, World</div>");
    },

    "inheritance via extend": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var MessageWidget = Widget.extend({
        "message": "Hello, World",
        "render": function () {
          this.node.innerHTML = "<div>" + this.message + "</div>";
        }
      });
      var node = {};
      var widget = MessageWidget(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>Hello, World</div>");
    },

    "inheritance2": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var MessageWidget = Factory(Widget, {
        "message": "Hello, World",
        "render": function () {
          this.node.innerHTML = "<div>" + this.message + "</div>";
        }
      });
      var SpanishWidget = Factory(MessageWidget, {
        "message": "Hola"
      });
      var node = {};
      var widget = SpanishWidget(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>Hola</div>");
    },

    "multiple inheritance": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var MessageWidget = Factory(Widget, {
        "message": "Hello, World",
        "render": function () {
          this.node.innerHTML = "<div>" + this.message + "</div>";
        }
      });
      var SpanishWidget = Factory(MessageWidget, {
        "message": "Hola"
      });
      var Renderer = Factory(Widget, {
        "render": function () {
          this.node.innerHTML = "test";
        }
      });
      var RendererSpanishWidget = Factory(Renderer, SpanishWidget);
      var SpanishWidgetRenderer = Factory(SpanishWidget, Renderer);
      var EmptyWidget = Factory(Widget, {});
      var MessageWidget2 = Factory(MessageWidget, EmptyWidget);

      var node = {};
      var widget;

      widget = RendererSpanishWidget(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>Hola</div>");

      widget = SpanishWidgetRenderer(node);
      widget.render();
      assert.equals(node.innerHTML, "test");
      assert.equals(widget.getNode(), node);

      widget = MessageWidget2(node);
      widget.render();
      assert.equals(node.innerHTML, "<div>hi</div>");
    },

    "create": function () {
      var widget = Factory.create({
        "render": function (_node) {
          _node.innerHTML = "<div>hi</div>";
        }
      });
      var node = {};
      widget.render(node);
      assert.equals(node.innerHTML, "<div>hi</div>");
    },

    "inheritance create": function () {
      var Widget = Factory(function (_node) {
        this.node = _node;
      }, {
        "render": function () {
          this.node.innerHTML = "<div>hi</div>";
        },
        "getNode": function () {
          return this.node;
        }
      });
      var widget = Factory.create(Widget, {
        "message": "Hello, World",
        "render": function () {
          this.node.innerHTML = "<div>" + this.message + "</div>";
        }
      }, {
        "foo": "bar"
      });
      widget.node = {};
      widget.render();
      assert.equals(widget.node.innerHTML, "<div>Hello, World</div>");
      assert.equals(widget.foo, "bar");
    },

    "inherited constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });

      Factory.create(Factory(constructor1), constructor2);

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.equals(order, [ 1, 2 ]);
    },

    "unique constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });

      Factory.create(constructor1, constructor1, constructor2);

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.equals(order, [ 1, 2 ]);
    },

    "unique inherited constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });

      Factory.create(Factory(Factory(constructor1), constructor2), constructor1, constructor2);

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.equals(order, [ 1, 2 ]);
    },

    "mixin constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });

      Factory.create(Factory(constructor1), Factory(constructor2));

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.equals(order, [ 1, 2 ]);
    },

    "unique mixin constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });

      Factory.create(Factory(constructor1), Factory(constructor1), Factory(constructor2));

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.equals(order, [ 1, 2 ]);
    },

    "complex constructors": function () {
      var order = [];
      var constructor1 = this.spy(function () {
        order.push(1);
      });
      var constructor2 = this.spy(function () {
        order.push(2);
      });
      var constructor3 = this.spy(function () {
        order.push(3);
      });
      var constructor4 = this.spy(function () {
        order.push(4);
      });
      var constructor5 = this.spy(function () {
        order.push(5);
      });
      var constructor6 = this.spy(function () {
        order.push(6);
      });
      var constructor7 = this.spy(function () {
        order.push(7);
      });
      var constructor8 = this.spy(function () {
        order.push(8);
      });
      var Composition = Factory(constructor1);
      var EmitterComposition = Composition.extend(constructor2);
      var ComponentEmitter = EmitterComposition.extend(constructor3);
      var COMComponent = ComponentEmitter.extend(constructor4);
      var HUBComponent = ComponentEmitter.extend(constructor5);
      var DOMComponent = ComponentEmitter.extend(constructor6);

      Factory.create(constructor7, COMComponent, constructor8, HUBComponent, DOMComponent);

      assert.calledOnce(constructor1);
      assert.calledOnce(constructor2);
      assert.calledOnce(constructor3);
      assert.calledOnce(constructor4);
      assert.calledOnce(constructor5);
      assert.calledOnce(constructor6);
      assert.calledOnce(constructor7);
      assert.calledOnce(constructor8);
      assert.equals(order, [ 7, 1, 2, 3, 4, 8, 5, 6 ]);
    }
  });
});
