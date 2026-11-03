/* Runs every practice generator many times and checks the answers are
 * well-formed and accepted by the app's own answer checker.
 * Usage: node math-study/tests/generators.test.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, console, Math, Object, String, Number, Array, JSON, isNaN, isFinite, Date };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['app.js', 'content/topic1.js', 'content/topic2.js', 'exercises.js', 'content/exercises-topic1.js', 'content/exercises-topic2.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const MS = ctx.MS;
const H = MS.h;
let fails = 0, total = 0;
function fail(msg) { fails++; if (fails < 40) console.log('FAIL', msg); }
function asText(P) {
  const f = x => x === Infinity ? 'inf' : x === -Infinity ? '-inf' : String(x);
  if (P.type === 'num') return f(P.ans);
  if (P.type === 'set' || P.type === 'tuple') return P.ans.length ? P.ans.map(f).join(';') : 'none';
  if (P.type === 'ineq') return { op: P.ans.op, v: f(P.ans.v) };
  return P.ans;
}
// parser sanity
const pe = [['3/4', .75], ['2^5', 32], ['ln(1.5)/ln(1.03)', Math.log(1.5) / Math.log(1.03)], ['sqrt(2)', Math.SQRT2], ['e^2.5-4', Math.exp(2.5) - 4], ['-2^2', -4], ['2ln3', 2 * Math.log(3)], ['log_2(8)', 3], ['log2(8)', 3], ['log(1000)', 3], ['1/3', 1 / 3], ['inf', Infinity], ['-inf', -Infinity], ['5730*log(0.76)/log(0.5)', 5730 * Math.log10(.76) / Math.log10(.5)], ['(7*2+1)^2', 225], ['2(3+1)', 8], ['13,72'.replace(',', '.'), 13.72]];
for (const [s, v] of pe) { const u = MS.evalExpr(s); if (!(u === v || Math.abs(u - v) < 1e-9)) fail(`parse ${s} -> ${u}, expected ${v}`); }
for (const id of MS.order) {
  const les = MS.lessons[id];
  for (const k of ['formulas', 'learn', 'examples', 'practice']) if (!les[k] || !les[k].length) fail(`${id} missing ${k}`);
  les.practice.forEach((g, gi) => {
    for (let s = 1; s <= 400; s++) {
      total++;
      let P;
      try { P = MS.buildProblem({ lid: id, gi, seed: s * 7919 }); } catch (e) { fail(`${id}/${g.name} seed ${s}: threw ${e}`); continue; }
      const where = `${id}/${g.name} seed ${s}`;
      if (typeof P.q !== 'string' || /undefined|NaN/.test(P.q)) fail(`${where}: bad question ${P.q}`);
      const all = P.q + (P.sol || []).join(' ') + (P.choices || []).join(' ') + (P.show || '') + (P.prompt || '');
      if (/undefined|NaN|\[object/.test(all)) fail(`${where}: text contains undefined/NaN: ${all.slice(0, 300)}`);
      if (P.type === 'mc' || P.type === 'multi') {
        const uniq = new Set(P.choices);
        if (uniq.size !== P.choices.length) fail(`${where}: duplicate choices ${P.choices.join(' | ')}`);
        const a = P.type === 'mc' ? [P.ans] : P.ans;
        if (a.some(i => !(i >= 0 && i < P.choices.length))) fail(`${where}: answer index out of range`);
      } else if (P.type === 'num') {
        if (typeof P.ans !== 'number' || Number.isNaN(P.ans)) fail(`${where}: bad numeric answer ${P.ans}`);
      } else if (P.type === 'set' || P.type === 'tuple') {
        if (!Array.isArray(P.ans) || P.ans.some(x => typeof x !== 'number' || Number.isNaN(x))) fail(`${where}: bad list answer`);
      } else if (P.type === 'ineq') {
        if (!['<', '<=', '>', '>='].includes(P.ans.op) || !isFinite(P.ans.v)) fail(`${where}: bad ineq answer`);
      } else fail(`${where}: unknown type ${P.type}`);
      const r = MS.checkAnswer(P, asText(P));
      if (!r.ok) fail(`${where}: own answer rejected (${JSON.stringify(asText(P))})`);
      // a rounded-to-2-decimals answer should be accepted for numeric answers
      if (P.type === 'num' && isFinite(P.ans) && !MS.checkAnswer(P, String(H.round(P.ans, 2))).ok) fail(`${where}: 2-dec rounding rejected ${P.ans}`);
      if (P.type === 'num' && isFinite(P.ans) && MS.checkAnswer(P, String(P.ans + Math.max(1, Math.abs(P.ans) * 0.05))).ok) fail(`${where}: clearly wrong answer accepted`);
    }
  });
}
// exercise sheets: every guided step must be well formed and accept its own answer
let steps = 0;
for (const id of Object.keys(MS.exercises)) {
  const e = MS.exercises[id];
  if (!e.method || !e.method.length) fail(`${id}: no method`);
  for (const [lid, gi] of e.similar || []) if (!MS.lessons[lid] || !MS.lessons[lid].practice[gi]) fail(`${id}: bad similar ${lid}/${gi}`);
  const runs = e.vary ? 150 : 1;
  for (let s = 0; s < runs; s++) {
    let inst;
    try { inst = e.gen(MS.makeRng(s * 104729 + 1), s === 0); } catch (err) { fail(`${id} seed ${s}: threw ${err}`); continue; }
    const where = `${id} seed ${s}`;
    const txt = JSON.stringify(inst, (k, v) => typeof v === 'function' ? undefined : v);
    if (/undefined|NaN|\[object/.test(txt)) fail(`${where}: text contains undefined/NaN`);
    if (!inst.parts.length) fail(`${where}: no parts`);
    let asks = 0;
    for (const p of inst.parts) for (const st of p.steps) {
      if (!st.say) fail(`${where}: step without text`);
      if (!st.ask) continue;
      asks++; steps++;
      const P = st.ask;
      if (P.type === 'mc' || P.type === 'multi') {
        if (new Set(P.choices).size !== P.choices.length) fail(`${where}: duplicate choices`);
        const a = P.type === 'mc' ? [P.ans] : P.ans;
        if (a.some(i => !(i >= 0 && i < P.choices.length))) fail(`${where}: bad mc answer`);
      }
      if (P.type === 'num' && !(typeof P.ans === 'number' && isFinite(P.ans))) fail(`${where}: bad num ${P.ans}`);
      if ((P.type === 'set' || P.type === 'tuple') && P.ans.some(x => !isFinite(x))) fail(`${where}: bad list`);
      if (!MS.checkAnswer(P, asText(P)).ok) fail(`${where}: own answer rejected ${JSON.stringify(asText(P))}`);
    }
    if (!asks) fail(`${where}: nothing to answer`);
  }
}
console.log(`${Object.keys(MS.exercises).length} sheet exercises, ${steps} guided steps checked`);
console.log(`${total} problems generated, ${fails} failures`);
process.exit(fails ? 1 : 0);
