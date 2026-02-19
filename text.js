(function() {
    const a = document.createElement("link").relList;
    if (a && a.supports && a.supports("modulepreload"))
        return;
    for (const c of document.querySelectorAll('link[rel="modulepreload"]'))
        o(c);
    new MutationObserver(c => {
        for (const f of c)
            if (f.type === "childList")
                for (const d of f.addedNodes)
                    d.tagName === "LINK" && d.rel === "modulepreload" && o(d)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function r(c) {
        const f = {};
        return c.integrity && (f.integrity = c.integrity),
        c.referrerPolicy && (f.referrerPolicy = c.referrerPolicy),
        c.crossOrigin === "use-credentials" ? f.credentials = "include" : c.crossOrigin === "anonymous" ? f.credentials = "omit" : f.credentials = "same-origin",
        f
    }
    function o(c) {
        if (c.ep)
            return;
        c.ep = !0;
        const f = r(c);
        fetch(c.href, f)
    }
}
)();
const Ou = [];
let ng = !0;
const lg = console.error;
function Kh(u) {
    Ou.length > 5 || !ng || Ou.push(u)
}
function ag(u) {
    Ou.push({
        type: "runtime",
        args: u
    })
}
function ig(u) {
    u.preventDefault()
}
function gy(u) {
    try {
        const a = u.find(r => r instanceof Error);
        if (a && a.stack)
            Kh({
                type: "console.error",
                args: a
            });
        else if (u.length > 0) {
            const r = u.map(c => typeof c == "object" ? JSON.stringify(c) : String(c)).join(" ")
              , o = new Error(r);
            Kh({
                type: "console.error",
                args: o
            })
        }
    } catch (a) {
        console.warn(a)
    }
}
window.addEventListener("error", ag);
window.addEventListener("unhandledrejection", ig);
console.error = function(...a) {
    gy(a),
    lg.apply(this, a)
}
;
function py() {
    return window.removeEventListener("error", ag),
    window.removeEventListener("unhandledrejection", ig),
    console.error = lg,
    ng = !1,
    Ou
}
const yy = 1e3
  , kh = Symbol("postMessageResponseTimeout");
let xu = 0;
const no = "*";
class Wa {
    client;
    baseTimeout;
    waitRes = new Map;
    removeListeners = new Set;
    clear;
    constructor(a, r) {
        this.client = a,
        this.baseTimeout = r?.timeout || yy;
        const o = this.emitResponse.bind(this);
        this.clear = () => {
            window.removeEventListener("message", o)
        }
        ,
        window.addEventListener("message", o)
    }
    destroy() {
        this.clear(),
        this.removeListeners.forEach(a => a())
    }
    isTimeout(a) {
        return a === kh
    }
    post(a, r, o) {
        xu++;
        const {timeout: c, origin: f=no} = o || {};
        return this.client.postMessage({
            data: r,
            id: xu,
            type: a
        }, f),
        new Promise(d => {
            this.waitRes.set(xu, g => {
                d(g)
            }
            ),
            setTimeout( () => {
                this.waitRes.delete(xu),
                d(kh)
            }
            , c || this.baseTimeout)
        }
        )
    }
    on(a, r, o) {
        const {once: c, origin: f=no} = o || {}
          , d = async m => {
            const {id: p, type: x, data: v} = m.data;
            let S;
            x === a && (S = await r(v),
            console.log(a, c, S, v),
            (p && f === m.origin || f === no) && m.source?.postMessage({
                fromType: a,
                id: p,
                data: S
            }, m.origin),
            c && g())
        }
        ;
        window.addEventListener("message", d);
        const g = () => {
            window.removeEventListener("message", d),
            this.removeListeners.delete(g)
        }
        ;
        return this.removeListeners.add(g),
        g
    }
    emitResponse(a) {
        const r = a.data
          , {id: o, data: c} = r
          , f = this.waitRes.get(o);
        f && f(c)
    }
}
function vy(u) {
    return u && u.__esModule && Object.prototype.hasOwnProperty.call(u, "default") ? u.default : u
}
function xy(u) {
    if (Object.prototype.hasOwnProperty.call(u, "__esModule"))
        return u;
    var a = u.default;
    if (typeof a == "function") {
        var r = function o() {
            var c = !1;
            try {
                c = this instanceof o
            } catch {}
            return c ? Reflect.construct(a, arguments, this.constructor) : a.apply(this, arguments)
        };
        r.prototype = a.prototype
    } else
        r = {};
    return Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    Object.keys(u).forEach(function(o) {
        var c = Object.getOwnPropertyDescriptor(u, o);
        Object.defineProperty(r, o, c.get ? c : {
            enumerable: !0,
            get: function() {
                return u[o]
            }
        })
    }),
    r
}
var Ha = {}, lo = {}, ao = {}, io = {}, Jh;
function by() {
    if (Jh)
        return io;
    Jh = 1;
    const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return io.encode = function(a) {
        if (0 <= a && a < u.length)
            return u[a];
        throw new TypeError("Must be between 0 and 63: " + a)
    }
    ,
    io
}
var $h;
function ug() {
    if ($h)
        return ao;
    $h = 1;
    const u = by()
      , a = 5
      , r = 1 << a
      , o = r - 1
      , c = r;
    function f(d) {
        return d < 0 ? (-d << 1) + 1 : (d << 1) + 0
    }
    return ao.encode = function(g) {
        let m = "", p, x = f(g);
        do
            p = x & o,
            x >>>= a,
            x > 0 && (p |= c),
            m += u.encode(p);
        while (x > 0);
        return m
    }
    ,
    ao
}
var Lt = {};
const Sy = {}
  , Ey = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Sy
}, Symbol.toStringTag, {
    value: "Module"
}))
  , wy = xy(Ey);
var uo, Fh;
function _y() {
    return Fh || (Fh = 1,
    uo = typeof URL == "function" ? URL : wy.URL),
    uo
}
var Wh;
function Mu() {
    if (Wh)
        return Lt;
    Wh = 1;
    const u = _y();
    function a(Q, Z, k) {
        if (Z in Q)
            return Q[Z];
        if (arguments.length === 3)
            return k;
        throw new Error('"' + Z + '" is a required argument.')
    }
    Lt.getArg = a;
    const r = (function() {
        return !("__proto__"in Object.create(null))
    }
    )();
    function o(Q) {
        return Q
    }
    function c(Q) {
        return d(Q) ? "$" + Q : Q
    }
    Lt.toSetString = r ? o : c;
    function f(Q) {
        return d(Q) ? Q.slice(1) : Q
    }
    Lt.fromSetString = r ? o : f;
    function d(Q) {
        if (!Q)
            return !1;
        const Z = Q.length;
        if (Z < 9 || Q.charCodeAt(Z - 1) !== 95 || Q.charCodeAt(Z - 2) !== 95 || Q.charCodeAt(Z - 3) !== 111 || Q.charCodeAt(Z - 4) !== 116 || Q.charCodeAt(Z - 5) !== 111 || Q.charCodeAt(Z - 6) !== 114 || Q.charCodeAt(Z - 7) !== 112 || Q.charCodeAt(Z - 8) !== 95 || Q.charCodeAt(Z - 9) !== 95)
            return !1;
        for (let k = Z - 10; k >= 0; k--)
            if (Q.charCodeAt(k) !== 36)
                return !1;
        return !0
    }
    function g(Q, Z) {
        return Q === Z ? 0 : Q === null ? 1 : Z === null ? -1 : Q > Z ? 1 : -1
    }
    function m(Q, Z) {
        let k = Q.generatedLine - Z.generatedLine;
        return k !== 0 || (k = Q.generatedColumn - Z.generatedColumn,
        k !== 0) || (k = g(Q.source, Z.source),
        k !== 0) || (k = Q.originalLine - Z.originalLine,
        k !== 0) || (k = Q.originalColumn - Z.originalColumn,
        k !== 0) ? k : g(Q.name, Z.name)
    }
    Lt.compareByGeneratedPositionsInflated = m;
    function p(Q) {
        return JSON.parse(Q.replace(/^\)]}'[^\n]*\n/, ""))
    }
    Lt.parseSourceMapInput = p;
    const x = "http:"
      , v = `${x}//host`;
    function S(Q) {
        return Z => {
            const k = M(Z)
              , le = O(Z)
              , ce = new u(Z,le);
            Q(ce);
            const Ce = ce.toString();
            return k === "absolute" ? Ce : k === "scheme-relative" ? Ce.slice(x.length) : k === "path-absolute" ? Ce.slice(v.length) : U(le, Ce)
        }
    }
    function b(Q, Z) {
        return new u(Q,Z).toString()
    }
    function E(Q, Z) {
        let k = 0;
        do {
            const le = Q + k++;
            if (Z.indexOf(le) === -1)
                return le
        } while (!0)
    }
    function O(Q) {
        const Z = Q.split("..").length - 1
          , k = E("p", Q);
        let le = `${v}/`;
        for (let ce = 0; ce < Z; ce++)
            le += `${k}/`;
        return le
    }
    const C = /^[A-Za-z0-9\+\-\.]+:/;
    function M(Q) {
        return Q[0] === "/" ? Q[1] === "/" ? "scheme-relative" : "path-absolute" : C.test(Q) ? "absolute" : "path-relative"
    }
    function U(Q, Z) {
        typeof Q == "string" && (Q = new u(Q)),
        typeof Z == "string" && (Z = new u(Z));
        const k = Z.pathname.split("/")
          , le = Q.pathname.split("/");
        for (le.length > 0 && !le[le.length - 1] && le.pop(); k.length > 0 && le.length > 0 && k[0] === le[0]; )
            k.shift(),
            le.shift();
        return le.map( () => "..").concat(k).join("/") + Z.search + Z.hash
    }
    const V = S(Q => {
        Q.pathname = Q.pathname.replace(/\/?$/, "/")
    }
    )
      , J = S(Q => {
        Q.href = new u(".",Q.toString()).toString()
    }
    )
      , W = S(Q => {}
    );
    Lt.normalize = W;
    function oe(Q, Z) {
        const k = M(Z)
          , le = M(Q);
        if (Q = V(Q),
        k === "absolute")
            return b(Z, void 0);
        if (le === "absolute")
            return b(Z, Q);
        if (k === "scheme-relative")
            return W(Z);
        if (le === "scheme-relative")
            return b(Z, b(Q, v)).slice(x.length);
        if (k === "path-absolute")
            return W(Z);
        if (le === "path-absolute")
            return b(Z, b(Q, v)).slice(v.length);
        const ce = O(Z + Q)
          , Ce = b(Z, b(Q, ce));
        return U(ce, Ce)
    }
    Lt.join = oe;
    function P(Q, Z) {
        const k = pe(Q, Z);
        return typeof k == "string" ? k : W(Z)
    }
    Lt.relative = P;
    function pe(Q, Z) {
        if (M(Q) !== M(Z))
            return null;
        const le = O(Q + Z)
          , ce = new u(Q,le)
          , Ce = new u(Z,le);
        try {
            new u("",Ce.toString())
        } catch {
            return null
        }
        return Ce.protocol !== ce.protocol || Ce.user !== ce.user || Ce.password !== ce.password || Ce.hostname !== ce.hostname || Ce.port !== ce.port ? null : U(ce, Ce)
    }
    function Ee(Q, Z, k) {
        Q && M(Z) === "path-absolute" && (Z = Z.replace(/^\//, ""));
        let le = W(Z || "");
        return Q && (le = oe(Q, le)),
        k && (le = oe(J(k), le)),
        le
    }
    return Lt.computeSourceURL = Ee,
    Lt
}
var so = {}, Ph;
function sg() {
    if (Ph)
        return so;
    Ph = 1;
    class u {
        constructor() {
            this._array = [],
            this._set = new Map
        }
        static fromArray(r, o) {
            const c = new u;
            for (let f = 0, d = r.length; f < d; f++)
                c.add(r[f], o);
            return c
        }
        size() {
            return this._set.size
        }
        add(r, o) {
            const c = this.has(r)
              , f = this._array.length;
            (!c || o) && this._array.push(r),
            c || this._set.set(r, f)
        }
        has(r) {
            return this._set.has(r)
        }
        indexOf(r) {
            const o = this._set.get(r);
            if (o >= 0)
                return o;
            throw new Error('"' + r + '" is not in the set.')
        }
        at(r) {
            if (r >= 0 && r < this._array.length)
                return this._array[r];
            throw new Error("No element indexed by " + r)
        }
        toArray() {
            return this._array.slice()
        }
    }
    return so.ArraySet = u,
    so
}
var ro = {}, Ih;
function Cy() {
    if (Ih)
        return ro;
    Ih = 1;
    const u = Mu();
    function a(o, c) {
        const f = o.generatedLine
          , d = c.generatedLine
          , g = o.generatedColumn
          , m = c.generatedColumn;
        return d > f || d == f && m >= g || u.compareByGeneratedPositionsInflated(o, c) <= 0
    }
    class r {
        constructor() {
            this._array = [],
            this._sorted = !0,
            this._last = {
                generatedLine: -1,
                generatedColumn: 0
            }
        }
        unsortedForEach(c, f) {
            this._array.forEach(c, f)
        }
        add(c) {
            a(this._last, c) ? (this._last = c,
            this._array.push(c)) : (this._sorted = !1,
            this._array.push(c))
        }
        toArray() {
            return this._sorted || (this._array.sort(u.compareByGeneratedPositionsInflated),
            this._sorted = !0),
            this._array
        }
    }
    return ro.MappingList = r,
    ro
}
var em;
function rg() {
    if (em)
        return lo;
    em = 1;
    const u = ug()
      , a = Mu()
      , r = sg().ArraySet
      , o = Cy().MappingList;
    class c {
        constructor(d) {
            d || (d = {}),
            this._file = a.getArg(d, "file", null),
            this._sourceRoot = a.getArg(d, "sourceRoot", null),
            this._skipValidation = a.getArg(d, "skipValidation", !1),
            this._sources = new r,
            this._names = new r,
            this._mappings = new o,
            this._sourcesContents = null
        }
        static fromSourceMap(d) {
            const g = d.sourceRoot
              , m = new c({
                file: d.file,
                sourceRoot: g
            });
            return d.eachMapping(function(p) {
                const x = {
                    generated: {
                        line: p.generatedLine,
                        column: p.generatedColumn
                    }
                };
                p.source != null && (x.source = p.source,
                g != null && (x.source = a.relative(g, x.source)),
                x.original = {
                    line: p.originalLine,
                    column: p.originalColumn
                },
                p.name != null && (x.name = p.name)),
                m.addMapping(x)
            }),
            d.sources.forEach(function(p) {
                let x = p;
                g != null && (x = a.relative(g, p)),
                m._sources.has(x) || m._sources.add(x);
                const v = d.sourceContentFor(p);
                v != null && m.setSourceContent(p, v)
            }),
            m
        }
        addMapping(d) {
            const g = a.getArg(d, "generated")
              , m = a.getArg(d, "original", null);
            let p = a.getArg(d, "source", null)
              , x = a.getArg(d, "name", null);
            this._skipValidation || this._validateMapping(g, m, p, x),
            p != null && (p = String(p),
            this._sources.has(p) || this._sources.add(p)),
            x != null && (x = String(x),
            this._names.has(x) || this._names.add(x)),
            this._mappings.add({
                generatedLine: g.line,
                generatedColumn: g.column,
                originalLine: m && m.line,
                originalColumn: m && m.column,
                source: p,
                name: x
            })
        }
        setSourceContent(d, g) {
            let m = d;
            this._sourceRoot != null && (m = a.relative(this._sourceRoot, m)),
            g != null ? (this._sourcesContents || (this._sourcesContents = Object.create(null)),
            this._sourcesContents[a.toSetString(m)] = g) : this._sourcesContents && (delete this._sourcesContents[a.toSetString(m)],
            Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null))
        }
        applySourceMap(d, g, m) {
            let p = g;
            if (g == null) {
                if (d.file == null)
                    throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
                p = d.file
            }
            const x = this._sourceRoot;
            x != null && (p = a.relative(x, p));
            const v = this._mappings.toArray().length > 0 ? new r : this._sources
              , S = new r;
            this._mappings.unsortedForEach(function(b) {
                if (b.source === p && b.originalLine != null) {
                    const C = d.originalPositionFor({
                        line: b.originalLine,
                        column: b.originalColumn
                    });
                    C.source != null && (b.source = C.source,
                    m != null && (b.source = a.join(m, b.source)),
                    x != null && (b.source = a.relative(x, b.source)),
                    b.originalLine = C.line,
                    b.originalColumn = C.column,
                    C.name != null && (b.name = C.name))
                }
                const E = b.source;
                E != null && !v.has(E) && v.add(E);
                const O = b.name;
                O != null && !S.has(O) && S.add(O)
            }, this),
            this._sources = v,
            this._names = S,
            d.sources.forEach(function(b) {
                const E = d.sourceContentFor(b);
                E != null && (m != null && (b = a.join(m, b)),
                x != null && (b = a.relative(x, b)),
                this.setSourceContent(b, E))
            }, this)
        }
        _validateMapping(d, g, m, p) {
            if (g && typeof g.line != "number" && typeof g.column != "number")
                throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
            if (!(d && "line"in d && "column"in d && d.line > 0 && d.column >= 0 && !g && !m && !p)) {
                if (!(d && "line"in d && "column"in d && g && "line"in g && "column"in g && d.line > 0 && d.column >= 0 && g.line > 0 && g.column >= 0 && m))
                    throw new Error("Invalid mapping: " + JSON.stringify({
                        generated: d,
                        source: m,
                        original: g,
                        name: p
                    }))
            }
        }
        _serializeMappings() {
            let d = 0, g = 1, m = 0, p = 0, x = 0, v = 0, S = "", b, E, O, C;
            const M = this._mappings.toArray();
            for (let U = 0, V = M.length; U < V; U++) {
                if (E = M[U],
                b = "",
                E.generatedLine !== g)
                    for (d = 0; E.generatedLine !== g; )
                        b += ";",
                        g++;
                else if (U > 0) {
                    if (!a.compareByGeneratedPositionsInflated(E, M[U - 1]))
                        continue;
                    b += ","
                }
                b += u.encode(E.generatedColumn - d),
                d = E.generatedColumn,
                E.source != null && (C = this._sources.indexOf(E.source),
                b += u.encode(C - v),
                v = C,
                b += u.encode(E.originalLine - 1 - p),
                p = E.originalLine - 1,
                b += u.encode(E.originalColumn - m),
                m = E.originalColumn,
                E.name != null && (O = this._names.indexOf(E.name),
                b += u.encode(O - x),
                x = O)),
                S += b
            }
            return S
        }
        _generateSourcesContent(d, g) {
            return d.map(function(m) {
                if (!this._sourcesContents)
                    return null;
                g != null && (m = a.relative(g, m));
                const p = a.toSetString(m);
                return Object.prototype.hasOwnProperty.call(this._sourcesContents, p) ? this._sourcesContents[p] : null
            }, this)
        }
        toJSON() {
            const d = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings()
            };
            return this._file != null && (d.file = this._file),
            this._sourceRoot != null && (d.sourceRoot = this._sourceRoot),
            this._sourcesContents && (d.sourcesContent = this._generateSourcesContent(d.sources, d.sourceRoot)),
            d
        }
        toString() {
            return JSON.stringify(this.toJSON())
        }
    }
    return c.prototype._version = 3,
    lo.SourceMapGenerator = c,
    lo
}
var qa = {}, oo = {}, tm;
function Ay() {
    return tm || (tm = 1,
    (function(u) {
        u.GREATEST_LOWER_BOUND = 1,
        u.LEAST_UPPER_BOUND = 2;
        function a(r, o, c, f, d, g) {
            const m = Math.floor((o - r) / 2) + r
              , p = d(c, f[m], !0);
            return p === 0 ? m : p > 0 ? o - m > 1 ? a(m, o, c, f, d, g) : g === u.LEAST_UPPER_BOUND ? o < f.length ? o : -1 : m : m - r > 1 ? a(r, m, c, f, d, g) : g == u.LEAST_UPPER_BOUND ? m : r < 0 ? -1 : r
        }
        u.search = function(o, c, f, d) {
            if (c.length === 0)
                return -1;
            let g = a(-1, c.length, o, c, f, d || u.GREATEST_LOWER_BOUND);
            if (g < 0)
                return -1;
            for (; g - 1 >= 0 && f(c[g], c[g - 1], !0) === 0; )
                --g;
            return g
        }
    }
    )(oo)),
    oo
}
var bu = {
    exports: {}
}, nm;
function og() {
    if (nm)
        return bu.exports;
    nm = 1;
    let u = null;
    return bu.exports = function() {
        if (typeof u == "string")
            return fetch(u).then(r => r.arrayBuffer());
        if (u instanceof ArrayBuffer)
            return Promise.resolve(u);
        throw new Error("You must provide the string URL or ArrayBuffer contents of lib/mappings.wasm by calling SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) before using SourceMapConsumer")
    }
    ,
    bu.exports.initialize = a => {
        u = a
    }
    ,
    bu.exports
}
var co, lm;
function Ty() {
    if (lm)
        return co;
    lm = 1;
    const u = og();
    function a() {
        this.generatedLine = 0,
        this.generatedColumn = 0,
        this.lastGeneratedColumn = null,
        this.source = null,
        this.originalLine = null,
        this.originalColumn = null,
        this.name = null
    }
    let r = null;
    return co = function() {
        if (r)
            return r;
        const c = [];
        return r = u().then(f => WebAssembly.instantiate(f, {
            env: {
                mapping_callback(d, g, m, p, x, v, S, b, E, O) {
                    const C = new a;
                    C.generatedLine = d + 1,
                    C.generatedColumn = g,
                    m && (C.lastGeneratedColumn = p - 1),
                    x && (C.source = v,
                    C.originalLine = S + 1,
                    C.originalColumn = b,
                    E && (C.name = O)),
                    c[c.length - 1](C)
                },
                start_all_generated_locations_for() {
                    console.time("all_generated_locations_for")
                },
                end_all_generated_locations_for() {
                    console.timeEnd("all_generated_locations_for")
                },
                start_compute_column_spans() {
                    console.time("compute_column_spans")
                },
                end_compute_column_spans() {
                    console.timeEnd("compute_column_spans")
                },
                start_generated_location_for() {
                    console.time("generated_location_for")
                },
                end_generated_location_for() {
                    console.timeEnd("generated_location_for")
                },
                start_original_location_for() {
                    console.time("original_location_for")
                },
                end_original_location_for() {
                    console.timeEnd("original_location_for")
                },
                start_parse_mappings() {
                    console.time("parse_mappings")
                },
                end_parse_mappings() {
                    console.timeEnd("parse_mappings")
                },
                start_sort_by_generated_location() {
                    console.time("sort_by_generated_location")
                },
                end_sort_by_generated_location() {
                    console.timeEnd("sort_by_generated_location")
                },
                start_sort_by_original_location() {
                    console.time("sort_by_original_location")
                },
                end_sort_by_original_location() {
                    console.timeEnd("sort_by_original_location")
                }
            }
        })).then(f => ({
            exports: f.instance.exports,
            withMappingCallback: (d, g) => {
                c.push(d);
                try {
                    g()
                } finally {
                    c.pop()
                }
            }
        })).then(null, f => {
            throw r = null,
            f
        }
        ),
        r
    }
    ,
    co
}
var am;
function Oy() {
    if (am)
        return qa;
    am = 1;
    const u = Mu()
      , a = Ay()
      , r = sg().ArraySet;
    ug();
    const o = og()
      , c = Ty()
      , f = Symbol("smcInternal");
    class d {
        constructor(S, b) {
            return S == f ? Promise.resolve(this) : p(S, b)
        }
        static initialize(S) {
            o.initialize(S["lib/mappings.wasm"])
        }
        static fromSourceMap(S, b) {
            return x(S, b)
        }
        static async with(S, b, E) {
            const O = await new d(S,b);
            try {
                return await E(O)
            } finally {
                O.destroy()
            }
        }
        eachMapping(S, b, E) {
            throw new Error("Subclasses must implement eachMapping")
        }
        allGeneratedPositionsFor(S) {
            throw new Error("Subclasses must implement allGeneratedPositionsFor")
        }
        destroy() {
            throw new Error("Subclasses must implement destroy")
        }
    }
    d.prototype._version = 3,
    d.GENERATED_ORDER = 1,
    d.ORIGINAL_ORDER = 2,
    d.GREATEST_LOWER_BOUND = 1,
    d.LEAST_UPPER_BOUND = 2,
    qa.SourceMapConsumer = d;
    class g extends d {
        constructor(S, b) {
            return super(f).then(E => {
                let O = S;
                typeof S == "string" && (O = u.parseSourceMapInput(S));
                const C = u.getArg(O, "version")
                  , M = u.getArg(O, "sources").map(String)
                  , U = u.getArg(O, "names", [])
                  , V = u.getArg(O, "sourceRoot", null)
                  , J = u.getArg(O, "sourcesContent", null)
                  , W = u.getArg(O, "mappings")
                  , oe = u.getArg(O, "file", null)
                  , P = u.getArg(O, "x_google_ignoreList", null);
                if (C != E._version)
                    throw new Error("Unsupported version: " + C);
                return E._sourceLookupCache = new Map,
                E._names = r.fromArray(U.map(String), !0),
                E._sources = r.fromArray(M, !0),
                E._absoluteSources = r.fromArray(E._sources.toArray().map(function(pe) {
                    return u.computeSourceURL(V, pe, b)
                }), !0),
                E.sourceRoot = V,
                E.sourcesContent = J,
                E._mappings = W,
                E._sourceMapURL = b,
                E.file = oe,
                E.x_google_ignoreList = P,
                E._computedColumnSpans = !1,
                E._mappingsPtr = 0,
                E._wasm = null,
                c().then(pe => (E._wasm = pe,
                E))
            }
            )
        }
        _findSourceIndex(S) {
            const b = this._sourceLookupCache.get(S);
            if (typeof b == "number")
                return b;
            const E = u.computeSourceURL(null, S, this._sourceMapURL);
            if (this._absoluteSources.has(E)) {
                const C = this._absoluteSources.indexOf(E);
                return this._sourceLookupCache.set(S, C),
                C
            }
            const O = u.computeSourceURL(this.sourceRoot, S, this._sourceMapURL);
            if (this._absoluteSources.has(O)) {
                const C = this._absoluteSources.indexOf(O);
                return this._sourceLookupCache.set(S, C),
                C
            }
            return -1
        }
        static fromSourceMap(S, b) {
            return new g(S.toString())
        }
        get sources() {
            return this._absoluteSources.toArray()
        }
        _getMappingsPtr() {
            return this._mappingsPtr === 0 && this._parseMappings(),
            this._mappingsPtr
        }
        _parseMappings() {
            const S = this._mappings
              , b = S.length
              , E = this._wasm.exports.allocate_mappings(b) >>> 0
              , O = new Uint8Array(this._wasm.exports.memory.buffer,E,b);
            for (let M = 0; M < b; M++)
                O[M] = S.charCodeAt(M);
            const C = this._wasm.exports.parse_mappings(E);
            if (!C) {
                const M = this._wasm.exports.get_last_error();
                let U = `Error parsing mappings (code ${M}): `;
                switch (M) {
                case 1:
                    U += "the mappings contained a negative line, column, source index, or name index";
                    break;
                case 2:
                    U += "the mappings contained a number larger than 2**32";
                    break;
                case 3:
                    U += "reached EOF while in the middle of parsing a VLQ";
                    break;
                case 4:
                    U += "invalid base 64 character while parsing a VLQ";
                    break;
                default:
                    U += "unknown error code";
                    break
                }
                throw new Error(U)
            }
            this._mappingsPtr = C
        }
        eachMapping(S, b, E) {
            const O = b || null
              , C = E || d.GENERATED_ORDER;
            this._wasm.withMappingCallback(M => {
                M.source !== null && (M.source = this._absoluteSources.at(M.source),
                M.name !== null && (M.name = this._names.at(M.name))),
                this._computedColumnSpans && M.lastGeneratedColumn === null && (M.lastGeneratedColumn = 1 / 0),
                S.call(O, M)
            }
            , () => {
                switch (C) {
                case d.GENERATED_ORDER:
                    this._wasm.exports.by_generated_location(this._getMappingsPtr());
                    break;
                case d.ORIGINAL_ORDER:
                    this._wasm.exports.by_original_location(this._getMappingsPtr());
                    break;
                default:
                    throw new Error("Unknown order of iteration.")
                }
            }
            )
        }
        allGeneratedPositionsFor(S) {
            let b = u.getArg(S, "source");
            const E = u.getArg(S, "line")
              , O = S.column || 0;
            if (b = this._findSourceIndex(b),
            b < 0)
                return [];
            if (E < 1)
                throw new Error("Line numbers must be >= 1");
            if (O < 0)
                throw new Error("Column numbers must be >= 0");
            const C = [];
            return this._wasm.withMappingCallback(M => {
                let U = M.lastGeneratedColumn;
                this._computedColumnSpans && U === null && (U = 1 / 0),
                C.push({
                    line: M.generatedLine,
                    column: M.generatedColumn,
                    lastColumn: U
                })
            }
            , () => {
                this._wasm.exports.all_generated_locations_for(this._getMappingsPtr(), b, E - 1, "column"in S, O)
            }
            ),
            C
        }
        destroy() {
            this._mappingsPtr !== 0 && (this._wasm.exports.free_mappings(this._mappingsPtr),
            this._mappingsPtr = 0)
        }
        computeColumnSpans() {
            this._computedColumnSpans || (this._wasm.exports.compute_column_spans(this._getMappingsPtr()),
            this._computedColumnSpans = !0)
        }
        originalPositionFor(S) {
            const b = {
                generatedLine: u.getArg(S, "line"),
                generatedColumn: u.getArg(S, "column")
            };
            if (b.generatedLine < 1)
                throw new Error("Line numbers must be >= 1");
            if (b.generatedColumn < 0)
                throw new Error("Column numbers must be >= 0");
            let E = u.getArg(S, "bias", d.GREATEST_LOWER_BOUND);
            E == null && (E = d.GREATEST_LOWER_BOUND);
            let O;
            if (this._wasm.withMappingCallback(C => O = C, () => {
                this._wasm.exports.original_location_for(this._getMappingsPtr(), b.generatedLine - 1, b.generatedColumn, E)
            }
            ),
            O && O.generatedLine === b.generatedLine) {
                let C = u.getArg(O, "source", null);
                C !== null && (C = this._absoluteSources.at(C));
                let M = u.getArg(O, "name", null);
                return M !== null && (M = this._names.at(M)),
                {
                    source: C,
                    line: u.getArg(O, "originalLine", null),
                    column: u.getArg(O, "originalColumn", null),
                    name: M
                }
            }
            return {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(S) {
                return S == null
            }) : !1
        }
        sourceContentFor(S, b) {
            if (!this.sourcesContent)
                return null;
            const E = this._findSourceIndex(S);
            if (E >= 0)
                return this.sourcesContent[E];
            if (b)
                return null;
            throw new Error('"' + S + '" is not in the SourceMap.')
        }
        generatedPositionFor(S) {
            let b = u.getArg(S, "source");
            if (b = this._findSourceIndex(b),
            b < 0)
                return {
                    line: null,
                    column: null,
                    lastColumn: null
                };
            const E = {
                source: b,
                originalLine: u.getArg(S, "line"),
                originalColumn: u.getArg(S, "column")
            };
            if (E.originalLine < 1)
                throw new Error("Line numbers must be >= 1");
            if (E.originalColumn < 0)
                throw new Error("Column numbers must be >= 0");
            let O = u.getArg(S, "bias", d.GREATEST_LOWER_BOUND);
            O == null && (O = d.GREATEST_LOWER_BOUND);
            let C;
            if (this._wasm.withMappingCallback(M => C = M, () => {
                this._wasm.exports.generated_location_for(this._getMappingsPtr(), E.source, E.originalLine - 1, E.originalColumn, O)
            }
            ),
            C && C.source === E.source) {
                let M = C.lastGeneratedColumn;
                return this._computedColumnSpans && M === null && (M = 1 / 0),
                {
                    line: u.getArg(C, "generatedLine", null),
                    column: u.getArg(C, "generatedColumn", null),
                    lastColumn: M
                }
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
    }
    g.prototype.consumer = d,
    qa.BasicSourceMapConsumer = g;
    class m extends d {
        constructor(S, b) {
            return super(f).then(E => {
                let O = S;
                typeof S == "string" && (O = u.parseSourceMapInput(S));
                const C = u.getArg(O, "version")
                  , M = u.getArg(O, "sections");
                if (C != E._version)
                    throw new Error("Unsupported version: " + C);
                let U = {
                    line: -1,
                    column: 0
                };
                return Promise.all(M.map(V => {
                    if (V.url)
                        throw new Error("Support for url field in sections not implemented.");
                    const J = u.getArg(V, "offset")
                      , W = u.getArg(J, "line")
                      , oe = u.getArg(J, "column");
                    if (W < U.line || W === U.line && oe < U.column)
                        throw new Error("Section offsets must be ordered and non-overlapping.");
                    return U = J,
                    new d(u.getArg(V, "map"),b).then(pe => ({
                        generatedOffset: {
                            generatedLine: W + 1,
                            generatedColumn: oe + 1
                        },
                        consumer: pe
                    }))
                }
                )).then(V => (E._sections = V,
                E))
            }
            )
        }
        get sources() {
            const S = [];
            for (let b = 0; b < this._sections.length; b++)
                for (let E = 0; E < this._sections[b].consumer.sources.length; E++)
                    S.push(this._sections[b].consumer.sources[E]);
            return S
        }
        originalPositionFor(S) {
            const b = {
                generatedLine: u.getArg(S, "line"),
                generatedColumn: u.getArg(S, "column")
            }
              , E = a.search(b, this._sections, function(C, M) {
                const U = C.generatedLine - M.generatedOffset.generatedLine;
                return U || C.generatedColumn - (M.generatedOffset.generatedColumn - 1)
            })
              , O = this._sections[E];
            return O ? O.consumer.originalPositionFor({
                line: b.generatedLine - (O.generatedOffset.generatedLine - 1),
                column: b.generatedColumn - (O.generatedOffset.generatedLine === b.generatedLine ? O.generatedOffset.generatedColumn - 1 : 0),
                bias: S.bias
            }) : {
                source: null,
                line: null,
                column: null,
                name: null
            }
        }
        hasContentsOfAllSources() {
            return this._sections.every(function(S) {
                return S.consumer.hasContentsOfAllSources()
            })
        }
        sourceContentFor(S, b) {
            for (let E = 0; E < this._sections.length; E++) {
                const C = this._sections[E].consumer.sourceContentFor(S, !0);
                if (C)
                    return C
            }
            if (b)
                return null;
            throw new Error('"' + S + '" is not in the SourceMap.')
        }
        _findSectionIndex(S) {
            for (let b = 0; b < this._sections.length; b++) {
                const {consumer: E} = this._sections[b];
                if (E._findSourceIndex(S) !== -1)
                    return b
            }
            return -1
        }
        generatedPositionFor(S) {
            const b = this._findSectionIndex(u.getArg(S, "source"))
              , E = b >= 0 ? this._sections[b] : null
              , O = b >= 0 && b + 1 < this._sections.length ? this._sections[b + 1] : null
              , C = E && E.consumer.generatedPositionFor(S);
            if (C && C.line !== null) {
                const M = E.generatedOffset.generatedLine - 1
                  , U = E.generatedOffset.generatedColumn - 1;
                return C.line === 1 && (C.column += U,
                typeof C.lastColumn == "number" && (C.lastColumn += U)),
                C.lastColumn === 1 / 0 && O && C.line === O.generatedOffset.generatedLine && (C.lastColumn = O.generatedOffset.generatedColumn - 2),
                C.line += M,
                C
            }
            return {
                line: null,
                column: null,
                lastColumn: null
            }
        }
        allGeneratedPositionsFor(S) {
            const b = this._findSectionIndex(u.getArg(S, "source"))
              , E = b >= 0 ? this._sections[b] : null
              , O = b >= 0 && b + 1 < this._sections.length ? this._sections[b + 1] : null;
            return E ? E.consumer.allGeneratedPositionsFor(S).map(C => {
                const M = E.generatedOffset.generatedLine - 1
                  , U = E.generatedOffset.generatedColumn - 1;
                return C.line === 1 && (C.column += U,
                typeof C.lastColumn == "number" && (C.lastColumn += U)),
                C.lastColumn === 1 / 0 && O && C.line === O.generatedOffset.generatedLine && (C.lastColumn = O.generatedOffset.generatedColumn - 2),
                C.line += M,
                C
            }
            ) : []
        }
        eachMapping(S, b, E) {
            this._sections.forEach( (O, C) => {
                const M = C + 1 < this._sections.length ? this._sections[C + 1] : null
                  , {generatedOffset: U} = O
                  , V = U.generatedLine - 1
                  , J = U.generatedColumn - 1;
                O.consumer.eachMapping(function(W) {
                    W.generatedLine === 1 && (W.generatedColumn += J,
                    typeof W.lastGeneratedColumn == "number" && (W.lastGeneratedColumn += J)),
                    W.lastGeneratedColumn === 1 / 0 && M && W.generatedLine === M.generatedOffset.generatedLine && (W.lastGeneratedColumn = M.generatedOffset.generatedColumn - 2),
                    W.generatedLine += V,
                    S.call(this, W)
                }, b, E)
            }
            )
        }
        computeColumnSpans() {
            for (let S = 0; S < this._sections.length; S++)
                this._sections[S].consumer.computeColumnSpans()
        }
        destroy() {
            for (let S = 0; S < this._sections.length; S++)
                this._sections[S].consumer.destroy()
        }
    }
    qa.IndexedSourceMapConsumer = m;
    function p(v, S) {
        let b = v;
        typeof v == "string" && (b = u.parseSourceMapInput(v));
        const E = b.sections != null ? new m(b,S) : new g(b,S);
        return Promise.resolve(E)
    }
    function x(v, S) {
        return g.fromSourceMap(v, S)
    }
    return qa
}
var fo = {}, im;
function Ny() {
    if (im)
        return fo;
    im = 1;
    const u = rg().SourceMapGenerator
      , a = Mu()
      , r = /(\r?\n)/
      , o = 10
      , c = "$$$isSourceNode$$$";
    class f {
        constructor(g, m, p, x, v) {
            this.children = [],
            this.sourceContents = {},
            this.line = g ?? null,
            this.column = m ?? null,
            this.source = p ?? null,
            this.name = v ?? null,
            this[c] = !0,
            x != null && this.add(x)
        }
        static fromStringWithSourceMap(g, m, p) {
            const x = new f
              , v = g.split(r);
            let S = 0;
            const b = function() {
                const V = W()
                  , J = W() || "";
                return V + J;
                function W() {
                    return S < v.length ? v[S++] : void 0
                }
            };
            let E = 1, O = 0, C = null, M;
            return m.eachMapping(function(V) {
                if (C !== null)
                    if (E < V.generatedLine)
                        U(C, b()),
                        E++,
                        O = 0;
                    else {
                        M = v[S] || "";
                        const J = M.substr(0, V.generatedColumn - O);
                        v[S] = M.substr(V.generatedColumn - O),
                        O = V.generatedColumn,
                        U(C, J),
                        C = V;
                        return
                    }
                for (; E < V.generatedLine; )
                    x.add(b()),
                    E++;
                O < V.generatedColumn && (M = v[S] || "",
                x.add(M.substr(0, V.generatedColumn)),
                v[S] = M.substr(V.generatedColumn),
                O = V.generatedColumn),
                C = V
            }, this),
            S < v.length && (C && U(C, b()),
            x.add(v.splice(S).join(""))),
            m.sources.forEach(function(V) {
                const J = m.sourceContentFor(V);
                J != null && (p != null && (V = a.join(p, V)),
                x.setSourceContent(V, J))
            }),
            x;
            function U(V, J) {
                if (V === null || V.source === void 0)
                    x.add(J);
                else {
                    const W = p ? a.join(p, V.source) : V.source;
                    x.add(new f(V.originalLine,V.originalColumn,W,J,V.name))
                }
            }
        }
        add(g) {
            if (Array.isArray(g))
                g.forEach(function(m) {
                    this.add(m)
                }, this);
            else if (g[c] || typeof g == "string")
                g && this.children.push(g);
            else
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + g);
            return this
        }
        prepend(g) {
            if (Array.isArray(g))
                for (let m = g.length - 1; m >= 0; m--)
                    this.prepend(g[m]);
            else if (g[c] || typeof g == "string")
                this.children.unshift(g);
            else
                throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + g);
            return this
        }
        walk(g) {
            let m;
            for (let p = 0, x = this.children.length; p < x; p++)
                m = this.children[p],
                m[c] ? m.walk(g) : m !== "" && g(m, {
                    source: this.source,
                    line: this.line,
                    column: this.column,
                    name: this.name
                })
        }
        join(g) {
            let m, p;
            const x = this.children.length;
            if (x > 0) {
                for (m = [],
                p = 0; p < x - 1; p++)
                    m.push(this.children[p]),
                    m.push(g);
                m.push(this.children[p]),
                this.children = m
            }
            return this
        }
        replaceRight(g, m) {
            const p = this.children[this.children.length - 1];
            return p[c] ? p.replaceRight(g, m) : typeof p == "string" ? this.children[this.children.length - 1] = p.replace(g, m) : this.children.push("".replace(g, m)),
            this
        }
        setSourceContent(g, m) {
            this.sourceContents[a.toSetString(g)] = m
        }
        walkSourceContents(g) {
            for (let p = 0, x = this.children.length; p < x; p++)
                this.children[p][c] && this.children[p].walkSourceContents(g);
            const m = Object.keys(this.sourceContents);
            for (let p = 0, x = m.length; p < x; p++)
                g(a.fromSetString(m[p]), this.sourceContents[m[p]])
        }
        toString() {
            let g = "";
            return this.walk(function(m) {
                g += m
            }),
            g
        }
        toStringWithSourceMap(g) {
            const m = {
                code: "",
                line: 1,
                column: 0
            }
              , p = new u(g);
            let x = !1
              , v = null
              , S = null
              , b = null
              , E = null;
            return this.walk(function(O, C) {
                m.code += O,
                C.source !== null && C.line !== null && C.column !== null ? ((v !== C.source || S !== C.line || b !== C.column || E !== C.name) && p.addMapping({
                    source: C.source,
                    original: {
                        line: C.line,
                        column: C.column
                    },
                    generated: {
                        line: m.line,
                        column: m.column
                    },
                    name: C.name
                }),
                v = C.source,
                S = C.line,
                b = C.column,
                E = C.name,
                x = !0) : x && (p.addMapping({
                    generated: {
                        line: m.line,
                        column: m.column
                    }
                }),
                v = null,
                x = !1);
                for (let M = 0, U = O.length; M < U; M++)
                    O.charCodeAt(M) === o ? (m.line++,
                    m.column = 0,
                    M + 1 === U ? (v = null,
                    x = !1) : x && p.addMapping({
                        source: C.source,
                        original: {
                            line: C.line,
                            column: C.column
                        },
                        generated: {
                            line: m.line,
                            column: m.column
                        },
                        name: C.name
                    })) : m.column++
            }),
            this.walkSourceContents(function(O, C) {
                p.setSourceContent(O, C)
            }),
            {
                code: m.code,
                map: p
            }
        }
    }
    return fo.SourceNode = f,
    fo
}
var um;
function Ry() {
    return um || (um = 1,
    Ha.SourceMapGenerator = rg().SourceMapGenerator,
    Ha.SourceMapConsumer = Oy().SourceMapConsumer,
    Ha.SourceNode = Ny().SourceNode),
    Ha
}
var No = Ry();
function jy(u, a, r) {
    const o = u[a];
    if (!o)
        return {
            lineIndex: a,
            column: r
        };
    const c = o.trim()
      , f = /^<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(c)
      , d = /<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(c);
    let g = !1;
    if (r != null) {
        const m = o.substring(0, r);
        g = /<\/[A-Za-z][A-Za-z0-9\-_.]*\s*>$/.test(m)
    }
    if (f || d || g) {
        if (r != null) {
            const m = o.substring(r)
              , p = m.match(/<([A-Za-z][A-Za-z0-9\-_.]*)/);
            if (p && m[p.index + 1] !== "/")
                return {
                    lineIndex: a,
                    column: r + p.index + 1
                }
        }
        for (let m = a + 1; m < u.length && m < a + 50; m++) {
            const p = u[m]
              , x = p.match(/<([A-Za-z][A-Za-z0-9\-_.]*)/);
            if (x && p[x.index + 1] !== "/")
                return {
                    lineIndex: m,
                    column: x.index + 1
                }
        }
    }
    return {
        lineIndex: a,
        column: r
    }
}
function zo(u, a, r) {
    let o = 0;
    for (let c = a; c < u.length; c++) {
        const f = u[c]
          , d = c === a ? r : 0;
        for (let g = d; g < f.length; g++) {
            const m = f[g];
            if (m === "{")
                o++;
            else if (m === "}")
                o--;
            else if (o === 0) {
                if (m === "/" && f[g + 1] === ">")
                    return {
                        lineIndex: c,
                        columnEnd: g + 2,
                        isSelfClosing: !0
                    };
                if (m === ">")
                    return {
                        lineIndex: c,
                        columnEnd: g + 1,
                        isSelfClosing: !1
                    }
            }
        }
    }
}
function cg(u, a, r, o) {
    let c = 1;
    const f = new RegExp(`<${a}(?=\\s|>|/>)`,"g")
      , d = new RegExp(`</${a}\\s*>`,"g");
    for (let g = r; g < u.length; g++) {
        const m = g === r ? o : 0
          , p = u[g].substring(m)
          , x = [];
        let v;
        for (f.lastIndex = 0; (v = f.exec(p)) !== null; ) {
            const S = zo([p], 0, v.index + v[0].length);
            S && !S.isSelfClosing && x.push({
                type: "open",
                index: v.index,
                length: v[0].length
            })
        }
        for (d.lastIndex = 0; (v = d.exec(p)) !== null; )
            x.push({
                type: "close",
                index: v.index,
                length: v[0].length
            });
        x.sort( (S, b) => S.index - b.index);
        for (const S of x)
            if (S.type === "open")
                c++;
            else if (S.type === "close" && (c--,
            c === 0))
                return {
                    lineIndex: g,
                    columnEnd: m + S.index + S.length
                }
    }
}
function sm(u, a, r) {
    let o;
    for (let c = a; c >= 0; c--) {
        const f = u[c]
          , d = /<([A-Za-z][A-Za-z0-9\-_.]*)/g;
        let g;
        for (; (g = d.exec(f)) !== null; ) {
            const m = g.index
              , p = g[1];
            if (f[m + 1] === "/" || !(c < a || c === a && m <= (r ?? f.length)))
                continue;
            const v = m + g[0].length
              , S = zo(u, c, v);
            if (!S)
                continue;
            let b = c
              , E = S.columnEnd;
            if (!S.isSelfClosing) {
                const C = cg(u, p, c, S.columnEnd);
                if (!C)
                    continue;
                b = C.lineIndex,
                E = C.columnEnd
            }
            (c < a || c === a && m <= (r ?? f.length)) && (b > a || b === a && E >= (r ?? 0)) && (!o || b - c < o.closeLineIndex - o.lineIndex || b - c === o.closeLineIndex - o.lineIndex && E - m < o.closeColumnEnd - o.columnStart) && (o = {
                tagName: p,
                lineIndex: c,
                columnStart: m,
                columnEnd: S.columnEnd,
                isSelfClosing: S.isSelfClosing,
                closeLineIndex: b,
                closeColumnEnd: E
            })
        }
    }
    return o
}
function Dy(u, a, r) {
    const o = new RegExp(`<(${r})(?=\\s|>|/>)`,"i");
    for (let c = a + 1; c < u.length && c < a + 50; c++) {
        const f = u[c]
          , d = o.exec(f);
        if (d) {
            const g = d.index
              , m = d[1]
              , p = g + d[0].length
              , x = zo(u, c, p);
            if (!x)
                continue;
            let v = c
              , S = x.columnEnd;
            if (!x.isSelfClosing) {
                const b = cg(u, m, c, x.columnEnd);
                if (!b)
                    continue;
                v = b.lineIndex,
                S = b.columnEnd
            }
            return {
                tagName: m,
                lineIndex: c,
                columnStart: g,
                columnEnd: x.columnEnd,
                isSelfClosing: x.isSelfClosing,
                closeLineIndex: v,
                closeColumnEnd: S
            }
        }
    }
}
function My(u, a, r, o, c) {
    if (a === o)
        return u[a].substring(r, c);
    let f = u[a].substring(r);
    for (let d = a + 1; d < o; d++)
        f += `
` + u[d];
    return f += `
` + u[o].substring(0, c),
    f
}
function zy(u, a, r=10) {
    const o = u.split(`
`)
      , c = Math.max(0, a - r - 1)
      , f = Math.min(o.length - 1, a + r - 1)
      , d = [];
    for (let g = c; g <= f; g++) {
        const m = g + 1
          , v = `${m === a ? ">>>" : "   "} ${m.toString().padStart(4, " ")} | ${o[g] || ""}`;
        d.push(v)
    }
    return d.join(`
`)
}
async function Ly(u) {
    try {
        const a = await fetch(u);
        if (!a.ok)
            throw new Error(`Failed to load source map: ${a.status}`);
        return await a.json()
    } catch (a) {
        const r = a instanceof Error ? a.message : String(a);
        console.warn("Error loading source map from", u, r)
    }
}
let ho = !1;
const Ql = new Map
  , Uy = 300 * 1e3
  , By = 1e3;
setInterval( () => {
    const u = Date.now();
    for (const [a,r] of Ql.entries())
        u - r.timestamp > Uy && Ql.delete(a)
}
, 6e4);
async function Hy() {
    if (!ho)
        try {
            await No.SourceMapConsumer.initialize({
                "lib/mappings.wasm": "https://unpkg.com/source-map@0.7.6/lib/mappings.wasm"
            }),
            ho = !0
        } catch (u) {
            console.warn("Failed to initialize SourceMapConsumer:", u);
            try {
                await No.SourceMapConsumer.initialize({}),
                ho = !0
            } catch (a) {
                throw console.error("SourceMapConsumer initialization failed completely:", a),
                a
            }
        }
}
function qy(u) {
    if (!u || !u.stack)
        return `no-stack-${u?.message || "unknown"}`;
    const o = u.stack.split(`
`).slice(0, 6).map(c => c.replace(/\?t=\d+/g, "").replace(/\?v=[\w\d]+/g, "").replace(/\d{13,}/g, "TIMESTAMP"));
    return `${u.name || "Error"}-${u.message}-${o.join("|")}`
}
const Gy = "preview-inject/";
async function Xa(u, a=10, r) {
    if (!u || !u.stack)
        return {
            errorMessage: u?.message || "",
            mappedStack: u?.stack || "",
            sourceContext: []
        };
    const o = qy(u);
    if (Ql.has(o)) {
        const v = Ql.get(o);
        return console.log("Using cached error mapping for:", o),
        v
    }
    if (Ql.size >= By)
        return null;
    await Hy();
    const c = u.stack.split(`
`)
      , f = []
      , d = []
      , g = new Map
      , m = new Map;
    let p = 0;
    for (const v of c) {
        const S = v.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)|at\s+(.+?):(\d+):(\d+)|([^@]*)@(.+?):(\d+):(\d+)/);
        if (!S) {
            f.push(v);
            continue
        }
        let b, E, O, C;
        S[1] ? (b = S[1],
        E = S[2],
        O = parseInt(S[3]),
        C = parseInt(S[4])) : S[5] ? (b = "<anonymous>",
        E = S[5],
        O = parseInt(S[6]),
        C = parseInt(S[7])) : (b = S[8],
        E = S[9],
        O = parseInt(S[10]),
        C = parseInt(S[11]));
        try {
            const M = `${E}.map`;
            let U = g.get(M);
            if (!U) {
                const J = await Ly(M);
                U = await new No.SourceMapConsumer(J),
                g.set(M, U)
            }
            const V = U.originalPositionFor({
                line: O,
                column: C
            });
            if (V.source) {
                if (V.source.includes(Gy))
                    continue;
                const J = V.source.split("/").filter(P => P !== "..").join("/")
                  , oe = `    at ${V.name || b} (${J}:${V.line}:${V.column})`;
                if (f.push(oe),
                V.line && V.column && p < a) {
                    p++;
                    try {
                        const P = await Yy(U, V.source, m);
                        if (P) {
                            const pe = J.includes("node_modules")
                              , Ee = /\.(tsx|jsx)$/.test(J);
                            let Q;
                            if (!pe && Ee) {
                                const k = Vy(P, V.line, V.column, r);
                                k && (Q = {
                                    tagName: k.tagName,
                                    code: k.code,
                                    context: k.context,
                                    startLine: k.startLine,
                                    endLine: k.endLine
                                })
                            }
                            const Z = zy(P, V.line, pe ? 1 : 10);
                            d.push({
                                file: J,
                                line: V.line,
                                column: V.column,
                                context: Z,
                                closedBlock: Q
                            })
                        }
                    } catch (P) {
                        console.warn("Failed to extract source context:", P)
                    }
                }
            } else
                f.push(v)
        } catch (M) {
            console.warn("Failed to map stack line:", v, M),
            f.push(v)
        }
    }
    for (const v of g.values())
        v.destroy();
    const x = {
        errorMessage: u?.message || "",
        mappedStack: f.join(`
`),
        sourceContext: d
    };
    return x.timestamp = Date.now(),
    Ql.set(o, x),
    x
}
async function Yy(u, a, r) {
    if (r.has(a))
        return r.get(a) || null;
    const o = u.sourceContentFor(a);
    return o ? (r.set(a, o),
    o) : null
}
function Vy(u, a, r, o) {
    const c = u.split(`
`);
    let f = a - 1;
    if (f < 0 || f >= c.length)
        return;
    let d = sm(c, f, r);
    if (o && d) {
        const b = o.toLowerCase()
          , E = d.tagName.toLowerCase();
        if (b !== E) {
            const O = Dy(c, f, b);
            O && (d = O)
        }
    } else if (!d) {
        const b = jy(c, f, r);
        d = sm(c, b.lineIndex, b.column)
    }
    if (!d)
        return;
    const {tagName: g, lineIndex: m, columnStart: p, closeLineIndex: x, closeColumnEnd: v, isSelfClosing: S} = d;
    return {
        tagName: g,
        code: My(c, m, p, x, v),
        context: c.slice(m, x + 1).join(`
`),
        startLine: m + 1,
        endLine: x + 1,
        isSelfClosing: S
    }
}
class Qy {
    client;
    originalConsoleError;
    constructor() {
        const a = py();
        a.length > 0 && a.forEach(r => {
            r.type === "console.error" ? this.handleConsoleError(r.args) : r.type === "runtime" && this.handleError(r.args)
        }
        ),
        this.client = new Wa(window.parent),
        this.originalConsoleError = console.error,
        this.initErrorHandlers()
    }
    initErrorHandlers() {
        window.addEventListener("error", this.handleError.bind(this)),
        window.addEventListener("unhandledrejection", this.handlePromiseRejection.bind(this)),
        this.interceptConsoleError()
    }
    async handleError(a) {
        const r = a.target;
        if (!(r && r instanceof HTMLElement && r.tagName && ["IMG", "SCRIPT", "LINK", "VIDEO", "AUDIO", "SOURCE", "IFRAME"].includes(r.tagName)) && a.error && a.error.stack)
            try {
                const o = await Xa(a.error);
                this.sendError(o)
            } catch (o) {
                console.warn("Failed to map error stack:", o)
            }
    }
    async handlePromiseRejection(a) {
        const r = a.reason instanceof Error ? a.reason : new Error(String(a.reason));
        if (r.stack)
            try {
                const o = await Xa(r);
                this.sendError(o)
            } catch (o) {
                console.warn("Failed to map promise rejection stack:", o)
            }
    }
    interceptConsoleError() {
        console.error = (...a) => {
            this.originalConsoleError.apply(console, a);
            const r = a.find(o => o instanceof Error);
            if (r && r.stack)
                this.handleConsoleError(r);
            else if (a.length > 0) {
                const o = a.map(f => typeof f == "object" ? JSON.stringify(f) : String(f)).join(" ")
                  , c = new Error(o);
                this.handleConsoleError(c)
            }
        }
    }
    async handleConsoleError(a) {
        try {
            const r = await Xa(a);
            this.sendError(r)
        } catch (r) {
            console.warn("Failed to map console error stack:", r)
        }
    }
    reportError(a) {
        this.handleReactError(a)
    }
    async handleReactError(a) {
        try {
            const r = await Xa(a);
            this.sendError(r)
        } catch (r) {
            console.warn("Failed to map React error stack:", r)
        }
    }
    async sendError(a) {
        if (!a) {
            console.warn("error is too many");
            return
        }
        if (a.sourceContext.length !== 0)
            try {
                await this.client.post("runtime-error", a)
            } catch (r) {
                console.warn("Failed to send error to parent:", r)
            }
    }
    destroy() {
        console.error = this.originalConsoleError,
        this.client.destroy()
    }
}
function Xy() {
    const u = new Qy;
    return window.runtimeErrorCollector = u,
    u
}
class Zy {
    _client;
    constructor() {
        this._client = new Wa(window.parent),
        this._domContentLoadedListener()
    }
    _domContentLoadedListener() {
        const a = () => {
            console.log("DOMContentLoaded"),
            this._client.post("DOMContentLoaded"),
            document.removeEventListener("DOMContentLoaded", a)
        }
        ;
        document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", a) : (console.log("DOMContentLoaded"),
        this._client.post("DOMContentLoaded"))
    }
}
function Ky() {
    return new Zy
}
const Lo = u => {
    const a = "/preview/d7177cda-ec58-4f2d-84ad-73be4cf0779d/6502543";
    return u.startsWith(a) ? u.replaceAll(a, "") || "/" : u || "/"
}
  , ky = "modulepreload"
  , Jy = function(u) {
    return "/preview/d7177cda-ec58-4f2d-84ad-73be4cf0779d/6502543/" + u
}
  , rm = {}
  , fg = function(a, r, o) {
    let c = Promise.resolve();
    if (r && r.length > 0) {
        let p = function(x) {
            return Promise.all(x.map(v => Promise.resolve(v).then(S => ({
                status: "fulfilled",
                value: S
            }), S => ({
                status: "rejected",
                reason: S
            }))))
        };
        var d = p;
        document.getElementsByTagName("link");
        const g = document.querySelector("meta[property=csp-nonce]")
          , m = g?.nonce || g?.getAttribute("nonce");
        c = p(r.map(x => {
            if (x = Jy(x),
            x in rm)
                return;
            rm[x] = !0;
            const v = x.endsWith(".css")
              , S = v ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${x}"]${S}`))
                return;
            const b = document.createElement("link");
            if (b.rel = v ? "stylesheet" : ky,
            v || (b.as = "script"),
            b.crossOrigin = "",
            b.href = x,
            m && b.setAttribute("nonce", m),
            document.head.appendChild(b),
            v)
                return new Promise( (E, O) => {
                    b.addEventListener("load", E),
                    b.addEventListener("error", () => O(new Error(`Unable to preload CSS for ${x}`)))
                }
                )
        }
        ))
    }
    function f(g) {
        const m = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (m.payload = g,
        window.dispatchEvent(m),
        !m.defaultPrevented)
            throw g
    }
    return c.then(g => {
        for (const m of g || [])
            m.status === "rejected" && f(m.reason);
        return a().catch(f)
    }
    )
};
async function $y() {
    await await fg( () => Promise.resolve().then( () => J1), []).then(a => a.navigatePromise).catch(a => (console.error(a),
    Promise.resolve( () => {}
    ))),
    window.REACT_APP_ROUTER = {
        push: (a, r) => {
            window.REACT_APP_NAVIGATE(a, r)
        }
        ,
        replace: (a, r, o) => {
            window.REACT_APP_NAVIGATE(a, {
                replace: !0,
                ...o
            })
        }
        ,
        forward: () => {
            window.REACT_APP_NAVIGATE(1)
        }
        ,
        back: () => {
            window.REACT_APP_NAVIGATE(-1)
        }
        ,
        refresh: () => {
            window.REACT_APP_NAVIGATE(0)
        }
        ,
        prefetch: (a, r) => {
            window.REACT_APP_NAVIGATE(a, r)
        }
    }
}
const dg = new Promise(u => {
    $y().then( () => {
        u(window.REACT_APP_ROUTER)
    }
    )
}
)
  , Uo = () => window.REACT_APP_ROUTER
  , hg = new Wa(window.parent)
  , Ro = async (u, a) => {
    await hg.post("routeWillChange", {
        next: Lo(u)
    }, a)
}
;
function Fy(u) {
    const a = document.querySelector(u);
    a && a.scrollIntoView({
        behavior: "smooth"
    })
}
function Wy() {
    const u = window.open;
    return window.open = function(a, r, o) {
        return a && typeof a == "string" && a.startsWith("#") ? (Fy(a),
        null) : (u(a, "_blank", o),
        null)
    }
    ,
    () => {
        window.open = u
    }
}
function Py() {
    const u = async a => {
        const o = a.target.closest("a");
        if (!o || o.tagName !== "A")
            return;
        const c = o.getAttribute("href");
        if (c && !["#", "javascript:void(0)", ""].includes(c) && !c.startsWith("#")) {
            if (a.preventDefault(),
            c.startsWith("/")) {
                const f = Uo();
                await Ro(c, {
                    timeout: 500
                });
                const d = Lo(c);
                f.push(d);
                return
            }
            window.open(o.href, "_blank")
        }
    }
    ;
    return window.addEventListener("click", u, !0),
    () => {
        window.removeEventListener("click", u, !0)
    }
}
const om = u => u.startsWith("http://") || u.startsWith("https://");
function Iy() {
    const u = () => {
        const a = Uo()
          , r = a.push;
        a.push = async function(c, f, d) {
            return om(c) ? (window.open(c, "_blank"),
            Promise.resolve(!1)) : (await Ro(c, {
                timeout: 500
            }),
            r.call(this, c, f, d))
        }
        ;
        const o = a.replace;
        a.replace = async function(c, f, d) {
            return om(c) ? (window.open(c, "_blank"),
            Promise.resolve(!1)) : (await Ro(c, {
                timeout: 500
            }),
            o.call(this, c, f, d))
        }
    }
    ;
    return window.addEventListener("load", u),
    () => {
        window.removeEventListener("load", u)
    }
}
async function ev() {
    await dg;
    const u = Wy()
      , a = Py()
      , r = Iy();
    return () => {
        hg.destroy(),
        u(),
        a(),
        r()
    }
}
async function tv() {
    const u = await fg( () => Promise.resolve().then( () => K1), void 0).then(f => f.default).catch(f => []);
    let a = []
      , r = 0;
    function o(f, d) {
        const {path: g="", children: m, index: p} = f;
        r++;
        const x = p === !0 || g === ""
          , v = g && g[0] === "/"
          , S = x ? d.path : `${d.path}/${g}`
          , b = v && !x ? g : S
          , E = {
            id: r,
            parentId: d.id,
            path: "/" + b.split("/").filter(Boolean).join("/")
        };
        /\*/.test(E.path) || a.push(E),
        m && m.forEach(O => o(O, E))
    }
    u.forEach(f => o(f, {
        id: 0,
        path: ""
    }));
    const c = new Set;
    return a = a.filter(f => c.has(f.path) ? !1 : (c.add(f.path),
    !0)),
    a
}
async function nv() {
    const u = new Wa(window.parent)
      , a = await tv();
    window.REACT_APP_ROUTES = a,
    u.post("routes", {
        routes: a
    }),
    u.on("getRouteInfo", async v => a),
    await dg,
    u.on("routeAction", async v => {
        const S = Uo()
          , {action: b, route: E} = v;
        switch (b) {
        case "goForward":
            S.forward();
            break;
        case "goBack":
            S.back();
            break;
        case "refresh":
            S.refresh();
            break;
        case "goTo":
            E && S.push(E);
            break;
        default:
            console.warn("Unknown action:", b)
        }
    }
    );
    function r() {
        const v = window.history.state?.index ?? 0
          , S = window.history.length > v + 1
          , b = v > 0
          , E = window.location.pathname;
        u.post("updateNavigationState", {
            canGoForward: S,
            canGoBack: b,
            currentRoute: Lo(E)
        })
    }
    function o() {
        const v = new MutationObserver(b => {
            b.forEach(E => {
                (E.type === "childList" || E.type === "characterData") && u.post("titleChanged", {
                    title: document.title
                })
            }
            )
        }
        )
          , S = document.querySelector("title");
        return u.post("titleChanged", {
            title: document.title
        }),
        S && v.observe(S, {
            childList: !0,
            characterData: !0,
            subtree: !0
        }),
        v
    }
    let c = o();
    function f() {
        c.disconnect(),
        setTimeout( () => {
            c = o()
        }
        , 100)
    }
    const d = window.history.pushState
      , g = window.history.replaceState
      , m = window.history.go
      , p = window.history.back
      , x = window.history.forward;
    return window.history.pushState = function(v, S, b) {
        d.apply(this, arguments),
        r(),
        f()
    }
    ,
    window.history.replaceState = function(v, S, b) {
        g.apply(this, arguments),
        r(),
        f()
    }
    ,
    window.history.go = function(v) {
        m.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    window.history.back = function() {
        p.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    window.history.forward = function() {
        x.apply(this, arguments),
        setTimeout( () => {
            r(),
            f()
        }
        , 100)
    }
    ,
    {
        destroy: () => {
            u.destroy(),
            c.disconnect()
        }
    }
}
var mo = {
    exports: {}
}
  , ie = {};
var cm;
function lv() {
    if (cm)
        return ie;
    cm = 1;
    var u = Symbol.for("react.transitional.element")
      , a = Symbol.for("react.portal")
      , r = Symbol.for("react.fragment")
      , o = Symbol.for("react.strict_mode")
      , c = Symbol.for("react.profiler")
      , f = Symbol.for("react.consumer")
      , d = Symbol.for("react.context")
      , g = Symbol.for("react.forward_ref")
      , m = Symbol.for("react.suspense")
      , p = Symbol.for("react.memo")
      , x = Symbol.for("react.lazy")
      , v = Symbol.for("react.activity")
      , S = Symbol.iterator;
    function b(A) {
        return A === null || typeof A != "object" ? null : (A = S && A[S] || A["@@iterator"],
        typeof A == "function" ? A : null)
    }
    var E = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    }
      , O = Object.assign
      , C = {};
    function M(A, q, K) {
        this.props = A,
        this.context = q,
        this.refs = C,
        this.updater = K || E
    }
    M.prototype.isReactComponent = {},
    M.prototype.setState = function(A, q) {
        if (typeof A != "object" && typeof A != "function" && A != null)
            throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, A, q, "setState")
    }
    ,
    M.prototype.forceUpdate = function(A) {
        this.updater.enqueueForceUpdate(this, A, "forceUpdate")
    }
    ;
    function U() {}
    U.prototype = M.prototype;
    function V(A, q, K) {
        this.props = A,
        this.context = q,
        this.refs = C,
        this.updater = K || E
    }
    var J = V.prototype = new U;
    J.constructor = V,
    O(J, M.prototype),
    J.isPureReactComponent = !0;
    var W = Array.isArray;
    function oe() {}
    var P = {
        H: null,
        A: null,
        T: null,
        S: null
    }
      , pe = Object.prototype.hasOwnProperty;
    function Ee(A, q, K) {
        var $ = K.ref;
        return {
            $$typeof: u,
            type: A,
            key: q,
            ref: $ !== void 0 ? $ : null,
            props: K
        }
    }
    function Q(A, q) {
        return Ee(A.type, q, A.props)
    }
    function Z(A) {
        return typeof A == "object" && A !== null && A.$$typeof === u
    }
    function k(A) {
        var q = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + A.replace(/[=:]/g, function(K) {
            return q[K]
        })
    }
    var le = /\/+/g;
    function ce(A, q) {
        return typeof A == "object" && A !== null && A.key != null ? k("" + A.key) : q.toString(36)
    }
    function Ce(A) {
        switch (A.status) {
        case "fulfilled":
            return A.value;
        case "rejected":
            throw A.reason;
        default:
            switch (typeof A.status == "string" ? A.then(oe, oe) : (A.status = "pending",
            A.then(function(q) {
                A.status === "pending" && (A.status = "fulfilled",
                A.value = q)
            }, function(q) {
                A.status === "pending" && (A.status = "rejected",
                A.reason = q)
            })),
            A.status) {
            case "fulfilled":
                return A.value;
            case "rejected":
                throw A.reason
            }
        }
        throw A
    }
    function L(A, q, K, $, ue) {
        var fe = typeof A;
        (fe === "undefined" || fe === "boolean") && (A = null);
        var _e = !1;
        if (A === null)
            _e = !0;
        else
            switch (fe) {
            case "bigint":
            case "string":
            case "number":
                _e = !0;
                break;
            case "object":
                switch (A.$$typeof) {
                case u:
                case a:
                    _e = !0;
                    break;
                case x:
                    return _e = A._init,
                    L(_e(A._payload), q, K, $, ue)
                }
            }
        if (_e)
            return ue = ue(A),
            _e = $ === "" ? "." + ce(A, 0) : $,
            W(ue) ? (K = "",
            _e != null && (K = _e.replace(le, "$&/") + "/"),
            L(ue, q, K, "", function(Zl) {
                return Zl
            })) : ue != null && (Z(ue) && (ue = Q(ue, K + (ue.key == null || A && A.key === ue.key ? "" : ("" + ue.key).replace(le, "$&/") + "/") + _e)),
            q.push(ue)),
            1;
        _e = 0;
        var nt = $ === "" ? "." : $ + ":";
        if (W(A))
            for (var Be = 0; Be < A.length; Be++)
                $ = A[Be],
                fe = nt + ce($, Be),
                _e += L($, q, K, fe, ue);
        else if (Be = b(A),
        typeof Be == "function")
            for (A = Be.call(A),
            Be = 0; !($ = A.next()).done; )
                $ = $.value,
                fe = nt + ce($, Be++),
                _e += L($, q, K, fe, ue);
        else if (fe === "object") {
            if (typeof A.then == "function")
                return L(Ce(A), q, K, $, ue);
            throw q = String(A),
            Error("Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead.")
        }
        return _e
    }
    function X(A, q, K) {
        if (A == null)
            return A;
        var $ = []
          , ue = 0;
        return L(A, $, "", "", function(fe) {
            return q.call(K, fe, ue++)
        }),
        $
    }
    function te(A) {
        if (A._status === -1) {
            var q = A._result;
            q = q(),
            q.then(function(K) {
                (A._status === 0 || A._status === -1) && (A._status = 1,
                A._result = K)
            }, function(K) {
                (A._status === 0 || A._status === -1) && (A._status = 2,
                A._result = K)
            }),
            A._status === -1 && (A._status = 0,
            A._result = q)
        }
        if (A._status === 1)
            return A._result.default;
        throw A._result
    }
    var ve = typeof reportError == "function" ? reportError : function(A) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var q = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof A == "object" && A !== null && typeof A.message == "string" ? String(A.message) : String(A),
                error: A
            });
            if (!window.dispatchEvent(q))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", A);
            return
        }
        console.error(A)
    }
      , we = {
        map: X,
        forEach: function(A, q, K) {
            X(A, function() {
                q.apply(this, arguments)
            }, K)
        },
        count: function(A) {
            var q = 0;
            return X(A, function() {
                q++
            }),
            q
        },
        toArray: function(A) {
            return X(A, function(q) {
                return q
            }) || []
        },
        only: function(A) {
            if (!Z(A))
                throw Error("React.Children.only expected to receive a single React element child.");
            return A
        }
    };
    return ie.Activity = v,
    ie.Children = we,
    ie.Component = M,
    ie.Fragment = r,
    ie.Profiler = c,
    ie.PureComponent = V,
    ie.StrictMode = o,
    ie.Suspense = m,
    ie.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P,
    ie.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(A) {
            return P.H.useMemoCache(A)
        }
    },
    ie.cache = function(A) {
        return function() {
            return A.apply(null, arguments)
        }
    }
    ,
    ie.cacheSignal = function() {
        return null
    }
    ,
    ie.cloneElement = function(A, q, K) {
        if (A == null)
            throw Error("The argument must be a React element, but you passed " + A + ".");
        var $ = O({}, A.props)
          , ue = A.key;
        if (q != null)
            for (fe in q.key !== void 0 && (ue = "" + q.key),
            q)
                !pe.call(q, fe) || fe === "key" || fe === "__self" || fe === "__source" || fe === "ref" && q.ref === void 0 || ($[fe] = q[fe]);
        var fe = arguments.length - 2;
        if (fe === 1)
            $.children = K;
        else if (1 < fe) {
            for (var _e = Array(fe), nt = 0; nt < fe; nt++)
                _e[nt] = arguments[nt + 2];
            $.children = _e
        }
        return Ee(A.type, ue, $)
    }
    ,
    ie.createContext = function(A) {
        return A = {
            $$typeof: d,
            _currentValue: A,
            _currentValue2: A,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        },
        A.Provider = A,
        A.Consumer = {
            $$typeof: f,
            _context: A
        },
        A
    }
    ,
    ie.createElement = function(A, q, K) {
        var $, ue = {}, fe = null;
        if (q != null)
            for ($ in q.key !== void 0 && (fe = "" + q.key),
            q)
                pe.call(q, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (ue[$] = q[$]);
        var _e = arguments.length - 2;
        if (_e === 1)
            ue.children = K;
        else if (1 < _e) {
            for (var nt = Array(_e), Be = 0; Be < _e; Be++)
                nt[Be] = arguments[Be + 2];
            ue.children = nt
        }
        if (A && A.defaultProps)
            for ($ in _e = A.defaultProps,
            _e)
                ue[$] === void 0 && (ue[$] = _e[$]);
        return Ee(A, fe, ue)
    }
    ,
    ie.createRef = function() {
        return {
            current: null
        }
    }
    ,
    ie.forwardRef = function(A) {
        return {
            $$typeof: g,
            render: A
        }
    }
    ,
    ie.isValidElement = Z,
    ie.lazy = function(A) {
        return {
            $$typeof: x,
            _payload: {
                _status: -1,
                _result: A
            },
            _init: te
        }
    }
    ,
    ie.memo = function(A, q) {
        return {
            $$typeof: p,
            type: A,
            compare: q === void 0 ? null : q
        }
    }
    ,
    ie.startTransition = function(A) {
        var q = P.T
          , K = {};
        P.T = K;
        try {
            var $ = A()
              , ue = P.S;
            ue !== null && ue(K, $),
            typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(oe, ve)
        } catch (fe) {
            ve(fe)
        } finally {
            q !== null && K.types !== null && (q.types = K.types),
            P.T = q
        }
    }
    ,
    ie.unstable_useCacheRefresh = function() {
        return P.H.useCacheRefresh()
    }
    ,
    ie.use = function(A) {
        return P.H.use(A)
    }
    ,
    ie.useActionState = function(A, q, K) {
        return P.H.useActionState(A, q, K)
    }
    ,
    ie.useCallback = function(A, q) {
        return P.H.useCallback(A, q)
    }
    ,
    ie.useContext = function(A) {
        return P.H.useContext(A)
    }
    ,
    ie.useDebugValue = function() {}
    ,
    ie.useDeferredValue = function(A, q) {
        return P.H.useDeferredValue(A, q)
    }
    ,
    ie.useEffect = function(A, q) {
        return P.H.useEffect(A, q)
    }
    ,
    ie.useEffectEvent = function(A) {
        return P.H.useEffectEvent(A)
    }
    ,
    ie.useId = function() {
        return P.H.useId()
    }
    ,
    ie.useImperativeHandle = function(A, q, K) {
        return P.H.useImperativeHandle(A, q, K)
    }
    ,
    ie.useInsertionEffect = function(A, q) {
        return P.H.useInsertionEffect(A, q)
    }
    ,
    ie.useLayoutEffect = function(A, q) {
        return P.H.useLayoutEffect(A, q)
    }
    ,
    ie.useMemo = function(A, q) {
        return P.H.useMemo(A, q)
    }
    ,
    ie.useOptimistic = function(A, q) {
        return P.H.useOptimistic(A, q)
    }
    ,
    ie.useReducer = function(A, q, K) {
        return P.H.useReducer(A, q, K)
    }
    ,
    ie.useRef = function(A) {
        return P.H.useRef(A)
    }
    ,
    ie.useState = function(A) {
        return P.H.useState(A)
    }
    ,
    ie.useSyncExternalStore = function(A, q, K) {
        return P.H.useSyncExternalStore(A, q, K)
    }
    ,
    ie.useTransition = function() {
        return P.H.useTransition()
    }
    ,
    ie.version = "19.2.4",
    ie
}
var fm;
function Bo() {
    return fm || (fm = 1,
    mo.exports = lv()),
    mo.exports
}
var H = Bo();
const dm = vy(H);
var go = {
    exports: {}
}
  , Ga = {};
var hm;
function av() {
    if (hm)
        return Ga;
    hm = 1;
    var u = Symbol.for("react.transitional.element")
      , a = Symbol.for("react.fragment");
    function r(o, c, f) {
        var d = null;
        if (f !== void 0 && (d = "" + f),
        c.key !== void 0 && (d = "" + c.key),
        "key"in c) {
            f = {};
            for (var g in c)
                g !== "key" && (f[g] = c[g])
        } else
            f = c;
        return c = f.ref,
        {
            $$typeof: u,
            type: o,
            key: d,
            ref: c !== void 0 ? c : null,
            props: f
        }
    }
    return Ga.Fragment = a,
    Ga.jsx = r,
    Ga.jsxs = r,
    Ga
}
var mm;
function iv() {
    return mm || (mm = 1,
    go.exports = av()),
    go.exports
}
var w = iv()
  , po = {
    exports: {}
}
  , Su = {};
var gm;
function uv() {
    if (gm)
        return Su;
    gm = 1;
    var u = Symbol.for("react.fragment");
    return Su.Fragment = u,
    Su.jsxDEV = void 0,
    Su
}
var pm;
function sv() {
    return pm || (pm = 1,
    po.exports = uv()),
    po.exports
}
var ym = sv();
class mg {
    static getFiberFromDOMNode(a) {
        if (!a)
            return null;
        const r = Object.keys(a).find(o => o.startsWith("__reactFiber$") || o.startsWith("__reactInternalInstance$"));
        return r ? a[r] : null
    }
}
const gg = new WeakMap
  , pg = new WeakMap
  , vm = new WeakMap
  , yo = new WeakMap
  , xm = new WeakMap
  , bm = new WeakMap
  , vo = (u, a) => {
    try {
        pg.set(u, a);
        const r = mg.getFiberFromDOMNode(u);
        r && gg.set(r, a)
    } catch {}
}
  , Eu = (u, a) => {
    if (!u)
        return r => {
            r instanceof HTMLElement && vo(r, a)
        }
        ;
    if (typeof u == "function") {
        let r = yo.get(u);
        r || (r = [],
        yo.set(u, r)),
        r.push(a);
        let o = vm.get(u);
        return o || (o = c => {
            if (c instanceof HTMLElement) {
                const f = yo.get(u);
                if (f && f.length > 0) {
                    const d = f.shift();
                    vo(c, d)
                }
            }
            u(c)
        }
        ,
        vm.set(u, o)),
        o
    }
    if (u && typeof u == "object" && "current"in u) {
        bm.set(u, a);
        let r = xm.get(u);
        return r || (r = o => {
            if (o instanceof HTMLElement) {
                const c = bm.get(u);
                c && vo(o, c)
            }
            u.current = o
        }
        ,
        xm.set(u, r)),
        r
    }
}
;
function rv() {
    const u = dm.createElement
      , a = w.jsx
      , r = w.jsxs
      , o = ym.jsxDEV
      , c = () => {
        const d = new Error;
        return () => d
    }
      , f = d => typeof d == "string";
    dm.createElement = function(d, g, ...m) {
        if (!f(d) && typeof d != "function")
            return u(d, g, ...m);
        const p = c()
          , x = g ? {
            ...g
        } : {}
          , v = Eu(x.ref, p);
        return v && (x.ref = v),
        u(d, x, ...m)
    }
    ,
    w.jsx = function(d, g, m) {
        if (!f(d) && typeof d != "function")
            return a(d, g, m);
        const p = c()
          , x = g ? {
            ...g
        } : {}
          , v = Eu(x.ref, p);
        return v && (x.ref = v),
        a(d, x, m)
    }
    ,
    w.jsxs = function(d, g, m) {
        if (!f(d) && typeof d != "function")
            return r(d, g, m);
        const p = c()
          , x = g ? {
            ...g
        } : {}
          , v = Eu(x.ref, p);
        return v && (x.ref = v),
        r(d, x, m)
    }
    ,
    o && (ym.jsxDEV = function(d, g, m, p, x, v) {
        if (!f(d) && typeof d != "function")
            return o(d, g, m, p, x, v);
        const S = c()
          , b = g ? {
            ...g
        } : {}
          , E = Eu(b.ref, S);
        return E && (b.ref = E),
        o(d, b, m, p, x, v)
    }
    )
}
function ov(u) {
    const a = document.querySelector(u);
    if (!a)
        return null;
    const r = a.tagName.toLowerCase()
      , o = pg.get(a);
    if (o)
        return {
            element: a,
            tagName: r,
            debugError: o()
        };
    const c = mg.getFiberFromDOMNode(a);
    if (c) {
        const f = gg.get(c);
        if (f)
            return {
                element: a,
                tagName: r,
                debugError: f()
            }
    }
    return null
}
rv();
function cv() {
    const u = new WeakMap
      , a = new Wa(window.parent);
    return a.on("get-element-source", async ({selector: r}) => {
        const o = ov(r);
        if (!o)
            return null;
        const {element: c, tagName: f, debugError: d} = o;
        if (u.has(c))
            return u.get(c);
        const g = await Xa(d, 10, f);
        if (!g)
            return null;
        const p = {
            ...g.sourceContext.filter(x => !x.file.includes("node_modules"))[0],
            domInfo: {
                tagName: c.tagName,
                textContent: c.textContent.slice(0, 300)
            }
        };
        return u.set(c, p),
        p
    }
    ),
    () => {
        a.destroy()
    }
}
const fv = !0;
console.log("Is preview build:", fv);
async function dv() {
    Xy(),
    ev(),
    Ky(),
    nv(),
    cv()
}
dv();
const hv = "phc_V7JMHB0fVJGRu8UHyrsj6pSL1BS76P5zD8qCi7lrTTV"
  , Je = {
    colors: {
        text: "#5D5D5D",
        white: "#FFFFFF",
        border: "rgba(0, 10, 36, 0.08)"
    },
    font: {
        family: '"Geist"',
        weight: "600",
        size: {
            normal: "14px",
            button: "18px"
        },
        lineHeight: "20px"
    },
    button: {
        gradient: "linear-gradient(180deg, #A797FF 0%, #7057FF 100%)"
    },
    shadow: "0px 8px 12px 0px rgba(9, 10, 20, 0.06)",
    zIndex: `${Number.MAX_SAFE_INTEGER}`
}
  , Sm = {
    close: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2D303D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>')}`,
    generate: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.87 4.94c.227-.71 1.21-.723 1.456-.02l1.177 3.378 3.101 1.013c.708.231.714 1.216.01 1.455l-3.183 1.082-1.105 3.17c-.245.704-1.23.69-1.455-.02l-.989-3.107-3.367-1.203c-.702-.25-.68-1.234.04-1.455l3.282-1.016 1.043-3.277Z" fill="#FFF"/><path fill-rule="evenodd" d="M12.238 1.3c.167-.667 1.1-.667 1.266 0l.388 1.551 1.55.388c.666.166.667 1.1 0 1.266l-1.55.388-.388 1.55c-.167.666-1.1.667-1.266 0l-.388-1.55-1.55-.388c-.667-.166-.667-1.1 0-1.266l1.55-.388.388-1.551Z" fill="#FFF"/></svg>')}`
}
//   , Za = {
//     readdyLogo: "https://public.readdy.ai/gen_page/readdy-logo.png",
//     watermarkLogo: "https://public.readdy.ai/gen_page/watermark.png",
//     readdyLink: "https://readdy.ai?ref=b",
//     fontStylesheet: "https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap",
//     posthogCDN: "https://cdn.jsdelivr.net/npm/posthog-js@1.96.1/dist/array.full.min.js"
// }
  , Em = {
    en: {
        prefix: "This Website is Made with",
        suffix: ". You can also get one like this in minutes",
        button: "Get one for FREE"
    },
    zh: {
        prefix: "本网站来自",
        suffix: "你也可以在几分钟内拥有同样的页面",
        button: "立即免费拥有"
    }
}
  , mv = () => navigator.language?.toLowerCase().startsWith("zh") ?? !1
  , xo = () => mv() ? Em.zh : Em.en
  , gv = () => window.innerWidth > 768 && !("ontouchstart"in window)
  , pv = () => {
//     const u = window.location.hostname;
//     return ["readdy.ai", "dev.readdy.ai", "localhost"].some(r => u === r || u.endsWith(`.${r}`))
// }
;
function yv() {
    if (window.posthog)
        return;
    const u = document.createElement("script");
    u.src = Za.posthogCDN,
    u.async = !0,
    u.onload = () => {
        window.posthog?.init(hv, {
            api_host: "https://us.i.posthog.com",
            autocapture: !1,
            capture_pageview: !1,
            capture_pageleave: !1,
            disable_session_recording: !0,
            disable_scroll_properties: !0,
            capture_performance: {
                web_vitals: !1
            },
            rageclick: !1,
            loaded: function(a) {
                a.sessionRecording && a.sessionRecording.stopRecording()
            }
        })
    }
    ,
    document.head.appendChild(u)
}
function wm(u, a) {
    window.posthog?.capture(u, {
        ...a,
        version: 2
    })
}
function Gt(u, a) {
    Object.assign(u.style, a)
}
function bo(u, a="0") {
    Gt(u, {
        color: Je.colors.text,
        fontFamily: Je.font.family,
        fontSize: Je.font.size.normal,
        lineHeight: Je.font.lineHeight,
        fontWeight: Je.font.weight,
        whiteSpace: "nowrap",
        marginRight: a
    })
}
function wu(u, a="row") {
    Gt(u, {
        display: "flex",
        flexDirection: a,
        alignItems: "center",
        justifyContent: "center"
    })
}
function vv() {
    if (pv())
        return;
    const u = "https://readdy.ai/api/public/user/is_free"
      , a = "d7177cda-ec58-4f2d-84ad-73be4cf0779d";
    async function r(b) {
        try {
            return !(await (await fetch(`${u}?projectId=${b}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })).json()).data.is_free
        } catch {
            return !0
        }
    }
    function o() {
        document.querySelector('link[rel="icon"]')?.remove();
        const b = document.createElement("link");
        b.type = "image/png",
        b.rel = "icon",
        b.href = Za.readdyLogo,
        document.head.appendChild(b);
        const E = document.createElement("link");
        E.rel = "stylesheet",
        E.href = Za.fontStylesheet,
        document.head.appendChild(E)
    }
    function c(b) {
        wm(b),
        window.open(Za.readdyLink, "_blank")
    }
    function f() {
        const b = document.createElement("div");
        b.id = "close-button",
        Gt(b, {
            position: "absolute",
            top: "-12px",
            right: "-12px",
            width: "32px",
            height: "32px",
            backgroundColor: Je.colors.white,
            borderRadius: "50%",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: Je.colors.border,
            cursor: "pointer",
            boxShadow: Je.shadow
        }),
        wu(b);
        const E = document.createElement("img");
        return E.src = Sm.close,
        Gt(E, {
            width: "24px",
            height: "24px"
        }),
        b.appendChild(E),
        b.addEventListener("click", O => {
            O.stopPropagation(),
            wm("watermark_close_button_click"),
            document.getElementById("watermark")?.remove()
        }
        ),
        b
    }
    function d(b) {
        const E = document.createElement("div");
        E.id = "generate-button",
        Gt(E, {
            padding: b ? "8px 16px" : "10px 20px",
            background: Je.button.gradient,
            borderRadius: "999px",
            border: "none",
            gap: "6px",
            cursor: "pointer",
            marginLeft: b ? "12px" : "0",
            whiteSpace: "nowrap",
            width: b ? "auto" : "100%"
        }),
        wu(E);
        const O = document.createElement("img");
        O.src = Sm.generate,
        Gt(O, {
            width: "16px",
            height: "16px",
            flexShrink: "0"
        });
        const C = document.createElement("span");
        return C.textContent = xo().button,
        Gt(C, {
            color: Je.colors.white,
            fontFamily: Je.font.family,
            fontSize: Je.font.size.button,
            fontWeight: Je.font.weight,
            lineHeight: Je.font.lineHeight
        }),
        E.append(O, C),
        E.addEventListener("click", M => {
            M.stopPropagation(),
            c("watermark_create_button_click")
        }
        ),
        E
    }
    function g() {
        const b = document.createElement("img");
        return b.src = Za.watermarkLogo,
        Gt(b, {
            width: "92px",
            height: "auto",
            paddingLeft: "8px",
            flexShrink: "0"
        }),
        b
    }
    function m(b) {
        const E = xo()
          , O = document.createElement("div");
        O.textContent = E.prefix,
        bo(O);
        const C = g()
          , M = document.createElement("div");
        M.textContent = E.suffix,
        bo(M, "12px"),
        b.append(O, C, M, d(!0))
    }
    function p(b, E) {
        const O = document.createElement("div");
        return O.textContent = b,
        bo(O),
        E && Gt(O, E),
        O
    }
    function x(b) {
        const {prefix: E, suffix: O} = xo()
          , [C,M] = O.startsWith(".") ? [".", O.slice(1).trim()] : ["", O]
          , U = document.createElement("div");
        wu(U),
        U.style.marginBottom = "4px",
        U.append(p(E, {
            marginRight: "6px"
        }), g(), ...C ? [p(C)] : []),
        b.append(U, p(M, {
            textAlign: "center",
            marginBottom: "12px"
        }), d(!1))
    }
    function v() {
        const b = gv()
          , E = document.createElement("div");
        return E.id = "watermark",
        Gt(E, {
            zIndex: Je.zIndex,
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            width: b ? "fit-content" : "calc(100% - 32px)",
            maxWidth: b ? "none" : "100%",
            backgroundColor: Je.colors.white,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: b ? "999px" : "36px",
            borderColor: Je.colors.border,
            padding: b ? "12px 20px" : "16px",
            boxShadow: Je.shadow,
            cursor: "pointer"
        }),
        wu(E, b ? "row" : "column"),
        E.appendChild(f()),
        b ? m(E) : x(E),
        E.addEventListener("click", O => {
            O.target.closest("#generate-button, #close-button") || c("watermark_create_button_click")
        }
        ),
        E
    }
    function S(b) {
        const E = document.getElementById("watermark");
        !E && !b ? (document.body.appendChild(v()),
        o(),
        yv()) : b && E && E.remove()
    }
    r(a).then(S)
}
vv();
const ae = u => typeof u == "string"
  , Ya = () => {
    let u, a;
    const r = new Promise( (o, c) => {
        u = o,
        a = c
    }
    );
    return r.resolve = u,
    r.reject = a,
    r
}
  , _m = u => u == null ? "" : "" + u
  , xv = (u, a, r) => {
    u.forEach(o => {
        a[o] && (r[o] = a[o])
    }
    )
}
  , bv = /###/g
  , Cm = u => u && u.indexOf("###") > -1 ? u.replace(bv, ".") : u
  , Am = u => !u || ae(u)
  , ka = (u, a, r) => {
    const o = ae(a) ? a.split(".") : a;
    let c = 0;
    for (; c < o.length - 1; ) {
        if (Am(u))
            return {};
        const f = Cm(o[c]);
        !u[f] && r && (u[f] = new r),
        Object.prototype.hasOwnProperty.call(u, f) ? u = u[f] : u = {},
        ++c
    }
    return Am(u) ? {} : {
        obj: u,
        k: Cm(o[c])
    }
}
  , Tm = (u, a, r) => {
    const {obj: o, k: c} = ka(u, a, Object);
    if (o !== void 0 || a.length === 1) {
        o[c] = r;
        return
    }
    let f = a[a.length - 1]
      , d = a.slice(0, a.length - 1)
      , g = ka(u, d, Object);
    for (; g.obj === void 0 && d.length; )
        f = `${d[d.length - 1]}.${f}`,
        d = d.slice(0, d.length - 1),
        g = ka(u, d, Object),
        g?.obj && typeof g.obj[`${g.k}.${f}`] < "u" && (g.obj = void 0);
    g.obj[`${g.k}.${f}`] = r
}
  , Sv = (u, a, r, o) => {
    const {obj: c, k: f} = ka(u, a, Object);
    c[f] = c[f] || [],
    c[f].push(r)
}
  , Nu = (u, a) => {
    const {obj: r, k: o} = ka(u, a);
    if (r && Object.prototype.hasOwnProperty.call(r, o))
        return r[o]
}
  , Ev = (u, a, r) => {
    const o = Nu(u, r);
    return o !== void 0 ? o : Nu(a, r)
}
  , yg = (u, a, r) => {
    for (const o in a)
        o !== "__proto__" && o !== "constructor" && (o in u ? ae(u[o]) || u[o]instanceof String || ae(a[o]) || a[o]instanceof String ? r && (u[o] = a[o]) : yg(u[o], a[o], r) : u[o] = a[o]);
    return u
}
  , Gl = u => u.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var wv = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
};
const _v = u => ae(u) ? u.replace(/[&<>"'\/]/g, a => wv[a]) : u;
class Cv {
    constructor(a) {
        this.capacity = a,
        this.regExpMap = new Map,
        this.regExpQueue = []
    }
    getRegExp(a) {
        const r = this.regExpMap.get(a);
        if (r !== void 0)
            return r;
        const o = new RegExp(a);
        return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()),
        this.regExpMap.set(a, o),
        this.regExpQueue.push(a),
        o
    }
}
const Av = [" ", ",", "?", "!", ";"]
  , Tv = new Cv(20)
  , Ov = (u, a, r) => {
    a = a || "",
    r = r || "";
    const o = Av.filter(d => a.indexOf(d) < 0 && r.indexOf(d) < 0);
    if (o.length === 0)
        return !0;
    const c = Tv.getRegExp(`(${o.map(d => d === "?" ? "\\?" : d).join("|")})`);
    let f = !c.test(u);
    if (!f) {
        const d = u.indexOf(r);
        d > 0 && !c.test(u.substring(0, d)) && (f = !0)
    }
    return f
}
  , jo = (u, a, r=".") => {
    if (!u)
        return;
    if (u[a])
        return Object.prototype.hasOwnProperty.call(u, a) ? u[a] : void 0;
    const o = a.split(r);
    let c = u;
    for (let f = 0; f < o.length; ) {
        if (!c || typeof c != "object")
            return;
        let d, g = "";
        for (let m = f; m < o.length; ++m)
            if (m !== f && (g += r),
            g += o[m],
            d = c[g],
            d !== void 0) {
                if (["string", "number", "boolean"].indexOf(typeof d) > -1 && m < o.length - 1)
                    continue;
                f += m - f + 1;
                break
            }
        c = d
    }
    return c
}
  , Ja = u => u?.replace("_", "-")
  , Nv = {
    type: "logger",
    log(u) {
        this.output("log", u)
    },
    warn(u) {
        this.output("warn", u)
    },
    error(u) {
        this.output("error", u)
    },
    output(u, a) {
        console?.[u]?.apply?.(console, a)
    }
};
class Ru {
    constructor(a, r={}) {
        this.init(a, r)
    }
    init(a, r={}) {
        this.prefix = r.prefix || "i18next:",
        this.logger = a || Nv,
        this.options = r,
        this.debug = r.debug
    }
    log(...a) {
        return this.forward(a, "log", "", !0)
    }
    warn(...a) {
        return this.forward(a, "warn", "", !0)
    }
    error(...a) {
        return this.forward(a, "error", "")
    }
    deprecate(...a) {
        return this.forward(a, "warn", "WARNING DEPRECATED: ", !0)
    }
    forward(a, r, o, c) {
        return c && !this.debug ? null : (ae(a[0]) && (a[0] = `${o}${this.prefix} ${a[0]}`),
        this.logger[r](a))
    }
    create(a) {
        return new Ru(this.logger,{
            prefix: `${this.prefix}:${a}:`,
            ...this.options
        })
    }
    clone(a) {
        return a = a || this.options,
        a.prefix = a.prefix || this.prefix,
        new Ru(this.logger,a)
    }
}
var Yt = new Ru;
class zu {
    constructor() {
        this.observers = {}
    }
    on(a, r) {
        return a.split(" ").forEach(o => {
            this.observers[o] || (this.observers[o] = new Map);
            const c = this.observers[o].get(r) || 0;
            this.observers[o].set(r, c + 1)
        }
        ),
        this
    }
    off(a, r) {
        if (this.observers[a]) {
            if (!r) {
                delete this.observers[a];
                return
            }
            this.observers[a].delete(r)
        }
    }
    emit(a, ...r) {
        this.observers[a] && Array.from(this.observers[a].entries()).forEach( ([c,f]) => {
            for (let d = 0; d < f; d++)
                c(...r)
        }
        ),
        this.observers["*"] && Array.from(this.observers["*"].entries()).forEach( ([c,f]) => {
            for (let d = 0; d < f; d++)
                c.apply(c, [a, ...r])
        }
        )
    }
}
class Om extends zu {
    constructor(a, r={
        ns: ["translation"],
        defaultNS: "translation"
    }) {
        super(),
        this.data = a || {},
        this.options = r,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0)
    }
    addNamespaces(a) {
        this.options.ns.indexOf(a) < 0 && this.options.ns.push(a)
    }
    removeNamespaces(a) {
        const r = this.options.ns.indexOf(a);
        r > -1 && this.options.ns.splice(r, 1)
    }
    getResource(a, r, o, c={}) {
        const f = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator
          , d = c.ignoreJSONStructure !== void 0 ? c.ignoreJSONStructure : this.options.ignoreJSONStructure;
        let g;
        a.indexOf(".") > -1 ? g = a.split(".") : (g = [a, r],
        o && (Array.isArray(o) ? g.push(...o) : ae(o) && f ? g.push(...o.split(f)) : g.push(o)));
        const m = Nu(this.data, g);
        return !m && !r && !o && a.indexOf(".") > -1 && (a = g[0],
        r = g[1],
        o = g.slice(2).join(".")),
        m || !d || !ae(o) ? m : jo(this.data?.[a]?.[r], o, f)
    }
    addResource(a, r, o, c, f={
        silent: !1
    }) {
        const d = f.keySeparator !== void 0 ? f.keySeparator : this.options.keySeparator;
        let g = [a, r];
        o && (g = g.concat(d ? o.split(d) : o)),
        a.indexOf(".") > -1 && (g = a.split("."),
        c = r,
        r = g[1]),
        this.addNamespaces(r),
        Tm(this.data, g, c),
        f.silent || this.emit("added", a, r, o, c)
    }
    addResources(a, r, o, c={
        silent: !1
    }) {
        for (const f in o)
            (ae(o[f]) || Array.isArray(o[f])) && this.addResource(a, r, f, o[f], {
                silent: !0
            });
        c.silent || this.emit("added", a, r, o)
    }
    addResourceBundle(a, r, o, c, f, d={
        silent: !1,
        skipCopy: !1
    }) {
        let g = [a, r];
        a.indexOf(".") > -1 && (g = a.split("."),
        c = o,
        o = r,
        r = g[1]),
        this.addNamespaces(r);
        let m = Nu(this.data, g) || {};
        d.skipCopy || (o = JSON.parse(JSON.stringify(o))),
        c ? yg(m, o, f) : m = {
            ...m,
            ...o
        },
        Tm(this.data, g, m),
        d.silent || this.emit("added", a, r, o)
    }
    removeResourceBundle(a, r) {
        this.hasResourceBundle(a, r) && delete this.data[a][r],
        this.removeNamespaces(r),
        this.emit("removed", a, r)
    }
    hasResourceBundle(a, r) {
        return this.getResource(a, r) !== void 0
    }
    getResourceBundle(a, r) {
        return r || (r = this.options.defaultNS),
        this.getResource(a, r)
    }
    getDataByLanguage(a) {
        return this.data[a]
    }
    hasLanguageSomeTranslations(a) {
        const r = this.getDataByLanguage(a);
        return !!(r && Object.keys(r) || []).find(c => r[c] && Object.keys(r[c]).length > 0)
    }
    toJSON() {
        return this.data
    }
}
var vg = {
    processors: {},
    addPostProcessor(u) {
        this.processors[u.name] = u
    },
    handle(u, a, r, o, c) {
        return u.forEach(f => {
            a = this.processors[f]?.process(a, r, o, c) ?? a
        }
        ),
        a
    }
};
const xg = Symbol("i18next/PATH_KEY");
function Rv() {
    const u = []
      , a = Object.create(null);
    let r;
    return a.get = (o, c) => (r?.revoke?.(),
    c === xg ? u : (u.push(c),
    r = Proxy.revocable(o, a),
    r.proxy)),
    Proxy.revocable(Object.create(null), a).proxy
}
function Do(u, a) {
    const {[xg]: r} = u(Rv());
    return r.join(a?.keySeparator ?? ".")
}
const Nm = {}
  , Rm = u => !ae(u) && typeof u != "boolean" && typeof u != "number";
class ju extends zu {
    constructor(a, r={}) {
        super(),
        xv(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], a, this),
        this.options = r,
        this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
        this.logger = Yt.create("translator")
    }
    changeLanguage(a) {
        a && (this.language = a)
    }
    exists(a, r={
        interpolation: {}
    }) {
        const o = {
            ...r
        };
        return a == null ? !1 : this.resolve(a, o)?.res !== void 0
    }
    extractFromKey(a, r) {
        let o = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
        o === void 0 && (o = ":");
        const c = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
        let f = r.ns || this.options.defaultNS || [];
        const d = o && a.indexOf(o) > -1
          , g = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !Ov(a, o, c);
        if (d && !g) {
            const m = a.match(this.interpolator.nestingRegexp);
            if (m && m.length > 0)
                return {
                    key: a,
                    namespaces: ae(f) ? [f] : f
                };
            const p = a.split(o);
            (o !== c || o === c && this.options.ns.indexOf(p[0]) > -1) && (f = p.shift()),
            a = p.join(c)
        }
        return {
            key: a,
            namespaces: ae(f) ? [f] : f
        }
    }
    translate(a, r, o) {
        let c = typeof r == "object" ? {
            ...r
        } : r;
        if (typeof c != "object" && this.options.overloadTranslationOptionHandler && (c = this.options.overloadTranslationOptionHandler(arguments)),
        typeof options == "object" && (c = {
            ...c
        }),
        c || (c = {}),
        a == null)
            return "";
        typeof a == "function" && (a = Do(a, c)),
        Array.isArray(a) || (a = [String(a)]);
        const f = c.returnDetails !== void 0 ? c.returnDetails : this.options.returnDetails
          , d = c.keySeparator !== void 0 ? c.keySeparator : this.options.keySeparator
          , {key: g, namespaces: m} = this.extractFromKey(a[a.length - 1], c)
          , p = m[m.length - 1];
        let x = c.nsSeparator !== void 0 ? c.nsSeparator : this.options.nsSeparator;
        x === void 0 && (x = ":");
        const v = c.lng || this.language
          , S = c.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
        if (v?.toLowerCase() === "cimode")
            return S ? f ? {
                res: `${p}${x}${g}`,
                usedKey: g,
                exactUsedKey: g,
                usedLng: v,
                usedNS: p,
                usedParams: this.getUsedParamsDetails(c)
            } : `${p}${x}${g}` : f ? {
                res: g,
                usedKey: g,
                exactUsedKey: g,
                usedLng: v,
                usedNS: p,
                usedParams: this.getUsedParamsDetails(c)
            } : g;
        const b = this.resolve(a, c);
        let E = b?.res;
        const O = b?.usedKey || g
          , C = b?.exactUsedKey || g
          , M = ["[object Number]", "[object Function]", "[object RegExp]"]
          , U = c.joinArrays !== void 0 ? c.joinArrays : this.options.joinArrays
          , V = !this.i18nFormat || this.i18nFormat.handleAsObject
          , J = c.count !== void 0 && !ae(c.count)
          , W = ju.hasDefaultValue(c)
          , oe = J ? this.pluralResolver.getSuffix(v, c.count, c) : ""
          , P = c.ordinal && J ? this.pluralResolver.getSuffix(v, c.count, {
            ordinal: !1
        }) : ""
          , pe = J && !c.ordinal && c.count === 0
          , Ee = pe && c[`defaultValue${this.options.pluralSeparator}zero`] || c[`defaultValue${oe}`] || c[`defaultValue${P}`] || c.defaultValue;
        let Q = E;
        V && !E && W && (Q = Ee);
        const Z = Rm(Q)
          , k = Object.prototype.toString.apply(Q);
        if (V && Q && Z && M.indexOf(k) < 0 && !(ae(U) && Array.isArray(Q))) {
            if (!c.returnObjects && !this.options.returnObjects) {
                this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                const le = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(O, Q, {
                    ...c,
                    ns: m
                }) : `key '${g} (${this.language})' returned an object instead of string.`;
                return f ? (b.res = le,
                b.usedParams = this.getUsedParamsDetails(c),
                b) : le
            }
            if (d) {
                const le = Array.isArray(Q)
                  , ce = le ? [] : {}
                  , Ce = le ? C : O;
                for (const L in Q)
                    if (Object.prototype.hasOwnProperty.call(Q, L)) {
                        const X = `${Ce}${d}${L}`;
                        W && !E ? ce[L] = this.translate(X, {
                            ...c,
                            defaultValue: Rm(Ee) ? Ee[L] : void 0,
                            joinArrays: !1,
                            ns: m
                        }) : ce[L] = this.translate(X, {
                            ...c,
                            joinArrays: !1,
                            ns: m
                        }),
                        ce[L] === X && (ce[L] = Q[L])
                    }
                E = ce
            }
        } else if (V && ae(U) && Array.isArray(E))
            E = E.join(U),
            E && (E = this.extendTranslation(E, a, c, o));
        else {
            let le = !1
              , ce = !1;
            !this.isValidLookup(E) && W && (le = !0,
            E = Ee),
            this.isValidLookup(E) || (ce = !0,
            E = g);
            const L = (c.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && ce ? void 0 : E
              , X = W && Ee !== E && this.options.updateMissing;
            if (ce || le || X) {
                if (this.logger.log(X ? "updateKey" : "missingKey", v, p, g, X ? Ee : E),
                d) {
                    const A = this.resolve(g, {
                        ...c,
                        keySeparator: !1
                    });
                    A && A.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                }
                let te = [];
                const ve = this.languageUtils.getFallbackCodes(this.options.fallbackLng, c.lng || this.language);
                if (this.options.saveMissingTo === "fallback" && ve && ve[0])
                    for (let A = 0; A < ve.length; A++)
                        te.push(ve[A]);
                else
                    this.options.saveMissingTo === "all" ? te = this.languageUtils.toResolveHierarchy(c.lng || this.language) : te.push(c.lng || this.language);
                const we = (A, q, K) => {
                    const $ = W && K !== E ? K : L;
                    this.options.missingKeyHandler ? this.options.missingKeyHandler(A, p, q, $, X, c) : this.backendConnector?.saveMissing && this.backendConnector.saveMissing(A, p, q, $, X, c),
                    this.emit("missingKey", A, p, q, E)
                }
                ;
                this.options.saveMissing && (this.options.saveMissingPlurals && J ? te.forEach(A => {
                    const q = this.pluralResolver.getSuffixes(A, c);
                    pe && c[`defaultValue${this.options.pluralSeparator}zero`] && q.indexOf(`${this.options.pluralSeparator}zero`) < 0 && q.push(`${this.options.pluralSeparator}zero`),
                    q.forEach(K => {
                        we([A], g + K, c[`defaultValue${K}`] || Ee)
                    }
                    )
                }
                ) : we(te, g, Ee))
            }
            E = this.extendTranslation(E, a, c, b, o),
            ce && E === g && this.options.appendNamespaceToMissingKey && (E = `${p}${x}${g}`),
            (ce || le) && this.options.parseMissingKeyHandler && (E = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${p}${x}${g}` : g, le ? E : void 0, c))
        }
        return f ? (b.res = E,
        b.usedParams = this.getUsedParamsDetails(c),
        b) : E
    }
    extendTranslation(a, r, o, c, f) {
        if (this.i18nFormat?.parse)
            a = this.i18nFormat.parse(a, {
                ...this.options.interpolation.defaultVariables,
                ...o
            }, o.lng || this.language || c.usedLng, c.usedNS, c.usedKey, {
                resolved: c
            });
        else if (!o.skipInterpolation) {
            o.interpolation && this.interpolator.init({
                ...o,
                interpolation: {
                    ...this.options.interpolation,
                    ...o.interpolation
                }
            });
            const m = ae(a) && (o?.interpolation?.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
            let p;
            if (m) {
                const v = a.match(this.interpolator.nestingRegexp);
                p = v && v.length
            }
            let x = o.replace && !ae(o.replace) ? o.replace : o;
            if (this.options.interpolation.defaultVariables && (x = {
                ...this.options.interpolation.defaultVariables,
                ...x
            }),
            a = this.interpolator.interpolate(a, x, o.lng || this.language || c.usedLng, o),
            m) {
                const v = a.match(this.interpolator.nestingRegexp)
                  , S = v && v.length;
                p < S && (o.nest = !1)
            }
            !o.lng && c && c.res && (o.lng = this.language || c.usedLng),
            o.nest !== !1 && (a = this.interpolator.nest(a, (...v) => f?.[0] === v[0] && !o.context ? (this.logger.warn(`It seems you are nesting recursively key: ${v[0]} in key: ${r[0]}`),
            null) : this.translate(...v, r), o)),
            o.interpolation && this.interpolator.reset()
        }
        const d = o.postProcess || this.options.postProcess
          , g = ae(d) ? [d] : d;
        return a != null && g?.length && o.applyPostProcessor !== !1 && (a = vg.handle(g, a, r, this.options && this.options.postProcessPassResolved ? {
            i18nResolved: {
                ...c,
                usedParams: this.getUsedParamsDetails(o)
            },
            ...o
        } : o, this)),
        a
    }
    resolve(a, r={}) {
        let o, c, f, d, g;
        return ae(a) && (a = [a]),
        a.forEach(m => {
            if (this.isValidLookup(o))
                return;
            const p = this.extractFromKey(m, r)
              , x = p.key;
            c = x;
            let v = p.namespaces;
            this.options.fallbackNS && (v = v.concat(this.options.fallbackNS));
            const S = r.count !== void 0 && !ae(r.count)
              , b = S && !r.ordinal && r.count === 0
              , E = r.context !== void 0 && (ae(r.context) || typeof r.context == "number") && r.context !== ""
              , O = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
            v.forEach(C => {
                this.isValidLookup(o) || (g = C,
                !Nm[`${O[0]}-${C}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(g) && (Nm[`${O[0]}-${C}`] = !0,
                this.logger.warn(`key "${c}" for languages "${O.join(", ")}" won't get resolved as namespace "${g}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                O.forEach(M => {
                    if (this.isValidLookup(o))
                        return;
                    d = M;
                    const U = [x];
                    if (this.i18nFormat?.addLookupKeys)
                        this.i18nFormat.addLookupKeys(U, x, M, C, r);
                    else {
                        let J;
                        S && (J = this.pluralResolver.getSuffix(M, r.count, r));
                        const W = `${this.options.pluralSeparator}zero`
                          , oe = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                        if (S && (r.ordinal && J.indexOf(oe) === 0 && U.push(x + J.replace(oe, this.options.pluralSeparator)),
                        U.push(x + J),
                        b && U.push(x + W)),
                        E) {
                            const P = `${x}${this.options.contextSeparator || "_"}${r.context}`;
                            U.push(P),
                            S && (r.ordinal && J.indexOf(oe) === 0 && U.push(P + J.replace(oe, this.options.pluralSeparator)),
                            U.push(P + J),
                            b && U.push(P + W))
                        }
                    }
                    let V;
                    for (; V = U.pop(); )
                        this.isValidLookup(o) || (f = V,
                        o = this.getResource(M, C, V, r))
                }
                ))
            }
            )
        }
        ),
        {
            res: o,
            usedKey: c,
            exactUsedKey: f,
            usedLng: d,
            usedNS: g
        }
    }
    isValidLookup(a) {
        return a !== void 0 && !(!this.options.returnNull && a === null) && !(!this.options.returnEmptyString && a === "")
    }
    getResource(a, r, o, c={}) {
        return this.i18nFormat?.getResource ? this.i18nFormat.getResource(a, r, o, c) : this.resourceStore.getResource(a, r, o, c)
    }
    getUsedParamsDetails(a={}) {
        const r = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"]
          , o = a.replace && !ae(a.replace);
        let c = o ? a.replace : a;
        if (o && typeof a.count < "u" && (c.count = a.count),
        this.options.interpolation.defaultVariables && (c = {
            ...this.options.interpolation.defaultVariables,
            ...c
        }),
        !o) {
            c = {
                ...c
            };
            for (const f of r)
                delete c[f]
        }
        return c
    }
    static hasDefaultValue(a) {
        const r = "defaultValue";
        for (const o in a)
            if (Object.prototype.hasOwnProperty.call(a, o) && r === o.substring(0, r.length) && a[o] !== void 0)
                return !0;
        return !1
    }
}
class jm {
    constructor(a) {
        this.options = a,
        this.supportedLngs = this.options.supportedLngs || !1,
        this.logger = Yt.create("languageUtils")
    }
    getScriptPartFromCode(a) {
        if (a = Ja(a),
        !a || a.indexOf("-") < 0)
            return null;
        const r = a.split("-");
        return r.length === 2 || (r.pop(),
        r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"))
    }
    getLanguagePartFromCode(a) {
        if (a = Ja(a),
        !a || a.indexOf("-") < 0)
            return a;
        const r = a.split("-");
        return this.formatLanguageCode(r[0])
    }
    formatLanguageCode(a) {
        if (ae(a) && a.indexOf("-") > -1) {
            let r;
            try {
                r = Intl.getCanonicalLocales(a)[0]
            } catch {}
            return r && this.options.lowerCaseLng && (r = r.toLowerCase()),
            r || (this.options.lowerCaseLng ? a.toLowerCase() : a)
        }
        return this.options.cleanCode || this.options.lowerCaseLng ? a.toLowerCase() : a
    }
    isSupportedCode(a) {
        return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (a = this.getLanguagePartFromCode(a)),
        !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(a) > -1
    }
    getBestMatchFromCodes(a) {
        if (!a)
            return null;
        let r;
        return a.forEach(o => {
            if (r)
                return;
            const c = this.formatLanguageCode(o);
            (!this.options.supportedLngs || this.isSupportedCode(c)) && (r = c)
        }
        ),
        !r && this.options.supportedLngs && a.forEach(o => {
            if (r)
                return;
            const c = this.getScriptPartFromCode(o);
            if (this.isSupportedCode(c))
                return r = c;
            const f = this.getLanguagePartFromCode(o);
            if (this.isSupportedCode(f))
                return r = f;
            r = this.options.supportedLngs.find(d => {
                if (d === f)
                    return d;
                if (!(d.indexOf("-") < 0 && f.indexOf("-") < 0) && (d.indexOf("-") > 0 && f.indexOf("-") < 0 && d.substring(0, d.indexOf("-")) === f || d.indexOf(f) === 0 && f.length > 1))
                    return d
            }
            )
        }
        ),
        r || (r = this.getFallbackCodes(this.options.fallbackLng)[0]),
        r
    }
    getFallbackCodes(a, r) {
        if (!a)
            return [];
        if (typeof a == "function" && (a = a(r)),
        ae(a) && (a = [a]),
        Array.isArray(a))
            return a;
        if (!r)
            return a.default || [];
        let o = a[r];
        return o || (o = a[this.getScriptPartFromCode(r)]),
        o || (o = a[this.formatLanguageCode(r)]),
        o || (o = a[this.getLanguagePartFromCode(r)]),
        o || (o = a.default),
        o || []
    }
    toResolveHierarchy(a, r) {
        const o = this.getFallbackCodes((r === !1 ? [] : r) || this.options.fallbackLng || [], a)
          , c = []
          , f = d => {
            d && (this.isSupportedCode(d) ? c.push(d) : this.logger.warn(`rejecting language code not found in supportedLngs: ${d}`))
        }
        ;
        return ae(a) && (a.indexOf("-") > -1 || a.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && f(this.formatLanguageCode(a)),
        this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && f(this.getScriptPartFromCode(a)),
        this.options.load !== "currentOnly" && f(this.getLanguagePartFromCode(a))) : ae(a) && f(this.formatLanguageCode(a)),
        o.forEach(d => {
            c.indexOf(d) < 0 && f(this.formatLanguageCode(d))
        }
        ),
        c
    }
}
const Dm = {
    zero: 0,
    one: 1,
    two: 2,
    few: 3,
    many: 4,
    other: 5
}
  , Mm = {
    select: u => u === 1 ? "one" : "other",
    resolvedOptions: () => ({
        pluralCategories: ["one", "other"]
    })
};
class jv {
    constructor(a, r={}) {
        this.languageUtils = a,
        this.options = r,
        this.logger = Yt.create("pluralResolver"),
        this.pluralRulesCache = {}
    }
    addRule(a, r) {
        this.rules[a] = r
    }
    clearCache() {
        this.pluralRulesCache = {}
    }
    getRule(a, r={}) {
        const o = Ja(a === "dev" ? "en" : a)
          , c = r.ordinal ? "ordinal" : "cardinal"
          , f = JSON.stringify({
            cleanedCode: o,
            type: c
        });
        if (f in this.pluralRulesCache)
            return this.pluralRulesCache[f];
        let d;
        try {
            d = new Intl.PluralRules(o,{
                type: c
            })
        } catch {
            if (!Intl)
                return this.logger.error("No Intl support, please use an Intl polyfill!"),
                Mm;
            if (!a.match(/-|_/))
                return Mm;
            const m = this.languageUtils.getLanguagePartFromCode(a);
            d = this.getRule(m, r)
        }
        return this.pluralRulesCache[f] = d,
        d
    }
    needsPlural(a, r={}) {
        let o = this.getRule(a, r);
        return o || (o = this.getRule("dev", r)),
        o?.resolvedOptions().pluralCategories.length > 1
    }
    getPluralFormsOfKey(a, r, o={}) {
        return this.getSuffixes(a, o).map(c => `${r}${c}`)
    }
    getSuffixes(a, r={}) {
        let o = this.getRule(a, r);
        return o || (o = this.getRule("dev", r)),
        o ? o.resolvedOptions().pluralCategories.sort( (c, f) => Dm[c] - Dm[f]).map(c => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${c}`) : []
    }
    getSuffix(a, r, o={}) {
        const c = this.getRule(a, o);
        return c ? `${this.options.prepend}${o.ordinal ? `ordinal${this.options.prepend}` : ""}${c.select(r)}` : (this.logger.warn(`no plural rule found for: ${a}`),
        this.getSuffix("dev", r, o))
    }
}
const zm = (u, a, r, o=".", c=!0) => {
    let f = Ev(u, a, r);
    return !f && c && ae(r) && (f = jo(u, r, o),
    f === void 0 && (f = jo(a, r, o))),
    f
}
  , So = u => u.replace(/\$/g, "$$$$");
class Dv {
    constructor(a={}) {
        this.logger = Yt.create("interpolator"),
        this.options = a,
        this.format = a?.interpolation?.format || (r => r),
        this.init(a)
    }
    init(a={}) {
        a.interpolation || (a.interpolation = {
            escapeValue: !0
        });
        const {escape: r, escapeValue: o, useRawValueToEscape: c, prefix: f, prefixEscaped: d, suffix: g, suffixEscaped: m, formatSeparator: p, unescapeSuffix: x, unescapePrefix: v, nestingPrefix: S, nestingPrefixEscaped: b, nestingSuffix: E, nestingSuffixEscaped: O, nestingOptionsSeparator: C, maxReplaces: M, alwaysFormat: U} = a.interpolation;
        this.escape = r !== void 0 ? r : _v,
        this.escapeValue = o !== void 0 ? o : !0,
        this.useRawValueToEscape = c !== void 0 ? c : !1,
        this.prefix = f ? Gl(f) : d || "{{",
        this.suffix = g ? Gl(g) : m || "}}",
        this.formatSeparator = p || ",",
        this.unescapePrefix = x ? "" : v || "-",
        this.unescapeSuffix = this.unescapePrefix ? "" : x || "",
        this.nestingPrefix = S ? Gl(S) : b || Gl("$t("),
        this.nestingSuffix = E ? Gl(E) : O || Gl(")"),
        this.nestingOptionsSeparator = C || ",",
        this.maxReplaces = M || 1e3,
        this.alwaysFormat = U !== void 0 ? U : !1,
        this.resetRegExp()
    }
    reset() {
        this.options && this.init(this.options)
    }
    resetRegExp() {
        const a = (r, o) => r?.source === o ? (r.lastIndex = 0,
        r) : new RegExp(o,"g");
        this.regexp = a(this.regexp, `${this.prefix}(.+?)${this.suffix}`),
        this.regexpUnescape = a(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`),
        this.nestingRegexp = a(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`)
    }
    interpolate(a, r, o, c) {
        let f, d, g;
        const m = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}
          , p = b => {
            if (b.indexOf(this.formatSeparator) < 0) {
                const M = zm(r, m, b, this.options.keySeparator, this.options.ignoreJSONStructure);
                return this.alwaysFormat ? this.format(M, void 0, o, {
                    ...c,
                    ...r,
                    interpolationkey: b
                }) : M
            }
            const E = b.split(this.formatSeparator)
              , O = E.shift().trim()
              , C = E.join(this.formatSeparator).trim();
            return this.format(zm(r, m, O, this.options.keySeparator, this.options.ignoreJSONStructure), C, o, {
                ...c,
                ...r,
                interpolationkey: O
            })
        }
        ;
        this.resetRegExp();
        const x = c?.missingInterpolationHandler || this.options.missingInterpolationHandler
          , v = c?.interpolation?.skipOnVariables !== void 0 ? c.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
        return [{
            regex: this.regexpUnescape,
            safeValue: b => So(b)
        }, {
            regex: this.regexp,
            safeValue: b => this.escapeValue ? So(this.escape(b)) : So(b)
        }].forEach(b => {
            for (g = 0; f = b.regex.exec(a); ) {
                const E = f[1].trim();
                if (d = p(E),
                d === void 0)
                    if (typeof x == "function") {
                        const C = x(a, f, c);
                        d = ae(C) ? C : ""
                    } else if (c && Object.prototype.hasOwnProperty.call(c, E))
                        d = "";
                    else if (v) {
                        d = f[0];
                        continue
                    } else
                        this.logger.warn(`missed to pass in variable ${E} for interpolating ${a}`),
                        d = "";
                else
                    !ae(d) && !this.useRawValueToEscape && (d = _m(d));
                const O = b.safeValue(d);
                if (a = a.replace(f[0], O),
                v ? (b.regex.lastIndex += d.length,
                b.regex.lastIndex -= f[0].length) : b.regex.lastIndex = 0,
                g++,
                g >= this.maxReplaces)
                    break
            }
        }
        ),
        a
    }
    nest(a, r, o={}) {
        let c, f, d;
        const g = (m, p) => {
            const x = this.nestingOptionsSeparator;
            if (m.indexOf(x) < 0)
                return m;
            const v = m.split(new RegExp(`${x}[ ]*{`));
            let S = `{${v[1]}`;
            m = v[0],
            S = this.interpolate(S, d);
            const b = S.match(/'/g)
              , E = S.match(/"/g);
            ((b?.length ?? 0) % 2 === 0 && !E || E.length % 2 !== 0) && (S = S.replace(/'/g, '"'));
            try {
                d = JSON.parse(S),
                p && (d = {
                    ...p,
                    ...d
                })
            } catch (O) {
                return this.logger.warn(`failed parsing options string in nesting for key ${m}`, O),
                `${m}${x}${S}`
            }
            return d.defaultValue && d.defaultValue.indexOf(this.prefix) > -1 && delete d.defaultValue,
            m
        }
        ;
        for (; c = this.nestingRegexp.exec(a); ) {
            let m = [];
            d = {
                ...o
            },
            d = d.replace && !ae(d.replace) ? d.replace : d,
            d.applyPostProcessor = !1,
            delete d.defaultValue;
            const p = /{.*}/.test(c[1]) ? c[1].lastIndexOf("}") + 1 : c[1].indexOf(this.formatSeparator);
            if (p !== -1 && (m = c[1].slice(p).split(this.formatSeparator).map(x => x.trim()).filter(Boolean),
            c[1] = c[1].slice(0, p)),
            f = r(g.call(this, c[1].trim(), d), d),
            f && c[0] === a && !ae(f))
                return f;
            ae(f) || (f = _m(f)),
            f || (this.logger.warn(`missed to resolve ${c[1]} for nesting ${a}`),
            f = ""),
            m.length && (f = m.reduce( (x, v) => this.format(x, v, o.lng, {
                ...o,
                interpolationkey: c[1].trim()
            }), f.trim())),
            a = a.replace(c[0], f),
            this.regexp.lastIndex = 0
        }
        return a
    }
}
const Mv = u => {
    let a = u.toLowerCase().trim();
    const r = {};
    if (u.indexOf("(") > -1) {
        const o = u.split("(");
        a = o[0].toLowerCase().trim();
        const c = o[1].substring(0, o[1].length - 1);
        a === "currency" && c.indexOf(":") < 0 ? r.currency || (r.currency = c.trim()) : a === "relativetime" && c.indexOf(":") < 0 ? r.range || (r.range = c.trim()) : c.split(";").forEach(d => {
            if (d) {
                const [g,...m] = d.split(":")
                  , p = m.join(":").trim().replace(/^'+|'+$/g, "")
                  , x = g.trim();
                r[x] || (r[x] = p),
                p === "false" && (r[x] = !1),
                p === "true" && (r[x] = !0),
                isNaN(p) || (r[x] = parseInt(p, 10))
            }
        }
        )
    }
    return {
        formatName: a,
        formatOptions: r
    }
}
  , Lm = u => {
    const a = {};
    return (r, o, c) => {
        let f = c;
        c && c.interpolationkey && c.formatParams && c.formatParams[c.interpolationkey] && c[c.interpolationkey] && (f = {
            ...f,
            [c.interpolationkey]: void 0
        });
        const d = o + JSON.stringify(f);
        let g = a[d];
        return g || (g = u(Ja(o), c),
        a[d] = g),
        g(r)
    }
}
  , zv = u => (a, r, o) => u(Ja(r), o)(a);
class Lv {
    constructor(a={}) {
        this.logger = Yt.create("formatter"),
        this.options = a,
        this.init(a)
    }
    init(a, r={
        interpolation: {}
    }) {
        this.formatSeparator = r.interpolation.formatSeparator || ",";
        const o = r.cacheInBuiltFormats ? Lm : zv;
        this.formats = {
            number: o( (c, f) => {
                const d = new Intl.NumberFormat(c,{
                    ...f
                });
                return g => d.format(g)
            }
            ),
            currency: o( (c, f) => {
                const d = new Intl.NumberFormat(c,{
                    ...f,
                    style: "currency"
                });
                return g => d.format(g)
            }
            ),
            datetime: o( (c, f) => {
                const d = new Intl.DateTimeFormat(c,{
                    ...f
                });
                return g => d.format(g)
            }
            ),
            relativetime: o( (c, f) => {
                const d = new Intl.RelativeTimeFormat(c,{
                    ...f
                });
                return g => d.format(g, f.range || "day")
            }
            ),
            list: o( (c, f) => {
                const d = new Intl.ListFormat(c,{
                    ...f
                });
                return g => d.format(g)
            }
            )
        }
    }
    add(a, r) {
        this.formats[a.toLowerCase().trim()] = r
    }
    addCached(a, r) {
        this.formats[a.toLowerCase().trim()] = Lm(r)
    }
    format(a, r, o, c={}) {
        const f = r.split(this.formatSeparator);
        if (f.length > 1 && f[0].indexOf("(") > 1 && f[0].indexOf(")") < 0 && f.find(g => g.indexOf(")") > -1)) {
            const g = f.findIndex(m => m.indexOf(")") > -1);
            f[0] = [f[0], ...f.splice(1, g)].join(this.formatSeparator)
        }
        return f.reduce( (g, m) => {
            const {formatName: p, formatOptions: x} = Mv(m);
            if (this.formats[p]) {
                let v = g;
                try {
                    const S = c?.formatParams?.[c.interpolationkey] || {}
                      , b = S.locale || S.lng || c.locale || c.lng || o;
                    v = this.formats[p](g, b, {
                        ...x,
                        ...c,
                        ...S
                    })
                } catch (S) {
                    this.logger.warn(S)
                }
                return v
            } else
                this.logger.warn(`there was no format function for ${p}`);
            return g
        }
        , a)
    }
}
const Uv = (u, a) => {
    u.pending[a] !== void 0 && (delete u.pending[a],
    u.pendingCount--)
}
;
class Bv extends zu {
    constructor(a, r, o, c={}) {
        super(),
        this.backend = a,
        this.store = r,
        this.services = o,
        this.languageUtils = o.languageUtils,
        this.options = c,
        this.logger = Yt.create("backendConnector"),
        this.waitingReads = [],
        this.maxParallelReads = c.maxParallelReads || 10,
        this.readingCalls = 0,
        this.maxRetries = c.maxRetries >= 0 ? c.maxRetries : 5,
        this.retryTimeout = c.retryTimeout >= 1 ? c.retryTimeout : 350,
        this.state = {},
        this.queue = [],
        this.backend?.init?.(o, c.backend, c)
    }
    queueLoad(a, r, o, c) {
        const f = {}
          , d = {}
          , g = {}
          , m = {};
        return a.forEach(p => {
            let x = !0;
            r.forEach(v => {
                const S = `${p}|${v}`;
                !o.reload && this.store.hasResourceBundle(p, v) ? this.state[S] = 2 : this.state[S] < 0 || (this.state[S] === 1 ? d[S] === void 0 && (d[S] = !0) : (this.state[S] = 1,
                x = !1,
                d[S] === void 0 && (d[S] = !0),
                f[S] === void 0 && (f[S] = !0),
                m[v] === void 0 && (m[v] = !0)))
            }
            ),
            x || (g[p] = !0)
        }
        ),
        (Object.keys(f).length || Object.keys(d).length) && this.queue.push({
            pending: d,
            pendingCount: Object.keys(d).length,
            loaded: {},
            errors: [],
            callback: c
        }),
        {
            toLoad: Object.keys(f),
            pending: Object.keys(d),
            toLoadLanguages: Object.keys(g),
            toLoadNamespaces: Object.keys(m)
        }
    }
    loaded(a, r, o) {
        const c = a.split("|")
          , f = c[0]
          , d = c[1];
        r && this.emit("failedLoading", f, d, r),
        !r && o && this.store.addResourceBundle(f, d, o, void 0, void 0, {
            skipCopy: !0
        }),
        this.state[a] = r ? -1 : 2,
        r && o && (this.state[a] = 0);
        const g = {};
        this.queue.forEach(m => {
            Sv(m.loaded, [f], d),
            Uv(m, a),
            r && m.errors.push(r),
            m.pendingCount === 0 && !m.done && (Object.keys(m.loaded).forEach(p => {
                g[p] || (g[p] = {});
                const x = m.loaded[p];
                x.length && x.forEach(v => {
                    g[p][v] === void 0 && (g[p][v] = !0)
                }
                )
            }
            ),
            m.done = !0,
            m.errors.length ? m.callback(m.errors) : m.callback())
        }
        ),
        this.emit("loaded", g),
        this.queue = this.queue.filter(m => !m.done)
    }
    read(a, r, o, c=0, f=this.retryTimeout, d) {
        if (!a.length)
            return d(null, {});
        if (this.readingCalls >= this.maxParallelReads) {
            this.waitingReads.push({
                lng: a,
                ns: r,
                fcName: o,
                tried: c,
                wait: f,
                callback: d
            });
            return
        }
        this.readingCalls++;
        const g = (p, x) => {
            if (this.readingCalls--,
            this.waitingReads.length > 0) {
                const v = this.waitingReads.shift();
                this.read(v.lng, v.ns, v.fcName, v.tried, v.wait, v.callback)
            }
            if (p && x && c < this.maxRetries) {
                setTimeout( () => {
                    this.read.call(this, a, r, o, c + 1, f * 2, d)
                }
                , f);
                return
            }
            d(p, x)
        }
          , m = this.backend[o].bind(this.backend);
        if (m.length === 2) {
            try {
                const p = m(a, r);
                p && typeof p.then == "function" ? p.then(x => g(null, x)).catch(g) : g(null, p)
            } catch (p) {
                g(p)
            }
            return
        }
        return m(a, r, g)
    }
    prepareLoading(a, r, o={}, c) {
        if (!this.backend)
            return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
            c && c();
        ae(a) && (a = this.languageUtils.toResolveHierarchy(a)),
        ae(r) && (r = [r]);
        const f = this.queueLoad(a, r, o, c);
        if (!f.toLoad.length)
            return f.pending.length || c(),
            null;
        f.toLoad.forEach(d => {
            this.loadOne(d)
        }
        )
    }
    load(a, r, o) {
        this.prepareLoading(a, r, {}, o)
    }
    reload(a, r, o) {
        this.prepareLoading(a, r, {
            reload: !0
        }, o)
    }
    loadOne(a, r="") {
        const o = a.split("|")
          , c = o[0]
          , f = o[1];
        this.read(c, f, "read", void 0, void 0, (d, g) => {
            d && this.logger.warn(`${r}loading namespace ${f} for language ${c} failed`, d),
            !d && g && this.logger.log(`${r}loaded namespace ${f} for language ${c}`, g),
            this.loaded(a, d, g)
        }
        )
    }
    saveMissing(a, r, o, c, f, d={}, g= () => {}
    ) {
        if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(r)) {
            this.logger.warn(`did not save key "${o}" as the namespace "${r}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
            return
        }
        if (!(o == null || o === "")) {
            if (this.backend?.create) {
                const m = {
                    ...d,
                    isUpdate: f
                }
                  , p = this.backend.create.bind(this.backend);
                if (p.length < 6)
                    try {
                        let x;
                        p.length === 5 ? x = p(a, r, o, c, m) : x = p(a, r, o, c),
                        x && typeof x.then == "function" ? x.then(v => g(null, v)).catch(g) : g(null, x)
                    } catch (x) {
                        g(x)
                    }
                else
                    p(a, r, o, c, g, m)
            }
            !a || !a[0] || this.store.addResource(a[0], r, o, c)
        }
    }
}
const Um = () => ({
    debug: !1,
    initAsync: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: u => {
        let a = {};
        if (typeof u[1] == "object" && (a = u[1]),
        ae(u[1]) && (a.defaultValue = u[1]),
        ae(u[2]) && (a.tDescription = u[2]),
        typeof u[2] == "object" || typeof u[3] == "object") {
            const r = u[3] || u[2];
            Object.keys(r).forEach(o => {
                a[o] = r[o]
            }
            )
        }
        return a
    }
    ,
    interpolation: {
        escapeValue: !0,
        format: u => u,
        prefix: "{{",
        suffix: "}}",
        formatSeparator: ",",
        unescapePrefix: "-",
        nestingPrefix: "$t(",
        nestingSuffix: ")",
        nestingOptionsSeparator: ",",
        maxReplaces: 1e3,
        skipOnVariables: !0
    },
    cacheInBuiltFormats: !0
})
  , Bm = u => (ae(u.ns) && (u.ns = [u.ns]),
ae(u.fallbackLng) && (u.fallbackLng = [u.fallbackLng]),
ae(u.fallbackNS) && (u.fallbackNS = [u.fallbackNS]),
u.supportedLngs?.indexOf?.("cimode") < 0 && (u.supportedLngs = u.supportedLngs.concat(["cimode"])),
typeof u.initImmediate == "boolean" && (u.initAsync = u.initImmediate),
u)
  , _u = () => {}
  , Hv = u => {
    Object.getOwnPropertyNames(Object.getPrototypeOf(u)).forEach(r => {
        typeof u[r] == "function" && (u[r] = u[r].bind(u))
    }
    )
}
;
class $a extends zu {
    constructor(a={}, r) {
        if (super(),
        this.options = Bm(a),
        this.services = {},
        this.logger = Yt,
        this.modules = {
            external: []
        },
        Hv(this),
        r && !this.isInitialized && !a.isClone) {
            if (!this.options.initAsync)
                return this.init(a, r),
                this;
            setTimeout( () => {
                this.init(a, r)
            }
            , 0)
        }
    }
    init(a={}, r) {
        this.isInitializing = !0,
        typeof a == "function" && (r = a,
        a = {}),
        a.defaultNS == null && a.ns && (ae(a.ns) ? a.defaultNS = a.ns : a.ns.indexOf("translation") < 0 && (a.defaultNS = a.ns[0]));
        const o = Um();
        this.options = {
            ...o,
            ...this.options,
            ...Bm(a)
        },
        this.options.interpolation = {
            ...o.interpolation,
            ...this.options.interpolation
        },
        a.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = a.keySeparator),
        a.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = a.nsSeparator);
        const c = p => p ? typeof p == "function" ? new p : p : null;
        if (!this.options.isClone) {
            this.modules.logger ? Yt.init(c(this.modules.logger), this.options) : Yt.init(null, this.options);
            let p;
            this.modules.formatter ? p = this.modules.formatter : p = Lv;
            const x = new jm(this.options);
            this.store = new Om(this.options.resources,this.options);
            const v = this.services;
            v.logger = Yt,
            v.resourceStore = this.store,
            v.languageUtils = x,
            v.pluralResolver = new jv(x,{
                prepend: this.options.pluralSeparator,
                simplifyPluralSuffix: this.options.simplifyPluralSuffix
            }),
            this.options.interpolation.format && this.options.interpolation.format !== o.interpolation.format && this.logger.deprecate("init: you are still using the legacy format function, please use the new approach: https://www.i18next.com/translation-function/formatting"),
            p && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (v.formatter = c(p),
            v.formatter.init && v.formatter.init(v, this.options),
            this.options.interpolation.format = v.formatter.format.bind(v.formatter)),
            v.interpolator = new Dv(this.options),
            v.utils = {
                hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
            },
            v.backendConnector = new Bv(c(this.modules.backend),v.resourceStore,v,this.options),
            v.backendConnector.on("*", (b, ...E) => {
                this.emit(b, ...E)
            }
            ),
            this.modules.languageDetector && (v.languageDetector = c(this.modules.languageDetector),
            v.languageDetector.init && v.languageDetector.init(v, this.options.detection, this.options)),
            this.modules.i18nFormat && (v.i18nFormat = c(this.modules.i18nFormat),
            v.i18nFormat.init && v.i18nFormat.init(this)),
            this.translator = new ju(this.services,this.options),
            this.translator.on("*", (b, ...E) => {
                this.emit(b, ...E)
            }
            ),
            this.modules.external.forEach(b => {
                b.init && b.init(this)
            }
            )
        }
        if (this.format = this.options.interpolation.format,
        r || (r = _u),
        this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
            const p = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            p.length > 0 && p[0] !== "dev" && (this.options.lng = p[0])
        }
        !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"),
        ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach(p => {
            this[p] = (...x) => this.store[p](...x)
        }
        ),
        ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach(p => {
            this[p] = (...x) => (this.store[p](...x),
            this)
        }
        );
        const g = Ya()
          , m = () => {
            const p = (x, v) => {
                this.isInitializing = !1,
                this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"),
                this.isInitialized = !0,
                this.options.isClone || this.logger.log("initialized", this.options),
                this.emit("initialized", this.options),
                g.resolve(v),
                r(x, v)
            }
            ;
            if (this.languages && !this.isInitialized)
                return p(null, this.t.bind(this));
            this.changeLanguage(this.options.lng, p)
        }
        ;
        return this.options.resources || !this.options.initAsync ? m() : setTimeout(m, 0),
        g
    }
    loadResources(a, r=_u) {
        let o = r;
        const c = ae(a) ? a : this.language;
        if (typeof a == "function" && (o = a),
        !this.options.resources || this.options.partialBundledLanguages) {
            if (c?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
                return o();
            const f = []
              , d = g => {
                if (!g || g === "cimode")
                    return;
                this.services.languageUtils.toResolveHierarchy(g).forEach(p => {
                    p !== "cimode" && f.indexOf(p) < 0 && f.push(p)
                }
                )
            }
            ;
            c ? d(c) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach(m => d(m)),
            this.options.preload?.forEach?.(g => d(g)),
            this.services.backendConnector.load(f, this.options.ns, g => {
                !g && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language),
                o(g)
            }
            )
        } else
            o(null)
    }
    reloadResources(a, r, o) {
        const c = Ya();
        return typeof a == "function" && (o = a,
        a = void 0),
        typeof r == "function" && (o = r,
        r = void 0),
        a || (a = this.languages),
        r || (r = this.options.ns),
        o || (o = _u),
        this.services.backendConnector.reload(a, r, f => {
            c.resolve(),
            o(f)
        }
        ),
        c
    }
    use(a) {
        if (!a)
            throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
        if (!a.type)
            throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
        return a.type === "backend" && (this.modules.backend = a),
        (a.type === "logger" || a.log && a.warn && a.error) && (this.modules.logger = a),
        a.type === "languageDetector" && (this.modules.languageDetector = a),
        a.type === "i18nFormat" && (this.modules.i18nFormat = a),
        a.type === "postProcessor" && vg.addPostProcessor(a),
        a.type === "formatter" && (this.modules.formatter = a),
        a.type === "3rdParty" && this.modules.external.push(a),
        this
    }
    setResolvedLanguage(a) {
        if (!(!a || !this.languages) && !(["cimode", "dev"].indexOf(a) > -1)) {
            for (let r = 0; r < this.languages.length; r++) {
                const o = this.languages[r];
                if (!(["cimode", "dev"].indexOf(o) > -1) && this.store.hasLanguageSomeTranslations(o)) {
                    this.resolvedLanguage = o;
                    break
                }
            }
            !this.resolvedLanguage && this.languages.indexOf(a) < 0 && this.store.hasLanguageSomeTranslations(a) && (this.resolvedLanguage = a,
            this.languages.unshift(a))
        }
    }
    changeLanguage(a, r) {
        this.isLanguageChangingTo = a;
        const o = Ya();
        this.emit("languageChanging", a);
        const c = g => {
            this.language = g,
            this.languages = this.services.languageUtils.toResolveHierarchy(g),
            this.resolvedLanguage = void 0,
            this.setResolvedLanguage(g)
        }
          , f = (g, m) => {
            m ? this.isLanguageChangingTo === a && (c(m),
            this.translator.changeLanguage(m),
            this.isLanguageChangingTo = void 0,
            this.emit("languageChanged", m),
            this.logger.log("languageChanged", m)) : this.isLanguageChangingTo = void 0,
            o.resolve( (...p) => this.t(...p)),
            r && r(g, (...p) => this.t(...p))
        }
          , d = g => {
            !a && !g && this.services.languageDetector && (g = []);
            const m = ae(g) ? g : g && g[0]
              , p = this.store.hasLanguageSomeTranslations(m) ? m : this.services.languageUtils.getBestMatchFromCodes(ae(g) ? [g] : g);
            p && (this.language || c(p),
            this.translator.language || this.translator.changeLanguage(p),
            this.services.languageDetector?.cacheUserLanguage?.(p)),
            this.loadResources(p, x => {
                f(x, p)
            }
            )
        }
        ;
        return !a && this.services.languageDetector && !this.services.languageDetector.async ? d(this.services.languageDetector.detect()) : !a && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(d) : this.services.languageDetector.detect(d) : d(a),
        o
    }
    getFixedT(a, r, o) {
        const c = (f, d, ...g) => {
            let m;
            typeof d != "object" ? m = this.options.overloadTranslationOptionHandler([f, d].concat(g)) : m = {
                ...d
            },
            m.lng = m.lng || c.lng,
            m.lngs = m.lngs || c.lngs,
            m.ns = m.ns || c.ns,
            m.keyPrefix !== "" && (m.keyPrefix = m.keyPrefix || o || c.keyPrefix);
            const p = this.options.keySeparator || ".";
            let x;
            return m.keyPrefix && Array.isArray(f) ? x = f.map(v => (typeof v == "function" && (v = Do(v, d)),
            `${m.keyPrefix}${p}${v}`)) : (typeof f == "function" && (f = Do(f, d)),
            x = m.keyPrefix ? `${m.keyPrefix}${p}${f}` : f),
            this.t(x, m)
        }
        ;
        return ae(a) ? c.lng = a : c.lngs = a,
        c.ns = r,
        c.keyPrefix = o,
        c
    }
    t(...a) {
        return this.translator?.translate(...a)
    }
    exists(...a) {
        return this.translator?.exists(...a)
    }
    setDefaultNamespace(a) {
        this.options.defaultNS = a
    }
    hasLoadedNamespace(a, r={}) {
        if (!this.isInitialized)
            return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
            !1;
        if (!this.languages || !this.languages.length)
            return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
            !1;
        const o = r.lng || this.resolvedLanguage || this.languages[0]
          , c = this.options ? this.options.fallbackLng : !1
          , f = this.languages[this.languages.length - 1];
        if (o.toLowerCase() === "cimode")
            return !0;
        const d = (g, m) => {
            const p = this.services.backendConnector.state[`${g}|${m}`];
            return p === -1 || p === 0 || p === 2
        }
        ;
        if (r.precheck) {
            const g = r.precheck(this, d);
            if (g !== void 0)
                return g
        }
        return !!(this.hasResourceBundle(o, a) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || d(o, a) && (!c || d(f, a)))
    }
    loadNamespaces(a, r) {
        const o = Ya();
        return this.options.ns ? (ae(a) && (a = [a]),
        a.forEach(c => {
            this.options.ns.indexOf(c) < 0 && this.options.ns.push(c)
        }
        ),
        this.loadResources(c => {
            o.resolve(),
            r && r(c)
        }
        ),
        o) : (r && r(),
        Promise.resolve())
    }
    loadLanguages(a, r) {
        const o = Ya();
        ae(a) && (a = [a]);
        const c = this.options.preload || []
          , f = a.filter(d => c.indexOf(d) < 0 && this.services.languageUtils.isSupportedCode(d));
        return f.length ? (this.options.preload = c.concat(f),
        this.loadResources(d => {
            o.resolve(),
            r && r(d)
        }
        ),
        o) : (r && r(),
        Promise.resolve())
    }
    dir(a) {
        if (a || (a = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language)),
        !a)
            return "rtl";
        try {
            const c = new Intl.Locale(a);
            if (c && c.getTextInfo) {
                const f = c.getTextInfo();
                if (f && f.direction)
                    return f.direction
            }
        } catch {}
        const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"]
          , o = this.services?.languageUtils || new jm(Um());
        return a.toLowerCase().indexOf("-latn") > 1 ? "ltr" : r.indexOf(o.getLanguagePartFromCode(a)) > -1 || a.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr"
    }
    static createInstance(a={}, r) {
        return new $a(a,r)
    }
    cloneInstance(a={}, r=_u) {
        const o = a.forkResourceStore;
        o && delete a.forkResourceStore;
        const c = {
            ...this.options,
            ...a,
            isClone: !0
        }
          , f = new $a(c);
        if ((a.debug !== void 0 || a.prefix !== void 0) && (f.logger = f.logger.clone(a)),
        ["store", "services", "language"].forEach(g => {
            f[g] = this[g]
        }
        ),
        f.services = {
            ...this.services
        },
        f.services.utils = {
            hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
        },
        o) {
            const g = Object.keys(this.store.data).reduce( (m, p) => (m[p] = {
                ...this.store.data[p]
            },
            m[p] = Object.keys(m[p]).reduce( (x, v) => (x[v] = {
                ...m[p][v]
            },
            x), m[p]),
            m), {});
            f.store = new Om(g,c),
            f.services.resourceStore = f.store
        }
        return f.translator = new ju(f.services,c),
        f.translator.on("*", (g, ...m) => {
            f.emit(g, ...m)
        }
        ),
        f.init(c, r),
        f.translator.options = c,
        f.translator.backendConnector.services.utils = {
            hasLoadedNamespace: f.hasLoadedNamespace.bind(f)
        },
        f
    }
    toJSON() {
        return {
            options: this.options,
            store: this.store,
            language: this.language,
            languages: this.languages,
            resolvedLanguage: this.resolvedLanguage
        }
    }
}
const et = $a.createInstance();
et.createInstance = $a.createInstance;
et.createInstance;
et.dir;
et.init;
et.loadResources;
et.reloadResources;
et.use;
et.changeLanguage;
et.getFixedT;
et.t;
et.exists;
et.setDefaultNamespace;
et.hasLoadedNamespace;
et.loadNamespaces;
et.loadLanguages;
const qv = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g
  , Gv = {
    "&amp;": "&",
    "&#38;": "&",
    "&lt;": "<",
    "&#60;": "<",
    "&gt;": ">",
    "&#62;": ">",
    "&apos;": "'",
    "&#39;": "'",
    "&quot;": '"',
    "&#34;": '"',
    "&nbsp;": " ",
    "&#160;": " ",
    "&copy;": "©",
    "&#169;": "©",
    "&reg;": "®",
    "&#174;": "®",
    "&hellip;": "…",
    "&#8230;": "…",
    "&#x2F;": "/",
    "&#47;": "/"
}
  , Yv = u => Gv[u]
  , Vv = u => u.replace(qv, Yv);
let Hm = {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: !0,
    transWrapTextNodes: "",
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    useSuspense: !0,
    unescape: Vv
};
const Qv = (u={}) => {
    Hm = {
        ...Hm,
        ...u
    }
}
  , Xv = {
    type: "3rdParty",
    init(u) {
        Qv(u.options.react)
    }
}
  , Zv = H.createContext();
function Kv({i18n: u, defaultNS: a, children: r}) {
    const o = H.useMemo( () => ({
        i18n: u,
        defaultNS: a
    }), [u, a]);
    return H.createElement(Zv.Provider, {
        value: o
    }, r)
}
const {slice: kv, forEach: Jv} = [];
function $v(u) {
    return Jv.call(kv.call(arguments, 1), a => {
        if (a)
            for (const r in a)
                u[r] === void 0 && (u[r] = a[r])
    }
    ),
    u
}
function Fv(u) {
    return typeof u != "string" ? !1 : [/<\s*script.*?>/i, /<\s*\/\s*script\s*>/i, /<\s*img.*?on\w+\s*=/i, /<\s*\w+\s*on\w+\s*=.*?>/i, /javascript\s*:/i, /vbscript\s*:/i, /expression\s*\(/i, /eval\s*\(/i, /alert\s*\(/i, /document\.cookie/i, /document\.write\s*\(/i, /window\.location/i, /innerHTML/i].some(r => r.test(u))
}
const qm = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
  , Wv = function(u, a) {
    const o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        path: "/"
    }
      , c = encodeURIComponent(a);
    let f = `${u}=${c}`;
    if (o.maxAge > 0) {
        const d = o.maxAge - 0;
        if (Number.isNaN(d))
            throw new Error("maxAge should be a Number");
        f += `; Max-Age=${Math.floor(d)}`
    }
    if (o.domain) {
        if (!qm.test(o.domain))
            throw new TypeError("option domain is invalid");
        f += `; Domain=${o.domain}`
    }
    if (o.path) {
        if (!qm.test(o.path))
            throw new TypeError("option path is invalid");
        f += `; Path=${o.path}`
    }
    if (o.expires) {
        if (typeof o.expires.toUTCString != "function")
            throw new TypeError("option expires is invalid");
        f += `; Expires=${o.expires.toUTCString()}`
    }
    if (o.httpOnly && (f += "; HttpOnly"),
    o.secure && (f += "; Secure"),
    o.sameSite)
        switch (typeof o.sameSite == "string" ? o.sameSite.toLowerCase() : o.sameSite) {
        case !0:
            f += "; SameSite=Strict";
            break;
        case "lax":
            f += "; SameSite=Lax";
            break;
        case "strict":
            f += "; SameSite=Strict";
            break;
        case "none":
            f += "; SameSite=None";
            break;
        default:
            throw new TypeError("option sameSite is invalid")
        }
    return o.partitioned && (f += "; Partitioned"),
    f
}
  , Gm = {
    create(u, a, r, o) {
        let c = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
            path: "/",
            sameSite: "strict"
        };
        r && (c.expires = new Date,
        c.expires.setTime(c.expires.getTime() + r * 60 * 1e3)),
        o && (c.domain = o),
        document.cookie = Wv(u, a, c)
    },
    read(u) {
        const a = `${u}=`
          , r = document.cookie.split(";");
        for (let o = 0; o < r.length; o++) {
            let c = r[o];
            for (; c.charAt(0) === " "; )
                c = c.substring(1, c.length);
            if (c.indexOf(a) === 0)
                return c.substring(a.length, c.length)
        }
        return null
    },
    remove(u, a) {
        this.create(u, "", -1, a)
    }
};
var Pv = {
    name: "cookie",
    lookup(u) {
        let {lookupCookie: a} = u;
        if (a && typeof document < "u")
            return Gm.read(a) || void 0
    },
    cacheUserLanguage(u, a) {
        let {lookupCookie: r, cookieMinutes: o, cookieDomain: c, cookieOptions: f} = a;
        r && typeof document < "u" && Gm.create(r, u, o, c, f)
    }
}
  , Iv = {
    name: "querystring",
    lookup(u) {
        let {lookupQuerystring: a} = u, r;
        if (typeof window < "u") {
            let {search: o} = window.location;
            !window.location.search && window.location.hash?.indexOf("?") > -1 && (o = window.location.hash.substring(window.location.hash.indexOf("?")));
            const f = o.substring(1).split("&");
            for (let d = 0; d < f.length; d++) {
                const g = f[d].indexOf("=");
                g > 0 && f[d].substring(0, g) === a && (r = f[d].substring(g + 1))
            }
        }
        return r
    }
}
  , ex = {
    name: "hash",
    lookup(u) {
        let {lookupHash: a, lookupFromHashIndex: r} = u, o;
        if (typeof window < "u") {
            const {hash: c} = window.location;
            if (c && c.length > 2) {
                const f = c.substring(1);
                if (a) {
                    const d = f.split("&");
                    for (let g = 0; g < d.length; g++) {
                        const m = d[g].indexOf("=");
                        m > 0 && d[g].substring(0, m) === a && (o = d[g].substring(m + 1))
                    }
                }
                if (o)
                    return o;
                if (!o && r > -1) {
                    const d = c.match(/\/([a-zA-Z-]*)/g);
                    return Array.isArray(d) ? d[typeof r == "number" ? r : 0]?.replace("/", "") : void 0
                }
            }
        }
        return o
    }
};
let Yl = null;
const Ym = () => {
    if (Yl !== null)
        return Yl;
    try {
        if (Yl = typeof window < "u" && window.localStorage !== null,
        !Yl)
            return !1;
        const u = "i18next.translate.boo";
        window.localStorage.setItem(u, "foo"),
        window.localStorage.removeItem(u)
    } catch {
        Yl = !1
    }
    return Yl
}
;
var tx = {
    name: "localStorage",
    lookup(u) {
        let {lookupLocalStorage: a} = u;
        if (a && Ym())
            return window.localStorage.getItem(a) || void 0
    },
    cacheUserLanguage(u, a) {
        let {lookupLocalStorage: r} = a;
        r && Ym() && window.localStorage.setItem(r, u)
    }
};
let Vl = null;
const Vm = () => {
    if (Vl !== null)
        return Vl;
    try {
        if (Vl = typeof window < "u" && window.sessionStorage !== null,
        !Vl)
            return !1;
        const u = "i18next.translate.boo";
        window.sessionStorage.setItem(u, "foo"),
        window.sessionStorage.removeItem(u)
    } catch {
        Vl = !1
    }
    return Vl
}
;
var nx = {
    name: "sessionStorage",
    lookup(u) {
        let {lookupSessionStorage: a} = u;
        if (a && Vm())
            return window.sessionStorage.getItem(a) || void 0
    },
    cacheUserLanguage(u, a) {
        let {lookupSessionStorage: r} = a;
        r && Vm() && window.sessionStorage.setItem(r, u)
    }
}
  , lx = {
    name: "navigator",
    lookup(u) {
        const a = [];
        if (typeof navigator < "u") {
            const {languages: r, userLanguage: o, language: c} = navigator;
            if (r)
                for (let f = 0; f < r.length; f++)
                    a.push(r[f]);
            o && a.push(o),
            c && a.push(c)
        }
        return a.length > 0 ? a : void 0
    }
}
  , ax = {
    name: "htmlTag",
    lookup(u) {
        let {htmlTag: a} = u, r;
        const o = a || (typeof document < "u" ? document.documentElement : null);
        return o && typeof o.getAttribute == "function" && (r = o.getAttribute("lang")),
        r
    }
}
  , ix = {
    name: "path",
    lookup(u) {
        let {lookupFromPathIndex: a} = u;
        if (typeof window > "u")
            return;
        const r = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
        return Array.isArray(r) ? r[typeof a == "number" ? a : 0]?.replace("/", "") : void 0
    }
}
  , ux = {
    name: "subdomain",
    lookup(u) {
        let {lookupFromSubdomainIndex: a} = u;
        const r = typeof a == "number" ? a + 1 : 1
          , o = typeof window < "u" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
        if (o)
            return o[r]
    }
};
let bg = !1;
try {
    document.cookie,
    bg = !0
} catch {}
const Sg = ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"];
bg || Sg.splice(1, 1);
const sx = () => ({
    order: Sg,
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupSessionStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"],
    convertDetectedLanguage: u => u
});
class Eg {
    constructor(a) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        this.type = "languageDetector",
        this.detectors = {},
        this.init(a, r)
    }
    init() {
        let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
            languageUtils: {}
        }
          , r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}
          , o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        this.services = a,
        this.options = $v(r, this.options || {}, sx()),
        typeof this.options.convertDetectedLanguage == "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1 && (this.options.convertDetectedLanguage = c => c.replace("-", "_")),
        this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
        this.i18nOptions = o,
        this.addDetector(Pv),
        this.addDetector(Iv),
        this.addDetector(tx),
        this.addDetector(nx),
        this.addDetector(lx),
        this.addDetector(ax),
        this.addDetector(ix),
        this.addDetector(ux),
        this.addDetector(ex)
    }
    addDetector(a) {
        return this.detectors[a.name] = a,
        this
    }
    detect() {
        let a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order
          , r = [];
        return a.forEach(o => {
            if (this.detectors[o]) {
                let c = this.detectors[o].lookup(this.options);
                c && typeof c == "string" && (c = [c]),
                c && (r = r.concat(c))
            }
        }
        ),
        r = r.filter(o => o != null && !Fv(o)).map(o => this.options.convertDetectedLanguage(o)),
        this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes ? r : r.length > 0 ? r[0] : null
    }
    cacheUserLanguage(a) {
        let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
        r && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(a) > -1 || r.forEach(o => {
            this.detectors[o] && this.detectors[o].cacheUserLanguage(a, this.options)
        }
        ))
    }
}
Eg.type = "languageDetector";
const Qm = Object.assign({})
  , Ka = {};
Object.keys(Qm).forEach(u => {
    const a = u.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
    if (a) {
        const [,r] = a
          , o = Qm[u];
        Ka[r] || (Ka[r] = {
            translation: {}
        }),
        o.default && (Ka[r].translation = {
            ...Ka[r].translation,
            ...o.default
        })
    }
}
);
et.use(Eg).use(Xv).init({
    lng: "en",
    fallbackLng: "en",
    debug: !1,
    resources: Ka,
    interpolation: {
        escapeValue: !1
    }
});
var Eo = {
    exports: {}
}
  , Va = {}
  , wo = {
    exports: {}
}
  , _o = {};
var Xm;
function rx() {
    return Xm || (Xm = 1,
    (function(u) {
        function a(L, X) {
            var te = L.length;
            L.push(X);
            e: for (; 0 < te; ) {
                var ve = te - 1 >>> 1
                  , we = L[ve];
                if (0 < c(we, X))
                    L[ve] = X,
                    L[te] = we,
                    te = ve;
                else
                    break e
            }
        }
        function r(L) {
            return L.length === 0 ? null : L[0]
        }
        function o(L) {
            if (L.length === 0)
                return null;
            var X = L[0]
              , te = L.pop();
            if (te !== X) {
                L[0] = te;
                e: for (var ve = 0, we = L.length, A = we >>> 1; ve < A; ) {
                    var q = 2 * (ve + 1) - 1
                      , K = L[q]
                      , $ = q + 1
                      , ue = L[$];
                    if (0 > c(K, te))
                        $ < we && 0 > c(ue, K) ? (L[ve] = ue,
                        L[$] = te,
                        ve = $) : (L[ve] = K,
                        L[q] = te,
                        ve = q);
                    else if ($ < we && 0 > c(ue, te))
                        L[ve] = ue,
                        L[$] = te,
                        ve = $;
                    else
                        break e
                }
            }
            return X
        }
        function c(L, X) {
            var te = L.sortIndex - X.sortIndex;
            return te !== 0 ? te : L.id - X.id
        }
        if (u.unstable_now = void 0,
        typeof performance == "object" && typeof performance.now == "function") {
            var f = performance;
            u.unstable_now = function() {
                return f.now()
            }
        } else {
            var d = Date
              , g = d.now();
            u.unstable_now = function() {
                return d.now() - g
            }
        }
        var m = []
          , p = []
          , x = 1
          , v = null
          , S = 3
          , b = !1
          , E = !1
          , O = !1
          , C = !1
          , M = typeof setTimeout == "function" ? setTimeout : null
          , U = typeof clearTimeout == "function" ? clearTimeout : null
          , V = typeof setImmediate < "u" ? setImmediate : null;
        function J(L) {
            for (var X = r(p); X !== null; ) {
                if (X.callback === null)
                    o(p);
                else if (X.startTime <= L)
                    o(p),
                    X.sortIndex = X.expirationTime,
                    a(m, X);
                else
                    break;
                X = r(p)
            }
        }
        function W(L) {
            if (O = !1,
            J(L),
            !E)
                if (r(m) !== null)
                    E = !0,
                    oe || (oe = !0,
                    k());
                else {
                    var X = r(p);
                    X !== null && Ce(W, X.startTime - L)
                }
        }
        var oe = !1
          , P = -1
          , pe = 5
          , Ee = -1;
        function Q() {
            return C ? !0 : !(u.unstable_now() - Ee < pe)
        }
        function Z() {
            if (C = !1,
            oe) {
                var L = u.unstable_now();
                Ee = L;
                var X = !0;
                try {
                    e: {
                        E = !1,
                        O && (O = !1,
                        U(P),
                        P = -1),
                        b = !0;
                        var te = S;
                        try {
                            t: {
                                for (J(L),
                                v = r(m); v !== null && !(v.expirationTime > L && Q()); ) {
                                    var ve = v.callback;
                                    if (typeof ve == "function") {
                                        v.callback = null,
                                        S = v.priorityLevel;
                                        var we = ve(v.expirationTime <= L);
                                        if (L = u.unstable_now(),
                                        typeof we == "function") {
                                            v.callback = we,
                                            J(L),
                                            X = !0;
                                            break t
                                        }
                                        v === r(m) && o(m),
                                        J(L)
                                    } else
                                        o(m);
                                    v = r(m)
                                }
                                if (v !== null)
                                    X = !0;
                                else {
                                    var A = r(p);
                                    A !== null && Ce(W, A.startTime - L),
                                    X = !1
                                }
                            }
                            break e
                        } finally {
                            v = null,
                            S = te,
                            b = !1
                        }
                        X = void 0
                    }
                } finally {
                    X ? k() : oe = !1
                }
            }
        }
        var k;
        if (typeof V == "function")
            k = function() {
                V(Z)
            }
            ;
        else if (typeof MessageChannel < "u") {
            var le = new MessageChannel
              , ce = le.port2;
            le.port1.onmessage = Z,
            k = function() {
                ce.postMessage(null)
            }
        } else
            k = function() {
                M(Z, 0)
            }
            ;
        function Ce(L, X) {
            P = M(function() {
                L(u.unstable_now())
            }, X)
        }
        u.unstable_IdlePriority = 5,
        u.unstable_ImmediatePriority = 1,
        u.unstable_LowPriority = 4,
        u.unstable_NormalPriority = 3,
        u.unstable_Profiling = null,
        u.unstable_UserBlockingPriority = 2,
        u.unstable_cancelCallback = function(L) {
            L.callback = null
        }
        ,
        u.unstable_forceFrameRate = function(L) {
            0 > L || 125 < L ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : pe = 0 < L ? Math.floor(1e3 / L) : 5
        }
        ,
        u.unstable_getCurrentPriorityLevel = function() {
            return S
        }
        ,
        u.unstable_next = function(L) {
            switch (S) {
            case 1:
            case 2:
            case 3:
                var X = 3;
                break;
            default:
                X = S
            }
            var te = S;
            S = X;
            try {
                return L()
            } finally {
                S = te
            }
        }
        ,
        u.unstable_requestPaint = function() {
            C = !0
        }
        ,
        u.unstable_runWithPriority = function(L, X) {
            switch (L) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                L = 3
            }
            var te = S;
            S = L;
            try {
                return X()
            } finally {
                S = te
            }
        }
        ,
        u.unstable_scheduleCallback = function(L, X, te) {
            var ve = u.unstable_now();
            switch (typeof te == "object" && te !== null ? (te = te.delay,
            te = typeof te == "number" && 0 < te ? ve + te : ve) : te = ve,
            L) {
            case 1:
                var we = -1;
                break;
            case 2:
                we = 250;
                break;
            case 5:
                we = 1073741823;
                break;
            case 4:
                we = 1e4;
                break;
            default:
                we = 5e3
            }
            return we = te + we,
            L = {
                id: x++,
                callback: X,
                priorityLevel: L,
                startTime: te,
                expirationTime: we,
                sortIndex: -1
            },
            te > ve ? (L.sortIndex = te,
            a(p, L),
            r(m) === null && L === r(p) && (O ? (U(P),
            P = -1) : O = !0,
            Ce(W, te - ve))) : (L.sortIndex = we,
            a(m, L),
            E || b || (E = !0,
            oe || (oe = !0,
            k()))),
            L
        }
        ,
        u.unstable_shouldYield = Q,
        u.unstable_wrapCallback = function(L) {
            var X = S;
            return function() {
                var te = S;
                S = X;
                try {
                    return L.apply(this, arguments)
                } finally {
                    S = te
                }
            }
        }
    }
    )(_o)),
    _o
}
var Zm;
function ox() {
    return Zm || (Zm = 1,
    wo.exports = rx()),
    wo.exports
}
var Co = {
    exports: {}
}
  , tt = {};
var Km;
function cx() {
    if (Km)
        return tt;
    Km = 1;
    var u = Bo();
    function a(m) {
        var p = "https://react.dev/errors/" + m;
        if (1 < arguments.length) {
            p += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var x = 2; x < arguments.length; x++)
                p += "&args[]=" + encodeURIComponent(arguments[x])
        }
        return "Minified React error #" + m + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function r() {}
    var o = {
        d: {
            f: r,
            r: function() {
                throw Error(a(522))
            },
            D: r,
            C: r,
            L: r,
            m: r,
            X: r,
            S: r,
            M: r
        },
        p: 0,
        findDOMNode: null
    }
      , c = Symbol.for("react.portal");
    function f(m, p, x) {
        var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: c,
            key: v == null ? null : "" + v,
            children: m,
            containerInfo: p,
            implementation: x
        }
    }
    var d = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function g(m, p) {
        if (m === "font")
            return "";
        if (typeof p == "string")
            return p === "use-credentials" ? p : ""
    }
    return tt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o,
    tt.createPortal = function(m, p) {
        var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
            throw Error(a(299));
        return f(m, p, null, x)
    }
    ,
    tt.flushSync = function(m) {
        var p = d.T
          , x = o.p;
        try {
            if (d.T = null,
            o.p = 2,
            m)
                return m()
        } finally {
            d.T = p,
            o.p = x,
            o.d.f()
        }
    }
    ,
    tt.preconnect = function(m, p) {
        typeof m == "string" && (p ? (p = p.crossOrigin,
        p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null,
        o.d.C(m, p))
    }
    ,
    tt.prefetchDNS = function(m) {
        typeof m == "string" && o.d.D(m)
    }
    ,
    tt.preinit = function(m, p) {
        if (typeof m == "string" && p && typeof p.as == "string") {
            var x = p.as
              , v = g(x, p.crossOrigin)
              , S = typeof p.integrity == "string" ? p.integrity : void 0
              , b = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
            x === "style" ? o.d.S(m, typeof p.precedence == "string" ? p.precedence : void 0, {
                crossOrigin: v,
                integrity: S,
                fetchPriority: b
            }) : x === "script" && o.d.X(m, {
                crossOrigin: v,
                integrity: S,
                fetchPriority: b,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0
            })
        }
    }
    ,
    tt.preinitModule = function(m, p) {
        if (typeof m == "string")
            if (typeof p == "object" && p !== null) {
                if (p.as == null || p.as === "script") {
                    var x = g(p.as, p.crossOrigin);
                    o.d.M(m, {
                        crossOrigin: x,
                        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
                        nonce: typeof p.nonce == "string" ? p.nonce : void 0
                    })
                }
            } else
                p == null && o.d.M(m)
    }
    ,
    tt.preload = function(m, p) {
        if (typeof m == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
            var x = p.as
              , v = g(x, p.crossOrigin);
            o.d.L(m, x, {
                crossOrigin: v,
                integrity: typeof p.integrity == "string" ? p.integrity : void 0,
                nonce: typeof p.nonce == "string" ? p.nonce : void 0,
                type: typeof p.type == "string" ? p.type : void 0,
                fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
                referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
                imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
                imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
                media: typeof p.media == "string" ? p.media : void 0
            })
        }
    }
    ,
    tt.preloadModule = function(m, p) {
        if (typeof m == "string")
            if (p) {
                var x = g(p.as, p.crossOrigin);
                o.d.m(m, {
                    as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
                    crossOrigin: x,
                    integrity: typeof p.integrity == "string" ? p.integrity : void 0
                })
            } else
                o.d.m(m)
    }
    ,
    tt.requestFormReset = function(m) {
        o.d.r(m)
    }
    ,
    tt.unstable_batchedUpdates = function(m, p) {
        return m(p)
    }
    ,
    tt.useFormState = function(m, p, x) {
        return d.H.useFormState(m, p, x)
    }
    ,
    tt.useFormStatus = function() {
        return d.H.useHostTransitionStatus()
    }
    ,
    tt.version = "19.2.4",
    tt
}
var km;
function fx() {
    if (km)
        return Co.exports;
    km = 1;
    function u() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)
            } catch (a) {
                console.error(a)
            }
    }
    return u(),
    Co.exports = cx(),
    Co.exports
}
var Jm;
function dx() {
    if (Jm)
        return Va;
    Jm = 1;
    var u = ox()
      , a = Bo()
      , r = fx();
    function o(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var n = 2; n < arguments.length; n++)
                t += "&args[]=" + encodeURIComponent(arguments[n])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }
    function c(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }
    function f(e) {
        var t = e
          , n = e;
        if (e.alternate)
            for (; t.return; )
                t = t.return;
        else {
            e = t;
            do
                t = e,
                (t.flags & 4098) !== 0 && (n = t.return),
                e = t.return;
            while (e)
        }
        return t.tag === 3 ? n : null
    }
    function d(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function g(e) {
        if (e.tag === 31) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate,
            e !== null && (t = e.memoizedState)),
            t !== null)
                return t.dehydrated
        }
        return null
    }
    function m(e) {
        if (f(e) !== e)
            throw Error(o(188))
    }
    function p(e) {
        var t = e.alternate;
        if (!t) {
            if (t = f(e),
            t === null)
                throw Error(o(188));
            return t !== e ? null : e
        }
        for (var n = e, l = t; ; ) {
            var i = n.return;
            if (i === null)
                break;
            var s = i.alternate;
            if (s === null) {
                if (l = i.return,
                l !== null) {
                    n = l;
                    continue
                }
                break
            }
            if (i.child === s.child) {
                for (s = i.child; s; ) {
                    if (s === n)
                        return m(i),
                        e;
                    if (s === l)
                        return m(i),
                        t;
                    s = s.sibling
                }
                throw Error(o(188))
            }
            if (n.return !== l.return)
                n = i,
                l = s;
            else {
                for (var h = !1, y = i.child; y; ) {
                    if (y === n) {
                        h = !0,
                        n = i,
                        l = s;
                        break
                    }
                    if (y === l) {
                        h = !0,
                        l = i,
                        n = s;
                        break
                    }
                    y = y.sibling
                }
                if (!h) {
                    for (y = s.child; y; ) {
                        if (y === n) {
                            h = !0,
                            n = s,
                            l = i;
                            break
                        }
                        if (y === l) {
                            h = !0,
                            l = s,
                            n = i;
                            break
                        }
                        y = y.sibling
                    }
                    if (!h)
                        throw Error(o(189))
                }
            }
            if (n.alternate !== l)
                throw Error(o(190))
        }
        if (n.tag !== 3)
            throw Error(o(188));
        return n.stateNode.current === n ? e : t
    }
    function x(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e;
        for (e = e.child; e !== null; ) {
            if (t = x(e),
            t !== null)
                return t;
            e = e.sibling
        }
        return null
    }
    var v = Object.assign
      , S = Symbol.for("react.element")
      , b = Symbol.for("react.transitional.element")
      , E = Symbol.for("react.portal")
      , O = Symbol.for("react.fragment")
      , C = Symbol.for("react.strict_mode")
      , M = Symbol.for("react.profiler")
      , U = Symbol.for("react.consumer")
      , V = Symbol.for("react.context")
      , J = Symbol.for("react.forward_ref")
      , W = Symbol.for("react.suspense")
      , oe = Symbol.for("react.suspense_list")
      , P = Symbol.for("react.memo")
      , pe = Symbol.for("react.lazy")
      , Ee = Symbol.for("react.activity")
      , Q = Symbol.for("react.memo_cache_sentinel")
      , Z = Symbol.iterator;
    function k(e) {
        return e === null || typeof e != "object" ? null : (e = Z && e[Z] || e["@@iterator"],
        typeof e == "function" ? e : null)
    }
    var le = Symbol.for("react.client.reference");
    function ce(e) {
        if (e == null)
            return null;
        if (typeof e == "function")
            return e.$$typeof === le ? null : e.displayName || e.name || null;
        if (typeof e == "string")
            return e;
        switch (e) {
        case O:
            return "Fragment";
        case M:
            return "Profiler";
        case C:
            return "StrictMode";
        case W:
            return "Suspense";
        case oe:
            return "SuspenseList";
        case Ee:
            return "Activity"
        }
        if (typeof e == "object")
            switch (e.$$typeof) {
            case E:
                return "Portal";
            case V:
                return e.displayName || "Context";
            case U:
                return (e._context.displayName || "Context") + ".Consumer";
            case J:
                var t = e.render;
                return e = e.displayName,
                e || (e = t.displayName || t.name || "",
                e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
                e;
            case P:
                return t = e.displayName || null,
                t !== null ? t : ce(e.type) || "Memo";
            case pe:
                t = e._payload,
                e = e._init;
                try {
                    return ce(e(t))
                } catch {}
            }
        return null
    }
    var Ce = Array.isArray
      , L = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , X = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
      , te = {
        pending: !1,
        data: null,
        method: null,
        action: null
    }
      , ve = []
      , we = -1;
    function A(e) {
        return {
            current: e
        }
    }
    function q(e) {
        0 > we || (e.current = ve[we],
        ve[we] = null,
        we--)
    }
    function K(e, t) {
        we++,
        ve[we] = e.current,
        e.current = t
    }
    var $ = A(null)
      , ue = A(null)
      , fe = A(null)
      , _e = A(null);
    function nt(e, t) {
        switch (K(fe, t),
        K(ue, e),
        K($, null),
        t.nodeType) {
        case 9:
        case 11:
            e = (e = t.documentElement) && (e = e.namespaceURI) ? gh(e) : 0;
            break;
        default:
            if (e = t.tagName,
            t = t.namespaceURI)
                t = gh(t),
                e = ph(t, e);
            else
                switch (e) {
                case "svg":
                    e = 1;
                    break;
                case "math":
                    e = 2;
                    break;
                default:
                    e = 0
                }
        }
        q($),
        K($, e)
    }
    function Be() {
        q($),
        q(ue),
        q(fe)
    }
    function Zl(e) {
        e.memoizedState !== null && K(_e, e);
        var t = $.current
          , n = ph(t, e.type);
        t !== n && (K(ue, e),
        K($, n))
    }
    function ti(e) {
        ue.current === e && (q($),
        q(ue)),
        _e.current === e && (q(_e),
        za._currentValue = te)
    }
    var Hu, Xo;
    function Bn(e) {
        if (Hu === void 0)
            try {
                throw Error()
            } catch (n) {
                var t = n.stack.trim().match(/\n( *(at )?)/);
                Hu = t && t[1] || "",
                Xo = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : ""
            }
        return `
` + Hu + e + Xo
    }
    var qu = !1;
    function Gu(e, t) {
        if (!e || qu)
            return "";
        qu = !0;
        var n = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var l = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var Y = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(Y.prototype, "props", {
                                set: function() {
                                    throw Error()
                                }
                            }),
                            typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(Y, [])
                                } catch (z) {
                                    var D = z
                                }
                                Reflect.construct(e, [], Y)
                            } else {
                                try {
                                    Y.call()
                                } catch (z) {
                                    D = z
                                }
                                e.call(Y.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (z) {
                                D = z
                            }
                            (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {})
                        }
                    } catch (z) {
                        if (z && D && typeof z.stack == "string")
                            return [z.stack, D.stack]
                    }
                    return [null, null]
                }
            };
            l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var i = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
            i && i.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var s = l.DetermineComponentFrameRoot()
              , h = s[0]
              , y = s[1];
            if (h && y) {
                var _ = h.split(`
`)
                  , j = y.split(`
`);
                for (i = l = 0; l < _.length && !_[l].includes("DetermineComponentFrameRoot"); )
                    l++;
                for (; i < j.length && !j[i].includes("DetermineComponentFrameRoot"); )
                    i++;
                if (l === _.length || i === j.length)
                    for (l = _.length - 1,
                    i = j.length - 1; 1 <= l && 0 <= i && _[l] !== j[i]; )
                        i--;
                for (; 1 <= l && 0 <= i; l--,
                i--)
                    if (_[l] !== j[i]) {
                        if (l !== 1 || i !== 1)
                            do
                                if (l--,
                                i--,
                                0 > i || _[l] !== j[i]) {
                                    var B = `
` + _[l].replace(" at new ", " at ");
                                    return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)),
                                    B
                                }
                            while (1 <= l && 0 <= i);
                        break
                    }
            }
        } finally {
            qu = !1,
            Error.prepareStackTrace = n
        }
        return (n = e ? e.displayName || e.name : "") ? Bn(n) : ""
    }
    function Kg(e, t) {
        switch (e.tag) {
        case 26:
        case 27:
        case 5:
            return Bn(e.type);
        case 16:
            return Bn("Lazy");
        case 13:
            return e.child !== t && t !== null ? Bn("Suspense Fallback") : Bn("Suspense");
        case 19:
            return Bn("SuspenseList");
        case 0:
        case 15:
            return Gu(e.type, !1);
        case 11:
            return Gu(e.type.render, !1);
        case 1:
            return Gu(e.type, !0);
        case 31:
            return Bn("Activity");
        default:
            return ""
        }
    }
    function Zo(e) {
        try {
            var t = ""
              , n = null;
            do
                t += Kg(e, n),
                n = e,
                e = e.return;
            while (e);
            return t
        } catch (l) {
            return `
Error generating stack: ` + l.message + `
` + l.stack
        }
    }
    var Yu = Object.prototype.hasOwnProperty
      , Vu = u.unstable_scheduleCallback
      , Qu = u.unstable_cancelCallback
      , kg = u.unstable_shouldYield
      , Jg = u.unstable_requestPaint
      , ft = u.unstable_now
      , $g = u.unstable_getCurrentPriorityLevel
      , Ko = u.unstable_ImmediatePriority
      , ko = u.unstable_UserBlockingPriority
      , ni = u.unstable_NormalPriority
      , Fg = u.unstable_LowPriority
      , Jo = u.unstable_IdlePriority
      , Wg = u.log
      , Pg = u.unstable_setDisableYieldValue
      , Kl = null
      , dt = null;
    function fn(e) {
        if (typeof Wg == "function" && Pg(e),
        dt && typeof dt.setStrictMode == "function")
            try {
                dt.setStrictMode(Kl, e)
            } catch {}
    }
    var ht = Math.clz32 ? Math.clz32 : tp
      , Ig = Math.log
      , ep = Math.LN2;
    function tp(e) {
        return e >>>= 0,
        e === 0 ? 32 : 31 - (Ig(e) / ep | 0) | 0
    }
    var li = 256
      , ai = 262144
      , ii = 4194304;
    function Hn(e) {
        var t = e & 42;
        if (t !== 0)
            return t;
        switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
            return 64;
        case 128:
            return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
            return e & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return e & 62914560;
        case 67108864:
            return 67108864;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 0;
        default:
            return e
        }
    }
    function ui(e, t, n) {
        var l = e.pendingLanes;
        if (l === 0)
            return 0;
        var i = 0
          , s = e.suspendedLanes
          , h = e.pingedLanes;
        e = e.warmLanes;
        var y = l & 134217727;
        return y !== 0 ? (l = y & ~s,
        l !== 0 ? i = Hn(l) : (h &= y,
        h !== 0 ? i = Hn(h) : n || (n = y & ~e,
        n !== 0 && (i = Hn(n))))) : (y = l & ~s,
        y !== 0 ? i = Hn(y) : h !== 0 ? i = Hn(h) : n || (n = l & ~e,
        n !== 0 && (i = Hn(n)))),
        i === 0 ? 0 : t !== 0 && t !== i && (t & s) === 0 && (s = i & -i,
        n = t & -t,
        s >= n || s === 32 && (n & 4194048) !== 0) ? t : i
    }
    function kl(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }
    function np(e, t) {
        switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
            return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
        }
    }
    function $o() {
        var e = ii;
        return ii <<= 1,
        (ii & 62914560) === 0 && (ii = 4194304),
        e
    }
    function Xu(e) {
        for (var t = [], n = 0; 31 > n; n++)
            t.push(e);
        return t
    }
    function Jl(e, t) {
        e.pendingLanes |= t,
        t !== 268435456 && (e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0)
    }
    function lp(e, t, n, l, i, s) {
        var h = e.pendingLanes;
        e.pendingLanes = n,
        e.suspendedLanes = 0,
        e.pingedLanes = 0,
        e.warmLanes = 0,
        e.expiredLanes &= n,
        e.entangledLanes &= n,
        e.errorRecoveryDisabledLanes &= n,
        e.shellSuspendCounter = 0;
        var y = e.entanglements
          , _ = e.expirationTimes
          , j = e.hiddenUpdates;
        for (n = h & ~n; 0 < n; ) {
            var B = 31 - ht(n)
              , Y = 1 << B;
            y[B] = 0,
            _[B] = -1;
            var D = j[B];
            if (D !== null)
                for (j[B] = null,
                B = 0; B < D.length; B++) {
                    var z = D[B];
                    z !== null && (z.lane &= -536870913)
                }
            n &= ~Y
        }
        l !== 0 && Fo(e, l, 0),
        s !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(h & ~t))
    }
    function Fo(e, t, n) {
        e.pendingLanes |= t,
        e.suspendedLanes &= ~t;
        var l = 31 - ht(t);
        e.entangledLanes |= t,
        e.entanglements[l] = e.entanglements[l] | 1073741824 | n & 261930
    }
    function Wo(e, t) {
        var n = e.entangledLanes |= t;
        for (e = e.entanglements; n; ) {
            var l = 31 - ht(n)
              , i = 1 << l;
            i & t | e[l] & t && (e[l] |= t),
            n &= ~i
        }
    }
    function Po(e, t) {
        var n = t & -t;
        return n = (n & 42) !== 0 ? 1 : Zu(n),
        (n & (e.suspendedLanes | t)) !== 0 ? 0 : n
    }
    function Zu(e) {
        switch (e) {
        case 2:
            e = 1;
            break;
        case 8:
            e = 4;
            break;
        case 32:
            e = 16;
            break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
            e = 128;
            break;
        case 268435456:
            e = 134217728;
            break;
        default:
            e = 0
        }
        return e
    }
    function Ku(e) {
        return e &= -e,
        2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }
    function Io() {
        var e = X.p;
        return e !== 0 ? e : (e = window.event,
        e === void 0 ? 32 : qh(e.type))
    }
    function ec(e, t) {
        var n = X.p;
        try {
            return X.p = e,
            t()
        } finally {
            X.p = n
        }
    }
    var dn = Math.random().toString(36).slice(2)
      , $e = "__reactFiber$" + dn
      , at = "__reactProps$" + dn
      , nl = "__reactContainer$" + dn
      , ku = "__reactEvents$" + dn
      , ap = "__reactListeners$" + dn
      , ip = "__reactHandles$" + dn
      , tc = "__reactResources$" + dn
      , $l = "__reactMarker$" + dn;
    function Ju(e) {
        delete e[$e],
        delete e[at],
        delete e[ku],
        delete e[ap],
        delete e[ip]
    }
    function ll(e) {
        var t = e[$e];
        if (t)
            return t;
        for (var n = e.parentNode; n; ) {
            if (t = n[nl] || n[$e]) {
                if (n = t.alternate,
                t.child !== null || n !== null && n.child !== null)
                    for (e = wh(e); e !== null; ) {
                        if (n = e[$e])
                            return n;
                        e = wh(e)
                    }
                return t
            }
            e = n,
            n = e.parentNode
        }
        return null
    }
    function al(e) {
        if (e = e[$e] || e[nl]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
                return e
        }
        return null
    }
    function Fl(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6)
            return e.stateNode;
        throw Error(o(33))
    }
    function il(e) {
        var t = e[tc];
        return t || (t = e[tc] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }),
        t
    }
    function Ke(e) {
        e[$l] = !0
    }
    var nc = new Set
      , lc = {};
    function qn(e, t) {
        ul(e, t),
        ul(e + "Capture", t)
    }
    function ul(e, t) {
        for (lc[e] = t,
        e = 0; e < t.length; e++)
            nc.add(t[e])
    }
    var up = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$")
      , ac = {}
      , ic = {};
    function sp(e) {
        return Yu.call(ic, e) ? !0 : Yu.call(ac, e) ? !1 : up.test(e) ? ic[e] = !0 : (ac[e] = !0,
        !1)
    }
    function si(e, t, n) {
        if (sp(t))
            if (n === null)
                e.removeAttribute(t);
            else {
                switch (typeof n) {
                case "undefined":
                case "function":
                case "symbol":
                    e.removeAttribute(t);
                    return;
                case "boolean":
                    var l = t.toLowerCase().slice(0, 5);
                    if (l !== "data-" && l !== "aria-") {
                        e.removeAttribute(t);
                        return
                    }
                }
                e.setAttribute(t, "" + n)
            }
    }
    function ri(e, t, n) {
        if (n === null)
            e.removeAttribute(t);
        else {
            switch (typeof n) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(t);
                return
            }
            e.setAttribute(t, "" + n)
        }
    }
    function Qt(e, t, n, l) {
        if (l === null)
            e.removeAttribute(n);
        else {
            switch (typeof l) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
                e.removeAttribute(n);
                return
            }
            e.setAttributeNS(t, n, "" + l)
        }
    }
    function St(e) {
        switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
        }
    }
    function uc(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }
    function rp(e, t, n) {
        var l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
            var i = l.get
              , s = l.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return i.call(this)
                },
                set: function(h) {
                    n = "" + h,
                    s.call(this, h)
                }
            }),
            Object.defineProperty(e, t, {
                enumerable: l.enumerable
            }),
            {
                getValue: function() {
                    return n
                },
                setValue: function(h) {
                    n = "" + h
                },
                stopTracking: function() {
                    e._valueTracker = null,
                    delete e[t]
                }
            }
        }
    }
    function $u(e) {
        if (!e._valueTracker) {
            var t = uc(e) ? "checked" : "value";
            e._valueTracker = rp(e, t, "" + e[t])
        }
    }
    function sc(e) {
        if (!e)
            return !1;
        var t = e._valueTracker;
        if (!t)
            return !0;
        var n = t.getValue()
          , l = "";
        return e && (l = uc(e) ? e.checked ? "true" : "false" : e.value),
        e = l,
        e !== n ? (t.setValue(e),
        !0) : !1
    }
    function oi(e) {
        if (e = e || (typeof document < "u" ? document : void 0),
        typeof e > "u")
            return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var op = /[\n"\\]/g;
    function Et(e) {
        return e.replace(op, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }
    function Fu(e, t, n, l, i, s, h, y) {
        e.name = "",
        h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.type = h : e.removeAttribute("type"),
        t != null ? h === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + St(t)) : e.value !== "" + St(t) && (e.value = "" + St(t)) : h !== "submit" && h !== "reset" || e.removeAttribute("value"),
        t != null ? Wu(e, h, St(t)) : n != null ? Wu(e, h, St(n)) : l != null && e.removeAttribute("value"),
        i == null && s != null && (e.defaultChecked = !!s),
        i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"),
        y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? e.name = "" + St(y) : e.removeAttribute("name")
    }
    function rc(e, t, n, l, i, s, h, y) {
        if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s),
        t != null || n != null) {
            if (!(s !== "submit" && s !== "reset" || t != null)) {
                $u(e);
                return
            }
            n = n != null ? "" + St(n) : "",
            t = t != null ? "" + St(t) : n,
            y || t === e.value || (e.value = t),
            e.defaultValue = t
        }
        l = l ?? i,
        l = typeof l != "function" && typeof l != "symbol" && !!l,
        e.checked = y ? e.checked : !!l,
        e.defaultChecked = !!l,
        h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.name = h),
        $u(e)
    }
    function Wu(e, t, n) {
        t === "number" && oi(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n)
    }
    function sl(e, t, n, l) {
        if (e = e.options,
        t) {
            t = {};
            for (var i = 0; i < n.length; i++)
                t["$" + n[i]] = !0;
            for (n = 0; n < e.length; n++)
                i = t.hasOwnProperty("$" + e[n].value),
                e[n].selected !== i && (e[n].selected = i),
                i && l && (e[n].defaultSelected = !0)
        } else {
            for (n = "" + St(n),
            t = null,
            i = 0; i < e.length; i++) {
                if (e[i].value === n) {
                    e[i].selected = !0,
                    l && (e[i].defaultSelected = !0);
                    return
                }
                t !== null || e[i].disabled || (t = e[i])
            }
            t !== null && (t.selected = !0)
        }
    }
    function oc(e, t, n) {
        if (t != null && (t = "" + St(t),
        t !== e.value && (e.value = t),
        n == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = n != null ? "" + St(n) : ""
    }
    function cc(e, t, n, l) {
        if (t == null) {
            if (l != null) {
                if (n != null)
                    throw Error(o(92));
                if (Ce(l)) {
                    if (1 < l.length)
                        throw Error(o(93));
                    l = l[0]
                }
                n = l
            }
            n == null && (n = ""),
            t = n
        }
        n = St(t),
        e.defaultValue = n,
        l = e.textContent,
        l === n && l !== "" && l !== null && (e.value = l),
        $u(e)
    }
    function rl(e, t) {
        if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && n.nodeType === 3) {
                n.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var cp = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
    function fc(e, t, n) {
        var l = t.indexOf("--") === 0;
        n == null || typeof n == "boolean" || n === "" ? l ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : l ? e.setProperty(t, n) : typeof n != "number" || n === 0 || cp.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px"
    }
    function dc(e, t, n) {
        if (t != null && typeof t != "object")
            throw Error(o(62));
        if (e = e.style,
        n != null) {
            for (var l in n)
                !n.hasOwnProperty(l) || t != null && t.hasOwnProperty(l) || (l.indexOf("--") === 0 ? e.setProperty(l, "") : l === "float" ? e.cssFloat = "" : e[l] = "");
            for (var i in t)
                l = t[i],
                t.hasOwnProperty(i) && n[i] !== l && fc(e, i, l)
        } else
            for (var s in t)
                t.hasOwnProperty(s) && fc(e, s, t[s])
    }
    function Pu(e) {
        if (e.indexOf("-") === -1)
            return !1;
        switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
        }
    }
    var fp = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]])
      , dp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function ci(e) {
        return dp.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }
    function Xt() {}
    var Iu = null;
    function es(e) {
        return e = e.target || e.srcElement || window,
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
    }
    var ol = null
      , cl = null;
    function hc(e) {
        var t = al(e);
        if (t && (e = t.stateNode)) {
            var n = e[at] || null;
            e: switch (e = t.stateNode,
            t.type) {
            case "input":
                if (Fu(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name),
                t = n.name,
                n.type === "radio" && t != null) {
                    for (n = e; n.parentNode; )
                        n = n.parentNode;
                    for (n = n.querySelectorAll('input[name="' + Et("" + t) + '"][type="radio"]'),
                    t = 0; t < n.length; t++) {
                        var l = n[t];
                        if (l !== e && l.form === e.form) {
                            var i = l[at] || null;
                            if (!i)
                                throw Error(o(90));
                            Fu(l, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name)
                        }
                    }
                    for (t = 0; t < n.length; t++)
                        l = n[t],
                        l.form === e.form && sc(l)
                }
                break e;
            case "textarea":
                oc(e, n.value, n.defaultValue);
                break e;
            case "select":
                t = n.value,
                t != null && sl(e, !!n.multiple, t, !1)
            }
        }
    }
    var ts = !1;
    function mc(e, t, n) {
        if (ts)
            return e(t, n);
        ts = !0;
        try {
            var l = e(t);
            return l
        } finally {
            if (ts = !1,
            (ol !== null || cl !== null) && (Wi(),
            ol && (t = ol,
            e = cl,
            cl = ol = null,
            hc(t),
            e)))
                for (t = 0; t < e.length; t++)
                    hc(e[t])
        }
    }
    function Wl(e, t) {
        var n = e.stateNode;
        if (n === null)
            return null;
        var l = n[at] || null;
        if (l === null)
            return null;
        n = l[t];
        e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (l = !l.disabled) || (e = e.type,
            l = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
            e = !l;
            break e;
        default:
            e = !1
        }
        if (e)
            return null;
        if (n && typeof n != "function")
            throw Error(o(231, t, typeof n));
        return n
    }
    var Zt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
      , ns = !1;
    if (Zt)
        try {
            var Pl = {};
            Object.defineProperty(Pl, "passive", {
                get: function() {
                    ns = !0
                }
            }),
            window.addEventListener("test", Pl, Pl),
            window.removeEventListener("test", Pl, Pl)
        } catch {
            ns = !1
        }
    var hn = null
      , ls = null
      , fi = null;
    function gc() {
        if (fi)
            return fi;
        var e, t = ls, n = t.length, l, i = "value"in hn ? hn.value : hn.textContent, s = i.length;
        for (e = 0; e < n && t[e] === i[e]; e++)
            ;
        var h = n - e;
        for (l = 1; l <= h && t[n - l] === i[s - l]; l++)
            ;
        return fi = i.slice(e, 1 < l ? 1 - l : void 0)
    }
    function di(e) {
        var t = e.keyCode;
        return "charCode"in e ? (e = e.charCode,
        e === 0 && t === 13 && (e = 13)) : e = t,
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
    }
    function hi() {
        return !0
    }
    function pc() {
        return !1
    }
    function it(e) {
        function t(n, l, i, s, h) {
            this._reactName = n,
            this._targetInst = i,
            this.type = l,
            this.nativeEvent = s,
            this.target = h,
            this.currentTarget = null;
            for (var y in e)
                e.hasOwnProperty(y) && (n = e[y],
                this[y] = n ? n(s) : s[y]);
            return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? hi : pc,
            this.isPropagationStopped = pc,
            this
        }
        return v(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var n = this.nativeEvent;
                n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
                this.isDefaultPrevented = hi)
            },
            stopPropagation: function() {
                var n = this.nativeEvent;
                n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
                this.isPropagationStopped = hi)
            },
            persist: function() {},
            isPersistent: hi
        }),
        t
    }
    var Gn = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    }, mi = it(Gn), Il = v({}, Gn, {
        view: 0,
        detail: 0
    }), hp = it(Il), as, is, ea, gi = v({}, Il, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ss,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX"in e ? e.movementX : (e !== ea && (ea && e.type === "mousemove" ? (as = e.screenX - ea.screenX,
            is = e.screenY - ea.screenY) : is = as = 0,
            ea = e),
            as)
        },
        movementY: function(e) {
            return "movementY"in e ? e.movementY : is
        }
    }), yc = it(gi), mp = v({}, gi, {
        dataTransfer: 0
    }), gp = it(mp), pp = v({}, Il, {
        relatedTarget: 0
    }), us = it(pp), yp = v({}, Gn, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }), vp = it(yp), xp = v({}, Gn, {
        clipboardData: function(e) {
            return "clipboardData"in e ? e.clipboardData : window.clipboardData
        }
    }), bp = it(xp), Sp = v({}, Gn, {
        data: 0
    }), vc = it(Sp), Ep = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    }, wp = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    }, _p = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };
    function Cp(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = _p[e]) ? !!t[e] : !1
    }
    function ss() {
        return Cp
    }
    var Ap = v({}, Il, {
        key: function(e) {
            if (e.key) {
                var t = Ep[e.key] || e.key;
                if (t !== "Unidentified")
                    return t
            }
            return e.type === "keypress" ? (e = di(e),
            e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wp[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ss,
        charCode: function(e) {
            return e.type === "keypress" ? di(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? di(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    })
      , Tp = it(Ap)
      , Op = v({}, gi, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    })
      , xc = it(Op)
      , Np = v({}, Il, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ss
    })
      , Rp = it(Np)
      , jp = v({}, Gn, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    })
      , Dp = it(jp)
      , Mp = v({}, gi, {
        deltaX: function(e) {
            return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    })
      , zp = it(Mp)
      , Lp = v({}, Gn, {
        newState: 0,
        oldState: 0
    })
      , Up = it(Lp)
      , Bp = [9, 13, 27, 32]
      , rs = Zt && "CompositionEvent"in window
      , ta = null;
    Zt && "documentMode"in document && (ta = document.documentMode);
    var Hp = Zt && "TextEvent"in window && !ta
      , bc = Zt && (!rs || ta && 8 < ta && 11 >= ta)
      , Sc = " "
      , Ec = !1;
    function wc(e, t) {
        switch (e) {
        case "keyup":
            return Bp.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
        }
    }
    function _c(e) {
        return e = e.detail,
        typeof e == "object" && "data"in e ? e.data : null
    }
    var fl = !1;
    function qp(e, t) {
        switch (e) {
        case "compositionend":
            return _c(t);
        case "keypress":
            return t.which !== 32 ? null : (Ec = !0,
            Sc);
        case "textInput":
            return e = t.data,
            e === Sc && Ec ? null : e;
        default:
            return null
        }
    }
    function Gp(e, t) {
        if (fl)
            return e === "compositionend" || !rs && wc(e, t) ? (e = gc(),
            fi = ls = hn = null,
            fl = !1,
            e) : null;
        switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length)
                    return t.char;
                if (t.which)
                    return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return bc && t.locale !== "ko" ? null : t.data;
        default:
            return null
        }
    }
    var Yp = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };
    function Cc(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Yp[e.type] : t === "textarea"
    }
    function Ac(e, t, n, l) {
        ol ? cl ? cl.push(l) : cl = [l] : ol = l,
        t = au(t, "onChange"),
        0 < t.length && (n = new mi("onChange","change",null,n,l),
        e.push({
            event: n,
            listeners: t
        }))
    }
    var na = null
      , la = null;
    function Vp(e) {
        oh(e, 0)
    }
    function pi(e) {
        var t = Fl(e);
        if (sc(t))
            return e
    }
    function Tc(e, t) {
        if (e === "change")
            return t
    }
    var Oc = !1;
    if (Zt) {
        var os;
        if (Zt) {
            var cs = "oninput"in document;
            if (!cs) {
                var Nc = document.createElement("div");
                Nc.setAttribute("oninput", "return;"),
                cs = typeof Nc.oninput == "function"
            }
            os = cs
        } else
            os = !1;
        Oc = os && (!document.documentMode || 9 < document.documentMode)
    }
    function Rc() {
        na && (na.detachEvent("onpropertychange", jc),
        la = na = null)
    }
    function jc(e) {
        if (e.propertyName === "value" && pi(la)) {
            var t = [];
            Ac(t, la, e, es(e)),
            mc(Vp, t)
        }
    }
    function Qp(e, t, n) {
        e === "focusin" ? (Rc(),
        na = t,
        la = n,
        na.attachEvent("onpropertychange", jc)) : e === "focusout" && Rc()
    }
    function Xp(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown")
            return pi(la)
    }
    function Zp(e, t) {
        if (e === "click")
            return pi(t)
    }
    function Kp(e, t) {
        if (e === "input" || e === "change")
            return pi(t)
    }
    function kp(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var mt = typeof Object.is == "function" ? Object.is : kp;
    function aa(e, t) {
        if (mt(e, t))
            return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null)
            return !1;
        var n = Object.keys(e)
          , l = Object.keys(t);
        if (n.length !== l.length)
            return !1;
        for (l = 0; l < n.length; l++) {
            var i = n[l];
            if (!Yu.call(t, i) || !mt(e[i], t[i]))
                return !1
        }
        return !0
    }
    function Dc(e) {
        for (; e && e.firstChild; )
            e = e.firstChild;
        return e
    }
    function Mc(e, t) {
        var n = Dc(e);
        e = 0;
        for (var l; n; ) {
            if (n.nodeType === 3) {
                if (l = e + n.textContent.length,
                e <= t && l >= t)
                    return {
                        node: n,
                        offset: t - e
                    };
                e = l
            }
            e: {
                for (; n; ) {
                    if (n.nextSibling) {
                        n = n.nextSibling;
                        break e
                    }
                    n = n.parentNode
                }
                n = void 0
            }
            n = Dc(n)
        }
    }
    function zc(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zc(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }
    function Lc(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = oi(e.document); t instanceof e.HTMLIFrameElement; ) {
            try {
                var n = typeof t.contentWindow.location.href == "string"
            } catch {
                n = !1
            }
            if (n)
                e = t.contentWindow;
            else
                break;
            t = oi(e.document)
        }
        return t
    }
    function fs(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var Jp = Zt && "documentMode"in document && 11 >= document.documentMode
      , dl = null
      , ds = null
      , ia = null
      , hs = !1;
    function Uc(e, t, n) {
        var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
        hs || dl == null || dl !== oi(l) || (l = dl,
        "selectionStart"in l && fs(l) ? l = {
            start: l.selectionStart,
            end: l.selectionEnd
        } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(),
        l = {
            anchorNode: l.anchorNode,
            anchorOffset: l.anchorOffset,
            focusNode: l.focusNode,
            focusOffset: l.focusOffset
        }),
        ia && aa(ia, l) || (ia = l,
        l = au(ds, "onSelect"),
        0 < l.length && (t = new mi("onSelect","select",null,t,n),
        e.push({
            event: t,
            listeners: l
        }),
        t.target = dl)))
    }
    function Yn(e, t) {
        var n = {};
        return n[e.toLowerCase()] = t.toLowerCase(),
        n["Webkit" + e] = "webkit" + t,
        n["Moz" + e] = "moz" + t,
        n
    }
    var hl = {
        animationend: Yn("Animation", "AnimationEnd"),
        animationiteration: Yn("Animation", "AnimationIteration"),
        animationstart: Yn("Animation", "AnimationStart"),
        transitionrun: Yn("Transition", "TransitionRun"),
        transitionstart: Yn("Transition", "TransitionStart"),
        transitioncancel: Yn("Transition", "TransitionCancel"),
        transitionend: Yn("Transition", "TransitionEnd")
    }
      , ms = {}
      , Bc = {};
    Zt && (Bc = document.createElement("div").style,
    "AnimationEvent"in window || (delete hl.animationend.animation,
    delete hl.animationiteration.animation,
    delete hl.animationstart.animation),
    "TransitionEvent"in window || delete hl.transitionend.transition);
    function Vn(e) {
        if (ms[e])
            return ms[e];
        if (!hl[e])
            return e;
        var t = hl[e], n;
        for (n in t)
            if (t.hasOwnProperty(n) && n in Bc)
                return ms[e] = t[n];
        return e
    }
    var Hc = Vn("animationend")
      , qc = Vn("animationiteration")
      , Gc = Vn("animationstart")
      , $p = Vn("transitionrun")
      , Fp = Vn("transitionstart")
      , Wp = Vn("transitioncancel")
      , Yc = Vn("transitionend")
      , Vc = new Map
      , gs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    gs.push("scrollEnd");
    function Dt(e, t) {
        Vc.set(e, t),
        qn(t, [e])
    }
    var yi = typeof reportError == "function" ? reportError : function(e) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
            var t = new window.ErrorEvent("error",{
                bubbles: !0,
                cancelable: !0,
                message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                error: e
            });
            if (!window.dispatchEvent(t))
                return
        } else if (typeof process == "object" && typeof process.emit == "function") {
            process.emit("uncaughtException", e);
            return
        }
        console.error(e)
    }
      , wt = []
      , ml = 0
      , ps = 0;
    function vi() {
        for (var e = ml, t = ps = ml = 0; t < e; ) {
            var n = wt[t];
            wt[t++] = null;
            var l = wt[t];
            wt[t++] = null;
            var i = wt[t];
            wt[t++] = null;
            var s = wt[t];
            if (wt[t++] = null,
            l !== null && i !== null) {
                var h = l.pending;
                h === null ? i.next = i : (i.next = h.next,
                h.next = i),
                l.pending = i
            }
            s !== 0 && Qc(n, i, s)
        }
    }
    function xi(e, t, n, l) {
        wt[ml++] = e,
        wt[ml++] = t,
        wt[ml++] = n,
        wt[ml++] = l,
        ps |= l,
        e.lanes |= l,
        e = e.alternate,
        e !== null && (e.lanes |= l)
    }
    function ys(e, t, n, l) {
        return xi(e, t, n, l),
        bi(e)
    }
    function Qn(e, t) {
        return xi(e, null, null, t),
        bi(e)
    }
    function Qc(e, t, n) {
        e.lanes |= n;
        var l = e.alternate;
        l !== null && (l.lanes |= n);
        for (var i = !1, s = e.return; s !== null; )
            s.childLanes |= n,
            l = s.alternate,
            l !== null && (l.childLanes |= n),
            s.tag === 22 && (e = s.stateNode,
            e === null || e._visibility & 1 || (i = !0)),
            e = s,
            s = s.return;
        return e.tag === 3 ? (s = e.stateNode,
        i && t !== null && (i = 31 - ht(n),
        e = s.hiddenUpdates,
        l = e[i],
        l === null ? e[i] = [t] : l.push(t),
        t.lane = n | 536870912),
        s) : null
    }
    function bi(e) {
        if (50 < Ta)
            throw Ta = 0,
            Ar = null,
            Error(o(185));
        for (var t = e.return; t !== null; )
            e = t,
            t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var gl = {};
    function Pp(e, t, n, l) {
        this.tag = e,
        this.key = n,
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
        this.index = 0,
        this.refCleanup = this.ref = null,
        this.pendingProps = t,
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
        this.mode = l,
        this.subtreeFlags = this.flags = 0,
        this.deletions = null,
        this.childLanes = this.lanes = 0,
        this.alternate = null
    }
    function gt(e, t, n, l) {
        return new Pp(e,t,n,l)
    }
    function vs(e) {
        return e = e.prototype,
        !(!e || !e.isReactComponent)
    }
    function Kt(e, t) {
        var n = e.alternate;
        return n === null ? (n = gt(e.tag, t, e.key, e.mode),
        n.elementType = e.elementType,
        n.type = e.type,
        n.stateNode = e.stateNode,
        n.alternate = e,
        e.alternate = n) : (n.pendingProps = t,
        n.type = e.type,
        n.flags = 0,
        n.subtreeFlags = 0,
        n.deletions = null),
        n.flags = e.flags & 65011712,
        n.childLanes = e.childLanes,
        n.lanes = e.lanes,
        n.child = e.child,
        n.memoizedProps = e.memoizedProps,
        n.memoizedState = e.memoizedState,
        n.updateQueue = e.updateQueue,
        t = e.dependencies,
        n.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        },
        n.sibling = e.sibling,
        n.index = e.index,
        n.ref = e.ref,
        n.refCleanup = e.refCleanup,
        n
    }
    function Xc(e, t) {
        e.flags &= 65011714;
        var n = e.alternate;
        return n === null ? (e.childLanes = 0,
        e.lanes = t,
        e.child = null,
        e.subtreeFlags = 0,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.updateQueue = null,
        e.dependencies = null,
        e.stateNode = null) : (e.childLanes = n.childLanes,
        e.lanes = n.lanes,
        e.child = n.child,
        e.subtreeFlags = 0,
        e.deletions = null,
        e.memoizedProps = n.memoizedProps,
        e.memoizedState = n.memoizedState,
        e.updateQueue = n.updateQueue,
        e.type = n.type,
        t = n.dependencies,
        e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }),
        e
    }
    function Si(e, t, n, l, i, s) {
        var h = 0;
        if (l = e,
        typeof e == "function")
            vs(e) && (h = 1);
        else if (typeof e == "string")
            h = ly(e, n, $.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else
            e: switch (e) {
            case Ee:
                return e = gt(31, n, t, i),
                e.elementType = Ee,
                e.lanes = s,
                e;
            case O:
                return Xn(n.children, i, s, t);
            case C:
                h = 8,
                i |= 24;
                break;
            case M:
                return e = gt(12, n, t, i | 2),
                e.elementType = M,
                e.lanes = s,
                e;
            case W:
                return e = gt(13, n, t, i),
                e.elementType = W,
                e.lanes = s,
                e;
            case oe:
                return e = gt(19, n, t, i),
                e.elementType = oe,
                e.lanes = s,
                e;
            default:
                if (typeof e == "object" && e !== null)
                    switch (e.$$typeof) {
                    case V:
                        h = 10;
                        break e;
                    case U:
                        h = 9;
                        break e;
                    case J:
                        h = 11;
                        break e;
                    case P:
                        h = 14;
                        break e;
                    case pe:
                        h = 16,
                        l = null;
                        break e
                    }
                h = 29,
                n = Error(o(130, e === null ? "null" : typeof e, "")),
                l = null
            }
        return t = gt(h, n, t, i),
        t.elementType = e,
        t.type = l,
        t.lanes = s,
        t
    }
    function Xn(e, t, n, l) {
        return e = gt(7, e, l, t),
        e.lanes = n,
        e
    }
    function xs(e, t, n) {
        return e = gt(6, e, null, t),
        e.lanes = n,
        e
    }
    function Zc(e) {
        var t = gt(18, null, null, 0);
        return t.stateNode = e,
        t
    }
    function bs(e, t, n) {
        return t = gt(4, e.children !== null ? e.children : [], e.key, t),
        t.lanes = n,
        t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        },
        t
    }
    var Kc = new WeakMap;
    function _t(e, t) {
        if (typeof e == "object" && e !== null) {
            var n = Kc.get(e);
            return n !== void 0 ? n : (t = {
                value: e,
                source: t,
                stack: Zo(t)
            },
            Kc.set(e, t),
            t)
        }
        return {
            value: e,
            source: t,
            stack: Zo(t)
        }
    }
    var pl = []
      , yl = 0
      , Ei = null
      , ua = 0
      , Ct = []
      , At = 0
      , mn = null
      , Ut = 1
      , Bt = "";
    function kt(e, t) {
        pl[yl++] = ua,
        pl[yl++] = Ei,
        Ei = e,
        ua = t
    }
    function kc(e, t, n) {
        Ct[At++] = Ut,
        Ct[At++] = Bt,
        Ct[At++] = mn,
        mn = e;
        var l = Ut;
        e = Bt;
        var i = 32 - ht(l) - 1;
        l &= ~(1 << i),
        n += 1;
        var s = 32 - ht(t) + i;
        if (30 < s) {
            var h = i - i % 5;
            s = (l & (1 << h) - 1).toString(32),
            l >>= h,
            i -= h,
            Ut = 1 << 32 - ht(t) + i | n << i | l,
            Bt = s + e
        } else
            Ut = 1 << s | n << i | l,
            Bt = e
    }
    function Ss(e) {
        e.return !== null && (kt(e, 1),
        kc(e, 1, 0))
    }
    function Es(e) {
        for (; e === Ei; )
            Ei = pl[--yl],
            pl[yl] = null,
            ua = pl[--yl],
            pl[yl] = null;
        for (; e === mn; )
            mn = Ct[--At],
            Ct[At] = null,
            Bt = Ct[--At],
            Ct[At] = null,
            Ut = Ct[--At],
            Ct[At] = null
    }
    function Jc(e, t) {
        Ct[At++] = Ut,
        Ct[At++] = Bt,
        Ct[At++] = mn,
        Ut = t.id,
        Bt = t.overflow,
        mn = e
    }
    var Fe = null
      , De = null
      , ye = !1
      , gn = null
      , Tt = !1
      , ws = Error(o(519));
    function pn(e) {
        var t = Error(o(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw sa(_t(t, e)),
        ws
    }
    function $c(e) {
        var t = e.stateNode
          , n = e.type
          , l = e.memoizedProps;
        switch (t[$e] = e,
        t[at] = l,
        n) {
        case "dialog":
            he("cancel", t),
            he("close", t);
            break;
        case "iframe":
        case "object":
        case "embed":
            he("load", t);
            break;
        case "video":
        case "audio":
            for (n = 0; n < Na.length; n++)
                he(Na[n], t);
            break;
        case "source":
            he("error", t);
            break;
        case "img":
        case "image":
        case "link":
            he("error", t),
            he("load", t);
            break;
        case "details":
            he("toggle", t);
            break;
        case "input":
            he("invalid", t),
            rc(t, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0);
            break;
        case "select":
            he("invalid", t);
            break;
        case "textarea":
            he("invalid", t),
            cc(t, l.value, l.defaultValue, l.children)
        }
        n = l.children,
        typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || l.suppressHydrationWarning === !0 || hh(t.textContent, n) ? (l.popover != null && (he("beforetoggle", t),
        he("toggle", t)),
        l.onScroll != null && he("scroll", t),
        l.onScrollEnd != null && he("scrollend", t),
        l.onClick != null && (t.onclick = Xt),
        t = !0) : t = !1,
        t || pn(e, !0)
    }
    function Fc(e) {
        for (Fe = e.return; Fe; )
            switch (Fe.tag) {
            case 5:
            case 31:
            case 13:
                Tt = !1;
                return;
            case 27:
            case 3:
                Tt = !0;
                return;
            default:
                Fe = Fe.return
            }
    }
    function vl(e) {
        if (e !== Fe)
            return !1;
        if (!ye)
            return Fc(e),
            ye = !0,
            !1;
        var t = e.tag, n;
        if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type,
        n = !(n !== "form" && n !== "button") || Yr(e.type, e.memoizedProps)),
        n = !n),
        n && De && pn(e),
        Fc(e),
        t === 13) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            De = Eh(e)
        } else if (t === 31) {
            if (e = e.memoizedState,
            e = e !== null ? e.dehydrated : null,
            !e)
                throw Error(o(317));
            De = Eh(e)
        } else
            t === 27 ? (t = De,
            Rn(e.type) ? (e = Kr,
            Kr = null,
            De = e) : De = t) : De = Fe ? Nt(e.stateNode.nextSibling) : null;
        return !0
    }
    function Zn() {
        De = Fe = null,
        ye = !1
    }
    function _s() {
        var e = gn;
        return e !== null && (ot === null ? ot = e : ot.push.apply(ot, e),
        gn = null),
        e
    }
    function sa(e) {
        gn === null ? gn = [e] : gn.push(e)
    }
    var Cs = A(null)
      , Kn = null
      , Jt = null;
    function yn(e, t, n) {
        K(Cs, t._currentValue),
        t._currentValue = n
    }
    function $t(e) {
        e._currentValue = Cs.current,
        q(Cs)
    }
    function As(e, t, n) {
        for (; e !== null; ) {
            var l = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t,
            l !== null && (l.childLanes |= t)) : l !== null && (l.childLanes & t) !== t && (l.childLanes |= t),
            e === n)
                break;
            e = e.return
        }
    }
    function Ts(e, t, n, l) {
        var i = e.child;
        for (i !== null && (i.return = e); i !== null; ) {
            var s = i.dependencies;
            if (s !== null) {
                var h = i.child;
                s = s.firstContext;
                e: for (; s !== null; ) {
                    var y = s;
                    s = i;
                    for (var _ = 0; _ < t.length; _++)
                        if (y.context === t[_]) {
                            s.lanes |= n,
                            y = s.alternate,
                            y !== null && (y.lanes |= n),
                            As(s.return, n, e),
                            l || (h = null);
                            break e
                        }
                    s = y.next
                }
            } else if (i.tag === 18) {
                if (h = i.return,
                h === null)
                    throw Error(o(341));
                h.lanes |= n,
                s = h.alternate,
                s !== null && (s.lanes |= n),
                As(h, n, e),
                h = null
            } else
                h = i.child;
            if (h !== null)
                h.return = i;
            else
                for (h = i; h !== null; ) {
                    if (h === e) {
                        h = null;
                        break
                    }
                    if (i = h.sibling,
                    i !== null) {
                        i.return = h.return,
                        h = i;
                        break
                    }
                    h = h.return
                }
            i = h
        }
    }
    function xl(e, t, n, l) {
        e = null;
        for (var i = t, s = !1; i !== null; ) {
            if (!s) {
                if ((i.flags & 524288) !== 0)
                    s = !0;
                else if ((i.flags & 262144) !== 0)
                    break
            }
            if (i.tag === 10) {
                var h = i.alternate;
                if (h === null)
                    throw Error(o(387));
                if (h = h.memoizedProps,
                h !== null) {
                    var y = i.type;
                    mt(i.pendingProps.value, h.value) || (e !== null ? e.push(y) : e = [y])
                }
            } else if (i === _e.current) {
                if (h = i.alternate,
                h === null)
                    throw Error(o(387));
                h.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e !== null ? e.push(za) : e = [za])
            }
            i = i.return
        }
        e !== null && Ts(t, e, n, l),
        t.flags |= 262144
    }
    function wi(e) {
        for (e = e.firstContext; e !== null; ) {
            if (!mt(e.context._currentValue, e.memoizedValue))
                return !0;
            e = e.next
        }
        return !1
    }
    function kn(e) {
        Kn = e,
        Jt = null,
        e = e.dependencies,
        e !== null && (e.firstContext = null)
    }
    function We(e) {
        return Wc(Kn, e)
    }
    function _i(e, t) {
        return Kn === null && kn(e),
        Wc(e, t)
    }
    function Wc(e, t) {
        var n = t._currentValue;
        if (t = {
            context: t,
            memoizedValue: n,
            next: null
        },
        Jt === null) {
            if (e === null)
                throw Error(o(308));
            Jt = t,
            e.dependencies = {
                lanes: 0,
                firstContext: t
            },
            e.flags |= 524288
        } else
            Jt = Jt.next = t;
        return n
    }
    var Ip = typeof AbortController < "u" ? AbortController : function() {
        var e = []
          , t = this.signal = {
            aborted: !1,
            addEventListener: function(n, l) {
                e.push(l)
            }
        };
        this.abort = function() {
            t.aborted = !0,
            e.forEach(function(n) {
                return n()
            })
        }
    }
      , e0 = u.unstable_scheduleCallback
      , t0 = u.unstable_NormalPriority
      , Ge = {
        $$typeof: V,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
    };
    function Os() {
        return {
            controller: new Ip,
            data: new Map,
            refCount: 0
        }
    }
    function ra(e) {
        e.refCount--,
        e.refCount === 0 && e0(t0, function() {
            e.controller.abort()
        })
    }
    var oa = null
      , Ns = 0
      , bl = 0
      , Sl = null;
    function n0(e, t) {
        if (oa === null) {
            var n = oa = [];
            Ns = 0,
            bl = Dr(),
            Sl = {
                status: "pending",
                value: void 0,
                then: function(l) {
                    n.push(l)
                }
            }
        }
        return Ns++,
        t.then(Pc, Pc),
        t
    }
    function Pc() {
        if (--Ns === 0 && oa !== null) {
            Sl !== null && (Sl.status = "fulfilled");
            var e = oa;
            oa = null,
            bl = 0,
            Sl = null;
            for (var t = 0; t < e.length; t++)
                (0,
                e[t])()
        }
    }
    function l0(e, t) {
        var n = []
          , l = {
            status: "pending",
            value: null,
            reason: null,
            then: function(i) {
                n.push(i)
            }
        };
        return e.then(function() {
            l.status = "fulfilled",
            l.value = t;
            for (var i = 0; i < n.length; i++)
                (0,
                n[i])(t)
        }, function(i) {
            for (l.status = "rejected",
            l.reason = i,
            i = 0; i < n.length; i++)
                (0,
                n[i])(void 0)
        }),
        l
    }
    var Ic = L.S;
    L.S = function(e, t) {
        Bd = ft(),
        typeof t == "object" && t !== null && typeof t.then == "function" && n0(e, t),
        Ic !== null && Ic(e, t)
    }
    ;
    var Jn = A(null);
    function Rs() {
        var e = Jn.current;
        return e !== null ? e : je.pooledCache
    }
    function Ci(e, t) {
        t === null ? K(Jn, Jn.current) : K(Jn, t.pool)
    }
    function ef() {
        var e = Rs();
        return e === null ? null : {
            parent: Ge._currentValue,
            pool: e
        }
    }
    var El = Error(o(460))
      , js = Error(o(474))
      , Ai = Error(o(542))
      , Ti = {
        then: function() {}
    };
    function tf(e) {
        return e = e.status,
        e === "fulfilled" || e === "rejected"
    }
    function nf(e, t, n) {
        switch (n = e[n],
        n === void 0 ? e.push(t) : n !== t && (t.then(Xt, Xt),
        t = n),
        t.status) {
        case "fulfilled":
            return t.value;
        case "rejected":
            throw e = t.reason,
            af(e),
            e;
        default:
            if (typeof t.status == "string")
                t.then(Xt, Xt);
            else {
                if (e = je,
                e !== null && 100 < e.shellSuspendCounter)
                    throw Error(o(482));
                e = t,
                e.status = "pending",
                e.then(function(l) {
                    if (t.status === "pending") {
                        var i = t;
                        i.status = "fulfilled",
                        i.value = l
                    }
                }, function(l) {
                    if (t.status === "pending") {
                        var i = t;
                        i.status = "rejected",
                        i.reason = l
                    }
                })
            }
            switch (t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason,
                af(e),
                e
            }
            throw Fn = t,
            El
        }
    }
    function $n(e) {
        try {
            var t = e._init;
            return t(e._payload)
        } catch (n) {
            throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Fn = n,
            El) : n
        }
    }
    var Fn = null;
    function lf() {
        if (Fn === null)
            throw Error(o(459));
        var e = Fn;
        return Fn = null,
        e
    }
    function af(e) {
        if (e === El || e === Ai)
            throw Error(o(483))
    }
    var wl = null
      , ca = 0;
    function Oi(e) {
        var t = ca;
        return ca += 1,
        wl === null && (wl = []),
        nf(wl, e, t)
    }
    function fa(e, t) {
        t = t.props.ref,
        e.ref = t !== void 0 ? t : null
    }
    function Ni(e, t) {
        throw t.$$typeof === S ? Error(o(525)) : (e = Object.prototype.toString.call(t),
        Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }
    function uf(e) {
        function t(N, T) {
            if (e) {
                var R = N.deletions;
                R === null ? (N.deletions = [T],
                N.flags |= 16) : R.push(T)
            }
        }
        function n(N, T) {
            if (!e)
                return null;
            for (; T !== null; )
                t(N, T),
                T = T.sibling;
            return null
        }
        function l(N) {
            for (var T = new Map; N !== null; )
                N.key !== null ? T.set(N.key, N) : T.set(N.index, N),
                N = N.sibling;
            return T
        }
        function i(N, T) {
            return N = Kt(N, T),
            N.index = 0,
            N.sibling = null,
            N
        }
        function s(N, T, R) {
            return N.index = R,
            e ? (R = N.alternate,
            R !== null ? (R = R.index,
            R < T ? (N.flags |= 67108866,
            T) : R) : (N.flags |= 67108866,
            T)) : (N.flags |= 1048576,
            T)
        }
        function h(N) {
            return e && N.alternate === null && (N.flags |= 67108866),
            N
        }
        function y(N, T, R, G) {
            return T === null || T.tag !== 6 ? (T = xs(R, N.mode, G),
            T.return = N,
            T) : (T = i(T, R),
            T.return = N,
            T)
        }
        function _(N, T, R, G) {
            var ee = R.type;
            return ee === O ? B(N, T, R.props.children, G, R.key) : T !== null && (T.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === pe && $n(ee) === T.type) ? (T = i(T, R.props),
            fa(T, R),
            T.return = N,
            T) : (T = Si(R.type, R.key, R.props, null, N.mode, G),
            fa(T, R),
            T.return = N,
            T)
        }
        function j(N, T, R, G) {
            return T === null || T.tag !== 4 || T.stateNode.containerInfo !== R.containerInfo || T.stateNode.implementation !== R.implementation ? (T = bs(R, N.mode, G),
            T.return = N,
            T) : (T = i(T, R.children || []),
            T.return = N,
            T)
        }
        function B(N, T, R, G, ee) {
            return T === null || T.tag !== 7 ? (T = Xn(R, N.mode, G, ee),
            T.return = N,
            T) : (T = i(T, R),
            T.return = N,
            T)
        }
        function Y(N, T, R) {
            if (typeof T == "string" && T !== "" || typeof T == "number" || typeof T == "bigint")
                return T = xs("" + T, N.mode, R),
                T.return = N,
                T;
            if (typeof T == "object" && T !== null) {
                switch (T.$$typeof) {
                case b:
                    return R = Si(T.type, T.key, T.props, null, N.mode, R),
                    fa(R, T),
                    R.return = N,
                    R;
                case E:
                    return T = bs(T, N.mode, R),
                    T.return = N,
                    T;
                case pe:
                    return T = $n(T),
                    Y(N, T, R)
                }
                if (Ce(T) || k(T))
                    return T = Xn(T, N.mode, R, null),
                    T.return = N,
                    T;
                if (typeof T.then == "function")
                    return Y(N, Oi(T), R);
                if (T.$$typeof === V)
                    return Y(N, _i(N, T), R);
                Ni(N, T)
            }
            return null
        }
        function D(N, T, R, G) {
            var ee = T !== null ? T.key : null;
            if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
                return ee !== null ? null : y(N, T, "" + R, G);
            if (typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case b:
                    return R.key === ee ? _(N, T, R, G) : null;
                case E:
                    return R.key === ee ? j(N, T, R, G) : null;
                case pe:
                    return R = $n(R),
                    D(N, T, R, G)
                }
                if (Ce(R) || k(R))
                    return ee !== null ? null : B(N, T, R, G, null);
                if (typeof R.then == "function")
                    return D(N, T, Oi(R), G);
                if (R.$$typeof === V)
                    return D(N, T, _i(N, R), G);
                Ni(N, R)
            }
            return null
        }
        function z(N, T, R, G, ee) {
            if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
                return N = N.get(R) || null,
                y(T, N, "" + G, ee);
            if (typeof G == "object" && G !== null) {
                switch (G.$$typeof) {
                case b:
                    return N = N.get(G.key === null ? R : G.key) || null,
                    _(T, N, G, ee);
                case E:
                    return N = N.get(G.key === null ? R : G.key) || null,
                    j(T, N, G, ee);
                case pe:
                    return G = $n(G),
                    z(N, T, R, G, ee)
                }
                if (Ce(G) || k(G))
                    return N = N.get(R) || null,
                    B(T, N, G, ee, null);
                if (typeof G.then == "function")
                    return z(N, T, R, Oi(G), ee);
                if (G.$$typeof === V)
                    return z(N, T, R, _i(T, G), ee);
                Ni(T, G)
            }
            return null
        }
        function F(N, T, R, G) {
            for (var ee = null, xe = null, I = T, re = T = 0, ge = null; I !== null && re < R.length; re++) {
                I.index > re ? (ge = I,
                I = null) : ge = I.sibling;
                var be = D(N, I, R[re], G);
                if (be === null) {
                    I === null && (I = ge);
                    break
                }
                e && I && be.alternate === null && t(N, I),
                T = s(be, T, re),
                xe === null ? ee = be : xe.sibling = be,
                xe = be,
                I = ge
            }
            if (re === R.length)
                return n(N, I),
                ye && kt(N, re),
                ee;
            if (I === null) {
                for (; re < R.length; re++)
                    I = Y(N, R[re], G),
                    I !== null && (T = s(I, T, re),
                    xe === null ? ee = I : xe.sibling = I,
                    xe = I);
                return ye && kt(N, re),
                ee
            }
            for (I = l(I); re < R.length; re++)
                ge = z(I, N, re, R[re], G),
                ge !== null && (e && ge.alternate !== null && I.delete(ge.key === null ? re : ge.key),
                T = s(ge, T, re),
                xe === null ? ee = ge : xe.sibling = ge,
                xe = ge);
            return e && I.forEach(function(Ln) {
                return t(N, Ln)
            }),
            ye && kt(N, re),
            ee
        }
        function ne(N, T, R, G) {
            if (R == null)
                throw Error(o(151));
            for (var ee = null, xe = null, I = T, re = T = 0, ge = null, be = R.next(); I !== null && !be.done; re++,
            be = R.next()) {
                I.index > re ? (ge = I,
                I = null) : ge = I.sibling;
                var Ln = D(N, I, be.value, G);
                if (Ln === null) {
                    I === null && (I = ge);
                    break
                }
                e && I && Ln.alternate === null && t(N, I),
                T = s(Ln, T, re),
                xe === null ? ee = Ln : xe.sibling = Ln,
                xe = Ln,
                I = ge
            }
            if (be.done)
                return n(N, I),
                ye && kt(N, re),
                ee;
            if (I === null) {
                for (; !be.done; re++,
                be = R.next())
                    be = Y(N, be.value, G),
                    be !== null && (T = s(be, T, re),
                    xe === null ? ee = be : xe.sibling = be,
                    xe = be);
                return ye && kt(N, re),
                ee
            }
            for (I = l(I); !be.done; re++,
            be = R.next())
                be = z(I, N, re, be.value, G),
                be !== null && (e && be.alternate !== null && I.delete(be.key === null ? re : be.key),
                T = s(be, T, re),
                xe === null ? ee = be : xe.sibling = be,
                xe = be);
            return e && I.forEach(function(my) {
                return t(N, my)
            }),
            ye && kt(N, re),
            ee
        }
        function Re(N, T, R, G) {
            if (typeof R == "object" && R !== null && R.type === O && R.key === null && (R = R.props.children),
            typeof R == "object" && R !== null) {
                switch (R.$$typeof) {
                case b:
                    e: {
                        for (var ee = R.key; T !== null; ) {
                            if (T.key === ee) {
                                if (ee = R.type,
                                ee === O) {
                                    if (T.tag === 7) {
                                        n(N, T.sibling),
                                        G = i(T, R.props.children),
                                        G.return = N,
                                        N = G;
                                        break e
                                    }
                                } else if (T.elementType === ee || typeof ee == "object" && ee !== null && ee.$$typeof === pe && $n(ee) === T.type) {
                                    n(N, T.sibling),
                                    G = i(T, R.props),
                                    fa(G, R),
                                    G.return = N,
                                    N = G;
                                    break e
                                }
                                n(N, T);
                                break
                            } else
                                t(N, T);
                            T = T.sibling
                        }
                        R.type === O ? (G = Xn(R.props.children, N.mode, G, R.key),
                        G.return = N,
                        N = G) : (G = Si(R.type, R.key, R.props, null, N.mode, G),
                        fa(G, R),
                        G.return = N,
                        N = G)
                    }
                    return h(N);
                case E:
                    e: {
                        for (ee = R.key; T !== null; ) {
                            if (T.key === ee)
                                if (T.tag === 4 && T.stateNode.containerInfo === R.containerInfo && T.stateNode.implementation === R.implementation) {
                                    n(N, T.sibling),
                                    G = i(T, R.children || []),
                                    G.return = N,
                                    N = G;
                                    break e
                                } else {
                                    n(N, T);
                                    break
                                }
                            else
                                t(N, T);
                            T = T.sibling
                        }
                        G = bs(R, N.mode, G),
                        G.return = N,
                        N = G
                    }
                    return h(N);
                case pe:
                    return R = $n(R),
                    Re(N, T, R, G)
                }
                if (Ce(R))
                    return F(N, T, R, G);
                if (k(R)) {
                    if (ee = k(R),
                    typeof ee != "function")
                        throw Error(o(150));
                    return R = ee.call(R),
                    ne(N, T, R, G)
                }
                if (typeof R.then == "function")
                    return Re(N, T, Oi(R), G);
                if (R.$$typeof === V)
                    return Re(N, T, _i(N, R), G);
                Ni(N, R)
            }
            return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R,
            T !== null && T.tag === 6 ? (n(N, T.sibling),
            G = i(T, R),
            G.return = N,
            N = G) : (n(N, T),
            G = xs(R, N.mode, G),
            G.return = N,
            N = G),
            h(N)) : n(N, T)
        }
        return function(N, T, R, G) {
            try {
                ca = 0;
                var ee = Re(N, T, R, G);
                return wl = null,
                ee
            } catch (I) {
                if (I === El || I === Ai)
                    throw I;
                var xe = gt(29, I, null, N.mode);
                return xe.lanes = G,
                xe.return = N,
                xe
            }
        }
    }
    var Wn = uf(!0)
      , sf = uf(!1)
      , vn = !1;
    function Ds(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }
    function Ms(e, t) {
        e = e.updateQueue,
        t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }
    function xn(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }
    function bn(e, t, n) {
        var l = e.updateQueue;
        if (l === null)
            return null;
        if (l = l.shared,
        (Se & 2) !== 0) {
            var i = l.pending;
            return i === null ? t.next = t : (t.next = i.next,
            i.next = t),
            l.pending = t,
            t = bi(e),
            Qc(e, null, n),
            t
        }
        return xi(e, l, t, n),
        bi(e)
    }
    function da(e, t, n) {
        if (t = t.updateQueue,
        t !== null && (t = t.shared,
        (n & 4194048) !== 0)) {
            var l = t.lanes;
            l &= e.pendingLanes,
            n |= l,
            t.lanes = n,
            Wo(e, n)
        }
    }
    function zs(e, t) {
        var n = e.updateQueue
          , l = e.alternate;
        if (l !== null && (l = l.updateQueue,
        n === l)) {
            var i = null
              , s = null;
            if (n = n.firstBaseUpdate,
            n !== null) {
                do {
                    var h = {
                        lane: n.lane,
                        tag: n.tag,
                        payload: n.payload,
                        callback: null,
                        next: null
                    };
                    s === null ? i = s = h : s = s.next = h,
                    n = n.next
                } while (n !== null);
                s === null ? i = s = t : s = s.next = t
            } else
                i = s = t;
            n = {
                baseState: l.baseState,
                firstBaseUpdate: i,
                lastBaseUpdate: s,
                shared: l.shared,
                callbacks: l.callbacks
            },
            e.updateQueue = n;
            return
        }
        e = n.lastBaseUpdate,
        e === null ? n.firstBaseUpdate = t : e.next = t,
        n.lastBaseUpdate = t
    }
    var Ls = !1;
    function ha() {
        if (Ls) {
            var e = Sl;
            if (e !== null)
                throw e
        }
    }
    function ma(e, t, n, l) {
        Ls = !1;
        var i = e.updateQueue;
        vn = !1;
        var s = i.firstBaseUpdate
          , h = i.lastBaseUpdate
          , y = i.shared.pending;
        if (y !== null) {
            i.shared.pending = null;
            var _ = y
              , j = _.next;
            _.next = null,
            h === null ? s = j : h.next = j,
            h = _;
            var B = e.alternate;
            B !== null && (B = B.updateQueue,
            y = B.lastBaseUpdate,
            y !== h && (y === null ? B.firstBaseUpdate = j : y.next = j,
            B.lastBaseUpdate = _))
        }
        if (s !== null) {
            var Y = i.baseState;
            h = 0,
            B = j = _ = null,
            y = s;
            do {
                var D = y.lane & -536870913
                  , z = D !== y.lane;
                if (z ? (me & D) === D : (l & D) === D) {
                    D !== 0 && D === bl && (Ls = !0),
                    B !== null && (B = B.next = {
                        lane: 0,
                        tag: y.tag,
                        payload: y.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var F = e
                          , ne = y;
                        D = t;
                        var Re = n;
                        switch (ne.tag) {
                        case 1:
                            if (F = ne.payload,
                            typeof F == "function") {
                                Y = F.call(Re, Y, D);
                                break e
                            }
                            Y = F;
                            break e;
                        case 3:
                            F.flags = F.flags & -65537 | 128;
                        case 0:
                            if (F = ne.payload,
                            D = typeof F == "function" ? F.call(Re, Y, D) : F,
                            D == null)
                                break e;
                            Y = v({}, Y, D);
                            break e;
                        case 2:
                            vn = !0
                        }
                    }
                    D = y.callback,
                    D !== null && (e.flags |= 64,
                    z && (e.flags |= 8192),
                    z = i.callbacks,
                    z === null ? i.callbacks = [D] : z.push(D))
                } else
                    z = {
                        lane: D,
                        tag: y.tag,
                        payload: y.payload,
                        callback: y.callback,
                        next: null
                    },
                    B === null ? (j = B = z,
                    _ = Y) : B = B.next = z,
                    h |= D;
                if (y = y.next,
                y === null) {
                    if (y = i.shared.pending,
                    y === null)
                        break;
                    z = y,
                    y = z.next,
                    z.next = null,
                    i.lastBaseUpdate = z,
                    i.shared.pending = null
                }
            } while (!0);
            B === null && (_ = Y),
            i.baseState = _,
            i.firstBaseUpdate = j,
            i.lastBaseUpdate = B,
            s === null && (i.shared.lanes = 0),
            Cn |= h,
            e.lanes = h,
            e.memoizedState = Y
        }
    }
    function rf(e, t) {
        if (typeof e != "function")
            throw Error(o(191, e));
        e.call(t)
    }
    function of(e, t) {
        var n = e.callbacks;
        if (n !== null)
            for (e.callbacks = null,
            e = 0; e < n.length; e++)
                rf(n[e], t)
    }
    var _l = A(null)
      , Ri = A(0);
    function cf(e, t) {
        e = an,
        K(Ri, e),
        K(_l, t),
        an = e | t.baseLanes
    }
    function Us() {
        K(Ri, an),
        K(_l, _l.current)
    }
    function Bs() {
        an = Ri.current,
        q(_l),
        q(Ri)
    }
    var pt = A(null)
      , Ot = null;
    function Sn(e) {
        var t = e.alternate;
        K(He, He.current & 1),
        K(pt, e),
        Ot === null && (t === null || _l.current !== null || t.memoizedState !== null) && (Ot = e)
    }
    function Hs(e) {
        K(He, He.current),
        K(pt, e),
        Ot === null && (Ot = e)
    }
    function ff(e) {
        e.tag === 22 ? (K(He, He.current),
        K(pt, e),
        Ot === null && (Ot = e)) : En()
    }
    function En() {
        K(He, He.current),
        K(pt, pt.current)
    }
    function yt(e) {
        q(pt),
        Ot === e && (Ot = null),
        q(He)
    }
    var He = A(0);
    function ji(e) {
        for (var t = e; t !== null; ) {
            if (t.tag === 13) {
                var n = t.memoizedState;
                if (n !== null && (n = n.dehydrated,
                n === null || Xr(n) || Zr(n)))
                    return t
            } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                if ((t.flags & 128) !== 0)
                    return t
            } else if (t.child !== null) {
                t.child.return = t,
                t = t.child;
                continue
            }
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return null;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
        return null
    }
    var Ft = 0
      , se = null
      , Oe = null
      , Ye = null
      , Di = !1
      , Cl = !1
      , Pn = !1
      , Mi = 0
      , ga = 0
      , Al = null
      , a0 = 0;
    function Le() {
        throw Error(o(321))
    }
    function qs(e, t) {
        if (t === null)
            return !1;
        for (var n = 0; n < t.length && n < e.length; n++)
            if (!mt(e[n], t[n]))
                return !1;
        return !0
    }
    function Gs(e, t, n, l, i, s) {
        return Ft = s,
        se = t,
        t.memoizedState = null,
        t.updateQueue = null,
        t.lanes = 0,
        L.H = e === null || e.memoizedState === null ? Jf : tr,
        Pn = !1,
        s = n(l, i),
        Pn = !1,
        Cl && (s = hf(t, n, l, i)),
        df(e),
        s
    }
    function df(e) {
        L.H = va;
        var t = Oe !== null && Oe.next !== null;
        if (Ft = 0,
        Ye = Oe = se = null,
        Di = !1,
        ga = 0,
        Al = null,
        t)
            throw Error(o(300));
        e === null || Ve || (e = e.dependencies,
        e !== null && wi(e) && (Ve = !0))
    }
    function hf(e, t, n, l) {
        se = e;
        var i = 0;
        do {
            if (Cl && (Al = null),
            ga = 0,
            Cl = !1,
            25 <= i)
                throw Error(o(301));
            if (i += 1,
            Ye = Oe = null,
            e.updateQueue != null) {
                var s = e.updateQueue;
                s.lastEffect = null,
                s.events = null,
                s.stores = null,
                s.memoCache != null && (s.memoCache.index = 0)
            }
            L.H = $f,
            s = t(n, l)
        } while (Cl);
        return s
    }
    function i0() {
        var e = L.H
          , t = e.useState()[0];
        return t = typeof t.then == "function" ? pa(t) : t,
        e = e.useState()[0],
        (Oe !== null ? Oe.memoizedState : null) !== e && (se.flags |= 1024),
        t
    }
    function Ys() {
        var e = Mi !== 0;
        return Mi = 0,
        e
    }
    function Vs(e, t, n) {
        t.updateQueue = e.updateQueue,
        t.flags &= -2053,
        e.lanes &= ~n
    }
    function Qs(e) {
        if (Di) {
            for (e = e.memoizedState; e !== null; ) {
                var t = e.queue;
                t !== null && (t.pending = null),
                e = e.next
            }
            Di = !1
        }
        Ft = 0,
        Ye = Oe = se = null,
        Cl = !1,
        ga = Mi = 0,
        Al = null
    }
    function lt() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return Ye === null ? se.memoizedState = Ye = e : Ye = Ye.next = e,
        Ye
    }
    function qe() {
        if (Oe === null) {
            var e = se.alternate;
            e = e !== null ? e.memoizedState : null
        } else
            e = Oe.next;
        var t = Ye === null ? se.memoizedState : Ye.next;
        if (t !== null)
            Ye = t,
            Oe = e;
        else {
            if (e === null)
                throw se.alternate === null ? Error(o(467)) : Error(o(310));
            Oe = e,
            e = {
                memoizedState: Oe.memoizedState,
                baseState: Oe.baseState,
                baseQueue: Oe.baseQueue,
                queue: Oe.queue,
                next: null
            },
            Ye === null ? se.memoizedState = Ye = e : Ye = Ye.next = e
        }
        return Ye
    }
    function zi() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }
    function pa(e) {
        var t = ga;
        return ga += 1,
        Al === null && (Al = []),
        e = nf(Al, e, t),
        t = se,
        (Ye === null ? t.memoizedState : Ye.next) === null && (t = t.alternate,
        L.H = t === null || t.memoizedState === null ? Jf : tr),
        e
    }
    function Li(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function")
                return pa(e);
            if (e.$$typeof === V)
                return We(e)
        }
        throw Error(o(438, String(e)))
    }
    function Xs(e) {
        var t = null
          , n = se.updateQueue;
        if (n !== null && (t = n.memoCache),
        t == null) {
            var l = se.alternate;
            l !== null && (l = l.updateQueue,
            l !== null && (l = l.memoCache,
            l != null && (t = {
                data: l.data.map(function(i) {
                    return i.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
            data: [],
            index: 0
        }),
        n === null && (n = zi(),
        se.updateQueue = n),
        n.memoCache = t,
        n = t.data[t.index],
        n === void 0)
            for (n = t.data[t.index] = Array(e),
            l = 0; l < e; l++)
                n[l] = Q;
        return t.index++,
        n
    }
    function Wt(e, t) {
        return typeof t == "function" ? t(e) : t
    }
    function Ui(e) {
        var t = qe();
        return Zs(t, Oe, e)
    }
    function Zs(e, t, n) {
        var l = e.queue;
        if (l === null)
            throw Error(o(311));
        l.lastRenderedReducer = n;
        var i = e.baseQueue
          , s = l.pending;
        if (s !== null) {
            if (i !== null) {
                var h = i.next;
                i.next = s.next,
                s.next = h
            }
            t.baseQueue = i = s,
            l.pending = null
        }
        if (s = e.baseState,
        i === null)
            e.memoizedState = s;
        else {
            t = i.next;
            var y = h = null
              , _ = null
              , j = t
              , B = !1;
            do {
                var Y = j.lane & -536870913;
                if (Y !== j.lane ? (me & Y) === Y : (Ft & Y) === Y) {
                    var D = j.revertLane;
                    if (D === 0)
                        _ !== null && (_ = _.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: j.action,
                            hasEagerState: j.hasEagerState,
                            eagerState: j.eagerState,
                            next: null
                        }),
                        Y === bl && (B = !0);
                    else if ((Ft & D) === D) {
                        j = j.next,
                        D === bl && (B = !0);
                        continue
                    } else
                        Y = {
                            lane: 0,
                            revertLane: j.revertLane,
                            gesture: null,
                            action: j.action,
                            hasEagerState: j.hasEagerState,
                            eagerState: j.eagerState,
                            next: null
                        },
                        _ === null ? (y = _ = Y,
                        h = s) : _ = _.next = Y,
                        se.lanes |= D,
                        Cn |= D;
                    Y = j.action,
                    Pn && n(s, Y),
                    s = j.hasEagerState ? j.eagerState : n(s, Y)
                } else
                    D = {
                        lane: Y,
                        revertLane: j.revertLane,
                        gesture: j.gesture,
                        action: j.action,
                        hasEagerState: j.hasEagerState,
                        eagerState: j.eagerState,
                        next: null
                    },
                    _ === null ? (y = _ = D,
                    h = s) : _ = _.next = D,
                    se.lanes |= Y,
                    Cn |= Y;
                j = j.next
            } while (j !== null && j !== t);
            if (_ === null ? h = s : _.next = y,
            !mt(s, e.memoizedState) && (Ve = !0,
            B && (n = Sl,
            n !== null)))
                throw n;
            e.memoizedState = s,
            e.baseState = h,
            e.baseQueue = _,
            l.lastRenderedState = s
        }
        return i === null && (l.lanes = 0),
        [e.memoizedState, l.dispatch]
    }
    function Ks(e) {
        var t = qe()
          , n = t.queue;
        if (n === null)
            throw Error(o(311));
        n.lastRenderedReducer = e;
        var l = n.dispatch
          , i = n.pending
          , s = t.memoizedState;
        if (i !== null) {
            n.pending = null;
            var h = i = i.next;
            do
                s = e(s, h.action),
                h = h.next;
            while (h !== i);
            mt(s, t.memoizedState) || (Ve = !0),
            t.memoizedState = s,
            t.baseQueue === null && (t.baseState = s),
            n.lastRenderedState = s
        }
        return [s, l]
    }
    function mf(e, t, n) {
        var l = se
          , i = qe()
          , s = ye;
        if (s) {
            if (n === void 0)
                throw Error(o(407));
            n = n()
        } else
            n = t();
        var h = !mt((Oe || i).memoizedState, n);
        if (h && (i.memoizedState = n,
        Ve = !0),
        i = i.queue,
        $s(yf.bind(null, l, i, e), [e]),
        i.getSnapshot !== t || h || Ye !== null && Ye.memoizedState.tag & 1) {
            if (l.flags |= 2048,
            Tl(9, {
                destroy: void 0
            }, pf.bind(null, l, i, n, t), null),
            je === null)
                throw Error(o(349));
            s || (Ft & 127) !== 0 || gf(l, t, n)
        }
        return n
    }
    function gf(e, t, n) {
        e.flags |= 16384,
        e = {
            getSnapshot: t,
            value: n
        },
        t = se.updateQueue,
        t === null ? (t = zi(),
        se.updateQueue = t,
        t.stores = [e]) : (n = t.stores,
        n === null ? t.stores = [e] : n.push(e))
    }
    function pf(e, t, n, l) {
        t.value = n,
        t.getSnapshot = l,
        vf(t) && xf(e)
    }
    function yf(e, t, n) {
        return n(function() {
            vf(t) && xf(e)
        })
    }
    function vf(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var n = t();
            return !mt(e, n)
        } catch {
            return !0
        }
    }
    function xf(e) {
        var t = Qn(e, 2);
        t !== null && ct(t, e, 2)
    }
    function ks(e) {
        var t = lt();
        if (typeof e == "function") {
            var n = e;
            if (e = n(),
            Pn) {
                fn(!0);
                try {
                    n()
                } finally {
                    fn(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e,
        t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Wt,
            lastRenderedState: e
        },
        t
    }
    function bf(e, t, n, l) {
        return e.baseState = n,
        Zs(e, Oe, typeof l == "function" ? l : Wt)
    }
    function u0(e, t, n, l, i) {
        if (qi(e))
            throw Error(o(485));
        if (e = t.action,
        e !== null) {
            var s = {
                payload: i,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(h) {
                    s.listeners.push(h)
                }
            };
            L.T !== null ? n(!0) : s.isTransition = !1,
            l(s),
            n = t.pending,
            n === null ? (s.next = t.pending = s,
            Sf(t, s)) : (s.next = n.next,
            t.pending = n.next = s)
        }
    }
    function Sf(e, t) {
        var n = t.action
          , l = t.payload
          , i = e.state;
        if (t.isTransition) {
            var s = L.T
              , h = {};
            L.T = h;
            try {
                var y = n(i, l)
                  , _ = L.S;
                _ !== null && _(h, y),
                Ef(e, t, y)
            } catch (j) {
                Js(e, t, j)
            } finally {
                s !== null && h.types !== null && (s.types = h.types),
                L.T = s
            }
        } else
            try {
                s = n(i, l),
                Ef(e, t, s)
            } catch (j) {
                Js(e, t, j)
            }
    }
    function Ef(e, t, n) {
        n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(function(l) {
            wf(e, t, l)
        }, function(l) {
            return Js(e, t, l)
        }) : wf(e, t, n)
    }
    function wf(e, t, n) {
        t.status = "fulfilled",
        t.value = n,
        _f(t),
        e.state = n,
        t = e.pending,
        t !== null && (n = t.next,
        n === t ? e.pending = null : (n = n.next,
        t.next = n,
        Sf(e, n)))
    }
    function Js(e, t, n) {
        var l = e.pending;
        if (e.pending = null,
        l !== null) {
            l = l.next;
            do
                t.status = "rejected",
                t.reason = n,
                _f(t),
                t = t.next;
            while (t !== l)
        }
        e.action = null
    }
    function _f(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)
            (0,
            e[t])()
    }
    function Cf(e, t) {
        return t
    }
    function Af(e, t) {
        if (ye) {
            var n = je.formState;
            if (n !== null) {
                e: {
                    var l = se;
                    if (ye) {
                        if (De) {
                            t: {
                                for (var i = De, s = Tt; i.nodeType !== 8; ) {
                                    if (!s) {
                                        i = null;
                                        break t
                                    }
                                    if (i = Nt(i.nextSibling),
                                    i === null) {
                                        i = null;
                                        break t
                                    }
                                }
                                s = i.data,
                                i = s === "F!" || s === "F" ? i : null
                            }
                            if (i) {
                                De = Nt(i.nextSibling),
                                l = i.data === "F!";
                                break e
                            }
                        }
                        pn(l)
                    }
                    l = !1
                }
                l && (t = n[0])
            }
        }
        return n = lt(),
        n.memoizedState = n.baseState = t,
        l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Cf,
            lastRenderedState: t
        },
        n.queue = l,
        n = Zf.bind(null, se, l),
        l.dispatch = n,
        l = ks(!1),
        s = er.bind(null, se, !1, l.queue),
        l = lt(),
        i = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        },
        l.queue = i,
        n = u0.bind(null, se, i, s, n),
        i.dispatch = n,
        l.memoizedState = e,
        [t, n, !1]
    }
    function Tf(e) {
        var t = qe();
        return Of(t, Oe, e)
    }
    function Of(e, t, n) {
        if (t = Zs(e, t, Cf)[0],
        e = Ui(Wt)[0],
        typeof t == "object" && t !== null && typeof t.then == "function")
            try {
                var l = pa(t)
            } catch (h) {
                throw h === El ? Ai : h
            }
        else
            l = t;
        t = qe();
        var i = t.queue
          , s = i.dispatch;
        return n !== t.memoizedState && (se.flags |= 2048,
        Tl(9, {
            destroy: void 0
        }, s0.bind(null, i, n), null)),
        [l, s, e]
    }
    function s0(e, t) {
        e.action = t
    }
    function Nf(e) {
        var t = qe()
          , n = Oe;
        if (n !== null)
            return Of(t, n, e);
        qe(),
        t = t.memoizedState,
        n = qe();
        var l = n.queue.dispatch;
        return n.memoizedState = e,
        [t, l, !1]
    }
    function Tl(e, t, n, l) {
        return e = {
            tag: e,
            create: n,
            deps: l,
            inst: t,
            next: null
        },
        t = se.updateQueue,
        t === null && (t = zi(),
        se.updateQueue = t),
        n = t.lastEffect,
        n === null ? t.lastEffect = e.next = e : (l = n.next,
        n.next = e,
        e.next = l,
        t.lastEffect = e),
        e
    }
    function Rf() {
        return qe().memoizedState
    }
    function Bi(e, t, n, l) {
        var i = lt();
        se.flags |= e,
        i.memoizedState = Tl(1 | t, {
            destroy: void 0
        }, n, l === void 0 ? null : l)
    }
    function Hi(e, t, n, l) {
        var i = qe();
        l = l === void 0 ? null : l;
        var s = i.memoizedState.inst;
        Oe !== null && l !== null && qs(l, Oe.memoizedState.deps) ? i.memoizedState = Tl(t, s, n, l) : (se.flags |= e,
        i.memoizedState = Tl(1 | t, s, n, l))
    }
    function jf(e, t) {
        Bi(8390656, 8, e, t)
    }
    function $s(e, t) {
        Hi(2048, 8, e, t)
    }
    function r0(e) {
        se.flags |= 4;
        var t = se.updateQueue;
        if (t === null)
            t = zi(),
            se.updateQueue = t,
            t.events = [e];
        else {
            var n = t.events;
            n === null ? t.events = [e] : n.push(e)
        }
    }
    function Df(e) {
        var t = qe().memoizedState;
        return r0({
            ref: t,
            nextImpl: e
        }),
        function() {
            if ((Se & 2) !== 0)
                throw Error(o(440));
            return t.impl.apply(void 0, arguments)
        }
    }
    function Mf(e, t) {
        return Hi(4, 2, e, t)
    }
    function zf(e, t) {
        return Hi(4, 4, e, t)
    }
    function Lf(e, t) {
        if (typeof t == "function") {
            e = e();
            var n = t(e);
            return function() {
                typeof n == "function" ? n() : t(null)
            }
        }
        if (t != null)
            return e = e(),
            t.current = e,
            function() {
                t.current = null
            }
    }
    function Uf(e, t, n) {
        n = n != null ? n.concat([e]) : null,
        Hi(4, 4, Lf.bind(null, t, e), n)
    }
    function Fs() {}
    function Bf(e, t) {
        var n = qe();
        t = t === void 0 ? null : t;
        var l = n.memoizedState;
        return t !== null && qs(t, l[1]) ? l[0] : (n.memoizedState = [e, t],
        e)
    }
    function Hf(e, t) {
        var n = qe();
        t = t === void 0 ? null : t;
        var l = n.memoizedState;
        if (t !== null && qs(t, l[1]))
            return l[0];
        if (l = e(),
        Pn) {
            fn(!0);
            try {
                e()
            } finally {
                fn(!1)
            }
        }
        return n.memoizedState = [l, t],
        l
    }
    function Ws(e, t, n) {
        return n === void 0 || (Ft & 1073741824) !== 0 && (me & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n,
        e = qd(),
        se.lanes |= e,
        Cn |= e,
        n)
    }
    function qf(e, t, n, l) {
        return mt(n, t) ? n : _l.current !== null ? (e = Ws(e, n, l),
        mt(e, t) || (Ve = !0),
        e) : (Ft & 42) === 0 || (Ft & 1073741824) !== 0 && (me & 261930) === 0 ? (Ve = !0,
        e.memoizedState = n) : (e = qd(),
        se.lanes |= e,
        Cn |= e,
        t)
    }
    function Gf(e, t, n, l, i) {
        var s = X.p;
        X.p = s !== 0 && 8 > s ? s : 8;
        var h = L.T
          , y = {};
        L.T = y,
        er(e, !1, t, n);
        try {
            var _ = i()
              , j = L.S;
            if (j !== null && j(y, _),
            _ !== null && typeof _ == "object" && typeof _.then == "function") {
                var B = l0(_, l);
                ya(e, t, B, bt(e))
            } else
                ya(e, t, l, bt(e))
        } catch (Y) {
            ya(e, t, {
                then: function() {},
                status: "rejected",
                reason: Y
            }, bt())
        } finally {
            X.p = s,
            h !== null && y.types !== null && (h.types = y.types),
            L.T = h
        }
    }
    function o0() {}
    function Ps(e, t, n, l) {
        if (e.tag !== 5)
            throw Error(o(476));
        var i = Yf(e).queue;
        Gf(e, i, t, te, n === null ? o0 : function() {
            return Vf(e),
            n(l)
        }
        )
    }
    function Yf(e) {
        var t = e.memoizedState;
        if (t !== null)
            return t;
        t = {
            memoizedState: te,
            baseState: te,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Wt,
                lastRenderedState: te
            },
            next: null
        };
        var n = {};
        return t.next = {
            memoizedState: n,
            baseState: n,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: Wt,
                lastRenderedState: n
            },
            next: null
        },
        e.memoizedState = t,
        e = e.alternate,
        e !== null && (e.memoizedState = t),
        t
    }
    function Vf(e) {
        var t = Yf(e);
        t.next === null && (t = e.alternate.memoizedState),
        ya(e, t.next.queue, {}, bt())
    }
    function Is() {
        return We(za)
    }
    function Qf() {
        return qe().memoizedState
    }
    function Xf() {
        return qe().memoizedState
    }
    function c0(e) {
        for (var t = e.return; t !== null; ) {
            switch (t.tag) {
            case 24:
            case 3:
                var n = bt();
                e = xn(n);
                var l = bn(t, e, n);
                l !== null && (ct(l, t, n),
                da(l, t, n)),
                t = {
                    cache: Os()
                },
                e.payload = t;
                return
            }
            t = t.return
        }
    }
    function f0(e, t, n) {
        var l = bt();
        n = {
            lane: l,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        qi(e) ? Kf(t, n) : (n = ys(e, t, n, l),
        n !== null && (ct(n, e, l),
        kf(n, t, l)))
    }
    function Zf(e, t, n) {
        var l = bt();
        ya(e, t, n, l)
    }
    function ya(e, t, n, l) {
        var i = {
            lane: l,
            revertLane: 0,
            gesture: null,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (qi(e))
            Kf(t, i);
        else {
            var s = e.alternate;
            if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer,
            s !== null))
                try {
                    var h = t.lastRenderedState
                      , y = s(h, n);
                    if (i.hasEagerState = !0,
                    i.eagerState = y,
                    mt(y, h))
                        return xi(e, t, i, 0),
                        je === null && vi(),
                        !1
                } catch {}
            if (n = ys(e, t, i, l),
            n !== null)
                return ct(n, e, l),
                kf(n, t, l),
                !0
        }
        return !1
    }
    function er(e, t, n, l) {
        if (l = {
            lane: 2,
            revertLane: Dr(),
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        },
        qi(e)) {
            if (t)
                throw Error(o(479))
        } else
            t = ys(e, n, l, 2),
            t !== null && ct(t, e, 2)
    }
    function qi(e) {
        var t = e.alternate;
        return e === se || t !== null && t === se
    }
    function Kf(e, t) {
        Cl = Di = !0;
        var n = e.pending;
        n === null ? t.next = t : (t.next = n.next,
        n.next = t),
        e.pending = t
    }
    function kf(e, t, n) {
        if ((n & 4194048) !== 0) {
            var l = t.lanes;
            l &= e.pendingLanes,
            n |= l,
            t.lanes = n,
            Wo(e, n)
        }
    }
    var va = {
        readContext: We,
        use: Li,
        useCallback: Le,
        useContext: Le,
        useEffect: Le,
        useImperativeHandle: Le,
        useLayoutEffect: Le,
        useInsertionEffect: Le,
        useMemo: Le,
        useReducer: Le,
        useRef: Le,
        useState: Le,
        useDebugValue: Le,
        useDeferredValue: Le,
        useTransition: Le,
        useSyncExternalStore: Le,
        useId: Le,
        useHostTransitionStatus: Le,
        useFormState: Le,
        useActionState: Le,
        useOptimistic: Le,
        useMemoCache: Le,
        useCacheRefresh: Le
    };
    va.useEffectEvent = Le;
    var Jf = {
        readContext: We,
        use: Li,
        useCallback: function(e, t) {
            return lt().memoizedState = [e, t === void 0 ? null : t],
            e
        },
        useContext: We,
        useEffect: jf,
        useImperativeHandle: function(e, t, n) {
            n = n != null ? n.concat([e]) : null,
            Bi(4194308, 4, Lf.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return Bi(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            Bi(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = lt();
            t = t === void 0 ? null : t;
            var l = e();
            if (Pn) {
                fn(!0);
                try {
                    e()
                } finally {
                    fn(!1)
                }
            }
            return n.memoizedState = [l, t],
            l
        },
        useReducer: function(e, t, n) {
            var l = lt();
            if (n !== void 0) {
                var i = n(t);
                if (Pn) {
                    fn(!0);
                    try {
                        n(t)
                    } finally {
                        fn(!1)
                    }
                }
            } else
                i = t;
            return l.memoizedState = l.baseState = i,
            e = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: i
            },
            l.queue = e,
            e = e.dispatch = f0.bind(null, se, e),
            [l.memoizedState, e]
        },
        useRef: function(e) {
            var t = lt();
            return e = {
                current: e
            },
            t.memoizedState = e
        },
        useState: function(e) {
            e = ks(e);
            var t = e.queue
              , n = Zf.bind(null, se, t);
            return t.dispatch = n,
            [e.memoizedState, n]
        },
        useDebugValue: Fs,
        useDeferredValue: function(e, t) {
            var n = lt();
            return Ws(n, e, t)
        },
        useTransition: function() {
            var e = ks(!1);
            return e = Gf.bind(null, se, e.queue, !0, !1),
            lt().memoizedState = e,
            [!1, e]
        },
        useSyncExternalStore: function(e, t, n) {
            var l = se
              , i = lt();
            if (ye) {
                if (n === void 0)
                    throw Error(o(407));
                n = n()
            } else {
                if (n = t(),
                je === null)
                    throw Error(o(349));
                (me & 127) !== 0 || gf(l, t, n)
            }
            i.memoizedState = n;
            var s = {
                value: n,
                getSnapshot: t
            };
            return i.queue = s,
            jf(yf.bind(null, l, s, e), [e]),
            l.flags |= 2048,
            Tl(9, {
                destroy: void 0
            }, pf.bind(null, l, s, n, t), null),
            n
        },
        useId: function() {
            var e = lt()
              , t = je.identifierPrefix;
            if (ye) {
                var n = Bt
                  , l = Ut;
                n = (l & ~(1 << 32 - ht(l) - 1)).toString(32) + n,
                t = "_" + t + "R_" + n,
                n = Mi++,
                0 < n && (t += "H" + n.toString(32)),
                t += "_"
            } else
                n = a0++,
                t = "_" + t + "r_" + n.toString(32) + "_";
            return e.memoizedState = t
        },
        useHostTransitionStatus: Is,
        useFormState: Af,
        useActionState: Af,
        useOptimistic: function(e) {
            var t = lt();
            t.memoizedState = t.baseState = e;
            var n = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: null,
                lastRenderedState: null
            };
            return t.queue = n,
            t = er.bind(null, se, !0, n),
            n.dispatch = t,
            [e, t]
        },
        useMemoCache: Xs,
        useCacheRefresh: function() {
            return lt().memoizedState = c0.bind(null, se)
        },
        useEffectEvent: function(e) {
            var t = lt()
              , n = {
                impl: e
            };
            return t.memoizedState = n,
            function() {
                if ((Se & 2) !== 0)
                    throw Error(o(440));
                return n.impl.apply(void 0, arguments)
            }
        }
    }
      , tr = {
        readContext: We,
        use: Li,
        useCallback: Bf,
        useContext: We,
        useEffect: $s,
        useImperativeHandle: Uf,
        useInsertionEffect: Mf,
        useLayoutEffect: zf,
        useMemo: Hf,
        useReducer: Ui,
        useRef: Rf,
        useState: function() {
            return Ui(Wt)
        },
        useDebugValue: Fs,
        useDeferredValue: function(e, t) {
            var n = qe();
            return qf(n, Oe.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Ui(Wt)[0]
              , t = qe().memoizedState;
            return [typeof e == "boolean" ? e : pa(e), t]
        },
        useSyncExternalStore: mf,
        useId: Qf,
        useHostTransitionStatus: Is,
        useFormState: Tf,
        useActionState: Tf,
        useOptimistic: function(e, t) {
            var n = qe();
            return bf(n, Oe, e, t)
        },
        useMemoCache: Xs,
        useCacheRefresh: Xf
    };
    tr.useEffectEvent = Df;
    var $f = {
        readContext: We,
        use: Li,
        useCallback: Bf,
        useContext: We,
        useEffect: $s,
        useImperativeHandle: Uf,
        useInsertionEffect: Mf,
        useLayoutEffect: zf,
        useMemo: Hf,
        useReducer: Ks,
        useRef: Rf,
        useState: function() {
            return Ks(Wt)
        },
        useDebugValue: Fs,
        useDeferredValue: function(e, t) {
            var n = qe();
            return Oe === null ? Ws(n, e, t) : qf(n, Oe.memoizedState, e, t)
        },
        useTransition: function() {
            var e = Ks(Wt)[0]
              , t = qe().memoizedState;
            return [typeof e == "boolean" ? e : pa(e), t]
        },
        useSyncExternalStore: mf,
        useId: Qf,
        useHostTransitionStatus: Is,
        useFormState: Nf,
        useActionState: Nf,
        useOptimistic: function(e, t) {
            var n = qe();
            return Oe !== null ? bf(n, Oe, e, t) : (n.baseState = e,
            [e, n.queue.dispatch])
        },
        useMemoCache: Xs,
        useCacheRefresh: Xf
    };
    $f.useEffectEvent = Df;
    function nr(e, t, n, l) {
        t = e.memoizedState,
        n = n(l, t),
        n = n == null ? t : v({}, t, n),
        e.memoizedState = n,
        e.lanes === 0 && (e.updateQueue.baseState = n)
    }
    var lr = {
        enqueueSetState: function(e, t, n) {
            e = e._reactInternals;
            var l = bt()
              , i = xn(l);
            i.payload = t,
            n != null && (i.callback = n),
            t = bn(e, i, l),
            t !== null && (ct(t, e, l),
            da(t, e, l))
        },
        enqueueReplaceState: function(e, t, n) {
            e = e._reactInternals;
            var l = bt()
              , i = xn(l);
            i.tag = 1,
            i.payload = t,
            n != null && (i.callback = n),
            t = bn(e, i, l),
            t !== null && (ct(t, e, l),
            da(t, e, l))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var n = bt()
              , l = xn(n);
            l.tag = 2,
            t != null && (l.callback = t),
            t = bn(e, l, n),
            t !== null && (ct(t, e, n),
            da(t, e, n))
        }
    };
    function Ff(e, t, n, l, i, s, h) {
        return e = e.stateNode,
        typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(l, s, h) : t.prototype && t.prototype.isPureReactComponent ? !aa(n, l) || !aa(i, s) : !0
    }
    function Wf(e, t, n, l) {
        e = t.state,
        typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, l),
        typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, l),
        t.state !== e && lr.enqueueReplaceState(t, t.state, null)
    }
    function In(e, t) {
        var n = t;
        if ("ref"in t) {
            n = {};
            for (var l in t)
                l !== "ref" && (n[l] = t[l])
        }
        if (e = e.defaultProps) {
            n === t && (n = v({}, n));
            for (var i in e)
                n[i] === void 0 && (n[i] = e[i])
        }
        return n
    }
    function Pf(e) {
        yi(e)
    }
    function If(e) {
        console.error(e)
    }
    function ed(e) {
        yi(e)
    }
    function Gi(e, t) {
        try {
            var n = e.onUncaughtError;
            n(t.value, {
                componentStack: t.stack
            })
        } catch (l) {
            setTimeout(function() {
                throw l
            })
        }
    }
    function td(e, t, n) {
        try {
            var l = e.onCaughtError;
            l(n.value, {
                componentStack: n.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (i) {
            setTimeout(function() {
                throw i
            })
        }
    }
    function ar(e, t, n) {
        return n = xn(n),
        n.tag = 3,
        n.payload = {
            element: null
        },
        n.callback = function() {
            Gi(e, t)
        }
        ,
        n
    }
    function nd(e) {
        return e = xn(e),
        e.tag = 3,
        e
    }
    function ld(e, t, n, l) {
        var i = n.type.getDerivedStateFromError;
        if (typeof i == "function") {
            var s = l.value;
            e.payload = function() {
                return i(s)
            }
            ,
            e.callback = function() {
                td(t, n, l)
            }
        }
        var h = n.stateNode;
        h !== null && typeof h.componentDidCatch == "function" && (e.callback = function() {
            td(t, n, l),
            typeof i != "function" && (An === null ? An = new Set([this]) : An.add(this));
            var y = l.stack;
            this.componentDidCatch(l.value, {
                componentStack: y !== null ? y : ""
            })
        }
        )
    }
    function d0(e, t, n, l, i) {
        if (n.flags |= 32768,
        l !== null && typeof l == "object" && typeof l.then == "function") {
            if (t = n.alternate,
            t !== null && xl(t, n, i, !0),
            n = pt.current,
            n !== null) {
                switch (n.tag) {
                case 31:
                case 13:
                    return Ot === null ? Pi() : n.alternate === null && Ue === 0 && (Ue = 3),
                    n.flags &= -257,
                    n.flags |= 65536,
                    n.lanes = i,
                    l === Ti ? n.flags |= 16384 : (t = n.updateQueue,
                    t === null ? n.updateQueue = new Set([l]) : t.add(l),
                    Nr(e, l, i)),
                    !1;
                case 22:
                    return n.flags |= 65536,
                    l === Ti ? n.flags |= 16384 : (t = n.updateQueue,
                    t === null ? (t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([l])
                    },
                    n.updateQueue = t) : (n = t.retryQueue,
                    n === null ? t.retryQueue = new Set([l]) : n.add(l)),
                    Nr(e, l, i)),
                    !1
                }
                throw Error(o(435, n.tag))
            }
            return Nr(e, l, i),
            Pi(),
            !1
        }
        if (ye)
            return t = pt.current,
            t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            t.flags |= 65536,
            t.lanes = i,
            l !== ws && (e = Error(o(422), {
                cause: l
            }),
            sa(_t(e, n)))) : (l !== ws && (t = Error(o(423), {
                cause: l
            }),
            sa(_t(t, n))),
            e = e.current.alternate,
            e.flags |= 65536,
            i &= -i,
            e.lanes |= i,
            l = _t(l, n),
            i = ar(e.stateNode, l, i),
            zs(e, i),
            Ue !== 4 && (Ue = 2)),
            !1;
        var s = Error(o(520), {
            cause: l
        });
        if (s = _t(s, n),
        Aa === null ? Aa = [s] : Aa.push(s),
        Ue !== 4 && (Ue = 2),
        t === null)
            return !0;
        l = _t(l, n),
        n = t;
        do {
            switch (n.tag) {
            case 3:
                return n.flags |= 65536,
                e = i & -i,
                n.lanes |= e,
                e = ar(n.stateNode, l, e),
                zs(n, e),
                !1;
            case 1:
                if (t = n.type,
                s = n.stateNode,
                (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (An === null || !An.has(s))))
                    return n.flags |= 65536,
                    i &= -i,
                    n.lanes |= i,
                    i = nd(i),
                    ld(i, e, n, l),
                    zs(n, i),
                    !1
            }
            n = n.return
        } while (n !== null);
        return !1
    }
    var ir = Error(o(461))
      , Ve = !1;
    function Pe(e, t, n, l) {
        t.child = e === null ? sf(t, null, n, l) : Wn(t, e.child, n, l)
    }
    function ad(e, t, n, l, i) {
        n = n.render;
        var s = t.ref;
        if ("ref"in l) {
            var h = {};
            for (var y in l)
                y !== "ref" && (h[y] = l[y])
        } else
            h = l;
        return kn(t),
        l = Gs(e, t, n, h, s, i),
        y = Ys(),
        e !== null && !Ve ? (Vs(e, t, i),
        Pt(e, t, i)) : (ye && y && Ss(t),
        t.flags |= 1,
        Pe(e, t, l, i),
        t.child)
    }
    function id(e, t, n, l, i) {
        if (e === null) {
            var s = n.type;
            return typeof s == "function" && !vs(s) && s.defaultProps === void 0 && n.compare === null ? (t.tag = 15,
            t.type = s,
            ud(e, t, s, l, i)) : (e = Si(n.type, null, l, t, t.mode, i),
            e.ref = t.ref,
            e.return = t,
            t.child = e)
        }
        if (s = e.child,
        !hr(e, i)) {
            var h = s.memoizedProps;
            if (n = n.compare,
            n = n !== null ? n : aa,
            n(h, l) && e.ref === t.ref)
                return Pt(e, t, i)
        }
        return t.flags |= 1,
        e = Kt(s, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e
    }
    function ud(e, t, n, l, i) {
        if (e !== null) {
            var s = e.memoizedProps;
            if (aa(s, l) && e.ref === t.ref)
                if (Ve = !1,
                t.pendingProps = l = s,
                hr(e, i))
                    (e.flags & 131072) !== 0 && (Ve = !0);
                else
                    return t.lanes = e.lanes,
                    Pt(e, t, i)
        }
        return ur(e, t, n, l, i)
    }
    function sd(e, t, n, l) {
        var i = l.children
          , s = e !== null ? e.memoizedState : null;
        if (e === null && t.stateNode === null && (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        l.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (s = s !== null ? s.baseLanes | n : n,
                e !== null) {
                    for (l = t.child = e.child,
                    i = 0; l !== null; )
                        i = i | l.lanes | l.childLanes,
                        l = l.sibling;
                    l = i & ~s
                } else
                    l = 0,
                    t.child = null;
                return rd(e, t, s, n, l)
            }
            if ((n & 536870912) !== 0)
                t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                },
                e !== null && Ci(t, s !== null ? s.cachePool : null),
                s !== null ? cf(t, s) : Us(),
                ff(t);
            else
                return l = t.lanes = 536870912,
                rd(e, t, s !== null ? s.baseLanes | n : n, n, l)
        } else
            s !== null ? (Ci(t, s.cachePool),
            cf(t, s),
            En(),
            t.memoizedState = null) : (e !== null && Ci(t, null),
            Us(),
            En());
        return Pe(e, t, i, n),
        t.child
    }
    function xa(e, t) {
        return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }),
        t.sibling
    }
    function rd(e, t, n, l, i) {
        var s = Rs();
        return s = s === null ? null : {
            parent: Ge._currentValue,
            pool: s
        },
        t.memoizedState = {
            baseLanes: n,
            cachePool: s
        },
        e !== null && Ci(t, null),
        Us(),
        ff(t),
        e !== null && xl(e, t, l, !0),
        t.childLanes = i,
        null
    }
    function Yi(e, t) {
        return t = Qi({
            mode: t.mode,
            children: t.children
        }, e.mode),
        t.ref = e.ref,
        e.child = t,
        t.return = e,
        t
    }
    function od(e, t, n) {
        return Wn(t, e.child, null, n),
        e = Yi(t, t.pendingProps),
        e.flags |= 2,
        yt(t),
        t.memoizedState = null,
        e
    }
    function h0(e, t, n) {
        var l = t.pendingProps
          , i = (t.flags & 128) !== 0;
        if (t.flags &= -129,
        e === null) {
            if (ye) {
                if (l.mode === "hidden")
                    return e = Yi(t, l),
                    t.lanes = 536870912,
                    xa(null, e);
                if (Hs(t),
                (e = De) ? (e = Sh(e, Tt),
                e = e !== null && e.data === "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: mn !== null ? {
                        id: Ut,
                        overflow: Bt
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                n = Zc(e),
                n.return = t,
                t.child = n,
                Fe = t,
                De = null)) : e = null,
                e === null)
                    throw pn(t);
                return t.lanes = 536870912,
                null
            }
            return Yi(t, l)
        }
        var s = e.memoizedState;
        if (s !== null) {
            var h = s.dehydrated;
            if (Hs(t),
            i)
                if (t.flags & 256)
                    t.flags &= -257,
                    t = od(e, t, n);
                else if (t.memoizedState !== null)
                    t.child = e.child,
                    t.flags |= 128,
                    t = null;
                else
                    throw Error(o(558));
            else if (Ve || xl(e, t, n, !1),
            i = (n & e.childLanes) !== 0,
            Ve || i) {
                if (l = je,
                l !== null && (h = Po(l, n),
                h !== 0 && h !== s.retryLane))
                    throw s.retryLane = h,
                    Qn(e, h),
                    ct(l, e, h),
                    ir;
                Pi(),
                t = od(e, t, n)
            } else
                e = s.treeContext,
                De = Nt(h.nextSibling),
                Fe = t,
                ye = !0,
                gn = null,
                Tt = !1,
                e !== null && Jc(t, e),
                t = Yi(t, l),
                t.flags |= 4096;
            return t
        }
        return e = Kt(e.child, {
            mode: l.mode,
            children: l.children
        }),
        e.ref = t.ref,
        t.child = e,
        e.return = t,
        e
    }
    function Vi(e, t) {
        var n = t.ref;
        if (n === null)
            e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof n != "function" && typeof n != "object")
                throw Error(o(284));
            (e === null || e.ref !== n) && (t.flags |= 4194816)
        }
    }
    function ur(e, t, n, l, i) {
        return kn(t),
        n = Gs(e, t, n, l, void 0, i),
        l = Ys(),
        e !== null && !Ve ? (Vs(e, t, i),
        Pt(e, t, i)) : (ye && l && Ss(t),
        t.flags |= 1,
        Pe(e, t, n, i),
        t.child)
    }
    function cd(e, t, n, l, i, s) {
        return kn(t),
        t.updateQueue = null,
        n = hf(t, l, n, i),
        df(e),
        l = Ys(),
        e !== null && !Ve ? (Vs(e, t, s),
        Pt(e, t, s)) : (ye && l && Ss(t),
        t.flags |= 1,
        Pe(e, t, n, s),
        t.child)
    }
    function fd(e, t, n, l, i) {
        if (kn(t),
        t.stateNode === null) {
            var s = gl
              , h = n.contextType;
            typeof h == "object" && h !== null && (s = We(h)),
            s = new n(l,s),
            t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null,
            s.updater = lr,
            t.stateNode = s,
            s._reactInternals = t,
            s = t.stateNode,
            s.props = l,
            s.state = t.memoizedState,
            s.refs = {},
            Ds(t),
            h = n.contextType,
            s.context = typeof h == "object" && h !== null ? We(h) : gl,
            s.state = t.memoizedState,
            h = n.getDerivedStateFromProps,
            typeof h == "function" && (nr(t, n, h, l),
            s.state = t.memoizedState),
            typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (h = s.state,
            typeof s.componentWillMount == "function" && s.componentWillMount(),
            typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(),
            h !== s.state && lr.enqueueReplaceState(s, s.state, null),
            ma(t, l, s, i),
            ha(),
            s.state = t.memoizedState),
            typeof s.componentDidMount == "function" && (t.flags |= 4194308),
            l = !0
        } else if (e === null) {
            s = t.stateNode;
            var y = t.memoizedProps
              , _ = In(n, y);
            s.props = _;
            var j = s.context
              , B = n.contextType;
            h = gl,
            typeof B == "object" && B !== null && (h = We(B));
            var Y = n.getDerivedStateFromProps;
            B = typeof Y == "function" || typeof s.getSnapshotBeforeUpdate == "function",
            y = t.pendingProps !== y,
            B || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (y || j !== h) && Wf(t, s, l, h),
            vn = !1;
            var D = t.memoizedState;
            s.state = D,
            ma(t, l, s, i),
            ha(),
            j = t.memoizedState,
            y || D !== j || vn ? (typeof Y == "function" && (nr(t, n, Y, l),
            j = t.memoizedState),
            (_ = vn || Ff(t, n, _, l, D, j, h)) ? (B || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(),
            typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()),
            typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
            t.memoizedProps = l,
            t.memoizedState = j),
            s.props = l,
            s.state = j,
            s.context = h,
            l = _) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308),
            l = !1)
        } else {
            s = t.stateNode,
            Ms(e, t),
            h = t.memoizedProps,
            B = In(n, h),
            s.props = B,
            Y = t.pendingProps,
            D = s.context,
            j = n.contextType,
            _ = gl,
            typeof j == "object" && j !== null && (_ = We(j)),
            y = n.getDerivedStateFromProps,
            (j = typeof y == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (h !== Y || D !== _) && Wf(t, s, l, _),
            vn = !1,
            D = t.memoizedState,
            s.state = D,
            ma(t, l, s, i),
            ha();
            var z = t.memoizedState;
            h !== Y || D !== z || vn || e !== null && e.dependencies !== null && wi(e.dependencies) ? (typeof y == "function" && (nr(t, n, y, l),
            z = t.memoizedState),
            (B = vn || Ff(t, n, B, l, D, z, _) || e !== null && e.dependencies !== null && wi(e.dependencies)) ? (j || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(l, z, _),
            typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(l, z, _)),
            typeof s.componentDidUpdate == "function" && (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || h === e.memoizedProps && D === e.memoizedState || (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && D === e.memoizedState || (t.flags |= 1024),
            t.memoizedProps = l,
            t.memoizedState = z),
            s.props = l,
            s.state = z,
            s.context = _,
            l = B) : (typeof s.componentDidUpdate != "function" || h === e.memoizedProps && D === e.memoizedState || (t.flags |= 4),
            typeof s.getSnapshotBeforeUpdate != "function" || h === e.memoizedProps && D === e.memoizedState || (t.flags |= 1024),
            l = !1)
        }
        return s = l,
        Vi(e, t),
        l = (t.flags & 128) !== 0,
        s || l ? (s = t.stateNode,
        n = l && typeof n.getDerivedStateFromError != "function" ? null : s.render(),
        t.flags |= 1,
        e !== null && l ? (t.child = Wn(t, e.child, null, i),
        t.child = Wn(t, null, n, i)) : Pe(e, t, n, i),
        t.memoizedState = s.state,
        e = t.child) : e = Pt(e, t, i),
        e
    }
    function dd(e, t, n, l) {
        return Zn(),
        t.flags |= 256,
        Pe(e, t, n, l),
        t.child
    }
    var sr = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };
    function rr(e) {
        return {
            baseLanes: e,
            cachePool: ef()
        }
    }
    function or(e, t, n) {
        return e = e !== null ? e.childLanes & ~n : 0,
        t && (e |= xt),
        e
    }
    function hd(e, t, n) {
        var l = t.pendingProps, i = !1, s = (t.flags & 128) !== 0, h;
        if ((h = s) || (h = e !== null && e.memoizedState === null ? !1 : (He.current & 2) !== 0),
        h && (i = !0,
        t.flags &= -129),
        h = (t.flags & 32) !== 0,
        t.flags &= -33,
        e === null) {
            if (ye) {
                if (i ? Sn(t) : En(),
                (e = De) ? (e = Sh(e, Tt),
                e = e !== null && e.data !== "&" ? e : null,
                e !== null && (t.memoizedState = {
                    dehydrated: e,
                    treeContext: mn !== null ? {
                        id: Ut,
                        overflow: Bt
                    } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                },
                n = Zc(e),
                n.return = t,
                t.child = n,
                Fe = t,
                De = null)) : e = null,
                e === null)
                    throw pn(t);
                return Zr(e) ? t.lanes = 32 : t.lanes = 536870912,
                null
            }
            var y = l.children;
            return l = l.fallback,
            i ? (En(),
            i = t.mode,
            y = Qi({
                mode: "hidden",
                children: y
            }, i),
            l = Xn(l, i, n, null),
            y.return = t,
            l.return = t,
            y.sibling = l,
            t.child = y,
            l = t.child,
            l.memoizedState = rr(n),
            l.childLanes = or(e, h, n),
            t.memoizedState = sr,
            xa(null, l)) : (Sn(t),
            cr(t, y))
        }
        var _ = e.memoizedState;
        if (_ !== null && (y = _.dehydrated,
        y !== null)) {
            if (s)
                t.flags & 256 ? (Sn(t),
                t.flags &= -257,
                t = fr(e, t, n)) : t.memoizedState !== null ? (En(),
                t.child = e.child,
                t.flags |= 128,
                t = null) : (En(),
                y = l.fallback,
                i = t.mode,
                l = Qi({
                    mode: "visible",
                    children: l.children
                }, i),
                y = Xn(y, i, n, null),
                y.flags |= 2,
                l.return = t,
                y.return = t,
                l.sibling = y,
                t.child = l,
                Wn(t, e.child, null, n),
                l = t.child,
                l.memoizedState = rr(n),
                l.childLanes = or(e, h, n),
                t.memoizedState = sr,
                t = xa(null, l));
            else if (Sn(t),
            Zr(y)) {
                if (h = y.nextSibling && y.nextSibling.dataset,
                h)
                    var j = h.dgst;
                h = j,
                l = Error(o(419)),
                l.stack = "",
                l.digest = h,
                sa({
                    value: l,
                    source: null,
                    stack: null
                }),
                t = fr(e, t, n)
            } else if (Ve || xl(e, t, n, !1),
            h = (n & e.childLanes) !== 0,
            Ve || h) {
                if (h = je,
                h !== null && (l = Po(h, n),
                l !== 0 && l !== _.retryLane))
                    throw _.retryLane = l,
                    Qn(e, l),
                    ct(h, e, l),
                    ir;
                Xr(y) || Pi(),
                t = fr(e, t, n)
            } else
                Xr(y) ? (t.flags |= 192,
                t.child = e.child,
                t = null) : (e = _.treeContext,
                De = Nt(y.nextSibling),
                Fe = t,
                ye = !0,
                gn = null,
                Tt = !1,
                e !== null && Jc(t, e),
                t = cr(t, l.children),
                t.flags |= 4096);
            return t
        }
        return i ? (En(),
        y = l.fallback,
        i = t.mode,
        _ = e.child,
        j = _.sibling,
        l = Kt(_, {
            mode: "hidden",
            children: l.children
        }),
        l.subtreeFlags = _.subtreeFlags & 65011712,
        j !== null ? y = Kt(j, y) : (y = Xn(y, i, n, null),
        y.flags |= 2),
        y.return = t,
        l.return = t,
        l.sibling = y,
        t.child = l,
        xa(null, l),
        l = t.child,
        y = e.child.memoizedState,
        y === null ? y = rr(n) : (i = y.cachePool,
        i !== null ? (_ = Ge._currentValue,
        i = i.parent !== _ ? {
            parent: _,
            pool: _
        } : i) : i = ef(),
        y = {
            baseLanes: y.baseLanes | n,
            cachePool: i
        }),
        l.memoizedState = y,
        l.childLanes = or(e, h, n),
        t.memoizedState = sr,
        xa(e.child, l)) : (Sn(t),
        n = e.child,
        e = n.sibling,
        n = Kt(n, {
            mode: "visible",
            children: l.children
        }),
        n.return = t,
        n.sibling = null,
        e !== null && (h = t.deletions,
        h === null ? (t.deletions = [e],
        t.flags |= 16) : h.push(e)),
        t.child = n,
        t.memoizedState = null,
        n)
    }
    function cr(e, t) {
        return t = Qi({
            mode: "visible",
            children: t
        }, e.mode),
        t.return = e,
        e.child = t
    }
    function Qi(e, t) {
        return e = gt(22, e, null, t),
        e.lanes = 0,
        e
    }
    function fr(e, t, n) {
        return Wn(t, e.child, null, n),
        e = cr(t, t.pendingProps.children),
        e.flags |= 2,
        t.memoizedState = null,
        e
    }
    function md(e, t, n) {
        e.lanes |= t;
        var l = e.alternate;
        l !== null && (l.lanes |= t),
        As(e.return, t, n)
    }
    function dr(e, t, n, l, i, s) {
        var h = e.memoizedState;
        h === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: l,
            tail: n,
            tailMode: i,
            treeForkCount: s
        } : (h.isBackwards = t,
        h.rendering = null,
        h.renderingStartTime = 0,
        h.last = l,
        h.tail = n,
        h.tailMode = i,
        h.treeForkCount = s)
    }
    function gd(e, t, n) {
        var l = t.pendingProps
          , i = l.revealOrder
          , s = l.tail;
        l = l.children;
        var h = He.current
          , y = (h & 2) !== 0;
        if (y ? (h = h & 1 | 2,
        t.flags |= 128) : h &= 1,
        K(He, h),
        Pe(e, t, l, n),
        l = ye ? ua : 0,
        !y && e !== null && (e.flags & 128) !== 0)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && md(e, n, t);
                else if (e.tag === 19)
                    md(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        switch (i) {
        case "forwards":
            for (n = t.child,
            i = null; n !== null; )
                e = n.alternate,
                e !== null && ji(e) === null && (i = n),
                n = n.sibling;
            n = i,
            n === null ? (i = t.child,
            t.child = null) : (i = n.sibling,
            n.sibling = null),
            dr(t, !1, i, n, s, l);
            break;
        case "backwards":
        case "unstable_legacy-backwards":
            for (n = null,
            i = t.child,
            t.child = null; i !== null; ) {
                if (e = i.alternate,
                e !== null && ji(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling,
                i.sibling = n,
                n = i,
                i = e
            }
            dr(t, !0, n, null, s, l);
            break;
        case "together":
            dr(t, !1, null, null, void 0, l);
            break;
        default:
            t.memoizedState = null
        }
        return t.child
    }
    function Pt(e, t, n) {
        if (e !== null && (t.dependencies = e.dependencies),
        Cn |= t.lanes,
        (n & t.childLanes) === 0)
            if (e !== null) {
                if (xl(e, t, n, !1),
                (n & t.childLanes) === 0)
                    return null
            } else
                return null;
        if (e !== null && t.child !== e.child)
            throw Error(o(153));
        if (t.child !== null) {
            for (e = t.child,
            n = Kt(e, e.pendingProps),
            t.child = n,
            n.return = t; e.sibling !== null; )
                e = e.sibling,
                n = n.sibling = Kt(e, e.pendingProps),
                n.return = t;
            n.sibling = null
        }
        return t.child
    }
    function hr(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies,
        !!(e !== null && wi(e)))
    }
    function m0(e, t, n) {
        switch (t.tag) {
        case 3:
            nt(t, t.stateNode.containerInfo),
            yn(t, Ge, e.memoizedState.cache),
            Zn();
            break;
        case 27:
        case 5:
            Zl(t);
            break;
        case 4:
            nt(t, t.stateNode.containerInfo);
            break;
        case 10:
            yn(t, t.type, t.memoizedProps.value);
            break;
        case 31:
            if (t.memoizedState !== null)
                return t.flags |= 128,
                Hs(t),
                null;
            break;
        case 13:
            var l = t.memoizedState;
            if (l !== null)
                return l.dehydrated !== null ? (Sn(t),
                t.flags |= 128,
                null) : (n & t.child.childLanes) !== 0 ? hd(e, t, n) : (Sn(t),
                e = Pt(e, t, n),
                e !== null ? e.sibling : null);
            Sn(t);
            break;
        case 19:
            var i = (e.flags & 128) !== 0;
            if (l = (n & t.childLanes) !== 0,
            l || (xl(e, t, n, !1),
            l = (n & t.childLanes) !== 0),
            i) {
                if (l)
                    return gd(e, t, n);
                t.flags |= 128
            }
            if (i = t.memoizedState,
            i !== null && (i.rendering = null,
            i.tail = null,
            i.lastEffect = null),
            K(He, He.current),
            l)
                break;
            return null;
        case 22:
            return t.lanes = 0,
            sd(e, t, n, t.pendingProps);
        case 24:
            yn(t, Ge, e.memoizedState.cache)
        }
        return Pt(e, t, n)
    }
    function pd(e, t, n) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps)
                Ve = !0;
            else {
                if (!hr(e, n) && (t.flags & 128) === 0)
                    return Ve = !1,
                    m0(e, t, n);
                Ve = (e.flags & 131072) !== 0
            }
        else
            Ve = !1,
            ye && (t.flags & 1048576) !== 0 && kc(t, ua, t.index);
        switch (t.lanes = 0,
        t.tag) {
        case 16:
            e: {
                var l = t.pendingProps;
                if (e = $n(t.elementType),
                t.type = e,
                typeof e == "function")
                    vs(e) ? (l = In(e, l),
                    t.tag = 1,
                    t = fd(null, t, e, l, n)) : (t.tag = 0,
                    t = ur(null, t, e, l, n));
                else {
                    if (e != null) {
                        var i = e.$$typeof;
                        if (i === J) {
                            t.tag = 11,
                            t = ad(null, t, e, l, n);
                            break e
                        } else if (i === P) {
                            t.tag = 14,
                            t = id(null, t, e, l, n);
                            break e
                        }
                    }
                    throw t = ce(e) || e,
                    Error(o(306, t, ""))
                }
            }
            return t;
        case 0:
            return ur(e, t, t.type, t.pendingProps, n);
        case 1:
            return l = t.type,
            i = In(l, t.pendingProps),
            fd(e, t, l, i, n);
        case 3:
            e: {
                if (nt(t, t.stateNode.containerInfo),
                e === null)
                    throw Error(o(387));
                l = t.pendingProps;
                var s = t.memoizedState;
                i = s.element,
                Ms(e, t),
                ma(t, l, null, n);
                var h = t.memoizedState;
                if (l = h.cache,
                yn(t, Ge, l),
                l !== s.cache && Ts(t, [Ge], n, !0),
                ha(),
                l = h.element,
                s.isDehydrated)
                    if (s = {
                        element: l,
                        isDehydrated: !1,
                        cache: h.cache
                    },
                    t.updateQueue.baseState = s,
                    t.memoizedState = s,
                    t.flags & 256) {
                        t = dd(e, t, l, n);
                        break e
                    } else if (l !== i) {
                        i = _t(Error(o(424)), t),
                        sa(i),
                        t = dd(e, t, l, n);
                        break e
                    } else
                        for (e = t.stateNode.containerInfo,
                        e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e,
                        De = Nt(e.firstChild),
                        Fe = t,
                        ye = !0,
                        gn = null,
                        Tt = !0,
                        n = sf(t, null, l, n),
                        t.child = n; n; )
                            n.flags = n.flags & -3 | 4096,
                            n = n.sibling;
                else {
                    if (Zn(),
                    l === i) {
                        t = Pt(e, t, n);
                        break e
                    }
                    Pe(e, t, l, n)
                }
                t = t.child
            }
            return t;
        case 26:
            return Vi(e, t),
            e === null ? (n = Th(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : ye || (n = t.type,
            e = t.pendingProps,
            l = iu(fe.current).createElement(n),
            l[$e] = t,
            l[at] = e,
            Ie(l, n, e),
            Ke(l),
            t.stateNode = l) : t.memoizedState = Th(t.type, e.memoizedProps, t.pendingProps, e.memoizedState),
            null;
        case 27:
            return Zl(t),
            e === null && ye && (l = t.stateNode = _h(t.type, t.pendingProps, fe.current),
            Fe = t,
            Tt = !0,
            i = De,
            Rn(t.type) ? (Kr = i,
            De = Nt(l.firstChild)) : De = i),
            Pe(e, t, t.pendingProps.children, n),
            Vi(e, t),
            e === null && (t.flags |= 4194304),
            t.child;
        case 5:
            return e === null && ye && ((i = l = De) && (l = X0(l, t.type, t.pendingProps, Tt),
            l !== null ? (t.stateNode = l,
            Fe = t,
            De = Nt(l.firstChild),
            Tt = !1,
            i = !0) : i = !1),
            i || pn(t)),
            Zl(t),
            i = t.type,
            s = t.pendingProps,
            h = e !== null ? e.memoizedProps : null,
            l = s.children,
            Yr(i, s) ? l = null : h !== null && Yr(i, h) && (t.flags |= 32),
            t.memoizedState !== null && (i = Gs(e, t, i0, null, null, n),
            za._currentValue = i),
            Vi(e, t),
            Pe(e, t, l, n),
            t.child;
        case 6:
            return e === null && ye && ((e = n = De) && (n = Z0(n, t.pendingProps, Tt),
            n !== null ? (t.stateNode = n,
            Fe = t,
            De = null,
            e = !0) : e = !1),
            e || pn(t)),
            null;
        case 13:
            return hd(e, t, n);
        case 4:
            return nt(t, t.stateNode.containerInfo),
            l = t.pendingProps,
            e === null ? t.child = Wn(t, null, l, n) : Pe(e, t, l, n),
            t.child;
        case 11:
            return ad(e, t, t.type, t.pendingProps, n);
        case 7:
            return Pe(e, t, t.pendingProps, n),
            t.child;
        case 8:
            return Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 12:
            return Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 10:
            return l = t.pendingProps,
            yn(t, t.type, l.value),
            Pe(e, t, l.children, n),
            t.child;
        case 9:
            return i = t.type._context,
            l = t.pendingProps.children,
            kn(t),
            i = We(i),
            l = l(i),
            t.flags |= 1,
            Pe(e, t, l, n),
            t.child;
        case 14:
            return id(e, t, t.type, t.pendingProps, n);
        case 15:
            return ud(e, t, t.type, t.pendingProps, n);
        case 19:
            return gd(e, t, n);
        case 31:
            return h0(e, t, n);
        case 22:
            return sd(e, t, n, t.pendingProps);
        case 24:
            return kn(t),
            l = We(Ge),
            e === null ? (i = Rs(),
            i === null && (i = je,
            s = Os(),
            i.pooledCache = s,
            s.refCount++,
            s !== null && (i.pooledCacheLanes |= n),
            i = s),
            t.memoizedState = {
                parent: l,
                cache: i
            },
            Ds(t),
            yn(t, Ge, i)) : ((e.lanes & n) !== 0 && (Ms(e, t),
            ma(t, null, null, n),
            ha()),
            i = e.memoizedState,
            s = t.memoizedState,
            i.parent !== l ? (i = {
                parent: l,
                cache: l
            },
            t.memoizedState = i,
            t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i),
            yn(t, Ge, l)) : (l = s.cache,
            yn(t, Ge, l),
            l !== i.cache && Ts(t, [Ge], n, !0))),
            Pe(e, t, t.pendingProps.children, n),
            t.child;
        case 29:
            throw t.pendingProps
        }
        throw Error(o(156, t.tag))
    }
    function It(e) {
        e.flags |= 4
    }
    function mr(e, t, n, l, i) {
        if ((t = (e.mode & 32) !== 0) && (t = !1),
        t) {
            if (e.flags |= 16777216,
            (i & 335544128) === i)
                if (e.stateNode.complete)
                    e.flags |= 8192;
                else if (Qd())
                    e.flags |= 8192;
                else
                    throw Fn = Ti,
                    js
        } else
            e.flags &= -16777217
    }
    function yd(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
            e.flags &= -16777217;
        else if (e.flags |= 16777216,
        !Dh(t))
            if (Qd())
                e.flags |= 8192;
            else
                throw Fn = Ti,
                js
    }
    function Xi(e, t) {
        t !== null && (e.flags |= 4),
        e.flags & 16384 && (t = e.tag !== 22 ? $o() : 536870912,
        e.lanes |= t,
        jl |= t)
    }
    function ba(e, t) {
        if (!ye)
            switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var n = null; t !== null; )
                    t.alternate !== null && (n = t),
                    t = t.sibling;
                n === null ? e.tail = null : n.sibling = null;
                break;
            case "collapsed":
                n = e.tail;
                for (var l = null; n !== null; )
                    n.alternate !== null && (l = n),
                    n = n.sibling;
                l === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : l.sibling = null
            }
    }
    function Me(e) {
        var t = e.alternate !== null && e.alternate.child === e.child
          , n = 0
          , l = 0;
        if (t)
            for (var i = e.child; i !== null; )
                n |= i.lanes | i.childLanes,
                l |= i.subtreeFlags & 65011712,
                l |= i.flags & 65011712,
                i.return = e,
                i = i.sibling;
        else
            for (i = e.child; i !== null; )
                n |= i.lanes | i.childLanes,
                l |= i.subtreeFlags,
                l |= i.flags,
                i.return = e,
                i = i.sibling;
        return e.subtreeFlags |= l,
        e.childLanes = n,
        t
    }
    function g0(e, t, n) {
        var l = t.pendingProps;
        switch (Es(t),
        t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Me(t),
            null;
        case 1:
            return Me(t),
            null;
        case 3:
            return n = t.stateNode,
            l = null,
            e !== null && (l = e.memoizedState.cache),
            t.memoizedState.cache !== l && (t.flags |= 2048),
            $t(Ge),
            Be(),
            n.pendingContext && (n.context = n.pendingContext,
            n.pendingContext = null),
            (e === null || e.child === null) && (vl(t) ? It(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024,
            _s())),
            Me(t),
            null;
        case 26:
            var i = t.type
              , s = t.memoizedState;
            return e === null ? (It(t),
            s !== null ? (Me(t),
            yd(t, s)) : (Me(t),
            mr(t, i, null, l, n))) : s ? s !== e.memoizedState ? (It(t),
            Me(t),
            yd(t, s)) : (Me(t),
            t.flags &= -16777217) : (e = e.memoizedProps,
            e !== l && It(t),
            Me(t),
            mr(t, i, e, l, n)),
            null;
        case 27:
            if (ti(t),
            n = fe.current,
            i = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== l && It(t);
            else {
                if (!l) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return Me(t),
                    null
                }
                e = $.current,
                vl(t) ? $c(t) : (e = _h(i, l, n),
                t.stateNode = e,
                It(t))
            }
            return Me(t),
            null;
        case 5:
            if (ti(t),
            i = t.type,
            e !== null && t.stateNode != null)
                e.memoizedProps !== l && It(t);
            else {
                if (!l) {
                    if (t.stateNode === null)
                        throw Error(o(166));
                    return Me(t),
                    null
                }
                if (s = $.current,
                vl(t))
                    $c(t);
                else {
                    var h = iu(fe.current);
                    switch (s) {
                    case 1:
                        s = h.createElementNS("http://www.w3.org/2000/svg", i);
                        break;
                    case 2:
                        s = h.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                        break;
                    default:
                        switch (i) {
                        case "svg":
                            s = h.createElementNS("http://www.w3.org/2000/svg", i);
                            break;
                        case "math":
                            s = h.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                            break;
                        case "script":
                            s = h.createElement("div"),
                            s.innerHTML = "<script><\/script>",
                            s = s.removeChild(s.firstChild);
                            break;
                        case "select":
                            s = typeof l.is == "string" ? h.createElement("select", {
                                is: l.is
                            }) : h.createElement("select"),
                            l.multiple ? s.multiple = !0 : l.size && (s.size = l.size);
                            break;
                        default:
                            s = typeof l.is == "string" ? h.createElement(i, {
                                is: l.is
                            }) : h.createElement(i)
                        }
                    }
                    s[$e] = t,
                    s[at] = l;
                    e: for (h = t.child; h !== null; ) {
                        if (h.tag === 5 || h.tag === 6)
                            s.appendChild(h.stateNode);
                        else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                            h.child.return = h,
                            h = h.child;
                            continue
                        }
                        if (h === t)
                            break e;
                        for (; h.sibling === null; ) {
                            if (h.return === null || h.return === t)
                                break e;
                            h = h.return
                        }
                        h.sibling.return = h.return,
                        h = h.sibling
                    }
                    t.stateNode = s;
                    e: switch (Ie(s, i, l),
                    i) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        l = !!l.autoFocus;
                        break e;
                    case "img":
                        l = !0;
                        break e;
                    default:
                        l = !1
                    }
                    l && It(t)
                }
            }
            return Me(t),
            mr(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n),
            null;
        case 6:
            if (e && t.stateNode != null)
                e.memoizedProps !== l && It(t);
            else {
                if (typeof l != "string" && t.stateNode === null)
                    throw Error(o(166));
                if (e = fe.current,
                vl(t)) {
                    if (e = t.stateNode,
                    n = t.memoizedProps,
                    l = null,
                    i = Fe,
                    i !== null)
                        switch (i.tag) {
                        case 27:
                        case 5:
                            l = i.memoizedProps
                        }
                    e[$e] = t,
                    e = !!(e.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || hh(e.nodeValue, n)),
                    e || pn(t, !0)
                } else
                    e = iu(e).createTextNode(l),
                    e[$e] = t,
                    t.stateNode = e
            }
            return Me(t),
            null;
        case 31:
            if (n = t.memoizedState,
            e === null || e.memoizedState !== null) {
                if (l = vl(t),
                n !== null) {
                    if (e === null) {
                        if (!l)
                            throw Error(o(318));
                        if (e = t.memoizedState,
                        e = e !== null ? e.dehydrated : null,
                        !e)
                            throw Error(o(557));
                        e[$e] = t
                    } else
                        Zn(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    Me(t),
                    e = !1
                } else
                    n = _s(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n),
                    e = !0;
                if (!e)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null);
                if ((t.flags & 128) !== 0)
                    throw Error(o(558))
            }
            return Me(t),
            null;
        case 13:
            if (l = t.memoizedState,
            e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (i = vl(t),
                l !== null && l.dehydrated !== null) {
                    if (e === null) {
                        if (!i)
                            throw Error(o(318));
                        if (i = t.memoizedState,
                        i = i !== null ? i.dehydrated : null,
                        !i)
                            throw Error(o(317));
                        i[$e] = t
                    } else
                        Zn(),
                        (t.flags & 128) === 0 && (t.memoizedState = null),
                        t.flags |= 4;
                    Me(t),
                    i = !1
                } else
                    i = _s(),
                    e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i),
                    i = !0;
                if (!i)
                    return t.flags & 256 ? (yt(t),
                    t) : (yt(t),
                    null)
            }
            return yt(t),
            (t.flags & 128) !== 0 ? (t.lanes = n,
            t) : (n = l !== null,
            e = e !== null && e.memoizedState !== null,
            n && (l = t.child,
            i = null,
            l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (i = l.alternate.memoizedState.cachePool.pool),
            s = null,
            l.memoizedState !== null && l.memoizedState.cachePool !== null && (s = l.memoizedState.cachePool.pool),
            s !== i && (l.flags |= 2048)),
            n !== e && n && (t.child.flags |= 8192),
            Xi(t, t.updateQueue),
            Me(t),
            null);
        case 4:
            return Be(),
            e === null && Ur(t.stateNode.containerInfo),
            Me(t),
            null;
        case 10:
            return $t(t.type),
            Me(t),
            null;
        case 19:
            if (q(He),
            l = t.memoizedState,
            l === null)
                return Me(t),
                null;
            if (i = (t.flags & 128) !== 0,
            s = l.rendering,
            s === null)
                if (i)
                    ba(l, !1);
                else {
                    if (Ue !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null; ) {
                            if (s = ji(e),
                            s !== null) {
                                for (t.flags |= 128,
                                ba(l, !1),
                                e = s.updateQueue,
                                t.updateQueue = e,
                                Xi(t, e),
                                t.subtreeFlags = 0,
                                e = n,
                                n = t.child; n !== null; )
                                    Xc(n, e),
                                    n = n.sibling;
                                return K(He, He.current & 1 | 2),
                                ye && kt(t, l.treeForkCount),
                                t.child
                            }
                            e = e.sibling
                        }
                    l.tail !== null && ft() > $i && (t.flags |= 128,
                    i = !0,
                    ba(l, !1),
                    t.lanes = 4194304)
                }
            else {
                if (!i)
                    if (e = ji(s),
                    e !== null) {
                        if (t.flags |= 128,
                        i = !0,
                        e = e.updateQueue,
                        t.updateQueue = e,
                        Xi(t, e),
                        ba(l, !0),
                        l.tail === null && l.tailMode === "hidden" && !s.alternate && !ye)
                            return Me(t),
                            null
                    } else
                        2 * ft() - l.renderingStartTime > $i && n !== 536870912 && (t.flags |= 128,
                        i = !0,
                        ba(l, !1),
                        t.lanes = 4194304);
                l.isBackwards ? (s.sibling = t.child,
                t.child = s) : (e = l.last,
                e !== null ? e.sibling = s : t.child = s,
                l.last = s)
            }
            return l.tail !== null ? (e = l.tail,
            l.rendering = e,
            l.tail = e.sibling,
            l.renderingStartTime = ft(),
            e.sibling = null,
            n = He.current,
            K(He, i ? n & 1 | 2 : n & 1),
            ye && kt(t, l.treeForkCount),
            e) : (Me(t),
            null);
        case 22:
        case 23:
            return yt(t),
            Bs(),
            l = t.memoizedState !== null,
            e !== null ? e.memoizedState !== null !== l && (t.flags |= 8192) : l && (t.flags |= 8192),
            l ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Me(t),
            t.subtreeFlags & 6 && (t.flags |= 8192)) : Me(t),
            n = t.updateQueue,
            n !== null && Xi(t, n.retryQueue),
            n = null,
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool),
            l = null,
            t.memoizedState !== null && t.memoizedState.cachePool !== null && (l = t.memoizedState.cachePool.pool),
            l !== n && (t.flags |= 2048),
            e !== null && q(Jn),
            null;
        case 24:
            return n = null,
            e !== null && (n = e.memoizedState.cache),
            t.memoizedState.cache !== n && (t.flags |= 2048),
            $t(Ge),
            Me(t),
            null;
        case 25:
            return null;
        case 30:
            return null
        }
        throw Error(o(156, t.tag))
    }
    function p0(e, t) {
        switch (Es(t),
        t.tag) {
        case 1:
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 3:
            return $t(Ge),
            Be(),
            e = t.flags,
            (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 26:
        case 27:
        case 5:
            return ti(t),
            null;
        case 31:
            if (t.memoizedState !== null) {
                if (yt(t),
                t.alternate === null)
                    throw Error(o(340));
                Zn()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 13:
            if (yt(t),
            e = t.memoizedState,
            e !== null && e.dehydrated !== null) {
                if (t.alternate === null)
                    throw Error(o(340));
                Zn()
            }
            return e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 19:
            return q(He),
            null;
        case 4:
            return Be(),
            null;
        case 10:
            return $t(t.type),
            null;
        case 22:
        case 23:
            return yt(t),
            Bs(),
            e !== null && q(Jn),
            e = t.flags,
            e & 65536 ? (t.flags = e & -65537 | 128,
            t) : null;
        case 24:
            return $t(Ge),
            null;
        case 25:
            return null;
        default:
            return null
        }
    }
    function vd(e, t) {
        switch (Es(t),
        t.tag) {
        case 3:
            $t(Ge),
            Be();
            break;
        case 26:
        case 27:
        case 5:
            ti(t);
            break;
        case 4:
            Be();
            break;
        case 31:
            t.memoizedState !== null && yt(t);
            break;
        case 13:
            yt(t);
            break;
        case 19:
            q(He);
            break;
        case 10:
            $t(t.type);
            break;
        case 22:
        case 23:
            yt(t),
            Bs(),
            e !== null && q(Jn);
            break;
        case 24:
            $t(Ge)
        }
    }
    function Sa(e, t) {
        try {
            var n = t.updateQueue
              , l = n !== null ? n.lastEffect : null;
            if (l !== null) {
                var i = l.next;
                n = i;
                do {
                    if ((n.tag & e) === e) {
                        l = void 0;
                        var s = n.create
                          , h = n.inst;
                        l = s(),
                        h.destroy = l
                    }
                    n = n.next
                } while (n !== i)
            }
        } catch (y) {
            Te(t, t.return, y)
        }
    }
    function wn(e, t, n) {
        try {
            var l = t.updateQueue
              , i = l !== null ? l.lastEffect : null;
            if (i !== null) {
                var s = i.next;
                l = s;
                do {
                    if ((l.tag & e) === e) {
                        var h = l.inst
                          , y = h.destroy;
                        if (y !== void 0) {
                            h.destroy = void 0,
                            i = t;
                            var _ = n
                              , j = y;
                            try {
                                j()
                            } catch (B) {
                                Te(i, _, B)
                            }
                        }
                    }
                    l = l.next
                } while (l !== s)
            }
        } catch (B) {
            Te(t, t.return, B)
        }
    }
    function xd(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var n = e.stateNode;
            try {
                of(t, n)
            } catch (l) {
                Te(e, e.return, l)
            }
        }
    }
    function bd(e, t, n) {
        n.props = In(e.type, e.memoizedProps),
        n.state = e.memoizedState;
        try {
            n.componentWillUnmount()
        } catch (l) {
            Te(e, t, l)
        }
    }
    function Ea(e, t) {
        try {
            var n = e.ref;
            if (n !== null) {
                switch (e.tag) {
                case 26:
                case 27:
                case 5:
                    var l = e.stateNode;
                    break;
                case 30:
                    l = e.stateNode;
                    break;
                default:
                    l = e.stateNode
                }
                typeof n == "function" ? e.refCleanup = n(l) : n.current = l
            }
        } catch (i) {
            Te(e, t, i)
        }
    }
    function Ht(e, t) {
        var n = e.ref
          , l = e.refCleanup;
        if (n !== null)
            if (typeof l == "function")
                try {
                    l()
                } catch (i) {
                    Te(e, t, i)
                } finally {
                    e.refCleanup = null,
                    e = e.alternate,
                    e != null && (e.refCleanup = null)
                }
            else if (typeof n == "function")
                try {
                    n(null)
                } catch (i) {
                    Te(e, t, i)
                }
            else
                n.current = null
    }
    function Sd(e) {
        var t = e.type
          , n = e.memoizedProps
          , l = e.stateNode;
        try {
            e: switch (t) {
            case "button":
            case "input":
            case "select":
            case "textarea":
                n.autoFocus && l.focus();
                break e;
            case "img":
                n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet)
            }
        } catch (i) {
            Te(e, e.return, i)
        }
    }
    function gr(e, t, n) {
        try {
            var l = e.stateNode;
            H0(l, e.type, n, t),
            l[at] = t
        } catch (i) {
            Te(e, e.return, i)
        }
    }
    function Ed(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Rn(e.type) || e.tag === 4
    }
    function pr(e) {
        e: for (; ; ) {
            for (; e.sibling === null; ) {
                if (e.return === null || Ed(e.return))
                    return null;
                e = e.return
            }
            for (e.sibling.return = e.return,
            e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
                if (e.tag === 27 && Rn(e.type) || e.flags & 2 || e.child === null || e.tag === 4)
                    continue e;
                e.child.return = e,
                e = e.child
            }
            if (!(e.flags & 2))
                return e.stateNode
        }
    }
    function yr(e, t, n) {
        var l = e.tag;
        if (l === 5 || l === 6)
            e = e.stateNode,
            t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n,
            t.appendChild(e),
            n = n._reactRootContainer,
            n != null || t.onclick !== null || (t.onclick = Xt));
        else if (l !== 4 && (l === 27 && Rn(e.type) && (n = e.stateNode,
        t = null),
        e = e.child,
        e !== null))
            for (yr(e, t, n),
            e = e.sibling; e !== null; )
                yr(e, t, n),
                e = e.sibling
    }
    function Zi(e, t, n) {
        var l = e.tag;
        if (l === 5 || l === 6)
            e = e.stateNode,
            t ? n.insertBefore(e, t) : n.appendChild(e);
        else if (l !== 4 && (l === 27 && Rn(e.type) && (n = e.stateNode),
        e = e.child,
        e !== null))
            for (Zi(e, t, n),
            e = e.sibling; e !== null; )
                Zi(e, t, n),
                e = e.sibling
    }
    function wd(e) {
        var t = e.stateNode
          , n = e.memoizedProps;
        try {
            for (var l = e.type, i = t.attributes; i.length; )
                t.removeAttributeNode(i[0]);
            Ie(t, l, n),
            t[$e] = e,
            t[at] = n
        } catch (s) {
            Te(e, e.return, s)
        }
    }
    var en = !1
      , Qe = !1
      , vr = !1
      , _d = typeof WeakSet == "function" ? WeakSet : Set
      , ke = null;
    function y0(e, t) {
        if (e = e.containerInfo,
        qr = du,
        e = Lc(e),
        fs(e)) {
            if ("selectionStart"in e)
                var n = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
            else
                e: {
                    n = (n = e.ownerDocument) && n.defaultView || window;
                    var l = n.getSelection && n.getSelection();
                    if (l && l.rangeCount !== 0) {
                        n = l.anchorNode;
                        var i = l.anchorOffset
                          , s = l.focusNode;
                        l = l.focusOffset;
                        try {
                            n.nodeType,
                            s.nodeType
                        } catch {
                            n = null;
                            break e
                        }
                        var h = 0
                          , y = -1
                          , _ = -1
                          , j = 0
                          , B = 0
                          , Y = e
                          , D = null;
                        t: for (; ; ) {
                            for (var z; Y !== n || i !== 0 && Y.nodeType !== 3 || (y = h + i),
                            Y !== s || l !== 0 && Y.nodeType !== 3 || (_ = h + l),
                            Y.nodeType === 3 && (h += Y.nodeValue.length),
                            (z = Y.firstChild) !== null; )
                                D = Y,
                                Y = z;
                            for (; ; ) {
                                if (Y === e)
                                    break t;
                                if (D === n && ++j === i && (y = h),
                                D === s && ++B === l && (_ = h),
                                (z = Y.nextSibling) !== null)
                                    break;
                                Y = D,
                                D = Y.parentNode
                            }
                            Y = z
                        }
                        n = y === -1 || _ === -1 ? null : {
                            start: y,
                            end: _
                        }
                    } else
                        n = null
                }
            n = n || {
                start: 0,
                end: 0
            }
        } else
            n = null;
        for (Gr = {
            focusedElem: e,
            selectionRange: n
        },
        du = !1,
        ke = t; ke !== null; )
            if (t = ke,
            e = t.child,
            (t.subtreeFlags & 1028) !== 0 && e !== null)
                e.return = t,
                ke = e;
            else
                for (; ke !== null; ) {
                    switch (t = ke,
                    s = t.alternate,
                    e = t.flags,
                    t.tag) {
                    case 0:
                        if ((e & 4) !== 0 && (e = t.updateQueue,
                        e = e !== null ? e.events : null,
                        e !== null))
                            for (n = 0; n < e.length; n++)
                                i = e[n],
                                i.ref.impl = i.nextImpl;
                        break;
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if ((e & 1024) !== 0 && s !== null) {
                            e = void 0,
                            n = t,
                            i = s.memoizedProps,
                            s = s.memoizedState,
                            l = n.stateNode;
                            try {
                                var F = In(n.type, i);
                                e = l.getSnapshotBeforeUpdate(F, s),
                                l.__reactInternalSnapshotBeforeUpdate = e
                            } catch (ne) {
                                Te(n, n.return, ne)
                            }
                        }
                        break;
                    case 3:
                        if ((e & 1024) !== 0) {
                            if (e = t.stateNode.containerInfo,
                            n = e.nodeType,
                            n === 9)
                                Qr(e);
                            else if (n === 1)
                                switch (e.nodeName) {
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    Qr(e);
                                    break;
                                default:
                                    e.textContent = ""
                                }
                        }
                        break;
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        if ((e & 1024) !== 0)
                            throw Error(o(163))
                    }
                    if (e = t.sibling,
                    e !== null) {
                        e.return = t.return,
                        ke = e;
                        break
                    }
                    ke = t.return
                }
    }
    function Cd(e, t, n) {
        var l = n.flags;
        switch (n.tag) {
        case 0:
        case 11:
        case 15:
            nn(e, n),
            l & 4 && Sa(5, n);
            break;
        case 1:
            if (nn(e, n),
            l & 4)
                if (e = n.stateNode,
                t === null)
                    try {
                        e.componentDidMount()
                    } catch (h) {
                        Te(n, n.return, h)
                    }
                else {
                    var i = In(n.type, t.memoizedProps);
                    t = t.memoizedState;
                    try {
                        e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate)
                    } catch (h) {
                        Te(n, n.return, h)
                    }
                }
            l & 64 && xd(n),
            l & 512 && Ea(n, n.return);
            break;
        case 3:
            if (nn(e, n),
            l & 64 && (e = n.updateQueue,
            e !== null)) {
                if (t = null,
                n.child !== null)
                    switch (n.child.tag) {
                    case 27:
                    case 5:
                        t = n.child.stateNode;
                        break;
                    case 1:
                        t = n.child.stateNode
                    }
                try {
                    of(e, t)
                } catch (h) {
                    Te(n, n.return, h)
                }
            }
            break;
        case 27:
            t === null && l & 4 && wd(n);
        case 26:
        case 5:
            nn(e, n),
            t === null && l & 4 && Sd(n),
            l & 512 && Ea(n, n.return);
            break;
        case 12:
            nn(e, n);
            break;
        case 31:
            nn(e, n),
            l & 4 && Od(e, n);
            break;
        case 13:
            nn(e, n),
            l & 4 && Nd(e, n),
            l & 64 && (e = n.memoizedState,
            e !== null && (e = e.dehydrated,
            e !== null && (n = A0.bind(null, n),
            K0(e, n))));
            break;
        case 22:
            if (l = n.memoizedState !== null || en,
            !l) {
                t = t !== null && t.memoizedState !== null || Qe,
                i = en;
                var s = Qe;
                en = l,
                (Qe = t) && !s ? ln(e, n, (n.subtreeFlags & 8772) !== 0) : nn(e, n),
                en = i,
                Qe = s
            }
            break;
        case 30:
            break;
        default:
            nn(e, n)
        }
    }
    function Ad(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null,
        Ad(t)),
        e.child = null,
        e.deletions = null,
        e.sibling = null,
        e.tag === 5 && (t = e.stateNode,
        t !== null && Ju(t)),
        e.stateNode = null,
        e.return = null,
        e.dependencies = null,
        e.memoizedProps = null,
        e.memoizedState = null,
        e.pendingProps = null,
        e.stateNode = null,
        e.updateQueue = null
    }
    var ze = null
      , ut = !1;
    function tn(e, t, n) {
        for (n = n.child; n !== null; )
            Td(e, t, n),
            n = n.sibling
    }
    function Td(e, t, n) {
        if (dt && typeof dt.onCommitFiberUnmount == "function")
            try {
                dt.onCommitFiberUnmount(Kl, n)
            } catch {}
        switch (n.tag) {
        case 26:
            Qe || Ht(n, t),
            tn(e, t, n),
            n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode,
            n.parentNode.removeChild(n));
            break;
        case 27:
            Qe || Ht(n, t);
            var l = ze
              , i = ut;
            Rn(n.type) && (ze = n.stateNode,
            ut = !1),
            tn(e, t, n),
            ja(n.stateNode),
            ze = l,
            ut = i;
            break;
        case 5:
            Qe || Ht(n, t);
        case 6:
            if (l = ze,
            i = ut,
            ze = null,
            tn(e, t, n),
            ze = l,
            ut = i,
            ze !== null)
                if (ut)
                    try {
                        (ze.nodeType === 9 ? ze.body : ze.nodeName === "HTML" ? ze.ownerDocument.body : ze).removeChild(n.stateNode)
                    } catch (s) {
                        Te(n, t, s)
                    }
                else
                    try {
                        ze.removeChild(n.stateNode)
                    } catch (s) {
                        Te(n, t, s)
                    }
            break;
        case 18:
            ze !== null && (ut ? (e = ze,
            xh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode),
            ql(e)) : xh(ze, n.stateNode));
            break;
        case 4:
            l = ze,
            i = ut,
            ze = n.stateNode.containerInfo,
            ut = !0,
            tn(e, t, n),
            ze = l,
            ut = i;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            wn(2, n, t),
            Qe || wn(4, n, t),
            tn(e, t, n);
            break;
        case 1:
            Qe || (Ht(n, t),
            l = n.stateNode,
            typeof l.componentWillUnmount == "function" && bd(n, t, l)),
            tn(e, t, n);
            break;
        case 21:
            tn(e, t, n);
            break;
        case 22:
            Qe = (l = Qe) || n.memoizedState !== null,
            tn(e, t, n),
            Qe = l;
            break;
        default:
            tn(e, t, n)
        }
    }
    function Od(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null))) {
            e = e.dehydrated;
            try {
                ql(e)
            } catch (n) {
                Te(t, t.return, n)
            }
        }
    }
    function Nd(e, t) {
        if (t.memoizedState === null && (e = t.alternate,
        e !== null && (e = e.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null))))
            try {
                ql(e)
            } catch (n) {
                Te(t, t.return, n)
            }
    }
    function v0(e) {
        switch (e.tag) {
        case 31:
        case 13:
        case 19:
            var t = e.stateNode;
            return t === null && (t = e.stateNode = new _d),
            t;
        case 22:
            return e = e.stateNode,
            t = e._retryCache,
            t === null && (t = e._retryCache = new _d),
            t;
        default:
            throw Error(o(435, e.tag))
        }
    }
    function Ki(e, t) {
        var n = v0(e);
        t.forEach(function(l) {
            if (!n.has(l)) {
                n.add(l);
                var i = T0.bind(null, e, l);
                l.then(i, i)
            }
        })
    }
    function st(e, t) {
        var n = t.deletions;
        if (n !== null)
            for (var l = 0; l < n.length; l++) {
                var i = n[l]
                  , s = e
                  , h = t
                  , y = h;
                e: for (; y !== null; ) {
                    switch (y.tag) {
                    case 27:
                        if (Rn(y.type)) {
                            ze = y.stateNode,
                            ut = !1;
                            break e
                        }
                        break;
                    case 5:
                        ze = y.stateNode,
                        ut = !1;
                        break e;
                    case 3:
                    case 4:
                        ze = y.stateNode.containerInfo,
                        ut = !0;
                        break e
                    }
                    y = y.return
                }
                if (ze === null)
                    throw Error(o(160));
                Td(s, h, i),
                ze = null,
                ut = !1,
                s = i.alternate,
                s !== null && (s.return = null),
                i.return = null
            }
        if (t.subtreeFlags & 13886)
            for (t = t.child; t !== null; )
                Rd(t, e),
                t = t.sibling
    }
    var Mt = null;
    function Rd(e, t) {
        var n = e.alternate
          , l = e.flags;
        switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            st(t, e),
            rt(e),
            l & 4 && (wn(3, e, e.return),
            Sa(3, e),
            wn(5, e, e.return));
            break;
        case 1:
            st(t, e),
            rt(e),
            l & 512 && (Qe || n === null || Ht(n, n.return)),
            l & 64 && en && (e = e.updateQueue,
            e !== null && (l = e.callbacks,
            l !== null && (n = e.shared.hiddenCallbacks,
            e.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
            break;
        case 26:
            var i = Mt;
            if (st(t, e),
            rt(e),
            l & 512 && (Qe || n === null || Ht(n, n.return)),
            l & 4) {
                var s = n !== null ? n.memoizedState : null;
                if (l = e.memoizedState,
                n === null)
                    if (l === null)
                        if (e.stateNode === null) {
                            e: {
                                l = e.type,
                                n = e.memoizedProps,
                                i = i.ownerDocument || i;
                                t: switch (l) {
                                case "title":
                                    s = i.getElementsByTagName("title")[0],
                                    (!s || s[$l] || s[$e] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = i.createElement(l),
                                    i.head.insertBefore(s, i.querySelector("head > title"))),
                                    Ie(s, l, n),
                                    s[$e] = e,
                                    Ke(s),
                                    l = s;
                                    break e;
                                case "link":
                                    var h = Rh("link", "href", i).get(l + (n.href || ""));
                                    if (h) {
                                        for (var y = 0; y < h.length; y++)
                                            if (s = h[y],
                                            s.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && s.getAttribute("rel") === (n.rel == null ? null : n.rel) && s.getAttribute("title") === (n.title == null ? null : n.title) && s.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                                                h.splice(y, 1);
                                                break t
                                            }
                                    }
                                    s = i.createElement(l),
                                    Ie(s, l, n),
                                    i.head.appendChild(s);
                                    break;
                                case "meta":
                                    if (h = Rh("meta", "content", i).get(l + (n.content || ""))) {
                                        for (y = 0; y < h.length; y++)
                                            if (s = h[y],
                                            s.getAttribute("content") === (n.content == null ? null : "" + n.content) && s.getAttribute("name") === (n.name == null ? null : n.name) && s.getAttribute("property") === (n.property == null ? null : n.property) && s.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && s.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                                                h.splice(y, 1);
                                                break t
                                            }
                                    }
                                    s = i.createElement(l),
                                    Ie(s, l, n),
                                    i.head.appendChild(s);
                                    break;
                                default:
                                    throw Error(o(468, l))
                                }
                                s[$e] = e,
                                Ke(s),
                                l = s
                            }
                            e.stateNode = l
                        } else
                            jh(i, e.type, e.stateNode);
                    else
                        e.stateNode = Nh(i, l, e.memoizedProps);
                else
                    s !== l ? (s === null ? n.stateNode !== null && (n = n.stateNode,
                    n.parentNode.removeChild(n)) : s.count--,
                    l === null ? jh(i, e.type, e.stateNode) : Nh(i, l, e.memoizedProps)) : l === null && e.stateNode !== null && gr(e, e.memoizedProps, n.memoizedProps)
            }
            break;
        case 27:
            st(t, e),
            rt(e),
            l & 512 && (Qe || n === null || Ht(n, n.return)),
            n !== null && l & 4 && gr(e, e.memoizedProps, n.memoizedProps);
            break;
        case 5:
            if (st(t, e),
            rt(e),
            l & 512 && (Qe || n === null || Ht(n, n.return)),
            e.flags & 32) {
                i = e.stateNode;
                try {
                    rl(i, "")
                } catch (F) {
                    Te(e, e.return, F)
                }
            }
            l & 4 && e.stateNode != null && (i = e.memoizedProps,
            gr(e, i, n !== null ? n.memoizedProps : i)),
            l & 1024 && (vr = !0);
            break;
        case 6:
            if (st(t, e),
            rt(e),
            l & 4) {
                if (e.stateNode === null)
                    throw Error(o(162));
                l = e.memoizedProps,
                n = e.stateNode;
                try {
                    n.nodeValue = l
                } catch (F) {
                    Te(e, e.return, F)
                }
            }
            break;
        case 3:
            if (ru = null,
            i = Mt,
            Mt = uu(t.containerInfo),
            st(t, e),
            Mt = i,
            rt(e),
            l & 4 && n !== null && n.memoizedState.isDehydrated)
                try {
                    ql(t.containerInfo)
                } catch (F) {
                    Te(e, e.return, F)
                }
            vr && (vr = !1,
            jd(e));
            break;
        case 4:
            l = Mt,
            Mt = uu(e.stateNode.containerInfo),
            st(t, e),
            rt(e),
            Mt = l;
            break;
        case 12:
            st(t, e),
            rt(e);
            break;
        case 31:
            st(t, e),
            rt(e),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 13:
            st(t, e),
            rt(e),
            e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Ji = ft()),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 22:
            i = e.memoizedState !== null;
            var _ = n !== null && n.memoizedState !== null
              , j = en
              , B = Qe;
            if (en = j || i,
            Qe = B || _,
            st(t, e),
            Qe = B,
            en = j,
            rt(e),
            l & 8192)
                e: for (t = e.stateNode,
                t._visibility = i ? t._visibility & -2 : t._visibility | 1,
                i && (n === null || _ || en || Qe || el(e)),
                n = null,
                t = e; ; ) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (n === null) {
                            _ = n = t;
                            try {
                                if (s = _.stateNode,
                                i)
                                    h = s.style,
                                    typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                                else {
                                    y = _.stateNode;
                                    var Y = _.memoizedProps.style
                                      , D = Y != null && Y.hasOwnProperty("display") ? Y.display : null;
                                    y.style.display = D == null || typeof D == "boolean" ? "" : ("" + D).trim()
                                }
                            } catch (F) {
                                Te(_, _.return, F)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (n === null) {
                            _ = t;
                            try {
                                _.stateNode.nodeValue = i ? "" : _.memoizedProps
                            } catch (F) {
                                Te(_, _.return, F)
                            }
                        }
                    } else if (t.tag === 18) {
                        if (n === null) {
                            _ = t;
                            try {
                                var z = _.stateNode;
                                i ? bh(z, !0) : bh(_.stateNode, !1)
                            } catch (F) {
                                Te(_, _.return, F)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t,
                        t = t.child;
                        continue
                    }
                    if (t === e)
                        break e;
                    for (; t.sibling === null; ) {
                        if (t.return === null || t.return === e)
                            break e;
                        n === t && (n = null),
                        t = t.return
                    }
                    n === t && (n = null),
                    t.sibling.return = t.return,
                    t = t.sibling
                }
            l & 4 && (l = e.updateQueue,
            l !== null && (n = l.retryQueue,
            n !== null && (l.retryQueue = null,
            Ki(e, n))));
            break;
        case 19:
            st(t, e),
            rt(e),
            l & 4 && (l = e.updateQueue,
            l !== null && (e.updateQueue = null,
            Ki(e, l)));
            break;
        case 30:
            break;
        case 21:
            break;
        default:
            st(t, e),
            rt(e)
        }
    }
    function rt(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var n, l = e.return; l !== null; ) {
                    if (Ed(l)) {
                        n = l;
                        break
                    }
                    l = l.return
                }
                if (n == null)
                    throw Error(o(160));
                switch (n.tag) {
                case 27:
                    var i = n.stateNode
                      , s = pr(e);
                    Zi(e, s, i);
                    break;
                case 5:
                    var h = n.stateNode;
                    n.flags & 32 && (rl(h, ""),
                    n.flags &= -33);
                    var y = pr(e);
                    Zi(e, y, h);
                    break;
                case 3:
                case 4:
                    var _ = n.stateNode.containerInfo
                      , j = pr(e);
                    yr(e, j, _);
                    break;
                default:
                    throw Error(o(161))
                }
            } catch (B) {
                Te(e, e.return, B)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }
    function jd(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null; ) {
                var t = e;
                jd(t),
                t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
                e = e.sibling
            }
    }
    function nn(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null; )
                Cd(e, t.alternate, t),
                t = t.sibling
    }
    function el(e) {
        for (e = e.child; e !== null; ) {
            var t = e;
            switch (t.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                wn(4, t, t.return),
                el(t);
                break;
            case 1:
                Ht(t, t.return);
                var n = t.stateNode;
                typeof n.componentWillUnmount == "function" && bd(t, t.return, n),
                el(t);
                break;
            case 27:
                ja(t.stateNode);
            case 26:
            case 5:
                Ht(t, t.return),
                el(t);
                break;
            case 22:
                t.memoizedState === null && el(t);
                break;
            case 30:
                el(t);
                break;
            default:
                el(t)
            }
            e = e.sibling
        }
    }
    function ln(e, t, n) {
        for (n = n && (t.subtreeFlags & 8772) !== 0,
        t = t.child; t !== null; ) {
            var l = t.alternate
              , i = e
              , s = t
              , h = s.flags;
            switch (s.tag) {
            case 0:
            case 11:
            case 15:
                ln(i, s, n),
                Sa(4, s);
                break;
            case 1:
                if (ln(i, s, n),
                l = s,
                i = l.stateNode,
                typeof i.componentDidMount == "function")
                    try {
                        i.componentDidMount()
                    } catch (j) {
                        Te(l, l.return, j)
                    }
                if (l = s,
                i = l.updateQueue,
                i !== null) {
                    var y = l.stateNode;
                    try {
                        var _ = i.shared.hiddenCallbacks;
                        if (_ !== null)
                            for (i.shared.hiddenCallbacks = null,
                            i = 0; i < _.length; i++)
                                rf(_[i], y)
                    } catch (j) {
                        Te(l, l.return, j)
                    }
                }
                n && h & 64 && xd(s),
                Ea(s, s.return);
                break;
            case 27:
                wd(s);
            case 26:
            case 5:
                ln(i, s, n),
                n && l === null && h & 4 && Sd(s),
                Ea(s, s.return);
                break;
            case 12:
                ln(i, s, n);
                break;
            case 31:
                ln(i, s, n),
                n && h & 4 && Od(i, s);
                break;
            case 13:
                ln(i, s, n),
                n && h & 4 && Nd(i, s);
                break;
            case 22:
                s.memoizedState === null && ln(i, s, n),
                Ea(s, s.return);
                break;
            case 30:
                break;
            default:
                ln(i, s, n)
            }
            t = t.sibling
        }
    }
    function xr(e, t) {
        var n = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool),
        e = null,
        t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool),
        e !== n && (e != null && e.refCount++,
        n != null && ra(n))
    }
    function br(e, t) {
        e = null,
        t.alternate !== null && (e = t.alternate.memoizedState.cache),
        t = t.memoizedState.cache,
        t !== e && (t.refCount++,
        e != null && ra(e))
    }
    function zt(e, t, n, l) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; )
                Dd(e, t, n, l),
                t = t.sibling
    }
    function Dd(e, t, n, l) {
        var i = t.flags;
        switch (t.tag) {
        case 0:
        case 11:
        case 15:
            zt(e, t, n, l),
            i & 2048 && Sa(9, t);
            break;
        case 1:
            zt(e, t, n, l);
            break;
        case 3:
            zt(e, t, n, l),
            i & 2048 && (e = null,
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            t = t.memoizedState.cache,
            t !== e && (t.refCount++,
            e != null && ra(e)));
            break;
        case 12:
            if (i & 2048) {
                zt(e, t, n, l),
                e = t.stateNode;
                try {
                    var s = t.memoizedProps
                      , h = s.id
                      , y = s.onPostCommit;
                    typeof y == "function" && y(h, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                } catch (_) {
                    Te(t, t.return, _)
                }
            } else
                zt(e, t, n, l);
            break;
        case 31:
            zt(e, t, n, l);
            break;
        case 13:
            zt(e, t, n, l);
            break;
        case 23:
            break;
        case 22:
            s = t.stateNode,
            h = t.alternate,
            t.memoizedState !== null ? s._visibility & 2 ? zt(e, t, n, l) : wa(e, t) : s._visibility & 2 ? zt(e, t, n, l) : (s._visibility |= 2,
            Ol(e, t, n, l, (t.subtreeFlags & 10256) !== 0 || !1)),
            i & 2048 && xr(h, t);
            break;
        case 24:
            zt(e, t, n, l),
            i & 2048 && br(t.alternate, t);
            break;
        default:
            zt(e, t, n, l)
        }
    }
    function Ol(e, t, n, l, i) {
        for (i = i && ((t.subtreeFlags & 10256) !== 0 || !1),
        t = t.child; t !== null; ) {
            var s = e
              , h = t
              , y = n
              , _ = l
              , j = h.flags;
            switch (h.tag) {
            case 0:
            case 11:
            case 15:
                Ol(s, h, y, _, i),
                Sa(8, h);
                break;
            case 23:
                break;
            case 22:
                var B = h.stateNode;
                h.memoizedState !== null ? B._visibility & 2 ? Ol(s, h, y, _, i) : wa(s, h) : (B._visibility |= 2,
                Ol(s, h, y, _, i)),
                i && j & 2048 && xr(h.alternate, h);
                break;
            case 24:
                Ol(s, h, y, _, i),
                i && j & 2048 && br(h.alternate, h);
                break;
            default:
                Ol(s, h, y, _, i)
            }
            t = t.sibling
        }
    }
    function wa(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null; ) {
                var n = e
                  , l = t
                  , i = l.flags;
                switch (l.tag) {
                case 22:
                    wa(n, l),
                    i & 2048 && xr(l.alternate, l);
                    break;
                case 24:
                    wa(n, l),
                    i & 2048 && br(l.alternate, l);
                    break;
                default:
                    wa(n, l)
                }
                t = t.sibling
            }
    }
    var _a = 8192;
    function Nl(e, t, n) {
        if (e.subtreeFlags & _a)
            for (e = e.child; e !== null; )
                Md(e, t, n),
                e = e.sibling
    }
    function Md(e, t, n) {
        switch (e.tag) {
        case 26:
            Nl(e, t, n),
            e.flags & _a && e.memoizedState !== null && ay(n, Mt, e.memoizedState, e.memoizedProps);
            break;
        case 5:
            Nl(e, t, n);
            break;
        case 3:
        case 4:
            var l = Mt;
            Mt = uu(e.stateNode.containerInfo),
            Nl(e, t, n),
            Mt = l;
            break;
        case 22:
            e.memoizedState === null && (l = e.alternate,
            l !== null && l.memoizedState !== null ? (l = _a,
            _a = 16777216,
            Nl(e, t, n),
            _a = l) : Nl(e, t, n));
            break;
        default:
            Nl(e, t, n)
        }
    }
    function zd(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child,
        e !== null)) {
            t.child = null;
            do
                t = e.sibling,
                e.sibling = null,
                e = t;
            while (e !== null)
        }
    }
    function Ca(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var n = 0; n < t.length; n++) {
                    var l = t[n];
                    ke = l,
                    Ud(l, e)
                }
            zd(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null; )
                Ld(e),
                e = e.sibling
    }
    function Ld(e) {
        switch (e.tag) {
        case 0:
        case 11:
        case 15:
            Ca(e),
            e.flags & 2048 && wn(9, e, e.return);
            break;
        case 3:
            Ca(e);
            break;
        case 12:
            Ca(e);
            break;
        case 22:
            var t = e.stateNode;
            e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3,
            ki(e)) : Ca(e);
            break;
        default:
            Ca(e)
        }
    }
    function ki(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var n = 0; n < t.length; n++) {
                    var l = t[n];
                    ke = l,
                    Ud(l, e)
                }
            zd(e)
        }
        for (e = e.child; e !== null; ) {
            switch (t = e,
            t.tag) {
            case 0:
            case 11:
            case 15:
                wn(8, t, t.return),
                ki(t);
                break;
            case 22:
                n = t.stateNode,
                n._visibility & 2 && (n._visibility &= -3,
                ki(t));
                break;
            default:
                ki(t)
            }
            e = e.sibling
        }
    }
    function Ud(e, t) {
        for (; ke !== null; ) {
            var n = ke;
            switch (n.tag) {
            case 0:
            case 11:
            case 15:
                wn(8, n, t);
                break;
            case 23:
            case 22:
                if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
                    var l = n.memoizedState.cachePool.pool;
                    l != null && l.refCount++
                }
                break;
            case 24:
                ra(n.memoizedState.cache)
            }
            if (l = n.child,
            l !== null)
                l.return = n,
                ke = l;
            else
                e: for (n = e; ke !== null; ) {
                    l = ke;
                    var i = l.sibling
                      , s = l.return;
                    if (Ad(l),
                    l === n) {
                        ke = null;
                        break e
                    }
                    if (i !== null) {
                        i.return = s,
                        ke = i;
                        break e
                    }
                    ke = s
                }
        }
    }
    var x0 = {
        getCacheForType: function(e) {
            var t = We(Ge)
              , n = t.data.get(e);
            return n === void 0 && (n = e(),
            t.data.set(e, n)),
            n
        },
        cacheSignal: function() {
            return We(Ge).controller.signal
        }
    }
      , b0 = typeof WeakMap == "function" ? WeakMap : Map
      , Se = 0
      , je = null
      , de = null
      , me = 0
      , Ae = 0
      , vt = null
      , _n = !1
      , Rl = !1
      , Sr = !1
      , an = 0
      , Ue = 0
      , Cn = 0
      , tl = 0
      , Er = 0
      , xt = 0
      , jl = 0
      , Aa = null
      , ot = null
      , wr = !1
      , Ji = 0
      , Bd = 0
      , $i = 1 / 0
      , Fi = null
      , An = null
      , Xe = 0
      , Tn = null
      , Dl = null
      , un = 0
      , _r = 0
      , Cr = null
      , Hd = null
      , Ta = 0
      , Ar = null;
    function bt() {
        return (Se & 2) !== 0 && me !== 0 ? me & -me : L.T !== null ? Dr() : Io()
    }
    function qd() {
        if (xt === 0)
            if ((me & 536870912) === 0 || ye) {
                var e = ai;
                ai <<= 1,
                (ai & 3932160) === 0 && (ai = 262144),
                xt = e
            } else
                xt = 536870912;
        return e = pt.current,
        e !== null && (e.flags |= 32),
        xt
    }
    function ct(e, t, n) {
        (e === je && (Ae === 2 || Ae === 9) || e.cancelPendingCommit !== null) && (Ml(e, 0),
        On(e, me, xt, !1)),
        Jl(e, n),
        ((Se & 2) === 0 || e !== je) && (e === je && ((Se & 2) === 0 && (tl |= n),
        Ue === 4 && On(e, me, xt, !1)),
        qt(e))
    }
    function Gd(e, t, n) {
        if ((Se & 6) !== 0)
            throw Error(o(327));
        var l = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || kl(e, t)
          , i = l ? w0(e, t) : Or(e, t, !0)
          , s = l;
        do {
            if (i === 0) {
                Rl && !l && On(e, t, 0, !1);
                break
            } else {
                if (n = e.current.alternate,
                s && !S0(n)) {
                    i = Or(e, t, !1),
                    s = !1;
                    continue
                }
                if (i === 2) {
                    if (s = t,
                    e.errorRecoveryDisabledLanes & s)
                        var h = 0;
                    else
                        h = e.pendingLanes & -536870913,
                        h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
                    if (h !== 0) {
                        t = h;
                        e: {
                            var y = e;
                            i = Aa;
                            var _ = y.current.memoizedState.isDehydrated;
                            if (_ && (Ml(y, h).flags |= 256),
                            h = Or(y, h, !1),
                            h !== 2) {
                                if (Sr && !_) {
                                    y.errorRecoveryDisabledLanes |= s,
                                    tl |= s,
                                    i = 4;
                                    break e
                                }
                                s = ot,
                                ot = i,
                                s !== null && (ot === null ? ot = s : ot.push.apply(ot, s))
                            }
                            i = h
                        }
                        if (s = !1,
                        i !== 2)
                            continue
                    }
                }
                if (i === 1) {
                    Ml(e, 0),
                    On(e, t, 0, !0);
                    break
                }
                e: {
                    switch (l = e,
                    s = i,
                    s) {
                    case 0:
                    case 1:
                        throw Error(o(345));
                    case 4:
                        if ((t & 4194048) !== t)
                            break;
                    case 6:
                        On(l, t, xt, !_n);
                        break e;
                    case 2:
                        ot = null;
                        break;
                    case 3:
                    case 5:
                        break;
                    default:
                        throw Error(o(329))
                    }
                    if ((t & 62914560) === t && (i = Ji + 300 - ft(),
                    10 < i)) {
                        if (On(l, t, xt, !_n),
                        ui(l, 0, !0) !== 0)
                            break e;
                        un = t,
                        l.timeoutHandle = yh(Yd.bind(null, l, n, ot, Fi, wr, t, xt, tl, jl, _n, s, "Throttled", -0, 0), i);
                        break e
                    }
                    Yd(l, n, ot, Fi, wr, t, xt, tl, jl, _n, s, null, -0, 0)
                }
            }
            break
        } while (!0);
        qt(e)
    }
    function Yd(e, t, n, l, i, s, h, y, _, j, B, Y, D, z) {
        if (e.timeoutHandle = -1,
        Y = t.subtreeFlags,
        Y & 8192 || (Y & 16785408) === 16785408) {
            Y = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Xt
            },
            Md(t, s, Y);
            var F = (s & 62914560) === s ? Ji - ft() : (s & 4194048) === s ? Bd - ft() : 0;
            if (F = iy(Y, F),
            F !== null) {
                un = s,
                e.cancelPendingCommit = F($d.bind(null, e, t, s, n, l, i, h, y, _, B, Y, null, D, z)),
                On(e, s, h, !j);
                return
            }
        }
        $d(e, t, s, n, l, i, h, y, _)
    }
    function S0(e) {
        for (var t = e; ; ) {
            var n = t.tag;
            if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue,
            n !== null && (n = n.stores,
            n !== null)))
                for (var l = 0; l < n.length; l++) {
                    var i = n[l]
                      , s = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!mt(s(), i))
                            return !1
                    } catch {
                        return !1
                    }
                }
            if (n = t.child,
            t.subtreeFlags & 16384 && n !== null)
                n.return = t,
                t = n;
            else {
                if (t === e)
                    break;
                for (; t.sibling === null; ) {
                    if (t.return === null || t.return === e)
                        return !0;
                    t = t.return
                }
                t.sibling.return = t.return,
                t = t.sibling
            }
        }
        return !0
    }
    function On(e, t, n, l) {
        t &= ~Er,
        t &= ~tl,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        l && (e.warmLanes |= t),
        l = e.expirationTimes;
        for (var i = t; 0 < i; ) {
            var s = 31 - ht(i)
              , h = 1 << s;
            l[s] = -1,
            i &= ~h
        }
        n !== 0 && Fo(e, n, t)
    }
    function Wi() {
        return (Se & 6) === 0 ? (Oa(0),
        !1) : !0
    }
    function Tr() {
        if (de !== null) {
            if (Ae === 0)
                var e = de.return;
            else
                e = de,
                Jt = Kn = null,
                Qs(e),
                wl = null,
                ca = 0,
                e = de;
            for (; e !== null; )
                vd(e.alternate, e),
                e = e.return;
            de = null
        }
    }
    function Ml(e, t) {
        var n = e.timeoutHandle;
        n !== -1 && (e.timeoutHandle = -1,
        Y0(n)),
        n = e.cancelPendingCommit,
        n !== null && (e.cancelPendingCommit = null,
        n()),
        un = 0,
        Tr(),
        je = e,
        de = n = Kt(e.current, null),
        me = t,
        Ae = 0,
        vt = null,
        _n = !1,
        Rl = kl(e, t),
        Sr = !1,
        jl = xt = Er = tl = Cn = Ue = 0,
        ot = Aa = null,
        wr = !1,
        (t & 8) !== 0 && (t |= t & 32);
        var l = e.entangledLanes;
        if (l !== 0)
            for (e = e.entanglements,
            l &= t; 0 < l; ) {
                var i = 31 - ht(l)
                  , s = 1 << i;
                t |= e[i],
                l &= ~s
            }
        return an = t,
        vi(),
        n
    }
    function Vd(e, t) {
        se = null,
        L.H = va,
        t === El || t === Ai ? (t = lf(),
        Ae = 3) : t === js ? (t = lf(),
        Ae = 4) : Ae = t === ir ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1,
        vt = t,
        de === null && (Ue = 1,
        Gi(e, _t(t, e.current)))
    }
    function Qd() {
        var e = pt.current;
        return e === null ? !0 : (me & 4194048) === me ? Ot === null : (me & 62914560) === me || (me & 536870912) !== 0 ? e === Ot : !1
    }
    function Xd() {
        var e = L.H;
        return L.H = va,
        e === null ? va : e
    }
    function Zd() {
        var e = L.A;
        return L.A = x0,
        e
    }
    function Pi() {
        Ue = 4,
        _n || (me & 4194048) !== me && pt.current !== null || (Rl = !0),
        (Cn & 134217727) === 0 && (tl & 134217727) === 0 || je === null || On(je, me, xt, !1)
    }
    function Or(e, t, n) {
        var l = Se;
        Se |= 2;
        var i = Xd()
          , s = Zd();
        (je !== e || me !== t) && (Fi = null,
        Ml(e, t)),
        t = !1;
        var h = Ue;
        e: do
            try {
                if (Ae !== 0 && de !== null) {
                    var y = de
                      , _ = vt;
                    switch (Ae) {
                    case 8:
                        Tr(),
                        h = 6;
                        break e;
                    case 3:
                    case 2:
                    case 9:
                    case 6:
                        pt.current === null && (t = !0);
                        var j = Ae;
                        if (Ae = 0,
                        vt = null,
                        zl(e, y, _, j),
                        n && Rl) {
                            h = 0;
                            break e
                        }
                        break;
                    default:
                        j = Ae,
                        Ae = 0,
                        vt = null,
                        zl(e, y, _, j)
                    }
                }
                E0(),
                h = Ue;
                break
            } catch (B) {
                Vd(e, B)
            }
        while (!0);
        return t && e.shellSuspendCounter++,
        Jt = Kn = null,
        Se = l,
        L.H = i,
        L.A = s,
        de === null && (je = null,
        me = 0,
        vi()),
        h
    }
    function E0() {
        for (; de !== null; )
            Kd(de)
    }
    function w0(e, t) {
        var n = Se;
        Se |= 2;
        var l = Xd()
          , i = Zd();
        je !== e || me !== t ? (Fi = null,
        $i = ft() + 500,
        Ml(e, t)) : Rl = kl(e, t);
        e: do
            try {
                if (Ae !== 0 && de !== null) {
                    t = de;
                    var s = vt;
                    t: switch (Ae) {
                    case 1:
                        Ae = 0,
                        vt = null,
                        zl(e, t, s, 1);
                        break;
                    case 2:
                    case 9:
                        if (tf(s)) {
                            Ae = 0,
                            vt = null,
                            kd(t);
                            break
                        }
                        t = function() {
                            Ae !== 2 && Ae !== 9 || je !== e || (Ae = 7),
                            qt(e)
                        }
                        ,
                        s.then(t, t);
                        break e;
                    case 3:
                        Ae = 7;
                        break e;
                    case 4:
                        Ae = 5;
                        break e;
                    case 7:
                        tf(s) ? (Ae = 0,
                        vt = null,
                        kd(t)) : (Ae = 0,
                        vt = null,
                        zl(e, t, s, 7));
                        break;
                    case 5:
                        var h = null;
                        switch (de.tag) {
                        case 26:
                            h = de.memoizedState;
                        case 5:
                        case 27:
                            var y = de;
                            if (h ? Dh(h) : y.stateNode.complete) {
                                Ae = 0,
                                vt = null;
                                var _ = y.sibling;
                                if (_ !== null)
                                    de = _;
                                else {
                                    var j = y.return;
                                    j !== null ? (de = j,
                                    Ii(j)) : de = null
                                }
                                break t
                            }
                        }
                        Ae = 0,
                        vt = null,
                        zl(e, t, s, 5);
                        break;
                    case 6:
                        Ae = 0,
                        vt = null,
                        zl(e, t, s, 6);
                        break;
                    case 8:
                        Tr(),
                        Ue = 6;
                        break e;
                    default:
                        throw Error(o(462))
                    }
                }
                _0();
                break
            } catch (B) {
                Vd(e, B)
            }
        while (!0);
        return Jt = Kn = null,
        L.H = l,
        L.A = i,
        Se = n,
        de !== null ? 0 : (je = null,
        me = 0,
        vi(),
        Ue)
    }
    function _0() {
        for (; de !== null && !kg(); )
            Kd(de)
    }
    function Kd(e) {
        var t = pd(e.alternate, e, an);
        e.memoizedProps = e.pendingProps,
        t === null ? Ii(e) : de = t
    }
    function kd(e) {
        var t = e
          , n = t.alternate;
        switch (t.tag) {
        case 15:
        case 0:
            t = cd(n, t, t.pendingProps, t.type, void 0, me);
            break;
        case 11:
            t = cd(n, t, t.pendingProps, t.type.render, t.ref, me);
            break;
        case 5:
            Qs(t);
        default:
            vd(n, t),
            t = de = Xc(t, an),
            t = pd(n, t, an)
        }
        e.memoizedProps = e.pendingProps,
        t === null ? Ii(e) : de = t
    }
    function zl(e, t, n, l) {
        Jt = Kn = null,
        Qs(t),
        wl = null,
        ca = 0;
        var i = t.return;
        try {
            if (d0(e, i, t, n, me)) {
                Ue = 1,
                Gi(e, _t(n, e.current)),
                de = null;
                return
            }
        } catch (s) {
            if (i !== null)
                throw de = i,
                s;
            Ue = 1,
            Gi(e, _t(n, e.current)),
            de = null;
            return
        }
        t.flags & 32768 ? (ye || l === 1 ? e = !0 : Rl || (me & 536870912) !== 0 ? e = !1 : (_n = e = !0,
        (l === 2 || l === 9 || l === 3 || l === 6) && (l = pt.current,
        l !== null && l.tag === 13 && (l.flags |= 16384))),
        Jd(t, e)) : Ii(t)
    }
    function Ii(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                Jd(t, _n);
                return
            }
            e = t.return;
            var n = g0(t.alternate, t, an);
            if (n !== null) {
                de = n;
                return
            }
            if (t = t.sibling,
            t !== null) {
                de = t;
                return
            }
            de = t = e
        } while (t !== null);
        Ue === 0 && (Ue = 5)
    }
    function Jd(e, t) {
        do {
            var n = p0(e.alternate, e);
            if (n !== null) {
                n.flags &= 32767,
                de = n;
                return
            }
            if (n = e.return,
            n !== null && (n.flags |= 32768,
            n.subtreeFlags = 0,
            n.deletions = null),
            !t && (e = e.sibling,
            e !== null)) {
                de = e;
                return
            }
            de = e = n
        } while (e !== null);
        Ue = 6,
        de = null
    }
    function $d(e, t, n, l, i, s, h, y, _) {
        e.cancelPendingCommit = null;
        do
            eu();
        while (Xe !== 0);
        if ((Se & 6) !== 0)
            throw Error(o(327));
        if (t !== null) {
            if (t === e.current)
                throw Error(o(177));
            if (s = t.lanes | t.childLanes,
            s |= ps,
            lp(e, n, s, h, y, _),
            e === je && (de = je = null,
            me = 0),
            Dl = t,
            Tn = e,
            un = n,
            _r = s,
            Cr = i,
            Hd = l,
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null,
            e.callbackPriority = 0,
            O0(ni, function() {
                return eh(),
                null
            })) : (e.callbackNode = null,
            e.callbackPriority = 0),
            l = (t.flags & 13878) !== 0,
            (t.subtreeFlags & 13878) !== 0 || l) {
                l = L.T,
                L.T = null,
                i = X.p,
                X.p = 2,
                h = Se,
                Se |= 4;
                try {
                    y0(e, t, n)
                } finally {
                    Se = h,
                    X.p = i,
                    L.T = l
                }
            }
            Xe = 1,
            Fd(),
            Wd(),
            Pd()
        }
    }
    function Fd() {
        if (Xe === 1) {
            Xe = 0;
            var e = Tn
              , t = Dl
              , n = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || n) {
                n = L.T,
                L.T = null;
                var l = X.p;
                X.p = 2;
                var i = Se;
                Se |= 4;
                try {
                    Rd(t, e);
                    var s = Gr
                      , h = Lc(e.containerInfo)
                      , y = s.focusedElem
                      , _ = s.selectionRange;
                    if (h !== y && y && y.ownerDocument && zc(y.ownerDocument.documentElement, y)) {
                        if (_ !== null && fs(y)) {
                            var j = _.start
                              , B = _.end;
                            if (B === void 0 && (B = j),
                            "selectionStart"in y)
                                y.selectionStart = j,
                                y.selectionEnd = Math.min(B, y.value.length);
                            else {
                                var Y = y.ownerDocument || document
                                  , D = Y && Y.defaultView || window;
                                if (D.getSelection) {
                                    var z = D.getSelection()
                                      , F = y.textContent.length
                                      , ne = Math.min(_.start, F)
                                      , Re = _.end === void 0 ? ne : Math.min(_.end, F);
                                    !z.extend && ne > Re && (h = Re,
                                    Re = ne,
                                    ne = h);
                                    var N = Mc(y, ne)
                                      , T = Mc(y, Re);
                                    if (N && T && (z.rangeCount !== 1 || z.anchorNode !== N.node || z.anchorOffset !== N.offset || z.focusNode !== T.node || z.focusOffset !== T.offset)) {
                                        var R = Y.createRange();
                                        R.setStart(N.node, N.offset),
                                        z.removeAllRanges(),
                                        ne > Re ? (z.addRange(R),
                                        z.extend(T.node, T.offset)) : (R.setEnd(T.node, T.offset),
                                        z.addRange(R))
                                    }
                                }
                            }
                        }
                        for (Y = [],
                        z = y; z = z.parentNode; )
                            z.nodeType === 1 && Y.push({
                                element: z,
                                left: z.scrollLeft,
                                top: z.scrollTop
                            });
                        for (typeof y.focus == "function" && y.focus(),
                        y = 0; y < Y.length; y++) {
                            var G = Y[y];
                            G.element.scrollLeft = G.left,
                            G.element.scrollTop = G.top
                        }
                    }
                    du = !!qr,
                    Gr = qr = null
                } finally {
                    Se = i,
                    X.p = l,
                    L.T = n
                }
            }
            e.current = t,
            Xe = 2
        }
    }
    function Wd() {
        if (Xe === 2) {
            Xe = 0;
            var e = Tn
              , t = Dl
              , n = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || n) {
                n = L.T,
                L.T = null;
                var l = X.p;
                X.p = 2;
                var i = Se;
                Se |= 4;
                try {
                    Cd(e, t.alternate, t)
                } finally {
                    Se = i,
                    X.p = l,
                    L.T = n
                }
            }
            Xe = 3
        }
    }
    function Pd() {
        if (Xe === 4 || Xe === 3) {
            Xe = 0,
            Jg();
            var e = Tn
              , t = Dl
              , n = un
              , l = Hd;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? Xe = 5 : (Xe = 0,
            Dl = Tn = null,
            Id(e, e.pendingLanes));
            var i = e.pendingLanes;
            if (i === 0 && (An = null),
            Ku(n),
            t = t.stateNode,
            dt && typeof dt.onCommitFiberRoot == "function")
                try {
                    dt.onCommitFiberRoot(Kl, t, void 0, (t.current.flags & 128) === 128)
                } catch {}
            if (l !== null) {
                t = L.T,
                i = X.p,
                X.p = 2,
                L.T = null;
                try {
                    for (var s = e.onRecoverableError, h = 0; h < l.length; h++) {
                        var y = l[h];
                        s(y.value, {
                            componentStack: y.stack
                        })
                    }
                } finally {
                    L.T = t,
                    X.p = i
                }
            }
            (un & 3) !== 0 && eu(),
            qt(e),
            i = e.pendingLanes,
            (n & 261930) !== 0 && (i & 42) !== 0 ? e === Ar ? Ta++ : (Ta = 0,
            Ar = e) : Ta = 0,
            Oa(0)
        }
    }
    function Id(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache,
        t != null && (e.pooledCache = null,
        ra(t)))
    }
    function eu() {
        return Fd(),
        Wd(),
        Pd(),
        eh()
    }
    function eh() {
        if (Xe !== 5)
            return !1;
        var e = Tn
          , t = _r;
        _r = 0;
        var n = Ku(un)
          , l = L.T
          , i = X.p;
        try {
            X.p = 32 > n ? 32 : n,
            L.T = null,
            n = Cr,
            Cr = null;
            var s = Tn
              , h = un;
            if (Xe = 0,
            Dl = Tn = null,
            un = 0,
            (Se & 6) !== 0)
                throw Error(o(331));
            var y = Se;
            if (Se |= 4,
            Ld(s.current),
            Dd(s, s.current, h, n),
            Se = y,
            Oa(0, !1),
            dt && typeof dt.onPostCommitFiberRoot == "function")
                try {
                    dt.onPostCommitFiberRoot(Kl, s)
                } catch {}
            return !0
        } finally {
            X.p = i,
            L.T = l,
            Id(e, t)
        }
    }
    function th(e, t, n) {
        t = _t(n, t),
        t = ar(e.stateNode, t, 2),
        e = bn(e, t, 2),
        e !== null && (Jl(e, 2),
        qt(e))
    }
    function Te(e, t, n) {
        if (e.tag === 3)
            th(e, e, n);
        else
            for (; t !== null; ) {
                if (t.tag === 3) {
                    th(t, e, n);
                    break
                } else if (t.tag === 1) {
                    var l = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (An === null || !An.has(l))) {
                        e = _t(n, e),
                        n = nd(2),
                        l = bn(t, n, 2),
                        l !== null && (ld(n, l, t, e),
                        Jl(l, 2),
                        qt(l));
                        break
                    }
                }
                t = t.return
            }
    }
    function Nr(e, t, n) {
        var l = e.pingCache;
        if (l === null) {
            l = e.pingCache = new b0;
            var i = new Set;
            l.set(t, i)
        } else
            i = l.get(t),
            i === void 0 && (i = new Set,
            l.set(t, i));
        i.has(n) || (Sr = !0,
        i.add(n),
        e = C0.bind(null, e, t, n),
        t.then(e, e))
    }
    function C0(e, t, n) {
        var l = e.pingCache;
        l !== null && l.delete(t),
        e.pingedLanes |= e.suspendedLanes & n,
        e.warmLanes &= ~n,
        je === e && (me & n) === n && (Ue === 4 || Ue === 3 && (me & 62914560) === me && 300 > ft() - Ji ? (Se & 2) === 0 && Ml(e, 0) : Er |= n,
        jl === me && (jl = 0)),
        qt(e)
    }
    function nh(e, t) {
        t === 0 && (t = $o()),
        e = Qn(e, t),
        e !== null && (Jl(e, t),
        qt(e))
    }
    function A0(e) {
        var t = e.memoizedState
          , n = 0;
        t !== null && (n = t.retryLane),
        nh(e, n)
    }
    function T0(e, t) {
        var n = 0;
        switch (e.tag) {
        case 31:
        case 13:
            var l = e.stateNode
              , i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            l = e.stateNode;
            break;
        case 22:
            l = e.stateNode._retryCache;
            break;
        default:
            throw Error(o(314))
        }
        l !== null && l.delete(t),
        nh(e, n)
    }
    function O0(e, t) {
        return Vu(e, t)
    }
    var tu = null
      , Ll = null
      , Rr = !1
      , nu = !1
      , jr = !1
      , Nn = 0;
    function qt(e) {
        e !== Ll && e.next === null && (Ll === null ? tu = Ll = e : Ll = Ll.next = e),
        nu = !0,
        Rr || (Rr = !0,
        R0())
    }
    function Oa(e, t) {
        if (!jr && nu) {
            jr = !0;
            do
                for (var n = !1, l = tu; l !== null; ) {
                    if (e !== 0) {
                        var i = l.pendingLanes;
                        if (i === 0)
                            var s = 0;
                        else {
                            var h = l.suspendedLanes
                              , y = l.pingedLanes;
                            s = (1 << 31 - ht(42 | e) + 1) - 1,
                            s &= i & ~(h & ~y),
                            s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0
                        }
                        s !== 0 && (n = !0,
                        uh(l, s))
                    } else
                        s = me,
                        s = ui(l, l === je ? s : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1),
                        (s & 3) === 0 || kl(l, s) || (n = !0,
                        uh(l, s));
                    l = l.next
                }
            while (n);
            jr = !1
        }
    }
    function N0() {
        lh()
    }
    function lh() {
        nu = Rr = !1;
        var e = 0;
        Nn !== 0 && G0() && (e = Nn);
        for (var t = ft(), n = null, l = tu; l !== null; ) {
            var i = l.next
              , s = ah(l, t);
            s === 0 ? (l.next = null,
            n === null ? tu = i : n.next = i,
            i === null && (Ll = n)) : (n = l,
            (e !== 0 || (s & 3) !== 0) && (nu = !0)),
            l = i
        }
        Xe !== 0 && Xe !== 5 || Oa(e),
        Nn !== 0 && (Nn = 0)
    }
    function ah(e, t) {
        for (var n = e.suspendedLanes, l = e.pingedLanes, i = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
            var h = 31 - ht(s)
              , y = 1 << h
              , _ = i[h];
            _ === -1 ? ((y & n) === 0 || (y & l) !== 0) && (i[h] = np(y, t)) : _ <= t && (e.expiredLanes |= y),
            s &= ~y
        }
        if (t = je,
        n = me,
        n = ui(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        l = e.callbackNode,
        n === 0 || e === t && (Ae === 2 || Ae === 9) || e.cancelPendingCommit !== null)
            return l !== null && l !== null && Qu(l),
            e.callbackNode = null,
            e.callbackPriority = 0;
        if ((n & 3) === 0 || kl(e, n)) {
            if (t = n & -n,
            t === e.callbackPriority)
                return t;
            switch (l !== null && Qu(l),
            Ku(n)) {
            case 2:
            case 8:
                n = ko;
                break;
            case 32:
                n = ni;
                break;
            case 268435456:
                n = Jo;
                break;
            default:
                n = ni
            }
            return l = ih.bind(null, e),
            n = Vu(n, l),
            e.callbackPriority = t,
            e.callbackNode = n,
            t
        }
        return l !== null && l !== null && Qu(l),
        e.callbackPriority = 2,
        e.callbackNode = null,
        2
    }
    function ih(e, t) {
        if (Xe !== 0 && Xe !== 5)
            return e.callbackNode = null,
            e.callbackPriority = 0,
            null;
        var n = e.callbackNode;
        if (eu() && e.callbackNode !== n)
            return null;
        var l = me;
        return l = ui(e, e === je ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1),
        l === 0 ? null : (Gd(e, l, t),
        ah(e, ft()),
        e.callbackNode != null && e.callbackNode === n ? ih.bind(null, e) : null)
    }
    function uh(e, t) {
        if (eu())
            return null;
        Gd(e, t, !0)
    }
    function R0() {
        V0(function() {
            (Se & 6) !== 0 ? Vu(Ko, N0) : lh()
        })
    }
    function Dr() {
        if (Nn === 0) {
            var e = bl;
            e === 0 && (e = li,
            li <<= 1,
            (li & 261888) === 0 && (li = 256)),
            Nn = e
        }
        return Nn
    }
    function sh(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : ci("" + e)
    }
    function rh(e, t) {
        var n = t.ownerDocument.createElement("input");
        return n.name = t.name,
        n.value = t.value,
        e.id && n.setAttribute("form", e.id),
        t.parentNode.insertBefore(n, t),
        e = new FormData(e),
        n.parentNode.removeChild(n),
        e
    }
    function j0(e, t, n, l, i) {
        if (t === "submit" && n && n.stateNode === i) {
            var s = sh((i[at] || null).action)
              , h = l.submitter;
            h && (t = (t = h[at] || null) ? sh(t.formAction) : h.getAttribute("formAction"),
            t !== null && (s = t,
            h = null));
            var y = new mi("action","action",null,l,i);
            e.push({
                event: y,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (l.defaultPrevented) {
                            if (Nn !== 0) {
                                var _ = h ? rh(i, h) : new FormData(i);
                                Ps(n, {
                                    pending: !0,
                                    data: _,
                                    method: i.method,
                                    action: s
                                }, null, _)
                            }
                        } else
                            typeof s == "function" && (y.preventDefault(),
                            _ = h ? rh(i, h) : new FormData(i),
                            Ps(n, {
                                pending: !0,
                                data: _,
                                method: i.method,
                                action: s
                            }, s, _))
                    },
                    currentTarget: i
                }]
            })
        }
    }
    for (var Mr = 0; Mr < gs.length; Mr++) {
        var zr = gs[Mr]
          , D0 = zr.toLowerCase()
          , M0 = zr[0].toUpperCase() + zr.slice(1);
        Dt(D0, "on" + M0)
    }
    Dt(Hc, "onAnimationEnd"),
    Dt(qc, "onAnimationIteration"),
    Dt(Gc, "onAnimationStart"),
    Dt("dblclick", "onDoubleClick"),
    Dt("focusin", "onFocus"),
    Dt("focusout", "onBlur"),
    Dt($p, "onTransitionRun"),
    Dt(Fp, "onTransitionStart"),
    Dt(Wp, "onTransitionCancel"),
    Dt(Yc, "onTransitionEnd"),
    ul("onMouseEnter", ["mouseout", "mouseover"]),
    ul("onMouseLeave", ["mouseout", "mouseover"]),
    ul("onPointerEnter", ["pointerout", "pointerover"]),
    ul("onPointerLeave", ["pointerout", "pointerover"]),
    qn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
    qn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
    qn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    qn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
    qn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
    qn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var Na = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
      , z0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Na));
    function oh(e, t) {
        t = (t & 4) !== 0;
        for (var n = 0; n < e.length; n++) {
            var l = e[n]
              , i = l.event;
            l = l.listeners;
            e: {
                var s = void 0;
                if (t)
                    for (var h = l.length - 1; 0 <= h; h--) {
                        var y = l[h]
                          , _ = y.instance
                          , j = y.currentTarget;
                        if (y = y.listener,
                        _ !== s && i.isPropagationStopped())
                            break e;
                        s = y,
                        i.currentTarget = j;
                        try {
                            s(i)
                        } catch (B) {
                            yi(B)
                        }
                        i.currentTarget = null,
                        s = _
                    }
                else
                    for (h = 0; h < l.length; h++) {
                        if (y = l[h],
                        _ = y.instance,
                        j = y.currentTarget,
                        y = y.listener,
                        _ !== s && i.isPropagationStopped())
                            break e;
                        s = y,
                        i.currentTarget = j;
                        try {
                            s(i)
                        } catch (B) {
                            yi(B)
                        }
                        i.currentTarget = null,
                        s = _
                    }
            }
        }
    }
    function he(e, t) {
        var n = t[ku];
        n === void 0 && (n = t[ku] = new Set);
        var l = e + "__bubble";
        n.has(l) || (ch(t, e, 2, !1),
        n.add(l))
    }
    function Lr(e, t, n) {
        var l = 0;
        t && (l |= 4),
        ch(n, e, l, t)
    }
    var lu = "_reactListening" + Math.random().toString(36).slice(2);
    function Ur(e) {
        if (!e[lu]) {
            e[lu] = !0,
            nc.forEach(function(n) {
                n !== "selectionchange" && (z0.has(n) || Lr(n, !1, e),
                Lr(n, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[lu] || (t[lu] = !0,
            Lr("selectionchange", !1, t))
        }
    }
    function ch(e, t, n, l) {
        switch (qh(t)) {
        case 2:
            var i = ry;
            break;
        case 8:
            i = oy;
            break;
        default:
            i = Wr
        }
        n = i.bind(null, t, n, e),
        i = void 0,
        !ns || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0),
        l ? i !== void 0 ? e.addEventListener(t, n, {
            capture: !0,
            passive: i
        }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
            passive: i
        }) : e.addEventListener(t, n, !1)
    }
    function Br(e, t, n, l, i) {
        var s = l;
        if ((t & 1) === 0 && (t & 2) === 0 && l !== null)
            e: for (; ; ) {
                if (l === null)
                    return;
                var h = l.tag;
                if (h === 3 || h === 4) {
                    var y = l.stateNode.containerInfo;
                    if (y === i)
                        break;
                    if (h === 4)
                        for (h = l.return; h !== null; ) {
                            var _ = h.tag;
                            if ((_ === 3 || _ === 4) && h.stateNode.containerInfo === i)
                                return;
                            h = h.return
                        }
                    for (; y !== null; ) {
                        if (h = ll(y),
                        h === null)
                            return;
                        if (_ = h.tag,
                        _ === 5 || _ === 6 || _ === 26 || _ === 27) {
                            l = s = h;
                            continue e
                        }
                        y = y.parentNode
                    }
                }
                l = l.return
            }
        mc(function() {
            var j = s
              , B = es(n)
              , Y = [];
            e: {
                var D = Vc.get(e);
                if (D !== void 0) {
                    var z = mi
                      , F = e;
                    switch (e) {
                    case "keypress":
                        if (di(n) === 0)
                            break e;
                    case "keydown":
                    case "keyup":
                        z = Tp;
                        break;
                    case "focusin":
                        F = "focus",
                        z = us;
                        break;
                    case "focusout":
                        F = "blur",
                        z = us;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        z = us;
                        break;
                    case "click":
                        if (n.button === 2)
                            break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        z = yc;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        z = gp;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        z = Rp;
                        break;
                    case Hc:
                    case qc:
                    case Gc:
                        z = vp;
                        break;
                    case Yc:
                        z = Dp;
                        break;
                    case "scroll":
                    case "scrollend":
                        z = hp;
                        break;
                    case "wheel":
                        z = zp;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        z = bp;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        z = xc;
                        break;
                    case "toggle":
                    case "beforetoggle":
                        z = Up
                    }
                    var ne = (t & 4) !== 0
                      , Re = !ne && (e === "scroll" || e === "scrollend")
                      , N = ne ? D !== null ? D + "Capture" : null : D;
                    ne = [];
                    for (var T = j, R; T !== null; ) {
                        var G = T;
                        if (R = G.stateNode,
                        G = G.tag,
                        G !== 5 && G !== 26 && G !== 27 || R === null || N === null || (G = Wl(T, N),
                        G != null && ne.push(Ra(T, G, R))),
                        Re)
                            break;
                        T = T.return
                    }
                    0 < ne.length && (D = new z(D,F,null,n,B),
                    Y.push({
                        event: D,
                        listeners: ne
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (D = e === "mouseover" || e === "pointerover",
                    z = e === "mouseout" || e === "pointerout",
                    D && n !== Iu && (F = n.relatedTarget || n.fromElement) && (ll(F) || F[nl]))
                        break e;
                    if ((z || D) && (D = B.window === B ? B : (D = B.ownerDocument) ? D.defaultView || D.parentWindow : window,
                    z ? (F = n.relatedTarget || n.toElement,
                    z = j,
                    F = F ? ll(F) : null,
                    F !== null && (Re = f(F),
                    ne = F.tag,
                    F !== Re || ne !== 5 && ne !== 27 && ne !== 6) && (F = null)) : (z = null,
                    F = j),
                    z !== F)) {
                        if (ne = yc,
                        G = "onMouseLeave",
                        N = "onMouseEnter",
                        T = "mouse",
                        (e === "pointerout" || e === "pointerover") && (ne = xc,
                        G = "onPointerLeave",
                        N = "onPointerEnter",
                        T = "pointer"),
                        Re = z == null ? D : Fl(z),
                        R = F == null ? D : Fl(F),
                        D = new ne(G,T + "leave",z,n,B),
                        D.target = Re,
                        D.relatedTarget = R,
                        G = null,
                        ll(B) === j && (ne = new ne(N,T + "enter",F,n,B),
                        ne.target = R,
                        ne.relatedTarget = Re,
                        G = ne),
                        Re = G,
                        z && F)
                            t: {
                                for (ne = L0,
                                N = z,
                                T = F,
                                R = 0,
                                G = N; G; G = ne(G))
                                    R++;
                                G = 0;
                                for (var ee = T; ee; ee = ne(ee))
                                    G++;
                                for (; 0 < R - G; )
                                    N = ne(N),
                                    R--;
                                for (; 0 < G - R; )
                                    T = ne(T),
                                    G--;
                                for (; R--; ) {
                                    if (N === T || T !== null && N === T.alternate) {
                                        ne = N;
                                        break t
                                    }
                                    N = ne(N),
                                    T = ne(T)
                                }
                                ne = null
                            }
                        else
                            ne = null;
                        z !== null && fh(Y, D, z, ne, !1),
                        F !== null && Re !== null && fh(Y, Re, F, ne, !0)
                    }
                }
                e: {
                    if (D = j ? Fl(j) : window,
                    z = D.nodeName && D.nodeName.toLowerCase(),
                    z === "select" || z === "input" && D.type === "file")
                        var xe = Tc;
                    else if (Cc(D))
                        if (Oc)
                            xe = Kp;
                        else {
                            xe = Xp;
                            var I = Qp
                        }
                    else
                        z = D.nodeName,
                        !z || z.toLowerCase() !== "input" || D.type !== "checkbox" && D.type !== "radio" ? j && Pu(j.elementType) && (xe = Tc) : xe = Zp;
                    if (xe && (xe = xe(e, j))) {
                        Ac(Y, xe, n, B);
                        break e
                    }
                    I && I(e, D, j),
                    e === "focusout" && j && D.type === "number" && j.memoizedProps.value != null && Wu(D, "number", D.value)
                }
                switch (I = j ? Fl(j) : window,
                e) {
                case "focusin":
                    (Cc(I) || I.contentEditable === "true") && (dl = I,
                    ds = j,
                    ia = null);
                    break;
                case "focusout":
                    ia = ds = dl = null;
                    break;
                case "mousedown":
                    hs = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    hs = !1,
                    Uc(Y, n, B);
                    break;
                case "selectionchange":
                    if (Jp)
                        break;
                case "keydown":
                case "keyup":
                    Uc(Y, n, B)
                }
                var re;
                if (rs)
                    e: {
                        switch (e) {
                        case "compositionstart":
                            var ge = "onCompositionStart";
                            break e;
                        case "compositionend":
                            ge = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            ge = "onCompositionUpdate";
                            break e
                        }
                        ge = void 0
                    }
                else
                    fl ? wc(e, n) && (ge = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ge = "onCompositionStart");
                ge && (bc && n.locale !== "ko" && (fl || ge !== "onCompositionStart" ? ge === "onCompositionEnd" && fl && (re = gc()) : (hn = B,
                ls = "value"in hn ? hn.value : hn.textContent,
                fl = !0)),
                I = au(j, ge),
                0 < I.length && (ge = new vc(ge,e,null,n,B),
                Y.push({
                    event: ge,
                    listeners: I
                }),
                re ? ge.data = re : (re = _c(n),
                re !== null && (ge.data = re)))),
                (re = Hp ? qp(e, n) : Gp(e, n)) && (ge = au(j, "onBeforeInput"),
                0 < ge.length && (I = new vc("onBeforeInput","beforeinput",null,n,B),
                Y.push({
                    event: I,
                    listeners: ge
                }),
                I.data = re)),
                j0(Y, e, j, n, B)
            }
            oh(Y, t)
        })
    }
    function Ra(e, t, n) {
        return {
            instance: e,
            listener: t,
            currentTarget: n
        }
    }
    function au(e, t) {
        for (var n = t + "Capture", l = []; e !== null; ) {
            var i = e
              , s = i.stateNode;
            if (i = i.tag,
            i !== 5 && i !== 26 && i !== 27 || s === null || (i = Wl(e, n),
            i != null && l.unshift(Ra(e, i, s)),
            i = Wl(e, t),
            i != null && l.push(Ra(e, i, s))),
            e.tag === 3)
                return l;
            e = e.return
        }
        return []
    }
    function L0(e) {
        if (e === null)
            return null;
        do
            e = e.return;
        while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }
    function fh(e, t, n, l, i) {
        for (var s = t._reactName, h = []; n !== null && n !== l; ) {
            var y = n
              , _ = y.alternate
              , j = y.stateNode;
            if (y = y.tag,
            _ !== null && _ === l)
                break;
            y !== 5 && y !== 26 && y !== 27 || j === null || (_ = j,
            i ? (j = Wl(n, s),
            j != null && h.unshift(Ra(n, j, _))) : i || (j = Wl(n, s),
            j != null && h.push(Ra(n, j, _)))),
            n = n.return
        }
        h.length !== 0 && e.push({
            event: t,
            listeners: h
        })
    }
    var U0 = /\r\n?/g
      , B0 = /\u0000|\uFFFD/g;
    function dh(e) {
        return (typeof e == "string" ? e : "" + e).replace(U0, `
`).replace(B0, "")
    }
    function hh(e, t) {
        return t = dh(t),
        dh(e) === t
    }
    function Ne(e, t, n, l, i, s) {
        switch (n) {
        case "children":
            typeof l == "string" ? t === "body" || t === "textarea" && l === "" || rl(e, l) : (typeof l == "number" || typeof l == "bigint") && t !== "body" && rl(e, "" + l);
            break;
        case "className":
            ri(e, "class", l);
            break;
        case "tabIndex":
            ri(e, "tabindex", l);
            break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
            ri(e, n, l);
            break;
        case "style":
            dc(e, l, s);
            break;
        case "data":
            if (t !== "object") {
                ri(e, "data", l);
                break
            }
        case "src":
        case "href":
            if (l === "" && (t !== "a" || n !== "href")) {
                e.removeAttribute(n);
                break
            }
            if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
                e.removeAttribute(n);
                break
            }
            l = ci("" + l),
            e.setAttribute(n, l);
            break;
        case "action":
        case "formAction":
            if (typeof l == "function") {
                e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                break
            } else
                typeof s == "function" && (n === "formAction" ? (t !== "input" && Ne(e, t, "name", i.name, i, null),
                Ne(e, t, "formEncType", i.formEncType, i, null),
                Ne(e, t, "formMethod", i.formMethod, i, null),
                Ne(e, t, "formTarget", i.formTarget, i, null)) : (Ne(e, t, "encType", i.encType, i, null),
                Ne(e, t, "method", i.method, i, null),
                Ne(e, t, "target", i.target, i, null)));
            if (l == null || typeof l == "symbol" || typeof l == "boolean") {
                e.removeAttribute(n);
                break
            }
            l = ci("" + l),
            e.setAttribute(n, l);
            break;
        case "onClick":
            l != null && (e.onclick = Xt);
            break;
        case "onScroll":
            l != null && he("scroll", e);
            break;
        case "onScrollEnd":
            l != null && he("scrollend", e);
            break;
        case "dangerouslySetInnerHTML":
            if (l != null) {
                if (typeof l != "object" || !("__html"in l))
                    throw Error(o(61));
                if (n = l.__html,
                n != null) {
                    if (i.children != null)
                        throw Error(o(60));
                    e.innerHTML = n
                }
            }
            break;
        case "multiple":
            e.multiple = l && typeof l != "function" && typeof l != "symbol";
            break;
        case "muted":
            e.muted = l && typeof l != "function" && typeof l != "symbol";
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
            break;
        case "autoFocus":
            break;
        case "xlinkHref":
            if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
                e.removeAttribute("xlink:href");
                break
            }
            n = ci("" + l),
            e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
            break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
            l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "" + l) : e.removeAttribute(n);
            break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
            l && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
            break;
        case "capture":
        case "download":
            l === !0 ? e.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? e.setAttribute(n, l) : e.removeAttribute(n);
            break;
        case "cols":
        case "rows":
        case "size":
        case "span":
            l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? e.setAttribute(n, l) : e.removeAttribute(n);
            break;
        case "rowSpan":
        case "start":
            l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? e.removeAttribute(n) : e.setAttribute(n, l);
            break;
        case "popover":
            he("beforetoggle", e),
            he("toggle", e),
            si(e, "popover", l);
            break;
        case "xlinkActuate":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
            break;
        case "xlinkArcrole":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
            break;
        case "xlinkRole":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:role", l);
            break;
        case "xlinkShow":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:show", l);
            break;
        case "xlinkTitle":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:title", l);
            break;
        case "xlinkType":
            Qt(e, "http://www.w3.org/1999/xlink", "xlink:type", l);
            break;
        case "xmlBase":
            Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
            break;
        case "xmlLang":
            Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
            break;
        case "xmlSpace":
            Qt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
            break;
        case "is":
            si(e, "is", l);
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = fp.get(n) || n,
            si(e, n, l))
        }
    }
    function Hr(e, t, n, l, i, s) {
        switch (n) {
        case "style":
            dc(e, l, s);
            break;
        case "dangerouslySetInnerHTML":
            if (l != null) {
                if (typeof l != "object" || !("__html"in l))
                    throw Error(o(61));
                if (n = l.__html,
                n != null) {
                    if (i.children != null)
                        throw Error(o(60));
                    e.innerHTML = n
                }
            }
            break;
        case "children":
            typeof l == "string" ? rl(e, l) : (typeof l == "number" || typeof l == "bigint") && rl(e, "" + l);
            break;
        case "onScroll":
            l != null && he("scroll", e);
            break;
        case "onScrollEnd":
            l != null && he("scrollend", e);
            break;
        case "onClick":
            l != null && (e.onclick = Xt);
            break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
            break;
        case "innerText":
        case "textContent":
            break;
        default:
            if (!lc.hasOwnProperty(n))
                e: {
                    if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"),
                    t = n.slice(2, i ? n.length - 7 : void 0),
                    s = e[at] || null,
                    s = s != null ? s[n] : null,
                    typeof s == "function" && e.removeEventListener(t, s, i),
                    typeof l == "function")) {
                        typeof s != "function" && s !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)),
                        e.addEventListener(t, l, i);
                        break e
                    }
                    n in e ? e[n] = l : l === !0 ? e.setAttribute(n, "") : si(e, n, l)
                }
        }
    }
    function Ie(e, t, n) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "img":
            he("error", e),
            he("load", e);
            var l = !1, i = !1, s;
            for (s in n)
                if (n.hasOwnProperty(s)) {
                    var h = n[s];
                    if (h != null)
                        switch (s) {
                        case "src":
                            l = !0;
                            break;
                        case "srcSet":
                            i = !0;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(o(137, t));
                        default:
                            Ne(e, t, s, h, n, null)
                        }
                }
            i && Ne(e, t, "srcSet", n.srcSet, n, null),
            l && Ne(e, t, "src", n.src, n, null);
            return;
        case "input":
            he("invalid", e);
            var y = s = h = i = null
              , _ = null
              , j = null;
            for (l in n)
                if (n.hasOwnProperty(l)) {
                    var B = n[l];
                    if (B != null)
                        switch (l) {
                        case "name":
                            i = B;
                            break;
                        case "type":
                            h = B;
                            break;
                        case "checked":
                            _ = B;
                            break;
                        case "defaultChecked":
                            j = B;
                            break;
                        case "value":
                            s = B;
                            break;
                        case "defaultValue":
                            y = B;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (B != null)
                                throw Error(o(137, t));
                            break;
                        default:
                            Ne(e, t, l, B, n, null)
                        }
                }
            rc(e, s, y, _, j, h, i, !1);
            return;
        case "select":
            he("invalid", e),
            l = h = s = null;
            for (i in n)
                if (n.hasOwnProperty(i) && (y = n[i],
                y != null))
                    switch (i) {
                    case "value":
                        s = y;
                        break;
                    case "defaultValue":
                        h = y;
                        break;
                    case "multiple":
                        l = y;
                    default:
                        Ne(e, t, i, y, n, null)
                    }
            t = s,
            n = h,
            e.multiple = !!l,
            t != null ? sl(e, !!l, t, !1) : n != null && sl(e, !!l, n, !0);
            return;
        case "textarea":
            he("invalid", e),
            s = i = l = null;
            for (h in n)
                if (n.hasOwnProperty(h) && (y = n[h],
                y != null))
                    switch (h) {
                    case "value":
                        l = y;
                        break;
                    case "defaultValue":
                        i = y;
                        break;
                    case "children":
                        s = y;
                        break;
                    case "dangerouslySetInnerHTML":
                        if (y != null)
                            throw Error(o(91));
                        break;
                    default:
                        Ne(e, t, h, y, n, null)
                    }
            cc(e, l, i, s);
            return;
        case "option":
            for (_ in n)
                n.hasOwnProperty(_) && (l = n[_],
                l != null) && (_ === "selected" ? e.selected = l && typeof l != "function" && typeof l != "symbol" : Ne(e, t, _, l, n, null));
            return;
        case "dialog":
            he("beforetoggle", e),
            he("toggle", e),
            he("cancel", e),
            he("close", e);
            break;
        case "iframe":
        case "object":
            he("load", e);
            break;
        case "video":
        case "audio":
            for (l = 0; l < Na.length; l++)
                he(Na[l], e);
            break;
        case "image":
            he("error", e),
            he("load", e);
            break;
        case "details":
            he("toggle", e);
            break;
        case "embed":
        case "source":
        case "link":
            he("error", e),
            he("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
            for (j in n)
                if (n.hasOwnProperty(j) && (l = n[j],
                l != null))
                    switch (j) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        throw Error(o(137, t));
                    default:
                        Ne(e, t, j, l, n, null)
                    }
            return;
        default:
            if (Pu(t)) {
                for (B in n)
                    n.hasOwnProperty(B) && (l = n[B],
                    l !== void 0 && Hr(e, t, B, l, n, void 0));
                return
            }
        }
        for (y in n)
            n.hasOwnProperty(y) && (l = n[y],
            l != null && Ne(e, t, y, l, n, null))
    }
    function H0(e, t, n, l) {
        switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
            break;
        case "input":
            var i = null
              , s = null
              , h = null
              , y = null
              , _ = null
              , j = null
              , B = null;
            for (z in n) {
                var Y = n[z];
                if (n.hasOwnProperty(z) && Y != null)
                    switch (z) {
                    case "checked":
                        break;
                    case "value":
                        break;
                    case "defaultValue":
                        _ = Y;
                    default:
                        l.hasOwnProperty(z) || Ne(e, t, z, null, l, Y)
                    }
            }
            for (var D in l) {
                var z = l[D];
                if (Y = n[D],
                l.hasOwnProperty(D) && (z != null || Y != null))
                    switch (D) {
                    case "type":
                        s = z;
                        break;
                    case "name":
                        i = z;
                        break;
                    case "checked":
                        j = z;
                        break;
                    case "defaultChecked":
                        B = z;
                        break;
                    case "value":
                        h = z;
                        break;
                    case "defaultValue":
                        y = z;
                        break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (z != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        z !== Y && Ne(e, t, D, z, l, Y)
                    }
            }
            Fu(e, h, y, _, j, B, s, i);
            return;
        case "select":
            z = h = y = D = null;
            for (s in n)
                if (_ = n[s],
                n.hasOwnProperty(s) && _ != null)
                    switch (s) {
                    case "value":
                        break;
                    case "multiple":
                        z = _;
                    default:
                        l.hasOwnProperty(s) || Ne(e, t, s, null, l, _)
                    }
            for (i in l)
                if (s = l[i],
                _ = n[i],
                l.hasOwnProperty(i) && (s != null || _ != null))
                    switch (i) {
                    case "value":
                        D = s;
                        break;
                    case "defaultValue":
                        y = s;
                        break;
                    case "multiple":
                        h = s;
                    default:
                        s !== _ && Ne(e, t, i, s, l, _)
                    }
            t = y,
            n = h,
            l = z,
            D != null ? sl(e, !!n, D, !1) : !!l != !!n && (t != null ? sl(e, !!n, t, !0) : sl(e, !!n, n ? [] : "", !1));
            return;
        case "textarea":
            z = D = null;
            for (y in n)
                if (i = n[y],
                n.hasOwnProperty(y) && i != null && !l.hasOwnProperty(y))
                    switch (y) {
                    case "value":
                        break;
                    case "children":
                        break;
                    default:
                        Ne(e, t, y, null, l, i)
                    }
            for (h in l)
                if (i = l[h],
                s = n[h],
                l.hasOwnProperty(h) && (i != null || s != null))
                    switch (h) {
                    case "value":
                        D = i;
                        break;
                    case "defaultValue":
                        z = i;
                        break;
                    case "children":
                        break;
                    case "dangerouslySetInnerHTML":
                        if (i != null)
                            throw Error(o(91));
                        break;
                    default:
                        i !== s && Ne(e, t, h, i, l, s)
                    }
            oc(e, D, z);
            return;
        case "option":
            for (var F in n)
                D = n[F],
                n.hasOwnProperty(F) && D != null && !l.hasOwnProperty(F) && (F === "selected" ? e.selected = !1 : Ne(e, t, F, null, l, D));
            for (_ in l)
                D = l[_],
                z = n[_],
                l.hasOwnProperty(_) && D !== z && (D != null || z != null) && (_ === "selected" ? e.selected = D && typeof D != "function" && typeof D != "symbol" : Ne(e, t, _, D, l, z));
            return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
            for (var ne in n)
                D = n[ne],
                n.hasOwnProperty(ne) && D != null && !l.hasOwnProperty(ne) && Ne(e, t, ne, null, l, D);
            for (j in l)
                if (D = l[j],
                z = n[j],
                l.hasOwnProperty(j) && D !== z && (D != null || z != null))
                    switch (j) {
                    case "children":
                    case "dangerouslySetInnerHTML":
                        if (D != null)
                            throw Error(o(137, t));
                        break;
                    default:
                        Ne(e, t, j, D, l, z)
                    }
            return;
        default:
            if (Pu(t)) {
                for (var Re in n)
                    D = n[Re],
                    n.hasOwnProperty(Re) && D !== void 0 && !l.hasOwnProperty(Re) && Hr(e, t, Re, void 0, l, D);
                for (B in l)
                    D = l[B],
                    z = n[B],
                    !l.hasOwnProperty(B) || D === z || D === void 0 && z === void 0 || Hr(e, t, B, D, l, z);
                return
            }
        }
        for (var N in n)
            D = n[N],
            n.hasOwnProperty(N) && D != null && !l.hasOwnProperty(N) && Ne(e, t, N, null, l, D);
        for (Y in l)
            D = l[Y],
            z = n[Y],
            !l.hasOwnProperty(Y) || D === z || D == null && z == null || Ne(e, t, Y, D, l, z)
    }
    function mh(e) {
        switch (e) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
            return !0;
        default:
            return !1
        }
    }
    function q0() {
        if (typeof performance.getEntriesByType == "function") {
            for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
                var i = n[l]
                  , s = i.transferSize
                  , h = i.initiatorType
                  , y = i.duration;
                if (s && y && mh(h)) {
                    for (h = 0,
                    y = i.responseEnd,
                    l += 1; l < n.length; l++) {
                        var _ = n[l]
                          , j = _.startTime;
                        if (j > y)
                            break;
                        var B = _.transferSize
                          , Y = _.initiatorType;
                        B && mh(Y) && (_ = _.responseEnd,
                        h += B * (_ < y ? 1 : (y - j) / (_ - j)))
                    }
                    if (--l,
                    t += 8 * (s + h) / (i.duration / 1e3),
                    e++,
                    10 < e)
                        break
                }
            }
            if (0 < e)
                return t / e / 1e6
        }
        return navigator.connection && (e = navigator.connection.downlink,
        typeof e == "number") ? e : 5
    }
    var qr = null
      , Gr = null;
    function iu(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }
    function gh(e) {
        switch (e) {
        case "http://www.w3.org/2000/svg":
            return 1;
        case "http://www.w3.org/1998/Math/MathML":
            return 2;
        default:
            return 0
        }
    }
    function ph(e, t) {
        if (e === 0)
            switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
            }
        return e === 1 && t === "foreignObject" ? 0 : e
    }
    function Yr(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var Vr = null;
    function G0() {
        var e = window.event;
        return e && e.type === "popstate" ? e === Vr ? !1 : (Vr = e,
        !0) : (Vr = null,
        !1)
    }
    var yh = typeof setTimeout == "function" ? setTimeout : void 0
      , Y0 = typeof clearTimeout == "function" ? clearTimeout : void 0
      , vh = typeof Promise == "function" ? Promise : void 0
      , V0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof vh < "u" ? function(e) {
        return vh.resolve(null).then(e).catch(Q0)
    }
    : yh;
    function Q0(e) {
        setTimeout(function() {
            throw e
        })
    }
    function Rn(e) {
        return e === "head"
    }
    function xh(e, t) {
        var n = t
          , l = 0;
        do {
            var i = n.nextSibling;
            if (e.removeChild(n),
            i && i.nodeType === 8)
                if (n = i.data,
                n === "/$" || n === "/&") {
                    if (l === 0) {
                        e.removeChild(i),
                        ql(t);
                        return
                    }
                    l--
                } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
                    l++;
                else if (n === "html")
                    ja(e.ownerDocument.documentElement);
                else if (n === "head") {
                    n = e.ownerDocument.head,
                    ja(n);
                    for (var s = n.firstChild; s; ) {
                        var h = s.nextSibling
                          , y = s.nodeName;
                        s[$l] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s),
                        s = h
                    }
                } else
                    n === "body" && ja(e.ownerDocument.body);
            n = i
        } while (n);
        ql(t)
    }
    function bh(e, t) {
        var n = e;
        e = 0;
        do {
            var l = n.nextSibling;
            if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display,
            n.style.display = "none") : (n.style.display = n._stashedDisplay || "",
            n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue,
            n.nodeValue = "") : n.nodeValue = n._stashedText || ""),
            l && l.nodeType === 8)
                if (n = l.data,
                n === "/$") {
                    if (e === 0)
                        break;
                    e--
                } else
                    n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
            n = l
        } while (n)
    }
    function Qr(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
            var n = t;
            switch (t = t.nextSibling,
            n.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
                Qr(n),
                Ju(n);
                continue;
            case "SCRIPT":
            case "STYLE":
                continue;
            case "LINK":
                if (n.rel.toLowerCase() === "stylesheet")
                    continue
            }
            e.removeChild(n)
        }
    }
    function X0(e, t, n, l) {
        for (; e.nodeType === 1; ) {
            var i = n;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!l && (e.nodeName !== "INPUT" || e.type !== "hidden"))
                    break
            } else if (l) {
                if (!e[$l])
                    switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop"))
                            break;
                        return e;
                    case "link":
                        if (s = e.getAttribute("rel"),
                        s === "stylesheet" && e.hasAttribute("data-precedence"))
                            break;
                        if (s !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title))
                            break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence"))
                            break;
                        return e;
                    case "script":
                        if (s = e.getAttribute("src"),
                        (s !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                            break;
                        return e;
                    default:
                        return e
                    }
            } else if (t === "input" && e.type === "hidden") {
                var s = i.name == null ? null : "" + i.name;
                if (i.type === "hidden" && e.getAttribute("name") === s)
                    return e
            } else
                return e;
            if (e = Nt(e.nextSibling),
            e === null)
                break
        }
        return null
    }
    function Z0(e, t, n) {
        if (t === "")
            return null;
        for (; e.nodeType !== 3; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Nt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function Sh(e, t) {
        for (; e.nodeType !== 8; )
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Nt(e.nextSibling),
            e === null))
                return null;
        return e
    }
    function Xr(e) {
        return e.data === "$?" || e.data === "$~"
    }
    function Zr(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
    }
    function K0(e, t) {
        var n = e.ownerDocument;
        if (e.data === "$~")
            e._reactRetry = t;
        else if (e.data !== "$?" || n.readyState !== "loading")
            t();
        else {
            var l = function() {
                t(),
                n.removeEventListener("DOMContentLoaded", l)
            };
            n.addEventListener("DOMContentLoaded", l),
            e._reactRetry = l
        }
    }
    function Nt(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3)
                break;
            if (t === 8) {
                if (t = e.data,
                t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
                    break;
                if (t === "/$" || t === "/&")
                    return null
            }
        }
        return e
    }
    var Kr = null;
    function Eh(e) {
        e = e.nextSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var n = e.data;
                if (n === "/$" || n === "/&") {
                    if (t === 0)
                        return Nt(e.nextSibling);
                    t--
                } else
                    n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++
            }
            e = e.nextSibling
        }
        return null
    }
    function wh(e) {
        e = e.previousSibling;
        for (var t = 0; e; ) {
            if (e.nodeType === 8) {
                var n = e.data;
                if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
                    if (t === 0)
                        return e;
                    t--
                } else
                    n !== "/$" && n !== "/&" || t++
            }
            e = e.previousSibling
        }
        return null
    }
    function _h(e, t, n) {
        switch (t = iu(n),
        e) {
        case "html":
            if (e = t.documentElement,
            !e)
                throw Error(o(452));
            return e;
        case "head":
            if (e = t.head,
            !e)
                throw Error(o(453));
            return e;
        case "body":
            if (e = t.body,
            !e)
                throw Error(o(454));
            return e;
        default:
            throw Error(o(451))
        }
    }
    function ja(e) {
        for (var t = e.attributes; t.length; )
            e.removeAttributeNode(t[0]);
        Ju(e)
    }
    var Rt = new Map
      , Ch = new Set;
    function uu(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var sn = X.d;
    X.d = {
        f: k0,
        r: J0,
        D: $0,
        C: F0,
        L: W0,
        m: P0,
        X: ey,
        S: I0,
        M: ty
    };
    function k0() {
        var e = sn.f()
          , t = Wi();
        return e || t
    }
    function J0(e) {
        var t = al(e);
        t !== null && t.tag === 5 && t.type === "form" ? Vf(t) : sn.r(e)
    }
    var Ul = typeof document > "u" ? null : document;
    function Ah(e, t, n) {
        var l = Ul;
        if (l && typeof t == "string" && t) {
            var i = Et(t);
            i = 'link[rel="' + e + '"][href="' + i + '"]',
            typeof n == "string" && (i += '[crossorigin="' + n + '"]'),
            Ch.has(i) || (Ch.add(i),
            e = {
                rel: e,
                crossOrigin: n,
                href: t
            },
            l.querySelector(i) === null && (t = l.createElement("link"),
            Ie(t, "link", e),
            Ke(t),
            l.head.appendChild(t)))
        }
    }
    function $0(e) {
        sn.D(e),
        Ah("dns-prefetch", e, null)
    }
    function F0(e, t) {
        sn.C(e, t),
        Ah("preconnect", e, t)
    }
    function W0(e, t, n) {
        sn.L(e, t, n);
        var l = Ul;
        if (l && e && t) {
            var i = 'link[rel="preload"][as="' + Et(t) + '"]';
            t === "image" && n && n.imageSrcSet ? (i += '[imagesrcset="' + Et(n.imageSrcSet) + '"]',
            typeof n.imageSizes == "string" && (i += '[imagesizes="' + Et(n.imageSizes) + '"]')) : i += '[href="' + Et(e) + '"]';
            var s = i;
            switch (t) {
            case "style":
                s = Bl(e);
                break;
            case "script":
                s = Hl(e)
            }
            Rt.has(s) || (e = v({
                rel: "preload",
                href: t === "image" && n && n.imageSrcSet ? void 0 : e,
                as: t
            }, n),
            Rt.set(s, e),
            l.querySelector(i) !== null || t === "style" && l.querySelector(Da(s)) || t === "script" && l.querySelector(Ma(s)) || (t = l.createElement("link"),
            Ie(t, "link", e),
            Ke(t),
            l.head.appendChild(t)))
        }
    }
    function P0(e, t) {
        sn.m(e, t);
        var n = Ul;
        if (n && e) {
            var l = t && typeof t.as == "string" ? t.as : "script"
              , i = 'link[rel="modulepreload"][as="' + Et(l) + '"][href="' + Et(e) + '"]'
              , s = i;
            switch (l) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
                s = Hl(e)
            }
            if (!Rt.has(s) && (e = v({
                rel: "modulepreload",
                href: e
            }, t),
            Rt.set(s, e),
            n.querySelector(i) === null)) {
                switch (l) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    if (n.querySelector(Ma(s)))
                        return
                }
                l = n.createElement("link"),
                Ie(l, "link", e),
                Ke(l),
                n.head.appendChild(l)
            }
        }
    }
    function I0(e, t, n) {
        sn.S(e, t, n);
        var l = Ul;
        if (l && e) {
            var i = il(l).hoistableStyles
              , s = Bl(e);
            t = t || "default";
            var h = i.get(s);
            if (!h) {
                var y = {
                    loading: 0,
                    preload: null
                };
                if (h = l.querySelector(Da(s)))
                    y.loading = 5;
                else {
                    e = v({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, n),
                    (n = Rt.get(s)) && kr(e, n);
                    var _ = h = l.createElement("link");
                    Ke(_),
                    Ie(_, "link", e),
                    _._p = new Promise(function(j, B) {
                        _.onload = j,
                        _.onerror = B
                    }
                    ),
                    _.addEventListener("load", function() {
                        y.loading |= 1
                    }),
                    _.addEventListener("error", function() {
                        y.loading |= 2
                    }),
                    y.loading |= 4,
                    su(h, t, l)
                }
                h = {
                    type: "stylesheet",
                    instance: h,
                    count: 1,
                    state: y
                },
                i.set(s, h)
            }
        }
    }
    function ey(e, t) {
        sn.X(e, t);
        var n = Ul;
        if (n && e) {
            var l = il(n).hoistableScripts
              , i = Hl(e)
              , s = l.get(i);
            s || (s = n.querySelector(Ma(i)),
            s || (e = v({
                src: e,
                async: !0
            }, t),
            (t = Rt.get(i)) && Jr(e, t),
            s = n.createElement("script"),
            Ke(s),
            Ie(s, "link", e),
            n.head.appendChild(s)),
            s = {
                type: "script",
                instance: s,
                count: 1,
                state: null
            },
            l.set(i, s))
        }
    }
    function ty(e, t) {
        sn.M(e, t);
        var n = Ul;
        if (n && e) {
            var l = il(n).hoistableScripts
              , i = Hl(e)
              , s = l.get(i);
            s || (s = n.querySelector(Ma(i)),
            s || (e = v({
                src: e,
                async: !0,
                type: "module"
            }, t),
            (t = Rt.get(i)) && Jr(e, t),
            s = n.createElement("script"),
            Ke(s),
            Ie(s, "link", e),
            n.head.appendChild(s)),
            s = {
                type: "script",
                instance: s,
                count: 1,
                state: null
            },
            l.set(i, s))
        }
    }
    function Th(e, t, n, l) {
        var i = (i = fe.current) ? uu(i) : null;
        if (!i)
            throw Error(o(446));
        switch (e) {
        case "meta":
        case "title":
            return null;
        case "style":
            return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Bl(n.href),
            n = il(i).hoistableStyles,
            l = n.get(t),
            l || (l = {
                type: "style",
                instance: null,
                count: 0,
                state: null
            },
            n.set(t, l)),
            l) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        case "link":
            if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
                e = Bl(n.href);
                var s = il(i).hoistableStyles
                  , h = s.get(e);
                if (h || (i = i.ownerDocument || i,
                h = {
                    type: "stylesheet",
                    instance: null,
                    count: 0,
                    state: {
                        loading: 0,
                        preload: null
                    }
                },
                s.set(e, h),
                (s = i.querySelector(Da(e))) && !s._p && (h.instance = s,
                h.state.loading = 5),
                Rt.has(e) || (n = {
                    rel: "preload",
                    as: "style",
                    href: n.href,
                    crossOrigin: n.crossOrigin,
                    integrity: n.integrity,
                    media: n.media,
                    hrefLang: n.hrefLang,
                    referrerPolicy: n.referrerPolicy
                },
                Rt.set(e, n),
                s || ny(i, e, n, h.state))),
                t && l === null)
                    throw Error(o(528, ""));
                return h
            }
            if (t && l !== null)
                throw Error(o(529, ""));
            return null;
        case "script":
            return t = n.async,
            n = n.src,
            typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Hl(n),
            n = il(i).hoistableScripts,
            l = n.get(t),
            l || (l = {
                type: "script",
                instance: null,
                count: 0,
                state: null
            },
            n.set(t, l)),
            l) : {
                type: "void",
                instance: null,
                count: 0,
                state: null
            };
        default:
            throw Error(o(444, e))
        }
    }
    function Bl(e) {
        return 'href="' + Et(e) + '"'
    }
    function Da(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }
    function Oh(e) {
        return v({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }
    function ny(e, t, n, l) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? l.loading = 1 : (t = e.createElement("link"),
        l.preload = t,
        t.addEventListener("load", function() {
            return l.loading |= 1
        }),
        t.addEventListener("error", function() {
            return l.loading |= 2
        }),
        Ie(t, "link", n),
        Ke(t),
        e.head.appendChild(t))
    }
    function Hl(e) {
        return '[src="' + Et(e) + '"]'
    }
    function Ma(e) {
        return "script[async]" + e
    }
    function Nh(e, t, n) {
        if (t.count++,
        t.instance === null)
            switch (t.type) {
            case "style":
                var l = e.querySelector('style[data-href~="' + Et(n.href) + '"]');
                if (l)
                    return t.instance = l,
                    Ke(l),
                    l;
                var i = v({}, n, {
                    "data-href": n.href,
                    "data-precedence": n.precedence,
                    href: null,
                    precedence: null
                });
                return l = (e.ownerDocument || e).createElement("style"),
                Ke(l),
                Ie(l, "style", i),
                su(l, n.precedence, e),
                t.instance = l;
            case "stylesheet":
                i = Bl(n.href);
                var s = e.querySelector(Da(i));
                if (s)
                    return t.state.loading |= 4,
                    t.instance = s,
                    Ke(s),
                    s;
                l = Oh(n),
                (i = Rt.get(i)) && kr(l, i),
                s = (e.ownerDocument || e).createElement("link"),
                Ke(s);
                var h = s;
                return h._p = new Promise(function(y, _) {
                    h.onload = y,
                    h.onerror = _
                }
                ),
                Ie(s, "link", l),
                t.state.loading |= 4,
                su(s, n.precedence, e),
                t.instance = s;
            case "script":
                return s = Hl(n.src),
                (i = e.querySelector(Ma(s))) ? (t.instance = i,
                Ke(i),
                i) : (l = n,
                (i = Rt.get(s)) && (l = v({}, n),
                Jr(l, i)),
                e = e.ownerDocument || e,
                i = e.createElement("script"),
                Ke(i),
                Ie(i, "link", l),
                e.head.appendChild(i),
                t.instance = i);
            case "void":
                return null;
            default:
                throw Error(o(443, t.type))
            }
        else
            t.type === "stylesheet" && (t.state.loading & 4) === 0 && (l = t.instance,
            t.state.loading |= 4,
            su(l, n.precedence, e));
        return t.instance
    }
    function su(e, t, n) {
        for (var l = n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), i = l.length ? l[l.length - 1] : null, s = i, h = 0; h < l.length; h++) {
            var y = l[h];
            if (y.dataset.precedence === t)
                s = y;
            else if (s !== i)
                break
        }
        s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = n.nodeType === 9 ? n.head : n,
        t.insertBefore(e, t.firstChild))
    }
    function kr(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.title == null && (e.title = t.title)
    }
    function Jr(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
        e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
        e.integrity == null && (e.integrity = t.integrity)
    }
    var ru = null;
    function Rh(e, t, n) {
        if (ru === null) {
            var l = new Map
              , i = ru = new Map;
            i.set(n, l)
        } else
            i = ru,
            l = i.get(n),
            l || (l = new Map,
            i.set(n, l));
        if (l.has(e))
            return l;
        for (l.set(e, null),
        n = n.getElementsByTagName(e),
        i = 0; i < n.length; i++) {
            var s = n[i];
            if (!(s[$l] || s[$e] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
                var h = s.getAttribute(t) || "";
                h = e + h;
                var y = l.get(h);
                y ? y.push(s) : l.set(h, [s])
            }
        }
        return l
    }
    function jh(e, t, n) {
        e = e.ownerDocument || e,
        e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null)
    }
    function ly(e, t, n) {
        if (n === 1 || t.itemProp != null)
            return !1;
        switch (e) {
        case "meta":
        case "title":
            return !0;
        case "style":
            if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
                break;
            return !0;
        case "link":
            if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
                break;
            return t.rel === "stylesheet" ? (e = t.disabled,
            typeof t.precedence == "string" && e == null) : !0;
        case "script":
            if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
                return !0
        }
        return !1
    }
    function Dh(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }
    function ay(e, t, n, l) {
        if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
            if (n.instance === null) {
                var i = Bl(l.href)
                  , s = t.querySelector(Da(i));
                if (s) {
                    t = s._p,
                    t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++,
                    e = ou.bind(e),
                    t.then(e, e)),
                    n.state.loading |= 4,
                    n.instance = s,
                    Ke(s);
                    return
                }
                s = t.ownerDocument || t,
                l = Oh(l),
                (i = Rt.get(i)) && kr(l, i),
                s = s.createElement("link"),
                Ke(s);
                var h = s;
                h._p = new Promise(function(y, _) {
                    h.onload = y,
                    h.onerror = _
                }
                ),
                Ie(s, "link", l),
                n.instance = s
            }
            e.stylesheets === null && (e.stylesheets = new Map),
            e.stylesheets.set(n, t),
            (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++,
            n = ou.bind(e),
            t.addEventListener("load", n),
            t.addEventListener("error", n))
        }
    }
    var $r = 0;
    function iy(e, t) {
        return e.stylesheets && e.count === 0 && fu(e, e.stylesheets),
        0 < e.count || 0 < e.imgCount ? function(n) {
            var l = setTimeout(function() {
                if (e.stylesheets && fu(e, e.stylesheets),
                e.unsuspend) {
                    var s = e.unsuspend;
                    e.unsuspend = null,
                    s()
                }
            }, 6e4 + t);
            0 < e.imgBytes && $r === 0 && ($r = 62500 * q0());
            var i = setTimeout(function() {
                if (e.waitingForImages = !1,
                e.count === 0 && (e.stylesheets && fu(e, e.stylesheets),
                e.unsuspend)) {
                    var s = e.unsuspend;
                    e.unsuspend = null,
                    s()
                }
            }, (e.imgBytes > $r ? 50 : 800) + t);
            return e.unsuspend = n,
            function() {
                e.unsuspend = null,
                clearTimeout(l),
                clearTimeout(i)
            }
        }
        : null
    }
    function ou() {
        if (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
            if (this.stylesheets)
                fu(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null,
                e()
            }
        }
    }
    var cu = null;
    function fu(e, t) {
        e.stylesheets = null,
        e.unsuspend !== null && (e.count++,
        cu = new Map,
        t.forEach(uy, e),
        cu = null,
        ou.call(e))
    }
    function uy(e, t) {
        if (!(t.state.loading & 4)) {
            var n = cu.get(e);
            if (n)
                var l = n.get(null);
            else {
                n = new Map,
                cu.set(e, n);
                for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), s = 0; s < i.length; s++) {
                    var h = i[s];
                    (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h),
                    l = h)
                }
                l && n.set(null, l)
            }
            i = t.instance,
            h = i.getAttribute("data-precedence"),
            s = n.get(h) || l,
            s === l && n.set(null, i),
            n.set(h, i),
            this.count++,
            l = ou.bind(this),
            i.addEventListener("load", l),
            i.addEventListener("error", l),
            s ? s.parentNode.insertBefore(i, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e,
            e.insertBefore(i, e.firstChild)),
            t.state.loading |= 4
        }
    }
    var za = {
        $$typeof: V,
        Provider: null,
        Consumer: null,
        _currentValue: te,
        _currentValue2: te,
        _threadCount: 0
    };
    function sy(e, t, n, l, i, s, h, y, _) {
        this.tag = 1,
        this.containerInfo = e,
        this.pingCache = this.current = this.pendingChildren = null,
        this.timeoutHandle = -1,
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null,
        this.callbackPriority = 0,
        this.expirationTimes = Xu(-1),
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
        this.entanglements = Xu(0),
        this.hiddenUpdates = Xu(null),
        this.identifierPrefix = l,
        this.onUncaughtError = i,
        this.onCaughtError = s,
        this.onRecoverableError = h,
        this.pooledCache = null,
        this.pooledCacheLanes = 0,
        this.formState = _,
        this.incompleteTransitions = new Map
    }
    function Mh(e, t, n, l, i, s, h, y, _, j, B, Y) {
        return e = new sy(e,t,n,h,_,j,B,Y,y),
        t = 1,
        s === !0 && (t |= 24),
        s = gt(3, null, null, t),
        e.current = s,
        s.stateNode = e,
        t = Os(),
        t.refCount++,
        e.pooledCache = t,
        t.refCount++,
        s.memoizedState = {
            element: l,
            isDehydrated: n,
            cache: t
        },
        Ds(s),
        e
    }
    function zh(e) {
        return e ? (e = gl,
        e) : gl
    }
    function Lh(e, t, n, l, i, s) {
        i = zh(i),
        l.context === null ? l.context = i : l.pendingContext = i,
        l = xn(t),
        l.payload = {
            element: n
        },
        s = s === void 0 ? null : s,
        s !== null && (l.callback = s),
        n = bn(e, l, t),
        n !== null && (ct(n, e, t),
        da(n, e, t))
    }
    function Uh(e, t) {
        if (e = e.memoizedState,
        e !== null && e.dehydrated !== null) {
            var n = e.retryLane;
            e.retryLane = n !== 0 && n < t ? n : t
        }
    }
    function Fr(e, t) {
        Uh(e, t),
        (e = e.alternate) && Uh(e, t)
    }
    function Bh(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Qn(e, 67108864);
            t !== null && ct(t, e, 67108864),
            Fr(e, 67108864)
        }
    }
    function Hh(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = bt();
            t = Zu(t);
            var n = Qn(e, t);
            n !== null && ct(n, e, t),
            Fr(e, t)
        }
    }
    var du = !0;
    function ry(e, t, n, l) {
        var i = L.T;
        L.T = null;
        var s = X.p;
        try {
            X.p = 2,
            Wr(e, t, n, l)
        } finally {
            X.p = s,
            L.T = i
        }
    }
    function oy(e, t, n, l) {
        var i = L.T;
        L.T = null;
        var s = X.p;
        try {
            X.p = 8,
            Wr(e, t, n, l)
        } finally {
            X.p = s,
            L.T = i
        }
    }
    function Wr(e, t, n, l) {
        if (du) {
            var i = Pr(l);
            if (i === null)
                Br(e, t, l, hu, n),
                Gh(e, l);
            else if (fy(i, e, t, n, l))
                l.stopPropagation();
            else if (Gh(e, l),
            t & 4 && -1 < cy.indexOf(e)) {
                for (; i !== null; ) {
                    var s = al(i);
                    if (s !== null)
                        switch (s.tag) {
                        case 3:
                            if (s = s.stateNode,
                            s.current.memoizedState.isDehydrated) {
                                var h = Hn(s.pendingLanes);
                                if (h !== 0) {
                                    var y = s;
                                    for (y.pendingLanes |= 2,
                                    y.entangledLanes |= 2; h; ) {
                                        var _ = 1 << 31 - ht(h);
                                        y.entanglements[1] |= _,
                                        h &= ~_
                                    }
                                    qt(s),
                                    (Se & 6) === 0 && ($i = ft() + 500,
                                    Oa(0))
                                }
                            }
                            break;
                        case 31:
                        case 13:
                            y = Qn(s, 2),
                            y !== null && ct(y, s, 2),
                            Wi(),
                            Fr(s, 2)
                        }
                    if (s = Pr(l),
                    s === null && Br(e, t, l, hu, n),
                    s === i)
                        break;
                    i = s
                }
                i !== null && l.stopPropagation()
            } else
                Br(e, t, l, null, n)
        }
    }
    function Pr(e) {
        return e = es(e),
        Ir(e)
    }
    var hu = null;
    function Ir(e) {
        if (hu = null,
        e = ll(e),
        e !== null) {
            var t = f(e);
            if (t === null)
                e = null;
            else {
                var n = t.tag;
                if (n === 13) {
                    if (e = d(t),
                    e !== null)
                        return e;
                    e = null
                } else if (n === 31) {
                    if (e = g(t),
                    e !== null)
                        return e;
                    e = null
                } else if (n === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated)
                        return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else
                    t !== e && (e = null)
            }
        }
        return hu = e,
        null
    }
    function qh(e) {
        switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 8;
        case "message":
            switch ($g()) {
            case Ko:
                return 2;
            case ko:
                return 8;
            case ni:
            case Fg:
                return 32;
            case Jo:
                return 268435456;
            default:
                return 32
            }
        default:
            return 32
        }
    }
    var eo = !1
      , jn = null
      , Dn = null
      , Mn = null
      , La = new Map
      , Ua = new Map
      , zn = []
      , cy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
    function Gh(e, t) {
        switch (e) {
        case "focusin":
        case "focusout":
            jn = null;
            break;
        case "dragenter":
        case "dragleave":
            Dn = null;
            break;
        case "mouseover":
        case "mouseout":
            Mn = null;
            break;
        case "pointerover":
        case "pointerout":
            La.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Ua.delete(t.pointerId)
        }
    }
    function Ba(e, t, n, l, i, s) {
        return e === null || e.nativeEvent !== s ? (e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: l,
            nativeEvent: s,
            targetContainers: [i]
        },
        t !== null && (t = al(t),
        t !== null && Bh(t)),
        e) : (e.eventSystemFlags |= l,
        t = e.targetContainers,
        i !== null && t.indexOf(i) === -1 && t.push(i),
        e)
    }
    function fy(e, t, n, l, i) {
        switch (t) {
        case "focusin":
            return jn = Ba(jn, e, t, n, l, i),
            !0;
        case "dragenter":
            return Dn = Ba(Dn, e, t, n, l, i),
            !0;
        case "mouseover":
            return Mn = Ba(Mn, e, t, n, l, i),
            !0;
        case "pointerover":
            var s = i.pointerId;
            return La.set(s, Ba(La.get(s) || null, e, t, n, l, i)),
            !0;
        case "gotpointercapture":
            return s = i.pointerId,
            Ua.set(s, Ba(Ua.get(s) || null, e, t, n, l, i)),
            !0
        }
        return !1
    }
    function Yh(e) {
        var t = ll(e.target);
        if (t !== null) {
            var n = f(t);
            if (n !== null) {
                if (t = n.tag,
                t === 13) {
                    if (t = d(n),
                    t !== null) {
                        e.blockedOn = t,
                        ec(e.priority, function() {
                            Hh(n)
                        });
                        return
                    }
                } else if (t === 31) {
                    if (t = g(n),
                    t !== null) {
                        e.blockedOn = t,
                        ec(e.priority, function() {
                            Hh(n)
                        });
                        return
                    }
                } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }
    function mu(e) {
        if (e.blockedOn !== null)
            return !1;
        for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Pr(e.nativeEvent);
            if (n === null) {
                n = e.nativeEvent;
                var l = new n.constructor(n.type,n);
                Iu = l,
                n.target.dispatchEvent(l),
                Iu = null
            } else
                return t = al(n),
                t !== null && Bh(t),
                e.blockedOn = n,
                !1;
            t.shift()
        }
        return !0
    }
    function Vh(e, t, n) {
        mu(e) && n.delete(t)
    }
    function dy() {
        eo = !1,
        jn !== null && mu(jn) && (jn = null),
        Dn !== null && mu(Dn) && (Dn = null),
        Mn !== null && mu(Mn) && (Mn = null),
        La.forEach(Vh),
        Ua.forEach(Vh)
    }
    function gu(e, t) {
        e.blockedOn === t && (e.blockedOn = null,
        eo || (eo = !0,
        u.unstable_scheduleCallback(u.unstable_NormalPriority, dy)))
    }
    var pu = null;
    function Qh(e) {
        pu !== e && (pu = e,
        u.unstable_scheduleCallback(u.unstable_NormalPriority, function() {
            pu === e && (pu = null);
            for (var t = 0; t < e.length; t += 3) {
                var n = e[t]
                  , l = e[t + 1]
                  , i = e[t + 2];
                if (typeof l != "function") {
                    if (Ir(l || n) === null)
                        continue;
                    break
                }
                var s = al(n);
                s !== null && (e.splice(t, 3),
                t -= 3,
                Ps(s, {
                    pending: !0,
                    data: i,
                    method: n.method,
                    action: l
                }, l, i))
            }
        }))
    }
    function ql(e) {
        function t(_) {
            return gu(_, e)
        }
        jn !== null && gu(jn, e),
        Dn !== null && gu(Dn, e),
        Mn !== null && gu(Mn, e),
        La.forEach(t),
        Ua.forEach(t);
        for (var n = 0; n < zn.length; n++) {
            var l = zn[n];
            l.blockedOn === e && (l.blockedOn = null)
        }
        for (; 0 < zn.length && (n = zn[0],
        n.blockedOn === null); )
            Yh(n),
            n.blockedOn === null && zn.shift();
        if (n = (e.ownerDocument || e).$$reactFormReplay,
        n != null)
            for (l = 0; l < n.length; l += 3) {
                var i = n[l]
                  , s = n[l + 1]
                  , h = i[at] || null;
                if (typeof s == "function")
                    h || Qh(n);
                else if (h) {
                    var y = null;
                    if (s && s.hasAttribute("formAction")) {
                        if (i = s,
                        h = s[at] || null)
                            y = h.formAction;
                        else if (Ir(i) !== null)
                            continue
                    } else
                        y = h.action;
                    typeof y == "function" ? n[l + 1] = y : (n.splice(l, 3),
                    l -= 3),
                    Qh(n)
                }
            }
    }
    function Xh() {
        function e(s) {
            s.canIntercept && s.info === "react-transition" && s.intercept({
                handler: function() {
                    return new Promise(function(h) {
                        return i = h
                    }
                    )
                },
                focusReset: "manual",
                scroll: "manual"
            })
        }
        function t() {
            i !== null && (i(),
            i = null),
            l || setTimeout(n, 20)
        }
        function n() {
            if (!l && !navigation.transition) {
                var s = navigation.currentEntry;
                s && s.url != null && navigation.navigate(s.url, {
                    state: s.getState(),
                    info: "react-transition",
                    history: "replace"
                })
            }
        }
        if (typeof navigation == "object") {
            var l = !1
              , i = null;
            return navigation.addEventListener("navigate", e),
            navigation.addEventListener("navigatesuccess", t),
            navigation.addEventListener("navigateerror", t),
            setTimeout(n, 100),
            function() {
                l = !0,
                navigation.removeEventListener("navigate", e),
                navigation.removeEventListener("navigatesuccess", t),
                navigation.removeEventListener("navigateerror", t),
                i !== null && (i(),
                i = null)
            }
        }
    }
    function to(e) {
        this._internalRoot = e
    }
    yu.prototype.render = to.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null)
            throw Error(o(409));
        var n = t.current
          , l = bt();
        Lh(n, l, e, t, null, null)
    }
    ,
    yu.prototype.unmount = to.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            Lh(e.current, 2, null, e, null, null),
            Wi(),
            t[nl] = null
        }
    }
    ;
    function yu(e) {
        this._internalRoot = e
    }
    yu.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = Io();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var n = 0; n < zn.length && t !== 0 && t < zn[n].priority; n++)
                ;
            zn.splice(n, 0, e),
            n === 0 && Yh(e)
        }
    }
    ;
    var Zh = a.version;
    if (Zh !== "19.2.4")
        throw Error(o(527, Zh, "19.2.4"));
    X.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0)
            throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","),
            Error(o(268, e)));
        return e = p(t),
        e = e !== null ? x(e) : null,
        e = e === null ? null : e.stateNode,
        e
    }
    ;
    var hy = {
        bundleType: 0,
        version: "19.2.4",
        rendererPackageName: "react-dom",
        currentDispatcherRef: L,
        reconcilerVersion: "19.2.4"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var vu = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vu.isDisabled && vu.supportsFiber)
            try {
                Kl = vu.inject(hy),
                dt = vu
            } catch {}
    }
    return Va.createRoot = function(e, t) {
        if (!c(e))
            throw Error(o(299));
        var n = !1
          , l = ""
          , i = Pf
          , s = If
          , h = ed;
        return t != null && (t.unstable_strictMode === !0 && (n = !0),
        t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
        t.onUncaughtError !== void 0 && (i = t.onUncaughtError),
        t.onCaughtError !== void 0 && (s = t.onCaughtError),
        t.onRecoverableError !== void 0 && (h = t.onRecoverableError)),
        t = Mh(e, 1, !1, null, null, n, l, null, i, s, h, Xh),
        e[nl] = t.current,
        Ur(e),
        new to(t)
    }
    ,
    Va.hydrateRoot = function(e, t, n) {
        if (!c(e))
            throw Error(o(299));
        var l = !1
          , i = ""
          , s = Pf
          , h = If
          , y = ed
          , _ = null;
        return n != null && (n.unstable_strictMode === !0 && (l = !0),
        n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
        n.onUncaughtError !== void 0 && (s = n.onUncaughtError),
        n.onCaughtError !== void 0 && (h = n.onCaughtError),
        n.onRecoverableError !== void 0 && (y = n.onRecoverableError),
        n.formState !== void 0 && (_ = n.formState)),
        t = Mh(e, 1, !0, t, n ?? null, l, i, _, s, h, y, Xh),
        t.context = zh(null),
        n = t.current,
        l = bt(),
        l = Zu(l),
        i = xn(l),
        i.callback = null,
        bn(n, i, l),
        n = l,
        t.current.lanes = n,
        Jl(t, n),
        qt(t),
        e[nl] = t.current,
        Ur(e),
        new yu(t)
    }
    ,
    Va.version = "19.2.4",
    Va
}
var $m;
function hx() {
    if ($m)
        return Eo.exports;
    $m = 1;
    function u() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
            try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(u)
            } catch (a) {
                console.error(a)
            }
    }
    return u(),
    Eo.exports = dx(),
    Eo.exports
}
var mx = hx();
var Fm = "popstate";
function gx(u={}) {
    function a(o, c) {
        let {pathname: f, search: d, hash: g} = o.location;
        return Mo("", {
            pathname: f,
            search: d,
            hash: g
        }, c.state && c.state.usr || null, c.state && c.state.key || "default")
    }
    function r(o, c) {
        return typeof c == "string" ? c : Fa(c)
    }
    return yx(a, r, null, u)
}
function Ze(u, a) {
    if (u === !1 || u === null || typeof u > "u")
        throw new Error(a)
}
function Vt(u, a) {
    if (!u) {
        typeof console < "u" && console.warn(a);
        try {
            throw new Error(a)
        } catch {}
    }
}
function px() {
    return Math.random().toString(36).substring(2, 10)
}
function Wm(u, a) {
    return {
        usr: u.state,
        key: u.key,
        idx: a
    }
}
function Mo(u, a, r=null, o) {
    return {
        pathname: typeof u == "string" ? u : u.pathname,
        search: "",
        hash: "",
        ...typeof a == "string" ? Pa(a) : a,
        state: r,
        key: a && a.key || o || px()
    }
}
function Fa({pathname: u="/", search: a="", hash: r=""}) {
    return a && a !== "?" && (u += a.charAt(0) === "?" ? a : "?" + a),
    r && r !== "#" && (u += r.charAt(0) === "#" ? r : "#" + r),
    u
}
function Pa(u) {
    let a = {};
    if (u) {
        let r = u.indexOf("#");
        r >= 0 && (a.hash = u.substring(r),
        u = u.substring(0, r));
        let o = u.indexOf("?");
        o >= 0 && (a.search = u.substring(o),
        u = u.substring(0, o)),
        u && (a.pathname = u)
    }
    return a
}
function yx(u, a, r, o={}) {
    let {window: c=document.defaultView, v5Compat: f=!1} = o
      , d = c.history
      , g = "POP"
      , m = null
      , p = x();
    p == null && (p = 0,
    d.replaceState({
        ...d.state,
        idx: p
    }, ""));
    function x() {
        return (d.state || {
            idx: null
        }).idx
    }
    function v() {
        g = "POP";
        let C = x()
          , M = C == null ? null : C - p;
        p = C,
        m && m({
            action: g,
            location: O.location,
            delta: M
        })
    }
    function S(C, M) {
        g = "PUSH";
        let U = Mo(O.location, C, M);
        p = x() + 1;
        let V = Wm(U, p)
          , J = O.createHref(U);
        try {
            d.pushState(V, "", J)
        } catch (W) {
            if (W instanceof DOMException && W.name === "DataCloneError")
                throw W;
            c.location.assign(J)
        }
        f && m && m({
            action: g,
            location: O.location,
            delta: 1
        })
    }
    function b(C, M) {
        g = "REPLACE";
        let U = Mo(O.location, C, M);
        p = x();
        let V = Wm(U, p)
          , J = O.createHref(U);
        d.replaceState(V, "", J),
        f && m && m({
            action: g,
            location: O.location,
            delta: 0
        })
    }
    function E(C) {
        return vx(C)
    }
    let O = {
        get action() {
            return g
        },
        get location() {
            return u(c, d)
        },
        listen(C) {
            if (m)
                throw new Error("A history only accepts one active listener");
            return c.addEventListener(Fm, v),
            m = C,
            () => {
                c.removeEventListener(Fm, v),
                m = null
            }
        },
        createHref(C) {
            return a(c, C)
        },
        createURL: E,
        encodeLocation(C) {
            let M = E(C);
            return {
                pathname: M.pathname,
                search: M.search,
                hash: M.hash
            }
        },
        push: S,
        replace: b,
        go(C) {
            return d.go(C)
        }
    };
    return O
}
function vx(u, a=!1) {
    let r = "http://localhost";
    typeof window < "u" && (r = window.location.origin !== "null" ? window.location.origin : window.location.href),
    Ze(r, "No window.location.(origin|href) available to create URL");
    let o = typeof u == "string" ? u : Fa(u);
    return o = o.replace(/ $/, "%20"),
    !a && o.startsWith("//") && (o = r + o),
    new URL(o,r)
}
function wg(u, a, r="/") {
    return xx(u, a, r, !1)
}
function xx(u, a, r, o) {
    let c = typeof a == "string" ? Pa(a) : a
      , f = on(c.pathname || "/", r);
    if (f == null)
        return null;
    let d = _g(u);
    bx(d);
    let g = null;
    for (let m = 0; g == null && m < d.length; ++m) {
        let p = jx(f);
        g = Nx(d[m], p, o)
    }
    return g
}
function _g(u, a=[], r=[], o="", c=!1) {
    let f = (d, g, m=c, p) => {
        let x = {
            relativePath: p === void 0 ? d.path || "" : p,
            caseSensitive: d.caseSensitive === !0,
            childrenIndex: g,
            route: d
        };
        if (x.relativePath.startsWith("/")) {
            if (!x.relativePath.startsWith(o) && m)
                return;
            Ze(x.relativePath.startsWith(o), `Absolute route path "${x.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),
            x.relativePath = x.relativePath.slice(o.length)
        }
        let v = rn([o, x.relativePath])
          , S = r.concat(x);
        d.children && d.children.length > 0 && (Ze(d.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${v}".`),
        _g(d.children, a, S, v, m)),
        !(d.path == null && !d.index) && a.push({
            path: v,
            score: Tx(v, d.index),
            routesMeta: S
        })
    }
    ;
    return u.forEach( (d, g) => {
        if (d.path === "" || !d.path?.includes("?"))
            f(d, g);
        else
            for (let m of Cg(d.path))
                f(d, g, !0, m)
    }
    ),
    a
}
function Cg(u) {
    let a = u.split("/");
    if (a.length === 0)
        return [];
    let[r,...o] = a
      , c = r.endsWith("?")
      , f = r.replace(/\?$/, "");
    if (o.length === 0)
        return c ? [f, ""] : [f];
    let d = Cg(o.join("/"))
      , g = [];
    return g.push(...d.map(m => m === "" ? f : [f, m].join("/"))),
    c && g.push(...d),
    g.map(m => u.startsWith("/") && m === "" ? "/" : m)
}
function bx(u) {
    u.sort( (a, r) => a.score !== r.score ? r.score - a.score : Ox(a.routesMeta.map(o => o.childrenIndex), r.routesMeta.map(o => o.childrenIndex)))
}
var Sx = /^:[\w-]+$/
  , Ex = 3
  , wx = 2
  , _x = 1
  , Cx = 10
  , Ax = -2
  , Pm = u => u === "*";
function Tx(u, a) {
    let r = u.split("/")
      , o = r.length;
    return r.some(Pm) && (o += Ax),
    a && (o += wx),
    r.filter(c => !Pm(c)).reduce( (c, f) => c + (Sx.test(f) ? Ex : f === "" ? _x : Cx), o)
}
function Ox(u, a) {
    return u.length === a.length && u.slice(0, -1).every( (o, c) => o === a[c]) ? u[u.length - 1] - a[a.length - 1] : 0
}
function Nx(u, a, r=!1) {
    let {routesMeta: o} = u
      , c = {}
      , f = "/"
      , d = [];
    for (let g = 0; g < o.length; ++g) {
        let m = o[g]
          , p = g === o.length - 1
          , x = f === "/" ? a : a.slice(f.length) || "/"
          , v = Du({
            path: m.relativePath,
            caseSensitive: m.caseSensitive,
            end: p
        }, x)
          , S = m.route;
        if (!v && p && r && !o[o.length - 1].route.index && (v = Du({
            path: m.relativePath,
            caseSensitive: m.caseSensitive,
            end: !1
        }, x)),
        !v)
            return null;
        Object.assign(c, v.params),
        d.push({
            params: c,
            pathname: rn([f, v.pathname]),
            pathnameBase: Lx(rn([f, v.pathnameBase])),
            route: S
        }),
        v.pathnameBase !== "/" && (f = rn([f, v.pathnameBase]))
    }
    return d
}
function Du(u, a) {
    typeof u == "string" && (u = {
        path: u,
        caseSensitive: !1,
        end: !0
    });
    let[r,o] = Rx(u.path, u.caseSensitive, u.end)
      , c = a.match(r);
    if (!c)
        return null;
    let f = c[0]
      , d = f.replace(/(.)\/+$/, "$1")
      , g = c.slice(1);
    return {
        params: o.reduce( (p, {paramName: x, isOptional: v}, S) => {
            if (x === "*") {
                let E = g[S] || "";
                d = f.slice(0, f.length - E.length).replace(/(.)\/+$/, "$1")
            }
            const b = g[S];
            return v && !b ? p[x] = void 0 : p[x] = (b || "").replace(/%2F/g, "/"),
            p
        }
        , {}),
        pathname: f,
        pathnameBase: d,
        pattern: u
    }
}
function Rx(u, a=!1, r=!0) {
    Vt(u === "*" || !u.endsWith("*") || u.endsWith("/*"), `Route path "${u}" will be treated as if it were "${u.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${u.replace(/\*$/, "/*")}".`);
    let o = []
      , c = "^" + u.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, g, m) => (o.push({
        paramName: g,
        isOptional: m != null
    }),
    m ? "/?([^\\/]+)?" : "/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
    return u.endsWith("*") ? (o.push({
        paramName: "*"
    }),
    c += u === "*" || u === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? c += "\\/*$" : u !== "" && u !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c,a ? void 0 : "i"), o]
}
function jx(u) {
    try {
        return u.split("/").map(a => decodeURIComponent(a).replace(/\//g, "%2F")).join("/")
    } catch (a) {
        return Vt(!1, `The URL path "${u}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${a}).`),
        u
    }
}
function on(u, a) {
    if (a === "/")
        return u;
    if (!u.toLowerCase().startsWith(a.toLowerCase()))
        return null;
    let r = a.endsWith("/") ? a.length - 1 : a.length
      , o = u.charAt(r);
    return o && o !== "/" ? null : u.slice(r) || "/"
}
var Dx = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function Mx(u, a="/") {
    let {pathname: r, search: o="", hash: c=""} = typeof u == "string" ? Pa(u) : u, f;
    return r ? (r = r.replace(/\/\/+/g, "/"),
    r.startsWith("/") ? f = Im(r.substring(1), "/") : f = Im(r, a)) : f = a,
    {
        pathname: f,
        search: Ux(o),
        hash: Bx(c)
    }
}
function Im(u, a) {
    let r = a.replace(/\/+$/, "").split("/");
    return u.split("/").forEach(c => {
        c === ".." ? r.length > 1 && r.pop() : c !== "." && r.push(c)
    }
    ),
    r.length > 1 ? r.join("/") : "/"
}
function Ao(u, a, r, o) {
    return `Cannot include a '${u}' character in a manually specified \`to.${a}\` field [${JSON.stringify(o)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function zx(u) {
    return u.filter( (a, r) => r === 0 || a.route.path && a.route.path.length > 0)
}
function Ag(u) {
    let a = zx(u);
    return a.map( (r, o) => o === a.length - 1 ? r.pathname : r.pathnameBase)
}
function Tg(u, a, r, o=!1) {
    let c;
    typeof u == "string" ? c = Pa(u) : (c = {
        ...u
    },
    Ze(!c.pathname || !c.pathname.includes("?"), Ao("?", "pathname", "search", c)),
    Ze(!c.pathname || !c.pathname.includes("#"), Ao("#", "pathname", "hash", c)),
    Ze(!c.search || !c.search.includes("#"), Ao("#", "search", "hash", c)));
    let f = u === "" || c.pathname === "", d = f ? "/" : c.pathname, g;
    if (d == null)
        g = r;
    else {
        let v = a.length - 1;
        if (!o && d.startsWith("..")) {
            let S = d.split("/");
            for (; S[0] === ".."; )
                S.shift(),
                v -= 1;
            c.pathname = S.join("/")
        }
        g = v >= 0 ? a[v] : "/"
    }
    let m = Mx(c, g)
      , p = d && d !== "/" && d.endsWith("/")
      , x = (f || d === ".") && r.endsWith("/");
    return !m.pathname.endsWith("/") && (p || x) && (m.pathname += "/"),
    m
}
var rn = u => u.join("/").replace(/\/\/+/g, "/")
  , Lx = u => u.replace(/\/+$/, "").replace(/^\/*/, "/")
  , Ux = u => !u || u === "?" ? "" : u.startsWith("?") ? u : "?" + u
  , Bx = u => !u || u === "#" ? "" : u.startsWith("#") ? u : "#" + u
  , Hx = class {
    constructor(u, a, r, o=!1) {
        this.status = u,
        this.statusText = a || "",
        this.internal = o,
        r instanceof Error ? (this.data = r.toString(),
        this.error = r) : this.data = r
    }
}
;
function qx(u) {
    return u != null && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.internal == "boolean" && "data"in u
}
function Gx(u) {
    return u.map(a => a.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/"
}
var Og = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
function Ng(u, a) {
    let r = u;
    if (typeof r != "string" || !Dx.test(r))
        return {
            absoluteURL: void 0,
            isExternal: !1,
            to: r
        };
    let o = r
      , c = !1;
    if (Og)
        try {
            let f = new URL(window.location.href)
              , d = r.startsWith("//") ? new URL(f.protocol + r) : new URL(r)
              , g = on(d.pathname, a);
            d.origin === f.origin && g != null ? r = g + d.search + d.hash : c = !0
        } catch {
            Vt(!1, `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
    return {
        absoluteURL: o,
        isExternal: c,
        to: r
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Rg = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Rg);
var Yx = ["GET", ...Rg];
new Set(Yx);
var Xl = H.createContext(null);
Xl.displayName = "DataRouter";
var Lu = H.createContext(null);
Lu.displayName = "DataRouterState";
var Vx = H.createContext(!1)
  , jg = H.createContext({
    isTransitioning: !1
});
jg.displayName = "ViewTransition";
var Qx = H.createContext(new Map);
Qx.displayName = "Fetchers";
var Xx = H.createContext(null);
Xx.displayName = "Await";
var jt = H.createContext(null);
jt.displayName = "Navigation";
var Uu = H.createContext(null);
Uu.displayName = "Location";
var cn = H.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
cn.displayName = "Route";
var Ho = H.createContext(null);
Ho.displayName = "RouteError";
var Dg = "REACT_ROUTER_ERROR"
  , Zx = "REDIRECT"
  , Kx = "ROUTE_ERROR_RESPONSE";
function kx(u) {
    if (u.startsWith(`${Dg}:${Zx}:{`))
        try {
            let a = JSON.parse(u.slice(28));
            if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string" && typeof a.location == "string" && typeof a.reloadDocument == "boolean" && typeof a.replace == "boolean")
                return a
        } catch {}
}
function Jx(u) {
    if (u.startsWith(`${Dg}:${Kx}:{`))
        try {
            let a = JSON.parse(u.slice(40));
            if (typeof a == "object" && a && typeof a.status == "number" && typeof a.statusText == "string")
                return new Hx(a.status,a.statusText,a.data)
        } catch {}
}
function $x(u, {relative: a}={}) {
    Ze(Ia(), "useHref() may be used only in the context of a <Router> component.");
    let {basename: r, navigator: o} = H.useContext(jt)
      , {hash: c, pathname: f, search: d} = ei(u, {
        relative: a
    })
      , g = f;
    return r !== "/" && (g = f === "/" ? r : rn([r, f])),
    o.createHref({
        pathname: g,
        search: d,
        hash: c
    })
}
function Ia() {
    return H.useContext(Uu) != null
}
function Un() {
    return Ze(Ia(), "useLocation() may be used only in the context of a <Router> component."),
    H.useContext(Uu).location
}
var Mg = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function zg(u) {
    H.useContext(jt).static || H.useLayoutEffect(u)
}
function Lg() {
    let {isDataRoute: u} = H.useContext(cn);
    return u ? r1() : Fx()
}
function Fx() {
    Ze(Ia(), "useNavigate() may be used only in the context of a <Router> component.");
    let u = H.useContext(Xl)
      , {basename: a, navigator: r} = H.useContext(jt)
      , {matches: o} = H.useContext(cn)
      , {pathname: c} = Un()
      , f = JSON.stringify(Ag(o))
      , d = H.useRef(!1);
    return zg( () => {
        d.current = !0
    }
    ),
    H.useCallback( (m, p={}) => {
        if (Vt(d.current, Mg),
        !d.current)
            return;
        if (typeof m == "number") {
            r.go(m);
            return
        }
        let x = Tg(m, JSON.parse(f), c, p.relative === "path");
        u == null && a !== "/" && (x.pathname = x.pathname === "/" ? a : rn([a, x.pathname])),
        (p.replace ? r.replace : r.push)(x, p.state, p)
    }
    , [a, r, f, c, u])
}
H.createContext(null);
function ei(u, {relative: a}={}) {
    let {matches: r} = H.useContext(cn)
      , {pathname: o} = Un()
      , c = JSON.stringify(Ag(r));
    return H.useMemo( () => Tg(u, JSON.parse(c), o, a === "path"), [u, c, o, a])
}
function Wx(u, a) {
    return Ug(u)
}
function Ug(u, a, r, o, c) {
    Ze(Ia(), "useRoutes() may be used only in the context of a <Router> component.");
    let {navigator: f} = H.useContext(jt)
      , {matches: d} = H.useContext(cn)
      , g = d[d.length - 1]
      , m = g ? g.params : {}
      , p = g ? g.pathname : "/"
      , x = g ? g.pathnameBase : "/"
      , v = g && g.route;
    {
        let U = v && v.path || "";
        Hg(p, !v || U.endsWith("*") || U.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${U}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${U}"> to <Route path="${U === "/" ? "*" : `${U}/*`}">.`)
    }
    let S = Un(), b;
    b = S;
    let E = b.pathname || "/"
      , O = E;
    if (x !== "/") {
        let U = x.replace(/^\//, "").split("/");
        O = "/" + E.replace(/^\//, "").split("/").slice(U.length).join("/")
    }
    let C = wg(u, {
        pathname: O
    });
    return Vt(v || C != null, `No routes matched location "${b.pathname}${b.search}${b.hash}" `),
    Vt(C == null || C[C.length - 1].route.element !== void 0 || C[C.length - 1].route.Component !== void 0 || C[C.length - 1].route.lazy !== void 0, `Matched leaf route at location "${b.pathname}${b.search}${b.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),
    n1(C && C.map(U => Object.assign({}, U, {
        params: Object.assign({}, m, U.params),
        pathname: rn([x, f.encodeLocation ? f.encodeLocation(U.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : U.pathname]),
        pathnameBase: U.pathnameBase === "/" ? x : rn([x, f.encodeLocation ? f.encodeLocation(U.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : U.pathnameBase])
    })), d, r, o, c)
}
function Px() {
    let u = s1()
      , a = qx(u) ? `${u.status} ${u.statusText}` : u instanceof Error ? u.message : JSON.stringify(u)
      , r = u instanceof Error ? u.stack : null
      , o = "rgba(200,200,200, 0.5)"
      , c = {
        padding: "0.5rem",
        backgroundColor: o
    }
      , f = {
        padding: "2px 4px",
        backgroundColor: o
    }
      , d = null;
    return console.error("Error handled by React Router default ErrorBoundary:", u),
    d = H.createElement(H.Fragment, null, H.createElement("p", null, "💿 Hey developer 👋"), H.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", H.createElement("code", {
        style: f
    }, "ErrorBoundary"), " or", " ", H.createElement("code", {
        style: f
    }, "errorElement"), " prop on your route.")),
    H.createElement(H.Fragment, null, H.createElement("h2", null, "Unexpected Application Error!"), H.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, a), r ? H.createElement("pre", {
        style: c
    }, r) : null, d)
}
var Ix = H.createElement(Px, null)
  , Bg = class extends H.Component {
    constructor(u) {
        super(u),
        this.state = {
            location: u.location,
            revalidation: u.revalidation,
            error: u.error
        }
    }
    static getDerivedStateFromError(u) {
        return {
            error: u
        }
    }
    static getDerivedStateFromProps(u, a) {
        return a.location !== u.location || a.revalidation !== "idle" && u.revalidation === "idle" ? {
            error: u.error,
            location: u.location,
            revalidation: u.revalidation
        } : {
            error: u.error !== void 0 ? u.error : a.error,
            location: a.location,
            revalidation: u.revalidation || a.revalidation
        }
    }
    componentDidCatch(u, a) {
        this.props.onError ? this.props.onError(u, a) : console.error("React Router caught the following error during render", u)
    }
    render() {
        let u = this.state.error;
        if (this.context && typeof u == "object" && u && "digest"in u && typeof u.digest == "string") {
            const r = Jx(u.digest);
            r && (u = r)
        }
        let a = u !== void 0 ? H.createElement(cn.Provider, {
            value: this.props.routeContext
        }, H.createElement(Ho.Provider, {
            value: u,
            children: this.props.component
        })) : this.props.children;
        return this.context ? H.createElement(e1, {
            error: u
        }, a) : a
    }
}
;
Bg.contextType = Vx;
var To = new WeakMap;
function e1({children: u, error: a}) {
    let {basename: r} = H.useContext(jt);
    if (typeof a == "object" && a && "digest"in a && typeof a.digest == "string") {
        let o = kx(a.digest);
        if (o) {
            let c = To.get(a);
            if (c)
                throw c;
            let f = Ng(o.location, r);
            if (Og && !To.get(a))
                if (f.isExternal || o.reloadDocument)
                    window.location.href = f.absoluteURL || f.to;
                else {
                    const d = Promise.resolve().then( () => window.__reactRouterDataRouter.navigate(f.to, {
                        replace: o.replace
                    }));
                    throw To.set(a, d),
                    d
                }
            return H.createElement("meta", {
                httpEquiv: "refresh",
                content: `0;url=${f.absoluteURL || f.to}`
            })
        }
    }
    return u
}
function t1({routeContext: u, match: a, children: r}) {
    let o = H.useContext(Xl);
    return o && o.static && o.staticContext && (a.route.errorElement || a.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = a.route.id),
    H.createElement(cn.Provider, {
        value: u
    }, r)
}
function n1(u, a=[], r=null, o=null, c=null) {
    if (u == null) {
        if (!r)
            return null;
        if (r.errors)
            u = r.matches;
        else if (a.length === 0 && !r.initialized && r.matches.length > 0)
            u = r.matches;
        else
            return null
    }
    let f = u
      , d = r?.errors;
    if (d != null) {
        let x = f.findIndex(v => v.route.id && d?.[v.route.id] !== void 0);
        Ze(x >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`),
        f = f.slice(0, Math.min(f.length, x + 1))
    }
    let g = !1
      , m = -1;
    if (r)
        for (let x = 0; x < f.length; x++) {
            let v = f[x];
            if ((v.route.HydrateFallback || v.route.hydrateFallbackElement) && (m = x),
            v.route.id) {
                let {loaderData: S, errors: b} = r
                  , E = v.route.loader && !S.hasOwnProperty(v.route.id) && (!b || b[v.route.id] === void 0);
                if (v.route.lazy || E) {
                    g = !0,
                    m >= 0 ? f = f.slice(0, m + 1) : f = [f[0]];
                    break
                }
            }
        }
    let p = r && o ? (x, v) => {
        o(x, {
            location: r.location,
            params: r.matches?.[0]?.params ?? {},
            unstable_pattern: Gx(r.matches),
            errorInfo: v
        })
    }
    : void 0;
    return f.reduceRight( (x, v, S) => {
        let b, E = !1, O = null, C = null;
        r && (b = d && v.route.id ? d[v.route.id] : void 0,
        O = v.route.errorElement || Ix,
        g && (m < 0 && S === 0 ? (Hg("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"),
        E = !0,
        C = null) : m === S && (E = !0,
        C = v.route.hydrateFallbackElement || null)));
        let M = a.concat(f.slice(0, S + 1))
          , U = () => {
            let V;
            return b ? V = O : E ? V = C : v.route.Component ? V = H.createElement(v.route.Component, null) : v.route.element ? V = v.route.element : V = x,
            H.createElement(t1, {
                match: v,
                routeContext: {
                    outlet: x,
                    matches: M,
                    isDataRoute: r != null
                },
                children: V
            })
        }
        ;
        return r && (v.route.ErrorBoundary || v.route.errorElement || S === 0) ? H.createElement(Bg, {
            location: r.location,
            revalidation: r.revalidation,
            component: O,
            error: b,
            children: U(),
            routeContext: {
                outlet: null,
                matches: M,
                isDataRoute: !0
            },
            onError: p
        }) : U()
    }
    , null)
}
function qo(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function l1(u) {
    let a = H.useContext(Xl);
    return Ze(a, qo(u)),
    a
}
function a1(u) {
    let a = H.useContext(Lu);
    return Ze(a, qo(u)),
    a
}
function i1(u) {
    let a = H.useContext(cn);
    return Ze(a, qo(u)),
    a
}
function Go(u) {
    let a = i1(u)
      , r = a.matches[a.matches.length - 1];
    return Ze(r.route.id, `${u} can only be used on routes that contain a unique "id"`),
    r.route.id
}
function u1() {
    return Go("useRouteId")
}
function s1() {
    let u = H.useContext(Ho)
      , a = a1("useRouteError")
      , r = Go("useRouteError");
    return u !== void 0 ? u : a.errors?.[r]
}
function r1() {
    let {router: u} = l1("useNavigate")
      , a = Go("useNavigate")
      , r = H.useRef(!1);
    return zg( () => {
        r.current = !0
    }
    ),
    H.useCallback(async (c, f={}) => {
        Vt(r.current, Mg),
        r.current && (typeof c == "number" ? await u.navigate(c) : await u.navigate(c, {
            fromRouteId: a,
            ...f
        }))
    }
    , [u, a])
}
var eg = {};
function Hg(u, a, r) {
    !a && !eg[u] && (eg[u] = !0,
    Vt(!1, r))
}
H.memo(o1);
function o1({routes: u, future: a, state: r, onError: o}) {
    return Ug(u, void 0, r, o, a)
}
function c1({basename: u="/", children: a=null, location: r, navigationType: o="POP", navigator: c, static: f=!1, unstable_useTransitions: d}) {
    Ze(!Ia(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let g = u.replace(/^\/*/, "/")
      , m = H.useMemo( () => ({
        basename: g,
        navigator: c,
        static: f,
        unstable_useTransitions: d,
        future: {}
    }), [g, c, f, d]);
    typeof r == "string" && (r = Pa(r));
    let {pathname: p="/", search: x="", hash: v="", state: S=null, key: b="default"} = r
      , E = H.useMemo( () => {
        let O = on(p, g);
        return O == null ? null : {
            location: {
                pathname: O,
                search: x,
                hash: v,
                state: S,
                key: b
            },
            navigationType: o
        }
    }
    , [g, p, x, v, S, b, o]);
    return Vt(E != null, `<Router basename="${g}"> is not able to match the URL "${p}${x}${v}" because it does not start with the basename, so the <Router> won't render anything.`),
    E == null ? null : H.createElement(jt.Provider, {
        value: m
    }, H.createElement(Uu.Provider, {
        children: a,
        value: E
    }))
}
var Au = "get"
  , Tu = "application/x-www-form-urlencoded";
function Bu(u) {
    return typeof HTMLElement < "u" && u instanceof HTMLElement
}
function f1(u) {
    return Bu(u) && u.tagName.toLowerCase() === "button"
}
function d1(u) {
    return Bu(u) && u.tagName.toLowerCase() === "form"
}
function h1(u) {
    return Bu(u) && u.tagName.toLowerCase() === "input"
}
function m1(u) {
    return !!(u.metaKey || u.altKey || u.ctrlKey || u.shiftKey)
}
function g1(u, a) {
    return u.button === 0 && (!a || a === "_self") && !m1(u)
}
var Cu = null;
function p1() {
    if (Cu === null)
        try {
            new FormData(document.createElement("form"),0),
            Cu = !1
        } catch {
            Cu = !0
        }
    return Cu
}
var y1 = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Oo(u) {
    return u != null && !y1.has(u) ? (Vt(!1, `"${u}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Tu}"`),
    null) : u
}
function v1(u, a) {
    let r, o, c, f, d;
    if (d1(u)) {
        let g = u.getAttribute("action");
        o = g ? on(g, a) : null,
        r = u.getAttribute("method") || Au,
        c = Oo(u.getAttribute("enctype")) || Tu,
        f = new FormData(u)
    } else if (f1(u) || h1(u) && (u.type === "submit" || u.type === "image")) {
        let g = u.form;
        if (g == null)
            throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let m = u.getAttribute("formaction") || g.getAttribute("action");
        if (o = m ? on(m, a) : null,
        r = u.getAttribute("formmethod") || g.getAttribute("method") || Au,
        c = Oo(u.getAttribute("formenctype")) || Oo(g.getAttribute("enctype")) || Tu,
        f = new FormData(g,u),
        !p1()) {
            let {name: p, type: x, value: v} = u;
            if (x === "image") {
                let S = p ? `${p}.` : "";
                f.append(`${S}x`, "0"),
                f.append(`${S}y`, "0")
            } else
                p && f.append(p, v)
        }
    } else {
        if (Bu(u))
            throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        r = Au,
        o = null,
        c = Tu,
        d = u
    }
    return f && c === "text/plain" && (d = f,
    f = void 0),
    {
        action: o,
        method: r.toLowerCase(),
        encType: c,
        formData: f,
        body: d
    }
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Yo(u, a) {
    if (u === !1 || u === null || typeof u > "u")
        throw new Error(a)
}
function x1(u, a, r, o) {
    let c = typeof u == "string" ? new URL(u,typeof window > "u" ? "server://singlefetch/" : window.location.origin) : u;
    return r ? c.pathname.endsWith("/") ? c.pathname = `${c.pathname}_.${o}` : c.pathname = `${c.pathname}.${o}` : c.pathname === "/" ? c.pathname = `_root.${o}` : a && on(c.pathname, a) === "/" ? c.pathname = `${a.replace(/\/$/, "")}/_root.${o}` : c.pathname = `${c.pathname.replace(/\/$/, "")}.${o}`,
    c
}
async function b1(u, a) {
    if (u.id in a)
        return a[u.id];
    try {
        let r = await import(u.module);
        return a[u.id] = r,
        r
    } catch (r) {
        return console.error(`Error loading route module \`${u.module}\`, reloading page...`),
        console.error(r),
        window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
        window.location.reload(),
        new Promise( () => {}
        )
    }
}
function S1(u) {
    return u == null ? !1 : u.href == null ? u.rel === "preload" && typeof u.imageSrcSet == "string" && typeof u.imageSizes == "string" : typeof u.rel == "string" && typeof u.href == "string"
}
async function E1(u, a, r) {
    let o = await Promise.all(u.map(async c => {
        let f = a.routes[c.route.id];
        if (f) {
            let d = await b1(f, r);
            return d.links ? d.links() : []
        }
        return []
    }
    ));
    return A1(o.flat(1).filter(S1).filter(c => c.rel === "stylesheet" || c.rel === "preload").map(c => c.rel === "stylesheet" ? {
        ...c,
        rel: "prefetch",
        as: "style"
    } : {
        ...c,
        rel: "prefetch"
    }))
}
function tg(u, a, r, o, c, f) {
    let d = (m, p) => r[p] ? m.route.id !== r[p].route.id : !0
      , g = (m, p) => r[p].pathname !== m.pathname || r[p].route.path?.endsWith("*") && r[p].params["*"] !== m.params["*"];
    return f === "assets" ? a.filter( (m, p) => d(m, p) || g(m, p)) : f === "data" ? a.filter( (m, p) => {
        let x = o.routes[m.route.id];
        if (!x || !x.hasLoader)
            return !1;
        if (d(m, p) || g(m, p))
            return !0;
        if (m.route.shouldRevalidate) {
            let v = m.route.shouldRevalidate({
                currentUrl: new URL(c.pathname + c.search + c.hash,window.origin),
                currentParams: r[0]?.params || {},
                nextUrl: new URL(u,window.origin),
                nextParams: m.params,
                defaultShouldRevalidate: !0
            });
            if (typeof v == "boolean")
                return v
        }
        return !0
    }
    ) : []
}
function w1(u, a, {includeHydrateFallback: r}={}) {
    return _1(u.map(o => {
        let c = a.routes[o.route.id];
        if (!c)
            return [];
        let f = [c.module];
        return c.clientActionModule && (f = f.concat(c.clientActionModule)),
        c.clientLoaderModule && (f = f.concat(c.clientLoaderModule)),
        r && c.hydrateFallbackModule && (f = f.concat(c.hydrateFallbackModule)),
        c.imports && (f = f.concat(c.imports)),
        f
    }
    ).flat(1))
}
function _1(u) {
    return [...new Set(u)]
}
function C1(u) {
    let a = {}
      , r = Object.keys(u).sort();
    for (let o of r)
        a[o] = u[o];
    return a
}
function A1(u, a) {
    let r = new Set;
    return new Set(a),
    u.reduce( (o, c) => {
        let f = JSON.stringify(C1(c));
        return r.has(f) || (r.add(f),
        o.push({
            key: f,
            link: c
        })),
        o
    }
    , [])
}
function qg() {
    let u = H.useContext(Xl);
    return Yo(u, "You must render this element inside a <DataRouterContext.Provider> element"),
    u
}
function T1() {
    let u = H.useContext(Lu);
    return Yo(u, "You must render this element inside a <DataRouterStateContext.Provider> element"),
    u
}
var Vo = H.createContext(void 0);
Vo.displayName = "FrameworkContext";
function Gg() {
    let u = H.useContext(Vo);
    return Yo(u, "You must render this element inside a <HydratedRouter> element"),
    u
}
function O1(u, a) {
    let r = H.useContext(Vo)
      , [o,c] = H.useState(!1)
      , [f,d] = H.useState(!1)
      , {onFocus: g, onBlur: m, onMouseEnter: p, onMouseLeave: x, onTouchStart: v} = a
      , S = H.useRef(null);
    H.useEffect( () => {
        if (u === "render" && d(!0),
        u === "viewport") {
            let O = M => {
                M.forEach(U => {
                    d(U.isIntersecting)
                }
                )
            }
              , C = new IntersectionObserver(O,{
                threshold: .5
            });
            return S.current && C.observe(S.current),
            () => {
                C.disconnect()
            }
        }
    }
    , [u]),
    H.useEffect( () => {
        if (o) {
            let O = setTimeout( () => {
                d(!0)
            }
            , 100);
            return () => {
                clearTimeout(O)
            }
        }
    }
    , [o]);
    let b = () => {
        c(!0)
    }
      , E = () => {
        c(!1),
        d(!1)
    }
    ;
    return r ? u !== "intent" ? [f, S, {}] : [f, S, {
        onFocus: Qa(g, b),
        onBlur: Qa(m, E),
        onMouseEnter: Qa(p, b),
        onMouseLeave: Qa(x, E),
        onTouchStart: Qa(v, b)
    }] : [!1, S, {}]
}
function Qa(u, a) {
    return r => {
        u && u(r),
        r.defaultPrevented || a(r)
    }
}
function N1({page: u, ...a}) {
    let {router: r} = qg()
      , o = H.useMemo( () => wg(r.routes, u, r.basename), [r.routes, u, r.basename]);
    return o ? H.createElement(j1, {
        page: u,
        matches: o,
        ...a
    }) : null
}
function R1(u) {
    let {manifest: a, routeModules: r} = Gg()
      , [o,c] = H.useState([]);
    return H.useEffect( () => {
        let f = !1;
        return E1(u, a, r).then(d => {
            f || c(d)
        }
        ),
        () => {
            f = !0
        }
    }
    , [u, a, r]),
    o
}
function j1({page: u, matches: a, ...r}) {
    let o = Un()
      , {future: c, manifest: f, routeModules: d} = Gg()
      , {basename: g} = qg()
      , {loaderData: m, matches: p} = T1()
      , x = H.useMemo( () => tg(u, a, p, f, o, "data"), [u, a, p, f, o])
      , v = H.useMemo( () => tg(u, a, p, f, o, "assets"), [u, a, p, f, o])
      , S = H.useMemo( () => {
        if (u === o.pathname + o.search + o.hash)
            return [];
        let O = new Set
          , C = !1;
        if (a.forEach(U => {
            let V = f.routes[U.route.id];
            !V || !V.hasLoader || (!x.some(J => J.route.id === U.route.id) && U.route.id in m && d[U.route.id]?.shouldRevalidate || V.hasClientLoader ? C = !0 : O.add(U.route.id))
        }
        ),
        O.size === 0)
            return [];
        let M = x1(u, g, c.unstable_trailingSlashAwareDataRequests, "data");
        return C && O.size > 0 && M.searchParams.set("_routes", a.filter(U => O.has(U.route.id)).map(U => U.route.id).join(",")),
        [M.pathname + M.search]
    }
    , [g, c.unstable_trailingSlashAwareDataRequests, m, o, f, x, a, u, d])
      , b = H.useMemo( () => w1(v, f), [v, f])
      , E = R1(v);
    return H.createElement(H.Fragment, null, S.map(O => H.createElement("link", {
        key: O,
        rel: "prefetch",
        as: "fetch",
        href: O,
        ...r
    })), b.map(O => H.createElement("link", {
        key: O,
        rel: "modulepreload",
        href: O,
        ...r
    })), E.map( ({key: O, link: C}) => H.createElement("link", {
        key: O,
        nonce: r.nonce,
        ...C,
        crossOrigin: C.crossOrigin ?? r.crossOrigin
    })))
}
function D1(...u) {
    return a => {
        u.forEach(r => {
            typeof r == "function" ? r(a) : r != null && (r.current = a)
        }
        )
    }
}
var M1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    M1 && (window.__reactRouterVersion = "7.13.0")
} catch {}
function z1({basename: u, children: a, unstable_useTransitions: r, window: o}) {
    let c = H.useRef();
    c.current == null && (c.current = gx({
        window: o,
        v5Compat: !0
    }));
    let f = c.current
      , [d,g] = H.useState({
        action: f.action,
        location: f.location
    })
      , m = H.useCallback(p => {
        r === !1 ? g(p) : H.startTransition( () => g(p))
    }
    , [r]);
    return H.useLayoutEffect( () => f.listen(m), [f, m]),
    H.createElement(c1, {
        basename: u,
        children: a,
        location: d.location,
        navigationType: d.action,
        navigator: f,
        unstable_useTransitions: r
    })
}
var Yg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Qo = H.forwardRef(function({onClick: a, discover: r="render", prefetch: o="none", relative: c, reloadDocument: f, replace: d, state: g, target: m, to: p, preventScrollReset: x, viewTransition: v, unstable_defaultShouldRevalidate: S, ...b}, E) {
    let {basename: O, unstable_useTransitions: C} = H.useContext(jt)
      , M = typeof p == "string" && Yg.test(p)
      , U = Ng(p, O);
    p = U.to;
    let V = $x(p, {
        relative: c
    })
      , [J,W,oe] = O1(o, b)
      , P = H1(p, {
        replace: d,
        state: g,
        target: m,
        preventScrollReset: x,
        relative: c,
        viewTransition: v,
        unstable_defaultShouldRevalidate: S,
        unstable_useTransitions: C
    });
    function pe(Q) {
        a && a(Q),
        Q.defaultPrevented || P(Q)
    }
    let Ee = H.createElement("a", {
        ...b,
        ...oe,
        href: U.absoluteURL || V,
        onClick: U.isExternal || f ? a : pe,
        ref: D1(E, W),
        target: m,
        "data-discover": !M && r === "render" ? "true" : void 0
    });
    return J && !M ? H.createElement(H.Fragment, null, Ee, H.createElement(N1, {
        page: V
    })) : Ee
});
Qo.displayName = "Link";
var L1 = H.forwardRef(function({"aria-current": a="page", caseSensitive: r=!1, className: o="", end: c=!1, style: f, to: d, viewTransition: g, children: m, ...p}, x) {
    let v = ei(d, {
        relative: p.relative
    })
      , S = Un()
      , b = H.useContext(Lu)
      , {navigator: E, basename: O} = H.useContext(jt)
      , C = b != null && Q1(v) && g === !0
      , M = E.encodeLocation ? E.encodeLocation(v).pathname : v.pathname
      , U = S.pathname
      , V = b && b.navigation && b.navigation.location ? b.navigation.location.pathname : null;
    r || (U = U.toLowerCase(),
    V = V ? V.toLowerCase() : null,
    M = M.toLowerCase()),
    V && O && (V = on(V, O) || V);
    const J = M !== "/" && M.endsWith("/") ? M.length - 1 : M.length;
    let W = U === M || !c && U.startsWith(M) && U.charAt(J) === "/", oe = V != null && (V === M || !c && V.startsWith(M) && V.charAt(M.length) === "/"), P = {
        isActive: W,
        isPending: oe,
        isTransitioning: C
    }, pe = W ? a : void 0, Ee;
    typeof o == "function" ? Ee = o(P) : Ee = [o, W ? "active" : null, oe ? "pending" : null, C ? "transitioning" : null].filter(Boolean).join(" ");
    let Q = typeof f == "function" ? f(P) : f;
    return H.createElement(Qo, {
        ...p,
        "aria-current": pe,
        className: Ee,
        ref: x,
        style: Q,
        to: d,
        viewTransition: g
    }, typeof m == "function" ? m(P) : m)
});
L1.displayName = "NavLink";
var U1 = H.forwardRef( ({discover: u="render", fetcherKey: a, navigate: r, reloadDocument: o, replace: c, state: f, method: d=Au, action: g, onSubmit: m, relative: p, preventScrollReset: x, viewTransition: v, unstable_defaultShouldRevalidate: S, ...b}, E) => {
    let {unstable_useTransitions: O} = H.useContext(jt)
      , C = Y1()
      , M = V1(g, {
        relative: p
    })
      , U = d.toLowerCase() === "get" ? "get" : "post"
      , V = typeof g == "string" && Yg.test(g)
      , J = W => {
        if (m && m(W),
        W.defaultPrevented)
            return;
        W.preventDefault();
        let oe = W.nativeEvent.submitter
          , P = oe?.getAttribute("formmethod") || d
          , pe = () => C(oe || W.currentTarget, {
            fetcherKey: a,
            method: P,
            navigate: r,
            replace: c,
            state: f,
            relative: p,
            preventScrollReset: x,
            viewTransition: v,
            unstable_defaultShouldRevalidate: S
        });
        O && r !== !1 ? H.startTransition( () => pe()) : pe()
    }
    ;
    return H.createElement("form", {
        ref: E,
        method: U,
        action: M,
        onSubmit: o ? m : J,
        ...b,
        "data-discover": !V && u === "render" ? "true" : void 0
    })
}
);
U1.displayName = "Form";
function B1(u) {
    return `${u} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function Vg(u) {
    let a = H.useContext(Xl);
    return Ze(a, B1(u)),
    a
}
function H1(u, {target: a, replace: r, state: o, preventScrollReset: c, relative: f, viewTransition: d, unstable_defaultShouldRevalidate: g, unstable_useTransitions: m}={}) {
    let p = Lg()
      , x = Un()
      , v = ei(u, {
        relative: f
    });
    return H.useCallback(S => {
        if (g1(S, a)) {
            S.preventDefault();
            let b = r !== void 0 ? r : Fa(x) === Fa(v)
              , E = () => p(u, {
                replace: b,
                state: o,
                preventScrollReset: c,
                relative: f,
                viewTransition: d,
                unstable_defaultShouldRevalidate: g
            });
            m ? H.startTransition( () => E()) : E()
        }
    }
    , [x, p, v, r, o, a, u, c, f, d, g, m])
}
var q1 = 0
  , G1 = () => `__${String(++q1)}__`;
function Y1() {
    let {router: u} = Vg("useSubmit")
      , {basename: a} = H.useContext(jt)
      , r = u1()
      , o = u.fetch
      , c = u.navigate;
    return H.useCallback(async (f, d={}) => {
        let {action: g, method: m, encType: p, formData: x, body: v} = v1(f, a);
        if (d.navigate === !1) {
            let S = d.fetcherKey || G1();
            await o(S, r, d.action || g, {
                unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
                preventScrollReset: d.preventScrollReset,
                formData: x,
                body: v,
                formMethod: d.method || m,
                formEncType: d.encType || p,
                flushSync: d.flushSync
            })
        } else
            await c(d.action || g, {
                unstable_defaultShouldRevalidate: d.unstable_defaultShouldRevalidate,
                preventScrollReset: d.preventScrollReset,
                formData: x,
                body: v,
                formMethod: d.method || m,
                formEncType: d.encType || p,
                replace: d.replace,
                state: d.state,
                fromRouteId: r,
                flushSync: d.flushSync,
                viewTransition: d.viewTransition
            })
    }
    , [o, c, a, r])
}
function V1(u, {relative: a}={}) {
    let {basename: r} = H.useContext(jt)
      , o = H.useContext(cn);
    Ze(o, "useFormAction must be used inside a RouteContext");
    let[c] = o.matches.slice(-1)
      , f = {
        ...ei(u || ".", {
            relative: a
        })
    }
      , d = Un();
    if (u == null) {
        f.search = d.search;
        let g = new URLSearchParams(f.search)
          , m = g.getAll("index");
        if (m.some(x => x === "")) {
            g.delete("index"),
            m.filter(v => v).forEach(v => g.append("index", v));
            let x = g.toString();
            f.search = x ? `?${x}` : ""
        }
    }
    return (!u || u === ".") && c.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (f.pathname = f.pathname === "/" ? r : rn([r, f.pathname])),
    Fa(f)
}
function Q1(u, {relative: a}={}) {
    let r = H.useContext(jg);
    Ze(r != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {basename: o} = Vg("useViewTransitionState")
      , c = ei(u, {
        relative: a
    });
    if (!r.isTransitioning)
        return !1;
    let f = on(r.currentLocation.pathname, o) || r.currentLocation.pathname
      , d = on(r.nextLocation.pathname, o) || r.nextLocation.pathname;
    return Du(c.pathname, d) != null || Du(c.pathname, f) != null
}
function X1() {
    const u = Un();
    return w.jsxs("div", {
        className: "relative flex flex-col items-center justify-center h-screen text-center px-4",
        children: [w.jsx("h1", {
            className: "absolute bottom-0 text-9xl md:text-[12rem] font-black text-gray-50 select-none pointer-events-none z-0",
            children: "404"
        }), w.jsxs("div", {
            className: "relative z-10",
            children: [w.jsx("h1", {
                className: "text-xl md:text-2xl font-semibold mt-6",
                children: "This page has not been generated"
            }), w.jsx("p", {
                className: "mt-2 text-base text-gray-400 font-mono",
                children: u.pathname
            }), w.jsx("p", {
                className: "mt-4 text-lg md:text-xl text-gray-500",
                children: "Tell me more about this page, so I can generate it"
            })]
        })]
    })
}
function Z1() {
    const [u,a] = H.useState(!1)
      , [r,o] = H.useState(0);
    H.useEffect( () => {
        const m = () => {
            a(window.scrollY > 50)
        }
        ;
        return window.addEventListener("scroll", m),
        () => window.removeEventListener("scroll", m)
    }
    , []);
    // const c = [{
    //     quote: "These vitamins have transformed my energy levels",
    //     text: "After just three weeks, I noticed a significant improvement in my daily energy and overall wellbeing. The quality is exceptional.",
    //     name: "Sarah Mitchell",
    //     role: "Wellness Advocate",
    //     avatar: "https://readdy.ai/api/search-image?query=professional%20woman%20with%20warm%20smile%20natural%20light%20soft%20features%20wellness%20lifestyle%20warm%20tones%20simple%20background%20portrait%20photography%20authentic%20genuine%20expression%20healthy%20glowing%20skin%20natural%20beauty%20calm%20serene%20atmosphere&width=120&height=120&seq=testimonial1&orientation=squarish"
    // }, {
    //     quote: "Finally, supplements I can trust completely",
    //     text: "As someone who's tried countless brands, Dana's approach to women's health is refreshingly honest and science-backed. I feel the difference.",
    //     name: "Emma Thompson",
    //     role: "Health Coach",
    //     avatar: "https://readdy.ai/api/search-image?query=confident%20woman%20natural%20smile%20warm%20lighting%20professional%20portrait%20wellness%20expert%20authentic%20expression%20glowing%20skin%20simple%20neutral%20background%20natural%20beauty%20serene%20calm%20atmosphere&width=120&height=120&seq=testimonial2&orientation=squarish"
    // }, {
    //     quote: "A holistic approach that actually works",
    //     text: "The combination of quality vitamins and educational resources has helped me understand my body better. This is more than just supplements.",
    //     name: "Jessica Chen",
    //     role: "Yoga Instructor",
    //     avatar: "https://readdy.ai/api/search-image?query=peaceful%20woman%20gentle%20smile%20natural%20daylight%20wellness%20professional%20authentic%20portrait%20healthy%20radiant%20skin%20simple%20background%20natural%20beauty%20calm%20serene%20expression%20warm%20tones&width=120&height=120&seq=testimonial3&orientation=squarish"
    // }]
    //   , f = [{
    //     name: "Women's Daily Essentials",
    //     benefit: "Complete daily nutrition support",
    //     ingredient: "B-Complex + Iron",
    //     price: "$48",
    //     image: "https://readdy.ai/api/search-image?query=elegant%20vitamin%20supplement%20bottle%20on%20warm%20sand%20beige%20background%20natural%20light%20soft%20shadows%20minimal%20clean%20product%20photography%20earth%20tones%20cream%20packaging%20botanical%20elements%20simple%20composition%20premium%20wellness%20product&width=400&height=520&seq=product1&orientation=portrait"
    // }, {
    //     name: "Hormone Balance",
    //     benefit: "Support for natural hormone health",
    //     ingredient: "Vitex + Magnesium",
    //     price: "$52",
    //     image: "https://readdy.ai/api/search-image?query=premium%20supplement%20bottle%20warm%20sand%20background%20natural%20sunlight%20soft%20shadow%20minimal%20product%20shot%20earth%20tone%20packaging%20botanical%20accents%20clean%20simple%20wellness%20photography%20cream%20beige%20tones&width=400&height=520&seq=product2&orientation=portrait"
    // }, {
    //     name: "Energy & Vitality",
    //     benefit: "Natural energy throughout your day",
    //     ingredient: "CoQ10 + Adaptogens",
    //     price: "$55",
    //     image: "https://readdy.ai/api/search-image?query=elegant%20wellness%20supplement%20bottle%20on%20warm%20beige%20sand%20surface%20natural%20daylight%20soft%20shadows%20minimal%20clean%20photography%20earth%20tones%20cream%20packaging%20botanical%20details%20simple%20premium%20product%20shot&width=400&height=520&seq=product3&orientation=portrait"
    // }, {
    //     name: "Gut Health Support",
    //     benefit: "Digestive wellness and balance",
    //     ingredient: "Probiotics + Prebiotics",
    //     price: "$49",
    //     image: "https://readdy.ai/api/search-image?query=sophisticated%20vitamin%20bottle%20warm%20sand%20beige%20background%20natural%20light%20soft%20shadow%20minimal%20product%20photography%20earth%20tone%20packaging%20botanical%20elements%20clean%20simple%20wellness%20product%20cream%20tones&width=400&height=520&seq=product4&orientation=portrait"
    // }]
    //   , d = [{
    //     name: "Pelvic Floor Strength",
    //     duration: "8 Weeks",
    //     level: "All Levels",
    //     image: "https://readdy.ai/api/search-image?query=woman%20practicing%20wellness%20exercise%20on%20natural%20linen%20mat%20in%20bright%20airy%20room%20with%20wooden%20floor%20plants%20warm%20natural%20light%20calm%20peaceful%20atmosphere%20earth%20tones%20minimal%20setting%20wellness%20lifestyle%20photography&width=400&height=600&seq=program1&orientation=portrait"
    // }, {
    //     name: "Postnatal Recovery",
    //     duration: "12 Weeks",
    //     level: "Beginner",
    //     image: "https://readdy.ai/api/search-image?query=woman%20in%20comfortable%20movement%20practice%20natural%20home%20setting%20wooden%20floor%20soft%20textiles%20plants%20warm%20daylight%20peaceful%20wellness%20atmosphere%20earth%20tones%20minimal%20calm%20lifestyle%20photography&width=400&height=600&seq=program2&orientation=portrait"
    // }, {
    //     name: "Core & Strength",
    //     duration: "10 Weeks",
    //     level: "Intermediate",
    //     image: "https://readdy.ai/api/search-image?query=woman%20doing%20gentle%20strength%20training%20in%20natural%20light%20filled%20space%20with%20plants%20wooden%20elements%20linen%20textures%20warm%20calm%20atmosphere%20earth%20tones%20wellness%20lifestyle%20minimal%20setting&width=400&height=600&seq=program3&orientation=portrait"
    // }]
    //   , g = [{
    //     title: "Understanding Hormone Health Through Your Cycle",
    //     excerpt: "Learn how to support your body's natural rhythms with nutrition and lifestyle adjustments tailored to each phase.",
    //     category: "Hormone Health",
    //     readTime: "8 min read",
    //     image: "https://readdy.ai/api/search-image?query=woman%20journaling%20with%20herbal%20tea%20on%20wooden%20table%20natural%20light%20plants%20linen%20textures%20warm%20calm%20atmosphere%20wellness%20lifestyle%20earth%20tones%20minimal%20peaceful%20setting%20botanical%20elements&width=400&height=500&seq=blog1&orientation=portrait"
    // }, {
    //     title: "Pelvic Floor Health: What Every Woman Should Know",
    //     excerpt: "Essential information about pelvic floor function, common issues, and evidence-based approaches to strengthening and recovery.",
    //     category: "Pelvic Health",
    //     readTime: "10 min read",
    //     image: "https://readdy.ai/api/search-image?query=wellness%20flatlay%20with%20notebook%20herbal%20supplements%20plants%20on%20linen%20fabric%20natural%20light%20warm%20earth%20tones%20minimal%20composition%20botanical%20elements%20calm%20peaceful%20aesthetic&width=400&height=500&seq=blog2&orientation=portrait"
    // }, {
    //     title: "Natural Energy: Beyond Caffeine",
    //     excerpt: "Discover sustainable ways to boost your energy levels through nutrition, movement, and stress management techniques.",
    //     category: "Energy & Vitality",
    //     readTime: "6 min read",
    //     image: "https://readdy.ai/api/search-image?query=morning%20wellness%20scene%20with%20supplements%20water%20plants%20on%20wooden%20surface%20natural%20sunlight%20warm%20earth%20tones%20minimal%20calm%20atmosphere%20botanical%20elements%20peaceful%20lifestyle&width=400&height=500&seq=blog3&orientation=portrait"
    // }];
    return w.jsxs("div", {
        className: "min-h-screen bg-[#FEFDFB]",
        children: [w.jsx("nav", {
            className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${u ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`,
            children: w.jsx("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: w.jsxs("div", {
                    className: "flex items-center justify-between h-20",
                    children: [w.jsx(Qo, {
                        to: "/",
                        className: "font-serif text-2xl text-[#3D3935]",
                        children: "Dana Landgren"
                    }), w.jsxs("div", {
                        className: "hidden md:flex items-center gap-10",
                        children: [w.jsx("a", {
                            href: "#vitamins",
                            className: "text-[#3D3935] hover:text-[#7A9B8E] transition-colors text-sm tracking-wide cursor-pointer",
                            children: "Shop"
                        }), w.jsx("a", {
                            href: "#programs",
                            className: "text-[#3D3935] hover:text-[#7A9B8E] transition-colors text-sm tracking-wide cursor-pointer",
                            children: "Programs"
                        }), w.jsx("a", {
                            href: "#about",
                            className: "text-[#3D3935] hover:text-[#7A9B8E] transition-colors text-sm tracking-wide cursor-pointer",
                            children: "About"
                        }), w.jsx("a", {
                            href: "#journal",
                            className: "text-[#3D3935] hover:text-[#7A9B8E] transition-colors text-sm tracking-wide cursor-pointer",
                            children: "Journal"
                        })]
                    }), w.jsxs("div", {
                        className: "flex items-center gap-4",
                        children: [w.jsx("button", {
                            className: "w-10 h-10 flex items-center justify-center cursor-pointer",
                            "aria-label": "Shopping cart",
                            children: w.jsx("i", {
                                className: "ri-shopping-bag-line text-xl text-[#3D3935]"
                            })
                        }), w.jsx("button", {
                            className: "w-10 h-10 flex items-center justify-center cursor-pointer",
                            "aria-label": "User account",
                            children: w.jsx("i", {
                                className: "ri-user-line text-xl text-[#3D3935]"
                            })
                        })]
                    })]
                })
            })
        }), w.jsxs("section", {
            className: "relative min-h-screen flex items-center",
            children: [w.jsxs("div", {
                className: "absolute inset-0",
                children: [w.jsx("img", {
                    src: "https://readdy.ai/api/search-image?query=serene%20woman%20in%20natural%20morning%20light%20holding%20ceramic%20mug%20wearing%20soft%20linen%20clothing%20in%20minimal%20room%20with%20warm%20sand%20eucalyptus%20tones%20wooden%20elements%20plants%20calm%20peaceful%20atmosphere%20wellness%20lifestyle%20natural%20beauty%20soft%20textures&width=1920&height=1080&seq=hero1&orientation=landscape",
                    alt: "Woman in natural wellness setting",
                    className: "w-full h-full object-cover object-top"
                }), w.jsx("div", {
                    className: "absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/5"
                })]
            }), w.jsx("div", {
                className: "relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32",
                children: w.jsxs("div", {
                    className: "max-w-2xl ml-auto bg-[#FAF7F2]/95 backdrop-blur-sm p-12 lg:p-16 rounded-lg",
                    children: [w.jsx("p", {
                        className: "text-[#3D3935] text-xs tracking-[0.2em] uppercase mb-6",
                        children: "Women's Health Authority"
                    }), w.jsxs("h1", {
                        className: "font-serif text-5xl lg:text-7xl text-[#3D3935] leading-tight mb-8",
                        children: ["Supporting Women's", w.jsx("br", {}), "Health, Naturally."]
                    }), w.jsx("p", {
                        className: "text-[#7A9B8E] text-lg mb-12 leading-relaxed",
                        children: "Science-informed wellness for every season of life."
                    }), w.jsxs("div", {
                        className: "flex flex-wrap gap-4",
                        children: [w.jsxs("a", {
                            href: "#vitamins",
                            className: "inline-flex items-center gap-2 bg-[#D4B5A0] text-[#3D3935] px-8 py-4 rounded-full hover:bg-[#C9A890] transition-all whitespace-nowrap cursor-pointer",
                            children: [w.jsx("span", {
                                className: "font-medium",
                                children: "Shop the Vitamin Range"
                            }), w.jsx("i", {
                                className: "ri-arrow-right-line"
                            })]
                        }), w.jsx("a", {
                            href: "#programs",
                            className: "inline-flex items-center gap-2 border-2 border-[#7A9B8E] text-[#7A9B8E] px-8 py-4 rounded-full hover:bg-[#7A9B8E] hover:text-white transition-all whitespace-nowrap cursor-pointer",
                            children: w.jsx("span", {
                                className: "font-medium",
                                children: "Explore Programs"
                            })
                        })]
                    })]
                })
            })]
        }), w.jsx("section", {
            id: "vitamins",
            className: "py-24 lg:py-32 bg-white",
            children: w.jsxs("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: [w.jsxs("div", {
                    className: "text-center mb-16",
                    children: [w.jsxs("div", {
                        className: "flex items-center justify-center gap-3 mb-4",
                        children: [w.jsx("div", {
                            className: "w-8 h-px bg-[#7A9B8E]"
                        }), w.jsx("i", {
                            className: "ri-leaf-line text-[#7A9B8E] text-xl"
                        }), w.jsx("div", {
                            className: "w-8 h-px bg-[#7A9B8E]"
                        })]
                    }), w.jsx("h2", {
                        className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-4",
                        children: "The Vitamin Collection"
                    }), w.jsx("p", {
                        className: "text-[#6B6662] text-lg max-w-2xl mx-auto",
                        children: "Science-informed formulas for every season of life"
                    })]
                }), w.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
                    children: f.map( (m, p) => w.jsxs("div", {
                        className: "group bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden cursor-pointer",
                        children: [w.jsxs("div", {
                            className: "relative aspect-[4/5] bg-[#E8DDD0] overflow-hidden",
                            children: [w.jsx("img", {
                                src: m.image,
                                alt: m.name,
                                className: "w-full h-full object-cover object-top"
                            }), w.jsx("div", {
                                className: "absolute top-4 right-4 bg-[#C9A5A5] text-white text-xs px-3 py-2 rounded-full",
                                children: m.ingredient
                            })]
                        }), w.jsxs("div", {
                            className: "p-6",
                            children: [w.jsx("h3", {
                                className: "font-serif text-xl text-[#3D3935] mb-2",
                                children: m.name
                            }), w.jsx("p", {
                                className: "text-[#7A9B8E] text-sm mb-3",
                                children: m.benefit
                            }), w.jsx("p", {
                                className: "text-xs text-[#6B6662] tracking-wider uppercase mb-4",
                                children: m.ingredient
                            }), w.jsxs("div", {
                                className: "flex items-center justify-between",
                                children: [w.jsx("span", {
                                    className: "font-bold text-lg text-[#3D3935]",
                                    children: m.price
                                }), w.jsxs("a", {
                                    href: "#",
                                    className: "text-[#7A9B8E] text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap",
                                    children: ["Learn More ", w.jsx("i", {
                                        className: "ri-arrow-right-line"
                                    })]
                                })]
                            })]
                        })]
                    }, p))
                })]
            })
        }), w.jsx("section", {
            id: "about",
            className: "bg-[#FAF7F2]",
            children: w.jsx("div", {
                className: "max-w-7xl mx-auto",
                children: w.jsxs("div", {
                    className: "grid grid-cols-1 lg:grid-cols-5 gap-0",
                    children: [w.jsxs("div", {
                        className: "lg:col-span-2 bg-[#F5EFE7] p-12 lg:p-16 flex flex-col items-center justify-center",
                        children: [w.jsx("div", {
                            className: "w-72 h-72 rounded-full overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.08)] mb-8",
                            children: w.jsx("img", {
                                src: "https://readdy.ai/api/search-image?query=professional%20woman%20wellness%20expert%20natural%20portrait%20warm%20lighting%20confident%20calm%20expression%20wearing%20neutral%20linen%20clothing%20simple%20background%20earth%20tones%20authentic%20genuine%20smile%20health%20authority&width=600&height=600&seq=dana1&orientation=squarish",
                                alt: "Dana Landgren",
                                className: "w-full h-full object-cover object-top"
                            })
                        }), w.jsxs("div", {
                            className: "space-y-6 text-center",
                            children: [w.jsxs("div", {
                                className: "flex items-center justify-center gap-3",
                                children: [w.jsx("div", {
                                    className: "w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7A9B8E]",
                                    children: w.jsx("i", {
                                        className: "ri-heart-pulse-line text-xl text-[#7A9B8E]"
                                    })
                                }), w.jsx("span", {
                                    className: "text-sm text-[#6B6662]",
                                    children: "Women's Health Specialist"
                                })]
                            }), w.jsxs("div", {
                                className: "flex items-center justify-center gap-3",
                                children: [w.jsx("div", {
                                    className: "w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7A9B8E]",
                                    children: w.jsx("i", {
                                        className: "ri-microscope-line text-xl text-[#7A9B8E]"
                                    })
                                }), w.jsx("span", {
                                    className: "text-sm text-[#6B6662]",
                                    children: "Science-Backed Approach"
                                })]
                            }), w.jsxs("div", {
                                className: "flex items-center justify-center gap-3",
                                children: [w.jsx("div", {
                                    className: "w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#7A9B8E]",
                                    children: w.jsx("i", {
                                        className: "ri-book-open-line text-xl text-[#7A9B8E]"
                                    })
                                }), w.jsx("span", {
                                    className: "text-sm text-[#6B6662]",
                                    children: "Certified Educator"
                                })]
                            })]
                        })]
                    }), w.jsxs("div", {
                        className: "lg:col-span-3 bg-white p-12 lg:p-20 relative",
                        children: [w.jsx("div", {
                            className: "absolute top-8 right-8 opacity-5",
                            children: w.jsx("i", {
                                className: "ri-leaf-line text-9xl text-[#7A9B8E]"
                            })
                        }), w.jsx("p", {
                            className: "text-[#3D3935] text-xs tracking-[0.2em] uppercase mb-4",
                            children: "Rooted in Knowledge"
                        }), w.jsxs("h2", {
                            className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-8 leading-tight",
                            children: ["Backed by Experience", w.jsx("br", {}), "& Education"]
                        }), w.jsxs("div", {
                            className: "space-y-8 text-[#6B6662] leading-relaxed",
                            children: [w.jsx("p", {
                                children: "For over a decade, I've dedicated my career to understanding the unique complexities of women's health. My journey began with a deep curiosity about how our bodies change through different life stages, and how we can support these transitions naturally."
                            }), w.jsx("p", {
                                children: "Through years of working with women from all walks of life, I've witnessed the transformative power of combining evidence-based nutrition with mindful movement. This isn't about quick fixes or trendy solutions—it's about sustainable wellness that honors your body's wisdom."
                            }), w.jsx("p", {
                                className: "italic text-[#C9A5A5] text-xl pl-8 border-l-2 border-[#C9A5A5]",
                                children: '"True wellness comes from understanding your body, not fighting against it."'
                            }), w.jsx("p", {
                                children: "The vitamin range I've developed represents years of research, testing, and refinement. Each formula is designed to address the specific nutritional needs that women face, from hormone balance to energy support, with ingredients I trust completely."
                            })]
                        }), w.jsx("div", {
                            className: "mt-12",
                            children: w.jsx("img", {
                                src: "https://readdy.ai/api/search-image?query=elegant%20handwritten%20signature%20dana%20landgren%20in%20charcoal%20brown%20ink%20on%20cream%20paper%20minimal%20sophisticated%20calligraphy%20natural%20authentic%20style&width=300&height=100&seq=signature1&orientation=landscape",
                                alt: "Dana Landgren Signature",
                                className: "h-16 opacity-60"
                            })
                        })]
                    })]
                })
            })
        }), w.jsx("section", {
            className: "py-24 lg:py-32 bg-gradient-to-b from-[#FAF7F2] to-[#EBE8DC]",
            children: w.jsxs("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: [w.jsxs("div", {
                    className: "text-center mb-16",
                    children: [w.jsxs("p", {
                        className: "text-[#6B6662] text-sm mb-2 flex items-center justify-center gap-2",
                        children: [w.jsx("span", {
                            className: "w-1 h-1 rounded-full bg-[#7A9B8E]"
                        }), w.jsx("span", {
                            className: "tracking-wider uppercase",
                            children: "Real Stories"
                        }), w.jsx("span", {
                            className: "w-1 h-1 rounded-full bg-[#7A9B8E]"
                        })]
                    }), w.jsx("h2", {
                        className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-4",
                        children: "Trusted by Women Like You"
                    }), w.jsx("p", {
                        className: "text-[#6B6662] text-lg",
                        children: "Hear from our community"
                    })]
                }), w.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8",
                    children: c.map( (m, p) => w.jsxs("div", {
                        className: "bg-white rounded-3xl p-10 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300",
                        children: [w.jsx("div", {
                            className: "flex gap-2 mb-6",
                            children: [...Array(5)].map( (x, v) => w.jsx("i", {
                                className: "ri-star-fill text-[#C9A5A5] text-lg"
                            }, v))
                        }), w.jsx("h3", {
                            className: "font-serif text-xl text-[#3D3935] mb-4 leading-snug",
                            children: m.quote
                        }), w.jsx("p", {
                            className: "text-[#6B6662] leading-relaxed mb-8",
                            children: m.text
                        }), w.jsxs("div", {
                            className: "flex items-center gap-4 pt-6 border-t border-[#E8DDD0]",
                            children: [w.jsx("img", {
                                src: m.avatar,
                                alt: m.name,
                                className: "w-14 h-14 rounded-full object-cover"
                            }), w.jsxs("div", {
                                children: [w.jsx("p", {
                                    className: "font-semibold text-[#3D3935]",
                                    children: m.name
                                }), w.jsx("p", {
                                    className: "text-sm text-[#7A9B8E]",
                                    children: m.role
                                })]
                            })]
                        })]
                    }, p))
                }), w.jsx("div", {
                    className: "flex justify-center gap-3",
                    children: c.map( (m, p) => w.jsx("button", {
                        onClick: () => o(p),
                        className: `w-2 h-2 rounded-full transition-all cursor-pointer ${r === p ? "bg-[#7A9B8E] w-8" : "bg-[#D4D1CC]"}`,
                        "aria-label": `View testimonial ${p + 1}`
                    }, p))
                })]
            })
        }), w.jsx("section", {
            id: "programs",
            className: "py-24 lg:py-32 bg-[#E8E5DC]",
            children: w.jsxs("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: [w.jsxs("div", {
                    className: "flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12",
                    children: [w.jsxs("div", {
                        children: [w.jsx("p", {
                            className: "text-[#3D3935] text-xs tracking-[0.2em] uppercase mb-3",
                            children: "Strength & Movement"
                        }), w.jsxs("h2", {
                            className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-4",
                            children: ["Programs That Support", w.jsx("br", {}), "Your Journey"]
                        }), w.jsx("p", {
                            className: "text-[#6B6662] text-lg",
                            children: "Thoughtfully designed movement for every stage"
                        })]
                    }), w.jsxs("a", {
                        href: "#",
                        className: "text-[#7A9B8E] flex items-center gap-2 hover:gap-3 transition-all mt-6 lg:mt-0 whitespace-nowrap cursor-pointer",
                        children: [w.jsx("span", {
                            className: "font-medium",
                            children: "View All Programs"
                        }), w.jsx("i", {
                            className: "ri-arrow-right-line"
                        })]
                    })]
                }), w.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                    children: d.map( (m, p) => w.jsxs("div", {
                        className: "group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300",
                        children: [w.jsx("img", {
                            src: m.image,
                            alt: m.name,
                            className: "w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        }), w.jsx("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-[#3D3935]/80 via-[#3D3935]/20 to-transparent group-hover:from-[#3D3935]/90 transition-all duration-300"
                        }), w.jsx("div", {
                            className: "absolute top-4 right-4",
                            children: w.jsx("div", {
                                className: "w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full",
                                children: w.jsx("i", {
                                    className: "ri-heart-pulse-line text-white text-lg"
                                })
                            })
                        }), w.jsxs("div", {
                            className: "absolute bottom-0 left-0 right-0 p-8 text-white",
                            children: [w.jsx("h3", {
                                className: "font-serif text-3xl mb-3",
                                children: m.name
                            }), w.jsxs("p", {
                                className: "text-sm opacity-90",
                                children: [m.duration, " • ", m.level]
                            })]
                        })]
                    }, p))
                })]
            })
        }), w.jsx("section", {
            id: "journal",
            className: "py-24 lg:py-32 bg-white",
            children: w.jsxs("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: [w.jsxs("div", {
                    className: "text-center mb-16",
                    children: [w.jsxs("div", {
                        className: "flex items-center justify-center gap-3 mb-4",
                        children: [w.jsx("div", {
                            className: "w-12 h-px bg-[#7A9B8E]"
                        }), w.jsx("i", {
                            className: "ri-quill-pen-line text-[#7A9B8E] text-xl"
                        }), w.jsx("div", {
                            className: "w-12 h-px bg-[#7A9B8E]"
                        })]
                    }), w.jsx("h2", {
                        className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-4",
                        children: "The Wellness Journal"
                    }), w.jsx("p", {
                        className: "text-[#6B6662] text-lg",
                        children: "Evidence-based insights for your health journey"
                    })]
                }), w.jsx("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-24",
                    children: g.map( (m, p) => w.jsxs("div", {
                        className: "group bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer",
                        children: [w.jsxs("div", {
                            className: "relative aspect-[4/5] overflow-hidden",
                            children: [w.jsx("img", {
                                src: m.image,
                                alt: m.title,
                                className: "w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            }), w.jsx("div", {
                                className: "absolute top-4 left-4",
                                children: w.jsx("span", {
                                    className: "bg-[#FAF7F2] text-[#3D3935] text-xs px-4 py-2 rounded-full",
                                    children: m.category
                                })
                            })]
                        }), w.jsxs("div", {
                            className: "p-8",
                            children: [w.jsx("h3", {
                                className: "font-serif text-xl text-[#3D3935] mb-3 leading-snug line-clamp-2",
                                children: m.title
                            }), w.jsx("p", {
                                className: "text-[#6B6662] text-sm leading-relaxed mb-4 line-clamp-3",
                                children: m.excerpt
                            }), w.jsx("div", {
                                className: "flex items-center justify-between text-xs text-[#7A9B8E] mb-4",
                                children: w.jsx("span", {
                                    children: m.readTime
                                })
                            }), w.jsxs("a", {
                                href: "#",
                                className: "text-[#7A9B8E] text-sm flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap",
                                children: ["Read Article ", w.jsx("i", {
                                    className: "ri-arrow-right-line"
                                })]
                            })]
                        })]
                    }, p))
                }), w.jsxs("div", {
                    className: "relative bg-[#D4B5A0] rounded-3xl p-12 lg:p-20 overflow-hidden",
                    children: [w.jsx("div", {
                        className: "absolute top-0 right-0 opacity-10",
                        children: w.jsx("i", {
                            className: "ri-leaf-line text-[20rem] text-[#3D3935]"
                        })
                    }), w.jsxs("div", {
                        className: "relative z-10 max-w-xl mx-auto text-center",
                        children: [w.jsx("p", {
                            className: "text-[#3D3935] text-xs tracking-[0.2em] uppercase mb-3",
                            children: "Join the Community"
                        }), w.jsxs("h2", {
                            className: "font-serif text-4xl lg:text-5xl text-[#3D3935] mb-4",
                            children: ["The Women's Wellness", w.jsx("br", {}), "Journal"]
                        }), w.jsx("p", {
                            className: "text-[#6B6662] text-lg mb-10",
                            children: "Weekly insights, recipes, and wellness tips delivered to your inbox"
                        }), w.jsxs("form", {
                            className: "space-y-6",
                            onSubmit: m => m.preventDefault(),
                            children: [w.jsxs("div", {
                                className: "text-left",
                                children: [w.jsx("label", {
                                    htmlFor: "email",
                                    className: "block text-sm text-[#3D3935] mb-2",
                                    children: "Your email address"
                                }), w.jsx("input", {
                                    type: "email",
                                    id: "email",
                                    placeholder: "hello@example.com",
                                    className: "w-full bg-transparent border-b-2 border-[#3D3935] px-4 py-4 text-[#3D3935] placeholder-[#6B6662]/50 focus:outline-none focus:border-[#7A9B8E] transition-colors"
                                })]
                            }), w.jsxs("button", {
                                type: "submit",
                                className: "bg-[#3D3935] text-white px-10 py-4 rounded-full hover:bg-[#2D2925] transition-all flex items-center gap-2 mx-auto whitespace-nowrap cursor-pointer",
                                children: [w.jsx("span", {
                                    className: "font-medium",
                                    children: "Subscribe"
                                }), w.jsx("i", {
                                    className: "ri-arrow-right-line"
                                })]
                            }), w.jsx("p", {
                                className: "text-xs text-[#6B6662]",
                                children: "We respect your privacy. Unsubscribe anytime."
                            })]
                        })]
                    })]
                })]
            })
        }), w.jsx("footer", {
            className: "bg-[#FAF7F2] pt-20 pb-8",
            children: w.jsxs("div", {
                className: "max-w-7xl mx-auto px-6 lg:px-8",
                children: [w.jsxs("div", {
                    className: "grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12",
                    children: [w.jsxs("div", {
                        className: "lg:col-span-2",
                        children: [w.jsx("h3", {
                            className: "font-serif text-2xl text-[#3D3935] mb-4",
                            children: "Dana Landgren"
                        }), w.jsx("p", {
                            className: "font-serif text-lg text-[#6B6662] mb-6 leading-relaxed",
                            children: "Supporting women's health through science-backed nutrition and mindful movement."
                        }), w.jsx("p", {
                            className: "text-[#6B6662] text-sm leading-relaxed mb-8",
                            children: "Every woman deserves to feel empowered in her body. Through evidence-based supplements and thoughtful education, we're here to support your wellness journey at every stage."
                        }), w.jsxs("div", {
                            children: [w.jsx("p", {
                                className: "text-sm font-medium text-[#3D3935] mb-3",
                                children: "Stay Connected"
                            }), w.jsxs("form", {
                                className: "flex gap-2",
                                onSubmit: m => m.preventDefault(),
                                children: [w.jsx("input", {
                                    type: "email",
                                    placeholder: "Your email",
                                    className: "flex-1 bg-white border border-[#E8DDD0] px-4 py-3 rounded-full text-sm focus:outline-none focus:border-[#7A9B8E] transition-colors"
                                }), w.jsx("button", {
                                    type: "submit",
                                    className: "bg-[#3D3935] text-white px-6 py-3 rounded-full hover:bg-[#2D2925] transition-all whitespace-nowrap cursor-pointer",
                                    children: w.jsx("i", {
                                        className: "ri-arrow-right-line"
                                    })
                                })]
                            })]
                        })]
                    }), w.jsxs("div", {
                        children: [w.jsx("h4", {
                            className: "text-sm font-bold text-[#3D3935] uppercase tracking-wider mb-6",
                            children: "Shop"
                        }), w.jsxs("ul", {
                            className: "space-y-3",
                            children: [w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "All Products"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Daily Essentials"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Hormone Support"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Energy & Vitality"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Gut Health"
                                })
                            })]
                        })]
                    }), w.jsxs("div", {
                        children: [w.jsx("h4", {
                            className: "text-sm font-bold text-[#3D3935] uppercase tracking-wider mb-6",
                            children: "Learn"
                        }), w.jsxs("ul", {
                            className: "space-y-3",
                            children: [w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Wellness Journal"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Hormone Health"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Pelvic Floor"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Nutrition Guide"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Movement Programs"
                                })
                            })]
                        })]
                    }), w.jsxs("div", {
                        children: [w.jsx("h4", {
                            className: "text-sm font-bold text-[#3D3935] uppercase tracking-wider mb-6",
                            children: "Connect"
                        }), w.jsxs("ul", {
                            className: "space-y-3",
                            children: [w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "About Dana"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Contact"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "FAQ"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Wholesale"
                                })
                            }), w.jsx("li", {
                                children: w.jsx("a", {
                                    href: "#",
                                    className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors text-sm cursor-pointer",
                                    children: "Press"
                                })
                            })]
                        })]
                    })]
                }), w.jsx("div", {
                    className: "border-t border-[#E8DDD0] pt-8",
                    children: w.jsxs("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-6",
                        children: [w.jsx("p", {
                            className: "text-xs text-[#6B6662]",
                            children: "© 2025 Dana Landgren. All rights reserved."
                        }), w.jsxs("div", {
                            className: "flex items-center gap-6",
                            children: [w.jsx("a", {
                                href: "https://www.instagram.com",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "w-6 h-6 flex items-center justify-center text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                                children: w.jsx("i", {
                                    className: "ri-instagram-line text-xl"
                                })
                            }), w.jsx("a", {
                                href: "https://www.facebook.com",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "w-6 h-6 flex items-center justify-center text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                                children: w.jsx("i", {
                                    className: "ri-facebook-line text-xl"
                                })
                            }), w.jsx("a", {
                                href: "https://www.pinterest.com",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                className: "w-6 h-6 flex items-center justify-center text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                                children: w.jsx("i", {
                                    className: "ri-pinterest-line text-xl"
                                })
                            })]
                        }), w.jsxs("div", {
                            className: "flex items-center gap-6 text-xs",
                            children: [w.jsx("a", {
                                href: "#",
                                className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                                children: "Privacy Policy"
                            }), w.jsx("a", {
                                href: "#",
                                className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                                children: "Terms of Service"
                            // }), w.jsx("a", {
                            //     href: "https://readdy.ai/?ref=logo",
                            //     target: "_blank",
                            //     rel: "noopener noreferrer",
                            //     className: "text-[#6B6662] hover:text-[#7A9B8E] transition-colors cursor-pointer",
                            //     children: "Website Builder"
                            // })]
                        })]
                    })
                })]
            })
        })]
    })
}
const Qg = [{
    path: "/",
    element: w.jsx(Z1, {})
}, {
    path: "*",
    element: w.jsx(X1, {})
}]
  , K1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Qg
}, Symbol.toStringTag, {
    value: "Module"
}));
let Xg;
const k1 = new Promise(u => {
    Xg = u
}
);
function Zg() {
    const u = Wx(Qg)
      , a = Lg();
    return H.useEffect( () => {
        window.REACT_APP_NAVIGATE = a,
        Xg(window.REACT_APP_NAVIGATE)
    }
    ),
    u
}
const J1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    AppRoutes: Zg,
    navigatePromise: k1
}, Symbol.toStringTag, {
    value: "Module"
}));
function $1() {
    return w.jsx(Kv, {
        i18n: et,
        children: w.jsx(z1, {
            basename: "/preview/d7177cda-ec58-4f2d-84ad-73be4cf0779d/6502543",
            children: w.jsx(Zg, {})
        })
    })
}
mx.createRoot(document.getElementById("root")).render(w.jsx(H.StrictMode, {
    children: w.jsx($1, {})
}));
//# sourceMappingURL=index-BFnMJnSP.js.map
