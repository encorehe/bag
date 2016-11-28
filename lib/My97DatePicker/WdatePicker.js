var $dp, WdatePicker;
(function () {
    var d = {
        $langList: [{
            name: "en",
            charset: "UTF-8"
        },
            {
                name: "zh-cn",
                charset: "gb2312"
            },
            {
                name: "zh-tw",
                charset: "GBK"
            }],
        $skinList: [{
            name: "default",
            charset: "gb2312"
        },
            {
                name: "whyGreen",
                charset: "gb2312"
            },
            {
                name: "blue",
                charset: "gb2312"
            },
            {
                name: "green",
                charset: "gb2312"
            },
            {
                name: "simple",
                charset: "gb2312"
            },
            {
                name: "ext",
                charset: "gb2312"
            },
            {
                name: "blueFresh",
                charset: "gb2312"
            },
            {
                name: "twoer",
                charset: "gb2312"
            },
            {
                name: "YcloudRed",
                charset: "gb2312"
            }],
        $wdate: true,
        $crossFrame: true,
        $preLoad: false,
        $dpPath: "../lib/My97DatePicker/",
        doubleCalendar: false,
        enableKeyboard: true,
        enableInputMask: true,
        autoUpdateOnChanged: null,
        weekMethod: "ISO8601",
        position: {},
        lang: "auto",
        skin: "default",
        dateFmt: "yyyy-MM-dd",
        realDateFmt: "yyyy-MM-dd",
        realTimeFmt: "HH:mm:ss",
        realFullFmt: "%Date %Time",
        minDate: "1900-01-01 00:00:00",
        maxDate: "2099-12-31 23:59:59",
        startDate: "",
        alwaysUseStartDate: false,
        yearOffset: 1911,
        firstDayOfWeek: 0,
        isShowWeek: false,
        highLineWeekDay: true,
        isShowClear: true,
        isShowToday: true,
        isShowOK: true,
        isShowOthers: true,
        readOnly: false,
        errDealMode: 0,
        autoPickDate: null,
        qsEnabled: true,
        autoShowQS: false,
        opposite: false,
        hmsMenuCfg: {
            H: [1, 6],
            m: [5, 6],
            s: [15, 4]
        },
        opposite: false,
        specialDates: null,
        specialDays: null,
        disabledDates: null,
        disabledDays: null,
        onpicking: null,
        onpicked: null,
        onclearing: null,
        oncleared: null,
        ychanging: null,
        ychanged: null,
        Mchanging: null,
        Mchanged: null,
        dchanging: null,
        dchanged: null,
        Hchanging: null,
        Hchanged: null,
        mchanging: null,
        mchanged: null,
        schanging: null,
        schanged: null,
        eCont: null,
        vel: null,
        elProp: "",
        errMsg: "",
        quickSel: [],
        has: {},
        getRealLang: function () {
            var a = d.$langList;
            for (var b = 0; b < a.length; b++) {
                if (a[b].name == this.lang) {
                    return a[b]
                }
            }
            return a[0]
        }
    };
    WdatePicker = ac;
    var ag = window,
        ab = {
            innerHTML: ""
        },
        v = "document",
        p = "documentElement",
        k = "getElementsByTagName",
        ad, g, aa, o, j, af = navigator.appName;
    if (af == "Microsoft Internet Explorer") {
        aa = true
    } else {
        if (af == "Opera") {
            j = true
        } else {
            o = true
        }
    }
    g = d.$dpPath || r();
    if (d.$wdate) {
        //s(g + "../lib/My97DatePicker/skin/WdatePicker.css")
    }
    ad = ag;
    if (d.$crossFrame) {
        try {
            while (ad.parent != ad && ad.parent[v][k]("frameset").length == 0) {
                ad = ad.parent
            }
        } catch (w) {}
    }
    if (!ad.$dp) {
        ad.$dp = {
            ff: o,
            ie: aa,
            opera: j,
            status: 0,
            defMinDate: d.minDate,
            defMaxDate: d.maxDate
        }
    }
    i();
    if (d.$preLoad && $dp.status == 0) {
        m(ag, "onload", function () {
            ac(null, true)
        })
    }
    if (!ag[v].docMD) {
        m(ag[v], "onmousedown", l, true);
        ag[v].docMD = true
    }
    if (!ad[v].docMD) {
        m(ad[v], "onmousedown", l, true);
        ad[v].docMD = true
    }
    m(ag, "onunload", function () {
        if ($dp.dd) {
            x($dp.dd, "none")
        }
    });

    function i() {
        try {
            ad[v],
                ad.$dp = ad.$dp || {}
        } catch (a) {
            ad = ag;
            $dp = $dp || {}
        }
        var c = {
            win: ag,
            $: function (A) {
                return (typeof A == "string") ? ag[v].getElementById(A) : A
            },
            $D: function (A, B) {
                return this.$DV(this.$(A).value, B)
            },
            $DV: function (E, D) {
                if (E != "") {
                    this.dt = $dp.cal.splitDate(E, $dp.cal.dateFmt);
                    if (D) {
                        for (var G in D) {
                            if (this.dt[G] === undefined) {
                                this.errMsg = "invalid property:" + G
                            } else {
                                this.dt[G] += D[G];
                                if (G == "M") {
                                    var H = D.M > 0 ? 1 : 0,
                                        F = new Date(this.dt.y, this.dt.M, 0).getDate();
                                    this.dt.d = Math.min(F + H, this.dt.d)
                                }
                            }
                        }
                    }
                    if (this.dt.refresh()) {
                        return this.dt
                    }
                }
                return ""
            },
            show: function () {
                var E = ad[v].getElementsByTagName("div"),
                    C = 100000;
                for (var F = 0; F < E.length; F++) {
                    var D = parseInt(E[F].style.zIndex);
                    if (D > C) {
                        C = D
                    }
                }
                this.dd.style.zIndex = C + 2;
                x(this.dd, "block");
                x(this.dd.firstChild, "")
            },
            unbind: function (A) {
                A = this.$(A);
                if (A.initcfg) {
                    t(A, "onclick", function () {
                        ac(A.initcfg)
                    });
                    t(A, "onfocus", function () {
                        ac(A.initcfg)
                    })
                }
            },
            hide: function () {
                x(this.dd, "none")
            },
            attachEvent: m
        };
        for (var b in c) {
            ad.$dp[b] = c[b]
        }
        $dp = ad.$dp
    }
    function m(D, b, c, a) {
        if (D.addEventListener) {
            var E = b.replace(/on/, "");
            c._ieEmuEventHandler = function (A) {
                return c(A)
            };
            D.addEventListener(E, c._ieEmuEventHandler, a)
        } else {
            D.attachEvent(b, c)
        }
    }
    function t(c, a, b) {
        if (c.removeEventListener) {
            var C = a.replace(/on/, "");
            b._ieEmuEventHandler = function (A) {
                return b(A)
            };
            c.removeEventListener(C, b._ieEmuEventHandler, false)
        } else {
            c.detachEvent(a, b)
        }
    }
    function f(b, a, c) {
        if (typeof b != typeof a) {
            return false
        }
        if (typeof b == "object") {
            if (!c) {
                for (var C in b) {
                    if (typeof a[C] == "undefined") {
                        return false
                    }
                    if (!f(b[C], a[C], true)) {
                        return false
                    }
                }
            }
            return true
        } else {
            if (typeof b == "function" && typeof a == "function") {
                return b.toString() == a.toString()
            } else {
                return b == a
            }
        }
    }
    function r() {
        var b, c, a = ag[v][k]("script");
        for (var C = 0; C < a.length; C++) {
            b = a[C].getAttribute("src") || "";
            b = b.substr(0, b.toLowerCase().indexOf("wdatepicker.js"));
            c = b.lastIndexOf("/");
            if (c > 0) {
                b = b.substring(0, c + 1)
            }
            if (b) {
                break
            }
        }
        return b
    }
    function s(c, a, C) {
        var E = ag[v][k]("HEAD").item(0),
            b = ag[v].createElement("link");
        if (E) {
            b.href = c;
            b.rel = "stylesheet";
            b.type = "text/css";
            if (a) {
                b.title = a
            }
            if (C) {
                b.charset = C
            }
            E.appendChild(b)
        }
    }
    function n(a) {
        a = a || ad;
        var c = 0,
            b = 0;
        while (a != ad) {
            var G = a.parent[v][k]("iframe");
            for (var I = 0; I < G.length; I++) {
                try {
                    if (G[I].contentWindow == a) {
                        var H = ae(G[I]);
                        c += H.left;
                        b += H.top;
                        break
                    }
                } catch (C) {}
            }
            a = a.parent
        }
        return {
            leftM: c,
            topM: b
        }
    }
    function ae(O, N) {
        if (O.getBoundingClientRect) {
            return O.getBoundingClientRect()
        } else {
            var c = {
                    ROOT_TAG: /^body|html$/i,
                    OP_SCROLL: /^(?:inline|table-row)$/i
                },
                M = false,
                Q = null,
                b = O.offsetTop,
                P = O.offsetLeft,
                L = O.offsetWidth,
                J = O.offsetHeight,
                K = O.offsetParent;
            if (K != O) {
                while (K) {
                    P += K.offsetLeft;
                    b += K.offsetTop;
                    if (z(K, "position").toLowerCase() == "fixed") {
                        M = true
                    } else {
                        if (K.tagName.toLowerCase() == "body") {
                            Q = K.ownerDocument.defaultView
                        }
                    }
                    K = K.offsetParent
                }
            }
            K = O.parentNode;
            while (K.tagName && !c.ROOT_TAG.test(K.tagName)) {
                if (K.scrollTop || K.scrollLeft) {
                    if (!c.OP_SCROLL.test(x(K))) {
                        if (!j || K.style.overflow !== "visible") {
                            P -= K.scrollLeft;
                            b -= K.scrollTop
                        }
                    }
                }
                K = K.parentNode
            }
            if (!M) {
                var a = h(Q);
                P -= a.left;
                b -= a.top
            }
            L += P;
            J += b;
            return {
                left: P,
                top: b,
                right: L,
                bottom: J
            }
        }
    }
    function u(a) {
        a = a || ad;
        var C = a[v],
            c = (a.innerWidth) ? a.innerWidth : (C[p] && C[p].clientWidth) ? C[p].clientWidth : C.body.offsetWidth,
            b = (a.innerHeight) ? a.innerHeight : (C[p] && C[p].clientHeight) ? C[p].clientHeight : C.body.offsetHeight;
        return {
            width: c,
            height: b
        }
    }
    function h(a) {
        a = a || ad;
        var C = a[v],
            c = C[p],
            b = C.body;
        C = (c && c.scrollTop != null && (c.scrollTop > b.scrollTop || c.scrollLeft > b.scrollLeft)) ? c : b;
        return {
            top: C.scrollTop,
            left: C.scrollLeft
        }
    }
    function l(a) {
        try {
            var b = a ? (a.srcElement || a.target) : null;
            if ($dp.cal && !$dp.eCont && $dp.dd && b != $dp.el && $dp.dd.style.display == "block") {
                $dp.cal.close()
            }
        } catch (a) {}
    }
    function ah() {
        $dp.status = 2
    }
    var y, e;

    function ac(I, b) {
        if (!$dp) {
            return
        }
        i();
        var M = {};
        for (var E in I) {
            M[E] = I[E]
        }
        for (E in d) {
            if (E.substring(0, 1) != "$" && M[E] === undefined) {
                M[E] = d[E]
            }
        }
        if (b) {
            if (!G()) {
                e = e || setInterval(function () {
                        if (ad[v].readyState == "complete") {
                            clearInterval(e)
                        }
                        ac(null, true)
                    }, 50);
                return
            }
            if ($dp.status == 0) {
                $dp.status = 1;
                M.el = ab;
                q(M, true)
            } else {
                return
            }
        } else {
            if (M.eCont) {
                M.eCont = $dp.$(M.eCont);
                M.el = ab;
                M.autoPickDate = true;
                M.qsEnabled = false;
                q(M)
            } else {
                if (d.$preLoad && $dp.status != 2) {
                    return
                }
                var B = c();
                if (ag.event === B || B) {
                    M.srcEl = B.srcElement || B.target;
                    B.cancelBubble = true
                }
                M.el = M.el = $dp.$(M.el || M.srcEl);
                if (!M.el || M.el.My97Mark === true || M.el.disabled || ($dp.dd && x($dp.dd) != "none" && $dp.dd.style.left != "-970px")) {
                    try {
                        if (M.el.My97Mark) {
                            M.el.My97Mark = false
                        }
                    } catch (a) {}
                    return
                }
                if (B && M.el.nodeType == 1 && !f(M.el.initcfg, I)) {
                    $dp.unbind(M.el);
                    m(M.el, B.type == "focus" ? "onclick" : "onfocus", function () {
                        ac(I)
                    });
                    M.el.initcfg = I
                }
                q(M)
            }
        }
        function G() {
            if (aa && ad != ag && ad[v].readyState != "complete") {
                return false
            }
            return true
        }
        function c() {
            if (o) {
                func = c.caller;
                while (func != null) {
                    var A = func.arguments[0];
                    if (A && (A + "").indexOf("Event") >= 0) {
                        return A
                    }
                    func = func.caller
                }
                return null
            }
            return event
        }
    }
    function z(b, a) {
        return b.currentStyle ? b.currentStyle[a] : document.defaultView.getComputedStyle(b, false)[a]
    }
    function x(b, a) {
        if (b) {
            if (a != null) {
                b.style.display = a
            } else {
                return z(b, "display")
            }
        }
    }
    function q(H, a) {
        var A = H.el ? H.el.nodeName : "INPUT";
        if (a || H.eCont || new RegExp(/input|textarea|div|span|p|a/ig).test(A)) {
            H.elProp = A == "INPUT" ? "value" : "innerHTML"
        } else {
            return
        }
        if (H.lang == "auto") {
            H.lang = aa ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase()
        }
        if (!H.eCont) {
            for (var c in H) {
                $dp[c] = H[c]
            }
        }
        if (!$dp.dd || H.eCont || ($dp.dd && (H.getRealLang().name != $dp.dd.lang || H.skin != $dp.dd.skin))) {
            if (H.eCont) {
                F(H.eCont, H)
            } else {
                $dp.dd = ad[v].createElement("DIV");
                $dp.dd.style.cssText = "position:absolute";
                ad[v].body.appendChild($dp.dd);
                F($dp.dd, H);
                if (a) {
                    $dp.dd.style.left = $dp.dd.style.top = "-970px"
                } else {
                    $dp.show();
                    b($dp)
                }
            }
        } else {
            if ($dp.cal) {
                $dp.show();
                $dp.cal.init();
                if (!$dp.eCont) {
                    b($dp)
                }
            }
        }
        function F(U, T) {
            var S = ad[v].domain,
                P = false,
                Q = '<iframe hideFocus=true width=9 height=7 frameborder=0 border=0 scrolling=no src="about:blank"></iframe>';
            U.innerHTML = Q;
            var B = d.$langList,
                N = d.$skinList,
                R;
            try {
                R = U.lastChild.contentWindow[v]
            } catch (O) {
                P = true;
                U.removeChild(U.lastChild);
                var V = ad[v].createElement("iframe");
                V.hideFocus = true;
                V.frameBorder = 0;
                V.scrolling = "no";
                V.src = "javascript:(function(){var d=document;d.open();d.domain='" + S + "';})()";
                U.appendChild(V);
                setTimeout(function () {
                    R = U.lastChild.contentWindow[v];
                    M()
                }, 97);
                return
            }
            M();

            function M() {
                var E = T.getRealLang();
                U.lang = E.name;
                U.skin = T.skin;
                var D = ["<head><script>", "", "var doc=document, $d, $dp, $cfg=doc.cfg, $pdp = parent.$dp, $dt, $tdt, $sdt, $lastInput, $IE=$pdp.ie, $FF = $pdp.ff,$OPERA=$pdp.opera, $ny, $cMark = false;", "if($cfg.eCont){$dp = {};for(var p in $pdp)$dp[p]=$pdp[p];}else{$dp=$pdp;};for(var p in $cfg){$dp[p]=$cfg[p];}", "doc.oncontextmenu=function(){try{$c._fillQS(!$dp.has.d,1);showB($d.qsDivSel);}catch(e){};return false;};", "</script><script src=", g, "lang/", E.name, ".js charset=", E.charset, "></script>"];
                if (P) {
                    D[1] = 'document.domain="' + S + '";'
                }
                for (var G = 0; G < N.length; G++) {
                    if (N[G].name == T.skin) {
                        D.push('<link rel="stylesheet" type="text/css" href="' + g + "skin/" + N[G].name + '/datepicker.css" charset="' + N[G].charset + '"/>')
                    }
                }
                D.push('<script src="' + g + 'calendar.js"></script>');
                D.push('</head><body leftmargin="0" topmargin="0" tabindex=0></body></html>');
                D.push("<script>var t;t=t||setInterval(function(){if(doc.ready){new My97DP();$cfg.onload();$c.autoSize();$cfg.setPos($dp);clearInterval(t);}},20);</script>");
                T.setPos = b;
                T.onload = ah;
                R.write("<html>");
                R.cfg = T;
                R.write(D.join(""));
                R.close()
            }
        }
        function b(U) {
            var S = U.position.left,
                O = U.position.top,
                P = U.el;
            if (P == ab) {
                return
            }
            if (P != U.srcEl && (x(P) == "none" || P.type == "hidden")) {
                P = U.srcEl
            }
            var T = ae(P),
                K = n(ag),
                Q = u(ad),
                N = h(ad),
                R = $dp.dd.offsetHeight,
                M = $dp.dd.offsetWidth;
            if (isNaN(O)) {
                O = 0
            }
            if ((K.topM + T.bottom + R > Q.height) && (K.topM + T.top - R > 0)) {
                O += N.top + K.topM + T.top - R - 2
            } else {
                O += N.top + K.topM + T.bottom;
                var L = O - N.top + R - Q.height;
                if (L > 0) {
                    O -= L
                }
            }
            if (isNaN(S)) {
                S = 0
            }
            S += N.left + Math.min(K.leftM + T.left, Q.width - M - 5) - (aa ? 2 : 0);
            U.dd.style.top = O + "px";
            U.dd.style.left = S + "px"
        }
    }
})();