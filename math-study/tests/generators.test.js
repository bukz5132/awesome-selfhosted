/* Runs every practice generator many times and checks the answers are
 * well-formed and accepted by the app's own answer checker.
 * Usage: node math-study/tests/generators.test.js */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const ctx = { window: {}, console, Math, Object, String, Number, Array, JSON, isNaN, isFinite, Date };
ctx.window = ctx; vm.createContext(ctx);
for (const f of ['app.js', 'content/topic1.js', 'content/topic2.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
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
console.log(`${total} problems generated, ${fails} failures`);
process.exit(fails ? 1 : 0);
