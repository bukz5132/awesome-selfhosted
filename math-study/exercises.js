/* Exercise sheets: every exercise from the course sheets, taught in three steps.
 *   1. How to tackle it  – the method, step by step
 *   2. Together          – the real exercise, solved step by step; you fill in each intermediate result
 *   3. Your turn         – the same kind of exercise with new numbers (or matching practice problems)
 *
 * An exercise is { id, num, title, lesson, method: [html], vary: bool, similar: [[lessonId, skillIndex]],
 *                  gen: function (R, orig) -> { context, parts: [{ label, q, steps: [step] }] } }
 * A step is { say: html, ask: answerSpec | null, show: html }.  answerSpec uses the same types as
 * practice problems (num, set, tuple, ineq, mc, multi).  gen(R, true) must return the numbers from the sheet.
 */
(function () {
  'use strict';
  var H = MS.h, esc = MS.esc, T = String.raw;
  MS.sheets = [];
  MS.exercises = {};
  MS.addSheet = function (sh) {
    MS.sheets.push(sh);
    sh.exercises.forEach(function (e) { e.id = sh.id + '-' + e.num; e.sheet = sh; MS.exercises[e.id] = e; });
  };

  /* ---------- progress ---------- */
  var KEY = 'mba-maths-exercises-v1', X = {};
  try { X = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { X = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(X)); } catch (e) {} }
  function rec(id) { return X[id] || (X[id] = { tog: 0, turn: 0, ok: 0 }); }

  /* ---------- small SVG plotter for graph-matching exercises ---------- */
  MS.plot = function (o) {
    var W = o.w || 360, Hh = o.h || 260, x0 = o.x[0], x1 = o.x[1], y0 = o.y[0], y1 = o.y[1], pad = 18;
    var X_ = function (x) { return pad + ((x - x0) / (x1 - x0)) * (W - 2 * pad); };
    var Y_ = function (y) { return Hh - pad - ((y - y0) / (y1 - y0)) * (Hh - 2 * pad); };
    var s = '<svg class="plot" viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="' + esc(o.label || 'graph') + '">';
    for (var gx = Math.ceil(x0); gx <= x1; gx++) s += '<line class="pg" x1="' + X_(gx) + '" y1="' + Y_(y0) + '" x2="' + X_(gx) + '" y2="' + Y_(y1) + '"/>';
    for (var gy = Math.ceil(y0); gy <= y1; gy++) s += '<line class="pg" x1="' + X_(x0) + '" y1="' + Y_(gy) + '" x2="' + X_(x1) + '" y2="' + Y_(gy) + '"/>';
    s += '<line class="pa" x1="' + X_(x0) + '" y1="' + Y_(0) + '" x2="' + X_(x1) + '" y2="' + Y_(0) + '"/><line class="pa" x1="' + X_(0) + '" y1="' + Y_(y0) + '" x2="' + X_(0) + '" y2="' + Y_(y1) + '"/>';
    for (var t = Math.ceil(x0); t <= x1; t++) if (t && t % (o.tick || 1) === 0) s += '<text class="pt" x="' + X_(t) + '" y="' + (Y_(0) + 12) + '" text-anchor="middle">' + t + '</text>';
    for (var u = Math.ceil(y0); u <= y1; u++) if (u && u % (o.tick || 1) === 0) s += '<text class="pt" x="' + (X_(0) - 4) + '" y="' + (Y_(u) + 4) + '" text-anchor="end">' + u + '</text>';
    s += '<clipPath id="pc' + (o.id || 'x') + '"><rect x="' + pad + '" y="' + pad + '" width="' + (W - 2 * pad) + '" height="' + (Hh - 2 * pad) + '"/></clipPath><g clip-path="url(#pc' + (o.id || 'x') + ')">';
    o.fns.forEach(function (fn, i) {
      var d = '', pen = false, from = fn.from != null ? fn.from : x0, to = fn.to != null ? fn.to : x1;
      for (var k = 0; k <= 400; k++) {
        var x = from + ((to - from) * k) / 400, y = fn.f(x);
        if (!isFinite(y) || y < y0 - 5 || y > y1 + 5) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + X_(x).toFixed(1) + ' ' + Y_(y).toFixed(1); pen = true;
      }
      s += '<path class="pc pc' + (i + 1) + '" d="' + d + '"/>';
    });
    s += '</g>';
    var lx = W - pad - 34, ly = pad + 4;
    s += '<rect class="plg" x="' + (lx - 6) + '" y="' + (ly - 4) + '" width="38" height="' + (o.fns.length * 15 + 6) + '" rx="3"/>';
    o.fns.forEach(function (fn, i) { s += '<line class="pc pc' + (i + 1) + '" x1="' + lx + '" y1="' + (ly + 6 + i * 15) + '" x2="' + (lx + 14) + '" y2="' + (ly + 6 + i * 15) + '"/><text class="pt" x="' + (lx + 18) + '" y="' + (ly + 10 + i * 15) + '">' + fn.name + '</text>'; });
    return '<div class="plot-wrap">' + s + '</svg></div>';
  };

  /* ---------- answer inputs ---------- */
  var uidN = 0;
  function inputHtml(a) {
    var id = 'g' + (++uidN);
    if (a.type === 'mc' || a.type === 'multi') {
      var order = a.keepOrder ? a.choices.map(function (_, i) { return i; }) : shuffle(a.choices.map(function (_, i) { return i; }));
      a._order = order;
      return '<div class="choices small" data-id="' + id + '">' + order.map(function (ci, k) {
        return '<button type="button" class="choice" data-i="' + ci + '" aria-pressed="false"><span class="choice-key">' + 'ABCDEFGH'[k] + '</span><span class="choice-body">' + a.choices[ci] + '</span></button>';
      }).join('') + '</div>';
    }
    if (a.type === 'ineq') {
      return '<div class="ans-row"><span class="ans-prompt">\\(' + (a.v || 'x') + '\\)</span><select class="ans-op" aria-label="Inequality sign"><option value="">sign</option><option value="<">&lt;</option><option value="<=">≤</option><option value=">">&gt;</option><option value=">=">≥</option></select>' +
        '<input class="ans-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="boundary" aria-label="Boundary value"></div>';
    }
    var ph = a.type === 'set' ? 'values, comma separated' : a.type === 'tuple' ? 'e.g. 3, -5' : 'number or expression';
    return '<label class="ans-row">' + (a.prompt ? '<span class="ans-prompt">\\(' + a.prompt + '\\)</span>' : '') +
      '<input class="ans-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + ph + '">' + (a.unit ? '<span class="ans-unit">' + a.unit + '</span>' : '') + '</label>';
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function wireChoices(el, a) {
    var sel = a.type === 'multi' ? [] : null;
    el.querySelectorAll('.choice').forEach(function (b) {
      b.addEventListener('click', function () {
        if (el.classList.contains('locked')) return;
        var i = +b.getAttribute('data-i');
        if (a.type === 'mc') { sel = i; el.querySelectorAll('.choice').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); }); }
        else { var k = sel.indexOf(i); if (k >= 0) sel.splice(k, 1); else sel.push(i); b.setAttribute('aria-pressed', String(k < 0)); }
      });
    });
    return function () { return sel; };
  }
  function readerFor(el, a) {
    if (a.type === 'mc' || a.type === 'multi') return wireChoices(el, a);
    var inp = el.querySelector('.ans-input'), op = el.querySelector('.ans-op');
    if (a.type === 'ineq') return function () { return { op: op.value, v: inp.value }; };
    return function () { return inp.value; };
  }
  function lock(el, a) {
    el.classList.add('locked');
    el.querySelectorAll('input,select').forEach(function (i) { i.disabled = true; });
    if (a.type === 'mc' || a.type === 'multi') {
      el.querySelectorAll('.choice').forEach(function (o) {
        var i = +o.getAttribute('data-i'), right = a.type === 'mc' ? i === a.ans : a.ans.indexOf(i) >= 0;
        if (right) o.classList.add('is-right'); else if (o.getAttribute('aria-pressed') === 'true') o.classList.add('is-wrong');
      });
    }
  }
  function ansText(a) { return MS.answerText(a); }

  /* ---------- one guided part: steps appear one at a time ---------- */
  function mountGuided(host, part, done) {
    var ol = document.createElement('ol'); ol.className = 'gsteps'; host.appendChild(ol);
    var i = 0;
    function next() {
      if (i >= part.steps.length) { if (done) done(); return; }
      var st = part.steps[i++], li = document.createElement('li'); li.className = 'gstep';
      li.innerHTML = '<div class="gsay">' + st.say + '</div>' + (st.ask ? '<div class="gask">' + inputHtml(st.ask) + '</div><div class="gbtns"><button type="button" class="btn primary sm" data-a="check">Check</button><button type="button" class="btn ghost sm" data-a="show">Show me</button></div><div class="gfb" hidden></div>' : '') +
        '<div class="gshow"' + (st.ask ? ' hidden' : '') + '>' + (st.show || '') + '</div>' + (st.ask ? '' : '<div class="gbtns"><button type="button" class="btn sm" data-a="cont">' + (i < part.steps.length ? 'Next step' : 'Finish') + '</button></div>');
      ol.appendChild(li); MS.typeset(li);
      var read = st.ask ? readerFor(li.querySelector('.gask'), st.ask) : null, tries = 0;
      var inp = li.querySelector('.ans-input');
      if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); li.querySelector('[data-a="check"]').click(); } });
      function finishStep(msg, cls) {
        if (st.ask) lock(li.querySelector('.gask'), st.ask);
        li.querySelectorAll('.gbtns').forEach(function (b) { b.remove(); });
        var fb = li.querySelector('.gfb'); if (fb && msg) { fb.hidden = false; fb.className = 'gfb ' + cls; fb.innerHTML = msg; MS.typeset(fb); }
        var sh = li.querySelector('.gshow'); sh.hidden = !sh.innerHTML; li.classList.add('done');
        next();
      }
      li.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-a]'); if (!b) return;
        var act = b.getAttribute('data-a');
        if (act === 'cont') return finishStep();
        if (act === 'show') return finishStep('The answer is ' + ansText(st.ask) + '.', 'info');
        var r = MS.checkAnswer(st.ask, read());
        var fb = li.querySelector('.gfb'); fb.hidden = false;
        if (r.invalid) { fb.className = 'gfb info'; fb.textContent = st.ask.type === 'mc' || st.ask.type === 'multi' ? 'Choose an option first.' : 'Type an answer first (numbers, fractions, ln, log, sqrt, e…).'; return; }
        tries++;
        if (r.ok) return finishStep('<strong>Right.</strong>', 'good');
        if (tries >= 2 || st.ask.type === 'mc') return finishStep('<strong>Not quite.</strong> It is ' + ansText(st.ask) + '.', 'bad');
        fb.className = 'gfb bad'; fb.innerHTML = '<strong>Not quite.</strong> Try once more, or tap “Show me”.';
      });
    }
    next();
  }

  /* ---------- views ---------- */
  var TABS = [['how', 'How to tackle it'], ['together', 'Together'], ['turn', 'Your turn']];

  MS.homeExtra = function (t) {
    var sh = MS.sheets.filter(function (s) { return s.topic === t.id; });
    if (!sh.length) return '';
    return '<h3 class="sheet-h">Exercise sheets</h3><ul class="sheet-list">' + sh.map(function (s) {
      var n = s.exercises.length, d = s.exercises.filter(function (e) { return X[e.id] && X[e.id].tog; }).length;
      return '<li><a class="sheet-row" href="#sheet-' + s.id + '"><span class="ltitle"><strong>' + esc(s.title) + '</strong><span class="lsum">' + esc(s.sub || '') + '</span></span><span class="lpct">' + d + ' / ' + n + ' done together</span></a></li>';
    }).join('') + '</ul>';
  };

  function viewSheet(id) {
    var s = MS.sheets.filter(function (x) { return x.id === id; })[0];
    var html = '<div class="wrap lesson"><p class="crumb"><a href="#home">Home</a></p><header class="les-head"><h1>' + esc(s.title) + '</h1><p class="muted">' + esc(s.sub || '') + '</p></header>' +
      '<p class="intro muted">Each exercise has three steps: how to tackle it, solving it together, then one on your own.</p><ol class="lesson-list ex-list">' +
      s.exercises.map(function (e) {
        var r = X[e.id] || {};
        return '<li><a class="lesson-row" href="#ex-' + e.id + '-how"><span class="lcode">' + esc(e.num) + '</span><span class="ltitle"><strong>' + e.title + '</strong><span class="lsum">' + (e.lesson && MS.lessons[e.lesson] ? 'Lesson ' + MS.lessons[e.lesson].code + ' · ' + esc(MS.lessons[e.lesson].title) : '') + '</span></span>' +
          '<span class="ex-stat">' + (r.tog ? '<span class="pill good">together ✓</span>' : '') + (r.turn ? '<span class="pill">' + r.ok + '/' + r.turn + ' alone</span>' : '') + '</span></a></li>';
      }).join('') + '</ol></div>';
    MS.setView(html);
  }

  function viewExercise(id, tab) {
    var e = MS.exercises[id], s = e.sheet, idx = s.exercises.indexOf(e);
    var prev = s.exercises[idx - 1], nxt = s.exercises[idx + 1];
    var html = '<div class="wrap lesson"><p class="crumb"><a href="#home">Home</a> / <a href="#sheet-' + s.id + '">' + esc(s.title) + '</a></p>' +
      '<header class="les-head"><h1><span class="lcode big">Ex ' + esc(e.num) + '</span> ' + e.title + '</h1></header>' +
      '<nav class="tabs" aria-label="Exercise steps">' + TABS.map(function (tb, i) {
        return '<a href="#ex-' + id + '-' + tb[0] + '" class="tab' + (tb[0] === tab ? ' active' : '') + '"><span class="tnum">' + (i + 1) + '</span>' + tb[1] + '</a>';
      }).join('') + '</nav><div class="tab-body" id="ex-body"></div>' +
      '<nav class="les-pager">' + (prev ? '<a href="#ex-' + prev.id + '-how">← Ex ' + esc(prev.num) + '</a>' : '<span></span>') + (nxt ? '<a href="#ex-' + nxt.id + '-how">Ex ' + esc(nxt.num) + ' →</a>' : '<a href="#sheet-' + s.id + '">Back to the sheet</a>') + '</nav></div>';
    var app = MS.setView(html), body = app.querySelector('#ex-body');

    if (tab === 'how') {
      var les = e.lesson && MS.lessons[e.lesson];
      body.innerHTML = '<section class="note"><h2 class="sec">The method, step by step</h2><ol class="method">' + e.method.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ol></section>' +
        (e.watch ? '<section class="pitfalls"><h2 class="sec">Watch out</h2><ul>' + e.watch.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></section>' : '') +
        (les ? '<p class="muted">Formulas for this: <a href="#' + les.id + '-learn">lesson ' + les.code + ' ' + esc(les.title) + '</a>.</p>' : '') +
        '<div class="next-step"><a class="btn primary" href="#ex-' + id + '-together">Next: solve it together →</a></div>';
      MS.typeset(body);
    }

    if (tab === 'together') {
      var inst = e.gen(MS.makeRng(1), true), left = inst.parts.length;
      body.innerHTML = '<p class="muted intro">This is the exercise from the sheet. Each step tells you what to do; fill in the result and check it before going on.</p>' +
        '<div class="ex-context">' + (inst.context || '') + '</div>';
      inst.parts.forEach(function (p) {
        var sec = document.createElement('section'); sec.className = 'gpart';
        sec.innerHTML = '<h3>' + (p.label ? '<span class="glabel">' + p.label + '</span> ' : '') + '</h3><div class="gq">' + p.q + '</div>';
        body.appendChild(sec);
        mountGuided(sec, p, function () {
          sec.classList.add('complete');
          if (--left === 0) {
            rec(id).tog = 1; save();
            var end = document.createElement('div'); end.className = 'next-step';
            end.innerHTML = '<a class="btn primary" href="#ex-' + id + '-turn">Now your turn →</a>'; body.appendChild(end);
          }
        });
      });
      MS.typeset(body);
    }

    if (tab === 'turn') renderTurn(e, body);
  }

  function renderTurn(e, body) {
    body.innerHTML = '';
    if (e.vary) {
      var inst = e.gen(MS.makeRng(MS.newSeed()), false);
      var head = document.createElement('div');
      head.innerHTML = '<p class="muted intro">The same kind of exercise with new numbers. Answer each part; if you get stuck, open the guided steps for that part.</p><div class="ex-context">' + (inst.context || '') + '</div>';
      body.appendChild(head);
      inst.parts.forEach(function (p) {
        var asks = p.steps.filter(function (s) { return s.ask; });
        if (!asks.length) return;
        var fin = asks[asks.length - 1];
        var sec = document.createElement('section'); sec.className = 'gpart';
        sec.innerHTML = '<h3>' + (p.label ? '<span class="glabel">' + p.label + '</span>' : '') + '</h3><div class="gq">' + p.q + '</div><div class="gask">' + inputHtml(fin.ask) + '</div>' +
          '<div class="gbtns"><button type="button" class="btn primary sm" data-a="check">Check</button><button type="button" class="btn ghost sm" data-a="guide">Show guided steps</button></div><div class="gfb" hidden></div><div class="gguide"></div>';
        body.appendChild(sec);
        var read = readerFor(sec.querySelector('.gask'), fin.ask), tries = 0, counted = false;
        var inp = sec.querySelector('.ans-input');
        if (inp) inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); sec.querySelector('[data-a="check"]').click(); } });
        function count(ok) { if (counted) return; counted = true; var r = rec(e.id); r.turn++; if (ok) r.ok++; save(); }
        sec.addEventListener('click', function (ev) {
          var b = ev.target.closest('button[data-a]'); if (!b || !sec.contains(b)) return;
          var a = b.getAttribute('data-a'), fb = sec.querySelector('.gfb');
          if (a === 'guide') { count(false); sec.querySelector('.gask').hidden = true; sec.querySelector('.gbtns').remove(); fb.hidden = true; mountGuided(sec.querySelector('.gguide'), p); return; }
          if (a !== 'check') return;
          var r = MS.checkAnswer(fin.ask, read()); fb.hidden = false;
          if (r.invalid) { fb.className = 'gfb info'; fb.textContent = 'Give an answer first.'; return; }
          tries++;
          if (r.ok) { count(tries === 1); lock(sec.querySelector('.gask'), fin.ask); fb.className = 'gfb good'; fb.innerHTML = '<strong>Correct.</strong> ' + (fin.show || ''); sec.querySelector('.gbtns').remove(); }
          else if (tries >= 2) { count(false); lock(sec.querySelector('.gask'), fin.ask); fb.className = 'gfb bad'; fb.innerHTML = '<strong>Not quite.</strong> The answer is ' + ansText(fin.ask) + '. Open the guided steps to see how.'; sec.querySelector('[data-a="check"]').remove(); }
          else { fb.className = 'gfb bad'; fb.innerHTML = '<strong>Not quite.</strong> Try again, or open the guided steps.'; }
          MS.typeset(fb);
        });
      });
      var again = document.createElement('div'); again.className = 'next-step';
      again.innerHTML = '<button type="button" class="btn">New numbers</button>';
      again.querySelector('button').addEventListener('click', function () { MS.clearMath(body); renderTurn(e, body); window.scrollTo(0, body.offsetTop - 80); });
      body.appendChild(again);
      MS.typeset(body);
    }
    var sim = (e.similar || []).filter(function (x) { return MS.lessons[x[0]] && MS.lessons[x[0]].practice[x[1]]; });
    if (sim.length) {
      var box = document.createElement('section'); box.className = 'practice';
      box.innerHTML = '<h2 class="sec">' + (e.vary ? 'More practice like this' : 'Similar exercises') + '</h2><p class="muted">' + (e.vary ? '' : 'Fresh problems of the same kind, with worked solutions. ') + 'These count towards the lesson’s mastery bar.</p><div class="sim-host"></div>';
      body.appendChild(box);
      var host = box.querySelector('.sim-host'), last = -1;
      var go = function () {
        var k = sim.length > 1 ? Math.floor(Math.random() * sim.length) : 0; if (k === last && sim.length > 1) k = (k + 1) % sim.length; last = k;
        MS.mountProblem(host, { lid: sim[k][0], gi: sim[k][1], seed: MS.newSeed() }, { showLesson: true, focus: false, onResult: function (ok) { var r = rec(e.id); r.turn++; if (ok) r.ok++; save(); }, onNext: go });
      };
      go();
    }
  }

  MS.routeExtra = function (h) {
    var m = h.match(/^sheet-(.+)$/);
    if (m && MS.sheets.some(function (s) { return s.id === m[1]; })) { viewSheet(m[1]); return true; }
    m = h.match(/^ex-(.+)-(how|together|turn)$/);
    if (m && MS.exercises[m[1]]) { viewExercise(m[1], m[2]); return true; }
    return false;
  };

  /* ---------- helpers for writing exercise content ---------- */
  MS.ex = {
    S: function (say, ask, show) { return { say: say, ask: ask || null, show: show || '' }; },
    N: function (ans, prompt, extra) { var a = { type: 'num', ans: ans, prompt: prompt || '' }; for (var k in extra || {}) a[k] = extra[k]; return a; },
    SET: function (ans, prompt) { return { type: 'set', ans: ans, prompt: prompt || '' }; },
    TUP: function (ans, prompt) { return { type: 'tuple', ans: ans, prompt: prompt || '' }; },
    INEQ: function (op, v, varName) { return { type: 'ineq', ans: { op: op, v: v }, v: varName || 'x' }; },
    MC: function (choices, ans, keep) { return { type: 'mc', choices: choices, ans: ans || 0, keepOrder: !!keep }; },
    YN: function (yes) { return { type: 'mc', choices: ['Yes', 'No'], ans: yes ? 0 : 1, keepOrder: true }; }
  };
})();
