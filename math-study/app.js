/* MB-A Maths Trainer — study engine.
 * Content lives in content/*.js and registers itself with MS.addTopic(...).
 * Each lesson: formulas -> learn notes -> worked examples -> generated practice.
 */
(function () {
  'use strict';

  var MS = (window.MS = { topics: [], lessons: {}, order: [], widgets: {} });

  MS.addTopic = function (t) {
    MS.topics.push(t);
    t.lessons.forEach(function (l) {
      l.topic = t;
      MS.lessons[l.id] = l;
      MS.order.push(l.id);
    });
  };

  /* ---------------- Random numbers (seeded, so a problem can be replayed) ---------------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seed) {
    var r = mulberry32(seed);
    var R = {
      seed: seed,
      f: r,
      int: function (a, b) { return a + Math.floor(r() * (b - a + 1)); },
      pick: function (arr) { return arr[Math.floor(r() * arr.length)]; },
      chance: function (p) { return r() < (p == null ? 0.5 : p); },
      sign: function () { return r() < 0.5 ? -1 : 1; },
      nz: function (a, b) { var v; do { v = a + Math.floor(r() * (b - a + 1)); } while (v === 0); return v; },
      shuffle: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; }
        return a;
      },
      sample: function (arr, k) { return R.shuffle(arr).slice(0, k); }
    };
    return R;
  }
  MS.makeRng = makeRng;
  function newSeed() { return Math.floor(Math.random() * 2147483647); }

  /* ---------------- Helpers for writing problems in TeX ---------------- */
  var H = (MS.h = {});
  H.round = function (x, d) { var p = Math.pow(10, d == null ? 2 : d); return Math.round(x * p) / p; };
  H.fmt = function (x, d) {
    if (x === Infinity) return '+\\infty';
    if (x === -Infinity) return '-\\infty';
    var v = H.round(x, d == null ? 4 : d);
    if (Object.is(v, -0)) v = 0;
    var s = String(v);
    if (s.indexOf('e') >= 0) s = x.toPrecision(6);
    return s;
  };
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  H.gcd = gcd;
  /* simplified fraction in TeX, n and d integers */
  H.frac = function (n, d) {
    if (d < 0) { n = -n; d = -d; }
    var g = gcd(n, d); n /= g; d /= g;
    if (d === 1) return String(n);
    return (n < 0 ? '-' : '') + '\\frac{' + Math.abs(n) + '}{' + d + '}';
  };
  /* polynomial from coefficients (highest power first) */
  H.poly = function (cs, v) {
    v = v || 'x';
    var n = cs.length - 1, s = '';
    cs.forEach(function (c, i) {
      var p = n - i;
      if (c === 0) return;
      var neg = c < 0, a = Math.abs(c);
      var body = p === 0 ? H.fmt(a) : (a === 1 ? '' : H.fmt(a)) + v + (p > 1 ? '^{' + p + '}' : '');
      if (s === '') s = (neg ? '-' : '') + body;
      else s += (neg ? ' - ' : ' + ') + body;
    });
    return s || '0';
  };
  /* polynomial written lowest power first (to make students look for the leading term) */
  H.polyAsc = function (cs, v) {
    v = v || 'x';
    var n = cs.length - 1, s = '';
    for (var i = cs.length - 1; i >= 0; i--) {
      var c = cs[i], p = n - i;
      if (c === 0) continue;
      var neg = c < 0, a = Math.abs(c);
      var body = p === 0 ? H.fmt(a) : (a === 1 ? '' : H.fmt(a)) + v + (p > 1 ? '^{' + p + '}' : '');
      if (s === '') s = (neg ? '-' : '') + body;
      else s += (neg ? ' - ' : ' + ') + body;
    }
    return s || '0';
  };
  /* (x - r) */
  H.lin = function (r, v) {
    v = v || 'x';
    if (r === 0) return v;
    return r > 0 ? v + ' - ' + H.fmt(r) : v + ' + ' + H.fmt(-r);
  };
  /* "+ 3" / "- 3" to append a constant */
  H.signed = function (c) { return c < 0 ? '- ' + H.fmt(-c) : '+ ' + H.fmt(c); };
  /* interval in European notation: ]a, b[ open, [a, b] closed */
  H.iv = function (a, b, lc, rc) {
    var L = '\\mathopen{' + (a === -Infinity || !lc ? ']' : '[') + '}';
    var Rb = '\\mathclose{' + (b === Infinity || !rc ? '[' : ']') + '}';
    return L + H.fmt(a) + ', ' + H.fmt(b) + Rb;
  };
  H.opTex = { '<': '<', '<=': '\\le', '>': '>', '>=': '\\ge' };
  H.flip = { '<': '>', '<=': '>=', '>': '<', '>=': '<=' };
  /* sign chart table. xs: TeX labels of the marked x-values; signs: 2*xs.length+1 entries */
  H.chart = function (xs, signs, label) {
    label = label || 'f(x)';
    var top = '<tr><th>\\(x\\)</th>', bot = '<tr><th>\\(' + label + '\\)</th>';
    for (var i = 0; i < signs.length; i++) {
      var isPt = i % 2 === 1;
      top += isPt ? '<td class="pt">\\(' + xs[(i - 1) / 2] + '\\)</td>' : '<td></td>';
      var s = signs[i] === '-' ? '−' : signs[i];
      bot += '<td class="' + (isPt ? 'pt ' : '') + (s === '+' ? 'pos' : s === '−' ? 'neg' : '') + '">' + s + '</td>';
    }
    return '<div class="chart-wrap"><table class="signchart">' + top + '</tr>' + bot + '</tr></table></div>';
  };

  /* ---------------- Answer parser: accepts 3/4, 2^5, ln(1.5)/ln(1.03), sqrt(2), e, pi, inf ---------------- */
  function evalExpr(src) {
    var s = String(src).trim().toLowerCase()
      .replace(/[−–]/g, '-').replace(/[·×]/g, '*').replace(/÷/g, '/')
      .replace(/π/g, 'pi').replace(/∞/g, 'inf').replace(/√/g, 'sqrt').replace(/\s+/g, '');
    if (s === '') return NaN;
    var toks = [], i = 0;
    while (i < s.length) {
      var c = s[i], j;
      if (/[0-9.]/.test(c)) {
        j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        var v = Number(s.slice(i, j)); if (isNaN(v)) return NaN;
        toks.push({ t: 'n', v: v }); i = j; continue;
      }
      if (/[a-z]/.test(c)) {
        j = i; while (j < s.length && /[a-z]/.test(s[j])) j++;
        toks.push({ t: 'id', v: s.slice(i, j) }); i = j; continue;
      }
      if ('+-*/^()_'.indexOf(c) >= 0) { toks.push({ t: c }); i++; continue; }
      return NaN;
    }
    var p = 0;
    var FN = { ln: Math.log, sqrt: Math.sqrt, exp: Math.exp, abs: Math.abs, cbrt: Math.cbrt };
    var CONST = { e: Math.E, pi: Math.PI, inf: Infinity, infinity: Infinity };
    function peek() { return toks[p]; }
    function eat(t) { if (toks[p] && toks[p].t === t) { p++; return true; } return false; }
    function startsFactor(tk) { return tk && (tk.t === 'n' || tk.t === 'id' || tk.t === '('); }
    function expr() {
      var v = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) { var op = toks[p++].t; var r = term(); v = op === '+' ? v + r : v - r; }
      return v;
    }
    function term() {
      var v = unary();
      for (;;) {
        var tk = peek(); if (!tk) break;
        if (tk.t === '*') { p++; v *= unary(); }
        else if (tk.t === '/') { p++; v /= unary(); }
        else if (startsFactor(tk)) { v *= power(); }
        else break;
      }
      return v;
    }
    function unary() { if (eat('-')) return -unary(); if (eat('+')) return unary(); return power(); }
    function power() { var b = primary(); if (eat('^')) return Math.pow(b, unary()); return b; }
    function arg() {
      if (peek() && peek().t === '(') { p++; var v = expr(); if (!eat(')')) throw 0; return v; }
      return power();
    }
    function primary() {
      var tk = toks[p++]; if (!tk) throw 0;
      if (tk.t === 'n') return tk.v;
      if (tk.t === '(') { var v = expr(); if (!eat(')')) throw 0; return v; }
      if (tk.t === 'id') {
        if (tk.v in CONST) return CONST[tk.v];
        if (tk.v === 'log') {
          var base = null;
          if (eat('_')) base = primary();
          else if (peek() && peek().t === 'n' && toks[p + 1] && toks[p + 1].t === '(') base = toks[p++].v;
          var a = arg();
          return base == null ? Math.log10(a) : Math.log(a) / Math.log(base);
        }
        if (tk.v in FN) return FN[tk.v](arg());
      }
      throw 0;
    }
    try { var out = expr(); if (p !== toks.length) return NaN; return out; } catch (e) { return NaN; }
  }
  MS.evalExpr = evalExpr;

  function close(u, a) {
    if (!isFinite(a)) return u === a;
    if (!isFinite(u)) return false;
    return Math.abs(u - a) <= Math.max(0.0051, 0.002 * Math.abs(a));
  }
  function parseNum(str) { return evalExpr(String(str).replace(/,/g, '.')); }
  function parseList(str) {
    var s = String(str).trim().toLowerCase();
    if (s === '' ) return null;
    if (/^(none|no|geen|-|∅|\{\})$/.test(s)) return [];
    s = s.replace(/^[\{\(\[]|[\}\)\]]$/g, '');
    var parts = s.indexOf(';') >= 0 ? s.split(';') : s.split(',');
    var out = parts.map(function (x) { return parseNum(x); });
    if (out.some(function (x) { return isNaN(x); })) return null;
    return out;
  }
  MS.close = close;
  MS.parseList = parseList;

  /* check an answer; returns {ok, invalid} */
  function checkAnswer(P, resp) {
    if (P.type === 'num') {
      var u = parseNum(resp); if (isNaN(u)) return { invalid: true };
      return { ok: close(u, P.ans) };
    }
    if (P.type === 'set' || P.type === 'tuple') {
      var L = parseList(resp); if (!L) return { invalid: true };
      var A = P.ans.slice();
      if (L.length !== A.length) return { ok: false };
      if (P.type === 'set') { L.sort(function (a, b) { return a - b; }); A.sort(function (a, b) { return a - b; }); }
      return { ok: L.every(function (x, i) { return close(x, A[i]); }) };
    }
    if (P.type === 'ineq') {
      var v = parseNum(resp.v); if (isNaN(v) || !resp.op) return { invalid: true };
      return { ok: resp.op === P.ans.op && close(v, P.ans.v) };
    }
    if (P.type === 'mc') { if (resp == null) return { invalid: true }; return { ok: resp === P.ans }; }
    if (P.type === 'multi') {
      if (!resp || !resp.length) return { invalid: true };
      var a1 = resp.slice().sort().join(','), a2 = P.ans.slice().sort().join(',');
      return { ok: a1 === a2 };
    }
    return { invalid: true };
  }
  MS.checkAnswer = checkAnswer;

  function answerText(P) {
    if (P.show) return P.show;
    if (P.type === 'num') return '\\(' + (P.prompt ? P.prompt + ' ' : '') + H.fmt(P.ans) + '\\)';
    if (P.type === 'set') return P.ans.length ? '\\(' + P.ans.slice().sort(function (a, b) { return a - b; }).map(function (x) { return H.fmt(x); }).join(',\\ ') + '\\)' : 'none';
    if (P.type === 'tuple') return '\\((' + P.ans.map(function (x) { return H.fmt(x); }).join(',\\ ') + ')\\)';
    if (P.type === 'ineq') return '\\(' + (P.v || 'x') + ' ' + H.opTex[P.ans.op] + ' ' + H.fmt(P.ans.v) + '\\)';
    if (P.type === 'mc') return P.choices[P.ans];
    if (P.type === 'multi') return P.ans.map(function (i) { return P.choices[i]; }).join(', ');
    return '';
  }

  /* build a problem deterministically from (lesson, generator, seed) */
  function buildProblem(item) {
    var les = MS.lessons[item.lid];
    var g = les && les.practice[item.gi];
    var R = makeRng(item.seed);
    var P;
    try { P = g.gen(R); } catch (e) {
      if (window.console) console.error(e);
      P = { q: 'This problem could not be generated. Skip to the next one.', type: 'mc', choices: ['OK'], ans: 0, sol: [] };
    }
    if ((P.type === 'mc' || P.type === 'multi') && !P.keepOrder) {
      var idx = R.shuffle(P.choices.map(function (_, i) { return i; }));
      P.choices = idx.map(function (i) { return P.choices[i]; });
      if (P.type === 'mc') P.ans = idx.indexOf(P.ans);
      else P.ans = P.ans.map(function (a) { return idx.indexOf(a); });
    }
    P.sol = P.sol || [];
    return P;
  }
  MS.buildProblem = buildProblem;

  /* ---------------- Progress (per browser) ---------------- */
  var KEY = 'mba-maths-trainer-v1';
  var S = load();
  function blank() { return { v: 1, les: {}, sk: {}, miss: [], days: [], solved: 0, right: 0 }; }
  function load() {
    try { var j = JSON.parse(localStorage.getItem(KEY)); if (j && j.v === 1) return Object.assign(blank(), j); } catch (e) {}
    return blank();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function LS(id) { return S.les[id] || (S.les[id] = { seen: {}, hist: [] }); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function record(item, ok) {
    var l = LS(item.lid);
    l.hist.push(ok ? 1 : 0); if (l.hist.length > 20) l.hist.shift();
    var k = item.lid + ':' + item.gi;
    var s = S.sk[k] || (S.sk[k] = { c: 0, w: 0, h: [] });
    if (ok) s.c++; else s.w++;
    s.h.push(ok ? 1 : 0); if (s.h.length > 6) s.h.shift();
    s.t = Date.now();
    S.solved++; if (ok) S.right++;
    S.miss = S.miss.filter(function (m) { return !(m.lid === item.lid && m.gi === item.gi && m.seed === item.seed); });
    if (!ok) { S.miss.push({ lid: item.lid, gi: item.gi, seed: item.seed }); if (S.miss.length > 40) S.miss.shift(); }
    var d = today(); if (S.days[S.days.length - 1] !== d) { S.days.push(d); if (S.days.length > 400) S.days.shift(); }
    save();
  }
  function markSeen(id, tab) { var l = LS(id); if (!l.seen[tab]) { l.seen[tab] = 1; save(); } }
  function mastery(id) {
    var h = (S.les[id] && S.les[id].hist) || [];
    var last = h.slice(-10), sum = 0; last.forEach(function (x) { sum += x; });
    return { pct: Math.round((sum / 10) * 100), n: h.length, mastered: sum >= 8 };
  }
  function skillAcc(lid, gi) {
    var s = S.sk[lid + ':' + gi];
    if (!s || !s.h.length) return null;
    var sum = 0; s.h.forEach(function (x) { sum += x; }); return sum / s.h.length;
  }
  function streak() {
    var set = {}; S.days.forEach(function (d) { set[d] = 1; });
    var d = new Date(), n = 0;
    var key = function (dt) { return dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0'); };
    if (!set[key(d)]) d.setDate(d.getDate() - 1);
    while (set[key(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  /* weighted choice of the next skill: unseen and weak skills come up more often */
  function pickSkill(lid, avoid) {
    var les = MS.lessons[lid], ws = [], tot = 0;
    les.practice.forEach(function (g, i) {
      var a = skillAcc(lid, i);
      var w = a == null ? 3 : 1 + 3 * (1 - a);
      if (i === avoid && les.practice.length > 1) w *= 0.15;
      ws.push(w); tot += w;
    });
    var r = Math.random() * tot;
    for (var i = 0; i < ws.length; i++) { r -= ws[i]; if (r <= 0) return i; }
    return ws.length - 1;
  }

  /* ---------------- DOM helpers ---------------- */
  var app;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function typeset(el) {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetPromise([el]).catch(function () {});
    }
  }
  function clearMath(el) { if (window.MathJax && MathJax.typesetClear) { try { MathJax.typesetClear([el]); } catch (e) {} } }
  MS.mathReady = function () { if (app) typeset(app); };
  function setView(html) {
    clearMath(app);
    app.innerHTML = html;
    typeset(app);
    window.scrollTo(0, 0);
  }

  /* ---------------- Problem widget ---------------- */
  function mountProblem(host, item, opts) {
    opts = opts || {};
    var P = buildProblem(item);
    var les = MS.lessons[item.lid], g = les.practice[item.gi];
    var state = { tries: 0, done: false, recorded: false };
    var inputHtml = '';
    var uid = 'p' + item.seed;
    if (P.type === 'num' || P.type === 'set' || P.type === 'tuple') {
      var ph = P.type === 'num' ? 'e.g. 13.72 or ln(1.5)/ln(1.03)' : P.type === 'set' ? 'e.g. -2, 3   (or "none")' : 'e.g. 4, -3';
      inputHtml = '<label class="ans-row" for="' + uid + '-in">' + (P.prompt ? '<span class="ans-prompt">\\(' + P.prompt + '\\)</span>' : '') +
        '<input id="' + uid + '-in" class="ans-input" type="text" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + ph + '">' +
        (P.unit ? '<span class="ans-unit">' + P.unit + '</span>' : '') + '</label>' +
        '<div class="ans-preview" aria-live="polite"></div>' +
        '<p class="ans-help">' + (P.type === 'num' ? 'Exact or rounded to 2 decimals. You can type 3/4, 2^5, sqrt(2), e^2.5, ln(2)/ln(1.1), inf.' :
          P.type === 'set' ? 'Separate values with commas, in any order. Type "none" if there are none.' : 'Separate the values with commas, in the order asked.') + '</p>';
    } else if (P.type === 'ineq') {
      var v = P.v || 'x';
      inputHtml = '<div class="ans-row"><span class="ans-prompt">\\(' + v + '\\)</span>' +
        '<select id="' + uid + '-op" class="ans-op" aria-label="Inequality sign"><option value="">sign</option><option value="<">&lt;</option><option value="<=">≤</option><option value=">">&gt;</option><option value=">=">≥</option></select>' +
        '<input id="' + uid + '-in" class="ans-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="boundary value" aria-label="Boundary value"></div>' +
        '<div class="ans-preview" aria-live="polite"></div><p class="ans-help">Pick the sign, then type the boundary (exact or 2 decimals).</p>';
    } else if (P.type === 'mc' || P.type === 'multi') {
      inputHtml = '<div class="choices" role="' + (P.type === 'mc' ? 'radiogroup' : 'group') + '">' + P.choices.map(function (c, i) {
        return '<button type="button" class="choice" data-i="' + i + '" aria-pressed="false"><span class="choice-key">' + 'ABCDEFG'[i] + '</span><span class="choice-body">' + c + '</span></button>';
      }).join('') + '</div>' + (P.type === 'multi' ? '<p class="ans-help">Select every option that applies.</p>' : '');
    }
    host.innerHTML =
      '<div class="prob">' +
      '<div class="prob-meta"><span class="chip">' + esc(g.name) + '</span>' + (opts.showLesson ? '<span class="prob-les">' + les.code + ' ' + esc(les.title) + '</span>' : '') + '</div>' +
      '<div class="prob-q">' + P.q + '</div>' +
      '<div class="prob-in">' + inputHtml + '</div>' +
      '<div class="prob-actions">' +
      '<button type="button" class="btn primary" data-act="check">Check</button>' +
      (P.hint ? '<button type="button" class="btn ghost" data-act="hint">Hint</button>' : '') +
      '<button type="button" class="btn ghost" data-act="show">Show solution</button>' +
      '</div>' +
      '<div class="feedback" hidden></div>' +
      (P.hint ? '<div class="hint" hidden><strong>Hint.</strong> ' + P.hint + '</div>' : '') +
      '<div class="solution" hidden><h4>Worked solution</h4><ol>' + P.sol.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol><p class="sol-ans"><strong>Answer:</strong> ' + answerText(P) + '</p></div>' +
      '</div>';
    clearMath(host);
    typeset(host);

    var q = function (sel) { return host.querySelector(sel); };
    var input = q('.ans-input'), opSel = q('.ans-op'), fb = q('.feedback'), sol = q('.solution'), checkBtn = q('[data-act="check"]');
    var selected = P.type === 'multi' ? [] : null;

    host.querySelectorAll('.choice').forEach(function (b) {
      b.addEventListener('click', function () {
        if (state.done) return;
        var i = +b.getAttribute('data-i');
        if (P.type === 'mc') {
          selected = i;
          host.querySelectorAll('.choice').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        } else {
          var k = selected.indexOf(i);
          if (k >= 0) selected.splice(k, 1); else selected.push(i);
          b.setAttribute('aria-pressed', String(k < 0));
        }
      });
    });
    if (input) {
      var prev = q('.ans-preview');
      input.addEventListener('input', function () {
        var s = input.value.trim();
        if (!s) { prev.textContent = ''; return; }
        if (P.type === 'set' || P.type === 'tuple') {
          var L = parseList(s); prev.textContent = L ? (L.length ? 'Read as: ' + L.map(function (x) { return fmtPlain(x); }).join(' ; ') : 'Read as: none') : 'Cannot read this yet';
        } else {
          var u = parseNum(s);
          prev.textContent = isNaN(u) ? 'Cannot read this yet' : (/^[-+]?\d*\.?\d+$/.test(s.replace(',', '.')) ? '' : '= ' + fmtPlain(u));
        }
      });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); checkBtn.click(); } });
      if (opts.focus !== false && window.matchMedia && window.matchMedia('(pointer:fine)').matches) setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) {} }, 30);
    }

    function finish(ok) {
      if (!state.recorded) { state.recorded = true; record(item, ok); if (opts.onResult) opts.onResult(ok); }
    }
    function showSolution() { sol.hidden = false; }
    function toNext() {
      state.done = true;
      host.querySelector('.prob').classList.add('is-done');
      if (input) input.readOnly = true;
      if (opSel) opSel.disabled = true;
      if (opts.onNext) {
        checkBtn.textContent = opts.nextLabel || 'Next problem →';
        checkBtn.setAttribute('data-act', 'next');
        checkBtn.focus({ preventScroll: true });
      } else checkBtn.hidden = true;
      if (P.type === 'mc' || P.type === 'multi') {
        host.querySelectorAll('.choice').forEach(function (o) {
          var i = +o.getAttribute('data-i');
          var correct = P.type === 'mc' ? i === P.ans : P.ans.indexOf(i) >= 0;
          if (correct) o.classList.add('is-right');
          else if (o.getAttribute('aria-pressed') === 'true') o.classList.add('is-wrong');
        });
      }
    }

    host.querySelector('.prob-actions').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'next') { opts.onNext(); return; }
      if (act === 'hint') { q('.hint').hidden = false; return; }
      if (act === 'show') {
        showSolution();
        if (!state.done) {
          finish(false);
          fb.hidden = false; fb.className = 'feedback info';
          fb.innerHTML = 'Study the steps, then try a fresh one. This problem is saved to your <a href="#review">mistakes list</a>.';
          toNext();
          typeset(fb);
        }
        b.hidden = true;
        return;
      }
      if (act === 'check') {
        var resp;
        if (P.type === 'num' || P.type === 'set' || P.type === 'tuple') resp = input.value;
        else if (P.type === 'ineq') resp = { op: opSel.value, v: input.value };
        else resp = selected;
        var r = checkAnswer(P, resp);
        fb.hidden = false;
        if (r.invalid) {
          fb.className = 'feedback info';
          fb.textContent = P.type === 'mc' || P.type === 'multi' ? 'Choose an option first.' : P.type === 'ineq' && !resp.op ? 'Choose the inequality sign first.' : 'I could not read that answer. Use numbers and + − * / ^ ( ), sqrt, ln, log, e.';
          return;
        }
        state.tries++;
        if (r.ok) {
          finish(state.tries === 1);
          fb.className = 'feedback good';
          fb.innerHTML = state.tries === 1 ? '<strong>Correct.</strong> ' + pick(['Nice work.', 'Exactly right.', 'Well done.', 'Spot on.']) + ' Check the steps below if you want to compare methods.' :
            '<strong>Correct on retry.</strong> It still counts as a miss, so it will come back in Smart review.';
          showSolution();
          var shb = q('[data-act="show"]'); if (shb) shb.hidden = true;
          toNext();
        } else {
          finish(false);
          fb.className = 'feedback bad';
          if (P.type === 'mc' || state.tries >= 2) {
            fb.innerHTML = '<strong>Not quite.</strong> The answer is ' + answerText(P) + '. Read the worked solution below.';
            showSolution();
            var shb2 = q('[data-act="show"]'); if (shb2) shb2.hidden = true;
            toNext();
          } else {
            fb.innerHTML = '<strong>Not quite.</strong> Try once more' + (P.hint ? ', or open the hint.' : '.') + (P.type === 'ineq' ? ' Check the direction of the sign as well as the number.' : '');
          }
        }
        typeset(fb);
      }
    });
  }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function fmtPlain(x) { if (x === Infinity) return '∞'; if (x === -Infinity) return '−∞'; return String(H.round(x, 6)); }

  /* ---------------- Views ---------------- */
  var TABS = [['learn', 'Formulas'], ['examples', 'Examples'], ['practice', 'Practice']];

  function nextLesson() {
    for (var i = 0; i < MS.order.length; i++) { if (!mastery(MS.order[i]).mastered) return MS.order[i]; }
    return MS.order[0];
  }

  function viewHome() {
    var tot = S.solved, acc = tot ? Math.round((S.right / tot) * 100) : 0, st = streak();
    var nl = nextLesson(), nls = MS.lessons[nl];
    var nlSeen = (S.les[nl] && S.les[nl].seen) || {};
    var nlTab = !nlSeen.learn ? 'learn' : !nlSeen.examples ? 'examples' : 'practice';
    var html = '<section class="hero"><div class="wrap hero-inner">' +
      '<p class="eyebrow">MB A · Mathematics study trainer</p>' +
      '<h1>Formulas first, then examples, then practice until it sticks.</h1>' +
      '<p class="lede">Every lesson follows the same three steps. Practice problems are generated fresh each time, so you never run out, and the ones you miss come back in Smart review.</p>' +
      '<div class="hero-actions">' +
      '<a class="btn primary big" href="#' + nl + '-' + nlTab + '">Continue: ' + nls.code + ' ' + esc(nls.title) + '</a>' +
      '<a class="btn big" href="#review">Smart review</a>' +
      '<a class="btn ghost big" href="#formulas">Formula sheet</a>' +
      '</div>' +
      '<dl class="stats">' +
      '<div><dt>Day streak</dt><dd>' + st + '</dd></div>' +
      '<div><dt>Problems done</dt><dd>' + tot + '</dd></div>' +
      '<div><dt>First-try accuracy</dt><dd>' + (tot ? acc + '%' : '–') + '</dd></div>' +
      '<div><dt>Mistakes to redo</dt><dd>' + S.miss.length + '</dd></div>' +
      '</dl></div></section>';
    html += '<div class="wrap">';
    MS.topics.forEach(function (t) {
      html += '<section class="topic"><div class="topic-head"><h2><span class="tcode">' + esc(t.code) + '</span> ' + esc(t.title) + '</h2>' +
        (t.note ? '<p class="muted">' + t.note + '</p>' : '') + '</div><ol class="lesson-list">';
      t.lessons.forEach(function (l) {
        var m = mastery(l.id), seen = (S.les[l.id] && S.les[l.id].seen) || {};
        html += '<li><a class="lesson-row" href="#' + l.id + '-learn">' +
          '<span class="lcode">' + l.code + '</span>' +
          '<span class="ltitle"><strong>' + esc(l.title) + '</strong><span class="lsum">' + esc(l.summary || '') + '</span></span>' +
          '<span class="lsteps" aria-label="Steps done">' + TABS.map(function (tb) { return '<span class="dot' + (seen[tb[0]] ? ' on' : '') + '" title="' + tb[1] + '"></span>'; }).join('') + '</span>' +
          '<span class="lmeter"><span class="bar"><span style="width:' + m.pct + '%"></span></span><span class="lpct">' + (m.n ? m.pct + '%' : 'new') + (m.mastered ? ' ✓' : '') + '</span></span>' +
          '</a></li>';
      });
      html += '</ol></section>';
    });
    html += '<section class="howto"><h2>How to study with this</h2><ol>' +
      '<li><strong>Formulas &amp; ideas (5 min).</strong> Read the formula cards and the short notes. Use the formula sheet’s self-test mode to check you can recall them.</li>' +
      '<li><strong>Worked examples.</strong> Read the problem, try the first step yourself, then reveal one step at a time.</li>' +
      '<li><strong>Practice.</strong> Keep going until the mastery bar reaches 80% (8 of your last 10 right on the first try).</li>' +
      '<li><strong>Smart review, daily.</strong> Ten mixed questions from all lessons you have started, with your mistakes first. Mixing topics and spacing them out is what makes it stick for the exam.</li>' +
      '</ol><p class="muted">Progress is saved in this browser only.</p></section>';
    html += '</div>';
    setView(html);
  }

  function lessonNav(l) {
    var i = MS.order.indexOf(l.id);
    var prev = i > 0 ? MS.lessons[MS.order[i - 1]] : null, next = i < MS.order.length - 1 ? MS.lessons[MS.order[i + 1]] : null;
    return '<nav class="les-pager">' +
      (prev ? '<a href="#' + prev.id + '-learn">← ' + prev.code + ' ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a href="#' + next.id + '-learn">' + next.code + ' ' + esc(next.title) + ' →</a>' : '<span></span>') + '</nav>';
  }

  function viewLesson(id, tab) {
    var l = MS.lessons[id];
    markSeen(id, tab);
    var m = mastery(id), seen = LS(id).seen;
    var html = '<div class="wrap lesson">' +
      '<p class="crumb"><a href="#home">Home</a> / ' + esc(l.topic.code) + ' ' + esc(l.topic.title) + '</p>' +
      '<header class="les-head"><h1><span class="lcode big">' + l.code + '</span> ' + esc(l.title) + '</h1>' +
      '<div class="les-mastery"><span class="bar"><span style="width:' + m.pct + '%"></span></span><span>' + (m.n ? 'Mastery ' + m.pct + '%' : 'Not practised yet') + '</span></div></header>' +
      '<nav class="tabs" aria-label="Lesson steps">' + TABS.map(function (tb, i) {
        return '<a href="#' + id + '-' + tb[0] + '" class="tab' + (tb[0] === tab ? ' active' : '') + '"' + (tb[0] === tab ? ' aria-current="page"' : '') + '><span class="tnum">' + (i + 1) + '</span>' + tb[1] + (seen[tb[0]] && tb[0] !== tab ? ' <span class="tick">✓</span>' : '') + '</a>';
      }).join('') + '</nav><div class="tab-body">';

    if (tab === 'learn') {
      html += '<section><h2 class="sec">Key formulas</h2><div class="fgrid">' + l.formulas.map(function (f) {
        return '<div class="fcard"><span class="fname">' + f.n + '</span><div class="fmath">\\[' + f.t + '\\]</div>' + (f.note ? '<p class="fnote">' + f.note + '</p>' : '') + '</div>';
      }).join('') + '</div></section>';
      l.learn.forEach(function (s, i) {
        html += '<section class="note"><h2 class="sec">' + s.h + '</h2>' + s.body + (s.widget ? '<div class="widget" data-widget="' + s.widget + '" id="w-' + id + '-' + i + '"></div>' : '') + '</section>';
      });
      if (l.pitfalls && l.pitfalls.length) html += '<section class="pitfalls"><h2 class="sec">Common mistakes</h2><ul>' + l.pitfalls.map(function (p) { return '<li>' + p + '</li>'; }).join('') + '</ul></section>';
      html += '<div class="next-step"><a class="btn primary" href="#' + id + '-examples">Next: worked examples →</a></div>';
    } else if (tab === 'examples') {
      html += '<p class="muted intro">Try each problem on paper first. Reveal one step at a time and check your thinking before moving on.</p>';
      l.examples.forEach(function (ex, i) {
        html += '<article class="example" data-ex="' + i + '"><h3><span class="exnum">Example ' + (i + 1) + '</span> ' + ex.t + '</h3>' +
          '<div class="ex-p">' + ex.p + '</div><ol class="ex-steps">' + ex.s.map(function (s) { return '<li hidden>' + s + '</li>'; }).join('') + '</ol>' +
          '<div class="ex-actions"><button type="button" class="btn" data-act="step">Show first step</button><button type="button" class="btn ghost" data-act="all">Show all</button></div></article>';
      });
      html += '<div class="next-step"><a class="btn primary" href="#' + id + '-practice">Next: practice →</a></div>';
    } else {
      html += '<section class="practice"><div class="skillbar" role="group" aria-label="Choose a skill"><button type="button" class="skill on" data-g="-1">Mixed</button>' +
        l.practice.map(function (g, i) {
          var a = skillAcc(id, i);
          return '<button type="button" class="skill" data-g="' + i + '">' + esc(g.name) + '<span class="sdot ' + (a == null ? '' : a >= 0.8 ? 'good' : a >= 0.5 ? 'mid' : 'low') + '"></span></button>';
        }).join('') + '</div>' +
        '<div class="session-line" aria-live="polite"></div><div id="prob-host"></div></section>';
      if (l.course && l.course.length) {
        html += '<section class="course"><h2 class="sec">Exercises from your slides</h2><p class="muted">Work these on paper, then check the answer.</p><ol>' +
          l.course.map(function (c) { return '<li><div>' + c.q + '</div><details><summary>Show answer</summary><div class="course-a">' + c.a + '</div></details></li>'; }).join('') +
          '</ol></section>';
      }
    }
    html += '</div>' + lessonNav(l) + '</div>';
    setView(html);

    if (tab === 'learn') {
      app.querySelectorAll('[data-widget]').forEach(function (el) { var w = MS.widgets[el.getAttribute('data-widget')]; if (w) w(el); });
    }
    if (tab === 'examples') {
      app.querySelectorAll('.example').forEach(function (ex) {
        var steps = ex.querySelectorAll('.ex-steps li'), stepBtn = ex.querySelector('[data-act="step"]'), allBtn = ex.querySelector('[data-act="all"]');
        var n = 0;
        function upd() {
          if (n >= steps.length) { stepBtn.hidden = true; allBtn.hidden = true; }
          else stepBtn.textContent = 'Show step ' + (n + 1) + ' of ' + steps.length;
        }
        stepBtn.addEventListener('click', function () { if (n < steps.length) { steps[n].hidden = false; n++; } upd(); });
        allBtn.addEventListener('click', function () { steps.forEach(function (s) { s.hidden = false; }); n = steps.length; upd(); });
      });
    }
    if (tab === 'practice') startPractice(id);
  }

  function startPractice(id) {
    var host = document.getElementById('prob-host'), line = app.querySelector('.session-line');
    var forced = -1, last = -1, done = 0, right = 0;
    function updLine() { line.textContent = done ? 'This session: ' + right + ' / ' + done + ' right on the first try' : ''; }
    function next() {
      var gi = forced >= 0 ? forced : pickSkill(id, last);
      last = gi;
      mountProblem(host, { lid: id, gi: gi, seed: newSeed() }, {
        onResult: function (ok) {
          done++; if (ok) right++; updLine();
          var m = mastery(id), bar = app.querySelector('.les-mastery');
          if (bar) { bar.querySelector('.bar span').style.width = m.pct + '%'; bar.lastChild.textContent = 'Mastery ' + m.pct + '%' + (m.mastered ? ' ✓' : ''); }
          var a = skillAcc(id, gi), dot = app.querySelector('.skill[data-g="' + gi + '"] .sdot');
          if (dot) dot.className = 'sdot ' + (a >= 0.8 ? 'good' : a >= 0.5 ? 'mid' : 'low');
        },
        onNext: function () { next(); host.scrollIntoView({ block: 'nearest' }); }
      });
    }
    app.querySelector('.skillbar').addEventListener('click', function (e) {
      var b = e.target.closest('.skill'); if (!b) return;
      forced = +b.getAttribute('data-g');
      app.querySelectorAll('.skill').forEach(function (s) { s.classList.toggle('on', s === b); });
      next();
    });
    next();
  }

  function viewFormulas() {
    var html = '<div class="wrap formulas"><p class="crumb"><a href="#home">Home</a></p><header class="les-head"><h1>Formula sheet</h1>' +
      '<label class="toggle" for="selftest"><input type="checkbox" id="selftest"> Self-test: hide formulas, tap to reveal</label></header>';
    MS.topics.forEach(function (t) {
      html += '<section class="topic"><h2><span class="tcode">' + esc(t.code) + '</span> ' + esc(t.title) + '</h2>';
      t.lessons.forEach(function (l) {
        html += '<div class="fs-les"><h3><a href="#' + l.id + '-learn">' + l.code + ' ' + esc(l.title) + '</a></h3><div class="fgrid">' +
          l.formulas.map(function (f) { return '<button type="button" class="fcard fs"><span class="fname">' + f.n + '</span><span class="fmath">\\[' + f.t + '\\]</span></button>'; }).join('') + '</div></div>';
      });
      html += '</section>';
    });
    html += '</div>';
    setView(html);
    var box = document.getElementById('selftest');
    box.addEventListener('change', function () {
      app.querySelector('.formulas').classList.toggle('hidden-mode', box.checked);
      app.querySelectorAll('.fcard.fs').forEach(function (c) { c.classList.remove('revealed'); });
    });
    app.querySelectorAll('.fcard.fs').forEach(function (c) { c.addEventListener('click', function () { c.classList.toggle('revealed'); }); });
  }

  function buildReviewQueue(n) {
    var q = [], used = {};
    S.miss.slice().reverse().slice(0, 3).forEach(function (m) { if (MS.lessons[m.lid] && MS.lessons[m.lid].practice[m.gi]) { q.push({ lid: m.lid, gi: m.gi, seed: m.seed, redo: true }); used[m.lid + ':' + m.gi] = 1; } });
    var started = MS.order.filter(function (id) { return S.les[id] && S.les[id].hist.length; });
    var pool = started.length ? started : MS.order.slice(0, 2);
    var cand = [];
    pool.forEach(function (lid) {
      MS.lessons[lid].practice.forEach(function (g, gi) {
        var a = skillAcc(lid, gi), s = S.sk[lid + ':' + gi];
        var age = s && s.t ? (Date.now() - s.t) / 86400000 : 3;
        var w = (a == null ? 1.5 : 1 + 3 * (1 - a)) * (1 + Math.min(age, 7) / 3);
        cand.push({ lid: lid, gi: gi, w: w });
      });
    });
    while (q.length < n && cand.length) {
      var tot = 0; cand.forEach(function (c) { tot += c.w * (used[c.lid + ':' + c.gi] ? 0.2 : 1); });
      var r = Math.random() * tot, chosen = cand[cand.length - 1];
      for (var i = 0; i < cand.length; i++) { r -= cand[i].w * (used[cand[i].lid + ':' + cand[i].gi] ? 0.2 : 1); if (r <= 0) { chosen = cand[i]; break; } }
      used[chosen.lid + ':' + chosen.gi] = 1;
      q.push({ lid: chosen.lid, gi: chosen.gi, seed: newSeed() });
    }
    return q;
  }

  function viewReview() {
    var queue = buildReviewQueue(10), i = 0, results = [];
    var html = '<div class="wrap review"><p class="crumb"><a href="#home">Home</a></p><header class="les-head"><h1>Smart review</h1>' +
      '<p class="muted">Ten mixed questions. Your saved mistakes come first, then the skills you are weakest at or have not seen for a while.</p></header>' +
      '<div class="rv-dots" aria-hidden="true">' + queue.map(function () { return '<span></span>'; }).join('') + '</div>' +
      '<div class="rv-label muted" aria-live="polite"></div><div id="prob-host"></div></div>';
    setView(html);
    var host = document.getElementById('prob-host'), dots = app.querySelectorAll('.rv-dots span'), label = app.querySelector('.rv-label');
    function show() {
      if (i >= queue.length) return summary();
      var it = queue[i];
      label.textContent = 'Question ' + (i + 1) + ' of ' + queue.length + (it.redo ? ' · redo of a past mistake' : '');
      dots.forEach(function (d, k) { d.classList.toggle('cur', k === i); });
      mountProblem(host, it, {
        showLesson: true,
        nextLabel: i === queue.length - 1 ? 'See results →' : 'Next question →',
        onResult: function (ok) { results.push({ it: it, ok: ok }); dots[i].classList.add(ok ? 'ok' : 'no'); },
        onNext: function () { if (results.length <= i) results.push({ it: it, ok: false }); i++; show(); }
      });
    }
    function summary() {
      var ok = results.filter(function (r) { return r.ok; }).length;
      var per = {};
      results.forEach(function (r) { var k = r.it.lid; per[k] = per[k] || { ok: 0, n: 0 }; per[k].n++; if (r.ok) per[k].ok++; });
      var rows = Object.keys(per).map(function (k) { var l = MS.lessons[k]; return '<li><a href="#' + k + '-practice">' + l.code + ' ' + esc(l.title) + '</a><span>' + per[k].ok + ' / ' + per[k].n + '</span></li>'; }).join('');
      host.innerHTML = '<div class="summary"><p class="big-score">' + ok + ' / ' + results.length + '</p><p>' +
        (ok === results.length ? 'Perfect round.' : ok >= results.length * 0.7 ? 'Solid. Practise the lessons with misses below.' : 'Go back to the lessons below and redo the worked examples before practising again.') +
        '</p><ul class="per-les">' + rows + '</ul><div class="hero-actions"><a class="btn primary" href="#review" data-again="1">Another round</a><a class="btn ghost" href="#home">Home</a></div></div>';
      label.textContent = '';
      host.querySelector('[data-again]').addEventListener('click', function (e) { e.preventDefault(); viewReview(); });
    }
    show();
  }

  /* ---------------- Exponential / logarithm graph explorer ---------------- */
  MS.widgets.expLog = function (el) {
    el.innerHTML = '<div class="explorer"><canvas width="560" height="400" aria-label="Graphs of y = b^x and y = log_b x"></canvas>' +
      '<div class="ex-ctrl"><label for="' + el.id + '-b">Base \\(b\\) = <output>2</output></label>' +
      '<input id="' + el.id + '-b" type="range" min="0" max="1" step="0.001" value="0.75">' +
      '<div class="legend"><span class="lg exp">\\(y=b^x\\)</span><span class="lg log">\\(y=\\log_b x\\)</span><span class="lg mir">\\(y=x\\)</span></div>' +
      '<p class="ex-read muted"></p></div></div>';
    typeset(el);
    var cv = el.querySelector('canvas'), sl = el.querySelector('input'), out = el.querySelector('output'), rd = el.querySelector('.ex-read');
    function bOf(v) { var b = v < 0.5 ? 0.2 + (v / 0.5) * 0.75 : 1.08 + ((v - 0.5) / 0.5) * 3.9; return Math.round(b * 100) / 100; }
    function draw() {
      var b = bOf(+sl.value); out.textContent = b;
      var cs = getComputedStyle(document.documentElement);
      var col = function (n) { return cs.getPropertyValue(n).trim() || '#888'; };
      var dpr = window.devicePixelRatio || 1, W = cv.clientWidth || 560, Hh = Math.round(W * 0.72);
      cv.width = W * dpr; cv.height = Hh * dpr; cv.style.height = Hh + 'px';
      var c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var x0 = -4, x1 = 6, y0 = -3.5, y1 = 5.5;
      var X = function (x) { return ((x - x0) / (x1 - x0)) * W; }, Y = function (y) { return Hh - ((y - y0) / (y1 - y0)) * Hh; };
      c.fillStyle = col('--card'); c.fillRect(0, 0, W, Hh);
      c.strokeStyle = col('--grid'); c.lineWidth = 1;
      for (var gx = Math.ceil(x0); gx <= x1; gx++) { c.beginPath(); c.moveTo(X(gx), 0); c.lineTo(X(gx), Hh); c.stroke(); }
      for (var gy = Math.ceil(y0); gy <= y1; gy++) { c.beginPath(); c.moveTo(0, Y(gy)); c.lineTo(W, Y(gy)); c.stroke(); }
      c.strokeStyle = col('--muted'); c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(X(x0), Y(0)); c.lineTo(X(x1), Y(0)); c.moveTo(X(0), Y(y0)); c.lineTo(X(0), Y(y1)); c.stroke();
      c.fillStyle = col('--muted'); c.font = '11px ' + (cs.getPropertyValue('--font-mono') || 'monospace');
      for (var t = Math.ceil(x0); t <= x1; t++) if (t) c.fillText(String(t), X(t) - 3, Y(0) + 13);
      for (var u = Math.ceil(y0); u <= y1; u++) if (u) c.fillText(String(u), X(0) + 5, Y(u) + 4);
      c.setLineDash([5, 5]); c.strokeStyle = col('--muted');
      c.beginPath(); c.moveTo(X(-3.5), Y(-3.5)); c.lineTo(X(5.5), Y(5.5)); c.stroke(); c.setLineDash([]);
      function curve(f, color, from, to) {
        c.strokeStyle = color; c.lineWidth = 2.5; c.beginPath(); var pen = false;
        for (var i = 0; i <= 600; i++) {
          var x = from + ((to - from) * i) / 600, y = f(x);
          if (!isFinite(y) || y < y0 - 2 || y > y1 + 2) { pen = false; continue; }
          if (!pen) { c.moveTo(X(x), Y(y)); pen = true; } else c.lineTo(X(x), Y(y));
        }
        c.stroke();
      }
      curve(function (x) { return Math.pow(b, x); }, col('--accent'), x0, x1);
      curve(function (x) { return Math.log(x) / Math.log(b); }, col('--accent-2'), 0.0005, x1);
      function dot(x, y, color) { c.fillStyle = color; c.beginPath(); c.arc(X(x), Y(y), 4, 0, 7); c.fill(); }
      dot(0, 1, col('--accent')); if (b < y1) dot(1, b, col('--accent'));
      dot(1, 0, col('--accent-2')); if (b < x1) dot(b, 1, col('--accent-2'));
      rd.textContent = (b > 1 ? 'b > 1: both graphs rise. ' : '0 < b < 1: both graphs fall. ') +
        'Exponential passes (0, 1) and (1, ' + b + '); logarithm passes (1, 0) and (' + b + ', 1). Each is the mirror image of the other in y = x.';
    }
    sl.addEventListener('input', draw);
    window.addEventListener('resize', draw);
    if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', draw); }
    draw();
  };

  /* ---------------- Router ---------------- */
  function route() {
    var h = (location.hash || '').replace(/^#/, '');
    if (!h || h === 'home') return viewHome();
    if (h === 'formulas') return viewFormulas();
    if (h === 'review') return viewReview();
    var m = h.match(/^(.*)-(learn|examples|practice)$/);
    if (m && MS.lessons[m[1]]) return viewLesson(m[1], m[2]);
    if (MS.lessons[h]) return viewLesson(h, 'learn');
    viewHome();
  }
  MS.start = function () {
    app = document.getElementById('app');
    window.addEventListener('hashchange', route);
    route();
  };
})();
