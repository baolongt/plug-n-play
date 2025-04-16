import { g as T } from "./index-zaUFwp_d.js";
var c, S;
function F() {
  if (S) return c;
  S = 1;
  function r(n) {
    if (n.length >= 255)
      throw new TypeError("Alphabet too long");
    for (var p = new Uint8Array(256), u = 0; u < p.length; u++)
      p[u] = 255;
    for (var b = 0; b < n.length; b++) {
      var m = n.charAt(b), E = m.charCodeAt(0);
      if (p[E] !== 255)
        throw new TypeError(m + " is ambiguous");
      p[E] = b;
    }
    var y = n.length, x = n.charAt(0), M = Math.log(y) / Math.log(256), V = Math.log(256) / Math.log(y);
    function q(e) {
      if (e instanceof Uint8Array || (ArrayBuffer.isView(e) ? e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : Array.isArray(e) && (e = Uint8Array.from(e))), !(e instanceof Uint8Array))
        throw new TypeError("Expected Uint8Array");
      if (e.length === 0)
        return "";
      for (var o = 0, g = 0, v = 0, h = e.length; v !== h && e[v] === 0; )
        v++, o++;
      for (var d = (h - v) * V + 1 >>> 0, f = new Uint8Array(d); v !== h; ) {
        for (var a = e[v], w = 0, l = d - 1; (a !== 0 || w < g) && l !== -1; l--, w++)
          a += 256 * f[l] >>> 0, f[l] = a % y >>> 0, a = a / y >>> 0;
        if (a !== 0)
          throw new Error("Non-zero carry");
        g = w, v++;
      }
      for (var i = d - g; i !== d && f[i] === 0; )
        i++;
      for (var U = x.repeat(o); i < d; ++i)
        U += n.charAt(f[i]);
      return U;
    }
    function R(e) {
      if (typeof e != "string")
        throw new TypeError("Expected String");
      if (e.length === 0)
        return new Uint8Array();
      for (var o = 0, g = 0, v = 0; e[o] === x; )
        g++, o++;
      for (var h = (e.length - o) * M + 1 >>> 0, d = new Uint8Array(h); e[o]; ) {
        var f = e.charCodeAt(o);
        if (f > 255)
          return;
        var a = p[f];
        if (a === 255)
          return;
        for (var w = 0, l = h - 1; (a !== 0 || w < v) && l !== -1; l--, w++)
          a += y * d[l] >>> 0, d[l] = a % 256 >>> 0, a = a / 256 >>> 0;
        if (a !== 0)
          throw new Error("Non-zero carry");
        v = w, o++;
      }
      for (var i = h - v; i !== h && d[i] === 0; )
        i++;
      for (var U = new Uint8Array(g + (h - i)), I = g; i !== h; )
        U[I++] = d[i++];
      return U;
    }
    function C(e) {
      var o = R(e);
      if (o)
        return o;
      throw new Error("Non-base" + y + " character");
    }
    return {
      encode: q,
      decodeUnsafe: R,
      decode: C
    };
  }
  return c = r, c;
}
var A, z;
function N() {
  return z || (z = 1, A = F()("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")), A;
}
var B = N();
const K = /* @__PURE__ */ T(B);
let s;
const O = new Uint8Array(16);
function j() {
  if (!s && (s = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !s))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return s(O);
}
const t = [];
for (let r = 0; r < 256; ++r)
  t.push((r + 256).toString(16).slice(1));
function k(r, n = 0) {
  return t[r[n + 0]] + t[r[n + 1]] + t[r[n + 2]] + t[r[n + 3]] + "-" + t[r[n + 4]] + t[r[n + 5]] + "-" + t[r[n + 6]] + t[r[n + 7]] + "-" + t[r[n + 8]] + t[r[n + 9]] + "-" + t[r[n + 10]] + t[r[n + 11]] + t[r[n + 12]] + t[r[n + 13]] + t[r[n + 14]] + t[r[n + 15]];
}
const G = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), D = {
  randomUUID: G
};
function Q(r, n, p) {
  if (D.randomUUID && !r)
    return D.randomUUID();
  r = r || {};
  const u = r.random || (r.rng || j)();
  return u[6] = u[6] & 15 | 64, u[8] = u[8] & 63 | 128, k(u);
}
export {
  K as b,
  Q as v
};
