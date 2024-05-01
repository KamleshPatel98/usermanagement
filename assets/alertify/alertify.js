/*! alertifyjs - v1.14.0 - Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) */
!(function (a) {
    "use strict";
    function b(a, b) {
        a.className += " " + b;
    }
    function c(a, b) {
        for (
            var c = a.className.split(" "), d = b.split(" "), e = 0;
            e < d.length;
            e += 1
        ) {
            var f = c.indexOf(d[e]);
            f > -1 && c.splice(f, 1);
        }
        a.className = c.join(" ");
    }
    function d() {
        return "rtl" === a.getComputedStyle(document.body).direction;
    }
    function e() {
        return (
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        );
    }
    function f() {
        return (
            (document.documentElement && document.documentElement.scrollLeft) ||
            document.body.scrollLeft
        );
    }
    function g(a) {
        for (; a.lastChild; ) a.removeChild(a.lastChild);
    }
    function h(a) {
        return "[object String]" === Object.prototype.toString.call(a);
    }
    function i(a) {
        if (null === a) return a;
        var b;
        if (Array.isArray(a)) {
            b = [];
            for (var c = 0; c < a.length; c += 1) b.push(i(a[c]));
            return b;
        }
        if (a instanceof Date) return new Date(a.getTime());
        if (a instanceof RegExp)
            return (
                (b = new RegExp(a.source)),
                (b.global = a.global),
                (b.ignoreCase = a.ignoreCase),
                (b.multiline = a.multiline),
                (b.lastIndex = a.lastIndex),
                b
            );
        if ("object" == typeof a) {
            b = {};
            for (var d in a) a.hasOwnProperty(d) && (b[d] = i(a[d]));
            return b;
        }
        return a;
    }
    function j(a, b) {
        if (a.elements) {
            var c = a.elements.root;
            c.parentNode.removeChild(c),
                delete a.elements,
                (a.settings = i(a.__settings)),
                (a.__init = b),
                delete a.__internal;
        }
    }
    function k(a, b) {
        return function () {
            if (arguments.length > 0) {
                for (var c = [], d = 0; d < arguments.length; d += 1)
                    c.push(arguments[d]);
                return c.push(a), b.apply(a, c);
            }
            return b.apply(a, [null, a]);
        };
    }
    function l(a, b) {
        return { index: a, button: b, cancel: !1 };
    }
    function m(a, b) {
        if ("function" == typeof b.get(a)) return b.get(a).call(b);
    }
    function n() {
        function a(a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a;
        }
        function b(a) {
            var b = d[a].dialog;
            return b && "function" == typeof b.__init && b.__init(b), b;
        }
        function c(b, c, e, f) {
            var g = { dialog: null, factory: c };
            return (
                void 0 !== f &&
                    (g.factory = function () {
                        return a(new d[f].factory(), new c());
                    }),
                e || (g.dialog = a(new g.factory(), x)),
                (d[b] = g)
            );
        }
        var d = {};
        return {
            defaults: q,
            dialog: function (d, e, f, g) {
                if ("function" != typeof e) return b(d);
                if (this.hasOwnProperty(d))
                    throw new Error("alertify.dialog: name already exists");
                var h = c(d, e, f, g);
                this[d] = f
                    ? function () {
                        if (0 === arguments.length) return h.dialog;
                        var b = a(new h.factory(), x);
                        return (
                            b && "function" == typeof b.__init && b.__init(b),
                            b.main.apply(b, arguments),
                            b.show.apply(b)
                        );
                    }
                    : function () {
                        if (
                            (h.dialog &&
                                "function" == typeof h.dialog.__init &&
                                h.dialog.__init(h.dialog),
                            0 === arguments.length)
                        )
                            return h.dialog;
                        var a = h.dialog;
                        return (
                            a.main.apply(h.dialog, arguments),
                            a.show.apply(h.dialog)
                        );
                    };
            },
            closeAll: function (a) {
                for (var b = r.slice(0), c = 0; c < b.length; c += 1) {
                    var d = b[c];
                    (void 0 !== a && a === d) || d.close();
                }
            },
            setting: function (a, c, d) {
                if ("notifier" === a) return y.setting(c, d);
                var e = b(a);
                return e ? e.setting(c, d) : void 0;
            },
            set: function (a, b, c) {
                return this.setting(a, b, c);
            },
            get: function (a, b) {
                return this.setting(a, b);
            },
            notify: function (a, b, c, d) {
                return y.create(b, d).push(a, c);
            },
            message: function (a, b, c) {
                return y.create(null, c).push(a, b);
            },
            success: function (a, b, c) {
                return y.create("success", c).push(a, b);
            },
            error: function (a, b, c) {
                return y.create("error", c).push(a, b);
            },
            warning: function (a, b, c) {
                return y.create("warning", c).push(a, b);
            },
            dismissAll: function () {
                y.dismissAll();
            },
        };
    }
    var o = ":not(:disabled):not(.ajs-reset)",
        p = {
            ENTER: 13,
            ESC: 27,
            F1: 112,
            F12: 123,
            LEFT: 37,
            RIGHT: 39,
            TAB: 9,
        },
        q = {
            autoReset: !0,
            basic: !1,
            closable: !0,
            closableByDimmer: !0,
            invokeOnCloseOff: !1,
            frameless: !1,
            defaultFocusOff: !1,
            maintainFocus: !0,
            maximizable: !0,
            modal: !0,
            movable: !0,
            moveBounded: !1,
            overflow: !0,
            padding: !0,
            pinnable: !0,
            pinned: !0,
            preventBodyShift: !1,
            resizable: !0,
            startMaximized: !1,
            transition: "pulse",
            transitionOff: !1,
            tabbable: [
                "button",
                "[href]",
                "input",
                "select",
                "textarea",
                '[tabindex]:not([tabindex^="-"])' + o,
            ].join(o + ","),
            notifier: {
                delay: 5,
                position: "bottom-right",
                closeButton: !1,
                classes: {
                    base: "alertify-notifier",
                    prefix: "ajs-",
                    message: "ajs-message",
                    top: "ajs-top",
                    right: "ajs-right",
                    bottom: "ajs-bottom",
                    left: "ajs-left",
                    center: "ajs-center",
                    visible: "ajs-visible",
                    hidden: "ajs-hidden",
                    close: "ajs-close",
                },
            },
            glossary: {
                title: "AlertifyJS",
                ok: "OK",
                cancel: "Cancel",
                acccpt: "Accept",
                deny: "Deny",
                confirm: "Confirm",
                decline: "Decline",
                close: "Close",
                maximize: "Maximize",
                restore: "Restore",
            },
            theme: { input: "ajs-input", ok: "ajs-ok", cancel: "ajs-cancel" },
            hooks: { preinit: function () {}, postinit: function () {} },
        },
        r = [],
        s = !1;
    try {
        var t = Object.defineProperty({}, "passive", {
            get: function () {
                s = !0;
            },
        });
        a.addEventListener("test", t, t), a.removeEventListener("test", t, t);
    } catch (A) {}
    var u = function (a, b, c, d, e) {
            a.addEventListener(b, c, s ? { capture: d, passive: e } : !0 === d);
        },
        v = function (a, b, c, d, e) {
            a.removeEventListener(
                b,
                c,
                s ? { capture: d, passive: e } : !0 === d
            );
        },
        w = (function () {
            var a,
                b,
                c = !1,
                d = {
                    animation: "animationend",
                    OAnimation: "oAnimationEnd oanimationend",
                    msAnimation: "MSAnimationEnd",
                    MozAnimation: "animationend",
                    WebkitAnimation: "webkitAnimationEnd",
                };
            for (a in d)
                if (void 0 !== document.documentElement.style[a]) {
                    (b = d[a]), (c = !0);
                    break;
                }
            return { type: b, supported: c };
        })(),
        x = (function () {
            function n(a) {
                if (!a.__internal) {
                    z.defaults.hooks.preinit(a),
                        delete a.__init,
                        a.__settings || (a.__settings = i(a.settings));
                    var c;
                    "function" == typeof a.setup
                        ? ((c = a.setup()),
                        (c.options = c.options || {}),
                        (c.focus = c.focus || {}))
                        : (c = {
                            buttons: [],
                            focus: { element: null, select: !1 },
                            options: {},
                        }),
                        "object" != typeof a.hooks && (a.hooks = {});
                    var d = [];
                    if (Array.isArray(c.buttons))
                        for (var e = 0; e < c.buttons.length; e += 1) {
                            var f = c.buttons[e],
                                g = {};
                            for (var h in f)
                                f.hasOwnProperty(h) && (g[h] = f[h]);
                            d.push(g);
                        }
                    var j = (a.__internal = {
                            isOpen: !1,
                            activeElement: document.body,
                            timerIn: void 0,
                            timerOut: void 0,
                            buttons: d,
                            focus: c.focus,
                            options: {
                                title: void 0,
                                modal: void 0,
                                basic: void 0,
                                frameless: void 0,
                                defaultFocusOff: void 0,
                                pinned: void 0,
                                movable: void 0,
                                moveBounded: void 0,
                                resizable: void 0,
                                autoReset: void 0,
                                closable: void 0,
                                closableByDimmer: void 0,
                                invokeOnCloseOff: void 0,
                                maximizable: void 0,
                                startMaximized: void 0,
                                pinnable: void 0,
                                transition: void 0,
                                transitionOff: void 0,
                                padding: void 0,
                                overflow: void 0,
                                onshow: void 0,
                                onclosing: void 0,
                                onclose: void 0,
                                onfocus: void 0,
                                onmove: void 0,
                                onmoved: void 0,
                                onresize: void 0,
                                onresized: void 0,
                                onmaximize: void 0,
                                onmaximized: void 0,
                                onrestore: void 0,
                                onrestored: void 0,
                            },
                            resetHandler: void 0,
                            beginMoveHandler: void 0,
                            beginResizeHandler: void 0,
                            bringToFrontHandler: void 0,
                            modalClickHandler: void 0,
                            buttonsClickHandler: void 0,
                            commandsClickHandler: void 0,
                            transitionInHandler: void 0,
                            transitionOutHandler: void 0,
                            destroy: void 0,
                        }),
                        l = {};
                    (l.root = document.createElement("div")),
                        (l.root.style.display = "none"),
                        (l.root.className = Ia.base + " " + Ia.hidden + " "),
                        (l.root.innerHTML = Ha.dimmer + Ha.modal),
                        (l.dimmer = l.root.firstChild),
                        (l.modal = l.root.lastChild),
                        (l.modal.innerHTML = Ha.dialog),
                        (l.dialog = l.modal.firstChild),
                        (l.dialog.innerHTML =
                            Ha.reset +
                            Ha.commands +
                            Ha.header +
                            Ha.body +
                            Ha.footer +
                            Ha.resizeHandle +
                            Ha.reset),
                        (l.reset = []),
                        l.reset.push(l.dialog.firstChild),
                        l.reset.push(l.dialog.lastChild),
                        (l.commands = {}),
                        (l.commands.container = l.reset[0].nextSibling),
                        (l.commands.pin = l.commands.container.firstChild),
                        (l.commands.maximize = l.commands.pin.nextSibling),
                        (l.commands.close = l.commands.maximize.nextSibling),
                        (l.header = l.commands.container.nextSibling),
                        (l.body = l.header.nextSibling),
                        (l.body.innerHTML = Ha.content),
                        (l.content = l.body.firstChild),
                        (l.footer = l.body.nextSibling),
                        (l.footer.innerHTML =
                            Ha.buttons.auxiliary + Ha.buttons.primary),
                        (l.resizeHandle = l.footer.nextSibling),
                        (l.buttons = {}),
                        (l.buttons.auxiliary = l.footer.firstChild),
                        (l.buttons.primary = l.buttons.auxiliary.nextSibling),
                        (l.buttons.primary.innerHTML = Ha.button),
                        (l.buttonTemplate = l.buttons.primary.firstChild),
                        l.buttons.primary.removeChild(l.buttonTemplate);
                    for (var m = 0; m < a.__internal.buttons.length; m += 1) {
                        var n = a.__internal.buttons[m];
                        Da.indexOf(n.key) < 0 && Da.push(n.key),
                            (n.element = l.buttonTemplate.cloneNode()),
                            (n.element.innerHTML = n.text),
                            "string" == typeof n.className &&
                                "" !== n.className &&
                                b(n.element, n.className);
                        for (var o in n.attrs)
                            "className" !== o &&
                                n.attrs.hasOwnProperty(o) &&
                                n.element.setAttribute(o, n.attrs[o]);
                        "auxiliary" === n.scope
                            ? l.buttons.auxiliary.appendChild(n.element)
                            : l.buttons.primary.appendChild(n.element);
                    }
                    (a.elements = l),
                        (j.resetHandler = k(a, $)),
                        (j.beginMoveHandler = k(a, fa)),
                        (j.beginResizeHandler = k(a, la)),
                        (j.bringToFrontHandler = k(a, E)),
                        (j.modalClickHandler = k(a, U)),
                        (j.buttonsClickHandler = k(a, W)),
                        (j.commandsClickHandler = k(a, I)),
                        (j.transitionInHandler = k(a, ba)),
                        (j.transitionOutHandler = k(a, ca));
                    for (var p in j.options)
                        void 0 !== c.options[p]
                            ? a.set(p, c.options[p])
                            : z.defaults.hasOwnProperty(p)
                            ? a.set(p, z.defaults[p])
                            : "title" === p && a.set(p, z.defaults.glossary[p]);
                    "function" == typeof a.build && a.build(),
                        z.defaults.hooks.postinit(a);
                }
                document.body.appendChild(a.elements.root);
            }
            function o() {
                (Ba = f()), (Ca = e());
            }
            function s() {
                a.scrollTo(Ba, Ca);
            }
            function t() {
                for (var a = 0, d = 0; d < r.length; d += 1) {
                    var e = r[d];
                    (e.isModal() || e.isMaximized()) && (a += 1);
                }
                0 === a && document.body.className.indexOf(Ia.noOverflow) >= 0
                    ? (c(document.body, Ia.noOverflow), x(!1))
                    : a > 0 &&
                    document.body.className.indexOf(Ia.noOverflow) < 0 &&
                    (x(!0), b(document.body, Ia.noOverflow));
            }
            function x(d) {
                z.defaults.preventBodyShift &&
                    (d &&
                    document.documentElement.scrollHeight >
                        document.documentElement.clientHeight
                        ? ((Ka = Ca),
                        (Ja = a.getComputedStyle(document.body).top),
                        b(document.body, Ia.fixed),
                        (document.body.style.top = -Ca + "px"))
                        : d ||
                        ((Ca = Ka),
                        (document.body.style.top = Ja),
                        c(document.body, Ia.fixed),
                        s()));
            }
            function y(a, d, e) {
                h(e) && c(a.elements.root, Ia.prefix + e),
                    b(a.elements.root, Ia.prefix + d),
                    (Ea = a.elements.root.offsetWidth);
            }
            function A(a) {
                a.get("transitionOff")
                    ? b(a.elements.root, Ia.noTransition)
                    : c(a.elements.root, Ia.noTransition);
            }
            function B(a) {
                a.get("modal")
                    ? (c(a.elements.root, Ia.modeless),
                    a.isOpen() && (ua(a), Q(a), t()))
                    : (b(a.elements.root, Ia.modeless),
                    a.isOpen() && (ta(a), Q(a), t()));
            }
            function C(a) {
                a.get("basic")
                    ? b(a.elements.root, Ia.basic)
                    : c(a.elements.root, Ia.basic);
            }
            function D(a) {
                a.get("frameless")
                    ? b(a.elements.root, Ia.frameless)
                    : c(a.elements.root, Ia.frameless);
            }
            function E(a, b) {
                for (var c = r.indexOf(b), d = c + 1; d < r.length; d += 1)
                    if (r[d].isModal()) return;
                return (
                    document.body.lastChild !== b.elements.root &&
                        (document.body.appendChild(b.elements.root),
                        r.splice(r.indexOf(b), 1),
                        r.push(b),
                        Z(b)),
                    !1
                );
            }
            function F(a, d, e, f) {
                switch (d) {
                    case "title":
                        a.setHeader(f);
                        break;
                    case "modal":
                        B(a);
                        break;
                    case "basic":
                        C(a);
                        break;
                    case "frameless":
                        D(a);
                        break;
                    case "pinned":
                        R(a);
                        break;
                    case "closable":
                        T(a);
                        break;
                    case "maximizable":
                        S(a);
                        break;
                    case "pinnable":
                        N(a);
                        break;
                    case "movable":
                        ja(a);
                        break;
                    case "resizable":
                        pa(a);
                        break;
                    case "padding":
                        f
                            ? c(a.elements.root, Ia.noPadding)
                            : a.elements.root.className.indexOf(Ia.noPadding) <
                                0 && b(a.elements.root, Ia.noPadding);
                        break;
                    case "overflow":
                        f
                            ? c(a.elements.root, Ia.noOverflow)
                            : a.elements.root.className.indexOf(Ia.noOverflow) <
                                0 && b(a.elements.root, Ia.noOverflow);
                        break;
                    case "transition":
                        y(a, f, e);
                        break;
                    case "transitionOff":
                        A(a);
                }
                "function" == typeof a.hooks.onupdate &&
                    a.hooks.onupdate.call(a, d, e, f);
            }
            function G(a, b, c, d, e) {
                var f = { op: void 0, items: [] };
                if (void 0 === e && "string" == typeof d)
                    (f.op = "get"),
                        b.hasOwnProperty(d)
                            ? ((f.found = !0), (f.value = b[d]))
                            : ((f.found = !1), (f.value = void 0));
                else {
                    var g;
                    if (((f.op = "set"), "object" == typeof d)) {
                        var h = d;
                        for (var i in h)
                            b.hasOwnProperty(i)
                                ? (b[i] !== h[i] &&
                                    ((g = b[i]),
                                    (b[i] = h[i]),
                                    c.call(a, i, g, h[i])),
                                f.items.push({
                                    key: i,
                                    value: h[i],
                                    found: !0,
                                }))
                                : f.items.push({
                                    key: i,
                                    value: h[i],
                                    found: !1,
                                });
                    } else {
                        if ("string" != typeof d)
                            throw new Error("args must be a string or object");
                        b.hasOwnProperty(d)
                            ? (b[d] !== e &&
                                ((g = b[d]), (b[d] = e), c.call(a, d, g, e)),
                            f.items.push({ key: d, value: e, found: !0 }))
                            : f.items.push({ key: d, value: e, found: !1 });
                    }
                }
                return f;
            }
            function H(a) {
                var b;
                V(a, function (c) {
                    return (b =
                        !0 !== a.get("invokeOnCloseOff") &&
                        !0 === c.invokeOnClose);
                }),
                    !b && a.isOpen() && a.close();
            }
            function I(a, b) {
                switch (a.srcElement || a.target) {
                    case b.elements.commands.pin:
                        b.isPinned() ? K(b) : J(b);
                        break;
                    case b.elements.commands.maximize:
                        b.isMaximized() ? M(b) : L(b);
                        break;
                    case b.elements.commands.close:
                        H(b);
                }
                return !1;
            }
            function J(a) {
                a.set("pinned", !0);
            }
            function K(a) {
                a.set("pinned", !1);
            }
            function L(a) {
                m("onmaximize", a),
                    b(a.elements.root, Ia.maximized),
                    a.isOpen() && t(),
                    m("onmaximized", a);
            }
            function M(a) {
                m("onrestore", a),
                    c(a.elements.root, Ia.maximized),
                    a.isOpen() && t(),
                    m("onrestored", a);
            }
            function N(a) {
                a.get("pinnable")
                    ? b(a.elements.root, Ia.pinnable)
                    : c(a.elements.root, Ia.pinnable);
            }
            function O(a) {
                var b = f();
                (a.elements.modal.style.marginTop = e() + "px"),
                    (a.elements.modal.style.marginLeft = b + "px"),
                    (a.elements.modal.style.marginRight = -b + "px");
            }
            function P(a) {
                var b = parseInt(a.elements.modal.style.marginTop, 10),
                    c = parseInt(a.elements.modal.style.marginLeft, 10);
                if (
                    ((a.elements.modal.style.marginTop = ""),
                    (a.elements.modal.style.marginLeft = ""),
                    (a.elements.modal.style.marginRight = ""),
                    a.isOpen())
                ) {
                    var d = 0,
                        g = 0;
                    "" !== a.elements.dialog.style.top &&
                        (d = parseInt(a.elements.dialog.style.top, 10)),
                        (a.elements.dialog.style.top = d + (b - e()) + "px"),
                        "" !== a.elements.dialog.style.left &&
                            (g = parseInt(a.elements.dialog.style.left, 10)),
                        (a.elements.dialog.style.left = g + (c - f()) + "px");
                }
            }
            function Q(a) {
                a.get("modal") || a.get("pinned") ? P(a) : O(a);
            }
            function R(a) {
                a.get("pinned")
                    ? (c(a.elements.root, Ia.unpinned), a.isOpen() && P(a))
                    : (b(a.elements.root, Ia.unpinned),
                    a.isOpen() && !a.isModal() && O(a));
            }
            function S(a) {
                a.get("maximizable")
                    ? b(a.elements.root, Ia.maximizable)
                    : c(a.elements.root, Ia.maximizable);
            }
            function T(a) {
                a.get("closable")
                    ? (b(a.elements.root, Ia.closable), za(a))
                    : (c(a.elements.root, Ia.closable), Aa(a));
            }
            function U(a, b) {
                if (a.timeStamp - Ma > 200 && (Ma = a.timeStamp) && !La) {
                    var c = a.srcElement || a.target;
                    !0 === b.get("closableByDimmer") &&
                        c === b.elements.modal &&
                        H(b);
                }
                La = !1;
            }
            function V(a, b) {
                if (Date.now() - Na > 200 && (Na = Date.now()))
                    for (var c = 0; c < a.__internal.buttons.length; c += 1) {
                        var d = a.__internal.buttons[c];
                        if (!d.element.disabled && b(d)) {
                            var e = l(c, d);
                            "function" == typeof a.callback &&
                                a.callback.apply(a, [e]),
                                !1 === e.cancel && a.close();
                            break;
                        }
                    }
            }
            function W(a, b) {
                var c = a.srcElement || a.target;
                V(b, function (a) {
                    return a.element.contains(c) && (Oa = !0);
                });
            }
            function X(a) {
                if (Oa) return void (Oa = !1);
                var b = r[r.length - 1],
                    c = a.keyCode;
                return 0 === b.__internal.buttons.length &&
                    c === p.ESC &&
                    !0 === b.get("closable")
                    ? (H(b), !1)
                    : Da.indexOf(c) > -1
                    ? (V(b, function (a) {
                        return a.key === c;
                    }),
                    !1)
                    : void 0;
            }
            function Y(a) {
                var b = r[r.length - 1],
                    c = a.keyCode;
                if (c === p.LEFT || c === p.RIGHT) {
                    for (
                        var d = b.__internal.buttons, e = 0;
                        e < d.length;
                        e += 1
                    )
                        if (document.activeElement === d[e].element)
                            switch (c) {
                                case p.LEFT:
                                    return void d[
                                        (e || d.length) - 1
                                    ].element.focus();
                                case p.RIGHT:
                                    return void d[
                                        (e + 1) % d.length
                                    ].element.focus();
                            }
                } else if (c < p.F12 + 1 && c > p.F1 - 1 && Da.indexOf(c) > -1)
                    return (
                        a.preventDefault(),
                        a.stopPropagation(),
                        V(b, function (a) {
                            return a.key === c;
                        }),
                        !1
                    );
            }
            function Z(a, b) {
                if (b) b.focus();
                else {
                    var c = a.__internal.focus,
                        d = c.element;
                    switch (typeof c.element) {
                        case "number":
                            a.__internal.buttons.length > c.element &&
                                (d =
                                    !0 === a.get("basic")
                                        ? a.elements.reset[0]
                                        : a.__internal.buttons[c.element]
                                            .element);
                            break;
                        case "string":
                            d = a.elements.body.querySelector(c.element);
                            break;
                        case "function":
                            d = c.element.call(a);
                    }
                    (!0 !== a.get("defaultFocusOff") &&
                        ((void 0 !== d && null !== d) ||
                            0 !== a.__internal.buttons.length)) ||
                        (d = a.elements.reset[0]),
                        d &&
                            d.focus &&
                            (d.focus(), c.select && d.select && d.select());
                }
            }
            function $(a, b) {
                if (!b)
                    for (var c = r.length - 1; c > -1; c -= 1)
                        if (r[c].isModal()) {
                            b = r[c];
                            break;
                        }
                if (b && b.isModal()) {
                    var d,
                        e = b.elements.reset[0],
                        f = b.elements.reset[1],
                        g = a.relatedTarget,
                        h = b.elements.root.contains(g),
                        i = a.srcElement || a.target;
                    if ((i === e && !h) || (i === f && g === e)) return;
                    i === f || i === document.body
                        ? (d = e)
                        : i === e && g === f
                        ? (d = _(b))
                        : i === e && h && (d = _(b, !0)),
                        Z(b, d);
                }
            }
            function _(a, b) {
                var c = [].slice.call(
                    a.elements.dialog.querySelectorAll(q.tabbable)
                );
                b && c.reverse();
                for (var d = 0; d < c.length; d += 1) {
                    var e = c[d];
                    if (
                        e.offsetParent ||
                        e.offsetWidth ||
                        e.offsetHeight ||
                        e.getClientRects().length
                    )
                        return e;
                }
            }
            function aa(a) {
                var b = r[r.length - 1];
                b &&
                    a.shiftKey &&
                    a.keyCode === p.TAB &&
                    b.elements.reset[1].focus();
            }
            function ba(a, b) {
                clearTimeout(b.__internal.timerIn),
                    Z(b),
                    (Oa = !1),
                    m("onfocus", b),
                    v(
                        b.elements.dialog,
                        w.type,
                        b.__internal.transitionInHandler
                    ),
                    c(b.elements.root, Ia.animationIn);
            }
            function ca(a, b) {
                clearTimeout(b.__internal.timerOut),
                    v(
                        b.elements.dialog,
                        w.type,
                        b.__internal.transitionOutHandler
                    ),
                    ia(b),
                    oa(b),
                    b.isMaximized() && !b.get("startMaximized") && M(b),
                    "function" == typeof b.__internal.destroy &&
                        b.__internal.destroy.apply(b);
            }
            function da(a, b) {
                var c = a[Sa] - Qa,
                    d = a[Ta] - Ra;
                Va && (d -= document.body.scrollTop),
                    (b.style.left = c + "px"),
                    (b.style.top = d + "px");
            }
            function ea(a, b) {
                var c = a[Sa] - Qa,
                    d = a[Ta] - Ra;
                Va && (d -= document.body.scrollTop),
                    (b.style.left =
                        Math.min(Ua.maxLeft, Math.max(Ua.minLeft, c)) + "px"),
                    (b.style.top = Va
                        ? Math.min(Ua.maxTop, Math.max(Ua.minTop, d)) + "px"
                        : Math.max(Ua.minTop, d) + "px");
            }
            function fa(a, c) {
                if (null === Xa && !c.isMaximized() && c.get("movable")) {
                    var d,
                        e = 0,
                        f = 0;
                    if (
                        ("touchstart" === a.type
                            ? (a.preventDefault(),
                            (d = a.targetTouches[0]),
                            (Sa = "clientX"),
                            (Ta = "clientY"))
                            : 0 === a.button && (d = a),
                        d)
                    ) {
                        var g = c.elements.dialog;
                        if (
                            (b(g, Ia.capture),
                            g.style.left && (e = parseInt(g.style.left, 10)),
                            g.style.top && (f = parseInt(g.style.top, 10)),
                            (Qa = d[Sa] - e),
                            (Ra = d[Ta] - f),
                            c.isModal()
                                ? (Ra += c.elements.modal.scrollTop)
                                : c.isPinned() &&
                                (Ra -= document.body.scrollTop),
                            c.get("moveBounded"))
                        ) {
                            var h = g,
                                i = -e,
                                j = -f;
                            do {
                                (i += h.offsetLeft), (j += h.offsetTop);
                            } while ((h = h.offsetParent));
                            (Ua = {
                                maxLeft: i,
                                minLeft: -i,
                                maxTop:
                                    document.documentElement.clientHeight -
                                    g.clientHeight -
                                    j,
                                minTop: -j,
                            }),
                                (Wa = ea);
                        } else (Ua = null), (Wa = da);
                        return (
                            m("onmove", c),
                            (Va = !c.isModal() && c.isPinned()),
                            (Pa = c),
                            Wa(d, g),
                            b(document.body, Ia.noSelection),
                            !1
                        );
                    }
                }
            }
            function ga(a) {
                if (Pa) {
                    var b;
                    "touchmove" === a.type
                        ? (a.preventDefault(), (b = a.targetTouches[0]))
                        : 0 === a.button && (b = a),
                        b && Wa(b, Pa.elements.dialog);
                }
            }
            function ha() {
                if (Pa) {
                    var a = Pa;
                    (Pa = Ua = null),
                        c(document.body, Ia.noSelection),
                        c(a.elements.dialog, Ia.capture),
                        m("onmoved", a);
                }
            }
            function ia(a) {
                Pa = null;
                var b = a.elements.dialog;
                b.style.left = b.style.top = "";
            }
            function ja(a) {
                a.get("movable")
                    ? (b(a.elements.root, Ia.movable), a.isOpen() && va(a))
                    : (ia(a),
                    c(a.elements.root, Ia.movable),
                    a.isOpen() && wa(a));
            }
            function ka(a, b, c) {
                var e = b,
                    f = 0,
                    g = 0;
                do {
                    (f += e.offsetLeft), (g += e.offsetTop);
                } while ((e = e.offsetParent));
                var h, i;
                !0 === c
                    ? ((h = a.pageX), (i = a.pageY))
                    : ((h = a.clientX), (i = a.clientY));
                var j = d();
                if (
                    (j &&
                        ((h = document.body.offsetWidth - h),
                        isNaN(Ya) ||
                            (f =
                                document.body.offsetWidth - f - b.offsetWidth)),
                    (b.style.height = i - g + _a + "px"),
                    (b.style.width = h - f + _a + "px"),
                    !isNaN(Ya))
                ) {
                    var k = 0.5 * Math.abs(b.offsetWidth - Za);
                    j && (k *= -1),
                        b.offsetWidth > Za
                            ? (b.style.left = Ya + k + "px")
                            : b.offsetWidth >= $a &&
                            (b.style.left = Ya - k + "px");
                }
            }
            function la(a, c) {
                if (!c.isMaximized()) {
                    var d;
                    if (
                        ("touchstart" === a.type
                            ? (a.preventDefault(), (d = a.targetTouches[0]))
                            : 0 === a.button && (d = a),
                        d)
                    ) {
                        m("onresize", c),
                            (Xa = c),
                            (_a = c.elements.resizeHandle.offsetHeight / 2);
                        var e = c.elements.dialog;
                        return (
                            b(e, Ia.capture),
                            (Ya = parseInt(e.style.left, 10)),
                            (e.style.height = e.offsetHeight + "px"),
                            (e.style.minHeight =
                                c.elements.header.offsetHeight +
                                c.elements.footer.offsetHeight +
                                "px"),
                            (e.style.width = (Za = e.offsetWidth) + "px"),
                            "none" !== e.style.maxWidth &&
                                (e.style.minWidth =
                                    ($a = e.offsetWidth) + "px"),
                            (e.style.maxWidth = "none"),
                            b(document.body, Ia.noSelection),
                            !1
                        );
                    }
                }
            }
            function ma(a) {
                if (Xa) {
                    var b;
                    "touchmove" === a.type
                        ? (a.preventDefault(), (b = a.targetTouches[0]))
                        : 0 === a.button && (b = a),
                        b &&
                            ka(
                                b,
                                Xa.elements.dialog,
                                !Xa.get("modal") && !Xa.get("pinned")
                            );
                }
            }
            function na() {
                if (Xa) {
                    var a = Xa;
                    (Xa = null),
                        c(document.body, Ia.noSelection),
                        c(a.elements.dialog, Ia.capture),
                        (La = !0),
                        m("onresized", a);
                }
            }
            function oa(a) {
                Xa = null;
                var b = a.elements.dialog;
                "none" === b.style.maxWidth &&
                    ((b.style.maxWidth =
                        b.style.minWidth =
                        b.style.width =
                        b.style.height =
                        b.style.minHeight =
                        b.style.left =
                            ""),
                    (Ya = Number.Nan),
                    (Za = $a = _a = 0));
            }
            function pa(a) {
                a.get("resizable")
                    ? (b(a.elements.root, Ia.resizable), a.isOpen() && xa(a))
                    : (oa(a),
                    c(a.elements.root, Ia.resizable),
                    a.isOpen() && ya(a));
            }
            function qa() {
                for (var a = 0; a < r.length; a += 1) {
                    var b = r[a];
                    b.get("autoReset") && (ia(b), oa(b));
                }
            }
            function ra(b) {
                1 === r.length &&
                    (u(a, "resize", qa),
                    u(document.body, "keyup", X),
                    u(document.body, "keydown", Y),
                    u(document.body, "focus", $),
                    u(document.documentElement, "mousemove", ga),
                    u(document.documentElement, "touchmove", ga, !1, !1),
                    u(document.documentElement, "mouseup", ha),
                    u(document.documentElement, "touchend", ha),
                    u(document.documentElement, "mousemove", ma),
                    u(document.documentElement, "touchmove", ma, !1, !1),
                    u(document.documentElement, "mouseup", na),
                    u(document.documentElement, "touchend", na)),
                    u(
                        b.elements.commands.container,
                        "click",
                        b.__internal.commandsClickHandler
                    ),
                    u(
                        b.elements.footer,
                        "click",
                        b.__internal.buttonsClickHandler
                    ),
                    u(
                        b.elements.reset[0],
                        "focusin",
                        b.__internal.resetHandler
                    ),
                    u(b.elements.reset[0], "keydown", aa),
                    u(
                        b.elements.reset[1],
                        "focusin",
                        b.__internal.resetHandler
                    ),
                    (Oa = !0),
                    u(
                        b.elements.dialog,
                        w.type,
                        b.__internal.transitionInHandler
                    ),
                    b.get("modal") || ta(b),
                    b.get("resizable") && xa(b),
                    b.get("movable") && va(b);
            }
            function sa(b) {
                1 === r.length &&
                    (v(a, "resize", qa),
                    v(document.body, "keyup", X),
                    v(document.body, "keydown", Y),
                    v(document.body, "focus", $),
                    v(document.documentElement, "mousemove", ga),
                    v(document.documentElement, "mouseup", ha),
                    v(document.documentElement, "mousemove", ma),
                    v(document.documentElement, "mouseup", na)),
                    v(
                        b.elements.commands.container,
                        "click",
                        b.__internal.commandsClickHandler
                    ),
                    v(
                        b.elements.footer,
                        "click",
                        b.__internal.buttonsClickHandler
                    ),
                    v(
                        b.elements.reset[0],
                        "focusin",
                        b.__internal.resetHandler
                    ),
                    v(b.elements.reset[0], "keydown", aa),
                    v(
                        b.elements.reset[1],
                        "focusin",
                        b.__internal.resetHandler
                    ),
                    u(
                        b.elements.dialog,
                        w.type,
                        b.__internal.transitionOutHandler
                    ),
                    b.get("modal") || ua(b),
                    b.get("movable") && wa(b),
                    b.get("resizable") && ya(b);
            }
            function ta(a) {
                u(
                    a.elements.dialog,
                    "focus",
                    a.__internal.bringToFrontHandler,
                    !0
                );
            }
            function ua(a) {
                v(
                    a.elements.dialog,
                    "focus",
                    a.__internal.bringToFrontHandler,
                    !0
                );
            }
            function va(a) {
                u(
                    a.elements.header,
                    "mousedown",
                    a.__internal.beginMoveHandler
                ),
                    u(
                        a.elements.header,
                        "touchstart",
                        a.__internal.beginMoveHandler,
                        !1,
                        !1
                    );
            }
            function wa(a) {
                v(
                    a.elements.header,
                    "mousedown",
                    a.__internal.beginMoveHandler
                ),
                    v(
                        a.elements.header,
                        "touchstart",
                        a.__internal.beginMoveHandler,
                        !1,
                        !1
                    );
            }
            function xa(a) {
                u(
                    a.elements.resizeHandle,
                    "mousedown",
                    a.__internal.beginResizeHandler
                ),
                    u(
                        a.elements.resizeHandle,
                        "touchstart",
                        a.__internal.beginResizeHandler,
                        !1,
                        !1
                    );
            }
            function ya(a) {
                v(
                    a.elements.resizeHandle,
                    "mousedown",
                    a.__internal.beginResizeHandler
                ),
                    v(
                        a.elements.resizeHandle,
                        "touchstart",
                        a.__internal.beginResizeHandler,
                        !1,
                        !1
                    );
            }
            function za(a) {
                u(a.elements.modal, "click", a.__internal.modalClickHandler);
            }
            function Aa(a) {
                v(a.elements.modal, "click", a.__internal.modalClickHandler);
            }
            var Ba,
                Ca,
                Da = [],
                Ea = null,
                Fa = !1,
                Ga =
                    a.navigator.userAgent.indexOf("Safari") > -1 &&
                    a.navigator.userAgent.indexOf("Chrome") < 0,
                Ha = {
                    dimmer: '<div class="ajs-dimmer"></div>',
                    modal: '<div class="ajs-modal" tabindex="0"></div>',
                    dialog: '<div class="ajs-dialog" tabindex="0"></div>',
                    reset: '<button class="ajs-reset"></button>',
                    commands:
                        '<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',
                    header: '<div class="ajs-header"></div>',
                    body: '<div class="ajs-body"></div>',
                    content: '<div class="ajs-content"></div>',
                    footer: '<div class="ajs-footer"></div>',
                    buttons: {
                        primary: '<div class="ajs-primary ajs-buttons"></div>',
                        auxiliary:
                            '<div class="ajs-auxiliary ajs-buttons"></div>',
                    },
                    button: '<button class="ajs-button"></button>',
                    resizeHandle: '<div class="ajs-handle"></div>',
                },
                Ia = {
                    animationIn: "ajs-in",
                    animationOut: "ajs-out",
                    base: "alertify",
                    basic: "ajs-basic",
                    capture: "ajs-capture",
                    closable: "ajs-closable",
                    fixed: "ajs-fixed",
                    frameless: "ajs-frameless",
                    hidden: "ajs-hidden",
                    maximize: "ajs-maximize",
                    maximized: "ajs-maximized",
                    maximizable: "ajs-maximizable",
                    modeless: "ajs-modeless",
                    movable: "ajs-movable",
                    noSelection: "ajs-no-selection",
                    noOverflow: "ajs-no-overflow",
                    noPadding: "ajs-no-padding",
                    pin: "ajs-pin",
                    pinnable: "ajs-pinnable",
                    prefix: "ajs-",
                    resizable: "ajs-resizable",
                    restore: "ajs-restore",
                    shake: "ajs-shake",
                    unpinned: "ajs-unpinned",
                    noTransition: "ajs-no-transition",
                },
                Ja = "",
                Ka = 0,
                La = !1,
                Ma = 0,
                Na = 0,
                Oa = !1,
                Pa = null,
                Qa = 0,
                Ra = 0,
                Sa = "pageX",
                Ta = "pageY",
                Ua = null,
                Va = !1,
                Wa = null,
                Xa = null,
                Ya = Number.Nan,
                Za = 0,
                $a = 0,
                _a = 0;
            return {
                __init: n,
                isOpen: function () {
                    return this.__internal.isOpen;
                },
                isModal: function () {
                    return (
                        this.elements.root.className.indexOf(Ia.modeless) < 0
                    );
                },
                isMaximized: function () {
                    return (
                        this.elements.root.className.indexOf(Ia.maximized) > -1
                    );
                },
                isPinned: function () {
                    return (
                        this.elements.root.className.indexOf(Ia.unpinned) < 0
                    );
                },
                maximize: function () {
                    return this.isMaximized() || L(this), this;
                },
                restore: function () {
                    return this.isMaximized() && M(this), this;
                },
                pin: function () {
                    return this.isPinned() || J(this), this;
                },
                unpin: function () {
                    return this.isPinned() && K(this), this;
                },
                bringToFront: function () {
                    return E(null, this), this;
                },
                moveTo: function (a, b) {
                    if (!isNaN(a) && !isNaN(b)) {
                        m("onmove", this);
                        var c = this.elements.dialog,
                            e = c,
                            f = 0,
                            g = 0;
                        c.style.left && (f -= parseInt(c.style.left, 10)),
                            c.style.top && (g -= parseInt(c.style.top, 10));
                        do {
                            (f += e.offsetLeft), (g += e.offsetTop);
                        } while ((e = e.offsetParent));
                        var h = a - f,
                            i = b - g;
                        d() && (h *= -1),
                            (c.style.left = h + "px"),
                            (c.style.top = i + "px"),
                            m("onmoved", this);
                    }
                    return this;
                },
                resizeTo: function (a, b) {
                    var c = parseFloat(a),
                        d = parseFloat(b),
                        e = /(\d*\.\d+|\d+)%/;
                    if (
                        !isNaN(c) &&
                        !isNaN(d) &&
                        !0 === this.get("resizable")
                    ) {
                        m("onresize", this),
                            ("" + a).match(e) &&
                                (c =
                                    (c / 100) *
                                    document.documentElement.clientWidth),
                            ("" + b).match(e) &&
                                (d =
                                    (d / 100) *
                                    document.documentElement.clientHeight);
                        var f = this.elements.dialog;
                        "none" !== f.style.maxWidth &&
                            (f.style.minWidth = ($a = f.offsetWidth) + "px"),
                            (f.style.maxWidth = "none"),
                            (f.style.minHeight =
                                this.elements.header.offsetHeight +
                                this.elements.footer.offsetHeight +
                                "px"),
                            (f.style.width = c + "px"),
                            (f.style.height = d + "px"),
                            m("onresized", this);
                    }
                    return this;
                },
                setting: function (a, b) {
                    var c = this,
                        d = G(
                            this,
                            this.__internal.options,
                            function (a, b, d) {
                                F(c, a, b, d);
                            },
                            a,
                            b
                        );
                    if ("get" === d.op)
                        return d.found
                            ? d.value
                            : void 0 !== this.settings
                            ? G(
                                this,
                                this.settings,
                                this.settingUpdated || function () {},
                                a,
                                b
                            ).value
                            : void 0;
                    if ("set" === d.op) {
                        if (d.items.length > 0)
                            for (
                                var e = this.settingUpdated || function () {},
                                    f = 0;
                                f < d.items.length;
                                f += 1
                            ) {
                                var g = d.items[f];
                                g.found ||
                                    void 0 === this.settings ||
                                    G(this, this.settings, e, g.key, g.value);
                            }
                        return this;
                    }
                },
                set: function (a, b) {
                    return this.setting(a, b), this;
                },
                get: function (a) {
                    return this.setting(a);
                },
                setHeader: function (b) {
                    return (
                        h(b)
                            ? (g(this.elements.header),
                            (this.elements.header.innerHTML = b))
                            : b instanceof a.HTMLElement &&
                            this.elements.header.firstChild !== b &&
                            (g(this.elements.header),
                            this.elements.header.appendChild(b)),
                        this
                    );
                },
                setContent: function (b) {
                    return (
                        h(b)
                            ? (g(this.elements.content),
                            (this.elements.content.innerHTML = b))
                            : b instanceof a.HTMLElement &&
                            this.elements.content.firstChild !== b &&
                            (g(this.elements.content),
                            this.elements.content.appendChild(b)),
                        this
                    );
                },
                showModal: function (a) {
                    return this.show(!0, a);
                },
                show: function (a, d) {
                    if ((n(this), this.__internal.isOpen)) {
                        ia(this), oa(this), b(this.elements.dialog, Ia.shake);
                        var e = this;
                        setTimeout(function () {
                            c(e.elements.dialog, Ia.shake);
                        }, 200);
                    } else {
                        if (
                            ((this.__internal.isOpen = !0),
                            r.push(this),
                            z.defaults.maintainFocus &&
                                (this.__internal.activeElement =
                                    document.activeElement),
                            document.body.hasAttribute("tabindex") ||
                                document.body.setAttribute(
                                    "tabindex",
                                    (Fa = "0")
                                ),
                            "function" == typeof this.prepare && this.prepare(),
                            ra(this),
                            void 0 !== a && this.set("modal", a),
                            o(),
                            t(),
                            "string" == typeof d &&
                                "" !== d &&
                                ((this.__internal.className = d),
                                b(this.elements.root, d)),
                            this.get("startMaximized")
                                ? this.maximize()
                                : this.isMaximized() && M(this),
                            Q(this),
                            this.elements.root.removeAttribute("style"),
                            c(this.elements.root, Ia.animationOut),
                            b(this.elements.root, Ia.animationIn),
                            clearTimeout(this.__internal.timerIn),
                            (this.__internal.timerIn = setTimeout(
                                this.__internal.transitionInHandler,
                                w.supported ? 1e3 : 100
                            )),
                            Ga)
                        ) {
                            var f = this.elements.root;
                            (f.style.display = "none"),
                                setTimeout(function () {
                                    f.style.display = "block";
                                }, 0);
                        }
                        (Ea = this.elements.root.offsetWidth),
                            c(this.elements.root, Ia.hidden),
                            s(),
                            "function" == typeof this.hooks.onshow &&
                                this.hooks.onshow.call(this),
                            m("onshow", this);
                    }
                    return this;
                },
                close: function () {
                    return (
                        this.__internal.isOpen &&
                            !1 !== m("onclosing", this) &&
                            (sa(this),
                            c(this.elements.root, Ia.animationIn),
                            b(this.elements.root, Ia.animationOut),
                            clearTimeout(this.__internal.timerOut),
                            (this.__internal.timerOut = setTimeout(
                                this.__internal.transitionOutHandler,
                                w.supported ? 1e3 : 100
                            )),
                            b(this.elements.root, Ia.hidden),
                            (Ea = this.elements.modal.offsetWidth),
                            z.defaults.maintainFocus &&
                                this.__internal.activeElement &&
                                (this.__internal.activeElement.focus(),
                                (this.__internal.activeElement = null)),
                            void 0 !== this.__internal.className &&
                                "" !== this.__internal.className &&
                                c(
                                    this.elements.root,
                                    this.__internal.className
                                ),
                            "function" == typeof this.hooks.onclose &&
                                this.hooks.onclose.call(this),
                            m("onclose", this),
                            r.splice(r.indexOf(this), 1),
                            (this.__internal.isOpen = !1),
                            t()),
                        r.length ||
                            "0" !== Fa ||
                            document.body.removeAttribute("tabindex"),
                        this
                    );
                },
                closeOthers: function () {
                    return z.closeAll(this), this;
                },
                destroy: function () {
                    return (
                        this.__internal &&
                            (this.__internal.isOpen
                                ? ((this.__internal.destroy = function () {
                                    j(this, n);
                                }),
                                this.close())
                                : this.__internal.destroy || j(this, n)),
                        this
                    );
                },
            };
        })(),
        y = (function () {
            function d(a) {
                if (!a.__internal) {
                    (a.__internal = {
                        position: z.defaults.notifier.position,
                        delay: z.defaults.notifier.delay,
                    }),
                        (m = document.createElement("DIV"));
                    ("transitionOff" in q.notifier
                        ? q.notifier.transitionOff
                        : q.transitionOff) &&
                        (p = o.base + " ajs-no-transition"),
                        i(a);
                }
                m.parentNode !== document.body && document.body.appendChild(m);
            }
            function e(a) {
                (a.__internal.pushed = !0), n.push(a);
            }
            function f(a) {
                n.splice(n.indexOf(a), 1), (a.__internal.pushed = !1);
            }
            function i(a) {
                switch (((m.className = p), a.__internal.position)) {
                    case "top-right":
                        b(m, o.top + " " + o.right);
                        break;
                    case "top-left":
                        b(m, o.top + " " + o.left);
                        break;
                    case "top-center":
                        b(m, o.top + " " + o.center);
                        break;
                    case "bottom-left":
                        b(m, o.bottom + " " + o.left);
                        break;
                    case "bottom-center":
                        b(m, o.bottom + " " + o.center);
                        break;
                    default:
                    case "bottom-right":
                        b(m, o.bottom + " " + o.right);
                }
            }
            function j(d, i) {
                function j(a, b) {
                    (b.__internal.closeButton &&
                        "true" !== a.target.getAttribute("data-close")) ||
                        b.dismiss(!0);
                }
                function n(a, b) {
                    v(b.element, w.type, n), m.removeChild(b.element);
                }
                function p(a) {
                    return (
                        a.__internal ||
                            ((a.__internal = {
                                pushed: !1,
                                delay: void 0,
                                timer: void 0,
                                clickHandler: void 0,
                                transitionEndHandler: void 0,
                                transitionTimeout: void 0,
                            }),
                            (a.__internal.clickHandler = k(a, j)),
                            (a.__internal.transitionEndHandler = k(a, n))),
                        a
                    );
                }
                function q(a) {
                    clearTimeout(a.__internal.timer),
                        clearTimeout(a.__internal.transitionTimeout);
                }
                return p({
                    element: d,
                    push: function (a, c) {
                        if (!this.__internal.pushed) {
                            e(this), q(this);
                            var d, f;
                            switch (arguments.length) {
                                case 0:
                                    f = this.__internal.delay;
                                    break;
                                case 1:
                                    "number" == typeof a
                                        ? (f = a)
                                        : ((d = a),
                                        (f = this.__internal.delay));
                                    break;
                                case 2:
                                    (d = a), (f = c);
                            }
                            return (
                                (this.__internal.closeButton =
                                    z.defaults.notifier.closeButton),
                                void 0 !== d && this.setContent(d),
                                y.__internal.position.indexOf("top") < 0
                                    ? m.appendChild(this.element)
                                    : m.insertBefore(
                                        this.element,
                                        m.firstChild
                                    ),
                                (l = this.element.offsetWidth),
                                b(this.element, o.visible),
                                u(
                                    this.element,
                                    "click",
                                    this.__internal.clickHandler
                                ),
                                this.delay(f)
                            );
                        }
                        return this;
                    },
                    ondismiss: function () {},
                    callback: i,
                    dismiss: function (a) {
                        return (
                            this.__internal.pushed &&
                                (q(this),
                                ("function" == typeof this.ondismiss &&
                                    !1 === this.ondismiss.call(this)) ||
                                    (v(
                                        this.element,
                                        "click",
                                        this.__internal.clickHandler
                                    ),
                                    void 0 !== this.element &&
                                        this.element.parentNode === m &&
                                        ((this.__internal.transitionTimeout =
                                            setTimeout(
                                                this.__internal
                                                    .transitionEndHandler,
                                                w.supported ? 1e3 : 100
                                            )),
                                        c(this.element, o.visible),
                                        "function" == typeof this.callback &&
                                            this.callback.call(this, a)),
                                    f(this))),
                            this
                        );
                    },
                    delay: function (a) {
                        if (
                            (q(this),
                            (this.__internal.delay =
                                void 0 === a || isNaN(+a)
                                    ? y.__internal.delay
                                    : +a),
                            this.__internal.delay > 0)
                        ) {
                            var b = this;
                            this.__internal.timer = setTimeout(function () {
                                b.dismiss();
                            }, 1e3 * this.__internal.delay);
                        }
                        return this;
                    },
                    setContent: function (c) {
                        if (
                            (h(c)
                                ? (g(this.element),
                                (this.element.innerHTML = c))
                                : c instanceof a.HTMLElement &&
                                this.element.firstChild !== c &&
                                (g(this.element),
                                this.element.appendChild(c)),
                            this.__internal.closeButton)
                        ) {
                            var d = document.createElement("span");
                            b(d, o.close),
                                d.setAttribute("data-close", !0),
                                this.element.appendChild(d);
                        }
                        return this;
                    },
                    dismissOthers: function () {
                        return y.dismissAll(this), this;
                    },
                });
            }
            var l,
                m,
                n = [],
                o = q.notifier.classes,
                p = o.base;
            return {
                setting: function (a, b) {
                    if ((d(this), void 0 === b)) return this.__internal[a];
                    switch (a) {
                        case "position":
                            (this.__internal.position = b), i(this);
                            break;
                        case "delay":
                            this.__internal.delay = b;
                    }
                    return this;
                },
                set: function (a, b) {
                    return this.setting(a, b), this;
                },
                get: function (a) {
                    return this.setting(a);
                },
                create: function (a, b) {
                    d(this);
                    var c = document.createElement("div");
                    return (
                        (c.className =
                            o.message +
                            ("string" == typeof a && "" !== a
                                ? " " + o.prefix + a
                                : "")),
                        j(c, b)
                    );
                },
                dismissAll: function (a) {
                    for (var b = n.slice(0), c = 0; c < b.length; c += 1) {
                        var d = b[c];
                        (void 0 !== a && a === d) || d.dismiss();
                    }
                },
            };
        })(),
        z = new n();
    z.dialog("alert", function () {
        return {
            main: function (a, b, c) {
                var d, e, f;
                switch (arguments.length) {
                    case 1:
                        e = a;
                        break;
                    case 2:
                        "function" == typeof b
                            ? ((e = a), (f = b))
                            : ((d = a), (e = b));
                        break;
                    case 3:
                        (d = a), (e = b), (f = c);
                }
                return (
                    this.set("title", d),
                    this.set("message", e),
                    this.set("onok", f),
                    this
                );
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: z.defaults.glossary.ok,
                            key: p.ESC,
                            invokeOnClose: !0,
                            className: z.defaults.theme.ok,
                        },
                    ],
                    focus: { element: 0, select: !1 },
                    options: { maximizable: !1, resizable: !1 },
                };
            },
            build: function () {},
            prepare: function () {},
            setMessage: function (a) {
                this.setContent(a);
            },
            settings: { message: void 0, onok: void 0, label: void 0 },
            settingUpdated: function (a, b, c) {
                switch (a) {
                    case "message":
                        this.setMessage(c);
                        break;
                    case "label":
                        this.__internal.buttons[0].element &&
                            (this.__internal.buttons[0].element.innerHTML = c);
                }
            },
            callback: function (a) {
                if ("function" == typeof this.get("onok")) {
                    var b = this.get("onok").call(this, a);
                    void 0 !== b && (a.cancel = !b);
                }
            },
        };
    }),
        z.dialog("confirm", function () {
            function a(a) {
                null !== c.timer &&
                    (clearInterval(c.timer),
                    (c.timer = null),
                    (a.__internal.buttons[c.index].element.innerHTML = c.text));
            }
            function b(b, d, e) {
                a(b),
                    (c.duration = e),
                    (c.index = d),
                    (c.text = b.__internal.buttons[d].element.innerHTML),
                    (c.timer = setInterval(k(b, c.task), 1e3)),
                    c.task(null, b);
            }
            var c = {
                timer: null,
                index: null,
                text: null,
                duration: null,
                task: function (b, d) {
                    if (d.isOpen()) {
                        if (
                            ((d.__internal.buttons[c.index].element.innerHTML =
                                c.text +
                                " (&#8207;" +
                                c.duration +
                                "&#8207;) "),
                            (c.duration -= 1),
                            -1 === c.duration)
                        ) {
                            a(d);
                            var e = d.__internal.buttons[c.index],
                                f = l(c.index, e);
                            "function" == typeof d.callback &&
                                d.callback.apply(d, [f]),
                                !1 !== f.close && d.close();
                        }
                    } else a(d);
                },
            };
            return {
                main: function (a, b, c, d) {
                    var e, f, g, h;
                    switch (arguments.length) {
                        case 1:
                            f = a;
                            break;
                        case 2:
                            (f = a), (g = b);
                            break;
                        case 3:
                            (f = a), (g = b), (h = c);
                            break;
                        case 4:
                            (e = a), (f = b), (g = c), (h = d);
                    }
                    return (
                        this.set("title", e),
                        this.set("message", f),
                        this.set("onok", g),
                        this.set("oncancel", h),
                        this
                    );
                },
                setup: function () {
                    return {
                        buttons: [
                            {
                                text: z.defaults.glossary.ok,
                                key: p.ENTER,
                                className: z.defaults.theme.ok,
                            },
                            {
                                text: z.defaults.glossary.cancel,
                                key: p.ESC,
                                invokeOnClose: !0,
                                className: z.defaults.theme.cancel,
                            },
                        ],
                        focus: { element: 0, select: !1 },
                        options: { maximizable: !1, resizable: !1 },
                    };
                },
                build: function () {},
                prepare: function () {},
                setMessage: function (a) {
                    this.setContent(a);
                },
                settings: {
                    message: null,
                    labels: null,
                    onok: null,
                    oncancel: null,
                    defaultFocus: null,
                    reverseButtons: null,
                },
                settingUpdated: function (a, b, c) {
                    switch (a) {
                        case "message":
                            this.setMessage(c);
                            break;
                        case "labels":
                            "ok" in c &&
                                this.__internal.buttons[0].element &&
                                ((this.__internal.buttons[0].text = c.ok),
                                (this.__internal.buttons[0].element.innerHTML =
                                    c.ok)),
                                "cancel" in c &&
                                    this.__internal.buttons[1].element &&
                                    ((this.__internal.buttons[1].text =
                                        c.cancel),
                                    (this.__internal.buttons[1].element.innerHTML =
                                        c.cancel));
                            break;
                        case "reverseButtons":
                            !0 === c
                                ? this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[0].element
                                )
                                : this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[1].element
                                );
                            break;
                        case "defaultFocus":
                            this.__internal.focus.element = "ok" === c ? 0 : 1;
                    }
                },
                callback: function (b) {
                    a(this);
                    var c;
                    switch (b.index) {
                        case 0:
                            "function" == typeof this.get("onok") &&
                                void 0 !==
                                    (c = this.get("onok").call(this, b)) &&
                                (b.cancel = !c);
                            break;
                        case 1:
                            "function" == typeof this.get("oncancel") &&
                                void 0 !==
                                    (c = this.get("oncancel").call(this, b)) &&
                                (b.cancel = !c);
                    }
                },
                autoOk: function (a) {
                    return b(this, 0, a), this;
                },
                autoCancel: function (a) {
                    return b(this, 1, a), this;
                },
            };
        }),
        z.dialog("prompt", function () {
            var b = document.createElement("INPUT"),
                c = document.createElement("P");
            return {
                main: function (a, b, c, d, e) {
                    var f, g, h, i, j;
                    switch (arguments.length) {
                        case 1:
                            g = a;
                            break;
                        case 2:
                            (g = a), (h = b);
                            break;
                        case 3:
                            (g = a), (h = b), (i = c);
                            break;
                        case 4:
                            (g = a), (h = b), (i = c), (j = d);
                            break;
                        case 5:
                            (f = a), (g = b), (h = c), (i = d), (j = e);
                    }
                    return (
                        this.set("title", f),
                        this.set("message", g),
                        this.set("value", h),
                        this.set("onok", i),
                        this.set("oncancel", j),
                        this
                    );
                },
                setup: function () {
                    return {
                        buttons: [
                            {
                                text: z.defaults.glossary.ok,
                                key: p.ENTER,
                                className: z.defaults.theme.ok,
                            },
                            {
                                text: z.defaults.glossary.cancel,
                                key: p.ESC,
                                invokeOnClose: !0,
                                className: z.defaults.theme.cancel,
                            },
                        ],
                        focus: { element: b, select: !0 },
                        options: { maximizable: !1, resizable: !1 },
                    };
                },
                build: function () {
                    (b.className = z.defaults.theme.input),
                        b.setAttribute("type", "text"),
                        (b.value = this.get("value")),
                        this.elements.content.appendChild(c),
                        this.elements.content.appendChild(b);
                },
                prepare: function () {},
                setMessage: function (b) {
                    h(b)
                        ? (g(c), (c.innerHTML = b))
                        : b instanceof a.HTMLElement &&
                        c.firstChild !== b &&
                        (g(c), c.appendChild(b));
                },
                settings: {
                    message: void 0,
                    labels: void 0,
                    onok: void 0,
                    oncancel: void 0,
                    value: "",
                    type: "text",
                    reverseButtons: void 0,
                },
                settingUpdated: function (a, c, d) {
                    switch (a) {
                        case "message":
                            this.setMessage(d);
                            break;
                        case "value":
                            b.value = d;
                            break;
                        case "type":
                            switch (d) {
                                case "text":
                                case "color":
                                case "date":
                                case "datetime-local":
                                case "email":
                                case "month":
                                case "number":
                                case "password":
                                case "search":
                                case "tel":
                                case "time":
                                case "week":
                                    b.type = d;
                                    break;
                                default:
                                    b.type = "text";
                            }
                            break;
                        case "labels":
                            d.ok &&
                                this.__internal.buttons[0].element &&
                                (this.__internal.buttons[0].element.innerHTML =
                                    d.ok),
                                d.cancel &&
                                    this.__internal.buttons[1].element &&
                                    (this.__internal.buttons[1].element.innerHTML =
                                        d.cancel);
                            break;
                        case "reverseButtons":
                            !0 === d
                                ? this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[0].element
                                )
                                : this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[1].element
                                );
                    }
                },
                callback: function (a) {
                    var c;
                    switch (a.index) {
                        case 0:
                            (this.settings.value = b.value),
                                "function" == typeof this.get("onok") &&
                                    void 0 !==
                                        (c = this.get("onok").call(
                                            this,
                                            a,
                                            this.settings.value
                                        )) &&
                                    (a.cancel = !c);
                            break;
                        case 1:
                            "function" == typeof this.get("oncancel") &&
                                void 0 !==
                                    (c = this.get("oncancel").call(this, a)) &&
                                (a.cancel = !c),
                                a.cancel || (b.value = this.settings.value);
                    }
                },
            };
        }),
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = z)
            : "function" == typeof define && define.amd
            ? define([], function () {
                return z;
            })
            : a.alertify || (a.alertify = z);
})("undefined" != typeof window ? window : this);
