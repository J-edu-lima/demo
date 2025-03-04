/*! jQuery UI - v1.11.0 - 2014-07-22
* http://jqueryui.com
* Includes: core.js, widget.js, mouse.js, position.js, draggable.js, droppable.js, resizable.js, selectable.js, sortable.js, datepicker.js, slider.js, effect.js, effect-blind.js, effect-bounce.js, effect-clip.js, effect-drop.js, effect-explode.js, effect-fade.js, effect-fold.js, effect-highlight.js, effect-puff.js, effect-pulsate.js, effect-scale.js, effect-shake.js, effect-size.js, effect-slide.js, effect-transfer.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function(y) {
    /*!
 * jQuery UI Core 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
    y.ui = y.ui || {};
    y.extend(y.ui, {
        version: "1.11.0",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    y.fn.extend({
        scrollParent: function() {
            var N = this.css("position")
              , M = N === "absolute"
              , O = this.parents().filter(function() {
                var P = y(this);
                if (M && P.css("position") === "static") {
                    return false
                }
                return (/(auto|scroll)/).test(P.css("overflow") + P.css("overflow-y") + P.css("overflow-x"))
            }).eq(0);
            return N === "fixed" || !O.length ? y(this[0].ownerDocument || document) : O
        },
        uniqueId: (function() {
            var M = 0;
            return function() {
                return this.each(function() {
                    if (!this.id) {
                        this.id = "ui-id-" + (++M)
                    }
                })
            }
        }
        )(),
        removeUniqueId: function() {
            return this.each(function() {
                if (/^ui-id-\d+$/.test(this.id)) {
                    y(this).removeAttr("id")
                }
            })
        }
    });
    function n(O, M) {
        var Q, P, N, R = O.nodeName.toLowerCase();
        if ("area" === R) {
            Q = O.parentNode;
            P = Q.name;
            if (!O.href || !P || Q.nodeName.toLowerCase() !== "map") {
                return false
            }
            N = y("img[usemap=#" + P + "]")[0];
            return !!N && o(N)
        }
        return (/input|select|textarea|button|object/.test(R) ? !O.disabled : "a" === R ? O.href || M : M) && o(O)
    }
    function o(M) {
        return y.expr.filters.visible(M) && !y(M).parents().addBack().filter(function() {
            return y.css(this, "visibility") === "hidden"
        }).length
    }
    y.extend(y.expr[":"], {
        data: y.expr.createPseudo ? y.expr.createPseudo(function(M) {
            return function(N) {
                return !!y.data(N, M)
            }
        }) : function(O, N, M) {
            return !!y.data(O, M[3])
        }
        ,
        focusable: function(M) {
            return n(M, !isNaN(y.attr(M, "tabindex")))
        },
        tabbable: function(O) {
            var M = y.attr(O, "tabindex")
              , N = isNaN(M);
            return (N || M >= 0) && n(O, !N)
        }
    });
    if (!y("<a>").outerWidth(1).jquery) {
        y.each(["Width", "Height"], function(O, M) {
            var N = M === "Width" ? ["Left", "Right"] : ["Top", "Bottom"]
              , P = M.toLowerCase()
              , R = {
                innerWidth: y.fn.innerWidth,
                innerHeight: y.fn.innerHeight,
                outerWidth: y.fn.outerWidth,
                outerHeight: y.fn.outerHeight
            };
            function Q(U, T, S, V) {
                y.each(N, function() {
                    T -= parseFloat(y.css(U, "padding" + this)) || 0;
                    if (S) {
                        T -= parseFloat(y.css(U, "border" + this + "Width")) || 0
                    }
                    if (V) {
                        T -= parseFloat(y.css(U, "margin" + this)) || 0
                    }
                });
                return T
            }
            y.fn["inner" + M] = function(S) {
                if (S === undefined) {
                    return R["inner" + M].call(this)
                }
                return this.each(function() {
                    y(this).css(P, Q(this, S) + "px")
                })
            }
            ;
            y.fn["outer" + M] = function(S, T) {
                if (typeof S !== "number") {
                    return R["outer" + M].call(this, S)
                }
                return this.each(function() {
                    y(this).css(P, Q(this, S, true, T) + "px")
                })
            }
        })
    }
    if (!y.fn.addBack) {
        y.fn.addBack = function(M) {
            return this.add(M == null ? this.prevObject : this.prevObject.filter(M))
        }
    }
    if (y("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
        y.fn.removeData = (function(M) {
            return function(N) {
                if (arguments.length) {
                    return M.call(this, y.camelCase(N))
                } else {
                    return M.call(this)
                }
            }
        }
        )(y.fn.removeData)
    }
    y.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    y.fn.extend({
        focus: (function(M) {
            return function(N, O) {
                return typeof N === "number" ? this.each(function() {
                    var P = this;
                    setTimeout(function() {
                        y(P).focus();
                        if (O) {
                            O.call(P)
                        }
                    }, N)
                }) : M.apply(this, arguments)
            }
        }
        )(y.fn.focus),
        disableSelection: (function() {
            var M = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown";
            return function() {
                return this.bind(M + ".ui-disableSelection", function(N) {
                    N.preventDefault()
                })
            }
        }
        )(),
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function(P) {
            if (P !== undefined) {
                return this.css("zIndex", P)
            }
            if (this.length) {
                var N = y(this[0]), M, O;
                while (N.length && N[0] !== document) {
                    M = N.css("position");
                    if (M === "absolute" || M === "relative" || M === "fixed") {
                        O = parseInt(N.css("zIndex"), 10);
                        if (!isNaN(O) && O !== 0) {
                            return O
                        }
                    }
                    N = N.parent()
                }
            }
            return 0
        }
    });
    y.ui.plugin = {
        add: function(N, O, Q) {
            var M, P = y.ui[N].prototype;
            for (M in Q) {
                P.plugins[M] = P.plugins[M] || [];
                P.plugins[M].push([O, Q[M]])
            }
        },
        call: function(M, P, O, N) {
            var Q, R = M.plugins[P];
            if (!R) {
                return
            }
            if (!N && (!M.element[0].parentNode || M.element[0].parentNode.nodeType === 11)) {
                return
            }
            for (Q = 0; Q < R.length; Q++) {
                if (M.options[R[Q][0]]) {
                    R[Q][1].apply(M.element, O)
                }
            }
        }
    };
    /*!
 * jQuery UI Widget 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
    var C = 0
      , h = Array.prototype.slice;
    y.cleanData = (function(M) {
        return function(N) {
            for (var O = 0, P; (P = N[O]) != null; O++) {
                try {
                    y(P).triggerHandler("remove")
                } catch (Q) {}
            }
            M(N)
        }
    }
    )(y.cleanData);
    y.widget = function(M, N, U) {
        var R, S, P, T, O = {}, Q = M.split(".")[0];
        M = M.split(".")[1];
        R = Q + "-" + M;
        if (!U) {
            U = N;
            N = y.Widget
        }
        y.expr[":"][R.toLowerCase()] = function(V) {
            return !!y.data(V, R)
        }
        ;
        y[Q] = y[Q] || {};
        S = y[Q][M];
        P = y[Q][M] = function(V, W) {
            if (!this._createWidget) {
                return new P(V,W)
            }
            if (arguments.length) {
                this._createWidget(V, W)
            }
        }
        ;
        y.extend(P, S, {
            version: U.version,
            _proto: y.extend({}, U),
            _childConstructors: []
        });
        T = new N();
        T.options = y.widget.extend({}, T.options);
        y.each(U, function(W, V) {
            if (!y.isFunction(V)) {
                O[W] = V;
                return
            }
            O[W] = (function() {
                var X = function() {
                    return N.prototype[W].apply(this, arguments)
                }
                  , Y = function(Z) {
                    return N.prototype[W].apply(this, Z)
                };
                return function() {
                    var ab = this._super, Z = this._superApply, aa;
                    this._super = X;
                    this._superApply = Y;
                    aa = V.apply(this, arguments);
                    this._super = ab;
                    this._superApply = Z;
                    return aa
                }
            }
            )()
        });
        P.prototype = y.widget.extend(T, {
            widgetEventPrefix: S ? (T.widgetEventPrefix || M) : M
        }, O, {
            constructor: P,
            namespace: Q,
            widgetName: M,
            widgetFullName: R
        });
        if (S) {
            y.each(S._childConstructors, function(W, X) {
                var V = X.prototype;
                y.widget(V.namespace + "." + V.widgetName, P, X._proto)
            });
            delete S._childConstructors
        } else {
            N._childConstructors.push(P)
        }
        y.widget.bridge(M, P);
        return P
    }
    ;
    y.widget.extend = function(R) {
        var N = h.call(arguments, 1), Q = 0, M = N.length, O, P;
        for (; Q < M; Q++) {
            for (O in N[Q]) {
                P = N[Q][O];
                if (N[Q].hasOwnProperty(O) && P !== undefined) {
                    if (y.isPlainObject(P)) {
                        R[O] = y.isPlainObject(R[O]) ? y.widget.extend({}, R[O], P) : y.widget.extend({}, P)
                    } else {
                        R[O] = P
                    }
                }
            }
        }
        return R
    }
    ;
    y.widget.bridge = function(N, M) {
        var O = M.prototype.widgetFullName || N;
        y.fn[N] = function(R) {
            var P = typeof R === "string"
              , Q = h.call(arguments, 1)
              , S = this;
            R = !P && Q.length ? y.widget.extend.apply(null, [R].concat(Q)) : R;
            if (P) {
                this.each(function() {
                    var U, T = y.data(this, O);
                    if (R === "instance") {
                        S = T;
                        return false
                    }
                    if (!T) {
                        return y.error("cannot call methods on " + N + " prior to initialization; attempted to call method '" + R + "'")
                    }
                    if (!y.isFunction(T[R]) || R.charAt(0) === "_") {
                        return y.error("no such method '" + R + "' for " + N + " widget instance")
                    }
                    U = T[R].apply(T, Q);
                    if (U !== T && U !== undefined) {
                        S = U && U.jquery ? S.pushStack(U.get()) : U;
                        return false
                    }
                })
            } else {
                this.each(function() {
                    var T = y.data(this, O);
                    if (T) {
                        T.option(R || {});
                        if (T._init) {
                            T._init()
                        }
                    } else {
                        y.data(this, O, new M(R,this))
                    }
                })
            }
            return S
        }
    }
    ;
    y.Widget = function() {}
    ;
    y.Widget._childConstructors = [];
    y.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(M, N) {
            N = y(N || this.defaultElement || this)[0];
            this.element = y(N);
            this.uuid = C++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = y.widget.extend({}, this.options, this._getCreateOptions(), M);
            this.bindings = y();
            this.hoverable = y();
            this.focusable = y();
            if (N !== this) {
                y.data(N, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(O) {
                        if (O.target === N) {
                            this.destroy()
                        }
                    }
                });
                this.document = y(N.style ? N.ownerDocument : N.document || N);
                this.window = y(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: y.noop,
        _getCreateEventData: y.noop,
        _create: y.noop,
        _init: y.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(y.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: y.noop,
        widget: function() {
            return this.element
        },
        option: function(P, Q) {
            var M = P, R, O, N;
            if (arguments.length === 0) {
                return y.widget.extend({}, this.options)
            }
            if (typeof P === "string") {
                M = {};
                R = P.split(".");
                P = R.shift();
                if (R.length) {
                    O = M[P] = y.widget.extend({}, this.options[P]);
                    for (N = 0; N < R.length - 1; N++) {
                        O[R[N]] = O[R[N]] || {};
                        O = O[R[N]]
                    }
                    P = R.pop();
                    if (arguments.length === 1) {
                        return O[P] === undefined ? null : O[P]
                    }
                    O[P] = Q
                } else {
                    if (arguments.length === 1) {
                        return this.options[P] === undefined ? null : this.options[P]
                    }
                    M[P] = Q
                }
            }
            this._setOptions(M);
            return this
        },
        _setOptions: function(M) {
            var N;
            for (N in M) {
                this._setOption(N, M[N])
            }
            return this
        },
        _setOption: function(M, N) {
            this.options[M] = N;
            if (M === "disabled") {
                this.widget().toggleClass(this.widgetFullName + "-disabled", !!N);
                if (N) {
                    this.hoverable.removeClass("ui-state-hover");
                    this.focusable.removeClass("ui-state-focus")
                }
            }
            return this
        },
        enable: function() {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: true
            })
        },
        _on: function(P, O, N) {
            var Q, M = this;
            if (typeof P !== "boolean") {
                N = O;
                O = P;
                P = false
            }
            if (!N) {
                N = O;
                O = this.element;
                Q = this.widget()
            } else {
                O = Q = y(O);
                this.bindings = this.bindings.add(O)
            }
            y.each(N, function(W, V) {
                function T() {
                    if (!P && (M.options.disabled === true || y(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof V === "string" ? M[V] : V).apply(M, arguments)
                }
                if (typeof V !== "string") {
                    T.guid = V.guid = V.guid || T.guid || y.guid++
                }
                var U = W.match(/^([\w:-]*)\s*(.*)$/)
                  , S = U[1] + M.eventNamespace
                  , R = U[2];
                if (R) {
                    Q.delegate(R, S, T)
                } else {
                    O.bind(S, T)
                }
            })
        },
        _off: function(N, M) {
            M = (M || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            N.unbind(M).undelegate(M)
        },
        _delay: function(P, O) {
            function N() {
                return (typeof P === "string" ? M[P] : P).apply(M, arguments)
            }
            var M = this;
            return setTimeout(N, O || 0)
        },
        _hoverable: function(M) {
            this.hoverable = this.hoverable.add(M);
            this._on(M, {
                mouseenter: function(N) {
                    y(N.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(N) {
                    y(N.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(M) {
            this.focusable = this.focusable.add(M);
            this._on(M, {
                focusin: function(N) {
                    y(N.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(N) {
                    y(N.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(M, N, O) {
            var R, Q, P = this.options[M];
            O = O || {};
            N = y.Event(N);
            N.type = (M === this.widgetEventPrefix ? M : this.widgetEventPrefix + M).toLowerCase();
            N.target = this.element[0];
            Q = N.originalEvent;
            if (Q) {
                for (R in Q) {
                    if (!(R in N)) {
                        N[R] = Q[R]
                    }
                }
            }
            this.element.trigger(N, O);
            return !(y.isFunction(P) && P.apply(this.element[0], [N].concat(O)) === false || N.isDefaultPrevented())
        }
    };
    y.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(N, M) {
        y.Widget.prototype["_" + N] = function(Q, P, S) {
            if (typeof P === "string") {
                P = {
                    effect: P
                }
            }
            var R, O = !P ? N : P === true || typeof P === "number" ? M : P.effect || M;
            P = P || {};
            if (typeof P === "number") {
                P = {
                    duration: P
                }
            }
            R = !y.isEmptyObject(P);
            P.complete = S;
            if (P.delay) {
                Q.delay(P.delay)
            }
            if (R && y.effects && y.effects.effect[O]) {
                Q[N](P)
            } else {
                if (O !== N && Q[O]) {
                    Q[O](P.duration, P.easing, S)
                } else {
                    Q.queue(function(T) {
                        y(this)[N]();
                        if (S) {
                            S.call(Q[0])
                        }
                        T()
                    })
                }
            }
        }
    });
    var z = y.widget;
    /*!
 * jQuery UI Mouse 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */
    var b = false;
    y(document).mouseup(function() {
        b = false
    });
    var w = y.widget("ui.mouse", {
        version: "1.11.0",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var M = this;
            this.element.bind("mousedown." + this.widgetName, function(N) {
                return M._mouseDown(N)
            }).bind("click." + this.widgetName, function(N) {
                if (true === y.data(N.target, M.widgetName + ".preventClickEvent")) {
                    y.removeData(N.target, M.widgetName + ".preventClickEvent");
                    N.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        },
        _mouseDown: function(O) {
            if (b) {
                return
            }
            (this._mouseStarted && this._mouseUp(O));
            this._mouseDownEvent = O;
            var N = this
              , P = (O.which === 1)
              , M = (typeof this.options.cancel === "string" && O.target.nodeName ? y(O.target).closest(this.options.cancel).length : false);
            if (!P || M || !this._mouseCapture(O)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function() {
                    N.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(O) && this._mouseDelayMet(O)) {
                this._mouseStarted = (this._mouseStart(O) !== false);
                if (!this._mouseStarted) {
                    O.preventDefault();
                    return true
                }
            }
            if (true === y.data(O.target, this.widgetName + ".preventClickEvent")) {
                y.removeData(O.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function(Q) {
                return N._mouseMove(Q)
            }
            ;
            this._mouseUpDelegate = function(Q) {
                return N._mouseUp(Q)
            }
            ;
            this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            O.preventDefault();
            b = true;
            return true
        },
        _mouseMove: function(M) {
            if (y.ui.ie && (!document.documentMode || document.documentMode < 9) && !M.button) {
                return this._mouseUp(M)
            } else {
                if (!M.which) {
                    return this._mouseUp(M)
                }
            }
            if (this._mouseStarted) {
                this._mouseDrag(M);
                return M.preventDefault()
            }
            if (this._mouseDistanceMet(M) && this._mouseDelayMet(M)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, M) !== false);
                (this._mouseStarted ? this._mouseDrag(M) : this._mouseUp(M))
            }
            return !this._mouseStarted
        },
        _mouseUp: function(M) {
            this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (M.target === this._mouseDownEvent.target) {
                    y.data(M.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(M)
            }
            b = false;
            return false
        },
        _mouseDistanceMet: function(M) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - M.pageX), Math.abs(this._mouseDownEvent.pageY - M.pageY)) >= this.options.distance)
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return true
        }
    });
    /*!
 * jQuery UI Position 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
    (function() {
        y.ui = y.ui || {};
        var T, W, U = Math.max, Z = Math.abs, X = Math.round, O = /left|center|right/, R = /top|center|bottom/, M = /[\+\-]\d+(\.[\d]+)?%?/, V = /^\w+/, N = /%$/, Q = y.fn.position;
        function Y(ac, ab, aa) {
            return [parseFloat(ac[0]) * (N.test(ac[0]) ? ab / 100 : 1), parseFloat(ac[1]) * (N.test(ac[1]) ? aa / 100 : 1)]
        }
        function S(aa, ab) {
            return parseInt(y.css(aa, ab), 10) || 0
        }
        function P(ab) {
            var aa = ab[0];
            if (aa.nodeType === 9) {
                return {
                    width: ab.width(),
                    height: ab.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (y.isWindow(aa)) {
                return {
                    width: ab.width(),
                    height: ab.height(),
                    offset: {
                        top: ab.scrollTop(),
                        left: ab.scrollLeft()
                    }
                }
            }
            if (aa.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: aa.pageY,
                        left: aa.pageX
                    }
                }
            }
            return {
                width: ab.outerWidth(),
                height: ab.outerHeight(),
                offset: ab.offset()
            }
        }
        y.position = {
            scrollbarWidth: function() {
                if (T !== undefined) {
                    return T
                }
                var ab, aa, ad = y("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), ac = ad.children()[0];
                y("body").append(ad);
                ab = ac.offsetWidth;
                ad.css("overflow", "scroll");
                aa = ac.offsetWidth;
                if (ab === aa) {
                    aa = ad[0].clientWidth
                }
                ad.remove();
                return (T = ab - aa)
            },
            getScrollInfo: function(ae) {
                var ad = ae.isWindow || ae.isDocument ? "" : ae.element.css("overflow-x")
                  , ac = ae.isWindow || ae.isDocument ? "" : ae.element.css("overflow-y")
                  , ab = ad === "scroll" || (ad === "auto" && ae.width < ae.element[0].scrollWidth)
                  , aa = ac === "scroll" || (ac === "auto" && ae.height < ae.element[0].scrollHeight);
                return {
                    width: aa ? y.position.scrollbarWidth() : 0,
                    height: ab ? y.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function(ab) {
                var ac = y(ab || window)
                  , aa = y.isWindow(ac[0])
                  , ad = !!ac[0] && ac[0].nodeType === 9;
                return {
                    element: ac,
                    isWindow: aa,
                    isDocument: ad,
                    offset: ac.offset() || {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: ac.scrollLeft(),
                    scrollTop: ac.scrollTop(),
                    width: aa ? ac.width() : ac.outerWidth(),
                    height: aa ? ac.height() : ac.outerHeight()
                }
            }
        };
        y.fn.position = function(ak) {
            if (!ak || !ak.of) {
                return Q.apply(this, arguments)
            }
            ak = y.extend({}, ak);
            var al, ah, af, aj, ae, aa, ag = y(ak.of), ad = y.position.getWithinInfo(ak.within), ab = y.position.getScrollInfo(ad), ai = (ak.collision || "flip").split(" "), ac = {};
            aa = P(ag);
            if (ag[0].preventDefault) {
                ak.at = "left top"
            }
            ah = aa.width;
            af = aa.height;
            aj = aa.offset;
            ae = y.extend({}, aj);
            y.each(["my", "at"], function() {
                var ao = (ak[this] || "").split(" "), an, am;
                if (ao.length === 1) {
                    ao = O.test(ao[0]) ? ao.concat(["center"]) : R.test(ao[0]) ? ["center"].concat(ao) : ["center", "center"]
                }
                ao[0] = O.test(ao[0]) ? ao[0] : "center";
                ao[1] = R.test(ao[1]) ? ao[1] : "center";
                an = M.exec(ao[0]);
                am = M.exec(ao[1]);
                ac[this] = [an ? an[0] : 0, am ? am[0] : 0];
                ak[this] = [V.exec(ao[0])[0], V.exec(ao[1])[0]]
            });
            if (ai.length === 1) {
                ai[1] = ai[0]
            }
            if (ak.at[0] === "right") {
                ae.left += ah
            } else {
                if (ak.at[0] === "center") {
                    ae.left += ah / 2
                }
            }
            if (ak.at[1] === "bottom") {
                ae.top += af
            } else {
                if (ak.at[1] === "center") {
                    ae.top += af / 2
                }
            }
            al = Y(ac.at, ah, af);
            ae.left += al[0];
            ae.top += al[1];
            return this.each(function() {
                var an, ax, ap = y(this), ar = ap.outerWidth(), ao = ap.outerHeight(), aq = S(this, "marginLeft"), am = S(this, "marginTop"), aw = ar + aq + S(this, "marginRight") + ab.width, av = ao + am + S(this, "marginBottom") + ab.height, at = y.extend({}, ae), au = Y(ac.my, ap.outerWidth(), ap.outerHeight());
                if (ak.my[0] === "right") {
                    at.left -= ar
                } else {
                    if (ak.my[0] === "center") {
                        at.left -= ar / 2
                    }
                }
                if (ak.my[1] === "bottom") {
                    at.top -= ao
                } else {
                    if (ak.my[1] === "center") {
                        at.top -= ao / 2
                    }
                }
                at.left += au[0];
                at.top += au[1];
                if (!W) {
                    at.left = X(at.left);
                    at.top = X(at.top)
                }
                an = {
                    marginLeft: aq,
                    marginTop: am
                };
                y.each(["left", "top"], function(az, ay) {
                    if (y.ui.position[ai[az]]) {
                        y.ui.position[ai[az]][ay](at, {
                            targetWidth: ah,
                            targetHeight: af,
                            elemWidth: ar,
                            elemHeight: ao,
                            collisionPosition: an,
                            collisionWidth: aw,
                            collisionHeight: av,
                            offset: [al[0] + au[0], al[1] + au[1]],
                            my: ak.my,
                            at: ak.at,
                            within: ad,
                            elem: ap
                        })
                    }
                });
                if (ak.using) {
                    ax = function(aB) {
                        var aD = aj.left - at.left
                          , aA = aD + ah - ar
                          , aC = aj.top - at.top
                          , az = aC + af - ao
                          , ay = {
                            target: {
                                element: ag,
                                left: aj.left,
                                top: aj.top,
                                width: ah,
                                height: af
                            },
                            element: {
                                element: ap,
                                left: at.left,
                                top: at.top,
                                width: ar,
                                height: ao
                            },
                            horizontal: aA < 0 ? "left" : aD > 0 ? "right" : "center",
                            vertical: az < 0 ? "top" : aC > 0 ? "bottom" : "middle"
                        };
                        if (ah < ar && Z(aD + aA) < ah) {
                            ay.horizontal = "center"
                        }
                        if (af < ao && Z(aC + az) < af) {
                            ay.vertical = "middle"
                        }
                        if (U(Z(aD), Z(aA)) > U(Z(aC), Z(az))) {
                            ay.important = "horizontal"
                        } else {
                            ay.important = "vertical"
                        }
                        ak.using.call(this, aB, ay)
                    }
                }
                ap.offset(y.extend(at, {
                    using: ax
                }))
            })
        }
        ;
        y.ui.position = {
            fit: {
                left: function(ae, ad) {
                    var ac = ad.within, ag = ac.isWindow ? ac.scrollLeft : ac.offset.left, ai = ac.width, af = ae.left - ad.collisionPosition.marginLeft, ah = ag - af, ab = af + ad.collisionWidth - ai - ag, aa;
                    if (ad.collisionWidth > ai) {
                        if (ah > 0 && ab <= 0) {
                            aa = ae.left + ah + ad.collisionWidth - ai - ag;
                            ae.left += ah - aa
                        } else {
                            if (ab > 0 && ah <= 0) {
                                ae.left = ag
                            } else {
                                if (ah > ab) {
                                    ae.left = ag + ai - ad.collisionWidth
                                } else {
                                    ae.left = ag
                                }
                            }
                        }
                    } else {
                        if (ah > 0) {
                            ae.left += ah
                        } else {
                            if (ab > 0) {
                                ae.left -= ab
                            } else {
                                ae.left = U(ae.left - af, ae.left)
                            }
                        }
                    }
                },
                top: function(ad, ac) {
                    var ab = ac.within, ah = ab.isWindow ? ab.scrollTop : ab.offset.top, ai = ac.within.height, af = ad.top - ac.collisionPosition.marginTop, ag = ah - af, ae = af + ac.collisionHeight - ai - ah, aa;
                    if (ac.collisionHeight > ai) {
                        if (ag > 0 && ae <= 0) {
                            aa = ad.top + ag + ac.collisionHeight - ai - ah;
                            ad.top += ag - aa
                        } else {
                            if (ae > 0 && ag <= 0) {
                                ad.top = ah
                            } else {
                                if (ag > ae) {
                                    ad.top = ah + ai - ac.collisionHeight
                                } else {
                                    ad.top = ah
                                }
                            }
                        }
                    } else {
                        if (ag > 0) {
                            ad.top += ag
                        } else {
                            if (ae > 0) {
                                ad.top -= ae
                            } else {
                                ad.top = U(ad.top - af, ad.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function(ag, af) {
                    var ae = af.within, ak = ae.offset.left + ae.scrollLeft, an = ae.width, ac = ae.isWindow ? ae.scrollLeft : ae.offset.left, ah = ag.left - af.collisionPosition.marginLeft, al = ah - ac, ab = ah + af.collisionWidth - an - ac, aj = af.my[0] === "left" ? -af.elemWidth : af.my[0] === "right" ? af.elemWidth : 0, am = af.at[0] === "left" ? af.targetWidth : af.at[0] === "right" ? -af.targetWidth : 0, ad = -2 * af.offset[0], aa, ai;
                    if (al < 0) {
                        aa = ag.left + aj + am + ad + af.collisionWidth - an - ak;
                        if (aa < 0 || aa < Z(al)) {
                            ag.left += aj + am + ad
                        }
                    } else {
                        if (ab > 0) {
                            ai = ag.left - af.collisionPosition.marginLeft + aj + am + ad - ac;
                            if (ai > 0 || Z(ai) < ab) {
                                ag.left += aj + am + ad
                            }
                        }
                    }
                },
                top: function(af, ae) {
                    var ad = ae.within, am = ad.offset.top + ad.scrollTop, an = ad.height, aa = ad.isWindow ? ad.scrollTop : ad.offset.top, ah = af.top - ae.collisionPosition.marginTop, aj = ah - aa, ag = ah + ae.collisionHeight - an - aa, ak = ae.my[1] === "top", ai = ak ? -ae.elemHeight : ae.my[1] === "bottom" ? ae.elemHeight : 0, ao = ae.at[1] === "top" ? ae.targetHeight : ae.at[1] === "bottom" ? -ae.targetHeight : 0, ac = -2 * ae.offset[1], al, ab;
                    if (aj < 0) {
                        ab = af.top + ai + ao + ac + ae.collisionHeight - an - am;
                        if ((af.top + ai + ao + ac) > aj && (ab < 0 || ab < Z(aj))) {
                            af.top += ai + ao + ac
                        }
                    } else {
                        if (ag > 0) {
                            al = af.top - ae.collisionPosition.marginTop + ai + ao + ac - aa;
                            if ((af.top + ai + ao + ac) > ag && (al > 0 || Z(al) < ag)) {
                                af.top += ai + ao + ac
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function() {
                    y.ui.position.flip.left.apply(this, arguments);
                    y.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    y.ui.position.flip.top.apply(this, arguments);
                    y.ui.position.fit.top.apply(this, arguments)
                }
            }
        };
        (function() {
            var ae, ag, ab, ad, ac, aa = document.getElementsByTagName("body")[0], af = document.createElement("div");
            ae = document.createElement(aa ? "div" : "body");
            ab = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (aa) {
                y.extend(ab, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                })
            }
            for (ac in ab) {
                ae.style[ac] = ab[ac]
            }
            ae.appendChild(af);
            ag = aa || document.documentElement;
            ag.insertBefore(ae, ag.firstChild);
            af.style.cssText = "position: absolute; left: 10.7432222px;";
            ad = y(af).offset().left;
            W = ad > 10 && ad < 11;
            ae.innerHTML = "";
            ag.removeChild(ae)
        }
        )()
    }
    )();
    var D = y.ui.position;
    /*!
 * jQuery UI Draggable 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */
    y.widget("ui.draggable", y.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            if (this.options.addClasses) {
                this.element.addClass("ui-draggable")
            }
            if (this.options.disabled) {
                this.element.addClass("ui-draggable-disabled")
            }
            this._setHandleClassName();
            this._mouseInit()
        },
        _setOption: function(M, N) {
            this._super(M, N);
            if (M === "handle") {
                this._setHandleClassName()
            }
        },
        _destroy: function() {
            if ((this.helper || this.element).is(".ui-draggable-dragging")) {
                this.destroyOnClear = true;
                return
            }
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._removeHandleClassName();
            this._mouseDestroy()
        },
        _mouseCapture: function(O) {
            var M = this.document[0]
              , P = this.options;
            try {
                if (M.activeElement && M.activeElement.nodeName.toLowerCase() !== "body") {
                    y(M.activeElement).blur()
                }
            } catch (N) {}
            if (this.helper || P.disabled || y(O.target).closest(".ui-resizable-handle").length > 0) {
                return false
            }
            this.handle = this._getHandle(O);
            if (!this.handle) {
                return false
            }
            y(P.iframeFix === true ? "iframe" : P.iframeFix).each(function() {
                y("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(y(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function(M) {
            var N = this.options;
            this.helper = this._createHelper(M);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            if (y.ui.ddmanager) {
                y.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offsetParent = this.helper.offsetParent();
            this.offsetParentCssPosition = this.offsetParent.css("position");
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.offset.scroll = false;
            y.extend(this.offset, {
                click: {
                    left: M.pageX - this.offset.left,
                    top: M.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(M, false);
            this.originalPageX = M.pageX;
            this.originalPageY = M.pageY;
            (N.cursorAt && this._adjustOffsetFromHelper(N.cursorAt));
            this._setContainment();
            if (this._trigger("start", M) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (y.ui.ddmanager && !N.dropBehaviour) {
                y.ui.ddmanager.prepareOffsets(this, M)
            }
            this._mouseDrag(M, true);
            if (y.ui.ddmanager) {
                y.ui.ddmanager.dragStart(this, M)
            }
            return true
        },
        _mouseDrag: function(M, O) {
            if (this.offsetParentCssPosition === "fixed") {
                this.offset.parent = this._getParentOffset()
            }
            this.position = this._generatePosition(M, true);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!O) {
                var N = this._uiHash();
                if (this._trigger("drag", M, N) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = N.position
            }
            this.helper[0].style.left = this.position.left + "px";
            this.helper[0].style.top = this.position.top + "px";
            if (y.ui.ddmanager) {
                y.ui.ddmanager.drag(this, M)
            }
            return false
        },
        _mouseStop: function(N) {
            var M = this
              , O = false;
            if (y.ui.ddmanager && !this.options.dropBehaviour) {
                O = y.ui.ddmanager.drop(this, N)
            }
            if (this.dropped) {
                O = this.dropped;
                this.dropped = false
            }
            if ((this.options.revert === "invalid" && !O) || (this.options.revert === "valid" && O) || this.options.revert === true || (y.isFunction(this.options.revert) && this.options.revert.call(this.element, O))) {
                y(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    if (M._trigger("stop", N) !== false) {
                        M._clear()
                    }
                })
            } else {
                if (this._trigger("stop", N) !== false) {
                    this._clear()
                }
            }
            return false
        },
        _mouseUp: function(M) {
            y("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            });
            if (y.ui.ddmanager) {
                y.ui.ddmanager.dragStop(this, M)
            }
            this.element.focus();
            return y.ui.mouse.prototype._mouseUp.call(this, M)
        },
        cancel: function() {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        },
        _getHandle: function(M) {
            return this.options.handle ? !!y(M.target).closest(this.element.find(this.options.handle)).length : true
        },
        _setHandleClassName: function() {
            this._removeHandleClassName();
            y(this.options.handle || this.element).addClass("ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this.element.find(".ui-draggable-handle").addBack().removeClass("ui-draggable-handle")
        },
        _createHelper: function(N) {
            var O = this.options
              , M = y.isFunction(O.helper) ? y(O.helper.apply(this.element[0], [N])) : (O.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!M.parents("body").length) {
                M.appendTo((O.appendTo === "parent" ? this.element[0].parentNode : O.appendTo))
            }
            if (M[0] !== this.element[0] && !(/(fixed|absolute)/).test(M.css("position"))) {
                M.css("position", "absolute")
            }
            return M
        },
        _adjustOffsetFromHelper: function(M) {
            if (typeof M === "string") {
                M = M.split(" ")
            }
            if (y.isArray(M)) {
                M = {
                    left: +M[0],
                    top: +M[1] || 0
                }
            }
            if ("left"in M) {
                this.offset.click.left = M.left + this.margins.left
            }
            if ("right"in M) {
                this.offset.click.left = this.helperProportions.width - M.right + this.margins.left
            }
            if ("top"in M) {
                this.offset.click.top = M.top + this.margins.top
            }
            if ("bottom"in M) {
                this.offset.click.top = this.helperProportions.height - M.bottom + this.margins.top
            }
        },
        _isRootNode: function(M) {
            return (/(html|body)/i).test(M.tagName) || M === this.document[0]
        },
        _getParentOffset: function() {
            var N = this.offsetParent.offset()
              , M = this.document[0];
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== M && y.contains(this.scrollParent[0], this.offsetParent[0])) {
                N.left += this.scrollParent.scrollLeft();
                N.top += this.scrollParent.scrollTop()
            }
            if (this._isRootNode(this.offsetParent[0])) {
                N = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: N.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: N.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition !== "relative") {
                return {
                    top: 0,
                    left: 0
                }
            }
            var M = this.element.position()
              , N = this._isRootNode(this.scrollParent[0]);
            return {
                top: M.top - (parseInt(this.helper.css("top"), 10) || 0) + (!N ? this.scrollParent.scrollTop() : 0),
                left: M.left - (parseInt(this.helper.css("left"), 10) || 0) + (!N ? this.scrollParent.scrollLeft() : 0)
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var O, Q, N, P = this.options, M = this.document[0];
            this.relative_container = null;
            if (!P.containment) {
                this.containment = null;
                return
            }
            if (P.containment === "window") {
                this.containment = [y(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, y(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, y(window).scrollLeft() + y(window).width() - this.helperProportions.width - this.margins.left, y(window).scrollTop() + (y(window).height() || M.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (P.containment === "document") {
                this.containment = [0, 0, y(M).width() - this.helperProportions.width - this.margins.left, (y(M).height() || M.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                return
            }
            if (P.containment.constructor === Array) {
                this.containment = P.containment;
                return
            }
            if (P.containment === "parent") {
                P.containment = this.helper[0].parentNode
            }
            Q = y(P.containment);
            N = Q[0];
            if (!N) {
                return
            }
            O = Q.css("overflow") !== "hidden";
            this.containment = [(parseInt(Q.css("borderLeftWidth"), 10) || 0) + (parseInt(Q.css("paddingLeft"), 10) || 0), (parseInt(Q.css("borderTopWidth"), 10) || 0) + (parseInt(Q.css("paddingTop"), 10) || 0), (O ? Math.max(N.scrollWidth, N.offsetWidth) : N.offsetWidth) - (parseInt(Q.css("borderRightWidth"), 10) || 0) - (parseInt(Q.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (O ? Math.max(N.scrollHeight, N.offsetHeight) : N.offsetHeight) - (parseInt(Q.css("borderBottomWidth"), 10) || 0) - (parseInt(Q.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
            this.relative_container = Q
        },
        _convertPositionTo: function(N, P) {
            if (!P) {
                P = this.position
            }
            var M = N === "absolute" ? 1 : -1
              , O = this._isRootNode(this.scrollParent[0]);
            return {
                top: (P.top + this.offset.relative.top * M + this.offset.parent.top * M - ((this.cssPosition === "fixed" ? -this.offset.scroll.top : (O ? 0 : this.offset.scroll.top)) * M)),
                left: (P.left + this.offset.relative.left * M + this.offset.parent.left * M - ((this.cssPosition === "fixed" ? -this.offset.scroll.left : (O ? 0 : this.offset.scroll.left)) * M))
            }
        },
        _generatePosition: function(N, T) {
            var M, U, V, P, O = this.options, S = this._isRootNode(this.scrollParent[0]), R = N.pageX, Q = N.pageY;
            if (!S || !this.offset.scroll) {
                this.offset.scroll = {
                    top: this.scrollParent.scrollTop(),
                    left: this.scrollParent.scrollLeft()
                }
            }
            if (T) {
                if (this.containment) {
                    if (this.relative_container) {
                        U = this.relative_container.offset();
                        M = [this.containment[0] + U.left, this.containment[1] + U.top, this.containment[2] + U.left, this.containment[3] + U.top]
                    } else {
                        M = this.containment
                    }
                    if (N.pageX - this.offset.click.left < M[0]) {
                        R = M[0] + this.offset.click.left
                    }
                    if (N.pageY - this.offset.click.top < M[1]) {
                        Q = M[1] + this.offset.click.top
                    }
                    if (N.pageX - this.offset.click.left > M[2]) {
                        R = M[2] + this.offset.click.left
                    }
                    if (N.pageY - this.offset.click.top > M[3]) {
                        Q = M[3] + this.offset.click.top
                    }
                }
                if (O.grid) {
                    V = O.grid[1] ? this.originalPageY + Math.round((Q - this.originalPageY) / O.grid[1]) * O.grid[1] : this.originalPageY;
                    Q = M ? ((V - this.offset.click.top >= M[1] || V - this.offset.click.top > M[3]) ? V : ((V - this.offset.click.top >= M[1]) ? V - O.grid[1] : V + O.grid[1])) : V;
                    P = O.grid[0] ? this.originalPageX + Math.round((R - this.originalPageX) / O.grid[0]) * O.grid[0] : this.originalPageX;
                    R = M ? ((P - this.offset.click.left >= M[0] || P - this.offset.click.left > M[2]) ? P : ((P - this.offset.click.left >= M[0]) ? P - O.grid[0] : P + O.grid[0])) : P
                }
                if (O.axis === "y") {
                    R = this.originalPageX
                }
                if (O.axis === "x") {
                    Q = this.originalPageY
                }
            }
            return {
                top: (Q - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.offset.scroll.top : (S ? 0 : this.offset.scroll.top))),
                left: (R - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.offset.scroll.left : (S ? 0 : this.offset.scroll.left)))
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false;
            if (this.destroyOnClear) {
                this.destroy()
            }
        },
        _trigger: function(M, N, O) {
            O = O || this._uiHash();
            y.ui.plugin.call(this, M, [N, O, this], true);
            if (M === "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return y.Widget.prototype._trigger.call(this, M, N, O)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    y.ui.plugin.add("draggable", "connectToSortable", {
        start: function(N, P, O) {
            var Q = O.options
              , M = y.extend({}, P, {
                item: O.element
            });
            O.sortables = [];
            y(Q.connectToSortable).each(function() {
                var R = y(this).sortable("instance");
                if (R && !R.options.disabled) {
                    O.sortables.push({
                        instance: R,
                        shouldRevert: R.options.revert
                    });
                    R.refreshPositions();
                    R._trigger("activate", N, M)
                }
            })
        },
        stop: function(N, P, O) {
            var M = y.extend({}, P, {
                item: O.element
            });
            y.each(O.sortables, function() {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    O.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = this.shouldRevert
                    }
                    this.instance._mouseStop(N);
                    this.instance.options.helper = this.instance.options._helper;
                    if (O.options.helper === "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", N, M)
                }
            })
        },
        drag: function(N, P, O) {
            var M = this;
            y.each(O.sortables, function() {
                var Q = false
                  , R = this;
                this.instance.positionAbs = O.positionAbs;
                this.instance.helperProportions = O.helperProportions;
                this.instance.offset.click = O.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    Q = true;
                    y.each(O.sortables, function() {
                        this.instance.positionAbs = O.positionAbs;
                        this.instance.helperProportions = O.helperProportions;
                        this.instance.offset.click = O.offset.click;
                        if (this !== R && this.instance._intersectsWith(this.instance.containerCache) && y.contains(R.instance.element[0], this.instance.element[0])) {
                            Q = false
                        }
                        return Q
                    })
                }
                if (Q) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = y(M).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function() {
                            return P.helper[0]
                        }
                        ;
                        N.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(N, true);
                        this.instance._mouseStart(N, true, true);
                        this.instance.offset.click.top = O.offset.click.top;
                        this.instance.offset.click.left = O.offset.click.left;
                        this.instance.offset.parent.left -= O.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= O.offset.parent.top - this.instance.offset.parent.top;
                        O._trigger("toSortable", N);
                        O.dropped = this.instance.element;
                        O.currentItem = O.element;
                        this.instance.fromOutside = O
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(N)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", N, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(N, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        O._trigger("fromSortable", N);
                        O.dropped = false
                    }
                }
            })
        }
    });
    y.ui.plugin.add("draggable", "cursor", {
        start: function(O, P, M) {
            var N = y("body")
              , Q = M.options;
            if (N.css("cursor")) {
                Q._cursor = N.css("cursor")
            }
            N.css("cursor", Q.cursor)
        },
        stop: function(N, O, M) {
            var P = M.options;
            if (P._cursor) {
                y("body").css("cursor", P._cursor)
            }
        }
    });
    y.ui.plugin.add("draggable", "opacity", {
        start: function(O, P, M) {
            var N = y(P.helper)
              , Q = M.options;
            if (N.css("opacity")) {
                Q._opacity = N.css("opacity")
            }
            N.css("opacity", Q.opacity)
        },
        stop: function(N, O, M) {
            var P = M.options;
            if (P._opacity) {
                y(O.helper).css("opacity", P._opacity)
            }
        }
    });
    y.ui.plugin.add("draggable", "scroll", {
        start: function(N, O, M) {
            if (M.scrollParent[0] !== M.document[0] && M.scrollParent[0].tagName !== "HTML") {
                M.overflowOffset = M.scrollParent.offset()
            }
        },
        drag: function(P, Q, O) {
            var R = O.options
              , N = false
              , M = O.document[0];
            if (O.scrollParent[0] !== M && O.scrollParent[0].tagName !== "HTML") {
                if (!R.axis || R.axis !== "x") {
                    if ((O.overflowOffset.top + O.scrollParent[0].offsetHeight) - P.pageY < R.scrollSensitivity) {
                        O.scrollParent[0].scrollTop = N = O.scrollParent[0].scrollTop + R.scrollSpeed
                    } else {
                        if (P.pageY - O.overflowOffset.top < R.scrollSensitivity) {
                            O.scrollParent[0].scrollTop = N = O.scrollParent[0].scrollTop - R.scrollSpeed
                        }
                    }
                }
                if (!R.axis || R.axis !== "y") {
                    if ((O.overflowOffset.left + O.scrollParent[0].offsetWidth) - P.pageX < R.scrollSensitivity) {
                        O.scrollParent[0].scrollLeft = N = O.scrollParent[0].scrollLeft + R.scrollSpeed
                    } else {
                        if (P.pageX - O.overflowOffset.left < R.scrollSensitivity) {
                            O.scrollParent[0].scrollLeft = N = O.scrollParent[0].scrollLeft - R.scrollSpeed
                        }
                    }
                }
            } else {
                if (!R.axis || R.axis !== "x") {
                    if (P.pageY - y(M).scrollTop() < R.scrollSensitivity) {
                        N = y(M).scrollTop(y(M).scrollTop() - R.scrollSpeed)
                    } else {
                        if (y(window).height() - (P.pageY - y(M).scrollTop()) < R.scrollSensitivity) {
                            N = y(M).scrollTop(y(M).scrollTop() + R.scrollSpeed)
                        }
                    }
                }
                if (!R.axis || R.axis !== "y") {
                    if (P.pageX - y(M).scrollLeft() < R.scrollSensitivity) {
                        N = y(M).scrollLeft(y(M).scrollLeft() - R.scrollSpeed)
                    } else {
                        if (y(window).width() - (P.pageX - y(M).scrollLeft()) < R.scrollSensitivity) {
                            N = y(M).scrollLeft(y(M).scrollLeft() + R.scrollSpeed)
                        }
                    }
                }
            }
            if (N !== false && y.ui.ddmanager && !R.dropBehaviour) {
                y.ui.ddmanager.prepareOffsets(O, P)
            }
        }
    });
    y.ui.plugin.add("draggable", "snap", {
        start: function(N, O, M) {
            var P = M.options;
            M.snapElements = [];
            y(P.snap.constructor !== String ? (P.snap.items || ":data(ui-draggable)") : P.snap).each(function() {
                var R = y(this)
                  , Q = R.offset();
                if (this !== M.element[0]) {
                    M.snapElements.push({
                        item: this,
                        width: R.outerWidth(),
                        height: R.outerHeight(),
                        top: Q.top,
                        left: Q.left
                    })
                }
            })
        },
        drag: function(Y, V, P) {
            var M, ad, R, S, X, U, T, ae, Z, Q, W = P.options, ac = W.snapTolerance, ab = V.offset.left, aa = ab + P.helperProportions.width, O = V.offset.top, N = O + P.helperProportions.height;
            for (Z = P.snapElements.length - 1; Z >= 0; Z--) {
                X = P.snapElements[Z].left;
                U = X + P.snapElements[Z].width;
                T = P.snapElements[Z].top;
                ae = T + P.snapElements[Z].height;
                if (aa < X - ac || ab > U + ac || N < T - ac || O > ae + ac || !y.contains(P.snapElements[Z].item.ownerDocument, P.snapElements[Z].item)) {
                    if (P.snapElements[Z].snapping) {
                        (P.options.snap.release && P.options.snap.release.call(P.element, Y, y.extend(P._uiHash(), {
                            snapItem: P.snapElements[Z].item
                        })))
                    }
                    P.snapElements[Z].snapping = false;
                    continue
                }
                if (W.snapMode !== "inner") {
                    M = Math.abs(T - N) <= ac;
                    ad = Math.abs(ae - O) <= ac;
                    R = Math.abs(X - aa) <= ac;
                    S = Math.abs(U - ab) <= ac;
                    if (M) {
                        V.position.top = P._convertPositionTo("relative", {
                            top: T - P.helperProportions.height,
                            left: 0
                        }).top - P.margins.top
                    }
                    if (ad) {
                        V.position.top = P._convertPositionTo("relative", {
                            top: ae,
                            left: 0
                        }).top - P.margins.top
                    }
                    if (R) {
                        V.position.left = P._convertPositionTo("relative", {
                            top: 0,
                            left: X - P.helperProportions.width
                        }).left - P.margins.left
                    }
                    if (S) {
                        V.position.left = P._convertPositionTo("relative", {
                            top: 0,
                            left: U
                        }).left - P.margins.left
                    }
                }
                Q = (M || ad || R || S);
                if (W.snapMode !== "outer") {
                    M = Math.abs(T - O) <= ac;
                    ad = Math.abs(ae - N) <= ac;
                    R = Math.abs(X - ab) <= ac;
                    S = Math.abs(U - aa) <= ac;
                    if (M) {
                        V.position.top = P._convertPositionTo("relative", {
                            top: T,
                            left: 0
                        }).top - P.margins.top
                    }
                    if (ad) {
                        V.position.top = P._convertPositionTo("relative", {
                            top: ae - P.helperProportions.height,
                            left: 0
                        }).top - P.margins.top
                    }
                    if (R) {
                        V.position.left = P._convertPositionTo("relative", {
                            top: 0,
                            left: X
                        }).left - P.margins.left
                    }
                    if (S) {
                        V.position.left = P._convertPositionTo("relative", {
                            top: 0,
                            left: U - P.helperProportions.width
                        }).left - P.margins.left
                    }
                }
                if (!P.snapElements[Z].snapping && (M || ad || R || S || Q)) {
                    (P.options.snap.snap && P.options.snap.snap.call(P.element, Y, y.extend(P._uiHash(), {
                        snapItem: P.snapElements[Z].item
                    })))
                }
                P.snapElements[Z].snapping = (M || ad || R || S || Q)
            }
        }
    });
    y.ui.plugin.add("draggable", "stack", {
        start: function(O, P, M) {
            var N, R = M.options, Q = y.makeArray(y(R.stack)).sort(function(T, S) {
                return (parseInt(y(T).css("zIndex"), 10) || 0) - (parseInt(y(S).css("zIndex"), 10) || 0)
            });
            if (!Q.length) {
                return
            }
            N = parseInt(y(Q[0]).css("zIndex"), 10) || 0;
            y(Q).each(function(S) {
                y(this).css("zIndex", N + S)
            });
            this.css("zIndex", (N + Q.length))
        }
    });
    y.ui.plugin.add("draggable", "zIndex", {
        start: function(O, P, M) {
            var N = y(P.helper)
              , Q = M.options;
            if (N.css("zIndex")) {
                Q._zIndex = N.css("zIndex")
            }
            N.css("zIndex", Q.zIndex)
        },
        stop: function(N, O, M) {
            var P = M.options;
            if (P._zIndex) {
                y(O.helper).css("zIndex", P._zIndex)
            }
        }
    });
    var I = y.ui.draggable;
    /*!
 * jQuery UI Droppable 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/droppable/
 */
    y.widget("ui.droppable", {
        version: "1.11.0",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var N, O = this.options, M = O.accept;
            this.isover = false;
            this.isout = true;
            this.accept = y.isFunction(M) ? M : function(P) {
                return P.is(M)
            }
            ;
            this.proportions = function() {
                if (arguments.length) {
                    N = arguments[0]
                } else {
                    return N ? N : N = {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    }
                }
            }
            ;
            this._addToManager(O.scope);
            O.addClasses && this.element.addClass("ui-droppable")
        },
        _addToManager: function(M) {
            y.ui.ddmanager.droppables[M] = y.ui.ddmanager.droppables[M] || [];
            y.ui.ddmanager.droppables[M].push(this)
        },
        _splice: function(M) {
            var N = 0;
            for (; N < M.length; N++) {
                if (M[N] === this) {
                    M.splice(N, 1)
                }
            }
        },
        _destroy: function() {
            var M = y.ui.ddmanager.droppables[this.options.scope];
            this._splice(M);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(N, O) {
            if (N === "accept") {
                this.accept = y.isFunction(O) ? O : function(P) {
                    return P.is(O)
                }
            } else {
                if (N === "scope") {
                    var M = y.ui.ddmanager.droppables[this.options.scope];
                    this._splice(M);
                    this._addToManager(O)
                }
            }
            this._super(N, O)
        },
        _activate: function(N) {
            var M = y.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }
            if (M) {
                this._trigger("activate", N, this.ui(M))
            }
        },
        _deactivate: function(N) {
            var M = y.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }
            if (M) {
                this._trigger("deactivate", N, this.ui(M))
            }
        },
        _over: function(N) {
            var M = y.ui.ddmanager.current;
            if (!M || (M.currentItem || M.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (M.currentItem || M.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", N, this.ui(M))
            }
        },
        _out: function(N) {
            var M = y.ui.ddmanager.current;
            if (!M || (M.currentItem || M.element)[0] === this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (M.currentItem || M.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", N, this.ui(M))
            }
        },
        _drop: function(N, O) {
            var M = O || y.ui.ddmanager.current
              , P = false;
            if (!M || (M.currentItem || M.element)[0] === this.element[0]) {
                return false
            }
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var Q = y(this).droppable("instance");
                if (Q.options.greedy && !Q.options.disabled && Q.options.scope === M.options.scope && Q.accept.call(Q.element[0], (M.currentItem || M.element)) && y.ui.intersect(M, y.extend(Q, {
                    offset: Q.element.offset()
                }), Q.options.tolerance)) {
                    P = true;
                    return false
                }
            });
            if (P) {
                return false
            }
            if (this.accept.call(this.element[0], (M.currentItem || M.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", N, this.ui(M));
                return this.element
            }
            return false
        },
        ui: function(M) {
            return {
                draggable: (M.currentItem || M.element),
                helper: M.helper,
                position: M.position,
                offset: M.positionAbs
            }
        }
    });
    y.ui.intersect = (function() {
        function M(O, N, P) {
            return (O >= N) && (O < (N + P))
        }
        return function(Z, T, X) {
            if (!T.offset) {
                return false
            }
            var R, S, P = (Z.positionAbs || Z.position.absolute).left, W = (Z.positionAbs || Z.position.absolute).top, O = P + Z.helperProportions.width, V = W + Z.helperProportions.height, Q = T.offset.left, Y = T.offset.top, N = Q + T.proportions().width, U = Y + T.proportions().height;
            switch (X) {
            case "fit":
                return (Q <= P && O <= N && Y <= W && V <= U);
            case "intersect":
                return (Q < P + (Z.helperProportions.width / 2) && O - (Z.helperProportions.width / 2) < N && Y < W + (Z.helperProportions.height / 2) && V - (Z.helperProportions.height / 2) < U);
            case "pointer":
                R = ((Z.positionAbs || Z.position.absolute).left + (Z.clickOffset || Z.offset.click).left);
                S = ((Z.positionAbs || Z.position.absolute).top + (Z.clickOffset || Z.offset.click).top);
                return M(S, Y, T.proportions().height) && M(R, Q, T.proportions().width);
            case "touch":
                return ((W >= Y && W <= U) || (V >= Y && V <= U) || (W < Y && V > U)) && ((P >= Q && P <= N) || (O >= Q && O <= N) || (P < Q && O > N));
            default:
                return false
            }
        }
    }
    )();
    y.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(P, R) {
            var O, N, M = y.ui.ddmanager.droppables[P.options.scope] || [], Q = R ? R.type : null, S = (P.currentItem || P.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (O = 0; O < M.length; O++) {
                if (M[O].options.disabled || (P && !M[O].accept.call(M[O].element[0], (P.currentItem || P.element)))) {
                    continue
                }
                for (N = 0; N < S.length; N++) {
                    if (S[N] === M[O].element[0]) {
                        M[O].proportions().height = 0;
                        continue droppablesLoop
                    }
                }
                M[O].visible = M[O].element.css("display") !== "none";
                if (!M[O].visible) {
                    continue
                }
                if (Q === "mousedown") {
                    M[O]._activate.call(M[O], R)
                }
                M[O].offset = M[O].element.offset();
                M[O].proportions({
                    width: M[O].element[0].offsetWidth,
                    height: M[O].element[0].offsetHeight
                })
            }
        },
        drop: function(M, N) {
            var O = false;
            y.each((y.ui.ddmanager.droppables[M.options.scope] || []).slice(), function() {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && y.ui.intersect(M, this, this.options.tolerance)) {
                    O = this._drop.call(this, N) || O
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (M.currentItem || M.element))) {
                    this.isout = true;
                    this.isover = false;
                    this._deactivate.call(this, N)
                }
            });
            return O
        },
        dragStart: function(M, N) {
            M.element.parentsUntil("body").bind("scroll.droppable", function() {
                if (!M.options.refreshPositions) {
                    y.ui.ddmanager.prepareOffsets(M, N)
                }
            })
        },
        drag: function(M, N) {
            if (M.options.refreshPositions) {
                y.ui.ddmanager.prepareOffsets(M, N)
            }
            y.each(y.ui.ddmanager.droppables[M.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var R, P, O, Q = y.ui.intersect(M, this, this.options.tolerance), S = !Q && this.isover ? "isout" : (Q && !this.isover ? "isover" : null);
                if (!S) {
                    return
                }
                if (this.options.greedy) {
                    P = this.options.scope;
                    O = this.element.parents(":data(ui-droppable)").filter(function() {
                        return y(this).droppable("instance").options.scope === P
                    });
                    if (O.length) {
                        R = y(O[0]).droppable("instance");
                        R.greedyChild = (S === "isover")
                    }
                }
                if (R && S === "isover") {
                    R.isover = false;
                    R.isout = true;
                    R._out.call(R, N)
                }
                this[S] = true;
                this[S === "isout" ? "isover" : "isout"] = false;
                this[S === "isover" ? "_over" : "_out"].call(this, N);
                if (R && S === "isout") {
                    R.isout = false;
                    R.isover = true;
                    R._over.call(R, N)
                }
            })
        },
        dragStop: function(M, N) {
            M.element.parentsUntil("body").unbind("scroll.droppable");
            if (!M.options.refreshPositions) {
                y.ui.ddmanager.prepareOffsets(M, N)
            }
        }
    };
    var c = y.ui.droppable;
    /*!
 * jQuery UI Resizable 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */
    y.widget("ui.resizable", y.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(M) {
            return parseInt(M, 10) || 0
        },
        _isNumber: function(M) {
            return !isNaN(parseInt(M, 10))
        },
        _hasScroll: function(P, N) {
            if (y(P).css("overflow") === "hidden") {
                return false
            }
            var M = (N && N === "left") ? "scrollLeft" : "scrollTop"
              , O = false;
            if (P[M] > 0) {
                return true
            }
            P[M] = 1;
            O = (P[M] > 0);
            P[M] = 0;
            return O
        },
        _create: function() {
            var S, N, Q, O, M, P = this, R = this.options;
            this.element.addClass("ui-resizable");
            y.extend(this, {
                _aspectRatio: !!(R.aspectRatio),
                aspectRatio: R.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: R.helper || R.ghost || R.animate ? R.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(y("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = R.handles || (!y(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                if (this.handles === "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                S = this.handles.split(",");
                this.handles = {};
                for (N = 0; N < S.length; N++) {
                    Q = y.trim(S[N]);
                    M = "ui-resizable-" + Q;
                    O = y("<div class='ui-resizable-handle " + M + "'></div>");
                    O.css({
                        zIndex: R.zIndex
                    });
                    if ("se" === Q) {
                        O.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[Q] = ".ui-resizable-" + Q;
                    this.element.append(O)
                }
            }
            this._renderAxis = function(X) {
                var U, V, T, W;
                X = X || this.element;
                for (U in this.handles) {
                    if (this.handles[U].constructor === String) {
                        this.handles[U] = this.element.children(this.handles[U]).first().show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        V = y(this.handles[U], this.element);
                        W = /sw|ne|nw|se|n|s/.test(U) ? V.outerHeight() : V.outerWidth();
                        T = ["padding", /ne|nw|n/.test(U) ? "Top" : /se|sw|s/.test(U) ? "Bottom" : /^e$/.test(U) ? "Right" : "Left"].join("");
                        X.css(T, W);
                        this._proportionallyResize()
                    }
                    if (!y(this.handles[U]).length) {
                        continue
                    }
                }
            }
            ;
            this._renderAxis(this.element);
            this._handles = y(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                if (!P.resizing) {
                    if (this.className) {
                        O = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    P.axis = O && O[1] ? O[1] : "se"
                }
            });
            if (R.autoHide) {
                this._handles.hide();
                y(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                    if (R.disabled) {
                        return
                    }
                    y(this).removeClass("ui-resizable-autohide");
                    P._handles.show()
                }).mouseleave(function() {
                    if (R.disabled) {
                        return
                    }
                    if (!P.resizing) {
                        y(this).addClass("ui-resizable-autohide");
                        P._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var N, M = function(O) {
                y(O).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                M(this.element);
                N = this.element;
                this.originalElement.css({
                    position: N.css("position"),
                    width: N.outerWidth(),
                    height: N.outerHeight(),
                    top: N.css("top"),
                    left: N.css("left")
                }).insertAfter(N);
                N.remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            M(this.originalElement);
            return this
        },
        _mouseCapture: function(O) {
            var N, P, M = false;
            for (N in this.handles) {
                P = y(this.handles[N])[0];
                if (P === O.target || y.contains(P, O.target)) {
                    M = true
                }
            }
            return !this.options.disabled && M
        },
        _mouseStart: function(N) {
            var R, O, Q, P = this.options, M = this.element;
            this.resizing = true;
            this._renderProxy();
            R = this._num(this.helper.css("left"));
            O = this._num(this.helper.css("top"));
            if (P.containment) {
                R += y(P.containment).scrollLeft() || 0;
                O += y(P.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: R,
                top: O
            };
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: M.width(),
                height: M.height()
            };
            this.originalSize = this._helper ? {
                width: M.outerWidth(),
                height: M.outerHeight()
            } : {
                width: M.width(),
                height: M.height()
            };
            this.originalPosition = {
                left: R,
                top: O
            };
            this.sizeDiff = {
                width: M.outerWidth() - M.width(),
                height: M.outerHeight() - M.height()
            };
            this.originalMousePosition = {
                left: N.pageX,
                top: N.pageY
            };
            this.aspectRatio = (typeof P.aspectRatio === "number") ? P.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            Q = y(".ui-resizable-" + this.axis).css("cursor");
            y("body").css("cursor", Q === "auto" ? this.axis + "-resize" : Q);
            M.addClass("ui-resizable-resizing");
            this._propagate("start", N);
            return true
        },
        _mouseDrag: function(M) {
            var Q, N = this.helper, R = {}, P = this.originalMousePosition, S = this.axis, U = (M.pageX - P.left) || 0, T = (M.pageY - P.top) || 0, O = this._change[S];
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            };
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            };
            if (!O) {
                return false
            }
            Q = O.apply(this, [M, U, T]);
            this._updateVirtualBoundaries(M.shiftKey);
            if (this._aspectRatio || M.shiftKey) {
                Q = this._updateRatio(Q, M)
            }
            Q = this._respectSize(Q, M);
            this._updateCache(Q);
            this._propagate("resize", M);
            if (this.position.top !== this.prevPosition.top) {
                R.top = this.position.top + "px"
            }
            if (this.position.left !== this.prevPosition.left) {
                R.left = this.position.left + "px"
            }
            if (this.size.width !== this.prevSize.width) {
                R.width = this.size.width + "px"
            }
            if (this.size.height !== this.prevSize.height) {
                R.height = this.size.height + "px"
            }
            N.css(R);
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            if (!y.isEmptyObject(R)) {
                this._trigger("resize", M, this.ui())
            }
            return false
        },
        _mouseStop: function(P) {
            this.resizing = false;
            var O, M, N, S, V, R, U, Q = this.options, T = this;
            if (this._helper) {
                O = this._proportionallyResizeElements;
                M = O.length && (/textarea/i).test(O[0].nodeName);
                N = M && this._hasScroll(O[0], "left") ? 0 : T.sizeDiff.height;
                S = M ? 0 : T.sizeDiff.width;
                V = {
                    width: (T.helper.width() - S),
                    height: (T.helper.height() - N)
                };
                R = (parseInt(T.element.css("left"), 10) + (T.position.left - T.originalPosition.left)) || null;
                U = (parseInt(T.element.css("top"), 10) + (T.position.top - T.originalPosition.top)) || null;
                if (!Q.animate) {
                    this.element.css(y.extend(V, {
                        top: U,
                        left: R
                    }))
                }
                T.helper.height(T.size.height);
                T.helper.width(T.size.width);
                if (this._helper && !Q.animate) {
                    this._proportionallyResize()
                }
            }
            y("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", P);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        },
        _updateVirtualBoundaries: function(O) {
            var Q, P, N, S, M, R = this.options;
            M = {
                minWidth: this._isNumber(R.minWidth) ? R.minWidth : 0,
                maxWidth: this._isNumber(R.maxWidth) ? R.maxWidth : Infinity,
                minHeight: this._isNumber(R.minHeight) ? R.minHeight : 0,
                maxHeight: this._isNumber(R.maxHeight) ? R.maxHeight : Infinity
            };
            if (this._aspectRatio || O) {
                Q = M.minHeight * this.aspectRatio;
                N = M.minWidth / this.aspectRatio;
                P = M.maxHeight * this.aspectRatio;
                S = M.maxWidth / this.aspectRatio;
                if (Q > M.minWidth) {
                    M.minWidth = Q
                }
                if (N > M.minHeight) {
                    M.minHeight = N
                }
                if (P < M.maxWidth) {
                    M.maxWidth = P
                }
                if (S < M.maxHeight) {
                    M.maxHeight = S
                }
            }
            this._vBoundaries = M
        },
        _updateCache: function(M) {
            this.offset = this.helper.offset();
            if (this._isNumber(M.left)) {
                this.position.left = M.left
            }
            if (this._isNumber(M.top)) {
                this.position.top = M.top
            }
            if (this._isNumber(M.height)) {
                this.size.height = M.height
            }
            if (this._isNumber(M.width)) {
                this.size.width = M.width
            }
        },
        _updateRatio: function(O) {
            var P = this.position
              , N = this.size
              , M = this.axis;
            if (this._isNumber(O.height)) {
                O.width = (O.height * this.aspectRatio)
            } else {
                if (this._isNumber(O.width)) {
                    O.height = (O.width / this.aspectRatio)
                }
            }
            if (M === "sw") {
                O.left = P.left + (N.width - O.width);
                O.top = null
            }
            if (M === "nw") {
                O.top = P.top + (N.height - O.height);
                O.left = P.left + (N.width - O.width)
            }
            return O
        },
        _respectSize: function(R) {
            var O = this._vBoundaries
              , U = this.axis
              , W = this._isNumber(R.width) && O.maxWidth && (O.maxWidth < R.width)
              , S = this._isNumber(R.height) && O.maxHeight && (O.maxHeight < R.height)
              , P = this._isNumber(R.width) && O.minWidth && (O.minWidth > R.width)
              , V = this._isNumber(R.height) && O.minHeight && (O.minHeight > R.height)
              , N = this.originalPosition.left + this.originalSize.width
              , T = this.position.top + this.size.height
              , Q = /sw|nw|w/.test(U)
              , M = /nw|ne|n/.test(U);
            if (P) {
                R.width = O.minWidth
            }
            if (V) {
                R.height = O.minHeight
            }
            if (W) {
                R.width = O.maxWidth
            }
            if (S) {
                R.height = O.maxHeight
            }
            if (P && Q) {
                R.left = N - O.minWidth
            }
            if (W && Q) {
                R.left = N - O.maxWidth
            }
            if (V && M) {
                R.top = T - O.minHeight
            }
            if (S && M) {
                R.top = T - O.maxHeight
            }
            if (!R.width && !R.height && !R.left && R.top) {
                R.top = null
            } else {
                if (!R.width && !R.height && !R.top && R.left) {
                    R.left = null
                }
            }
            return R
        },
        _proportionallyResize: function() {
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var P, N, R, M, Q, O = this.helper || this.element;
            for (P = 0; P < this._proportionallyResizeElements.length; P++) {
                Q = this._proportionallyResizeElements[P];
                if (!this.borderDif) {
                    this.borderDif = [];
                    R = [Q.css("borderTopWidth"), Q.css("borderRightWidth"), Q.css("borderBottomWidth"), Q.css("borderLeftWidth")];
                    M = [Q.css("paddingTop"), Q.css("paddingRight"), Q.css("paddingBottom"), Q.css("paddingLeft")];
                    for (N = 0; N < R.length; N++) {
                        this.borderDif[N] = (parseInt(R[N], 10) || 0) + (parseInt(M[N], 10) || 0)
                    }
                }
                Q.css({
                    height: (O.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (O.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        },
        _renderProxy: function() {
            var M = this.element
              , N = this.options;
            this.elementOffset = M.offset();
            if (this._helper) {
                this.helper = this.helper || y("<div style='overflow:hidden;'></div>");
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++N.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function(N, M) {
                return {
                    width: this.originalSize.width + M
                }
            },
            w: function(O, M) {
                var N = this.originalSize
                  , P = this.originalPosition;
                return {
                    left: P.left + M,
                    width: N.width - M
                }
            },
            n: function(P, N, M) {
                var O = this.originalSize
                  , Q = this.originalPosition;
                return {
                    top: Q.top + M,
                    height: O.height - M
                }
            },
            s: function(O, N, M) {
                return {
                    height: this.originalSize.height + M
                }
            },
            se: function(O, N, M) {
                return y.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [O, N, M]))
            },
            sw: function(O, N, M) {
                return y.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [O, N, M]))
            },
            ne: function(O, N, M) {
                return y.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [O, N, M]))
            },
            nw: function(O, N, M) {
                return y.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [O, N, M]))
            }
        },
        _propagate: function(N, M) {
            y.ui.plugin.call(this, N, [M, this.ui()]);
            (N !== "resize" && this._trigger(N, M, this.ui()))
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition,
                prevSize: this.prevSize,
                prevPosition: this.prevPosition
            }
        }
    });
    y.ui.plugin.add("resizable", "animate", {
        stop: function(P) {
            var U = y(this).resizable("instance")
              , R = U.options
              , O = U._proportionallyResizeElements
              , M = O.length && (/textarea/i).test(O[0].nodeName)
              , N = M && U._hasScroll(O[0], "left") ? 0 : U.sizeDiff.height
              , T = M ? 0 : U.sizeDiff.width
              , Q = {
                width: (U.size.width - T),
                height: (U.size.height - N)
            }
              , S = (parseInt(U.element.css("left"), 10) + (U.position.left - U.originalPosition.left)) || null
              , V = (parseInt(U.element.css("top"), 10) + (U.position.top - U.originalPosition.top)) || null;
            U.element.animate(y.extend(Q, V && S ? {
                top: V,
                left: S
            } : {}), {
                duration: R.animateDuration,
                easing: R.animateEasing,
                step: function() {
                    var W = {
                        width: parseInt(U.element.css("width"), 10),
                        height: parseInt(U.element.css("height"), 10),
                        top: parseInt(U.element.css("top"), 10),
                        left: parseInt(U.element.css("left"), 10)
                    };
                    if (O && O.length) {
                        y(O[0]).css({
                            width: W.width,
                            height: W.height
                        })
                    }
                    U._updateCache(W);
                    U._propagate("resize", P)
                }
            })
        }
    });
    y.ui.plugin.add("resizable", "containment", {
        start: function() {
            var U, O, W, M, T, P, X, V = y(this).resizable("instance"), S = V.options, R = V.element, N = S.containment, Q = (N instanceof y) ? N.get(0) : (/parent/.test(N)) ? R.parent().get(0) : N;
            if (!Q) {
                return
            }
            V.containerElement = y(Q);
            if (/document/.test(N) || N === document) {
                V.containerOffset = {
                    left: 0,
                    top: 0
                };
                V.containerPosition = {
                    left: 0,
                    top: 0
                };
                V.parentData = {
                    element: y(document),
                    left: 0,
                    top: 0,
                    width: y(document).width(),
                    height: y(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                U = y(Q);
                O = [];
                y(["Top", "Right", "Left", "Bottom"]).each(function(Z, Y) {
                    O[Z] = V._num(U.css("padding" + Y))
                });
                V.containerOffset = U.offset();
                V.containerPosition = U.position();
                V.containerSize = {
                    height: (U.innerHeight() - O[3]),
                    width: (U.innerWidth() - O[1])
                };
                W = V.containerOffset;
                M = V.containerSize.height;
                T = V.containerSize.width;
                P = (V._hasScroll(Q, "left") ? Q.scrollWidth : T);
                X = (V._hasScroll(Q) ? Q.scrollHeight : M);
                V.parentData = {
                    element: Q,
                    left: W.left,
                    top: W.top,
                    width: P,
                    height: X
                }
            }
        },
        resize: function(N, X) {
            var T, Z, S, Q, U = y(this).resizable("instance"), P = U.options, W = U.containerOffset, V = U.position, Y = U._aspectRatio || N.shiftKey, M = {
                top: 0,
                left: 0
            }, O = U.containerElement, R = true;
            if (O[0] !== document && (/static/).test(O.css("position"))) {
                M = W
            }
            if (V.left < (U._helper ? W.left : 0)) {
                U.size.width = U.size.width + (U._helper ? (U.position.left - W.left) : (U.position.left - M.left));
                if (Y) {
                    U.size.height = U.size.width / U.aspectRatio;
                    R = false
                }
                U.position.left = P.helper ? W.left : 0
            }
            if (V.top < (U._helper ? W.top : 0)) {
                U.size.height = U.size.height + (U._helper ? (U.position.top - W.top) : U.position.top);
                if (Y) {
                    U.size.width = U.size.height * U.aspectRatio;
                    R = false
                }
                U.position.top = U._helper ? W.top : 0
            }
            U.offset.left = U.parentData.left + U.position.left;
            U.offset.top = U.parentData.top + U.position.top;
            T = Math.abs((U._helper ? U.offset.left - M.left : (U.offset.left - W.left)) + U.sizeDiff.width);
            Z = Math.abs((U._helper ? U.offset.top - M.top : (U.offset.top - W.top)) + U.sizeDiff.height);
            S = U.containerElement.get(0) === U.element.parent().get(0);
            Q = /relative|absolute/.test(U.containerElement.css("position"));
            if (S && Q) {
                T -= Math.abs(U.parentData.left)
            }
            if (T + U.size.width >= U.parentData.width) {
                U.size.width = U.parentData.width - T;
                if (Y) {
                    U.size.height = U.size.width / U.aspectRatio;
                    R = false
                }
            }
            if (Z + U.size.height >= U.parentData.height) {
                U.size.height = U.parentData.height - Z;
                if (Y) {
                    U.size.width = U.size.height * U.aspectRatio;
                    R = false
                }
            }
            if (!R) {
                U.position.left = X.prevPosition.left;
                U.position.top = X.prevPosition.top;
                U.size.width = X.prevSize.width;
                U.size.height = X.prevSize.height
            }
        },
        stop: function() {
            var R = y(this).resizable("instance")
              , N = R.options
              , S = R.containerOffset
              , M = R.containerPosition
              , O = R.containerElement
              , P = y(R.helper)
              , U = P.offset()
              , T = P.outerWidth() - R.sizeDiff.width
              , Q = P.outerHeight() - R.sizeDiff.height;
            if (R._helper && !N.animate && (/relative/).test(O.css("position"))) {
                y(this).css({
                    left: U.left - M.left - S.left,
                    width: T,
                    height: Q
                })
            }
            if (R._helper && !N.animate && (/static/).test(O.css("position"))) {
                y(this).css({
                    left: U.left - M.left - S.left,
                    width: T,
                    height: Q
                })
            }
        }
    });
    y.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var M = y(this).resizable("instance")
              , O = M.options
              , N = function(P) {
                y(P).each(function() {
                    var Q = y(this);
                    Q.data("ui-resizable-alsoresize", {
                        width: parseInt(Q.width(), 10),
                        height: parseInt(Q.height(), 10),
                        left: parseInt(Q.css("left"), 10),
                        top: parseInt(Q.css("top"), 10)
                    })
                })
            };
            if (typeof (O.alsoResize) === "object" && !O.alsoResize.parentNode) {
                if (O.alsoResize.length) {
                    O.alsoResize = O.alsoResize[0];
                    N(O.alsoResize)
                } else {
                    y.each(O.alsoResize, function(P) {
                        N(P)
                    })
                }
            } else {
                N(O.alsoResize)
            }
        },
        resize: function(O, Q) {
            var N = y(this).resizable("instance")
              , R = N.options
              , P = N.originalSize
              , T = N.originalPosition
              , S = {
                height: (N.size.height - P.height) || 0,
                width: (N.size.width - P.width) || 0,
                top: (N.position.top - T.top) || 0,
                left: (N.position.left - T.left) || 0
            }
              , M = function(U, V) {
                y(U).each(function() {
                    var Y = y(this)
                      , Z = y(this).data("ui-resizable-alsoresize")
                      , X = {}
                      , W = V && V.length ? V : Y.parents(Q.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    y.each(W, function(aa, ac) {
                        var ab = (Z[ac] || 0) + (S[ac] || 0);
                        if (ab && ab >= 0) {
                            X[ac] = ab || null
                        }
                    });
                    Y.css(X)
                })
            };
            if (typeof (R.alsoResize) === "object" && !R.alsoResize.nodeType) {
                y.each(R.alsoResize, function(U, V) {
                    M(U, V)
                })
            } else {
                M(R.alsoResize)
            }
        },
        stop: function() {
            y(this).removeData("resizable-alsoresize")
        }
    });
    y.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var N = y(this).resizable("instance")
              , O = N.options
              , M = N.size;
            N.ghost = N.originalElement.clone();
            N.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: M.height,
                width: M.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof O.ghost === "string" ? O.ghost : "");
            N.ghost.appendTo(N.helper)
        },
        resize: function() {
            var M = y(this).resizable("instance");
            if (M.ghost) {
                M.ghost.css({
                    position: "relative",
                    height: M.size.height,
                    width: M.size.width
                })
            }
        },
        stop: function() {
            var M = y(this).resizable("instance");
            if (M.ghost && M.helper) {
                M.helper.get(0).removeChild(M.ghost.get(0))
            }
        }
    });
    y.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var Y = y(this).resizable("instance")
              , Q = Y.options
              , Z = Y.size
              , S = Y.originalSize
              , V = Y.originalPosition
              , aa = Y.axis
              , N = typeof Q.grid === "number" ? [Q.grid, Q.grid] : Q.grid
              , W = (N[0] || 1)
              , U = (N[1] || 1)
              , P = Math.round((Z.width - S.width) / W) * W
              , O = Math.round((Z.height - S.height) / U) * U
              , T = S.width + P
              , M = S.height + O
              , R = Q.maxWidth && (Q.maxWidth < T)
              , ab = Q.maxHeight && (Q.maxHeight < M)
              , X = Q.minWidth && (Q.minWidth > T)
              , ac = Q.minHeight && (Q.minHeight > M);
            Q.grid = N;
            if (X) {
                T = T + W
            }
            if (ac) {
                M = M + U
            }
            if (R) {
                T = T - W
            }
            if (ab) {
                M = M - U
            }
            if (/^(se|s|e)$/.test(aa)) {
                Y.size.width = T;
                Y.size.height = M
            } else {
                if (/^(ne)$/.test(aa)) {
                    Y.size.width = T;
                    Y.size.height = M;
                    Y.position.top = V.top - O
                } else {
                    if (/^(sw)$/.test(aa)) {
                        Y.size.width = T;
                        Y.size.height = M;
                        Y.position.left = V.left - P
                    } else {
                        if (M - U > 0) {
                            Y.size.height = M;
                            Y.position.top = V.top - O
                        } else {
                            Y.size.height = U;
                            Y.position.top = V.top + S.height - U
                        }
                        if (T - W > 0) {
                            Y.size.width = T;
                            Y.position.left = V.left - P
                        } else {
                            Y.size.width = W;
                            Y.position.left = V.left + S.width - W
                        }
                    }
                }
            }
        }
    });
    var B = y.ui.resizable;
    /*!
 * jQuery UI Selectable 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/selectable/
 */
    var d = y.widget("ui.selectable", y.ui.mouse, {
        version: "1.11.0",
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var N, M = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            this.refresh = function() {
                N = y(M.options.filter, M.element[0]);
                N.addClass("ui-selectee");
                N.each(function() {
                    var O = y(this)
                      , P = O.offset();
                    y.data(this, "selectable-item", {
                        element: this,
                        $element: O,
                        left: P.left,
                        top: P.top,
                        right: P.left + O.outerWidth(),
                        bottom: P.top + O.outerHeight(),
                        startselected: false,
                        selected: O.hasClass("ui-selected"),
                        selecting: O.hasClass("ui-selecting"),
                        unselecting: O.hasClass("ui-unselecting")
                    })
                })
            }
            ;
            this.refresh();
            this.selectees = N.addClass("ui-selectee");
            this._mouseInit();
            this.helper = y("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function(O) {
            var N = this
              , M = this.options;
            this.opos = [O.pageX, O.pageY];
            if (this.options.disabled) {
                return
            }
            this.selectees = y(M.filter, this.element[0]);
            this._trigger("start", O);
            y(M.appendTo).append(this.helper);
            this.helper.css({
                left: O.pageX,
                top: O.pageY,
                width: 0,
                height: 0
            });
            if (M.autoRefresh) {
                this.refresh()
            }
            this.selectees.filter(".ui-selected").each(function() {
                var P = y.data(this, "selectable-item");
                P.startselected = true;
                if (!O.metaKey && !O.ctrlKey) {
                    P.$element.removeClass("ui-selected");
                    P.selected = false;
                    P.$element.addClass("ui-unselecting");
                    P.unselecting = true;
                    N._trigger("unselecting", O, {
                        unselecting: P.element
                    })
                }
            });
            y(O.target).parents().addBack().each(function() {
                var P, Q = y.data(this, "selectable-item");
                if (Q) {
                    P = (!O.metaKey && !O.ctrlKey) || !Q.$element.hasClass("ui-selected");
                    Q.$element.removeClass(P ? "ui-unselecting" : "ui-selected").addClass(P ? "ui-selecting" : "ui-unselecting");
                    Q.unselecting = !P;
                    Q.selecting = P;
                    Q.selected = P;
                    if (P) {
                        N._trigger("selecting", O, {
                            selecting: Q.element
                        })
                    } else {
                        N._trigger("unselecting", O, {
                            unselecting: Q.element
                        })
                    }
                    return false
                }
            })
        },
        _mouseDrag: function(T) {
            this.dragged = true;
            if (this.options.disabled) {
                return
            }
            var Q, S = this, O = this.options, N = this.opos[0], R = this.opos[1], M = T.pageX, P = T.pageY;
            if (N > M) {
                Q = M;
                M = N;
                N = Q
            }
            if (R > P) {
                Q = P;
                P = R;
                R = Q
            }
            this.helper.css({
                left: N,
                top: R,
                width: M - N,
                height: P - R
            });
            this.selectees.each(function() {
                var U = y.data(this, "selectable-item")
                  , V = false;
                if (!U || U.element === S.element[0]) {
                    return
                }
                if (O.tolerance === "touch") {
                    V = (!(U.left > M || U.right < N || U.top > P || U.bottom < R))
                } else {
                    if (O.tolerance === "fit") {
                        V = (U.left > N && U.right < M && U.top > R && U.bottom < P)
                    }
                }
                if (V) {
                    if (U.selected) {
                        U.$element.removeClass("ui-selected");
                        U.selected = false
                    }
                    if (U.unselecting) {
                        U.$element.removeClass("ui-unselecting");
                        U.unselecting = false
                    }
                    if (!U.selecting) {
                        U.$element.addClass("ui-selecting");
                        U.selecting = true;
                        S._trigger("selecting", T, {
                            selecting: U.element
                        })
                    }
                } else {
                    if (U.selecting) {
                        if ((T.metaKey || T.ctrlKey) && U.startselected) {
                            U.$element.removeClass("ui-selecting");
                            U.selecting = false;
                            U.$element.addClass("ui-selected");
                            U.selected = true
                        } else {
                            U.$element.removeClass("ui-selecting");
                            U.selecting = false;
                            if (U.startselected) {
                                U.$element.addClass("ui-unselecting");
                                U.unselecting = true
                            }
                            S._trigger("unselecting", T, {
                                unselecting: U.element
                            })
                        }
                    }
                    if (U.selected) {
                        if (!T.metaKey && !T.ctrlKey && !U.startselected) {
                            U.$element.removeClass("ui-selected");
                            U.selected = false;
                            U.$element.addClass("ui-unselecting");
                            U.unselecting = true;
                            S._trigger("unselecting", T, {
                                unselecting: U.element
                            })
                        }
                    }
                }
            });
            return false
        },
        _mouseStop: function(N) {
            var M = this;
            this.dragged = false;
            y(".ui-unselecting", this.element[0]).each(function() {
                var O = y.data(this, "selectable-item");
                O.$element.removeClass("ui-unselecting");
                O.unselecting = false;
                O.startselected = false;
                M._trigger("unselected", N, {
                    unselected: O.element
                })
            });
            y(".ui-selecting", this.element[0]).each(function() {
                var O = y.data(this, "selectable-item");
                O.$element.removeClass("ui-selecting").addClass("ui-selected");
                O.selecting = false;
                O.selected = true;
                O.startselected = true;
                M._trigger("selected", N, {
                    selected: O.element
                })
            });
            this._trigger("stop", N);
            this.helper.remove();
            return false
        }
    });
    /*!
 * jQuery UI Sortable 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/sortable/
 */
    var s = y.widget("ui.sortable", y.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(N, M, O) {
            return (N >= M) && (N < (M + O))
        },
        _isFloating: function(M) {
            return (/left|right/).test(M.css("float")) || (/inline|table-cell/).test(M.css("display"))
        },
        _create: function() {
            var M = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? M.axis === "x" || this._isFloating(this.items[0].item) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this._setHandleClassName();
            this.ready = true
        },
        _setOption: function(M, N) {
            this._super(M, N);
            if (M === "handle") {
                this._setHandleClassName()
            }
        },
        _setHandleClassName: function() {
            this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            y.each(this.items, function() {
                (this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
            })
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle");
            this._mouseDestroy();
            for (var M = this.items.length - 1; M >= 0; M--) {
                this.items[M].item.removeData(this.widgetName + "-item")
            }
            return this
        },
        _mouseCapture: function(O, P) {
            var M = null
              , Q = false
              , N = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type === "static") {
                return false
            }
            this._refreshItems(O);
            y(O.target).parents().each(function() {
                if (y.data(this, N.widgetName + "-item") === N) {
                    M = y(this);
                    return false
                }
            });
            if (y.data(O.target, N.widgetName + "-item") === N) {
                M = y(O.target)
            }
            if (!M) {
                return false
            }
            if (this.options.handle && !P) {
                y(this.options.handle, M).find("*").addBack().each(function() {
                    if (this === O.target) {
                        Q = true
                    }
                });
                if (!Q) {
                    return false
                }
            }
            this.currentItem = M;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function(P, Q, N) {
            var O, M, R = this.options;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(P);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            y.extend(this.offset, {
                click: {
                    left: P.pageX - this.offset.left,
                    top: P.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(P);
            this.originalPageX = P.pageX;
            this.originalPageY = P.pageY;
            (R.cursorAt && this._adjustOffsetFromHelper(R.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] !== this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (R.containment) {
                this._setContainment()
            }
            if (R.cursor && R.cursor !== "auto") {
                M = this.document.find("body");
                this.storedCursor = M.css("cursor");
                M.css("cursor", R.cursor);
                this.storedStylesheet = y("<style>*{ cursor: " + R.cursor + " !important; }</style>").appendTo(M)
            }
            if (R.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", R.opacity)
            }
            if (R.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", R.zIndex)
            }
            if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", P, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!N) {
                for (O = this.containers.length - 1; O >= 0; O--) {
                    this.containers[O]._trigger("activate", P, this._uiHash(this))
                }
            }
            if (y.ui.ddmanager) {
                y.ui.ddmanager.current = this
            }
            if (y.ui.ddmanager && !R.dropBehaviour) {
                y.ui.ddmanager.prepareOffsets(this, P)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(P);
            return true
        },
        _mouseDrag: function(Q) {
            var O, P, N, S, R = this.options, M = false;
            this.position = this._generatePosition(Q);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                if (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - Q.pageY < R.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = M = this.scrollParent[0].scrollTop + R.scrollSpeed
                    } else {
                        if (Q.pageY - this.overflowOffset.top < R.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = M = this.scrollParent[0].scrollTop - R.scrollSpeed
                        }
                    }
                    if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - Q.pageX < R.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = M = this.scrollParent[0].scrollLeft + R.scrollSpeed
                    } else {
                        if (Q.pageX - this.overflowOffset.left < R.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = M = this.scrollParent[0].scrollLeft - R.scrollSpeed
                        }
                    }
                } else {
                    if (Q.pageY - y(document).scrollTop() < R.scrollSensitivity) {
                        M = y(document).scrollTop(y(document).scrollTop() - R.scrollSpeed)
                    } else {
                        if (y(window).height() - (Q.pageY - y(document).scrollTop()) < R.scrollSensitivity) {
                            M = y(document).scrollTop(y(document).scrollTop() + R.scrollSpeed)
                        }
                    }
                    if (Q.pageX - y(document).scrollLeft() < R.scrollSensitivity) {
                        M = y(document).scrollLeft(y(document).scrollLeft() - R.scrollSpeed)
                    } else {
                        if (y(window).width() - (Q.pageX - y(document).scrollLeft()) < R.scrollSensitivity) {
                            M = y(document).scrollLeft(y(document).scrollLeft() + R.scrollSpeed)
                        }
                    }
                }
                if (M !== false && y.ui.ddmanager && !R.dropBehaviour) {
                    y.ui.ddmanager.prepareOffsets(this, Q)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis !== "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (O = this.items.length - 1; O >= 0; O--) {
                P = this.items[O];
                N = P.item[0];
                S = this._intersectsWithPointer(P);
                if (!S) {
                    continue
                }
                if (P.instance !== this.currentContainer) {
                    continue
                }
                if (N !== this.currentItem[0] && this.placeholder[S === 1 ? "next" : "prev"]()[0] !== N && !y.contains(this.placeholder[0], N) && (this.options.type === "semi-dynamic" ? !y.contains(this.element[0], N) : true)) {
                    this.direction = S === 1 ? "down" : "up";
                    if (this.options.tolerance === "pointer" || this._intersectsWithSides(P)) {
                        this._rearrange(Q, P)
                    } else {
                        break
                    }
                    this._trigger("change", Q, this._uiHash());
                    break
                }
            }
            this._contactContainers(Q);
            if (y.ui.ddmanager) {
                y.ui.ddmanager.drag(this, Q)
            }
            this._trigger("sort", Q, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function(O, Q) {
            if (!O) {
                return
            }
            if (y.ui.ddmanager && !this.options.dropBehaviour) {
                y.ui.ddmanager.drop(this, O)
            }
            if (this.options.revert) {
                var N = this
                  , R = this.placeholder.offset()
                  , M = this.options.axis
                  , P = {};
                if (!M || M === "x") {
                    P.left = R.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)
                }
                if (!M || M === "y") {
                    P.top = R.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)
                }
                this.reverting = true;
                y(this.helper).animate(P, parseInt(this.options.revert, 10) || 500, function() {
                    N._clear(O)
                })
            } else {
                this._clear(O, Q)
            }
            return false
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper === "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var M = this.containers.length - 1; M >= 0; M--) {
                    this.containers[M]._trigger("deactivate", null, this._uiHash(this));
                    if (this.containers[M].containerCache.over) {
                        this.containers[M]._trigger("out", null, this._uiHash(this));
                        this.containers[M].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                y.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    y(this.domPosition.prev).after(this.currentItem)
                } else {
                    y(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        },
        serialize: function(O) {
            var M = this._getItemsAsjQuery(O && O.connected)
              , N = [];
            O = O || {};
            y(M).each(function() {
                var P = (y(O.item || this).attr(O.attribute || "id") || "").match(O.expression || (/(.+)[\-=_](.+)/));
                if (P) {
                    N.push((O.key || P[1] + "[]") + "=" + (O.key && O.expression ? P[1] : P[2]))
                }
            });
            if (!N.length && O.key) {
                N.push(O.key + "=")
            }
            return N.join("&")
        },
        toArray: function(O) {
            var M = this._getItemsAsjQuery(O && O.connected)
              , N = [];
            O = O || {};
            M.each(function() {
                N.push(y(O.item || this).attr(O.attribute || "id") || "")
            });
            return N
        },
        _intersectsWith: function(X) {
            var O = this.positionAbs.left
              , N = O + this.helperProportions.width
              , V = this.positionAbs.top
              , U = V + this.helperProportions.height
              , P = X.left
              , M = P + X.width
              , Y = X.top
              , T = Y + X.height
              , Z = this.offset.click.top
              , S = this.offset.click.left
              , R = (this.options.axis === "x") || ((V + Z) > Y && (V + Z) < T)
              , W = (this.options.axis === "y") || ((O + S) > P && (O + S) < M)
              , Q = R && W;
            if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || (this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > X[this.floating ? "width" : "height"])) {
                return Q
            } else {
                return (P < O + (this.helperProportions.width / 2) && N - (this.helperProportions.width / 2) < M && Y < V + (this.helperProportions.height / 2) && U - (this.helperProportions.height / 2) < T)
            }
        },
        _intersectsWithPointer: function(O) {
            var P = (this.options.axis === "x") || this._isOverAxis(this.positionAbs.top + this.offset.click.top, O.top, O.height)
              , N = (this.options.axis === "y") || this._isOverAxis(this.positionAbs.left + this.offset.click.left, O.left, O.width)
              , R = P && N
              , M = this._getDragVerticalDirection()
              , Q = this._getDragHorizontalDirection();
            if (!R) {
                return false
            }
            return this.floating ? (((Q && Q === "right") || M === "down") ? 2 : 1) : (M && (M === "down" ? 2 : 1))
        },
        _intersectsWithSides: function(P) {
            var N = this._isOverAxis(this.positionAbs.top + this.offset.click.top, P.top + (P.height / 2), P.height)
              , O = this._isOverAxis(this.positionAbs.left + this.offset.click.left, P.left + (P.width / 2), P.width)
              , M = this._getDragVerticalDirection()
              , Q = this._getDragHorizontalDirection();
            if (this.floating && Q) {
                return ((Q === "right" && O) || (Q === "left" && !O))
            } else {
                return M && ((M === "down" && N) || (M === "up" && !N))
            }
        },
        _getDragVerticalDirection: function() {
            var M = this.positionAbs.top - this.lastPositionAbs.top;
            return M !== 0 && (M > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var M = this.positionAbs.left - this.lastPositionAbs.left;
            return M !== 0 && (M > 0 ? "right" : "left")
        },
        refresh: function(M) {
            this._refreshItems(M);
            this._setHandleClassName();
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var M = this.options;
            return M.connectWith.constructor === String ? [M.connectWith] : M.connectWith
        },
        _getItemsAsjQuery: function(M) {
            var O, N, T, Q, R = [], P = [], S = this._connectWith();
            if (S && M) {
                for (O = S.length - 1; O >= 0; O--) {
                    T = y(S[O]);
                    for (N = T.length - 1; N >= 0; N--) {
                        Q = y.data(T[N], this.widgetFullName);
                        if (Q && Q !== this && !Q.options.disabled) {
                            P.push([y.isFunction(Q.options.items) ? Q.options.items.call(Q.element) : y(Q.options.items, Q.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), Q])
                        }
                    }
                }
            }
            P.push([y.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : y(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            function U() {
                R.push(this)
            }
            for (O = P.length - 1; O >= 0; O--) {
                P[O][0].each(U)
            }
            return y(R)
        },
        _removeCurrentsFromItems: function() {
            var M = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = y.grep(this.items, function(O) {
                for (var N = 0; N < M.length; N++) {
                    if (M[N] === O.item[0]) {
                        return false
                    }
                }
                return true
            })
        },
        _refreshItems: function(M) {
            this.items = [];
            this.containers = [this];
            var Q, O, V, R, U, N, X, W, S = this.items, P = [[y.isFunction(this.options.items) ? this.options.items.call(this.element[0], M, {
                item: this.currentItem
            }) : y(this.options.items, this.element), this]], T = this._connectWith();
            if (T && this.ready) {
                for (Q = T.length - 1; Q >= 0; Q--) {
                    V = y(T[Q]);
                    for (O = V.length - 1; O >= 0; O--) {
                        R = y.data(V[O], this.widgetFullName);
                        if (R && R !== this && !R.options.disabled) {
                            P.push([y.isFunction(R.options.items) ? R.options.items.call(R.element[0], M, {
                                item: this.currentItem
                            }) : y(R.options.items, R.element), R]);
                            this.containers.push(R)
                        }
                    }
                }
            }
            for (Q = P.length - 1; Q >= 0; Q--) {
                U = P[Q][1];
                N = P[Q][0];
                for (O = 0,
                W = N.length; O < W; O++) {
                    X = y(N[O]);
                    X.data(this.widgetName + "-item", U);
                    S.push({
                        item: X,
                        instance: U,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function(M) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            var O, P, N, Q;
            for (O = this.items.length - 1; O >= 0; O--) {
                P = this.items[O];
                if (P.instance !== this.currentContainer && this.currentContainer && P.item[0] !== this.currentItem[0]) {
                    continue
                }
                N = this.options.toleranceElement ? y(this.options.toleranceElement, P.item) : P.item;
                if (!M) {
                    P.width = N.outerWidth();
                    P.height = N.outerHeight()
                }
                Q = N.offset();
                P.left = Q.left;
                P.top = Q.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (O = this.containers.length - 1; O >= 0; O--) {
                    Q = this.containers[O].element.offset();
                    this.containers[O].containerCache.left = Q.left;
                    this.containers[O].containerCache.top = Q.top;
                    this.containers[O].containerCache.width = this.containers[O].element.outerWidth();
                    this.containers[O].containerCache.height = this.containers[O].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function(N) {
            N = N || this;
            var M, O = N.options;
            if (!O.placeholder || O.placeholder.constructor === String) {
                M = O.placeholder;
                O.placeholder = {
                    element: function() {
                        var Q = N.currentItem[0].nodeName.toLowerCase()
                          , P = y("<" + Q + ">", N.document[0]).addClass(M || N.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        if (Q === "tr") {
                            N.currentItem.children().each(function() {
                                y("<td>&#160;</td>", N.document[0]).attr("colspan", y(this).attr("colspan") || 1).appendTo(P)
                            })
                        } else {
                            if (Q === "img") {
                                P.attr("src", N.currentItem.attr("src"))
                            }
                        }
                        if (!M) {
                            P.css("visibility", "hidden")
                        }
                        return P
                    },
                    update: function(P, Q) {
                        if (M && !O.forcePlaceholderSize) {
                            return
                        }
                        if (!Q.height()) {
                            Q.height(N.currentItem.innerHeight() - parseInt(N.currentItem.css("paddingTop") || 0, 10) - parseInt(N.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!Q.width()) {
                            Q.width(N.currentItem.innerWidth() - parseInt(N.currentItem.css("paddingLeft") || 0, 10) - parseInt(N.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            N.placeholder = y(O.placeholder.element.call(N.element, N.currentItem));
            N.currentItem.after(N.placeholder);
            O.placeholder.update(N, N.placeholder)
        },
        _contactContainers: function(M) {
            var R, P, V, S, T, X, Y, Q, U, O, N = null, W = null;
            for (R = this.containers.length - 1; R >= 0; R--) {
                if (y.contains(this.currentItem[0], this.containers[R].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[R].containerCache)) {
                    if (N && y.contains(this.containers[R].element[0], N.element[0])) {
                        continue
                    }
                    N = this.containers[R];
                    W = R
                } else {
                    if (this.containers[R].containerCache.over) {
                        this.containers[R]._trigger("out", M, this._uiHash(this));
                        this.containers[R].containerCache.over = 0
                    }
                }
            }
            if (!N) {
                return
            }
            if (this.containers.length === 1) {
                if (!this.containers[W].containerCache.over) {
                    this.containers[W]._trigger("over", M, this._uiHash(this));
                    this.containers[W].containerCache.over = 1
                }
            } else {
                V = 10000;
                S = null;
                U = N.floating || this._isFloating(this.currentItem);
                T = U ? "left" : "top";
                X = U ? "width" : "height";
                O = U ? "clientX" : "clientY";
                for (P = this.items.length - 1; P >= 0; P--) {
                    if (!y.contains(this.containers[W].element[0], this.items[P].item[0])) {
                        continue
                    }
                    if (this.items[P].item[0] === this.currentItem[0]) {
                        continue
                    }
                    Y = this.items[P].item.offset()[T];
                    Q = false;
                    if (M[O] - Y > this.items[P][X] / 2) {
                        Q = true
                    }
                    if (Math.abs(M[O] - Y) < V) {
                        V = Math.abs(M[O] - Y);
                        S = this.items[P];
                        this.direction = Q ? "up" : "down"
                    }
                }
                if (!S && !this.options.dropOnEmpty) {
                    return
                }
                if (this.currentContainer === this.containers[W]) {
                    return
                }
                S ? this._rearrange(M, S, null, true) : this._rearrange(M, null, this.containers[W].element, true);
                this._trigger("change", M, this._uiHash());
                this.containers[W]._trigger("change", M, this._uiHash(this));
                this.currentContainer = this.containers[W];
                this.options.placeholder.update(this.currentContainer, this.placeholder);
                this.containers[W]._trigger("over", M, this._uiHash(this));
                this.containers[W].containerCache.over = 1
            }
        },
        _createHelper: function(N) {
            var O = this.options
              , M = y.isFunction(O.helper) ? y(O.helper.apply(this.element[0], [N, this.currentItem])) : (O.helper === "clone" ? this.currentItem.clone() : this.currentItem);
            if (!M.parents("body").length) {
                y(O.appendTo !== "parent" ? O.appendTo : this.currentItem[0].parentNode)[0].appendChild(M[0])
            }
            if (M[0] === this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (!M[0].style.width || O.forceHelperSize) {
                M.width(this.currentItem.width())
            }
            if (!M[0].style.height || O.forceHelperSize) {
                M.height(this.currentItem.height())
            }
            return M
        },
        _adjustOffsetFromHelper: function(M) {
            if (typeof M === "string") {
                M = M.split(" ")
            }
            if (y.isArray(M)) {
                M = {
                    left: +M[0],
                    top: +M[1] || 0
                }
            }
            if ("left"in M) {
                this.offset.click.left = M.left + this.margins.left
            }
            if ("right"in M) {
                this.offset.click.left = this.helperProportions.width - M.right + this.margins.left
            }
            if ("top"in M) {
                this.offset.click.top = M.top + this.margins.top
            }
            if ("bottom"in M) {
                this.offset.click.top = this.helperProportions.height - M.bottom + this.margins.top
            }
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var M = this.offsetParent.offset();
            if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && y.contains(this.scrollParent[0], this.offsetParent[0])) {
                M.left += this.scrollParent.scrollLeft();
                M.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] === document.body || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && y.ui.ie)) {
                M = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: M.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: M.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var M = this.currentItem.position();
                return {
                    top: M.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: M.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var N, P, M, O = this.options;
            if (O.containment === "parent") {
                O.containment = this.helper[0].parentNode
            }
            if (O.containment === "document" || O.containment === "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, y(O.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (y(O.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(O.containment)) {
                N = y(O.containment)[0];
                P = y(O.containment).offset();
                M = (y(N).css("overflow") !== "hidden");
                this.containment = [P.left + (parseInt(y(N).css("borderLeftWidth"), 10) || 0) + (parseInt(y(N).css("paddingLeft"), 10) || 0) - this.margins.left, P.top + (parseInt(y(N).css("borderTopWidth"), 10) || 0) + (parseInt(y(N).css("paddingTop"), 10) || 0) - this.margins.top, P.left + (M ? Math.max(N.scrollWidth, N.offsetWidth) : N.offsetWidth) - (parseInt(y(N).css("borderLeftWidth"), 10) || 0) - (parseInt(y(N).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, P.top + (M ? Math.max(N.scrollHeight, N.offsetHeight) : N.offsetHeight) - (parseInt(y(N).css("borderTopWidth"), 10) || 0) - (parseInt(y(N).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function(O, Q) {
            if (!Q) {
                Q = this.position
            }
            var N = O === "absolute" ? 1 : -1
              , M = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && y.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent
              , P = (/(html|body)/i).test(M[0].tagName);
            return {
                top: (Q.top + this.offset.relative.top * N + this.offset.parent.top * N - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (P ? 0 : M.scrollTop())) * N)),
                left: (Q.left + this.offset.relative.left * N + this.offset.parent.left * N - ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : P ? 0 : M.scrollLeft()) * N))
            }
        },
        _generatePosition: function(P) {
            var R, Q, S = this.options, O = P.pageX, N = P.pageY, M = this.cssPosition === "absolute" && !(this.scrollParent[0] !== document && y.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, T = (/(html|body)/i).test(M[0].tagName);
            if (this.cssPosition === "relative" && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            if (this.originalPosition) {
                if (this.containment) {
                    if (P.pageX - this.offset.click.left < this.containment[0]) {
                        O = this.containment[0] + this.offset.click.left
                    }
                    if (P.pageY - this.offset.click.top < this.containment[1]) {
                        N = this.containment[1] + this.offset.click.top
                    }
                    if (P.pageX - this.offset.click.left > this.containment[2]) {
                        O = this.containment[2] + this.offset.click.left
                    }
                    if (P.pageY - this.offset.click.top > this.containment[3]) {
                        N = this.containment[3] + this.offset.click.top
                    }
                }
                if (S.grid) {
                    R = this.originalPageY + Math.round((N - this.originalPageY) / S.grid[1]) * S.grid[1];
                    N = this.containment ? ((R - this.offset.click.top >= this.containment[1] && R - this.offset.click.top <= this.containment[3]) ? R : ((R - this.offset.click.top >= this.containment[1]) ? R - S.grid[1] : R + S.grid[1])) : R;
                    Q = this.originalPageX + Math.round((O - this.originalPageX) / S.grid[0]) * S.grid[0];
                    O = this.containment ? ((Q - this.offset.click.left >= this.containment[0] && Q - this.offset.click.left <= this.containment[2]) ? Q : ((Q - this.offset.click.left >= this.containment[0]) ? Q - S.grid[0] : Q + S.grid[0])) : Q
                }
            }
            return {
                top: (N - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : (T ? 0 : M.scrollTop())))),
                left: (O - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ((this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : T ? 0 : M.scrollLeft())))
            }
        },
        _rearrange: function(Q, P, N, O) {
            N ? N[0].appendChild(this.placeholder[0]) : P.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction === "down" ? P.item[0] : P.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var M = this.counter;
            this._delay(function() {
                if (M === this.counter) {
                    this.refreshPositions(!O)
                }
            })
        },
        _clear: function(N, P) {
            this.reverting = false;
            var M, Q = [];
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (M in this._storedCSS) {
                    if (this._storedCSS[M] === "auto" || this._storedCSS[M] === "static") {
                        this._storedCSS[M] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            if (this.fromOutside && !P) {
                Q.push(function(R) {
                    this._trigger("receive", R, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !P) {
                Q.push(function(R) {
                    this._trigger("update", R, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!P) {
                    Q.push(function(R) {
                        this._trigger("remove", R, this._uiHash())
                    });
                    Q.push((function(R) {
                        return function(S) {
                            R._trigger("receive", S, this._uiHash(this))
                        }
                    }
                    ).call(this, this.currentContainer));
                    Q.push((function(R) {
                        return function(S) {
                            R._trigger("update", S, this._uiHash(this))
                        }
                    }
                    ).call(this, this.currentContainer))
                }
            }
            function O(T, R, S) {
                return function(U) {
                    S._trigger(T, U, R._uiHash(R))
                }
            }
            for (M = this.containers.length - 1; M >= 0; M--) {
                if (!P) {
                    Q.push(O("deactivate", this, this.containers[M]))
                }
                if (this.containers[M].containerCache.over) {
                    Q.push(O("out", this, this.containers[M]));
                    this.containers[M].containerCache.over = 0
                }
            }
            if (this.storedCursor) {
                this.document.find("body").css("cursor", this.storedCursor);
                this.storedStylesheet.remove()
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!P) {
                    this._trigger("beforeStop", N, this._uiHash());
                    for (M = 0; M < Q.length; M++) {
                        Q[M].call(this, N)
                    }
                    this._trigger("stop", N, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!P) {
                this._trigger("beforeStop", N, this._uiHash())
            }
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            if (this.helper[0] !== this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!P) {
                for (M = 0; M < Q.length; M++) {
                    Q[M].call(this, N)
                }
                this._trigger("stop", N, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function() {
            if (y.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        },
        _uiHash: function(M) {
            var N = M || this;
            return {
                helper: N.helper,
                placeholder: N.placeholder || y([]),
                position: N.position,
                originalPosition: N.originalPosition,
                offset: N.positionAbs,
                item: N.currentItem,
                sender: M ? M.element : null
            }
        }
    });
    /*!
 * jQuery UI Datepicker 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */
    y.extend(y.ui, {
        datepicker: {
            version: "1.11.0"
        }
    });
    var j;
    function m(N) {
        var M, O;
        while (N.length && N[0] !== document) {
            M = N.css("position");
            if (M === "absolute" || M === "relative" || M === "fixed") {
                O = parseInt(N.css("zIndex"), 10);
                if (!isNaN(O) && O !== 0) {
                    return O
                }
            }
            N = N.parent()
        }
        return 0
    }
    function K() {
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        y.extend(this._defaults, this.regional[""]);
        this.regional.en = y.extend(true, {}, this.regional[""]);
        this.regional["en-US"] = y.extend(true, {}, this.regional.en);
        this.dpDiv = g(y("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    y.extend(K.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(M) {
            p(this._defaults, M || {});
            return this
        },
        _attachDatepicker: function(P, M) {
            var Q, O, N;
            Q = P.nodeName.toLowerCase();
            O = (Q === "div" || Q === "span");
            if (!P.id) {
                this.uuid += 1;
                P.id = "dp" + this.uuid
            }
            N = this._newInst(y(P), O);
            N.settings = y.extend({}, M || {});
            if (Q === "input") {
                this._connectDatepicker(P, N)
            } else {
                if (O) {
                    this._inlineDatepicker(P, N)
                }
            }
        },
        _newInst: function(N, M) {
            var O = N[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: O,
                input: N,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: M,
                dpDiv: (!M ? this.dpDiv : g(y("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))
            }
        },
        _connectDatepicker: function(O, N) {
            var M = y(O);
            N.append = y([]);
            N.trigger = y([]);
            if (M.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(M, N);
            M.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp);
            this._autoSize(N);
            y.data(O, "datepicker", N);
            if (N.settings.disabled) {
                this._disableDatepicker(O)
            }
        },
        _attachments: function(O, R) {
            var N, Q, M, S = this._get(R, "appendText"), P = this._get(R, "isRTL");
            if (R.append) {
                R.append.remove()
            }
            if (S) {
                R.append = y("<span class='" + this._appendClass + "'>" + S + "</span>");
                O[P ? "before" : "after"](R.append)
            }
            O.unbind("focus", this._showDatepicker);
            if (R.trigger) {
                R.trigger.remove()
            }
            N = this._get(R, "showOn");
            if (N === "focus" || N === "both") {
                O.focus(this._showDatepicker)
            }
            if (N === "button" || N === "both") {
                Q = this._get(R, "buttonText");
                M = this._get(R, "buttonImage");
                R.trigger = y(this._get(R, "buttonImageOnly") ? y("<img/>").addClass(this._triggerClass).attr({
                    src: M,
                    alt: Q,
                    title: Q
                }) : y("<button type='button'></button>").addClass(this._triggerClass).html(!M ? Q : y("<img/>").attr({
                    src: M,
                    alt: Q,
                    title: Q
                })));
                O[P ? "before" : "after"](R.trigger);
                R.trigger.click(function() {
                    if (y.datepicker._datepickerShowing && y.datepicker._lastInput === O[0]) {
                        y.datepicker._hideDatepicker()
                    } else {
                        if (y.datepicker._datepickerShowing && y.datepicker._lastInput !== O[0]) {
                            y.datepicker._hideDatepicker();
                            y.datepicker._showDatepicker(O[0])
                        } else {
                            y.datepicker._showDatepicker(O[0])
                        }
                    }
                    return false
                })
            }
        },
        _autoSize: function(S) {
            if (this._get(S, "autoSize") && !S.inline) {
                var P, N, O, R, Q = new Date(2009,12 - 1,20), M = this._get(S, "dateFormat");
                if (M.match(/[DM]/)) {
                    P = function(T) {
                        N = 0;
                        O = 0;
                        for (R = 0; R < T.length; R++) {
                            if (T[R].length > N) {
                                N = T[R].length;
                                O = R
                            }
                        }
                        return O
                    }
                    ;
                    Q.setMonth(P(this._get(S, (M.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    Q.setDate(P(this._get(S, (M.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - Q.getDay())
                }
                S.input.attr("size", this._formatDate(S, Q).length)
            }
        },
        _inlineDatepicker: function(N, M) {
            var O = y(N);
            if (O.hasClass(this.markerClassName)) {
                return
            }
            O.addClass(this.markerClassName).append(M.dpDiv);
            y.data(N, "datepicker", M);
            this._setDate(M, this._getDefaultDate(M), true);
            this._updateDatepicker(M);
            this._updateAlternate(M);
            if (M.settings.disabled) {
                this._disableDatepicker(N)
            }
            M.dpDiv.css("display", "block")
        },
        _dialogDatepicker: function(T, N, R, O, S) {
            var M, W, Q, V, U, P = this._dialogInst;
            if (!P) {
                this.uuid += 1;
                M = "dp" + this.uuid;
                this._dialogInput = y("<input type='text' id='" + M + "' style='position: absolute; top: -100px; width: 0px;'/>");
                this._dialogInput.keydown(this._doKeyDown);
                y("body").append(this._dialogInput);
                P = this._dialogInst = this._newInst(this._dialogInput, false);
                P.settings = {};
                y.data(this._dialogInput[0], "datepicker", P)
            }
            p(P.settings, O || {});
            N = (N && N.constructor === Date ? this._formatDate(P, N) : N);
            this._dialogInput.val(N);
            this._pos = (S ? (S.length ? S : [S.pageX, S.pageY]) : null);
            if (!this._pos) {
                W = document.documentElement.clientWidth;
                Q = document.documentElement.clientHeight;
                V = document.documentElement.scrollLeft || document.body.scrollLeft;
                U = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(W / 2) - 100 + V, (Q / 2) - 150 + U]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            P.settings.onSelect = R;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (y.blockUI) {
                y.blockUI(this.dpDiv)
            }
            y.data(this._dialogInput[0], "datepicker", P);
            return this
        },
        _destroyDatepicker: function(O) {
            var P, M = y(O), N = y.data(O, "datepicker");
            if (!M.hasClass(this.markerClassName)) {
                return
            }
            P = O.nodeName.toLowerCase();
            y.removeData(O, "datepicker");
            if (P === "input") {
                N.append.remove();
                N.trigger.remove();
                M.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (P === "div" || P === "span") {
                    M.removeClass(this.markerClassName).empty()
                }
            }
        },
        _enableDatepicker: function(P) {
            var Q, O, M = y(P), N = y.data(P, "datepicker");
            if (!M.hasClass(this.markerClassName)) {
                return
            }
            Q = P.nodeName.toLowerCase();
            if (Q === "input") {
                P.disabled = false;
                N.trigger.filter("button").each(function() {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (Q === "div" || Q === "span") {
                    O = M.children("." + this._inlineClass);
                    O.children().removeClass("ui-state-disabled");
                    O.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", false)
                }
            }
            this._disabledInputs = y.map(this._disabledInputs, function(R) {
                return (R === P ? null : R)
            })
        },
        _disableDatepicker: function(P) {
            var Q, O, M = y(P), N = y.data(P, "datepicker");
            if (!M.hasClass(this.markerClassName)) {
                return
            }
            Q = P.nodeName.toLowerCase();
            if (Q === "input") {
                P.disabled = true;
                N.trigger.filter("button").each(function() {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (Q === "div" || Q === "span") {
                    O = M.children("." + this._inlineClass);
                    O.children().addClass("ui-state-disabled");
                    O.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", true)
                }
            }
            this._disabledInputs = y.map(this._disabledInputs, function(R) {
                return (R === P ? null : R)
            });
            this._disabledInputs[this._disabledInputs.length] = P
        },
        _isDisabledDatepicker: function(N) {
            if (!N) {
                return false
            }
            for (var M = 0; M < this._disabledInputs.length; M++) {
                if (this._disabledInputs[M] === N) {
                    return true
                }
            }
            return false
        },
        _getInst: function(N) {
            try {
                return y.data(N, "datepicker")
            } catch (M) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(S, N, R) {
            var O, M, Q, T, P = this._getInst(S);
            if (arguments.length === 2 && typeof N === "string") {
                return (N === "defaults" ? y.extend({}, y.datepicker._defaults) : (P ? (N === "all" ? y.extend({}, P.settings) : this._get(P, N)) : null))
            }
            O = N || {};
            if (typeof N === "string") {
                O = {};
                O[N] = R
            }
            if (P) {
                if (this._curInst === P) {
                    this._hideDatepicker()
                }
                M = this._getDateDatepicker(S, true);
                Q = this._getMinMaxDate(P, "min");
                T = this._getMinMaxDate(P, "max");
                p(P.settings, O);
                if (Q !== null && O.dateFormat !== undefined && O.minDate === undefined) {
                    P.settings.minDate = this._formatDate(P, Q)
                }
                if (T !== null && O.dateFormat !== undefined && O.maxDate === undefined) {
                    P.settings.maxDate = this._formatDate(P, T)
                }
                if ("disabled"in O) {
                    if (O.disabled) {
                        this._disableDatepicker(S)
                    } else {
                        this._enableDatepicker(S)
                    }
                }
                this._attachments(y(S), P);
                this._autoSize(P);
                this._setDate(P, M);
                this._updateAlternate(P);
                this._updateDatepicker(P)
            }
        },
        _changeDatepicker: function(O, M, N) {
            this._optionDatepicker(O, M, N)
        },
        _refreshDatepicker: function(N) {
            var M = this._getInst(N);
            if (M) {
                this._updateDatepicker(M)
            }
        },
        _setDateDatepicker: function(O, M) {
            var N = this._getInst(O);
            if (N) {
                this._setDate(N, M);
                this._updateDatepicker(N);
                this._updateAlternate(N)
            }
        },
        _getDateDatepicker: function(O, M) {
            var N = this._getInst(O);
            if (N && !N.inline) {
                this._setDateFromField(N, M)
            }
            return (N ? this._getDate(N) : null)
        },
        _doKeyDown: function(P) {
            var N, M, R, Q = y.datepicker._getInst(P.target), S = true, O = Q.dpDiv.is(".ui-datepicker-rtl");
            Q._keyEvent = true;
            if (y.datepicker._datepickerShowing) {
                switch (P.which) {
                case 9:
                    y.datepicker._hideDatepicker();
                    S = false;
                    break;
                case 13:
                    R = y("td." + y.datepicker._dayOverClass + ":not(." + y.datepicker._currentClass + ")", Q.dpDiv);
                    if (R[0]) {
                        y.datepicker._selectDay(P.target, Q.selectedMonth, Q.selectedYear, R[0])
                    }
                    N = y.datepicker._get(Q, "onSelect");
                    if (N) {
                        M = y.datepicker._formatDate(Q);
                        N.apply((Q.input ? Q.input[0] : null), [M, Q])
                    } else {
                        y.datepicker._hideDatepicker()
                    }
                    return false;
                case 27:
                    y.datepicker._hideDatepicker();
                    break;
                case 33:
                    y.datepicker._adjustDate(P.target, (P.ctrlKey ? -y.datepicker._get(Q, "stepBigMonths") : -y.datepicker._get(Q, "stepMonths")), "M");
                    break;
                case 34:
                    y.datepicker._adjustDate(P.target, (P.ctrlKey ? +y.datepicker._get(Q, "stepBigMonths") : +y.datepicker._get(Q, "stepMonths")), "M");
                    break;
                case 35:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._clearDate(P.target)
                    }
                    S = P.ctrlKey || P.metaKey;
                    break;
                case 36:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._gotoToday(P.target)
                    }
                    S = P.ctrlKey || P.metaKey;
                    break;
                case 37:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._adjustDate(P.target, (O ? +1 : -1), "D")
                    }
                    S = P.ctrlKey || P.metaKey;
                    if (P.originalEvent.altKey) {
                        y.datepicker._adjustDate(P.target, (P.ctrlKey ? -y.datepicker._get(Q, "stepBigMonths") : -y.datepicker._get(Q, "stepMonths")), "M")
                    }
                    break;
                case 38:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._adjustDate(P.target, -7, "D")
                    }
                    S = P.ctrlKey || P.metaKey;
                    break;
                case 39:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._adjustDate(P.target, (O ? -1 : +1), "D")
                    }
                    S = P.ctrlKey || P.metaKey;
                    if (P.originalEvent.altKey) {
                        y.datepicker._adjustDate(P.target, (P.ctrlKey ? +y.datepicker._get(Q, "stepBigMonths") : +y.datepicker._get(Q, "stepMonths")), "M")
                    }
                    break;
                case 40:
                    if (P.ctrlKey || P.metaKey) {
                        y.datepicker._adjustDate(P.target, +7, "D")
                    }
                    S = P.ctrlKey || P.metaKey;
                    break;
                default:
                    S = false
                }
            } else {
                if (P.which === 36 && P.ctrlKey) {
                    y.datepicker._showDatepicker(this)
                } else {
                    S = false
                }
            }
            if (S) {
                P.preventDefault();
                P.stopPropagation()
            }
        },
        _doKeyPress: function(O) {
            var N, M, P = y.datepicker._getInst(O.target);
            if (y.datepicker._get(P, "constrainInput")) {
                N = y.datepicker._possibleChars(y.datepicker._get(P, "dateFormat"));
                M = String.fromCharCode(O.charCode == null ? O.keyCode : O.charCode);
                return O.ctrlKey || O.metaKey || (M < " " || !N || N.indexOf(M) > -1)
            }
        },
        _doKeyUp: function(O) {
            var M, P = y.datepicker._getInst(O.target);
            if (P.input.val() !== P.lastVal) {
                try {
                    M = y.datepicker.parseDate(y.datepicker._get(P, "dateFormat"), (P.input ? P.input.val() : null), y.datepicker._getFormatConfig(P));
                    if (M) {
                        y.datepicker._setDateFromField(P);
                        y.datepicker._updateAlternate(P);
                        y.datepicker._updateDatepicker(P)
                    }
                } catch (N) {}
            }
            return true
        },
        _showDatepicker: function(N) {
            N = N.target || N;
            if (N.nodeName.toLowerCase() !== "input") {
                N = y("input", N.parentNode)[0]
            }
            if (y.datepicker._isDisabledDatepicker(N) || y.datepicker._lastInput === N) {
                return
            }
            var P, T, O, R, S, M, Q;
            P = y.datepicker._getInst(N);
            if (y.datepicker._curInst && y.datepicker._curInst !== P) {
                y.datepicker._curInst.dpDiv.stop(true, true);
                if (P && y.datepicker._datepickerShowing) {
                    y.datepicker._hideDatepicker(y.datepicker._curInst.input[0])
                }
            }
            T = y.datepicker._get(P, "beforeShow");
            O = T ? T.apply(N, [N, P]) : {};
            if (O === false) {
                return
            }
            p(P.settings, O);
            P.lastVal = null;
            y.datepicker._lastInput = N;
            y.datepicker._setDateFromField(P);
            if (y.datepicker._inDialog) {
                N.value = ""
            }
            if (!y.datepicker._pos) {
                y.datepicker._pos = y.datepicker._findPos(N);
                y.datepicker._pos[1] += N.offsetHeight
            }
            R = false;
            y(N).parents().each(function() {
                R |= y(this).css("position") === "fixed";
                return !R
            });
            S = {
                left: y.datepicker._pos[0],
                top: y.datepicker._pos[1]
            };
            y.datepicker._pos = null;
            P.dpDiv.empty();
            P.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            y.datepicker._updateDatepicker(P);
            S = y.datepicker._checkOffset(P, S, R);
            P.dpDiv.css({
                position: (y.datepicker._inDialog && y.blockUI ? "static" : (R ? "fixed" : "absolute")),
                display: "none",
                left: S.left + "px",
                top: S.top + "px"
            });
            if (!P.inline) {
                M = y.datepicker._get(P, "showAnim");
                Q = y.datepicker._get(P, "duration");
                y.datepicker._datepickerShowing = true;
                if (y.effects && y.effects.effect[M]) {
                    P.dpDiv.show(M, y.datepicker._get(P, "showOptions"), Q)
                } else {
                    P.dpDiv[M || "show"](M ? Q : null)
                }
                if (y.datepicker._shouldFocusInput(P)) {
                    P.input.focus()
                }
                y.datepicker._curInst = P
            }
        },
        _updateDatepicker: function(O) {
            this.maxRows = 4;
            j = O;
            O.dpDiv.empty().append(this._generateHTML(O));
            this._attachHandlers(O);
            O.dpDiv.find("." + this._dayOverClass + " a");
            var Q, M = this._getNumberOfMonths(O), P = M[1], N = 17;
            O.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (P > 1) {
                O.dpDiv.addClass("ui-datepicker-multi-" + P).css("width", (N * P) + "em")
            }
            O.dpDiv[(M[0] !== 1 || M[1] !== 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            O.dpDiv[(this._get(O, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (O.yearshtml) {
                Q = O.yearshtml;
                setTimeout(function() {
                    if (Q === O.yearshtml && O.yearshtml) {
                        O.dpDiv.find("select.ui-datepicker-year:first").replaceWith(O.yearshtml)
                    }
                    Q = O.yearshtml = null
                }, 0)
            }
        },
        _shouldFocusInput: function(M) {
            return M.input && M.input.is(":visible") && !M.input.is(":disabled") && !M.input.is(":focus")
        },
        _checkOffset: function(R, P, O) {
            var Q = R.dpDiv.outerWidth()
              , U = R.dpDiv.outerHeight()
              , T = R.input ? R.input.outerWidth() : 0
              , M = R.input ? R.input.outerHeight() : 0
              , S = document.documentElement.clientWidth + (O ? 0 : y(document).scrollLeft())
              , N = document.documentElement.clientHeight + (O ? 0 : y(document).scrollTop());
            P.left -= (this._get(R, "isRTL") ? (Q - T) : 0);
            P.left -= (O && P.left === R.input.offset().left) ? y(document).scrollLeft() : 0;
            P.top -= (O && P.top === (R.input.offset().top + M)) ? y(document).scrollTop() : 0;
            P.left -= Math.min(P.left, (P.left + Q > S && S > Q) ? Math.abs(P.left + Q - S) : 0);
            P.top -= Math.min(P.top, (P.top + U > N && N > U) ? Math.abs(U + M) : 0);
            return P
        },
        _findPos: function(P) {
            var M, O = this._getInst(P), N = this._get(O, "isRTL");
            while (P && (P.type === "hidden" || P.nodeType !== 1 || y.expr.filters.hidden(P))) {
                P = P[N ? "previousSibling" : "nextSibling"]
            }
            M = y(P).offset();
            return [M.left, M.top]
        },
        _hideDatepicker: function(O) {
            var N, R, Q, M, P = this._curInst;
            if (!P || (O && P !== y.data(O, "datepicker"))) {
                return
            }
            if (this._datepickerShowing) {
                N = this._get(P, "showAnim");
                R = this._get(P, "duration");
                Q = function() {
                    y.datepicker._tidyDialog(P)
                }
                ;
                if (y.effects && (y.effects.effect[N] || y.effects[N])) {
                    P.dpDiv.hide(N, y.datepicker._get(P, "showOptions"), R, Q)
                } else {
                    P.dpDiv[(N === "slideDown" ? "slideUp" : (N === "fadeIn" ? "fadeOut" : "hide"))]((N ? R : null), Q)
                }
                if (!N) {
                    Q()
                }
                this._datepickerShowing = false;
                M = this._get(P, "onClose");
                if (M) {
                    M.apply((P.input ? P.input[0] : null), [(P.input ? P.input.val() : ""), P])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (y.blockUI) {
                        y.unblockUI();
                        y("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        },
        _tidyDialog: function(M) {
            M.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(N) {
            if (!y.datepicker._curInst) {
                return
            }
            var M = y(N.target)
              , O = y.datepicker._getInst(M[0]);
            if (((M[0].id !== y.datepicker._mainDivId && M.parents("#" + y.datepicker._mainDivId).length === 0 && !M.hasClass(y.datepicker.markerClassName) && !M.closest("." + y.datepicker._triggerClass).length && y.datepicker._datepickerShowing && !(y.datepicker._inDialog && y.blockUI))) || (M.hasClass(y.datepicker.markerClassName) && y.datepicker._curInst !== O)) {
                y.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function(Q, P, O) {
            var N = y(Q)
              , M = this._getInst(N[0]);
            if (this._isDisabledDatepicker(N[0])) {
                return
            }
            this._adjustInstDate(M, P + (O === "M" ? this._get(M, "showCurrentAtPos") : 0), O);
            this._updateDatepicker(M)
        },
        _gotoToday: function(P) {
            var M, O = y(P), N = this._getInst(O[0]);
            if (this._get(N, "gotoCurrent") && N.currentDay) {
                N.selectedDay = N.currentDay;
                N.drawMonth = N.selectedMonth = N.currentMonth;
                N.drawYear = N.selectedYear = N.currentYear
            } else {
                M = new Date();
                N.selectedDay = M.getDate();
                N.drawMonth = N.selectedMonth = M.getMonth();
                N.drawYear = N.selectedYear = M.getFullYear()
            }
            this._notifyChange(N);
            this._adjustDate(O);
            if (N.input) {
                N.input.trigger("blur")
            }
        },
        _selectMonthYear: function(Q, M, P) {
            var O = y(Q)
              , N = this._getInst(O[0]);
            N["selected" + (P === "M" ? "Month" : "Year")] = N["draw" + (P === "M" ? "Month" : "Year")] = parseInt(M.options[M.selectedIndex].value, 10);
            this._notifyChange(N);
            this._adjustDate(O)
        },
        _selectDay: function(R, P, M, Q) {
            var N, O = y(R);
            if (y(Q).hasClass(this._unselectableClass) || this._isDisabledDatepicker(O[0])) {
                return
            }
            N = this._getInst(O[0]);
            N.selectedDay = N.currentDay = y("a", Q).html();
            N.selectedMonth = N.currentMonth = P;
            N.selectedYear = N.currentYear = M;
            this._selectDate(R, this._formatDate(N, N.currentDay, N.currentMonth, N.currentYear))
        },
        _clearDate: function(N) {
            var M = y(N);
            this._selectDate(M, "")
        },
        _selectDate: function(Q, M) {
            var N, P = y(Q), O = this._getInst(P[0]);
            M = (M != null ? M : this._formatDate(O));
            if (O.input) {
                O.input.val(M)
            }
            this._updateAlternate(O);
            N = this._get(O, "onSelect");
            if (N) {
                N.apply((O.input ? O.input[0] : null), [M, O])
            } else {
                if (O.input) {
                    O.input.trigger("change")
                }
            }
            if (O.inline) {
                this._updateDatepicker(O)
            } else {
                this._hideDatepicker();
                this._lastInput = O.input[0];
                if (typeof (O.input[0]) !== "object") {
                    O.input.focus()
                }
                this._lastInput = null
            }
        },
        _updateAlternate: function(Q) {
            var P, O, M, N = this._get(Q, "altField");
            if (N) {
                P = this._get(Q, "altFormat") || this._get(Q, "dateFormat");
                O = this._getDate(Q);
                M = this.formatDate(P, O, this._getFormatConfig(Q));
                y(N).each(function() {
                    y(this).val(M)
                })
            }
        },
        noWeekends: function(N) {
            var M = N.getDay();
            return [(M > 0 && M < 6), ""]
        },
        iso8601Week: function(M) {
            var N, O = new Date(M.getTime());
            O.setDate(O.getDate() + 4 - (O.getDay() || 7));
            N = O.getTime();
            O.setMonth(0);
            O.setDate(1);
            return Math.floor(Math.round((N - O) / 86400000) / 7) + 1
        },
        parseDate: function(ac, X, ae) {
            if (ac == null || X == null) {
                throw "Invalid arguments"
            }
            X = (typeof X === "object" ? X.toString() : X + "");
            if (X === "") {
                return null
            }
            var P, Z, N, ad = 0, S = (ae ? ae.shortYearCutoff : null) || this._defaults.shortYearCutoff, O = (typeof S !== "string" ? S : new Date().getFullYear() % 100 + parseInt(S, 10)), V = (ae ? ae.dayNamesShort : null) || this._defaults.dayNamesShort, ag = (ae ? ae.dayNames : null) || this._defaults.dayNames, M = (ae ? ae.monthNamesShort : null) || this._defaults.monthNamesShort, Q = (ae ? ae.monthNames : null) || this._defaults.monthNames, R = -1, ah = -1, ab = -1, U = -1, aa = false, af, W = function(aj) {
                var ak = (P + 1 < ac.length && ac.charAt(P + 1) === aj);
                if (ak) {
                    P++
                }
                return ak
            }, ai = function(al) {
                var aj = W(al)
                  , am = (al === "@" ? 14 : (al === "!" ? 20 : (al === "y" && aj ? 4 : (al === "o" ? 3 : 2))))
                  , an = new RegExp("^\\d{1," + am + "}")
                  , ak = X.substring(ad).match(an);
                if (!ak) {
                    throw "Missing number at position " + ad
                }
                ad += ak[0].length;
                return parseInt(ak[0], 10)
            }, T = function(ak, al, an) {
                var aj = -1
                  , am = y.map(W(ak) ? an : al, function(ap, ao) {
                    return [[ao, ap]]
                }).sort(function(ap, ao) {
                    return -(ap[1].length - ao[1].length)
                });
                y.each(am, function(ap, aq) {
                    var ao = aq[1];
                    if (X.substr(ad, ao.length).toLowerCase() === ao.toLowerCase()) {
                        aj = aq[0];
                        ad += ao.length;
                        return false
                    }
                });
                if (aj !== -1) {
                    return aj + 1
                } else {
                    throw "Unknown name at position " + ad
                }
            }, Y = function() {
                if (X.charAt(ad) !== ac.charAt(P)) {
                    throw "Unexpected literal at position " + ad
                }
                ad++
            };
            for (P = 0; P < ac.length; P++) {
                if (aa) {
                    if (ac.charAt(P) === "'" && !W("'")) {
                        aa = false
                    } else {
                        Y()
                    }
                } else {
                    switch (ac.charAt(P)) {
                    case "d":
                        ab = ai("d");
                        break;
                    case "D":
                        T("D", V, ag);
                        break;
                    case "o":
                        U = ai("o");
                        break;
                    case "m":
                        ah = ai("m");
                        break;
                    case "M":
                        ah = T("M", M, Q);
                        break;
                    case "y":
                        R = ai("y");
                        break;
                    case "@":
                        af = new Date(ai("@"));
                        R = af.getFullYear();
                        ah = af.getMonth() + 1;
                        ab = af.getDate();
                        break;
                    case "!":
                        af = new Date((ai("!") - this._ticksTo1970) / 10000);
                        R = af.getFullYear();
                        ah = af.getMonth() + 1;
                        ab = af.getDate();
                        break;
                    case "'":
                        if (W("'")) {
                            Y()
                        } else {
                            aa = true
                        }
                        break;
                    default:
                        Y()
                    }
                }
            }
            if (ad < X.length) {
                N = X.substr(ad);
                if (!/^\s+/.test(N)) {
                    throw "Extra/unparsed characters found in date: " + N
                }
            }
            if (R === -1) {
                R = new Date().getFullYear()
            } else {
                if (R < 100) {
                    R += new Date().getFullYear() - new Date().getFullYear() % 100 + (R <= O ? 0 : -100)
                }
            }
            if (U > -1) {
                ah = 1;
                ab = U;
                do {
                    Z = this._getDaysInMonth(R, ah - 1);
                    if (ab <= Z) {
                        break
                    }
                    ah++;
                    ab -= Z
                } while (true)
            }
            af = this._daylightSavingAdjust(new Date(R,ah - 1,ab));
            if (af.getFullYear() !== R || af.getMonth() + 1 !== ah || af.getDate() !== ab) {
                throw "Invalid date"
            }
            return af
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function(V, P, Q) {
            if (!P) {
                return ""
            }
            var X, Y = (Q ? Q.dayNamesShort : null) || this._defaults.dayNamesShort, N = (Q ? Q.dayNames : null) || this._defaults.dayNames, T = (Q ? Q.monthNamesShort : null) || this._defaults.monthNamesShort, R = (Q ? Q.monthNames : null) || this._defaults.monthNames, W = function(Z) {
                var aa = (X + 1 < V.length && V.charAt(X + 1) === Z);
                if (aa) {
                    X++
                }
                return aa
            }, M = function(ab, ac, Z) {
                var aa = "" + ac;
                if (W(ab)) {
                    while (aa.length < Z) {
                        aa = "0" + aa
                    }
                }
                return aa
            }, S = function(Z, ab, aa, ac) {
                return (W(Z) ? ac[ab] : aa[ab])
            }, O = "", U = false;
            if (P) {
                for (X = 0; X < V.length; X++) {
                    if (U) {
                        if (V.charAt(X) === "'" && !W("'")) {
                            U = false
                        } else {
                            O += V.charAt(X)
                        }
                    } else {
                        switch (V.charAt(X)) {
                        case "d":
                            O += M("d", P.getDate(), 2);
                            break;
                        case "D":
                            O += S("D", P.getDay(), Y, N);
                            break;
                        case "o":
                            O += M("o", Math.round((new Date(P.getFullYear(),P.getMonth(),P.getDate()).getTime() - new Date(P.getFullYear(),0,0).getTime()) / 86400000), 3);
                            break;
                        case "m":
                            O += M("m", P.getMonth() + 1, 2);
                            break;
                        case "M":
                            O += S("M", P.getMonth(), T, R);
                            break;
                        case "y":
                            O += (W("y") ? P.getFullYear() : (P.getYear() % 100 < 10 ? "0" : "") + P.getYear() % 100);
                            break;
                        case "@":
                            O += P.getTime();
                            break;
                        case "!":
                            O += P.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (W("'")) {
                                O += "'"
                            } else {
                                U = true
                            }
                            break;
                        default:
                            O += V.charAt(X)
                        }
                    }
                }
            }
            return O
        },
        _possibleChars: function(Q) {
            var P, O = "", N = false, M = function(R) {
                var S = (P + 1 < Q.length && Q.charAt(P + 1) === R);
                if (S) {
                    P++
                }
                return S
            };
            for (P = 0; P < Q.length; P++) {
                if (N) {
                    if (Q.charAt(P) === "'" && !M("'")) {
                        N = false
                    } else {
                        O += Q.charAt(P)
                    }
                } else {
                    switch (Q.charAt(P)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        O += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        if (M("'")) {
                            O += "'"
                        } else {
                            N = true
                        }
                        break;
                    default:
                        O += Q.charAt(P)
                    }
                }
            }
            return O
        },
        _get: function(N, M) {
            return N.settings[M] !== undefined ? N.settings[M] : this._defaults[M]
        },
        _setDateFromField: function(R, O) {
            if (R.input.val() === R.lastVal) {
                return
            }
            var M = this._get(R, "dateFormat")
              , T = R.lastVal = R.input ? R.input.val() : null
              , S = this._getDefaultDate(R)
              , N = S
              , P = this._getFormatConfig(R);
            try {
                N = this.parseDate(M, T, P) || S
            } catch (Q) {
                T = (O ? "" : T)
            }
            R.selectedDay = N.getDate();
            R.drawMonth = R.selectedMonth = N.getMonth();
            R.drawYear = R.selectedYear = N.getFullYear();
            R.currentDay = (T ? N.getDate() : 0);
            R.currentMonth = (T ? N.getMonth() : 0);
            R.currentYear = (T ? N.getFullYear() : 0);
            this._adjustInstDate(R)
        },
        _getDefaultDate: function(M) {
            return this._restrictMinMax(M, this._determineDate(M, this._get(M, "defaultDate"), new Date()))
        },
        _determineDate: function(Q, N, R) {
            var P = function(T) {
                var S = new Date();
                S.setDate(S.getDate() + T);
                return S
            }
              , O = function(Z) {
                try {
                    return y.datepicker.parseDate(y.datepicker._get(Q, "dateFormat"), Z, y.datepicker._getFormatConfig(Q))
                } catch (Y) {}
                var T = (Z.toLowerCase().match(/^c/) ? y.datepicker._getDate(Q) : null) || new Date()
                  , U = T.getFullYear()
                  , X = T.getMonth()
                  , S = T.getDate()
                  , W = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g
                  , V = W.exec(Z);
                while (V) {
                    switch (V[2] || "d") {
                    case "d":
                    case "D":
                        S += parseInt(V[1], 10);
                        break;
                    case "w":
                    case "W":
                        S += parseInt(V[1], 10) * 7;
                        break;
                    case "m":
                    case "M":
                        X += parseInt(V[1], 10);
                        S = Math.min(S, y.datepicker._getDaysInMonth(U, X));
                        break;
                    case "y":
                    case "Y":
                        U += parseInt(V[1], 10);
                        S = Math.min(S, y.datepicker._getDaysInMonth(U, X));
                        break
                    }
                    V = W.exec(Z)
                }
                return new Date(U,X,S)
            }
              , M = (N == null || N === "" ? R : (typeof N === "string" ? O(N) : (typeof N === "number" ? (isNaN(N) ? R : P(N)) : new Date(N.getTime()))));
            M = (M && M.toString() === "Invalid Date" ? R : M);
            if (M) {
                M.setHours(0);
                M.setMinutes(0);
                M.setSeconds(0);
                M.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(M)
        },
        _daylightSavingAdjust: function(M) {
            if (!M) {
                return null
            }
            M.setHours(M.getHours() > 12 ? M.getHours() + 2 : 0);
            return M
        },
        _setDate: function(S, P, R) {
            var M = !P
              , O = S.selectedMonth
              , Q = S.selectedYear
              , N = this._restrictMinMax(S, this._determineDate(S, P, new Date()));
            S.selectedDay = S.currentDay = N.getDate();
            S.drawMonth = S.selectedMonth = S.currentMonth = N.getMonth();
            S.drawYear = S.selectedYear = S.currentYear = N.getFullYear();
            if ((O !== S.selectedMonth || Q !== S.selectedYear) && !R) {
                this._notifyChange(S)
            }
            this._adjustInstDate(S);
            if (S.input) {
                S.input.val(M ? "" : this._formatDate(S))
            }
        },
        _getDate: function(N) {
            var M = (!N.currentYear || (N.input && N.input.val() === "") ? null : this._daylightSavingAdjust(new Date(N.currentYear,N.currentMonth,N.currentDay)));
            return M
        },
        _attachHandlers: function(N) {
            var M = this._get(N, "stepMonths")
              , O = "#" + N.id.replace(/\\\\/g, "\\");
            N.dpDiv.find("[data-handler]").map(function() {
                var P = {
                    prev: function() {
                        y.datepicker._adjustDate(O, -M, "M")
                    },
                    next: function() {
                        y.datepicker._adjustDate(O, +M, "M")
                    },
                    hide: function() {
                        y.datepicker._hideDatepicker()
                    },
                    today: function() {
                        y.datepicker._gotoToday(O)
                    },
                    selectDay: function() {
                        y.datepicker._selectDay(O, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    },
                    selectMonth: function() {
                        y.datepicker._selectMonthYear(O, this, "M");
                        return false
                    },
                    selectYear: function() {
                        y.datepicker._selectMonthYear(O, this, "Y");
                        return false
                    }
                };
                y(this).bind(this.getAttribute("data-event"), P[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(aD) {
            var af, ae, ay, ap, Q, aH, aB, au, aK, an, aO, X, Z, Y, N, aG, V, ai, aJ, aw, aP, ah, am, W, R, az, ar, av, at, U, ak, aa, aC, aF, P, aI, aM, aq, ab, aE = new Date(), ag = this._daylightSavingAdjust(new Date(aE.getFullYear(),aE.getMonth(),aE.getDate())), aL = this._get(aD, "isRTL"), aN = this._get(aD, "showButtonPanel"), ax = this._get(aD, "hideIfNoPrevNext"), al = this._get(aD, "navigationAsDateFormat"), ac = this._getNumberOfMonths(aD), T = this._get(aD, "showCurrentAtPos"), ao = this._get(aD, "stepMonths"), aj = (ac[0] !== 1 || ac[1] !== 1), O = this._daylightSavingAdjust((!aD.currentDay ? new Date(9999,9,9) : new Date(aD.currentYear,aD.currentMonth,aD.currentDay))), S = this._getMinMaxDate(aD, "min"), ad = this._getMinMaxDate(aD, "max"), M = aD.drawMonth - T, aA = aD.drawYear;
            if (M < 0) {
                M += 12;
                aA--
            }
            if (ad) {
                af = this._daylightSavingAdjust(new Date(ad.getFullYear(),ad.getMonth() - (ac[0] * ac[1]) + 1,ad.getDate()));
                af = (S && af < S ? S : af);
                while (this._daylightSavingAdjust(new Date(aA,M,1)) > af) {
                    M--;
                    if (M < 0) {
                        M = 11;
                        aA--
                    }
                }
            }
            aD.drawMonth = M;
            aD.drawYear = aA;
            ae = this._get(aD, "prevText");
            ae = (!al ? ae : this.formatDate(ae, this._daylightSavingAdjust(new Date(aA,M - ao,1)), this._getFormatConfig(aD)));
            ay = (this._canAdjustMonth(aD, -1, aA, M) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + ae + "'><span class='ui-icon ui-icon-circle-triangle-" + (aL ? "e" : "w") + "'>" + ae + "</span></a>" : (ax ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + ae + "'><span class='ui-icon ui-icon-circle-triangle-" + (aL ? "e" : "w") + "'>" + ae + "</span></a>"));
            ap = this._get(aD, "nextText");
            ap = (!al ? ap : this.formatDate(ap, this._daylightSavingAdjust(new Date(aA,M + ao,1)), this._getFormatConfig(aD)));
            Q = (this._canAdjustMonth(aD, +1, aA, M) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + ap + "'><span class='ui-icon ui-icon-circle-triangle-" + (aL ? "w" : "e") + "'>" + ap + "</span></a>" : (ax ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + ap + "'><span class='ui-icon ui-icon-circle-triangle-" + (aL ? "w" : "e") + "'>" + ap + "</span></a>"));
            aH = this._get(aD, "currentText");
            aB = (this._get(aD, "gotoCurrent") && aD.currentDay ? O : ag);
            aH = (!al ? aH : this.formatDate(aH, aB, this._getFormatConfig(aD)));
            au = (!aD.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(aD, "closeText") + "</button>" : "");
            aK = (aN) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (aL ? au : "") + (this._isInRange(aD, aB) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + aH + "</button>" : "") + (aL ? "" : au) + "</div>" : "";
            an = parseInt(this._get(aD, "firstDay"), 10);
            an = (isNaN(an) ? 0 : an);
            aO = this._get(aD, "showWeek");
            X = this._get(aD, "dayNames");
            Z = this._get(aD, "dayNamesMin");
            Y = this._get(aD, "monthNames");
            N = this._get(aD, "monthNamesShort");
            aG = this._get(aD, "beforeShowDay");
            V = this._get(aD, "showOtherMonths");
            ai = this._get(aD, "selectOtherMonths");
            aJ = this._getDefaultDate(aD);
            aw = "";
            aP;
            for (ah = 0; ah < ac[0]; ah++) {
                am = "";
                this.maxRows = 4;
                for (W = 0; W < ac[1]; W++) {
                    R = this._daylightSavingAdjust(new Date(aA,M,aD.selectedDay));
                    az = " ui-corner-all";
                    ar = "";
                    if (aj) {
                        ar += "<div class='ui-datepicker-group";
                        if (ac[1] > 1) {
                            switch (W) {
                            case 0:
                                ar += " ui-datepicker-group-first";
                                az = " ui-corner-" + (aL ? "right" : "left");
                                break;
                            case ac[1] - 1:
                                ar += " ui-datepicker-group-last";
                                az = " ui-corner-" + (aL ? "left" : "right");
                                break;
                            default:
                                ar += " ui-datepicker-group-middle";
                                az = "";
                                break
                            }
                        }
                        ar += "'>"
                    }
                    ar += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + az + "'>" + (/all|left/.test(az) && ah === 0 ? (aL ? Q : ay) : "") + (/all|right/.test(az) && ah === 0 ? (aL ? ay : Q) : "") + this._generateMonthYearHeader(aD, M, aA, S, ad, ah > 0 || W > 0, Y, N) + "</div><table class='ui-datepicker-calendar'><thead><tr>";
                    av = (aO ? "<th class='ui-datepicker-week-col'>" + this._get(aD, "weekHeader") + "</th>" : "");
                    for (aP = 0; aP < 7; aP++) {
                        at = (aP + an) % 7;
                        av += "<th scope='col'" + ((aP + an + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + X[at] + "'>" + Z[at] + "</span></th>"
                    }
                    ar += av + "</tr></thead><tbody>";
                    U = this._getDaysInMonth(aA, M);
                    if (aA === aD.selectedYear && M === aD.selectedMonth) {
                        aD.selectedDay = Math.min(aD.selectedDay, U)
                    }
                    ak = (this._getFirstDayOfMonth(aA, M) - an + 7) % 7;
                    aa = Math.ceil((ak + U) / 7);
                    aC = (aj ? this.maxRows > aa ? this.maxRows : aa : aa);
                    this.maxRows = aC;
                    aF = this._daylightSavingAdjust(new Date(aA,M,1 - ak));
                    for (P = 0; P < aC; P++) {
                        ar += "<tr>";
                        aI = (!aO ? "" : "<td class='ui-datepicker-week-col'>" + this._get(aD, "calculateWeek")(aF) + "</td>");
                        for (aP = 0; aP < 7; aP++) {
                            aM = (aG ? aG.apply((aD.input ? aD.input[0] : null), [aF]) : [true, ""]);
                            aq = (aF.getMonth() !== M);
                            ab = (aq && !ai) || !aM[0] || (S && aF < S) || (ad && aF > ad);
                            aI += "<td class='" + ((aP + an + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (aq ? " ui-datepicker-other-month" : "") + ((aF.getTime() === R.getTime() && M === aD.selectedMonth && aD._keyEvent) || (aJ.getTime() === aF.getTime() && aJ.getTime() === R.getTime()) ? " " + this._dayOverClass : "") + (ab ? " " + this._unselectableClass + " ui-state-disabled" : "") + (aq && !V ? "" : " " + aM[1] + (aF.getTime() === O.getTime() ? " " + this._currentClass : "") + (aF.getTime() === ag.getTime() ? " ui-datepicker-today" : "")) + "'" + ((!aq || V) && aM[2] ? " title='" + aM[2].replace(/'/g, "&#39;") + "'" : "") + (ab ? "" : " data-handler='selectDay' data-event='click' data-month='" + aF.getMonth() + "' data-year='" + aF.getFullYear() + "'") + ">" + (aq && !V ? "&#xa0;" : (ab ? "<span class='ui-state-default'>" + aF.getDate() + "</span>" : "<a class='ui-state-default" + (aF.getTime() === ag.getTime() ? " ui-state-highlight" : "") + (aF.getTime() === O.getTime() ? " ui-state-active" : "") + (aq ? " ui-priority-secondary" : "") + "' href='#'>" + aF.getDate() + "</a>")) + "</td>";
                            aF.setDate(aF.getDate() + 1);
                            aF = this._daylightSavingAdjust(aF)
                        }
                        ar += aI + "</tr>"
                    }
                    M++;
                    if (M > 11) {
                        M = 0;
                        aA++
                    }
                    ar += "</tbody></table>" + (aj ? "</div>" + ((ac[0] > 0 && W === ac[1] - 1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
                    am += ar
                }
                aw += am
            }
            aw += aK;
            aD._keyEvent = false;
            return aw
        },
        _generateMonthYearHeader: function(Q, O, Y, S, W, Z, U, M) {
            var ad, N, ae, ab, R, aa, X, T, P = this._get(Q, "changeMonth"), af = this._get(Q, "changeYear"), ag = this._get(Q, "showMonthAfterYear"), V = "<div class='ui-datepicker-title'>", ac = "";
            if (Z || !P) {
                ac += "<span class='ui-datepicker-month'>" + U[O] + "</span>"
            } else {
                ad = (S && S.getFullYear() === Y);
                N = (W && W.getFullYear() === Y);
                ac += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
                for (ae = 0; ae < 12; ae++) {
                    if ((!ad || ae >= S.getMonth()) && (!N || ae <= W.getMonth())) {
                        ac += "<option value='" + ae + "'" + (ae === O ? " selected='selected'" : "") + ">" + M[ae] + "</option>"
                    }
                }
                ac += "</select>"
            }
            if (!ag) {
                V += ac + (Z || !(P && af) ? "&#xa0;" : "")
            }
            if (!Q.yearshtml) {
                Q.yearshtml = "";
                if (Z || !af) {
                    V += "<span class='ui-datepicker-year'>" + Y + "</span>"
                } else {
                    ab = this._get(Q, "yearRange").split(":");
                    R = new Date().getFullYear();
                    aa = function(ai) {
                        var ah = (ai.match(/c[+\-].*/) ? Y + parseInt(ai.substring(1), 10) : (ai.match(/[+\-].*/) ? R + parseInt(ai, 10) : parseInt(ai, 10)));
                        return (isNaN(ah) ? R : ah)
                    }
                    ;
                    X = aa(ab[0]);
                    T = Math.max(X, aa(ab[1] || ""));
                    X = (S ? Math.max(X, S.getFullYear()) : X);
                    T = (W ? Math.min(T, W.getFullYear()) : T);
                    Q.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
                    for (; X <= T; X++) {
                        Q.yearshtml += "<option value='" + X + "'" + (X === Y ? " selected='selected'" : "") + ">" + X + "</option>"
                    }
                    Q.yearshtml += "</select>";
                    V += Q.yearshtml;
                    Q.yearshtml = null
                }
            }
            V += this._get(Q, "yearSuffix");
            if (ag) {
                V += (Z || !(P && af) ? "&#xa0;" : "") + ac
            }
            V += "</div>";
            return V
        },
        _adjustInstDate: function(P, S, R) {
            var O = P.drawYear + (R === "Y" ? S : 0)
              , Q = P.drawMonth + (R === "M" ? S : 0)
              , M = Math.min(P.selectedDay, this._getDaysInMonth(O, Q)) + (R === "D" ? S : 0)
              , N = this._restrictMinMax(P, this._daylightSavingAdjust(new Date(O,Q,M)));
            P.selectedDay = N.getDate();
            P.drawMonth = P.selectedMonth = N.getMonth();
            P.drawYear = P.selectedYear = N.getFullYear();
            if (R === "M" || R === "Y") {
                this._notifyChange(P)
            }
        },
        _restrictMinMax: function(P, N) {
            var O = this._getMinMaxDate(P, "min")
              , Q = this._getMinMaxDate(P, "max")
              , M = (O && N < O ? O : N);
            return (Q && M > Q ? Q : M)
        },
        _notifyChange: function(N) {
            var M = this._get(N, "onChangeMonthYear");
            if (M) {
                M.apply((N.input ? N.input[0] : null), [N.selectedYear, N.selectedMonth + 1, N])
            }
        },
        _getNumberOfMonths: function(N) {
            var M = this._get(N, "numberOfMonths");
            return (M == null ? [1, 1] : (typeof M === "number" ? [1, M] : M))
        },
        _getMinMaxDate: function(N, M) {
            return this._determineDate(N, this._get(N, M + "Date"), null)
        },
        _getDaysInMonth: function(M, N) {
            return 32 - this._daylightSavingAdjust(new Date(M,N,32)).getDate()
        },
        _getFirstDayOfMonth: function(M, N) {
            return new Date(M,N,1).getDay()
        },
        _canAdjustMonth: function(P, R, O, Q) {
            var M = this._getNumberOfMonths(P)
              , N = this._daylightSavingAdjust(new Date(O,Q + (R < 0 ? R : M[0] * M[1]),1));
            if (R < 0) {
                N.setDate(this._getDaysInMonth(N.getFullYear(), N.getMonth()))
            }
            return this._isInRange(P, N)
        },
        _isInRange: function(Q, O) {
            var N, T, P = this._getMinMaxDate(Q, "min"), M = this._getMinMaxDate(Q, "max"), U = null, R = null, S = this._get(Q, "yearRange");
            if (S) {
                N = S.split(":");
                T = new Date().getFullYear();
                U = parseInt(N[0], 10);
                R = parseInt(N[1], 10);
                if (N[0].match(/[+\-].*/)) {
                    U += T
                }
                if (N[1].match(/[+\-].*/)) {
                    R += T
                }
            }
            return ((!P || O.getTime() >= P.getTime()) && (!M || O.getTime() <= M.getTime()) && (!U || O.getFullYear() >= U) && (!R || O.getFullYear() <= R))
        },
        _getFormatConfig: function(M) {
            var N = this._get(M, "shortYearCutoff");
            N = (typeof N !== "string" ? N : new Date().getFullYear() % 100 + parseInt(N, 10));
            return {
                shortYearCutoff: N,
                dayNamesShort: this._get(M, "dayNamesShort"),
                dayNames: this._get(M, "dayNames"),
                monthNamesShort: this._get(M, "monthNamesShort"),
                monthNames: this._get(M, "monthNames")
            }
        },
        _formatDate: function(P, M, Q, O) {
            if (!M) {
                P.currentDay = P.selectedDay;
                P.currentMonth = P.selectedMonth;
                P.currentYear = P.selectedYear
            }
            var N = (M ? (typeof M === "object" ? M : this._daylightSavingAdjust(new Date(O,Q,M))) : this._daylightSavingAdjust(new Date(P.currentYear,P.currentMonth,P.currentDay)));
            return this.formatDate(this._get(P, "dateFormat"), N, this._getFormatConfig(P))
        }
    });
    function g(N) {
        var M = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return N.delegate(M, "mouseout", function() {
            y(this).removeClass("ui-state-hover");
            if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                y(this).removeClass("ui-datepicker-prev-hover")
            }
            if (this.className.indexOf("ui-datepicker-next") !== -1) {
                y(this).removeClass("ui-datepicker-next-hover")
            }
        }).delegate(M, "mouseover", function() {
            if (!y.datepicker._isDisabledDatepicker(j.inline ? N.parent()[0] : j.input[0])) {
                y(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                y(this).addClass("ui-state-hover");
                if (this.className.indexOf("ui-datepicker-prev") !== -1) {
                    y(this).addClass("ui-datepicker-prev-hover")
                }
                if (this.className.indexOf("ui-datepicker-next") !== -1) {
                    y(this).addClass("ui-datepicker-next-hover")
                }
            }
        })
    }
    function p(O, N) {
        y.extend(O, N);
        for (var M in N) {
            if (N[M] == null) {
                O[M] = N[M]
            }
        }
        return O
    }
    y.fn.datepicker = function(N) {
        if (!this.length) {
            return this
        }
        if (!y.datepicker.initialized) {
            y(document).mousedown(y.datepicker._checkExternalClick);
            y.datepicker.initialized = true
        }
        if (y("#" + y.datepicker._mainDivId).length === 0) {
            y("body").append(y.datepicker.dpDiv)
        }
        var M = Array.prototype.slice.call(arguments, 1);
        if (typeof N === "string" && (N === "isDisabled" || N === "getDate" || N === "widget")) {
            return y.datepicker["_" + N + "Datepicker"].apply(y.datepicker, [this[0]].concat(M))
        }
        if (N === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
            return y.datepicker["_" + N + "Datepicker"].apply(y.datepicker, [this[0]].concat(M))
        }
        return this.each(function() {
            typeof N === "string" ? y.datepicker["_" + N + "Datepicker"].apply(y.datepicker, [this].concat(M)) : y.datepicker._attachDatepicker(this, N)
        })
    }
    ;
    y.datepicker = new K();
    y.datepicker.initialized = false;
    y.datepicker.uuid = new Date().getTime();
    y.datepicker.version = "1.11.0";
    var u = y.datepicker;
    /*!
 * jQuery UI Slider 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slider/
 */
    var f = y.widget("ui.slider", y.ui.mouse, {
        version: "1.11.0",
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = false;
            this._mouseSliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = false
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var P, M, N = this.options, R = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), Q = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>", O = [];
            M = (N.values && N.values.length) || 1;
            if (R.length > M) {
                R.slice(M).remove();
                R = R.slice(0, M)
            }
            for (P = R.length; P < M; P++) {
                O.push(Q)
            }
            this.handles = R.add(y(O.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function(S) {
                y(this).data("ui-slider-handle-index", S)
            })
        },
        _createRange: function() {
            var M = this.options
              , N = "";
            if (M.range) {
                if (M.range === true) {
                    if (!M.values) {
                        M.values = [this._valueMin(), this._valueMin()]
                    } else {
                        if (M.values.length && M.values.length !== 2) {
                            M.values = [M.values[0], M.values[0]]
                        } else {
                            if (y.isArray(M.values)) {
                                M.values = M.values.slice(0)
                            }
                        }
                    }
                }
                if (!this.range || !this.range.length) {
                    this.range = y("<div></div>").appendTo(this.element);
                    N = "ui-slider-range ui-widget-header ui-corner-all"
                } else {
                    this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                        left: "",
                        bottom: ""
                    })
                }
                this.range.addClass(N + ((M.range === "min" || M.range === "max") ? " ui-slider-range-" + M.range : ""))
            } else {
                if (this.range) {
                    this.range.remove()
                }
                this.range = null
            }
        },
        _setupEvents: function() {
            this._off(this.handles);
            this._on(this.handles, this._handleEvents);
            this._hoverable(this.handles);
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove();
            if (this.range) {
                this.range.remove()
            }
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function(O) {
            var S, V, N, Q, U, W, R, M, T = this, P = this.options;
            if (P.disabled) {
                return false
            }
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            S = {
                x: O.pageX,
                y: O.pageY
            };
            V = this._normValueFromMouse(S);
            N = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function(X) {
                var Y = Math.abs(V - T.values(X));
                if ((N > Y) || (N === Y && (X === T._lastChangedValue || T.values(X) === P.min))) {
                    N = Y;
                    Q = y(this);
                    U = X
                }
            });
            W = this._start(O, U);
            if (W === false) {
                return false
            }
            this._mouseSliding = true;
            this._handleIndex = U;
            Q.addClass("ui-state-active").focus();
            R = Q.offset();
            M = !y(O.target).parents().addBack().is(".ui-slider-handle");
            this._clickOffset = M ? {
                left: 0,
                top: 0
            } : {
                left: O.pageX - R.left - (Q.width() / 2),
                top: O.pageY - R.top - (Q.height() / 2) - (parseInt(Q.css("borderTopWidth"), 10) || 0) - (parseInt(Q.css("borderBottomWidth"), 10) || 0) + (parseInt(Q.css("marginTop"), 10) || 0)
            };
            if (!this.handles.hasClass("ui-state-hover")) {
                this._slide(O, U, V)
            }
            this._animateOff = true;
            return true
        },
        _mouseStart: function() {
            return true
        },
        _mouseDrag: function(O) {
            var M = {
                x: O.pageX,
                y: O.pageY
            }
              , N = this._normValueFromMouse(M);
            this._slide(O, this._handleIndex, N);
            return false
        },
        _mouseStop: function(M) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(M, this._handleIndex);
            this._change(M, this._handleIndex);
            this._handleIndex = null;
            this._clickOffset = null;
            this._animateOff = false;
            return false
        },
        _detectOrientation: function() {
            this.orientation = (this.options.orientation === "vertical") ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(N) {
            var M, Q, P, O, R;
            if (this.orientation === "horizontal") {
                M = this.elementSize.width;
                Q = N.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                M = this.elementSize.height;
                Q = N.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            P = (Q / M);
            if (P > 1) {
                P = 1
            }
            if (P < 0) {
                P = 0
            }
            if (this.orientation === "vertical") {
                P = 1 - P
            }
            O = this._valueMax() - this._valueMin();
            R = this._valueMin() + P * O;
            return this._trimAlignValue(R)
        },
        _start: function(O, N) {
            var M = {
                handle: this.handles[N],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                M.value = this.values(N);
                M.values = this.values()
            }
            return this._trigger("start", O, M)
        },
        _slide: function(Q, P, O) {
            var M, N, R;
            if (this.options.values && this.options.values.length) {
                M = this.values(P ? 0 : 1);
                if ((this.options.values.length === 2 && this.options.range === true) && ((P === 0 && O > M) || (P === 1 && O < M))) {
                    O = M
                }
                if (O !== this.values(P)) {
                    N = this.values();
                    N[P] = O;
                    R = this._trigger("slide", Q, {
                        handle: this.handles[P],
                        value: O,
                        values: N
                    });
                    M = this.values(P ? 0 : 1);
                    if (R !== false) {
                        this.values(P, O)
                    }
                }
            } else {
                if (O !== this.value()) {
                    R = this._trigger("slide", Q, {
                        handle: this.handles[P],
                        value: O
                    });
                    if (R !== false) {
                        this.value(O)
                    }
                }
            }
        },
        _stop: function(O, N) {
            var M = {
                handle: this.handles[N],
                value: this.value()
            };
            if (this.options.values && this.options.values.length) {
                M.value = this.values(N);
                M.values = this.values()
            }
            this._trigger("stop", O, M)
        },
        _change: function(O, N) {
            if (!this._keySliding && !this._mouseSliding) {
                var M = {
                    handle: this.handles[N],
                    value: this.value()
                };
                if (this.options.values && this.options.values.length) {
                    M.value = this.values(N);
                    M.values = this.values()
                }
                this._lastChangedValue = N;
                this._trigger("change", O, M)
            }
        },
        value: function(M) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(M);
                this._refreshValue();
                this._change(null, 0);
                return
            }
            return this._value()
        },
        values: function(N, Q) {
            var P, M, O;
            if (arguments.length > 1) {
                this.options.values[N] = this._trimAlignValue(Q);
                this._refreshValue();
                this._change(null, N);
                return
            }
            if (arguments.length) {
                if (y.isArray(arguments[0])) {
                    P = this.options.values;
                    M = arguments[0];
                    for (O = 0; O < P.length; O += 1) {
                        P[O] = this._trimAlignValue(M[O]);
                        this._change(null, O)
                    }
                    this._refreshValue()
                } else {
                    if (this.options.values && this.options.values.length) {
                        return this._values(N)
                    } else {
                        return this.value()
                    }
                }
            } else {
                return this._values()
            }
        },
        _setOption: function(N, O) {
            var M, P = 0;
            if (N === "range" && this.options.range === true) {
                if (O === "min") {
                    this.options.value = this._values(0);
                    this.options.values = null
                } else {
                    if (O === "max") {
                        this.options.value = this._values(this.options.values.length - 1);
                        this.options.values = null
                    }
                }
            }
            if (y.isArray(this.options.values)) {
                P = this.options.values.length
            }
            if (N === "disabled") {
                this.element.toggleClass("ui-state-disabled", !!O)
            }
            this._super(N, O);
            switch (N) {
            case "orientation":
                this._detectOrientation();
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                this._refreshValue();
                break;
            case "value":
                this._animateOff = true;
                this._refreshValue();
                this._change(null, 0);
                this._animateOff = false;
                break;
            case "values":
                this._animateOff = true;
                this._refreshValue();
                for (M = 0; M < P; M += 1) {
                    this._change(null, M)
                }
                this._animateOff = false;
                break;
            case "min":
            case "max":
                this._animateOff = true;
                this._refreshValue();
                this._animateOff = false;
                break;
            case "range":
                this._animateOff = true;
                this._refresh();
                this._animateOff = false;
                break
            }
        },
        _value: function() {
            var M = this.options.value;
            M = this._trimAlignValue(M);
            return M
        },
        _values: function(M) {
            var P, O, N;
            if (arguments.length) {
                P = this.options.values[M];
                P = this._trimAlignValue(P);
                return P
            } else {
                if (this.options.values && this.options.values.length) {
                    O = this.options.values.slice();
                    for (N = 0; N < O.length; N += 1) {
                        O[N] = this._trimAlignValue(O[N])
                    }
                    return O
                } else {
                    return []
                }
            }
        },
        _trimAlignValue: function(P) {
            if (P <= this._valueMin()) {
                return this._valueMin()
            }
            if (P >= this._valueMax()) {
                return this._valueMax()
            }
            var M = (this.options.step > 0) ? this.options.step : 1
              , O = (P - this._valueMin()) % M
              , N = P - O;
            if (Math.abs(O) * 2 >= M) {
                N += (O > 0) ? M : (-M)
            }
            return parseFloat(N.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var R, Q, U, S, V, P = this.options.range, O = this.options, T = this, N = (!this._animateOff) ? O.animate : false, M = {};
            if (this.options.values && this.options.values.length) {
                this.handles.each(function(W) {
                    Q = (T.values(W) - T._valueMin()) / (T._valueMax() - T._valueMin()) * 100;
                    M[T.orientation === "horizontal" ? "left" : "bottom"] = Q + "%";
                    y(this).stop(1, 1)[N ? "animate" : "css"](M, O.animate);
                    if (T.options.range === true) {
                        if (T.orientation === "horizontal") {
                            if (W === 0) {
                                T.range.stop(1, 1)[N ? "animate" : "css"]({
                                    left: Q + "%"
                                }, O.animate)
                            }
                            if (W === 1) {
                                T.range[N ? "animate" : "css"]({
                                    width: (Q - R) + "%"
                                }, {
                                    queue: false,
                                    duration: O.animate
                                })
                            }
                        } else {
                            if (W === 0) {
                                T.range.stop(1, 1)[N ? "animate" : "css"]({
                                    bottom: (Q) + "%"
                                }, O.animate)
                            }
                            if (W === 1) {
                                T.range[N ? "animate" : "css"]({
                                    height: (Q - R) + "%"
                                }, {
                                    queue: false,
                                    duration: O.animate
                                })
                            }
                        }
                    }
                    R = Q
                })
            } else {
                U = this.value();
                S = this._valueMin();
                V = this._valueMax();
                Q = (V !== S) ? (U - S) / (V - S) * 100 : 0;
                M[this.orientation === "horizontal" ? "left" : "bottom"] = Q + "%";
                this.handle.stop(1, 1)[N ? "animate" : "css"](M, O.animate);
                if (P === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[N ? "animate" : "css"]({
                        width: Q + "%"
                    }, O.animate)
                }
                if (P === "max" && this.orientation === "horizontal") {
                    this.range[N ? "animate" : "css"]({
                        width: (100 - Q) + "%"
                    }, {
                        queue: false,
                        duration: O.animate
                    })
                }
                if (P === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[N ? "animate" : "css"]({
                        height: Q + "%"
                    }, O.animate)
                }
                if (P === "max" && this.orientation === "vertical") {
                    this.range[N ? "animate" : "css"]({
                        height: (100 - Q) + "%"
                    }, {
                        queue: false,
                        duration: O.animate
                    })
                }
            }
        },
        _handleEvents: {
            keydown: function(Q) {
                var R, O, N, P, M = y(Q.target).data("ui-slider-handle-index");
                switch (Q.which) {
                case y.ui.keyCode.HOME:
                case y.ui.keyCode.END:
                case y.ui.keyCode.PAGE_UP:
                case y.ui.keyCode.PAGE_DOWN:
                case y.ui.keyCode.UP:
                case y.ui.keyCode.RIGHT:
                case y.ui.keyCode.DOWN:
                case y.ui.keyCode.LEFT:
                    Q.preventDefault();
                    if (!this._keySliding) {
                        this._keySliding = true;
                        y(Q.target).addClass("ui-state-active");
                        R = this._start(Q, M);
                        if (R === false) {
                            return
                        }
                    }
                    break
                }
                P = this.options.step;
                if (this.options.values && this.options.values.length) {
                    O = N = this.values(M)
                } else {
                    O = N = this.value()
                }
                switch (Q.which) {
                case y.ui.keyCode.HOME:
                    N = this._valueMin();
                    break;
                case y.ui.keyCode.END:
                    N = this._valueMax();
                    break;
                case y.ui.keyCode.PAGE_UP:
                    N = this._trimAlignValue(O + ((this._valueMax() - this._valueMin()) / this.numPages));
                    break;
                case y.ui.keyCode.PAGE_DOWN:
                    N = this._trimAlignValue(O - ((this._valueMax() - this._valueMin()) / this.numPages));
                    break;
                case y.ui.keyCode.UP:
                case y.ui.keyCode.RIGHT:
                    if (O === this._valueMax()) {
                        return
                    }
                    N = this._trimAlignValue(O + P);
                    break;
                case y.ui.keyCode.DOWN:
                case y.ui.keyCode.LEFT:
                    if (O === this._valueMin()) {
                        return
                    }
                    N = this._trimAlignValue(O - P);
                    break
                }
                this._slide(Q, M, N)
            },
            keyup: function(N) {
                var M = y(N.target).data("ui-slider-handle-index");
                if (this._keySliding) {
                    this._keySliding = false;
                    this._stop(N, M);
                    this._change(N, M);
                    y(N.target).removeClass("ui-state-active")
                }
            }
        }
    });
    /*!
 * jQuery UI Effects 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
    var i = "ui-effects-";
    y.effects = {
        effect: {}
    };
    /*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
    (function(aa, P) {
        var W = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", T = /^([\-+])=\s*(\d+\.?\d*)/, S = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(ab) {
                return [ab[1], ab[2], ab[3], ab[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(ab) {
                return [ab[1] * 2.55, ab[2] * 2.55, ab[3] * 2.55, ab[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(ab) {
                return [parseInt(ab[1], 16), parseInt(ab[2], 16), parseInt(ab[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(ab) {
                return [parseInt(ab[1] + ab[1], 16), parseInt(ab[2] + ab[2], 16), parseInt(ab[3] + ab[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(ab) {
                return [ab[1], ab[2] / 100, ab[3] / 100, ab[4]]
            }
        }], Q = aa.Color = function(ac, ad, ab, ae) {
            return new aa.Color.fn.parse(ac,ad,ab,ae)
        }
        , V = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, Z = {
            "byte": {
                floor: true,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: true
            }
        }, Y = Q.support = {}, N = aa("<p>")[0], M, X = aa.each;
        N.style.cssText = "background-color:rgba(1,1,1,.5)";
        Y.rgba = N.style.backgroundColor.indexOf("rgba") > -1;
        X(V, function(ab, ac) {
            ac.cache = "_" + ab;
            ac.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });
        function U(ac, ae, ad) {
            var ab = Z[ae.type] || {};
            if (ac == null) {
                return (ad || !ae.def) ? null : ae.def
            }
            ac = ab.floor ? ~~ac : parseFloat(ac);
            if (isNaN(ac)) {
                return ae.def
            }
            if (ab.mod) {
                return (ac + ab.mod) % ab.mod
            }
            return 0 > ac ? 0 : ab.max < ac ? ab.max : ac
        }
        function R(ab) {
            var ad = Q()
              , ac = ad._rgba = [];
            ab = ab.toLowerCase();
            X(S, function(ai, aj) {
                var ag, ah = aj.re.exec(ab), af = ah && aj.parse(ah), ae = aj.space || "rgba";
                if (af) {
                    ag = ad[ae](af);
                    ad[V[ae].cache] = ag[V[ae].cache];
                    ac = ad._rgba = ag._rgba;
                    return false
                }
            });
            if (ac.length) {
                if (ac.join() === "0,0,0,0") {
                    aa.extend(ac, M.transparent)
                }
                return ad
            }
            return M[ab]
        }
        Q.fn = aa.extend(Q.prototype, {
            parse: function(ah, af, ab, ag) {
                if (ah === P) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (ah.jquery || ah.nodeType) {
                    ah = aa(ah).css(af);
                    af = P
                }
                var ae = this
                  , ad = aa.type(ah)
                  , ac = this._rgba = [];
                if (af !== P) {
                    ah = [ah, af, ab, ag];
                    ad = "array"
                }
                if (ad === "string") {
                    return this.parse(R(ah) || M._default)
                }
                if (ad === "array") {
                    X(V.rgba.props, function(ai, aj) {
                        ac[aj.idx] = U(ah[aj.idx], aj)
                    });
                    return this
                }
                if (ad === "object") {
                    if (ah instanceof Q) {
                        X(V, function(ai, aj) {
                            if (ah[aj.cache]) {
                                ae[aj.cache] = ah[aj.cache].slice()
                            }
                        })
                    } else {
                        X(V, function(aj, ak) {
                            var ai = ak.cache;
                            X(ak.props, function(al, am) {
                                if (!ae[ai] && ak.to) {
                                    if (al === "alpha" || ah[al] == null) {
                                        return
                                    }
                                    ae[ai] = ak.to(ae._rgba)
                                }
                                ae[ai][am.idx] = U(ah[al], am, true)
                            });
                            if (ae[ai] && aa.inArray(null, ae[ai].slice(0, 3)) < 0) {
                                ae[ai][3] = 1;
                                if (ak.from) {
                                    ae._rgba = ak.from(ae[ai])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function(ad) {
                var ab = Q(ad)
                  , ae = true
                  , ac = this;
                X(V, function(af, ah) {
                    var ai, ag = ab[ah.cache];
                    if (ag) {
                        ai = ac[ah.cache] || ah.to && ah.to(ac._rgba) || [];
                        X(ah.props, function(aj, ak) {
                            if (ag[ak.idx] != null) {
                                ae = (ag[ak.idx] === ai[ak.idx]);
                                return ae
                            }
                        })
                    }
                    return ae
                });
                return ae
            },
            _space: function() {
                var ab = []
                  , ac = this;
                X(V, function(ad, ae) {
                    if (ac[ae.cache]) {
                        ab.push(ad)
                    }
                });
                return ab.pop()
            },
            transition: function(ac, ai) {
                var ad = Q(ac)
                  , ae = ad._space()
                  , af = V[ae]
                  , ag = this.alpha() === 0 ? Q("transparent") : this
                  , ah = ag[af.cache] || af.to(ag._rgba)
                  , ab = ah.slice();
                ad = ad[af.cache];
                X(af.props, function(am, ao) {
                    var al = ao.idx
                      , ak = ah[al]
                      , aj = ad[al]
                      , an = Z[ao.type] || {};
                    if (aj === null) {
                        return
                    }
                    if (ak === null) {
                        ab[al] = aj
                    } else {
                        if (an.mod) {
                            if (aj - ak > an.mod / 2) {
                                ak += an.mod
                            } else {
                                if (ak - aj > an.mod / 2) {
                                    ak -= an.mod
                                }
                            }
                        }
                        ab[al] = U((aj - ak) * ai + ak, ao)
                    }
                });
                return this[ae](ab)
            },
            blend: function(ae) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var ad = this._rgba.slice()
                  , ac = ad.pop()
                  , ab = Q(ae)._rgba;
                return Q(aa.map(ad, function(af, ag) {
                    return (1 - ac) * ab[ag] + ac * af
                }))
            },
            toRgbaString: function() {
                var ac = "rgba("
                  , ab = aa.map(this._rgba, function(ad, ae) {
                    return ad == null ? (ae > 2 ? 1 : 0) : ad
                });
                if (ab[3] === 1) {
                    ab.pop();
                    ac = "rgb("
                }
                return ac + ab.join() + ")"
            },
            toHslaString: function() {
                var ac = "hsla("
                  , ab = aa.map(this.hsla(), function(ad, ae) {
                    if (ad == null) {
                        ad = ae > 2 ? 1 : 0
                    }
                    if (ae && ae < 3) {
                        ad = Math.round(ad * 100) + "%"
                    }
                    return ad
                });
                if (ab[3] === 1) {
                    ab.pop();
                    ac = "hsl("
                }
                return ac + ab.join() + ")"
            },
            toHexString: function(ab) {
                var ac = this._rgba.slice()
                  , ad = ac.pop();
                if (ab) {
                    ac.push(~~(ad * 255))
                }
                return "#" + aa.map(ac, function(ae) {
                    ae = (ae || 0).toString(16);
                    return ae.length === 1 ? "0" + ae : ae
                }).join("")
            },
            toString: function() {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        Q.fn.parse.prototype = Q.fn;
        function O(ad, ac, ab) {
            ab = (ab + 1) % 1;
            if (ab * 6 < 1) {
                return ad + (ac - ad) * ab * 6
            }
            if (ab * 2 < 1) {
                return ac
            }
            if (ab * 3 < 2) {
                return ad + (ac - ad) * ((2 / 3) - ab) * 6
            }
            return ad
        }
        V.hsla.to = function(ad) {
            if (ad[0] == null || ad[1] == null || ad[2] == null) {
                return [null, null, null, ad[3]]
            }
            var ab = ad[0] / 255, ag = ad[1] / 255, ah = ad[2] / 255, aj = ad[3], ai = Math.max(ab, ag, ah), ae = Math.min(ab, ag, ah), ak = ai - ae, al = ai + ae, ac = al * 0.5, af, am;
            if (ae === ai) {
                af = 0
            } else {
                if (ab === ai) {
                    af = (60 * (ag - ah) / ak) + 360
                } else {
                    if (ag === ai) {
                        af = (60 * (ah - ab) / ak) + 120
                    } else {
                        af = (60 * (ab - ag) / ak) + 240
                    }
                }
            }
            if (ak === 0) {
                am = 0
            } else {
                if (ac <= 0.5) {
                    am = ak / al
                } else {
                    am = ak / (2 - al)
                }
            }
            return [Math.round(af) % 360, am, ac, aj == null ? 1 : aj]
        }
        ;
        V.hsla.from = function(af) {
            if (af[0] == null || af[1] == null || af[2] == null) {
                return [null, null, null, af[3]]
            }
            var ae = af[0] / 360
              , ad = af[1]
              , ac = af[2]
              , ab = af[3]
              , ag = ac <= 0.5 ? ac * (1 + ad) : ac + ad - ac * ad
              , ah = 2 * ac - ag;
            return [Math.round(O(ah, ag, ae + (1 / 3)) * 255), Math.round(O(ah, ag, ae) * 255), Math.round(O(ah, ag, ae - (1 / 3)) * 255), ab]
        }
        ;
        X(V, function(ac, ae) {
            var ad = ae.props
              , ab = ae.cache
              , ag = ae.to
              , af = ae.from;
            Q.fn[ac] = function(al) {
                if (ag && !this[ab]) {
                    this[ab] = ag(this._rgba)
                }
                if (al === P) {
                    return this[ab].slice()
                }
                var ai, ak = aa.type(al), ah = (ak === "array" || ak === "object") ? al : arguments, aj = this[ab].slice();
                X(ad, function(am, ao) {
                    var an = ah[ak === "object" ? am : ao.idx];
                    if (an == null) {
                        an = aj[ao.idx]
                    }
                    aj[ao.idx] = U(an, ao)
                });
                if (af) {
                    ai = Q(af(aj));
                    ai[ab] = aj;
                    return ai
                } else {
                    return Q(aj)
                }
            }
            ;
            X(ad, function(ah, ai) {
                if (Q.fn[ah]) {
                    return
                }
                Q.fn[ah] = function(am) {
                    var ao = aa.type(am), al = (ah === "alpha" ? (this._hsla ? "hsla" : "rgba") : ac), ak = this[al](), an = ak[ai.idx], aj;
                    if (ao === "undefined") {
                        return an
                    }
                    if (ao === "function") {
                        am = am.call(this, an);
                        ao = aa.type(am)
                    }
                    if (am == null && ai.empty) {
                        return this
                    }
                    if (ao === "string") {
                        aj = T.exec(am);
                        if (aj) {
                            am = an + parseFloat(aj[2]) * (aj[1] === "+" ? 1 : -1)
                        }
                    }
                    ak[ai.idx] = am;
                    return this[al](ak)
                }
            })
        });
        Q.hook = function(ac) {
            var ab = ac.split(" ");
            X(ab, function(ad, ae) {
                aa.cssHooks[ae] = {
                    set: function(ai, aj) {
                        var ag, ah, af = "";
                        if (aj !== "transparent" && (aa.type(aj) !== "string" || (ag = R(aj)))) {
                            aj = Q(ag || aj);
                            if (!Y.rgba && aj._rgba[3] !== 1) {
                                ah = ae === "backgroundColor" ? ai.parentNode : ai;
                                while ((af === "" || af === "transparent") && ah && ah.style) {
                                    try {
                                        af = aa.css(ah, "backgroundColor");
                                        ah = ah.parentNode
                                    } catch (ak) {}
                                }
                                aj = aj.blend(af && af !== "transparent" ? af : "_default")
                            }
                            aj = aj.toRgbaString()
                        }
                        try {
                            ai.style[ae] = aj
                        } catch (ak) {}
                    }
                };
                aa.fx.step[ae] = function(af) {
                    if (!af.colorInit) {
                        af.start = Q(af.elem, ae);
                        af.end = Q(af.end);
                        af.colorInit = true
                    }
                    aa.cssHooks[ae].set(af.elem, af.start.transition(af.end, af.pos))
                }
            })
        }
        ;
        Q.hook(W);
        aa.cssHooks.borderColor = {
            expand: function(ac) {
                var ab = {};
                X(["Top", "Right", "Bottom", "Left"], function(ae, ad) {
                    ab["border" + ad + "Color"] = ac
                });
                return ab
            }
        };
        M = aa.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }
    )(jQuery);
    (function() {
        var N = ["add", "remove", "toggle"]
          , O = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        y.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(Q, R) {
            y.fx.step[R] = function(S) {
                if (S.end !== "none" && !S.setAttr || S.pos === 1 && !S.setAttr) {
                    jQuery.style(S.elem, R, S.end);
                    S.setAttr = true
                }
            }
        });
        function P(U) {
            var R, Q, S = U.ownerDocument.defaultView ? U.ownerDocument.defaultView.getComputedStyle(U, null) : U.currentStyle, T = {};
            if (S && S.length && S[0] && S[S[0]]) {
                Q = S.length;
                while (Q--) {
                    R = S[Q];
                    if (typeof S[R] === "string") {
                        T[y.camelCase(R)] = S[R]
                    }
                }
            } else {
                for (R in S) {
                    if (typeof S[R] === "string") {
                        T[R] = S[R]
                    }
                }
            }
            return T
        }
        function M(Q, S) {
            var U = {}, R, T;
            for (R in S) {
                T = S[R];
                if (Q[R] !== T) {
                    if (!O[R]) {
                        if (y.fx.step[R] || !isNaN(parseFloat(T))) {
                            U[R] = T
                        }
                    }
                }
            }
            return U
        }
        if (!y.fn.addBack) {
            y.fn.addBack = function(Q) {
                return this.add(Q == null ? this.prevObject : this.prevObject.filter(Q))
            }
        }
        y.effects.animateClass = function(Q, R, U, T) {
            var S = y.speed(R, U, T);
            return this.queue(function() {
                var X = y(this), V = X.attr("class") || "", W, Y = S.children ? X.find("*").addBack() : X;
                Y = Y.map(function() {
                    var Z = y(this);
                    return {
                        el: Z,
                        start: P(this)
                    }
                });
                W = function() {
                    y.each(N, function(Z, aa) {
                        if (Q[aa]) {
                            X[aa + "Class"](Q[aa])
                        }
                    })
                }
                ;
                W();
                Y = Y.map(function() {
                    this.end = P(this.el[0]);
                    this.diff = M(this.start, this.end);
                    return this
                });
                X.attr("class", V);
                Y = Y.map(function() {
                    var ab = this
                      , Z = y.Deferred()
                      , aa = y.extend({}, S, {
                        queue: false,
                        complete: function() {
                            Z.resolve(ab)
                        }
                    });
                    this.el.animate(this.diff, aa);
                    return Z.promise()
                });
                y.when.apply(y, Y.get()).done(function() {
                    W();
                    y.each(arguments, function() {
                        var Z = this.el;
                        y.each(this.diff, function(aa) {
                            Z.css(aa, "")
                        })
                    });
                    S.complete.call(X[0])
                })
            })
        }
        ;
        y.fn.extend({
            addClass: (function(Q) {
                return function(S, R, U, T) {
                    return R ? y.effects.animateClass.call(this, {
                        add: S
                    }, R, U, T) : Q.apply(this, arguments)
                }
            }
            )(y.fn.addClass),
            removeClass: (function(Q) {
                return function(S, R, U, T) {
                    return arguments.length > 1 ? y.effects.animateClass.call(this, {
                        remove: S
                    }, R, U, T) : Q.apply(this, arguments)
                }
            }
            )(y.fn.removeClass),
            toggleClass: (function(Q) {
                return function(T, S, R, V, U) {
                    if (typeof S === "boolean" || S === undefined) {
                        if (!R) {
                            return Q.apply(this, arguments)
                        } else {
                            return y.effects.animateClass.call(this, (S ? {
                                add: T
                            } : {
                                remove: T
                            }), R, V, U)
                        }
                    } else {
                        return y.effects.animateClass.call(this, {
                            toggle: T
                        }, S, R, V)
                    }
                }
            }
            )(y.fn.toggleClass),
            switchClass: function(Q, S, R, U, T) {
                return y.effects.animateClass.call(this, {
                    add: S,
                    remove: Q
                }, R, U, T)
            }
        })
    }
    )();
    (function() {
        y.extend(y.effects, {
            version: "1.11.0",
            save: function(P, Q) {
                for (var O = 0; O < Q.length; O++) {
                    if (Q[O] !== null) {
                        P.data(i + Q[O], P[0].style[Q[O]])
                    }
                }
            },
            restore: function(P, R) {
                var Q, O;
                for (O = 0; O < R.length; O++) {
                    if (R[O] !== null) {
                        Q = P.data(i + R[O]);
                        if (Q === undefined) {
                            Q = ""
                        }
                        P.css(R[O], Q)
                    }
                }
            },
            setMode: function(O, P) {
                if (P === "toggle") {
                    P = O.is(":hidden") ? "show" : "hide"
                }
                return P
            },
            getBaseline: function(P, Q) {
                var R, O;
                switch (P[0]) {
                case "top":
                    R = 0;
                    break;
                case "middle":
                    R = 0.5;
                    break;
                case "bottom":
                    R = 1;
                    break;
                default:
                    R = P[0] / Q.height
                }
                switch (P[1]) {
                case "left":
                    O = 0;
                    break;
                case "center":
                    O = 0.5;
                    break;
                case "right":
                    O = 1;
                    break;
                default:
                    O = P[1] / Q.width
                }
                return {
                    x: O,
                    y: R
                }
            },
            createWrapper: function(P) {
                if (P.parent().is(".ui-effects-wrapper")) {
                    return P.parent()
                }
                var Q = {
                    width: P.outerWidth(true),
                    height: P.outerHeight(true),
                    "float": P.css("float")
                }
                  , T = y("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , O = {
                    width: P.width(),
                    height: P.height()
                }
                  , S = document.activeElement;
                try {
                    S.id
                } catch (R) {
                    S = document.body
                }
                P.wrap(T);
                if (P[0] === S || y.contains(P[0], S)) {
                    y(S).focus()
                }
                T = P.parent();
                if (P.css("position") === "static") {
                    T.css({
                        position: "relative"
                    });
                    P.css({
                        position: "relative"
                    })
                } else {
                    y.extend(Q, {
                        position: P.css("position"),
                        zIndex: P.css("z-index")
                    });
                    y.each(["top", "left", "bottom", "right"], function(U, V) {
                        Q[V] = P.css(V);
                        if (isNaN(parseInt(Q[V], 10))) {
                            Q[V] = "auto"
                        }
                    });
                    P.css({
                        position: "relative",
                        top: 0,
                        left: 0,
                        right: "auto",
                        bottom: "auto"
                    })
                }
                P.css(O);
                return T.css(Q).show()
            },
            removeWrapper: function(O) {
                var P = document.activeElement;
                if (O.parent().is(".ui-effects-wrapper")) {
                    O.parent().replaceWith(O);
                    if (O[0] === P || y.contains(O[0], P)) {
                        y(P).focus()
                    }
                }
                return O
            },
            setTransition: function(P, R, O, Q) {
                Q = Q || {};
                y.each(R, function(T, S) {
                    var U = P.cssUnit(S);
                    if (U[0] > 0) {
                        Q[S] = U[0] * O + U[1]
                    }
                });
                return Q
            }
        });
        function M(P, O, Q, R) {
            if (y.isPlainObject(P)) {
                O = P;
                P = P.effect
            }
            P = {
                effect: P
            };
            if (O == null) {
                O = {}
            }
            if (y.isFunction(O)) {
                R = O;
                Q = null;
                O = {}
            }
            if (typeof O === "number" || y.fx.speeds[O]) {
                R = Q;
                Q = O;
                O = {}
            }
            if (y.isFunction(Q)) {
                R = Q;
                Q = null
            }
            if (O) {
                y.extend(P, O)
            }
            Q = Q || O.duration;
            P.duration = y.fx.off ? 0 : typeof Q === "number" ? Q : Q in y.fx.speeds ? y.fx.speeds[Q] : y.fx.speeds._default;
            P.complete = R || O.complete;
            return P
        }
        function N(O) {
            if (!O || typeof O === "number" || y.fx.speeds[O]) {
                return true
            }
            if (typeof O === "string" && !y.effects.effect[O]) {
                return true
            }
            if (y.isFunction(O)) {
                return true
            }
            if (typeof O === "object" && !O.effect) {
                return true
            }
            return false
        }
        y.fn.extend({
            effect: function() {
                var Q = M.apply(this, arguments)
                  , S = Q.mode
                  , O = Q.queue
                  , P = y.effects.effect[Q.effect];
                if (y.fx.off || !P) {
                    if (S) {
                        return this[S](Q.duration, Q.complete)
                    } else {
                        return this.each(function() {
                            if (Q.complete) {
                                Q.complete.call(this)
                            }
                        })
                    }
                }
                function R(V) {
                    var W = y(this)
                      , U = Q.complete
                      , X = Q.mode;
                    function T() {
                        if (y.isFunction(U)) {
                            U.call(W[0])
                        }
                        if (y.isFunction(V)) {
                            V()
                        }
                    }
                    if (W.is(":hidden") ? X === "hide" : X === "show") {
                        W[X]();
                        T()
                    } else {
                        P.call(W[0], Q, T)
                    }
                }
                return O === false ? this.each(R) : this.queue(O || "fx", R)
            },
            show: (function(O) {
                return function(Q) {
                    if (N(Q)) {
                        return O.apply(this, arguments)
                    } else {
                        var P = M.apply(this, arguments);
                        P.mode = "show";
                        return this.effect.call(this, P)
                    }
                }
            }
            )(y.fn.show),
            hide: (function(O) {
                return function(Q) {
                    if (N(Q)) {
                        return O.apply(this, arguments)
                    } else {
                        var P = M.apply(this, arguments);
                        P.mode = "hide";
                        return this.effect.call(this, P)
                    }
                }
            }
            )(y.fn.hide),
            toggle: (function(O) {
                return function(Q) {
                    if (N(Q) || typeof Q === "boolean") {
                        return O.apply(this, arguments)
                    } else {
                        var P = M.apply(this, arguments);
                        P.mode = "toggle";
                        return this.effect.call(this, P)
                    }
                }
            }
            )(y.fn.toggle),
            cssUnit: function(O) {
                var P = this.css(O)
                  , Q = [];
                y.each(["em", "px", "%", "pt"], function(R, S) {
                    if (P.indexOf(S) > 0) {
                        Q = [parseFloat(P), S]
                    }
                });
                return Q
            }
        })
    }
    )();
    (function() {
        var M = {};
        y.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(O, N) {
            M[N] = function(P) {
                return Math.pow(P, O + 2)
            }
        });
        y.extend(M, {
            Sine: function(N) {
                return 1 - Math.cos(N * Math.PI / 2)
            },
            Circ: function(N) {
                return 1 - Math.sqrt(1 - N * N)
            },
            Elastic: function(N) {
                return N === 0 || N === 1 ? N : -Math.pow(2, 8 * (N - 1)) * Math.sin(((N - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function(N) {
                return N * N * (3 * N - 2)
            },
            Bounce: function(P) {
                var N, O = 4;
                while (P < ((N = Math.pow(2, --O)) - 1) / 11) {}
                return 1 / Math.pow(4, 3 - O) - 7.5625 * Math.pow((N * 3 - 2) / 22 - P, 2)
            }
        });
        y.each(M, function(O, N) {
            y.easing["easeIn" + O] = N;
            y.easing["easeOut" + O] = function(P) {
                return 1 - N(1 - P)
            }
            ;
            y.easing["easeInOut" + O] = function(P) {
                return P < 0.5 ? N(P * 2) / 2 : 1 - N(P * -2 + 2) / 2
            }
        })
    }
    )();
    var H = y.effects;
    /*!
 * jQuery UI Effects Blind 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 */
    var J = y.effects.effect.blind = function(O, U) {
        var P = y(this), Y = /up|down|vertical/, X = /up|left|vertical|horizontal/, Z = ["position", "top", "bottom", "left", "right", "height", "width"], V = y.effects.setMode(P, O.mode || "hide"), aa = O.direction || "up", R = Y.test(aa), Q = R ? "height" : "width", W = R ? "top" : "left", ac = X.test(aa), T = {}, ab = V === "show", N, M, S;
        if (P.parent().is(".ui-effects-wrapper")) {
            y.effects.save(P.parent(), Z)
        } else {
            y.effects.save(P, Z)
        }
        P.show();
        N = y.effects.createWrapper(P).css({
            overflow: "hidden"
        });
        M = N[Q]();
        S = parseFloat(N.css(W)) || 0;
        T[Q] = ab ? M : 0;
        if (!ac) {
            P.css(R ? "bottom" : "right", 0).css(R ? "top" : "left", "auto").css({
                position: "absolute"
            });
            T[W] = ab ? S : M + S
        }
        if (ab) {
            N.css(Q, 0);
            if (!ac) {
                N.css(W, S + M)
            }
        }
        N.animate(T, {
            duration: O.duration,
            easing: O.easing,
            queue: false,
            complete: function() {
                if (V === "hide") {
                    P.hide()
                }
                y.effects.restore(P, Z);
                y.effects.removeWrapper(P);
                U()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Bounce 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 */
    var F = y.effects.effect.bounce = function(V, U) {
        var M = y(this), N = ["position", "top", "bottom", "left", "right", "height", "width"], T = y.effects.setMode(M, V.mode || "effect"), S = T === "hide", ad = T === "show", ae = V.direction || "up", O = V.distance, R = V.times || 5, af = R * 2 + (ad || S ? 1 : 0), ac = V.duration / af, X = V.easing, P = (ae === "up" || ae === "down") ? "top" : "left", W = (ae === "up" || ae === "left"), ab, Q, aa, Y = M.queue(), Z = Y.length;
        if (ad || S) {
            N.push("opacity")
        }
        y.effects.save(M, N);
        M.show();
        y.effects.createWrapper(M);
        if (!O) {
            O = M[P === "top" ? "outerHeight" : "outerWidth"]() / 3
        }
        if (ad) {
            aa = {
                opacity: 1
            };
            aa[P] = 0;
            M.css("opacity", 0).css(P, W ? -O * 2 : O * 2).animate(aa, ac, X)
        }
        if (S) {
            O = O / Math.pow(2, R - 1)
        }
        aa = {};
        aa[P] = 0;
        for (ab = 0; ab < R; ab++) {
            Q = {};
            Q[P] = (W ? "-=" : "+=") + O;
            M.animate(Q, ac, X).animate(aa, ac, X);
            O = S ? O * 2 : O / 2
        }
        if (S) {
            Q = {
                opacity: 0
            };
            Q[P] = (W ? "-=" : "+=") + O;
            M.animate(Q, ac, X)
        }
        M.queue(function() {
            if (S) {
                M.hide()
            }
            y.effects.restore(M, N);
            y.effects.removeWrapper(M);
            U()
        });
        if (Z > 1) {
            Y.splice.apply(Y, [1, 0].concat(Y.splice(Z, af + 1)))
        }
        M.dequeue()
    }
    ;
    /*!
 * jQuery UI Effects Clip 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 */
    var t = y.effects.effect.clip = function(P, S) {
        var Q = y(this), W = ["position", "top", "bottom", "left", "right", "height", "width"], V = y.effects.setMode(Q, P.mode || "hide"), Y = V === "show", X = P.direction || "vertical", U = X === "vertical", Z = U ? "height" : "width", T = U ? "top" : "left", R = {}, N, O, M;
        y.effects.save(Q, W);
        Q.show();
        N = y.effects.createWrapper(Q).css({
            overflow: "hidden"
        });
        O = (Q[0].tagName === "IMG") ? N : Q;
        M = O[Z]();
        if (Y) {
            O.css(Z, 0);
            O.css(T, M / 2)
        }
        R[Z] = Y ? M : 0;
        R[T] = Y ? 0 : M / 2;
        O.animate(R, {
            queue: false,
            duration: P.duration,
            easing: P.easing,
            complete: function() {
                if (!Y) {
                    Q.hide()
                }
                y.effects.restore(Q, W);
                y.effects.removeWrapper(Q);
                S()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Drop 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 */
    var l = y.effects.effect.drop = function(N, R) {
        var O = y(this), T = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"], S = y.effects.setMode(O, N.mode || "hide"), V = S === "show", U = N.direction || "left", P = (U === "up" || U === "down") ? "top" : "left", W = (U === "up" || U === "left") ? "pos" : "neg", Q = {
            opacity: V ? 1 : 0
        }, M;
        y.effects.save(O, T);
        O.show();
        y.effects.createWrapper(O);
        M = N.distance || O[P === "top" ? "outerHeight" : "outerWidth"](true) / 2;
        if (V) {
            O.css("opacity", 0).css(P, W === "pos" ? -M : M)
        }
        Q[P] = (V ? (W === "pos" ? "+=" : "-=") : (W === "pos" ? "-=" : "+=")) + M;
        O.animate(Q, {
            queue: false,
            duration: N.duration,
            easing: N.easing,
            complete: function() {
                if (S === "hide") {
                    O.hide()
                }
                y.effects.restore(O, T);
                y.effects.removeWrapper(O);
                R()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Explode 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 */
    var E = y.effects.effect.explode = function(Z, Y) {
        var S = Z.pieces ? Math.round(Math.sqrt(Z.pieces)) : 3, N = S, M = y(this), U = y.effects.setMode(M, Z.mode || "hide"), ad = U === "show", Q = M.show().css("visibility", "hidden").offset(), aa = Math.ceil(M.outerWidth() / N), X = Math.ceil(M.outerHeight() / S), R = [], ac, ab, O, W, V, T;
        function ae() {
            R.push(this);
            if (R.length === S * N) {
                P()
            }
        }
        for (ac = 0; ac < S; ac++) {
            W = Q.top + ac * X;
            T = ac - (S - 1) / 2;
            for (ab = 0; ab < N; ab++) {
                O = Q.left + ab * aa;
                V = ab - (N - 1) / 2;
                M.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -ab * aa,
                    top: -ac * X
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: aa,
                    height: X,
                    left: O + (ad ? V * aa : 0),
                    top: W + (ad ? T * X : 0),
                    opacity: ad ? 0 : 1
                }).animate({
                    left: O + (ad ? 0 : V * aa),
                    top: W + (ad ? 0 : T * X),
                    opacity: ad ? 1 : 0
                }, Z.duration || 500, Z.easing, ae)
            }
        }
        function P() {
            M.css({
                visibility: "visible"
            });
            y(R).remove();
            if (!ad) {
                M.hide()
            }
            Y()
        }
    }
    ;
    /*!
 * jQuery UI Effects Fade 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 */
    var G = y.effects.effect.fade = function(P, M) {
        var N = y(this)
          , O = y.effects.setMode(N, P.mode || "toggle");
        N.animate({
            opacity: O
        }, {
            queue: false,
            duration: P.duration,
            easing: P.easing,
            complete: M
        })
    }
    ;
    /*!
 * jQuery UI Effects Fold 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 */
    var v = y.effects.effect.fold = function(O, S) {
        var P = y(this), X = ["position", "top", "bottom", "left", "right", "height", "width"], U = y.effects.setMode(P, O.mode || "hide"), aa = U === "show", V = U === "hide", ac = O.size || 15, W = /([0-9]+)%/.exec(ac), ab = !!O.horizFirst, T = aa !== ab, Q = T ? ["width", "height"] : ["height", "width"], R = O.duration / 2, N, M, Z = {}, Y = {};
        y.effects.save(P, X);
        P.show();
        N = y.effects.createWrapper(P).css({
            overflow: "hidden"
        });
        M = T ? [N.width(), N.height()] : [N.height(), N.width()];
        if (W) {
            ac = parseInt(W[1], 10) / 100 * M[V ? 0 : 1]
        }
        if (aa) {
            N.css(ab ? {
                height: 0,
                width: ac
            } : {
                height: ac,
                width: 0
            })
        }
        Z[Q[0]] = aa ? M[0] : ac;
        Y[Q[1]] = aa ? M[1] : 0;
        N.animate(Z, R, O.easing).animate(Y, R, O.easing, function() {
            if (V) {
                P.hide()
            }
            y.effects.restore(P, X);
            y.effects.removeWrapper(P);
            S()
        })
    }
    ;
    /*!
 * jQuery UI Effects Highlight 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 */
    var A = y.effects.effect.highlight = function(R, M) {
        var O = y(this)
          , N = ["backgroundImage", "backgroundColor", "opacity"]
          , Q = y.effects.setMode(O, R.mode || "show")
          , P = {
            backgroundColor: O.css("backgroundColor")
        };
        if (Q === "hide") {
            P.opacity = 0
        }
        y.effects.save(O, N);
        O.show().css({
            backgroundImage: "none",
            backgroundColor: R.color || "#ffff99"
        }).animate(P, {
            queue: false,
            duration: R.duration,
            easing: R.easing,
            complete: function() {
                if (Q === "hide") {
                    O.hide()
                }
                y.effects.restore(O, N);
                M()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Size 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/size-effect/
 */
    var a = y.effects.effect.size = function(V, U) {
        var Z, S, T, M = y(this), Y = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], X = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], W = ["width", "height", "overflow"], Q = ["fontSize"], ab = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], N = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], R = y.effects.setMode(M, V.mode || "effect"), aa = V.restore || R !== "effect", ae = V.scale || "both", ac = V.origin || ["middle", "center"], ad = M.css("position"), O = aa ? Y : X, P = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        if (R === "show") {
            M.show()
        }
        Z = {
            height: M.height(),
            width: M.width(),
            outerHeight: M.outerHeight(),
            outerWidth: M.outerWidth()
        };
        if (V.mode === "toggle" && R === "show") {
            M.from = V.to || P;
            M.to = V.from || Z
        } else {
            M.from = V.from || (R === "show" ? P : Z);
            M.to = V.to || (R === "hide" ? P : Z)
        }
        T = {
            from: {
                y: M.from.height / Z.height,
                x: M.from.width / Z.width
            },
            to: {
                y: M.to.height / Z.height,
                x: M.to.width / Z.width
            }
        };
        if (ae === "box" || ae === "both") {
            if (T.from.y !== T.to.y) {
                O = O.concat(ab);
                M.from = y.effects.setTransition(M, ab, T.from.y, M.from);
                M.to = y.effects.setTransition(M, ab, T.to.y, M.to)
            }
            if (T.from.x !== T.to.x) {
                O = O.concat(N);
                M.from = y.effects.setTransition(M, N, T.from.x, M.from);
                M.to = y.effects.setTransition(M, N, T.to.x, M.to)
            }
        }
        if (ae === "content" || ae === "both") {
            if (T.from.y !== T.to.y) {
                O = O.concat(Q).concat(W);
                M.from = y.effects.setTransition(M, Q, T.from.y, M.from);
                M.to = y.effects.setTransition(M, Q, T.to.y, M.to)
            }
        }
        y.effects.save(M, O);
        M.show();
        y.effects.createWrapper(M);
        M.css("overflow", "hidden").css(M.from);
        if (ac) {
            S = y.effects.getBaseline(ac, Z);
            M.from.top = (Z.outerHeight - M.outerHeight()) * S.y;
            M.from.left = (Z.outerWidth - M.outerWidth()) * S.x;
            M.to.top = (Z.outerHeight - M.to.outerHeight) * S.y;
            M.to.left = (Z.outerWidth - M.to.outerWidth) * S.x
        }
        M.css(M.from);
        if (ae === "content" || ae === "both") {
            ab = ab.concat(["marginTop", "marginBottom"]).concat(Q);
            N = N.concat(["marginLeft", "marginRight"]);
            W = Y.concat(ab).concat(N);
            M.find("*[width]").each(function() {
                var ag = y(this)
                  , af = {
                    height: ag.height(),
                    width: ag.width(),
                    outerHeight: ag.outerHeight(),
                    outerWidth: ag.outerWidth()
                };
                if (aa) {
                    y.effects.save(ag, W)
                }
                ag.from = {
                    height: af.height * T.from.y,
                    width: af.width * T.from.x,
                    outerHeight: af.outerHeight * T.from.y,
                    outerWidth: af.outerWidth * T.from.x
                };
                ag.to = {
                    height: af.height * T.to.y,
                    width: af.width * T.to.x,
                    outerHeight: af.height * T.to.y,
                    outerWidth: af.width * T.to.x
                };
                if (T.from.y !== T.to.y) {
                    ag.from = y.effects.setTransition(ag, ab, T.from.y, ag.from);
                    ag.to = y.effects.setTransition(ag, ab, T.to.y, ag.to)
                }
                if (T.from.x !== T.to.x) {
                    ag.from = y.effects.setTransition(ag, N, T.from.x, ag.from);
                    ag.to = y.effects.setTransition(ag, N, T.to.x, ag.to)
                }
                ag.css(ag.from);
                ag.animate(ag.to, V.duration, V.easing, function() {
                    if (aa) {
                        y.effects.restore(ag, W)
                    }
                })
            })
        }
        M.animate(M.to, {
            queue: false,
            duration: V.duration,
            easing: V.easing,
            complete: function() {
                if (M.to.opacity === 0) {
                    M.css("opacity", M.from.opacity)
                }
                if (R === "hide") {
                    M.hide()
                }
                y.effects.restore(M, O);
                if (!aa) {
                    if (ad === "static") {
                        M.css({
                            position: "relative",
                            top: M.to.top,
                            left: M.to.left
                        })
                    } else {
                        y.each(["top", "left"], function(af, ag) {
                            M.css(ag, function(ai, ak) {
                                var aj = parseInt(ak, 10)
                                  , ah = af ? M.to.left : M.to.top;
                                if (ak === "auto") {
                                    return ah + "px"
                                }
                                return aj + ah + "px"
                            })
                        })
                    }
                }
                y.effects.removeWrapper(M);
                U()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Scale 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 */
    var e = y.effects.effect.scale = function(M, P) {
        var N = y(this)
          , V = y.extend(true, {}, M)
          , Q = y.effects.setMode(N, M.mode || "effect")
          , R = parseInt(M.percent, 10) || (parseInt(M.percent, 10) === 0 ? 0 : (Q === "hide" ? 0 : 100))
          , T = M.direction || "both"
          , U = M.origin
          , O = {
            height: N.height(),
            width: N.width(),
            outerHeight: N.outerHeight(),
            outerWidth: N.outerWidth()
        }
          , S = {
            y: T !== "horizontal" ? (R / 100) : 1,
            x: T !== "vertical" ? (R / 100) : 1
        };
        V.effect = "size";
        V.queue = false;
        V.complete = P;
        if (Q !== "effect") {
            V.origin = U || ["middle", "center"];
            V.restore = true
        }
        V.from = M.from || (Q === "show" ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : O);
        V.to = {
            height: O.height * S.y,
            width: O.width * S.x,
            outerHeight: O.outerHeight * S.y,
            outerWidth: O.outerWidth * S.x
        };
        if (V.fade) {
            if (Q === "show") {
                V.from.opacity = 0;
                V.to.opacity = 1
            }
            if (Q === "hide") {
                V.from.opacity = 1;
                V.to.opacity = 0
            }
        }
        N.effect(V)
    }
    ;
    /*!
 * jQuery UI Effects Puff 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/puff-effect/
 */
    var L = y.effects.effect.puff = function(T, M) {
        var R = y(this)
          , S = y.effects.setMode(R, T.mode || "hide")
          , P = S === "hide"
          , Q = parseInt(T.percent, 10) || 150
          , O = Q / 100
          , N = {
            height: R.height(),
            width: R.width(),
            outerHeight: R.outerHeight(),
            outerWidth: R.outerWidth()
        };
        y.extend(T, {
            effect: "scale",
            queue: false,
            fade: true,
            mode: S,
            complete: M,
            percent: P ? Q : 100,
            from: P ? N : {
                height: N.height * O,
                width: N.width * O,
                outerHeight: N.outerHeight * O,
                outerWidth: N.outerWidth * O
            }
        });
        R.effect(T)
    }
    ;
    /*!
 * jQuery UI Effects Pulsate 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 */
    var x = y.effects.effect.pulsate = function(M, Q) {
        var O = y(this), T = y.effects.setMode(O, M.mode || "show"), X = T === "show", U = T === "hide", Y = (X || T === "hide"), V = ((M.times || 5) * 2) + (Y ? 1 : 0), P = M.duration / V, W = 0, S = O.queue(), N = S.length, R;
        if (X || !O.is(":visible")) {
            O.css("opacity", 0).show();
            W = 1
        }
        for (R = 1; R < V; R++) {
            O.animate({
                opacity: W
            }, P, M.easing);
            W = 1 - W
        }
        O.animate({
            opacity: W
        }, P, M.easing);
        O.queue(function() {
            if (U) {
                O.hide()
            }
            Q()
        });
        if (N > 1) {
            S.splice.apply(S, [1, 0].concat(S.splice(N, V + 1)))
        }
        O.dequeue()
    }
    ;
    /*!
 * jQuery UI Effects Shake 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 */
    var r = y.effects.effect.shake = function(U, T) {
        var M = y(this), N = ["position", "top", "bottom", "left", "right", "height", "width"], S = y.effects.setMode(M, U.mode || "effect"), ac = U.direction || "left", O = U.distance || 20, R = U.times || 3, ad = R * 2 + 1, Y = Math.round(U.duration / ad), Q = (ac === "up" || ac === "down") ? "top" : "left", P = (ac === "up" || ac === "left"), ab = {}, aa = {}, Z = {}, X, V = M.queue(), W = V.length;
        y.effects.save(M, N);
        M.show();
        y.effects.createWrapper(M);
        ab[Q] = (P ? "-=" : "+=") + O;
        aa[Q] = (P ? "+=" : "-=") + O * 2;
        Z[Q] = (P ? "-=" : "+=") + O * 2;
        M.animate(ab, Y, U.easing);
        for (X = 1; X < R; X++) {
            M.animate(aa, Y, U.easing).animate(Z, Y, U.easing)
        }
        M.animate(aa, Y, U.easing).animate(ab, Y / 2, U.easing).queue(function() {
            if (S === "hide") {
                M.hide()
            }
            y.effects.restore(M, N);
            y.effects.removeWrapper(M);
            T()
        });
        if (W > 1) {
            V.splice.apply(V, [1, 0].concat(V.splice(W, ad + 1)))
        }
        M.dequeue()
    }
    ;
    /*!
 * jQuery UI Effects Slide 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 */
    var q = y.effects.effect.slide = function(O, S) {
        var P = y(this), U = ["position", "top", "bottom", "left", "right", "width", "height"], T = y.effects.setMode(P, O.mode || "show"), W = T === "show", V = O.direction || "left", Q = (V === "up" || V === "down") ? "top" : "left", N = (V === "up" || V === "left"), M, R = {};
        y.effects.save(P, U);
        P.show();
        M = O.distance || P[Q === "top" ? "outerHeight" : "outerWidth"](true);
        y.effects.createWrapper(P).css({
            overflow: "hidden"
        });
        if (W) {
            P.css(Q, N ? (isNaN(M) ? "-" + M : -M) : M)
        }
        R[Q] = (W ? (N ? "+=" : "-=") : (N ? "-=" : "+=")) + M;
        P.animate(R, {
            queue: false,
            duration: O.duration,
            easing: O.easing,
            complete: function() {
                if (T === "hide") {
                    P.hide()
                }
                y.effects.restore(P, U);
                y.effects.removeWrapper(P);
                S()
            }
        })
    }
    ;
    /*!
 * jQuery UI Effects Transfer 1.11.0
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/transfer-effect/
 */
    var k = y.effects.effect.transfer = function(N, R) {
        var P = y(this)
          , U = y(N.to)
          , X = U.css("position") === "fixed"
          , T = y("body")
          , V = X ? T.scrollTop() : 0
          , W = X ? T.scrollLeft() : 0
          , M = U.offset()
          , Q = {
            top: M.top - V,
            left: M.left - W,
            height: U.innerHeight(),
            width: U.innerWidth()
        }
          , S = P.offset()
          , O = y("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(N.className).css({
            top: S.top - V,
            left: S.left - W,
            height: P.innerHeight(),
            width: P.innerWidth(),
            position: X ? "fixed" : "absolute"
        }).animate(Q, N.duration, N.easing, function() {
            O.remove();
            R()
        })
    }
}));
/*! jQuery Timepicker Addon - v1.6.3 - 2016-04-20
* http://trentrichardson.com/examples/timepicker
* Copyright (c) 2016 Trent Richardson; Licensed MIT */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "jquery-ui"], a)
    } else {
        a(jQuery)
    }
}(function($) {
    $.ui.timepicker = $.ui.timepicker || {};
    if ($.ui.timepicker.version) {
        return
    }
    $.extend($.ui, {
        timepicker: {
            version: "1.6.3"
        }
    });
    var Timepicker = function() {
        this.regional = [];
        this.regional[""] = {
            currentText: "Now",
            closeText: "Done",
            amNames: ["AM", "A"],
            pmNames: ["PM", "P"],
            timeFormat: "HH:mm",
            timeSuffix: "",
            timeOnlyTitle: "Choose Time",
            timeText: "Time",
            hourText: "Hour",
            minuteText: "Minute",
            secondText: "Second",
            millisecText: "Millisecond",
            microsecText: "Microsecond",
            timezoneText: "Time Zone",
            isRTL: false
        };
        this._defaults = {
            showButtonPanel: true,
            timeOnly: false,
            timeOnlyShowDate: false,
            showHour: null,
            showMinute: null,
            showSecond: null,
            showMillisec: null,
            showMicrosec: null,
            showTimezone: null,
            showTime: true,
            stepHour: 1,
            stepMinute: 1,
            stepSecond: 1,
            stepMillisec: 1,
            stepMicrosec: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            microsec: 0,
            timezone: null,
            hourMin: 0,
            minuteMin: 0,
            secondMin: 0,
            millisecMin: 0,
            microsecMin: 0,
            hourMax: 23,
            minuteMax: 59,
            secondMax: 59,
            millisecMax: 999,
            microsecMax: 999,
            minDateTime: null,
            maxDateTime: null,
            maxTime: null,
            minTime: null,
            onSelect: null,
            hourGrid: 0,
            minuteGrid: 0,
            secondGrid: 0,
            millisecGrid: 0,
            microsecGrid: 0,
            alwaysSetTime: true,
            separator: " ",
            altFieldTimeOnly: true,
            altTimeFormat: null,
            altSeparator: null,
            altTimeSuffix: null,
            altRedirectFocus: true,
            pickerTimeFormat: null,
            pickerTimeSuffix: null,
            showTimepicker: true,
            timezoneList: null,
            addSliderAccess: false,
            sliderAccessArgs: null,
            controlType: "slider",
            oneLine: false,
            defaultValue: null,
            parse: "strict",
            afterInject: null
        };
        $.extend(this._defaults, this.regional[""])
    };
    $.extend(Timepicker.prototype, {
        $input: null,
        $altInput: null,
        $timeObj: null,
        inst: null,
        hour_slider: null,
        minute_slider: null,
        second_slider: null,
        millisec_slider: null,
        microsec_slider: null,
        timezone_select: null,
        maxTime: null,
        minTime: null,
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0,
        microsec: 0,
        timezone: null,
        hourMinOriginal: null,
        minuteMinOriginal: null,
        secondMinOriginal: null,
        millisecMinOriginal: null,
        microsecMinOriginal: null,
        hourMaxOriginal: null,
        minuteMaxOriginal: null,
        secondMaxOriginal: null,
        millisecMaxOriginal: null,
        microsecMaxOriginal: null,
        ampm: "",
        formattedDate: "",
        formattedTime: "",
        formattedDateTime: "",
        timezoneList: null,
        units: ["hour", "minute", "second", "millisec", "microsec"],
        support: {},
        control: null,
        setDefaults: function(settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _newInst: function($input, opts) {
            var tp_inst = new Timepicker(), inlineSettings = {}, fns = {}, overrides, i;
            for (var attrName in this._defaults) {
                if (this._defaults.hasOwnProperty(attrName)) {
                    var attrValue = $input.attr("time:" + attrName);
                    if (attrValue) {
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
            }
            overrides = {
                beforeShow: function(input, dp_inst) {
                    if ($.isFunction(tp_inst._defaults.evnts.beforeShow)) {
                        return tp_inst._defaults.evnts.beforeShow.call($input[0], input, dp_inst, tp_inst)
                    }
                },
                onChangeMonthYear: function(year, month, dp_inst) {
                    if ($.isFunction(tp_inst._defaults.evnts.onChangeMonthYear)) {
                        tp_inst._defaults.evnts.onChangeMonthYear.call($input[0], year, month, dp_inst, tp_inst)
                    }
                },
                onClose: function(dateText, dp_inst) {
                    if (tp_inst.timeDefined === true && $input.val() !== "") {
                        tp_inst._updateDateTime(dp_inst)
                    }
                    if ($.isFunction(tp_inst._defaults.evnts.onClose)) {
                        tp_inst._defaults.evnts.onClose.call($input[0], dateText, dp_inst, tp_inst)
                    }
                }
            };
            for (i in overrides) {
                if (overrides.hasOwnProperty(i)) {
                    fns[i] = opts[i] || this._defaults[i] || null
                }
            }
            tp_inst._defaults = $.extend({}, this._defaults, inlineSettings, opts, overrides, {
                evnts: fns,
                timepicker: tp_inst
            });
            tp_inst.amNames = $.map(tp_inst._defaults.amNames, function(val) {
                return val.toUpperCase()
            });
            tp_inst.pmNames = $.map(tp_inst._defaults.pmNames, function(val) {
                return val.toUpperCase()
            });
            tp_inst.support = detectSupport(tp_inst._defaults.timeFormat + (tp_inst._defaults.pickerTimeFormat ? tp_inst._defaults.pickerTimeFormat : "") + (tp_inst._defaults.altTimeFormat ? tp_inst._defaults.altTimeFormat : ""));
            if (typeof (tp_inst._defaults.controlType) === "string") {
                if (tp_inst._defaults.controlType === "slider" && typeof ($.ui.slider) === "undefined") {
                    tp_inst._defaults.controlType = "select"
                }
                tp_inst.control = tp_inst._controls[tp_inst._defaults.controlType]
            } else {
                tp_inst.control = tp_inst._defaults.controlType
            }
            var timezoneList = [-720, -660, -600, -570, -540, -480, -420, -360, -300, -270, -240, -210, -180, -120, -60, 0, 60, 120, 180, 210, 240, 270, 300, 330, 345, 360, 390, 420, 480, 525, 540, 570, 600, 630, 660, 690, 720, 765, 780, 840];
            if (tp_inst._defaults.timezoneList !== null) {
                timezoneList = tp_inst._defaults.timezoneList
            }
            var tzl = timezoneList.length
              , tzi = 0
              , tzv = null;
            if (tzl > 0 && typeof timezoneList[0] !== "object") {
                for (; tzi < tzl; tzi++) {
                    tzv = timezoneList[tzi];
                    timezoneList[tzi] = {
                        value: tzv,
                        label: $.timepicker.timezoneOffsetString(tzv, tp_inst.support.iso8601)
                    }
                }
            }
            tp_inst._defaults.timezoneList = timezoneList;
            tp_inst.timezone = tp_inst._defaults.timezone !== null ? $.timepicker.timezoneOffsetNumber(tp_inst._defaults.timezone) : ((new Date()).getTimezoneOffset() * -1);
            tp_inst.hour = tp_inst._defaults.hour < tp_inst._defaults.hourMin ? tp_inst._defaults.hourMin : tp_inst._defaults.hour > tp_inst._defaults.hourMax ? tp_inst._defaults.hourMax : tp_inst._defaults.hour;
            tp_inst.minute = tp_inst._defaults.minute < tp_inst._defaults.minuteMin ? tp_inst._defaults.minuteMin : tp_inst._defaults.minute > tp_inst._defaults.minuteMax ? tp_inst._defaults.minuteMax : tp_inst._defaults.minute;
            tp_inst.second = tp_inst._defaults.second < tp_inst._defaults.secondMin ? tp_inst._defaults.secondMin : tp_inst._defaults.second > tp_inst._defaults.secondMax ? tp_inst._defaults.secondMax : tp_inst._defaults.second;
            tp_inst.millisec = tp_inst._defaults.millisec < tp_inst._defaults.millisecMin ? tp_inst._defaults.millisecMin : tp_inst._defaults.millisec > tp_inst._defaults.millisecMax ? tp_inst._defaults.millisecMax : tp_inst._defaults.millisec;
            tp_inst.microsec = tp_inst._defaults.microsec < tp_inst._defaults.microsecMin ? tp_inst._defaults.microsecMin : tp_inst._defaults.microsec > tp_inst._defaults.microsecMax ? tp_inst._defaults.microsecMax : tp_inst._defaults.microsec;
            tp_inst.ampm = "";
            tp_inst.$input = $input;
            if (tp_inst._defaults.altField) {
                tp_inst.$altInput = $(tp_inst._defaults.altField);
                if (tp_inst._defaults.altRedirectFocus === true) {
                    tp_inst.$altInput.css({
                        cursor: "pointer"
                    }).focus(function() {
                        $input.trigger("focus")
                    })
                }
            }
            if (tp_inst._defaults.minDate === 0 || tp_inst._defaults.minDateTime === 0) {
                tp_inst._defaults.minDate = new Date()
            }
            if (tp_inst._defaults.maxDate === 0 || tp_inst._defaults.maxDateTime === 0) {
                tp_inst._defaults.maxDate = new Date()
            }
            if (tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date) {
                tp_inst._defaults.minDateTime = new Date(tp_inst._defaults.minDate.getTime())
            }
            if (tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date) {
                tp_inst._defaults.minDate = new Date(tp_inst._defaults.minDateTime.getTime())
            }
            if (tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date) {
                tp_inst._defaults.maxDateTime = new Date(tp_inst._defaults.maxDate.getTime())
            }
            if (tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date) {
                tp_inst._defaults.maxDate = new Date(tp_inst._defaults.maxDateTime.getTime())
            }
            tp_inst.$input.bind("focus", function() {
                tp_inst._onFocus()
            });
            return tp_inst
        },
        _addTimePicker: function(dp_inst) {
            var currDT = $.trim((this.$altInput && this._defaults.altFieldTimeOnly) ? this.$input.val() + " " + this.$altInput.val() : this.$input.val());
            this.timeDefined = this._parseTime(currDT);
            this._limitMinMaxDateTime(dp_inst, false);
            this._injectTimePicker();
            this._afterInject()
        },
        _parseTime: function(timeString, withDate) {
            if (!this.inst) {
                this.inst = $.datepicker._getInst(this.$input[0])
            }
            if (withDate || !this._defaults.timeOnly) {
                var dp_dateFormat = $.datepicker._get(this.inst, "dateFormat");
                try {
                    var parseRes = parseDateTimeInternal(dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig(this.inst), this._defaults);
                    if (!parseRes.timeObj) {
                        return false
                    }
                    $.extend(this, parseRes.timeObj)
                } catch (err) {
                    $.timepicker.log("Error parsing the date/time string: " + err + "\ndate/time string = " + timeString + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + dp_dateFormat);
                    return false
                }
                return true
            } else {
                var timeObj = $.datepicker.parseTime(this._defaults.timeFormat, timeString, this._defaults);
                if (!timeObj) {
                    return false
                }
                $.extend(this, timeObj);
                return true
            }
        },
        _afterInject: function() {
            var o = this.inst.settings;
            if ($.isFunction(o.afterInject)) {
                o.afterInject.call(this)
            }
        },
        _injectTimePicker: function() {
            var $dp = this.inst.dpDiv
              , o = this.inst.settings
              , tp_inst = this
              , litem = ""
              , uitem = ""
              , show = null
              , max = {}
              , gridSize = {}
              , size = null
              , i = 0
              , l = 0;
            if ($dp.find("div.ui-timepicker-div").length === 0 && o.showTimepicker) {
                var noDisplay = " ui_tpicker_unit_hide"
                  , html = '<div class="ui-timepicker-div' + (o.isRTL ? " ui-timepicker-rtl" : "") + (o.oneLine && o.controlType === "select" ? " ui-timepicker-oneLine" : "") + '"><dl><dt class="ui_tpicker_time_label' + ((o.showTime) ? "" : noDisplay) + '">' + o.timeText + '</dt><dd class="ui_tpicker_time ' + ((o.showTime) ? "" : noDisplay) + '"><input class="ui_tpicker_time_input" ' + (o.timeInput ? "" : "disabled") + "/></dd>";
                for (i = 0,
                l = this.units.length; i < l; i++) {
                    litem = this.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    show = o["show" + uitem] !== null ? o["show" + uitem] : this.support[litem];
                    max[litem] = parseInt((o[litem + "Max"] - ((o[litem + "Max"] - o[litem + "Min"]) % o["step" + uitem])), 10);
                    gridSize[litem] = 0;
                    html += '<dt class="ui_tpicker_' + litem + "_label" + (show ? "" : noDisplay) + '">' + o[litem + "Text"] + '</dt><dd class="ui_tpicker_' + litem + (show ? "" : noDisplay) + '"><div class="ui_tpicker_' + litem + "_slider" + (show ? "" : noDisplay) + '"></div>';
                    if (show && o[litem + "Grid"] > 0) {
                        html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
                        if (litem === "hour") {
                            for (var h = o[litem + "Min"]; h <= max[litem]; h += parseInt(o[litem + "Grid"], 10)) {
                                gridSize[litem]++;
                                var tmph = $.datepicker.formatTime(this.support.ampm ? "hht" : "HH", {
                                    hour: h
                                }, o);
                                html += '<td data-for="' + litem + '">' + tmph + "</td>"
                            }
                        } else {
                            for (var m = o[litem + "Min"]; m <= max[litem]; m += parseInt(o[litem + "Grid"], 10)) {
                                gridSize[litem]++;
                                html += '<td data-for="' + litem + '">' + ((m < 10) ? "0" : "") + m + "</td>"
                            }
                        }
                        html += "</tr></table></div>"
                    }
                    html += "</dd>"
                }
                var showTz = o.showTimezone !== null ? o.showTimezone : this.support.timezone;
                html += '<dt class="ui_tpicker_timezone_label' + (showTz ? "" : noDisplay) + '">' + o.timezoneText + "</dt>";
                html += '<dd class="ui_tpicker_timezone' + (showTz ? "" : noDisplay) + '"></dd>';
                html += "</dl></div>";
                var $tp = $(html);
                if (o.timeOnly === true) {
                    $tp.prepend('<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + o.timeOnlyTitle + "</div></div>");
                    $dp.find(".ui-datepicker-header, .ui-datepicker-calendar").hide()
                }
                for (i = 0,
                l = tp_inst.units.length; i < l; i++) {
                    litem = tp_inst.units[i];
                    uitem = litem.substr(0, 1).toUpperCase() + litem.substr(1);
                    show = o["show" + uitem] !== null ? o["show" + uitem] : this.support[litem];
                    tp_inst[litem + "_slider"] = tp_inst.control.create(tp_inst, $tp.find(".ui_tpicker_" + litem + "_slider"), litem, tp_inst[litem], o[litem + "Min"], max[litem], o["step" + uitem]);
                    if (show && o[litem + "Grid"] > 0) {
                        size = 100 * gridSize[litem] * o[litem + "Grid"] / (max[litem] - o[litem + "Min"]);
                        $tp.find(".ui_tpicker_" + litem + " table").css({
                            width: size + "%",
                            marginLeft: o.isRTL ? "0" : ((size / (-2 * gridSize[litem])) + "%"),
                            marginRight: o.isRTL ? ((size / (-2 * gridSize[litem])) + "%") : "0",
                            borderCollapse: "collapse"
                        }).find("td").click(function(e) {
                            var $t = $(this)
                              , h = $t.html()
                              , n = parseInt(h.replace(/[^0-9]/g), 10)
                              , ap = h.replace(/[^apm]/ig)
                              , f = $t.data("for");
                            if (f === "hour") {
                                if (ap.indexOf("p") !== -1 && n < 12) {
                                    n += 12
                                } else {
                                    if (ap.indexOf("a") !== -1 && n === 12) {
                                        n = 0
                                    }
                                }
                            }
                            tp_inst.control.value(tp_inst, tp_inst[f + "_slider"], litem, n);
                            tp_inst._onTimeChange();
                            tp_inst._onSelectHandler()
                        }).css({
                            cursor: "pointer",
                            width: (100 / gridSize[litem]) + "%",
                            textAlign: "center",
                            overflow: "hidden"
                        })
                    }
                }
                this.timezone_select = $tp.find(".ui_tpicker_timezone").append("<select></select>").find("select");
                $.fn.append.apply(this.timezone_select, $.map(o.timezoneList, function(val, idx) {
                    return $("<option />").val(typeof val === "object" ? val.value : val).text(typeof val === "object" ? val.label : val)
                }));
                if (typeof (this.timezone) !== "undefined" && this.timezone !== null && this.timezone !== "") {
                    var local_timezone = (new Date(this.inst.selectedYear,this.inst.selectedMonth,this.inst.selectedDay,12)).getTimezoneOffset() * -1;
                    if (local_timezone === this.timezone) {
                        selectLocalTimezone(tp_inst)
                    } else {
                        this.timezone_select.val(this.timezone)
                    }
                } else {
                    if (typeof (this.hour) !== "undefined" && this.hour !== null && this.hour !== "") {
                        this.timezone_select.val(o.timezone)
                    } else {
                        selectLocalTimezone(tp_inst)
                    }
                }
                this.timezone_select.change(function() {
                    tp_inst._onTimeChange();
                    tp_inst._onSelectHandler();
                    tp_inst._afterInject()
                });
                var $buttonPanel = $dp.find(".ui-datepicker-buttonpane");
                if ($buttonPanel.length) {
                    $buttonPanel.before($tp)
                } else {
                    $dp.append($tp)
                }
                this.$timeObj = $tp.find(".ui_tpicker_time_input");
                this.$timeObj.change(function() {
                    var timeFormat = tp_inst.inst.settings.timeFormat;
                    var parsedTime = $.datepicker.parseTime(timeFormat, this.value);
                    var update = new Date();
                    if (parsedTime) {
                        update.setHours(parsedTime.hour);
                        update.setMinutes(parsedTime.minute);
                        update.setSeconds(parsedTime.second);
                        $.datepicker._setTime(tp_inst.inst, update)
                    } else {
                        this.value = tp_inst.formattedTime;
                        this.blur()
                    }
                });
                if (this.inst !== null) {
                    var timeDefined = this.timeDefined;
                    this._onTimeChange();
                    this.timeDefined = timeDefined
                }
                if (this._defaults.addSliderAccess) {
                    var sliderAccessArgs = this._defaults.sliderAccessArgs
                      , rtl = this._defaults.isRTL;
                    sliderAccessArgs.isRTL = rtl;
                    setTimeout(function() {
                        if ($tp.find(".ui-slider-access").length === 0) {
                            $tp.find(".ui-slider:visible").sliderAccess(sliderAccessArgs);
                            var sliderAccessWidth = $tp.find(".ui-slider-access:eq(0)").outerWidth(true);
                            if (sliderAccessWidth) {
                                $tp.find("table:visible").each(function() {
                                    var $g = $(this)
                                      , oldWidth = $g.outerWidth()
                                      , oldMarginLeft = $g.css(rtl ? "marginRight" : "marginLeft").toString().replace("%", "")
                                      , newWidth = oldWidth - sliderAccessWidth
                                      , newMarginLeft = ((oldMarginLeft * newWidth) / oldWidth) + "%"
                                      , css = {
                                        width: newWidth,
                                        marginRight: 0,
                                        marginLeft: 0
                                    };
                                    css[rtl ? "marginRight" : "marginLeft"] = newMarginLeft;
                                    $g.css(css)
                                })
                            }
                        }
                    }, 10)
                }
                tp_inst._limitMinMaxDateTime(this.inst, true)
            }
        },
        _limitMinMaxDateTime: function(dp_inst, adjustSliders) {
            var o = this._defaults
              , dp_date = new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay);
            if (!this._defaults.showTimepicker) {
                return
            }
            if ($.datepicker._get(dp_inst, "minDateTime") !== null && $.datepicker._get(dp_inst, "minDateTime") !== undefined && dp_date) {
                var minDateTime = $.datepicker._get(dp_inst, "minDateTime")
                  , minDateTimeDate = new Date(minDateTime.getFullYear(),minDateTime.getMonth(),minDateTime.getDate(),0,0,0,0);
                if (this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null || this.microsecMinOriginal === null) {
                    this.hourMinOriginal = o.hourMin;
                    this.minuteMinOriginal = o.minuteMin;
                    this.secondMinOriginal = o.secondMin;
                    this.millisecMinOriginal = o.millisecMin;
                    this.microsecMinOriginal = o.microsecMin
                }
                if (dp_inst.settings.timeOnly || minDateTimeDate.getTime() === dp_date.getTime()) {
                    this._defaults.hourMin = minDateTime.getHours();
                    if (this.hour <= this._defaults.hourMin) {
                        this.hour = this._defaults.hourMin;
                        this._defaults.minuteMin = minDateTime.getMinutes();
                        if (this.minute <= this._defaults.minuteMin) {
                            this.minute = this._defaults.minuteMin;
                            this._defaults.secondMin = minDateTime.getSeconds();
                            if (this.second <= this._defaults.secondMin) {
                                this.second = this._defaults.secondMin;
                                this._defaults.millisecMin = minDateTime.getMilliseconds();
                                if (this.millisec <= this._defaults.millisecMin) {
                                    this.millisec = this._defaults.millisecMin;
                                    this._defaults.microsecMin = minDateTime.getMicroseconds()
                                } else {
                                    if (this.microsec < this._defaults.microsecMin) {
                                        this.microsec = this._defaults.microsecMin
                                    }
                                    this._defaults.microsecMin = this.microsecMinOriginal
                                }
                            } else {
                                this._defaults.millisecMin = this.millisecMinOriginal;
                                this._defaults.microsecMin = this.microsecMinOriginal
                            }
                        } else {
                            this._defaults.secondMin = this.secondMinOriginal;
                            this._defaults.millisecMin = this.millisecMinOriginal;
                            this._defaults.microsecMin = this.microsecMinOriginal
                        }
                    } else {
                        this._defaults.minuteMin = this.minuteMinOriginal;
                        this._defaults.secondMin = this.secondMinOriginal;
                        this._defaults.millisecMin = this.millisecMinOriginal;
                        this._defaults.microsecMin = this.microsecMinOriginal
                    }
                } else {
                    this._defaults.hourMin = this.hourMinOriginal;
                    this._defaults.minuteMin = this.minuteMinOriginal;
                    this._defaults.secondMin = this.secondMinOriginal;
                    this._defaults.millisecMin = this.millisecMinOriginal;
                    this._defaults.microsecMin = this.microsecMinOriginal
                }
            }
            if ($.datepicker._get(dp_inst, "maxDateTime") !== null && $.datepicker._get(dp_inst, "maxDateTime") !== undefined && dp_date) {
                var maxDateTime = $.datepicker._get(dp_inst, "maxDateTime")
                  , maxDateTimeDate = new Date(maxDateTime.getFullYear(),maxDateTime.getMonth(),maxDateTime.getDate(),0,0,0,0);
                if (this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null || this.millisecMaxOriginal === null) {
                    this.hourMaxOriginal = o.hourMax;
                    this.minuteMaxOriginal = o.minuteMax;
                    this.secondMaxOriginal = o.secondMax;
                    this.millisecMaxOriginal = o.millisecMax;
                    this.microsecMaxOriginal = o.microsecMax
                }
                if (dp_inst.settings.timeOnly || maxDateTimeDate.getTime() === dp_date.getTime()) {
                    this._defaults.hourMax = maxDateTime.getHours();
                    if (this.hour >= this._defaults.hourMax) {
                        this.hour = this._defaults.hourMax;
                        this._defaults.minuteMax = maxDateTime.getMinutes();
                        if (this.minute >= this._defaults.minuteMax) {
                            this.minute = this._defaults.minuteMax;
                            this._defaults.secondMax = maxDateTime.getSeconds();
                            if (this.second >= this._defaults.secondMax) {
                                this.second = this._defaults.secondMax;
                                this._defaults.millisecMax = maxDateTime.getMilliseconds();
                                if (this.millisec >= this._defaults.millisecMax) {
                                    this.millisec = this._defaults.millisecMax;
                                    this._defaults.microsecMax = maxDateTime.getMicroseconds()
                                } else {
                                    if (this.microsec > this._defaults.microsecMax) {
                                        this.microsec = this._defaults.microsecMax
                                    }
                                    this._defaults.microsecMax = this.microsecMaxOriginal
                                }
                            } else {
                                this._defaults.millisecMax = this.millisecMaxOriginal;
                                this._defaults.microsecMax = this.microsecMaxOriginal
                            }
                        } else {
                            this._defaults.secondMax = this.secondMaxOriginal;
                            this._defaults.millisecMax = this.millisecMaxOriginal;
                            this._defaults.microsecMax = this.microsecMaxOriginal
                        }
                    } else {
                        this._defaults.minuteMax = this.minuteMaxOriginal;
                        this._defaults.secondMax = this.secondMaxOriginal;
                        this._defaults.millisecMax = this.millisecMaxOriginal;
                        this._defaults.microsecMax = this.microsecMaxOriginal
                    }
                } else {
                    this._defaults.hourMax = this.hourMaxOriginal;
                    this._defaults.minuteMax = this.minuteMaxOriginal;
                    this._defaults.secondMax = this.secondMaxOriginal;
                    this._defaults.millisecMax = this.millisecMaxOriginal;
                    this._defaults.microsecMax = this.microsecMaxOriginal
                }
            }
            if (dp_inst.settings.minTime !== null) {
                var tempMinTime = new Date("01/01/1970 " + dp_inst.settings.minTime);
                if (this.hour < tempMinTime.getHours()) {
                    this.hour = this._defaults.hourMin = tempMinTime.getHours();
                    this.minute = this._defaults.minuteMin = tempMinTime.getMinutes()
                } else {
                    if (this.hour === tempMinTime.getHours() && this.minute < tempMinTime.getMinutes()) {
                        this.minute = this._defaults.minuteMin = tempMinTime.getMinutes()
                    } else {
                        if (this._defaults.hourMin < tempMinTime.getHours()) {
                            this._defaults.hourMin = tempMinTime.getHours();
                            this._defaults.minuteMin = tempMinTime.getMinutes()
                        } else {
                            if (this._defaults.hourMin === tempMinTime.getHours() === this.hour && this._defaults.minuteMin < tempMinTime.getMinutes()) {
                                this._defaults.minuteMin = tempMinTime.getMinutes()
                            } else {
                                this._defaults.minuteMin = 0
                            }
                        }
                    }
                }
            }
            if (dp_inst.settings.maxTime !== null) {
                var tempMaxTime = new Date("01/01/1970 " + dp_inst.settings.maxTime);
                if (this.hour > tempMaxTime.getHours()) {
                    this.hour = this._defaults.hourMax = tempMaxTime.getHours();
                    this.minute = this._defaults.minuteMax = tempMaxTime.getMinutes()
                } else {
                    if (this.hour === tempMaxTime.getHours() && this.minute > tempMaxTime.getMinutes()) {
                        this.minute = this._defaults.minuteMax = tempMaxTime.getMinutes()
                    } else {
                        if (this._defaults.hourMax > tempMaxTime.getHours()) {
                            this._defaults.hourMax = tempMaxTime.getHours();
                            this._defaults.minuteMax = tempMaxTime.getMinutes()
                        } else {
                            if (this._defaults.hourMax === tempMaxTime.getHours() === this.hour && this._defaults.minuteMax > tempMaxTime.getMinutes()) {
                                this._defaults.minuteMax = tempMaxTime.getMinutes()
                            } else {
                                this._defaults.minuteMax = 59
                            }
                        }
                    }
                }
            }
            if (adjustSliders !== undefined && adjustSliders === true) {
                var hourMax = parseInt((this._defaults.hourMax - ((this._defaults.hourMax - this._defaults.hourMin) % this._defaults.stepHour)), 10)
                  , minMax = parseInt((this._defaults.minuteMax - ((this._defaults.minuteMax - this._defaults.minuteMin) % this._defaults.stepMinute)), 10)
                  , secMax = parseInt((this._defaults.secondMax - ((this._defaults.secondMax - this._defaults.secondMin) % this._defaults.stepSecond)), 10)
                  , millisecMax = parseInt((this._defaults.millisecMax - ((this._defaults.millisecMax - this._defaults.millisecMin) % this._defaults.stepMillisec)), 10)
                  , microsecMax = parseInt((this._defaults.microsecMax - ((this._defaults.microsecMax - this._defaults.microsecMin) % this._defaults.stepMicrosec)), 10);
                if (this.hour_slider) {
                    this.control.options(this, this.hour_slider, "hour", {
                        min: this._defaults.hourMin,
                        max: hourMax,
                        step: this._defaults.stepHour
                    });
                    this.control.value(this, this.hour_slider, "hour", this.hour - (this.hour % this._defaults.stepHour))
                }
                if (this.minute_slider) {
                    this.control.options(this, this.minute_slider, "minute", {
                        min: this._defaults.minuteMin,
                        max: minMax,
                        step: this._defaults.stepMinute
                    });
                    this.control.value(this, this.minute_slider, "minute", this.minute - (this.minute % this._defaults.stepMinute))
                }
                if (this.second_slider) {
                    this.control.options(this, this.second_slider, "second", {
                        min: this._defaults.secondMin,
                        max: secMax,
                        step: this._defaults.stepSecond
                    });
                    this.control.value(this, this.second_slider, "second", this.second - (this.second % this._defaults.stepSecond))
                }
                if (this.millisec_slider) {
                    this.control.options(this, this.millisec_slider, "millisec", {
                        min: this._defaults.millisecMin,
                        max: millisecMax,
                        step: this._defaults.stepMillisec
                    });
                    this.control.value(this, this.millisec_slider, "millisec", this.millisec - (this.millisec % this._defaults.stepMillisec))
                }
                if (this.microsec_slider) {
                    this.control.options(this, this.microsec_slider, "microsec", {
                        min: this._defaults.microsecMin,
                        max: microsecMax,
                        step: this._defaults.stepMicrosec
                    });
                    this.control.value(this, this.microsec_slider, "microsec", this.microsec - (this.microsec % this._defaults.stepMicrosec))
                }
            }
        },
        _onTimeChange: function() {
            if (!this._defaults.showTimepicker) {
                return
            }
            var hour = (this.hour_slider) ? this.control.value(this, this.hour_slider, "hour") : false
              , minute = (this.minute_slider) ? this.control.value(this, this.minute_slider, "minute") : false
              , second = (this.second_slider) ? this.control.value(this, this.second_slider, "second") : false
              , millisec = (this.millisec_slider) ? this.control.value(this, this.millisec_slider, "millisec") : false
              , microsec = (this.microsec_slider) ? this.control.value(this, this.microsec_slider, "microsec") : false
              , timezone = (this.timezone_select) ? this.timezone_select.val() : false
              , o = this._defaults
              , pickerTimeFormat = o.pickerTimeFormat || o.timeFormat
              , pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;
            if (typeof (hour) === "object") {
                hour = false
            }
            if (typeof (minute) === "object") {
                minute = false
            }
            if (typeof (second) === "object") {
                second = false
            }
            if (typeof (millisec) === "object") {
                millisec = false
            }
            if (typeof (microsec) === "object") {
                microsec = false
            }
            if (typeof (timezone) === "object") {
                timezone = false
            }
            if (hour !== false) {
                hour = parseInt(hour, 10)
            }
            if (minute !== false) {
                minute = parseInt(minute, 10)
            }
            if (second !== false) {
                second = parseInt(second, 10)
            }
            if (millisec !== false) {
                millisec = parseInt(millisec, 10)
            }
            if (microsec !== false) {
                microsec = parseInt(microsec, 10)
            }
            if (timezone !== false) {
                timezone = timezone.toString()
            }
            var ampm = o[hour < 12 ? "amNames" : "pmNames"][0];
            var hasChanged = (hour !== parseInt(this.hour, 10) || minute !== parseInt(this.minute, 10) || second !== parseInt(this.second, 10) || millisec !== parseInt(this.millisec, 10) || microsec !== parseInt(this.microsec, 10) || (this.ampm.length > 0 && (hour < 12) !== ($.inArray(this.ampm.toUpperCase(), this.amNames) !== -1)) || (this.timezone !== null && timezone !== this.timezone.toString()));
            if (hasChanged) {
                if (hour !== false) {
                    this.hour = hour
                }
                if (minute !== false) {
                    this.minute = minute
                }
                if (second !== false) {
                    this.second = second
                }
                if (millisec !== false) {
                    this.millisec = millisec
                }
                if (microsec !== false) {
                    this.microsec = microsec
                }
                if (timezone !== false) {
                    this.timezone = timezone
                }
                if (!this.inst) {
                    this.inst = $.datepicker._getInst(this.$input[0])
                }
                this._limitMinMaxDateTime(this.inst, true)
            }
            if (this.support.ampm) {
                this.ampm = ampm
            }
            this.formattedTime = $.datepicker.formatTime(o.timeFormat, this, o);
            if (this.$timeObj) {
                if (pickerTimeFormat === o.timeFormat) {
                    this.$timeObj.val(this.formattedTime + pickerTimeSuffix)
                } else {
                    this.$timeObj.val($.datepicker.formatTime(pickerTimeFormat, this, o) + pickerTimeSuffix)
                }
                if (this.$timeObj[0].setSelectionRange) {
                    var sPos = this.$timeObj[0].selectionStart;
                    var ePos = this.$timeObj[0].selectionEnd
                }
            }
            this.timeDefined = true;
            if (hasChanged) {
                this._updateDateTime()
            }
        },
        _onSelectHandler: function() {
            var onSelect = this._defaults.onSelect || this.inst.settings.onSelect;
            var inputEl = this.$input ? this.$input[0] : null;
            if (onSelect && inputEl) {
                onSelect.apply(inputEl, [this.formattedDateTime, this])
            }
        },
        _updateDateTime: function(dp_inst) {
            dp_inst = this.inst || dp_inst;
            var dtTmp = (dp_inst.currentYear > 0 ? new Date(dp_inst.currentYear,dp_inst.currentMonth,dp_inst.currentDay) : new Date(dp_inst.selectedYear,dp_inst.selectedMonth,dp_inst.selectedDay))
              , dt = $.datepicker._daylightSavingAdjust(dtTmp)
              , dateFmt = $.datepicker._get(dp_inst, "dateFormat")
              , formatCfg = $.datepicker._getFormatConfig(dp_inst)
              , timeAvailable = dt !== null && this.timeDefined;
            this.formattedDate = $.datepicker.formatDate(dateFmt, (dt === null ? new Date() : dt), formatCfg);
            var formattedDateTime = this.formattedDate;
            if (dp_inst.lastVal === "") {
                dp_inst.currentYear = dp_inst.selectedYear;
                dp_inst.currentMonth = dp_inst.selectedMonth;
                dp_inst.currentDay = dp_inst.selectedDay
            }
            if (this._defaults.timeOnly === true && this._defaults.timeOnlyShowDate === false) {
                formattedDateTime = this.formattedTime
            } else {
                if ((this._defaults.timeOnly !== true && (this._defaults.alwaysSetTime || timeAvailable)) || (this._defaults.timeOnly === true && this._defaults.timeOnlyShowDate === true)) {
                    formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix
                }
            }
            this.formattedDateTime = formattedDateTime;
            if (!this._defaults.showTimepicker) {
                this.$input.val(this.formattedDate)
            } else {
                if (this.$altInput && this._defaults.timeOnly === false && this._defaults.altFieldTimeOnly === true) {
                    this.$altInput.val(this.formattedTime);
                    this.$input.val(this.formattedDate)
                } else {
                    if (this.$altInput) {
                        this.$input.val(formattedDateTime);
                        var altFormattedDateTime = ""
                          , altSeparator = this._defaults.altSeparator !== null ? this._defaults.altSeparator : this._defaults.separator
                          , altTimeSuffix = this._defaults.altTimeSuffix !== null ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
                        if (!this._defaults.timeOnly) {
                            if (this._defaults.altFormat) {
                                altFormattedDateTime = $.datepicker.formatDate(this._defaults.altFormat, (dt === null ? new Date() : dt), formatCfg)
                            } else {
                                altFormattedDateTime = this.formattedDate
                            }
                            if (altFormattedDateTime) {
                                altFormattedDateTime += altSeparator
                            }
                        }
                        if (this._defaults.altTimeFormat !== null) {
                            altFormattedDateTime += $.datepicker.formatTime(this._defaults.altTimeFormat, this, this._defaults) + altTimeSuffix
                        } else {
                            altFormattedDateTime += this.formattedTime + altTimeSuffix
                        }
                        this.$altInput.val(altFormattedDateTime)
                    } else {
                        this.$input.val(formattedDateTime)
                    }
                }
            }
            this.$input.trigger("change")
        },
        _onFocus: function() {
            if (!this.$input.val() && this._defaults.defaultValue) {
                this.$input.val(this._defaults.defaultValue);
                var inst = $.datepicker._getInst(this.$input.get(0))
                  , tp_inst = $.datepicker._get(inst, "timepicker");
                if (tp_inst) {
                    if (tp_inst._defaults.timeOnly && (inst.input.val() !== inst.lastVal)) {
                        try {
                            $.datepicker._updateDatepicker(inst)
                        } catch (err) {
                            $.timepicker.log(err)
                        }
                    }
                }
            }
        },
        _controls: {
            slider: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var rtl = tp_inst._defaults.isRTL;
                    return obj.prop("slide", null).slider({
                        orientation: "horizontal",
                        value: rtl ? val * -1 : val,
                        min: rtl ? max * -1 : min,
                        max: rtl ? min * -1 : max,
                        step: step,
                        slide: function(event, ui) {
                            tp_inst.control.value(tp_inst, $(this), unit, rtl ? ui.value * -1 : ui.value);
                            tp_inst._onTimeChange()
                        },
                        stop: function(event, ui) {
                            tp_inst._onSelectHandler()
                        }
                    })
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (typeof (opts) === "string") {
                            if (opts === "min" || opts === "max") {
                                if (val !== undefined) {
                                    return obj.slider(opts, val * -1)
                                }
                                return Math.abs(obj.slider(opts))
                            }
                            return obj.slider(opts)
                        }
                        var min = opts.min
                          , max = opts.max;
                        opts.min = opts.max = null;
                        if (min !== undefined) {
                            opts.max = min * -1
                        }
                        if (max !== undefined) {
                            opts.min = max * -1
                        }
                        return obj.slider(opts)
                    }
                    if (typeof (opts) === "string" && val !== undefined) {
                        return obj.slider(opts, val)
                    }
                    return obj.slider(opts)
                },
                value: function(tp_inst, obj, unit, val) {
                    if (tp_inst._defaults.isRTL) {
                        if (val !== undefined) {
                            return obj.slider("value", val * -1)
                        }
                        return Math.abs(obj.slider("value"))
                    }
                    if (val !== undefined) {
                        return obj.slider("value", val)
                    }
                    return obj.slider("value")
                }
            },
            select: {
                create: function(tp_inst, obj, unit, val, min, max, step) {
                    var sel = '<select class="ui-timepicker-select ui-state-default ui-corner-all" data-unit="' + unit + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '">'
                      , format = tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat;
                    for (var i = min; i <= max; i += step) {
                        sel += '<option value="' + i + '"' + (i === val ? " selected" : "") + ">";
                        if (unit === "hour") {
                            sel += $.datepicker.formatTime($.trim(format.replace(/[^ht ]/ig, "")), {
                                hour: i
                            }, tp_inst._defaults)
                        } else {
                            if (unit === "millisec" || unit === "microsec" || i >= 10) {
                                sel += i
                            } else {
                                sel += "0" + i.toString()
                            }
                        }
                        sel += "</option>"
                    }
                    sel += "</select>";
                    obj.children("select").remove();
                    $(sel).appendTo(obj).change(function(e) {
                        tp_inst._onTimeChange();
                        tp_inst._onSelectHandler();
                        tp_inst._afterInject()
                    });
                    return obj
                },
                options: function(tp_inst, obj, unit, opts, val) {
                    var o = {}
                      , $t = obj.children("select");
                    if (typeof (opts) === "string") {
                        if (val === undefined) {
                            return $t.data(opts)
                        }
                        o[opts] = val
                    } else {
                        o = opts
                    }
                    return tp_inst.control.create(tp_inst, obj, $t.data("unit"), $t.val(), o.min >= 0 ? o.min : $t.data("min"), o.max || $t.data("max"), o.step || $t.data("step"))
                },
                value: function(tp_inst, obj, unit, val) {
                    var $t = obj.children("select");
                    if (val !== undefined) {
                        return $t.val(val)
                    }
                    return $t.val()
                }
            }
        }
    });
    $.fn.extend({
        timepicker: function(o) {
            o = o || {};
            var tmp_args = Array.prototype.slice.call(arguments);
            if (typeof o === "object") {
                tmp_args[0] = $.extend(o, {
                    timeOnly: true
                })
            }
            return $(this).each(function() {
                $.fn.datetimepicker.apply($(this), tmp_args)
            })
        },
        datetimepicker: function(o) {
            o = o || {};
            var tmp_args = arguments;
            if (typeof (o) === "string") {
                if (o === "getDate" || (o === "option" && tmp_args.length === 2 && typeof (tmp_args[1]) === "string")) {
                    return $.fn.datepicker.apply($(this[0]), tmp_args)
                } else {
                    return this.each(function() {
                        var $t = $(this);
                        $t.datepicker.apply($t, tmp_args)
                    })
                }
            } else {
                return this.each(function() {
                    var $t = $(this);
                    $t.datepicker($.timepicker._newInst($t, o)._defaults)
                })
            }
        }
    });
    $.datepicker.parseDateTime = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var parseRes = parseDateTimeInternal(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings);
        if (parseRes.timeObj) {
            var t = parseRes.timeObj;
            parseRes.date.setHours(t.hour, t.minute, t.second, t.millisec);
            parseRes.date.setMicroseconds(t.microsec)
        }
        return parseRes.date
    }
    ;
    $.datepicker.parseTime = function(timeFormat, timeString, options) {
        var o = extendRemove(extendRemove({}, $.timepicker._defaults), options || {})
          , iso8601 = (timeFormat.replace(/\'.*?\'/g, "").indexOf("Z") !== -1);
        var strictParse = function(f, s, o) {
            var getPatternAmpm = function(amNames, pmNames) {
                var markers = [];
                if (amNames) {
                    $.merge(markers, amNames)
                }
                if (pmNames) {
                    $.merge(markers, pmNames)
                }
                markers = $.map(markers, function(val) {
                    return val.replace(/[.*+?|()\[\]{}\\]/g, "\\$&")
                });
                return "(" + markers.join("|") + ")?"
            };
            var getFormatPositions = function(timeFormat) {
                var finds = timeFormat.toLowerCase().match(/(h{1,2}|m{1,2}|s{1,2}|l{1}|c{1}|t{1,2}|z|'.*?')/g)
                  , orders = {
                    h: -1,
                    m: -1,
                    s: -1,
                    l: -1,
                    c: -1,
                    t: -1,
                    z: -1
                };
                if (finds) {
                    for (var i = 0; i < finds.length; i++) {
                        if (orders[finds[i].toString().charAt(0)] === -1) {
                            orders[finds[i].toString().charAt(0)] = i + 1
                        }
                    }
                }
                return orders
            };
            var regstr = "^" + f.toString().replace(/([hH]{1,2}|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function(match) {
                var ml = match.length;
                switch (match.charAt(0).toLowerCase()) {
                case "h":
                    return ml === 1 ? "(\\d?\\d)" : "(\\d{" + ml + "})";
                case "m":
                    return ml === 1 ? "(\\d?\\d)" : "(\\d{" + ml + "})";
                case "s":
                    return ml === 1 ? "(\\d?\\d)" : "(\\d{" + ml + "})";
                case "l":
                    return "(\\d?\\d?\\d)";
                case "c":
                    return "(\\d?\\d?\\d)";
                case "z":
                    return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
                case "t":
                    return getPatternAmpm(o.amNames, o.pmNames);
                default:
                    return "(" + match.replace(/\'/g, "").replace(/(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, function(m) {
                        return "\\" + m
                    }) + ")?"
                }
            }).replace(/\s/g, "\\s?") + o.timeSuffix + "$", order = getFormatPositions(f), ampm = "", treg;
            treg = s.match(new RegExp(regstr,"i"));
            var resTime = {
                hour: 0,
                minute: 0,
                second: 0,
                millisec: 0,
                microsec: 0
            };
            if (treg) {
                if (order.t !== -1) {
                    if (treg[order.t] === undefined || treg[order.t].length === 0) {
                        ampm = "";
                        resTime.ampm = ""
                    } else {
                        ampm = $.inArray(treg[order.t].toUpperCase(), $.map(o.amNames, function(x, i) {
                            return x.toUpperCase()
                        })) !== -1 ? "AM" : "PM";
                        resTime.ampm = o[ampm === "AM" ? "amNames" : "pmNames"][0]
                    }
                }
                if (order.h !== -1) {
                    if (ampm === "AM" && treg[order.h] === "12") {
                        resTime.hour = 0
                    } else {
                        if (ampm === "PM" && treg[order.h] !== "12") {
                            resTime.hour = parseInt(treg[order.h], 10) + 12
                        } else {
                            resTime.hour = Number(treg[order.h])
                        }
                    }
                }
                if (order.m !== -1) {
                    resTime.minute = Number(treg[order.m])
                }
                if (order.s !== -1) {
                    resTime.second = Number(treg[order.s])
                }
                if (order.l !== -1) {
                    resTime.millisec = Number(treg[order.l])
                }
                if (order.c !== -1) {
                    resTime.microsec = Number(treg[order.c])
                }
                if (order.z !== -1 && treg[order.z] !== undefined) {
                    resTime.timezone = $.timepicker.timezoneOffsetNumber(treg[order.z])
                }
                return resTime
            }
            return false
        };
        var looseParse = function(f, s, o) {
            try {
                var d = new Date("2012-01-01 " + s);
                if (isNaN(d.getTime())) {
                    d = new Date("2012-01-01T" + s);
                    if (isNaN(d.getTime())) {
                        d = new Date("01/01/2012 " + s);
                        if (isNaN(d.getTime())) {
                            throw "Unable to parse time with native Date: " + s
                        }
                    }
                }
                return {
                    hour: d.getHours(),
                    minute: d.getMinutes(),
                    second: d.getSeconds(),
                    millisec: d.getMilliseconds(),
                    microsec: d.getMicroseconds(),
                    timezone: d.getTimezoneOffset() * -1
                }
            } catch (err) {
                try {
                    return strictParse(f, s, o)
                } catch (err2) {
                    $.timepicker.log("Unable to parse \ntimeString: " + s + "\ntimeFormat: " + f)
                }
            }
            return false
        };
        if (typeof o.parse === "function") {
            return o.parse(timeFormat, timeString, o)
        }
        if (o.parse === "loose") {
            return looseParse(timeFormat, timeString, o)
        }
        return strictParse(timeFormat, timeString, o)
    }
    ;
    $.datepicker.formatTime = function(format, time, options) {
        options = options || {};
        options = $.extend({}, $.timepicker._defaults, options);
        time = $.extend({
            hour: 0,
            minute: 0,
            second: 0,
            millisec: 0,
            microsec: 0,
            timezone: null
        }, time);
        var tmptime = format
          , ampmName = options.amNames[0]
          , hour = parseInt(time.hour, 10);
        if (hour > 11) {
            ampmName = options.pmNames[0]
        }
        tmptime = tmptime.replace(/(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[zZ]|[lc]|'.*?')/g, function(match) {
            switch (match) {
            case "HH":
                return ("0" + hour).slice(-2);
            case "H":
                return hour;
            case "hh":
                return ("0" + convert24to12(hour)).slice(-2);
            case "h":
                return convert24to12(hour);
            case "mm":
                return ("0" + time.minute).slice(-2);
            case "m":
                return time.minute;
            case "ss":
                return ("0" + time.second).slice(-2);
            case "s":
                return time.second;
            case "l":
                return ("00" + time.millisec).slice(-3);
            case "c":
                return ("00" + time.microsec).slice(-3);
            case "z":
                return $.timepicker.timezoneOffsetString(time.timezone === null ? options.timezone : time.timezone, false);
            case "Z":
                return $.timepicker.timezoneOffsetString(time.timezone === null ? options.timezone : time.timezone, true);
            case "T":
                return ampmName.charAt(0).toUpperCase();
            case "TT":
                return ampmName.toUpperCase();
            case "t":
                return ampmName.charAt(0).toLowerCase();
            case "tt":
                return ampmName.toLowerCase();
            default:
                return match.replace(/'/g, "")
            }
        });
        return tmptime
    }
    ;
    $.datepicker._base_selectDate = $.datepicker._selectDate;
    $.datepicker._selectDate = function(id, dateStr) {
        var inst = this._getInst($(id)[0]), tp_inst = this._get(inst, "timepicker"), was_inline;
        if (tp_inst && inst.settings.showTimepicker) {
            tp_inst._limitMinMaxDateTime(inst, true);
            was_inline = inst.inline;
            inst.inline = inst.stay_open = true;
            this._base_selectDate(id, dateStr);
            inst.inline = was_inline;
            inst.stay_open = false;
            this._notifyChange(inst);
            this._updateDatepicker(inst)
        } else {
            this._base_selectDate(id, dateStr)
        }
    }
    ;
    $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(inst) {
        var input = inst.input[0];
        if ($.datepicker._curInst && $.datepicker._curInst !== inst && $.datepicker._datepickerShowing && $.datepicker._lastInput !== input) {
            return
        }
        if (typeof (inst.stay_open) !== "boolean" || inst.stay_open === false) {
            this._base_updateDatepicker(inst);
            var tp_inst = this._get(inst, "timepicker");
            if (tp_inst) {
                tp_inst._addTimePicker(inst)
            }
        }
    }
    ;
    $.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
    $.datepicker._doKeyPress = function(event) {
        var inst = $.datepicker._getInst(event.target)
          , tp_inst = $.datepicker._get(inst, "timepicker");
        if (tp_inst) {
            if ($.datepicker._get(inst, "constrainInput")) {
                var ampm = tp_inst.support.ampm
                  , tz = tp_inst._defaults.showTimezone !== null ? tp_inst._defaults.showTimezone : tp_inst.support.timezone
                  , dateChars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"))
                  , datetimeChars = tp_inst._defaults.timeFormat.toString().replace(/[hms]/g, "").replace(/TT/g, ampm ? "APM" : "").replace(/Tt/g, ampm ? "AaPpMm" : "").replace(/tT/g, ampm ? "AaPpMm" : "").replace(/T/g, ampm ? "AP" : "").replace(/tt/g, ampm ? "apm" : "").replace(/t/g, ampm ? "ap" : "") + " " + tp_inst._defaults.separator + tp_inst._defaults.timeSuffix + (tz ? tp_inst._defaults.timezoneList.join("") : "") + (tp_inst._defaults.amNames.join("")) + (tp_inst._defaults.pmNames.join("")) + dateChars
                  , chr = String.fromCharCode(event.charCode === undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || (chr < " " || !dateChars || datetimeChars.indexOf(chr) > -1)
            }
        }
        return $.datepicker._base_doKeyPress(event)
    }
    ;
    $.datepicker._base_updateAlternate = $.datepicker._updateAlternate;
    $.datepicker._updateAlternate = function(inst) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var altField = tp_inst._defaults.altField;
            if (altField) {
                var altFormat = tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat
                  , date = this._getDate(inst)
                  , formatCfg = $.datepicker._getFormatConfig(inst)
                  , altFormattedDateTime = ""
                  , altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator : tp_inst._defaults.separator
                  , altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix : tp_inst._defaults.timeSuffix
                  , altTimeFormat = tp_inst._defaults.altTimeFormat !== null ? tp_inst._defaults.altTimeFormat : tp_inst._defaults.timeFormat;
                altFormattedDateTime += $.datepicker.formatTime(altTimeFormat, tp_inst, tp_inst._defaults) + altTimeSuffix;
                if (!tp_inst._defaults.timeOnly && !tp_inst._defaults.altFieldTimeOnly && date !== null) {
                    if (tp_inst._defaults.altFormat) {
                        altFormattedDateTime = $.datepicker.formatDate(tp_inst._defaults.altFormat, date, formatCfg) + altSeparator + altFormattedDateTime
                    } else {
                        altFormattedDateTime = tp_inst.formattedDate + altSeparator + altFormattedDateTime
                    }
                }
                $(altField).val(inst.input.val() ? altFormattedDateTime : "")
            }
        } else {
            $.datepicker._base_updateAlternate(inst)
        }
    }
    ;
    $.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
    $.datepicker._doKeyUp = function(event) {
        var inst = $.datepicker._getInst(event.target)
          , tp_inst = $.datepicker._get(inst, "timepicker");
        if (tp_inst) {
            if (tp_inst._defaults.timeOnly && (inst.input.val() !== inst.lastVal)) {
                try {
                    $.datepicker._updateDatepicker(inst)
                } catch (err) {
                    $.timepicker.log(err)
                }
            }
        }
        return $.datepicker._base_doKeyUp(event)
    }
    ;
    $.datepicker._base_gotoToday = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function(id) {
        var inst = this._getInst($(id)[0]);
        this._base_gotoToday(id);
        var tp_inst = this._get(inst, "timepicker");
        if (!tp_inst) {
            return
        }
        var tzoffset = $.timepicker.timezoneOffsetNumber(tp_inst.timezone);
        var now = new Date();
        now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + parseInt(tzoffset, 10));
        this._setTime(inst, now);
        this._setDate(inst, now);
        tp_inst._onSelectHandler()
    }
    ;
    $.datepicker._disableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        $(target).datepicker("getDate");
        if (tp_inst) {
            inst.settings.showTimepicker = false;
            tp_inst._defaults.showTimepicker = false;
            tp_inst._updateDateTime(inst)
        }
    }
    ;
    $.datepicker._enableTimepickerDatepicker = function(target) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        $(target).datepicker("getDate");
        if (tp_inst) {
            inst.settings.showTimepicker = true;
            tp_inst._defaults.showTimepicker = true;
            tp_inst._addTimePicker(inst);
            tp_inst._updateDateTime(inst)
        }
    }
    ;
    $.datepicker._setTime = function(inst, date) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var defaults = tp_inst._defaults;
            tp_inst.hour = date ? date.getHours() : defaults.hour;
            tp_inst.minute = date ? date.getMinutes() : defaults.minute;
            tp_inst.second = date ? date.getSeconds() : defaults.second;
            tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec;
            tp_inst.microsec = date ? date.getMicroseconds() : defaults.microsec;
            tp_inst._limitMinMaxDateTime(inst, true);
            tp_inst._onTimeChange();
            tp_inst._updateDateTime(inst)
        }
    }
    ;
    $.datepicker._setTimeDatepicker = function(target, date, withDate) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            this._setDateFromField(inst);
            var tp_date;
            if (date) {
                if (typeof date === "string") {
                    tp_inst._parseTime(date, withDate);
                    tp_date = new Date();
                    tp_date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
                    tp_date.setMicroseconds(tp_inst.microsec)
                } else {
                    tp_date = new Date(date.getTime());
                    tp_date.setMicroseconds(date.getMicroseconds())
                }
                if (tp_date.toString() === "Invalid Date") {
                    tp_date = undefined
                }
                this._setTime(inst, tp_date)
            }
        }
    }
    ;
    $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
    $.datepicker._setDateDatepicker = function(target, _date) {
        var inst = this._getInst(target);
        var date = _date;
        if (!inst) {
            return
        }
        if (typeof (_date) === "string") {
            date = new Date(_date);
            if (!date.getTime()) {
                this._base_setDateDatepicker.apply(this, arguments);
                date = $(target).datepicker("getDate")
            }
        }
        var tp_inst = this._get(inst, "timepicker");
        var tp_date;
        if (date instanceof Date) {
            tp_date = new Date(date.getTime());
            tp_date.setMicroseconds(date.getMicroseconds())
        } else {
            tp_date = date
        }
        if (tp_inst && tp_date) {
            if (!tp_inst.support.timezone && tp_inst._defaults.timezone === null) {
                tp_inst.timezone = tp_date.getTimezoneOffset() * -1
            }
            date = $.timepicker.timezoneAdjust(date, $.timepicker.timezoneOffsetString(-date.getTimezoneOffset()), tp_inst.timezone);
            tp_date = $.timepicker.timezoneAdjust(tp_date, $.timepicker.timezoneOffsetString(-tp_date.getTimezoneOffset()), tp_inst.timezone)
        }
        this._updateDatepicker(inst);
        this._base_setDateDatepicker.apply(this, arguments);
        this._setTimeDatepicker(target, tp_date, true)
    }
    ;
    $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
    $.datepicker._getDateDatepicker = function(target, noDefault) {
        var inst = this._getInst(target);
        if (!inst) {
            return
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            if (inst.lastVal === undefined) {
                this._setDateFromField(inst, noDefault)
            }
            var date = this._getDate(inst);
            var currDT = null;
            if (tp_inst.$altInput && tp_inst._defaults.altFieldTimeOnly) {
                currDT = tp_inst.$input.val() + " " + tp_inst.$altInput.val()
            } else {
                if (tp_inst.$input.get(0).tagName !== "INPUT" && tp_inst.$altInput) {
                    currDT = tp_inst.$altInput.val()
                } else {
                    currDT = tp_inst.$input.val()
                }
            }
            if (date && tp_inst._parseTime(currDT, !inst.settings.timeOnly)) {
                date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
                date.setMicroseconds(tp_inst.microsec);
                if (tp_inst.timezone != null) {
                    if (!tp_inst.support.timezone && tp_inst._defaults.timezone === null) {
                        tp_inst.timezone = date.getTimezoneOffset() * -1
                    }
                    date = $.timepicker.timezoneAdjust(date, tp_inst.timezone, $.timepicker.timezoneOffsetString(-date.getTimezoneOffset()))
                }
            }
            return date
        }
        return this._base_getDateDatepicker(target, noDefault)
    }
    ;
    $.datepicker._base_parseDate = $.datepicker.parseDate;
    $.datepicker.parseDate = function(format, value, settings) {
        var date;
        try {
            date = this._base_parseDate(format, value, settings)
        } catch (err) {
            if (err.indexOf(":") >= 0) {
                date = this._base_parseDate(format, value.substring(0, value.length - (err.length - err.indexOf(":") - 2)), settings);
                $.timepicker.log("Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format)
            } else {
                throw err
            }
        }
        return date
    }
    ;
    $.datepicker._base_formatDate = $.datepicker._formatDate;
    $.datepicker._formatDate = function(inst, day, month, year) {
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            tp_inst._updateDateTime(inst);
            return tp_inst.$input.val()
        }
        return this._base_formatDate(inst)
    }
    ;
    $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
    $.datepicker._optionDatepicker = function(target, name, value) {
        var inst = this._getInst(target), name_clone;
        if (!inst) {
            return null
        }
        var tp_inst = this._get(inst, "timepicker");
        if (tp_inst) {
            var min = null, max = null, onselect = null, overrides = tp_inst._defaults.evnts, fns = {}, prop, ret, oldVal, $target;
            if (typeof name === "string") {
                if (name === "minDate" || name === "minDateTime") {
                    min = value
                } else {
                    if (name === "maxDate" || name === "maxDateTime") {
                        max = value
                    } else {
                        if (name === "onSelect") {
                            onselect = value
                        } else {
                            if (overrides.hasOwnProperty(name)) {
                                if (typeof (value) === "undefined") {
                                    return overrides[name]
                                }
                                fns[name] = value;
                                name_clone = {}
                            }
                        }
                    }
                }
            } else {
                if (typeof name === "object") {
                    if (name.minDate) {
                        min = name.minDate
                    } else {
                        if (name.minDateTime) {
                            min = name.minDateTime
                        } else {
                            if (name.maxDate) {
                                max = name.maxDate
                            } else {
                                if (name.maxDateTime) {
                                    max = name.maxDateTime
                                }
                            }
                        }
                    }
                    for (prop in overrides) {
                        if (overrides.hasOwnProperty(prop) && name[prop]) {
                            fns[prop] = name[prop]
                        }
                    }
                }
            }
            for (prop in fns) {
                if (fns.hasOwnProperty(prop)) {
                    overrides[prop] = fns[prop];
                    if (!name_clone) {
                        name_clone = $.extend({}, name)
                    }
                    delete name_clone[prop]
                }
            }
            if (name_clone && isEmptyObject(name_clone)) {
                return
            }
            if (min) {
                if (min === 0) {
                    min = new Date()
                } else {
                    min = new Date(min)
                }
                tp_inst._defaults.minDate = min;
                tp_inst._defaults.minDateTime = min
            } else {
                if (max) {
                    if (max === 0) {
                        max = new Date()
                    } else {
                        max = new Date(max)
                    }
                    tp_inst._defaults.maxDate = max;
                    tp_inst._defaults.maxDateTime = max
                } else {
                    if (onselect) {
                        tp_inst._defaults.onSelect = onselect
                    }
                }
            }
            if (min || max) {
                $target = $(target);
                oldVal = $target.datetimepicker("getDate");
                ret = this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value);
                $target.datetimepicker("setDate", oldVal);
                return ret
            }
        }
        if (value === undefined) {
            return this._base_optionDatepicker.call($.datepicker, target, name)
        }
        return this._base_optionDatepicker.call($.datepicker, target, name_clone || name, value)
    }
    ;
    var isEmptyObject = function(obj) {
        var prop;
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false
            }
        }
        return true
    };
    var extendRemove = function(target, props) {
        $.extend(target, props);
        for (var name in props) {
            if (props[name] === null || props[name] === undefined) {
                target[name] = props[name]
            }
        }
        return target
    };
    var detectSupport = function(timeFormat) {
        var tf = timeFormat.replace(/'.*?'/g, "").toLowerCase()
          , isIn = function(f, t) {
            return f.indexOf(t) !== -1 ? true : false
        };
        return {
            hour: isIn(tf, "h"),
            minute: isIn(tf, "m"),
            second: isIn(tf, "s"),
            millisec: isIn(tf, "l"),
            microsec: isIn(tf, "c"),
            timezone: isIn(tf, "z"),
            ampm: isIn(tf, "t") && isIn(timeFormat, "h"),
            iso8601: isIn(timeFormat, "Z")
        }
    };
    var convert24to12 = function(hour) {
        hour %= 12;
        if (hour === 0) {
            hour = 12
        }
        return String(hour)
    };
    var computeEffectiveSetting = function(settings, property) {
        return settings && settings[property] ? settings[property] : $.timepicker._defaults[property]
    };
    var splitDateTime = function(dateTimeString, timeSettings) {
        var separator = computeEffectiveSetting(timeSettings, "separator")
          , format = computeEffectiveSetting(timeSettings, "timeFormat")
          , timeParts = format.split(separator)
          , timePartsLen = timeParts.length
          , allParts = dateTimeString.split(separator)
          , allPartsLen = allParts.length;
        if (allPartsLen > 1) {
            return {
                dateString: allParts.splice(0, allPartsLen - timePartsLen).join(separator),
                timeString: allParts.splice(0, timePartsLen).join(separator)
            }
        }
        return {
            dateString: dateTimeString,
            timeString: ""
        }
    };
    var parseDateTimeInternal = function(dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) {
        var date, parts, parsedTime;
        parts = splitDateTime(dateTimeString, timeSettings);
        date = $.datepicker._base_parseDate(dateFormat, parts.dateString, dateSettings);
        if (parts.timeString === "") {
            return {
                date: date
            }
        }
        parsedTime = $.datepicker.parseTime(timeFormat, parts.timeString, timeSettings);
        if (!parsedTime) {
            throw "Wrong time format"
        }
        return {
            date: date,
            timeObj: parsedTime
        }
    };
    var selectLocalTimezone = function(tp_inst, date) {
        if (tp_inst && tp_inst.timezone_select) {
            var now = date || new Date();
            tp_inst.timezone_select.val(-now.getTimezoneOffset())
        }
    };
    $.timepicker = new Timepicker();
    $.timepicker.timezoneOffsetString = function(tzMinutes, iso8601) {
        if (isNaN(tzMinutes) || tzMinutes > 840 || tzMinutes < -720) {
            return tzMinutes
        }
        var off = tzMinutes
          , minutes = off % 60
          , hours = (off - minutes) / 60
          , iso = iso8601 ? ":" : ""
          , tz = (off >= 0 ? "+" : "-") + ("0" + Math.abs(hours)).slice(-2) + iso + ("0" + Math.abs(minutes)).slice(-2);
        if (tz === "+00:00") {
            return "Z"
        }
        return tz
    }
    ;
    $.timepicker.timezoneOffsetNumber = function(tzString) {
        var normalized = tzString.toString().replace(":", "");
        if (normalized.toUpperCase() === "Z") {
            return 0
        }
        if (!/^(\-|\+)\d{4}$/.test(normalized)) {
            return parseInt(tzString, 10)
        }
        return ((normalized.substr(0, 1) === "-" ? -1 : 1) * ((parseInt(normalized.substr(1, 2), 10) * 60) + parseInt(normalized.substr(3, 2), 10)))
    }
    ;
    $.timepicker.timezoneAdjust = function(date, fromTimezone, toTimezone) {
        var fromTz = $.timepicker.timezoneOffsetNumber(fromTimezone);
        var toTz = $.timepicker.timezoneOffsetNumber(toTimezone);
        if (!isNaN(toTz)) {
            date.setMinutes(date.getMinutes() + (-fromTz) - (-toTz))
        }
        return date
    }
    ;
    $.timepicker.timeRange = function(startTime, endTime, options) {
        return $.timepicker.handleRange("timepicker", startTime, endTime, options)
    }
    ;
    $.timepicker.datetimeRange = function(startTime, endTime, options) {
        $.timepicker.handleRange("datetimepicker", startTime, endTime, options)
    }
    ;
    $.timepicker.dateRange = function(startTime, endTime, options) {
        $.timepicker.handleRange("datepicker", startTime, endTime, options)
    }
    ;
    $.timepicker.handleRange = function(method, startTime, endTime, options) {
        options = $.extend({}, {
            minInterval: 0,
            maxInterval: 0,
            start: {},
            end: {}
        }, options);
        var timeOnly = false;
        if (method === "timepicker") {
            timeOnly = true;
            method = "datetimepicker"
        }
        function checkDates(changed, other) {
            var startdt = startTime[method]("getDate")
              , enddt = endTime[method]("getDate")
              , changeddt = changed[method]("getDate");
            if (startdt !== null) {
                var minDate = new Date(startdt.getTime())
                  , maxDate = new Date(startdt.getTime());
                minDate.setMilliseconds(minDate.getMilliseconds() + options.minInterval);
                maxDate.setMilliseconds(maxDate.getMilliseconds() + options.maxInterval);
                if (options.minInterval > 0 && minDate > enddt) {
                    endTime[method]("setDate", minDate)
                } else {
                    if (options.maxInterval > 0 && maxDate < enddt) {
                        endTime[method]("setDate", maxDate)
                    } else {
                        if (startdt > enddt) {
                            other[method]("setDate", changeddt)
                        }
                    }
                }
            }
        }
        function selected(changed, other, option) {
            if (!changed.val()) {
                return
            }
            var date = changed[method].call(changed, "getDate");
            if (date !== null && options.minInterval > 0) {
                if (option === "minDate") {
                    date.setMilliseconds(date.getMilliseconds() + options.minInterval)
                }
                if (option === "maxDate") {
                    date.setMilliseconds(date.getMilliseconds() - options.minInterval)
                }
            }
            if (date.getTime) {
                other[method].call(other, "option", option, date)
            }
        }
        $.fn[method].call(startTime, $.extend({
            timeOnly: timeOnly,
            onClose: function(dateText, inst) {
                checkDates($(this), endTime)
            },
            onSelect: function(selectedDateTime) {
                selected($(this), endTime, "minDate")
            }
        }, options, options.start));
        $.fn[method].call(endTime, $.extend({
            timeOnly: timeOnly,
            onClose: function(dateText, inst) {
                checkDates($(this), startTime)
            },
            onSelect: function(selectedDateTime) {
                selected($(this), startTime, "maxDate")
            }
        }, options, options.end));
        checkDates(startTime, endTime);
        selected(startTime, endTime, "minDate");
        selected(endTime, startTime, "maxDate");
        return $([startTime.get(0), endTime.get(0)])
    }
    ;
    $.timepicker.log = function() {
        if (window.console && window.console.log && window.console.log.apply) {
            window.console.log.apply(window.console, Array.prototype.slice.call(arguments))
        }
    }
    ;
    $.timepicker._util = {
        _extendRemove: extendRemove,
        _isEmptyObject: isEmptyObject,
        _convert24to12: convert24to12,
        _detectSupport: detectSupport,
        _selectLocalTimezone: selectLocalTimezone,
        _computeEffectiveSetting: computeEffectiveSetting,
        _splitDateTime: splitDateTime,
        _parseDateTimeInternal: parseDateTimeInternal
    };
    if (!Date.prototype.getMicroseconds) {
        Date.prototype.microseconds = 0;
        Date.prototype.getMicroseconds = function() {
            return this.microseconds
        }
        ;
        Date.prototype.setMicroseconds = function(m) {
            this.setMilliseconds(this.getMilliseconds() + Math.floor(m / 1000));
            this.microseconds = m % 1000;
            return this
        }
    }
    $.timepicker.version = "1.6.3"
}));
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports === "object") {
            module.exports = a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function(f) {
    var a = /\+/g;
    function d(i) {
        return b.raw ? i : encodeURIComponent(i)
    }
    function g(i) {
        return b.raw ? i : decodeURIComponent(i)
    }
    function h(i) {
        return d(b.json ? JSON.stringify(i) : String(i))
    }
    function c(i) {
        if (i.indexOf('"') === 0) {
            i = i.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
        }
        try {
            i = decodeURIComponent(i.replace(a, " "));
            return b.json ? JSON.parse(i) : i
        } catch (j) {}
    }
    function e(j, i) {
        var k = b.raw ? j : c(j);
        return f.isFunction(i) ? i(k) : k
    }
    var b = f.cookie = function(q, p, v) {
        if (arguments.length > 1 && !f.isFunction(p)) {
            v = f.extend({}, b.defaults, v);
            if (typeof v.expires === "number") {
                var r = v.expires
                  , u = v.expires = new Date();
                u.setMilliseconds(u.getMilliseconds() + r * 86400000)
            }
            return (document.cookie = [d(q), "=", h(p), v.expires ? "; expires=" + v.expires.toUTCString() : "", v.path ? "; path=" + v.path : "", v.domain ? "; domain=" + v.domain : "", v.secure ? "; secure" : ""].join(""))
        }
        var w = q ? undefined : {}
          , s = document.cookie ? document.cookie.split("; ") : []
          , o = 0
          , m = s.length;
        for (; o < m; o++) {
            var n = s[o].split("=")
              , j = g(n.shift())
              , k = n.join("=");
            if (q === j) {
                w = e(k, p);
                break
            }
            if (!q && (k = e(k)) !== undefined) {
                w[j] = k
            }
        }
        return w
    }
    ;
    b.defaults = {};
    f.removeCookie = function(j, i) {
        f.cookie(j, "", f.extend({}, i, {
            expires: -1
        }));
        return !f.cookie(j)
    }
}));
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function(d) {
    var b = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks) {
        for (var a = b.length; a; ) {
            d.event.fixHooks[b[--a]] = d.event.mouseHooks
        }
    }
    d.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var e = b.length; e; ) {
                    this.addEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = c
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var e = b.length; e; ) {
                    this.removeEventListener(b[--e], c, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    d.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    });
    function c(j) {
        var h = j || window.event
          , g = [].slice.call(arguments, 1)
          , k = 0
          , i = true
          , f = 0
          , e = 0;
        j = d.event.fix(h);
        j.type = "mousewheel";
        if (h.wheelDelta) {
            k = h.wheelDelta / 120
        }
        if (h.detail) {
            k = -h.detail / 3
        }
        e = k;
        if (h.axis !== undefined && h.axis === h.HORIZONTAL_AXIS) {
            e = 0;
            f = -1 * k
        }
        if (h.wheelDeltaY !== undefined) {
            e = h.wheelDeltaY / 120
        }
        if (h.wheelDeltaX !== undefined) {
            f = -1 * h.wheelDeltaX / 120
        }
        g.unshift(j, k, f, e);
        return (d.event.dispatch || d.event.handle).apply(this, g)
    }
}
)(jQuery);
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(e) {
    var f, d = navigator.userAgent, c = /iphone/i.test(d), a = /chrome/i.test(d), b = /android/i.test(d);
    e.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    },
    e.fn.extend({
        caret: function(i, g) {
            var h;
            if (0 !== this.length && !this.is(":hidden")) {
                return "number" == typeof i ? (g = "number" == typeof g ? g : i,
                this.each(function() {
                    this.setSelectionRange ? this.setSelectionRange(i, g) : this.createTextRange && (h = this.createTextRange(),
                    h.collapse(!0),
                    h.moveEnd("character", g),
                    h.moveStart("character", i),
                    h.select())
                })) : (this[0].setSelectionRange ? (i = this[0].selectionStart,
                g = this[0].selectionEnd) : document.selection && document.selection.createRange && (h = document.selection.createRange(),
                i = 0 - h.duplicate().moveStart("character", -100000),
                g = i + h.text.length),
                {
                    begin: i,
                    end: g
                })
            }
        },
        unmask: function() {
            return this.trigger("unmask")
        },
        mask: function(q, j) {
            var n, k, h, i, p, g, l, o;
            if (!q && this.length > 0) {
                n = e(this[0]);
                var m = n.data(e.mask.dataName);
                return m ? m() : void 0
            }
            return j = e.extend({
                autoclear: e.mask.autoclear,
                placeholder: e.mask.placeholder,
                completed: null
            }, j),
            k = e.mask.definitions,
            h = [],
            i = l = q.length,
            p = null,
            e.each(q.split(""), function(r, s) {
                "?" == s ? (l--,
                i = r) : k[s] ? (h.push(new RegExp(k[s])),
                null === p && (p = h.length - 1),
                i > r && (g = h.length - 1)) : h.push(null)
            }),
            this.trigger("unmask").each(function() {
                function r() {
                    if (j.completed) {
                        for (var I = p; g >= I; I++) {
                            if (h[I] && w[I] === E(I)) {
                                return
                            }
                        }
                        j.completed.call(F)
                    }
                }
                function E(I) {
                    return j.placeholder.charAt(I < j.placeholder.length ? I : 0)
                }
                function D(I) {
                    for (; ++I < l && !h[I]; ) {}
                    return I
                }
                function y(I) {
                    for (; --I >= 0 && !h[I]; ) {}
                    return I
                }
                function v(L, I) {
                    var K, J;
                    if (!(0 > L)) {
                        for (K = L,
                        J = D(I); l > K; K++) {
                            if (h[K]) {
                                if (!(l > J && h[K].test(w[J]))) {
                                    break
                                }
                                w[K] = w[J],
                                w[J] = E(J),
                                J = D(J)
                            }
                        }
                        C(),
                        F.caret(Math.max(p, L))
                    }
                }
                function s(M) {
                    var K, L, I, J;
                    for (K = M,
                    L = E(M); l > K; K++) {
                        if (h[K]) {
                            if (I = D(K),
                            J = w[K],
                            w[K] = L,
                            !(l > I && h[I].test(J))) {
                                break
                            }
                            L = J
                        }
                    }
                }
                function A() {
                    var I = F.val()
                      , J = F.caret();
                    if (o && o.length && o.length > I.length) {
                        for (u(!0); J.begin > 0 && !h[J.begin - 1]; ) {
                            J.begin--
                        }
                        if (0 === J.begin) {
                            for (; J.begin < p && !h[J.begin]; ) {
                                J.begin++
                            }
                        }
                        F.caret(J.begin, J.begin)
                    } else {
                        for (u(!0); J.begin < l && !h[J.begin]; ) {
                            J.begin++
                        }
                        F.caret(J.begin, J.begin)
                    }
                    r()
                }
                function x() {
                    u(),
                    F.val() != H && F.change()
                }
                function z(L) {
                    if (!F.prop("readonly")) {
                        var M, K, I, J = L.which || L.keyCode;
                        o = F.val(),
                        8 === J || 46 === J || c && 127 === J ? (M = F.caret(),
                        K = M.begin,
                        I = M.end,
                        I - K === 0 && (K = 46 !== J ? y(K) : I = D(K - 1),
                        I = 46 === J ? D(I) : I),
                        t(K, I),
                        v(K, I - 1),
                        L.preventDefault()) : 13 === J ? x.call(this, L) : 27 === J && (F.val(H),
                        F.caret(0, u()),
                        L.preventDefault())
                    }
                }
                function G(M) {
                    if (!F.prop("readonly")) {
                        var L, O, K, I = M.which || M.keyCode, N = F.caret();
                        if (!(M.ctrlKey || M.altKey || M.metaKey || 32 > I || (I > 34 && I < 41)) && I && 13 !== I) {
                            if (N.end - N.begin !== 0 && (t(N.begin, N.end),
                            v(N.begin, N.end - 1)),
                            L = D(N.begin - 1),
                            l > L && (O = String.fromCharCode(I),
                            h[L].test(O))) {
                                if (s(L),
                                w[L] = O,
                                C(),
                                K = D(L),
                                b) {
                                    var J = function() {
                                        e.proxy(e.fn.caret, F, K)()
                                    };
                                    setTimeout(J, 0)
                                } else {
                                    F.caret(K)
                                }
                                N.begin <= g && r()
                            }
                            M.preventDefault()
                        }
                    }
                }
                function t(K, I) {
                    var J;
                    for (J = K; I > J && l > J; J++) {
                        h[J] && (w[J] = E(J))
                    }
                }
                function C() {
                    F.val(w.join(""))
                }
                function u(J) {
                    var I, N, M, L = F.val(), K = -1;
                    for (I = 0,
                    M = 0; l > I; I++) {
                        if (h[I]) {
                            for (w[I] = E(I); M++ < L.length; ) {
                                if (N = L.charAt(M - 1),
                                h[I].test(N)) {
                                    w[I] = N,
                                    K = I;
                                    break
                                }
                            }
                            if (M > L.length) {
                                t(I + 1, l);
                                break
                            }
                        } else {
                            w[I] === L.charAt(M) && M++,
                            i > I && (K = I)
                        }
                    }
                    return J ? C() : i > K + 1 ? j.autoclear || w.join("") === B ? (F.val() && F.val(""),
                    t(0, l)) : C() : (C(),
                    F.val(F.val().substring(0, K + 1))),
                    i ? I : p
                }
                var F = e(this)
                  , w = e.map(q.split(""), function(J, I) {
                    return "?" != J ? k[J] ? E(I) : J : void 0
                })
                  , B = w.join("")
                  , H = F.val();
                F.data(e.mask.dataName, function() {
                    return e.map(w, function(J, I) {
                        return h[I] && J != E(I) ? J : null
                    }).join("")
                }),
                F.one("unmask", function() {
                    F.off(".mask").removeData(e.mask.dataName)
                }).on("focus.mask", function() {
                    if (!F.prop("readonly")) {
                        clearTimeout(f);
                        var I;
                        H = F.val(),
                        I = u(),
                        f = setTimeout(function() {
                            F.get(0) === document.activeElement && (C(),
                            I == q.replace("?", "").length ? F.caret(0, I) : F.caret(I))
                        }, 10)
                    }
                }).on("blur.mask", x).on("keydown.mask", z).on("keypress.mask", G).on("input.mask paste.mask", function() {
                    F.prop("readonly") || setTimeout(function() {
                        var I = u(!0);
                        F.caret(I),
                        r()
                    }, 0)
                }),
                a && b && F.off("input.mask").on("input.mask", A),
                u()
            })
        }
    })
});
(function(c) {
    var l = "undefined";
    var d, g, q, f, b;
    var n, i, m, p;
    function j(s, v) {
        var u = typeof s[v];
        return u === "function" || (!!(u == "object" && s[v])) || u == "unknown"
    }
    function k(s, t) {
        return typeof (s[t]) != l
    }
    function e(s, t) {
        return !!(typeof (s[t]) == "object" && s[t])
    }
    function h(s) {
        if (window.console && window.console.log) {
            window.console.log("TextInputs module for Rangy not supported in your browser. Reason: " + s)
        }
    }
    function o(t, u, s) {
        if (u < 0) {
            u += t.value.length
        }
        if (typeof s == l) {
            s = u
        }
        if (s < 0) {
            s += t.value.length
        }
        return {
            start: u,
            end: s
        }
    }
    function a(t, u, s) {
        return {
            start: u,
            end: s,
            length: s - u,
            text: t.value.slice(u, s)
        }
    }
    function r() {
        return e(document, "body") ? document.body : document.getElementsByTagName("body")[0]
    }
    c(document).ready(function() {
        var t = document.createElement("textarea");
        r().appendChild(t);
        if (k(t, "selectionStart") && k(t, "selectionEnd")) {
            d = function(w) {
                var x = w.selectionStart
                  , v = w.selectionEnd;
                return a(w, x, v)
            }
            ;
            g = function(x, v, w) {
                var y = o(x, v, w);
                x.selectionStart = y.start;
                x.selectionEnd = y.end
            }
            ;
            p = function(w, v) {
                if (v) {
                    w.selectionEnd = w.selectionStart
                } else {
                    w.selectionStart = w.selectionEnd
                }
            }
        } else {
            if (j(t, "createTextRange") && e(document, "selection") && j(document.selection, "createRange")) {
                d = function(z) {
                    var C = 0, x = 0, B, w, v, A;
                    var y = document.selection.createRange();
                    if (y && y.parentElement() == z) {
                        v = z.value.length;
                        B = z.value.replace(/\r\n/g, "\n");
                        w = z.createTextRange();
                        w.moveToBookmark(y.getBookmark());
                        A = z.createTextRange();
                        A.collapse(false);
                        if (w.compareEndPoints("StartToEnd", A) > -1) {
                            C = x = v
                        } else {
                            C = -w.moveStart("character", -v);
                            C += B.slice(0, C).split("\n").length - 1;
                            if (w.compareEndPoints("EndToEnd", A) > -1) {
                                x = v
                            } else {
                                x = -w.moveEnd("character", -v);
                                x += B.slice(0, x).split("\n").length - 1
                            }
                        }
                    }
                    return a(z, C, x)
                }
                ;
                var u = function(v, w) {
                    return w - (v.value.slice(0, w).split("\r\n").length - 1)
                };
                g = function(z, v, y) {
                    var A = o(z, v, y);
                    var x = z.createTextRange();
                    var w = u(z, A.start);
                    x.collapse(true);
                    if (A.start == A.end) {
                        x.move("character", w)
                    } else {
                        x.moveEnd("character", u(z, A.end));
                        x.moveStart("character", w)
                    }
                    x.select()
                }
                ;
                p = function(x, w) {
                    var v = document.selection.createRange();
                    v.collapse(w);
                    v.select()
                }
            } else {
                r().removeChild(t);
                h("No means of finding text input caret position");
                return
            }
        }
        r().removeChild(t);
        f = function(w, z, v, x) {
            var y;
            if (z != v) {
                y = w.value;
                w.value = y.slice(0, z) + y.slice(v)
            }
            if (x) {
                g(w, z, z)
            }
        }
        ;
        q = function(v) {
            var w = d(v);
            f(v, w.start, w.end, true)
        }
        ;
        m = function(v) {
            var w = d(v), x;
            if (w.start != w.end) {
                x = v.value;
                v.value = x.slice(0, w.start) + x.slice(w.end)
            }
            g(v, w.start, w.start);
            return w.text
        }
        ;
        b = function(w, z, v, x) {
            var y = w.value, A;
            w.value = y.slice(0, v) + z + y.slice(v);
            if (x) {
                A = v + z.length;
                g(w, A, A)
            }
        }
        ;
        n = function(v, y) {
            var w = d(v)
              , x = v.value;
            v.value = x.slice(0, w.start) + y + x.slice(w.end);
            var z = w.start + y.length;
            g(v, z, z)
        }
        ;
        i = function(v, y, B) {
            var x = d(v)
              , A = v.value;
            v.value = A.slice(0, x.start) + y + x.text + B + A.slice(x.end);
            var z = x.start + y.length;
            var w = z + x.length;
            g(v, z, w)
        }
        ;
        function s(v, w) {
            return function() {
                var z = this.jquery ? this[0] : this;
                var A = z.nodeName.toLowerCase();
                if (z.nodeType == 1 && (A == "textarea" || (A == "input" && z.type == "text"))) {
                    var y = [z].concat(Array.prototype.slice.call(arguments));
                    var x = v.apply(this, y);
                    if (!w) {
                        return x
                    }
                }
                if (w) {
                    return this
                }
            }
        }
        c.fn.extend({
            getSelection: s(d, false),
            setSelection: s(g, true),
            collapseSelection: s(p, true),
            deleteSelectedText: s(q, true),
            deleteText: s(f, true),
            extractSelectedText: s(m, false),
            insertText: s(b, true),
            replaceSelectedText: s(n, true),
            surroundSelectedText: s(i, true)
        })
    })
}
)(jQuery);
$(function() {
    var a = {
        primaryStyles: ["fontFamily", "fontSize", "fontWeight", "fontVariant", "fontStyle", "paddingLeft", "paddingTop", "paddingBottom", "paddingRight", "marginLeft", "marginTop", "marginBottom", "marginRight", "borderLeftColor", "borderTopColor", "borderBottomColor", "borderRightColor", "borderLeftStyle", "borderTopStyle", "borderBottomStyle", "borderRightStyle", "borderLeftWidth", "borderTopWidth", "borderBottomWidth", "borderRightWidth", "line-height", "outline"],
        specificStyle: {
            "word-wrap": "break-word",
            "overflow-x": "hidden",
            "overflow-y": "auto"
        },
        simulator: $('<div id="textarea_simulator"/>').css({
            position: "absolute",
            top: 0,
            left: 0,
            visibility: "hidden"
        }).appendTo(document.body),
        toHtml: function(b) {
            return b.replace(/\n/g, "<br>").split(" ").join('<span style="white-space:prev-wrap">&nbsp;</span>')
        },
        getCaretPosition: function() {
            var c = a
              , n = this
              , g = n[0]
              , d = n.offset();
            if ($.browser.msie && document.selection && document.selection.createRange) {
                g.focus();
                var h = document.selection.createRange();
                $("#hskeywords").val(g.scrollTop);
                return {
                    left: h.boundingLeft - d.left,
                    top: parseInt(h.boundingTop) - d.top + g.scrollTop + document.documentElement.scrollTop + parseInt(n.getComputedStyle("fontSize"))
                }
            }
            c.simulator.empty();
            $.each(c.primaryStyles, function(p, q) {
                n.cloneStyle(c.simulator, q)
            });
            c.simulator.css($.extend({
                width: n.width(),
                height: n.height()
            }, c.specificStyle));
            var l = n.val()
              , e = n.getCursorPosition();
            var f = l.substring(0, e)
              , m = l.substring(e);
            var j = $('<span class="before"/>').html(c.toHtml(f))
              , o = $('<span class="focus"/>')
              , b = $('<span class="after"/>').html(c.toHtml(m));
            c.simulator.append(j).append(o).append(b);
            var i = o.offset()
              , k = c.simulator.offset();
            return {
                top: i.top - k.top - g.scrollTop + ($.browser.mozilla ? 0 : parseInt(n.getComputedStyle("fontSize"))),
                left: o[0].offsetLeft - c.simulator[0].offsetLeft - g.scrollLeft
            }
        }
    };
    $.fn.extend({
        getComputedStyle: function(c) {
            if (this.length == 0) {
                return
            }
            var d = this[0];
            var b = this.css(c);
            b = b || ($.browser.msie ? d.currentStyle[c] : document.defaultView.getComputedStyle(d, null)[c]);
            return b
        },
        cloneStyle: function(c, b) {
            var d = this.getComputedStyle(b);
            if (!!d) {
                $(c).css(b, d)
            }
        },
        cloneAllStyle: function(e, d) {
            var c = this[0];
            for (var b in c.style) {
                var f = c.style[b];
                typeof f == "string" || typeof f == "number" ? this.cloneStyle(e, b) : NaN
            }
        },
        getCursorPosition: function() {
            var e = this[0]
              , b = 0;
            if ("selectionStart"in e) {
                b = e.selectionStart
            } else {
                if ("selection"in document) {
                    var c = document.selection.createRange();
                    if (parseInt($.browser.version) > 6) {
                        e.focus();
                        var g = document.selection.createRange().text.length;
                        c.moveStart("character", -e.value.length);
                        b = c.text.length - g
                    } else {
                        var h = document.body.createTextRange();
                        h.moveToElementText(e);
                        for (; h.compareEndPoints("StartToStart", c) < 0; b++) {
                            h.moveStart("character", 1)
                        }
                        for (var d = 0; d <= b; d++) {
                            if (e.value.charAt(d) == "\n") {
                                b++
                            }
                        }
                        var f = e.value.split("\n").length - 1;
                        b -= f;
                        return b
                    }
                }
            }
            return b
        },
        getCaretPosition: a.getCaretPosition
    })
});
/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */
(function(f, e, h) {
    var a, d;
    f.uaMatch = function(k) {
        k = k.toLowerCase();
        var j = /(opr)[\/]([\w.]+)/.exec(k) || /(chrome)[ \/]([\w.]+)/.exec(k) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(k) || /(webkit)[ \/]([\w.]+)/.exec(k) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(k) || /(msie) ([\w.]+)/.exec(k) || k.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(k) || k.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(k) || [];
        var i = /(ipad)/.exec(k) || /(iphone)/.exec(k) || /(android)/.exec(k) || /(windows phone)/.exec(k) || /(win)/.exec(k) || /(mac)/.exec(k) || /(linux)/.exec(k) || /(cros)/i.exec(k) || [];
        return {
            browser: j[3] || j[1] || "",
            version: j[2] || "0",
            platform: i[0] || ""
        }
    }
    ;
    a = f.uaMatch(e.navigator.userAgent);
    d = {};
    if (a.browser) {
        d[a.browser] = true;
        d.version = a.version;
        d.versionNumber = parseInt(a.version)
    }
    if (a.platform) {
        d[a.platform] = true
    }
    if (d.android || d.ipad || d.iphone || d["windows phone"]) {
        d.mobile = true
    }
    if (d.cros || d.mac || d.linux || d.win) {
        d.desktop = true
    }
    if (d.chrome || d.opr || d.safari) {
        d.webkit = true
    }
    if (d.rv) {
        var g = "msie";
        a.browser = g;
        d[g] = true
    }
    if (d.opr) {
        var c = "opera";
        a.browser = c;
        d[c] = true
    }
    if (d.safari && d.android) {
        var b = "android";
        a.browser = b;
        d[b] = true
    }
    d.name = a.browser;
    d.platform = a.platform;
    f.browser = d
}
)(jQuery, window);
/*!
	Autosize 3.0.6
	license: MIT
	http://www.jacklmoore.com/autosize
*/
(function(c, a) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "module"], a)
    } else {
        if (typeof exports !== "undefined" && typeof module !== "undefined") {
            a(exports, module)
        } else {
            var b = {
                exports: {}
            };
            a(b.exports, b);
            c.autosize = b.exports
        }
    }
}
)(this, function(c, f) {
    function b(l) {
        var k = arguments[1] === undefined ? {} : arguments[1];
        var o = k.setOverflowX;
        var q = o === undefined ? true : o;
        var m = k.setOverflowY;
        var p = m === undefined ? true : m;
        if (!l || !l.nodeName || l.nodeName !== "TEXTAREA" || l.hasAttribute("data-autosize-on")) {
            return
        }
        var h = null;
        var j = "hidden";
        function s() {
            var t = window.getComputedStyle(l, null);
            if (t.resize === "vertical") {
                l.style.resize = "none"
            } else {
                if (t.resize === "both") {
                    l.style.resize = "horizontal"
                }
            }
            if (t.boxSizing === "content-box") {
                h = -(parseFloat(t.paddingTop) + parseFloat(t.paddingBottom))
            } else {
                h = parseFloat(t.borderTopWidth) + parseFloat(t.borderBottomWidth)
            }
            i()
        }
        function n(u) {
            var t = l.style.width;
            l.style.width = "0px";
            l.offsetWidth;
            l.style.width = t;
            j = u;
            if (p) {
                l.style.overflowY = u
            }
            i()
        }
        function i() {
            var B = l.style.height;
            var u = document.documentElement.scrollTop;
            var z = document.body.scrollTop;
            var w = l.style.height;
            l.style.height = "auto";
            var v = l.scrollHeight + h;
            if (PrimeFaces.isIE(10) || PrimeFaces.isIE(9)) {
                var C = (!l.rows ? 1 : l.rows);
                var x = a(l);
                var A = (x * C) + h;
                if (v < A) {
                    v = A
                }
            }
            if (l.scrollHeight === 0) {
                l.style.height = w;
                return
            }
            l.style.height = v + "px";
            document.documentElement.scrollTop = u;
            document.body.scrollTop = z;
            var t = window.getComputedStyle(l, null);
            if (t.height !== l.style.height) {
                if (j !== "visible") {
                    n("visible");
                    return
                }
            } else {
                if (j !== "hidden") {
                    n("hidden");
                    return
                }
            }
            if (B !== l.style.height) {
                var y = document.createEvent("Event");
                y.initEvent("autosize:resized", true, false);
                l.dispatchEvent(y)
            }
        }
        var r = (function(t) {
            window.removeEventListener("resize", i);
            l.removeEventListener("input", i);
            l.removeEventListener("keyup", i);
            l.removeAttribute("data-autosize-on");
            l.removeEventListener("autosize:destroy", r);
            Object.keys(t).forEach(function(u) {
                l.style[u] = t[u]
            })
        }
        ).bind(l, {
            height: l.style.height,
            resize: l.style.resize,
            overflowY: l.style.overflowY,
            overflowX: l.style.overflowX,
            wordWrap: l.style.wordWrap
        });
        l.addEventListener("autosize:destroy", r);
        if ("onpropertychange"in l && "oninput"in l) {
            l.addEventListener("keyup", i)
        }
        window.addEventListener("resize", i);
        l.addEventListener("input", i);
        l.addEventListener("autosize:update", i);
        l.setAttribute("data-autosize-on", true);
        if (p) {
            l.style.overflowY = "hidden"
        }
        if (q) {
            l.style.overflowX = "hidden";
            l.style.wordWrap = "break-word"
        }
        s()
    }
    function e(i) {
        if (!(i && i.nodeName && i.nodeName === "TEXTAREA")) {
            return
        }
        var h = document.createEvent("Event");
        h.initEvent("autosize:destroy", true, false);
        i.dispatchEvent(h)
    }
    function g(i) {
        if (!(i && i.nodeName && i.nodeName === "TEXTAREA")) {
            return
        }
        var h = document.createEvent("Event");
        h.initEvent("autosize:update", true, false);
        i.dispatchEvent(h)
    }
    function a(i) {
        var h = document.createElement(i.nodeName);
        h.rows = 1;
        h.setAttribute("style", "margin:0px;padding:0px;font-family:" + i.style.fontFamily + ";font-size:" + i.style.fontSize);
        h.innerHTML = "Test";
        h = i.parentNode.appendChild(h);
        var j = h.clientHeight;
        h.parentNode.removeChild(h);
        return j
    }
    var d = null;
    if (typeof window === "undefined" || typeof window.getComputedStyle !== "function") {
        d = function(h) {
            return h
        }
        ;
        d.destroy = function(h) {
            return h
        }
        ;
        d.update = function(h) {
            return h
        }
    } else {
        d = function(i, h) {
            if (i) {
                Array.prototype.forEach.call(i.length ? i : [i], function(j) {
                    return b(j, h)
                })
            }
            return i
        }
        ;
        d.destroy = function(h) {
            if (h) {
                Array.prototype.forEach.call(h.length ? h : [h], e)
            }
            return h
        }
        ;
        d.update = function(h) {
            if (h) {
                Array.prototype.forEach.call(h.length ? h : [h], g)
            }
            return h
        }
    }
    f.exports = d
});
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b) {
    b.support.touch = "ontouchend"in document;
    if (!b.support.touch) {
        return
    }
    var d = b.ui.mouse.prototype, f = d._mouseInit, c = d._mouseDestroy, a;
    function e(h, i) {
        if (h.originalEvent.touches.length > 1) {
            return
        }
        h.preventDefault();
        var j = h.originalEvent.changedTouches[0]
          , g = document.createEvent("MouseEvents");
        g.initMouseEvent(i, true, true, window, 1, j.screenX, j.screenY, j.clientX, j.clientY, false, false, false, false, 0, null);
        h.target.dispatchEvent(g)
    }
    d._touchStart = function(h) {
        var g = this;
        if (a || !g._mouseCapture(h.originalEvent.changedTouches[0])) {
            return
        }
        a = true;
        g._touchMoved = 0;
        e(h, "mouseover");
        e(h, "mousemove");
        e(h, "mousedown")
    }
    ;
    d._touchMove = function(g) {
        if (!a) {
            return
        }
        this._touchMoved += 1;
        e(g, "mousemove")
    }
    ;
    d._touchEnd = function(g) {
        if (!a) {
            return
        }
        e(g, "mouseup");
        e(g, "mouseout");
        if (this._touchMoved <= 5) {
            e(g, "click")
        }
        a = false
    }
    ;
    d._mouseInit = function() {
        var g = this;
        g.element.bind({
            touchstart: b.proxy(g, "_touchStart"),
            touchmove: b.proxy(g, "_touchMove"),
            touchend: b.proxy(g, "_touchEnd")
        });
        f.call(g)
    }
    ;
    d._mouseDestroy = function() {
        var g = this;
        g.element.unbind({
            touchstart: b.proxy(g, "_touchStart"),
            touchmove: b.proxy(g, "_touchMove"),
            touchend: b.proxy(g, "_touchEnd")
        });
        c.call(g)
    }
}
)(jQuery);
(function() {
    var a = $.datepicker._gotoToday;
    $.datepicker._gotoToday = function(d) {
        var c = $(d)
          , b = this._getInst(c[0]);
        a.call(this, d);
        this._selectDate(d, this._formatDate(b, b.selectedDay, b.drawMonth, b.drawYear))
    }
    ;
    $.datepicker._attachHandlers = function(c) {
        var b = this._get(c, "stepMonths")
          , d = "#" + c.id.replace(/\\\\/g, "\\");
        c.dpDiv.find("[data-handler]").map(function() {
            var e = {
                prev: function() {
                    $.datepicker._adjustDate(d, -b, "M");
                    this.updateDatePickerPosition(c)
                },
                next: function() {
                    $.datepicker._adjustDate(d, +b, "M");
                    this.updateDatePickerPosition(c)
                },
                hide: function() {
                    $.datepicker._hideDatepicker()
                },
                today: function() {
                    $.datepicker._gotoToday(d)
                },
                selectDay: function() {
                    $.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                    return false
                },
                selectMonth: function() {
                    $.datepicker._selectMonthYear(d, this, "M");
                    return false
                },
                selectYear: function() {
                    $.datepicker._selectMonthYear(d, this, "Y");
                    return false
                }
            };
            $(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")]);
            this.updateDatePickerPosition = function(g) {
                if (!$.datepicker._pos) {
                    $.datepicker._pos = $.datepicker._findPos(g.input[0]);
                    $.datepicker._pos[1] += g.input[0].offsetHeight
                }
                var i = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                };
                $.datepicker._pos = null;
                var h = false;
                $(g.input[0]).parents().each(function() {
                    h |= $(this).css("position") === "fixed";
                    return !h
                });
                var f = $.datepicker._checkOffset(g, i, h);
                g.dpDiv.css({
                    top: f.top + "px"
                })
            }
        })
    }
    ;
    $.datepicker._generateMonthYearHeader = function(f, d, n, h, l, o, j, b) {
        var s, c, t, q, g, p, m, i, e = this._get(f, "changeMonth"), u = this._get(f, "changeYear"), v = this._get(f, "showMonthAfterYear"), k = "<div class='ui-datepicker-title'>", r = "";
        if (o || !e) {
            r += "<span class='ui-datepicker-month' aria-label='select month'>" + j[d] + "</span>"
        } else {
            s = (h && h.getFullYear() === n);
            c = (l && l.getFullYear() === n);
            r += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change' aria-label='select month'>";
            for (t = 0; t < 12; t++) {
                if ((!s || t >= h.getMonth()) && (!c || t <= l.getMonth())) {
                    r += "<option value='" + t + "'" + (t === d ? " selected='selected'" : "") + ">" + b[t] + "</option>"
                }
            }
            r += "</select>"
        }
        if (!v) {
            k += r + (o || !(e && u) ? "&#xa0;" : "")
        }
        if (!f.yearshtml) {
            f.yearshtml = "";
            if (o || !u) {
                k += "<span class='ui-datepicker-year' aria-label='select year'>" + n + "</span>"
            } else {
                q = this._get(f, "yearRange").split(":");
                g = new Date().getFullYear();
                p = function(x) {
                    var w = (x.match(/c[+\-].*/) ? n + parseInt(x.substring(1), 10) : (x.match(/[+\-].*/) ? g + parseInt(x, 10) : parseInt(x, 10)));
                    return (isNaN(w) ? g : w)
                }
                ;
                m = p(q[0]);
                i = Math.max(m, p(q[1] || ""));
                m = (h ? Math.max(m, h.getFullYear()) : m);
                i = (l ? Math.min(i, l.getFullYear()) : i);
                f.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change' aria-label='select year'>";
                for (; m <= i; m++) {
                    f.yearshtml += "<option value='" + m + "'" + (m === n ? " selected='selected'" : "") + ">" + m + "</option>"
                }
                f.yearshtml += "</select>";
                k += f.yearshtml;
                f.yearshtml = null
            }
        }
        k += this._get(f, "yearSuffix");
        if (v) {
            k += (o || !(e && u) ? "&#xa0;" : "") + r
        }
        k += "</div>";
        return k
    }
}
)();
