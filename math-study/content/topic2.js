/* Topic 2 — Functions: basic concepts and applications (MB A, slides 2.1–2.7) */
(function () {
  'use strict';
  var T = String.raw, H = MS.h, fmt = H.fmt, iv = H.iv;
  var INF = Infinity;
  function P(s) { return T`\(${s}\)`; }

  /* ===================== 2.1 Definitions ===================== */
  var def = {
    id: 'func-def', code: '2.1', title: 'Functions: definitions',
    summary: 'Function, graph, intercepts, domain and range.',
    formulas: [
      { n: 'Function', t: T`f:\mathbb R\to\mathbb R:\ x\mapsto y=f(x)`, note: 'Each input gets at most one output.' },
      { n: 'Graph', t: T`\{(x,y)\mid y=f(x)\}`, note: 'Vertical line test: every vertical line meets the curve at most once.' },
      { n: 'Intercepts', t: T`\begin{aligned}y\text{-intercept}&:\ f(0)\\ \text{zeros}&:\ f(x)=0\end{aligned}` },
      { n: 'Domain restrictions', t: T`\begin{aligned}\tfrac{\cdots}{B}&:\ B\neq0\\ \sqrt{A}&:\ A\ge0\\ \log A&:\ A>0\end{aligned}`, note: 'Plus restrictions from the context (prices, quantities ≥ 0).' },
      { n: 'Domain & range', t: T`\begin{aligned}\operatorname{dom}f&=\text{all inputs}\\ \operatorname{im}f&=\text{all outputs}\end{aligned}` },
      { n: 'Interval notation', t: T`[a,b]\ \text{closed},\quad ]a,b[\ \text{open},\quad \mathbb R\setminus\{a\}` },
      { n: 'Equal functions', t: T`f=g\iff\begin{cases}\operatorname{dom}f=\operatorname{dom}g\\ f(x)=g(x)\ \text{for all }x\end{cases}` }
    ],
    learn: [
      { h: 'Function, variables, function value', body: T`<p>A juice factory produces \(q\) (×1000 litre) per day at cost \(c=2q^3-24q^2+102q+100\) (×€10). The cost <em>depends on</em> the quantity: \(c\) is the dependent variable, \(q\) the independent one. In pure maths we use \(x\) and \(y\).</p>
<p>Think of a function as a machine: input \(q=5\), output \(c=260\). We write \(f(5)=260\): the function value at 5 is 260.</p>
<p>A function can be given by an <strong>equation</strong>, a <strong>table</strong> or a <strong>graph</strong>.</p>` },
      { h: 'Graphs and the vertical line test', body: T`<p>The graph of \(f\) is the set of points \((x,f(x))\). Not every curve is a graph: the circle \(x^2+y^2=25\) gives \(x=3\) two outputs (\(y=4\) and \(y=-4\)). If every vertical line meets the curve at most once, it is the graph of a function.</p>
<p>A graph has at most one \(y\)-intercept (\(x=0\) has one output) but can have many zeros. For \(y=x^2-4x+3\): \(y\)-intercept 3, zeros 1 and 3.</p>
<p>Know these by heart: \(y=x,\ x^2,\ x^3,\ \sqrt x,\ \frac1x,\ |x|,\ b^x,\ \log_bx\).</p>
<div class="table-wrap"><table class="mini"><thead><tr><th>Function</th><th>Domain</th><th>Range</th></tr></thead><tbody>
<tr><td>\(x\), \(x^3\)</td><td>\(\mathbb R\)</td><td>\(\mathbb R\)</td></tr>
<tr><td>\(x^2\), \(|x|\)</td><td>\(\mathbb R\)</td><td>\([0,+\infty[\)</td></tr>
<tr><td>\(\sqrt x\)</td><td>\([0,+\infty[\)</td><td>\([0,+\infty[\)</td></tr>
<tr><td>\(\frac1x\)</td><td>\(\mathbb R\setminus\{0\}\)</td><td>\(\mathbb R\setminus\{0\}\)</td></tr>
<tr><td>\(e^x\), \(b^x\)</td><td>\(\mathbb R\)</td><td>\(]0,+\infty[\)</td></tr>
<tr><td>\(\ln x\), \(\log_bx\)</td><td>\(]0,+\infty[\)</td><td>\(\mathbb R\)</td></tr></tbody></table></div>` },
      { h: 'Finding the domain', body: T`<p>Check two sources of restrictions:</p><ol><li><strong>Context</strong>: a quantity or price cannot be negative.</li><li><strong>The equation</strong>: no division by zero, no square root of a negative number, no log of zero or a negative number.</li></ol>
<p>Example: profit \(P(q)=-0.25q^2+3.9q-2.25\) with demand \(p=4-0.25q\). Context: \(q\ge0\) and \(p\ge0\Rightarrow q\le16\), so the domain is \([0,16]\) and the range is \([-3.85,\,12.96]\). Without context the domain would be \(\mathbb R\) and the range \(\mathopen{]}-\infty,12.96]\).</p>` }
    ],
    pitfalls: [
      T`Forgetting context restrictions: a demand or price must be \(\ge0\).`,
      T`Using \(\ge\) for a log: \(\log A\) needs \(A>0\) strictly, \(\sqrt A\) allows \(A=0\).`,
      T`\(\sqrt{x^2}\) is \(|x|\), not \(x\).`,
      T`Writing the interval endpoints in the wrong order or the brackets the wrong way: \(\mathopen{]}-\infty,3[\) never has a closed bracket at \(\infty\).`
    ],
    examples: [
      { t: 'Domain with two restrictions', p: T`Find the domain of \(y=\dfrac{\log(1-2x)}{x+1}\).`, s: [
        T`No context, so only the equation restricts.`,
        T`Log: \(1-2x>0\iff x<\tfrac12\). Denominator: \(x+1\neq0\iff x\neq-1\).`,
        T`Together: \(\operatorname{dom}f=\,\mathopen{]}-\infty,-1[\,\cup\,\mathopen{]}-1,\tfrac12[\).`] },
      { t: 'Domain with an exponential inside a log', p: T`Find the domain of \(f(x)=\log_2(8-2^x)\). Then do the same for the demand function \(q=\log_2(8-2^p)\).`, s: [
        T`\(8-2^x>0\iff2^x<8\iff x<3\) (apply \(\log_2\), increasing). So \(\operatorname{dom}f=\,\mathopen{]}-\infty,3[\).`,
        T`Context for demand: \(p\ge0\) and \(q\ge0\).`,
        T`\(q\ge0\iff\log_2(8-2^p)\ge0\iff8-2^p\ge1\iff2^p\le7\iff p\le\log_27\).`,
        T`Domain of the demand function: \([0,\log_27]\).`] },
      { t: 'Profit function', p: T`Demand: \(p=4-0.25q\). Fixed cost 2.25, variable cost 0.1 per unit. Find the profit function \(P(q)\) if all production is sold.`, s: [
        T`Profit = revenue − cost: \(P=p\cdot q-(2.25+0.1q)\).`,
        T`\(P=(4-0.25q)q-2.25-0.1q=-0.25q^2+3.9q-2.25\).`,
        T`Domain from the context: \(q\ge0\) and \(p\ge0\), so \([0,16]\).`] },
      { t: 'Range from the graph', p: T`Find the range of \(y=x^2+1\).`, s: [
        T`\(x^2\ge0\) for all \(x\), so \(y\ge1\), with \(y=1\) at \(x=0\).`,
        T`\(\operatorname{im}f=[1,+\infty[\).`] },
      { t: 'Equal functions?', p: T`Are \(f(x)=\sqrt{x^2}\) and \(g(x)=x\) equal? And \(f(x)=\left(\sqrt x\right)^2\) and \(g(x)=x\)?`, s: [
        T`First pair: both have domain \(\mathbb R\), but \(f(-5)=5\) and \(g(-5)=-5\). Not equal.`,
        T`Second pair: \(\operatorname{dom}f=[0,+\infty[\) but \(\operatorname{dom}g=\mathbb R\). Not equal.`] }
    ],
    practice: [
      { name: 'Function value', gen: function (R) {
        var cs = [R.int(-2, 3), R.int(-5, 5), R.int(-9, 9), R.int(-10, 20)];
        if (cs[0] === 0) cs[0] = 2;
        var x = R.int(-3, 4), v = cs[0] * x * x * x + cs[1] * x * x + cs[2] * x + cs[3];
        return { q: T`Let \(f(x)=${H.poly(cs)}\). Compute \(f(${x})\).`, type: 'num', ans: v, prompt: T`f(${x})=`,
          sol: [T`Substitute \(x=${x}\) everywhere: \(${cs[0]}\cdot(${x})^3+(${cs[1]})\cdot(${x})^2+(${cs[2]})\cdot(${x})+(${cs[3]})\).`, T`\(=${cs[0] * x * x * x}+${cs[1] * x * x}+${cs[2] * x}+${cs[3]}=${v}\).`] };
      } },
      { name: 'Zeros (x-intercepts)', gen: function (R) {
        var r1 = R.int(-6, 6), r2 = R.int(-6, 6); while (r2 === r1) r2 = R.int(-6, 6);
        var a = R.pick([1, 1, 2, -1]);
        var cs = [a, -a * (r1 + r2), a * r1 * r2];
        return { q: T`Find all zeros of \(f(x)=${H.poly(cs)}\).`, type: 'set', ans: [r1, r2], hint: 'Set f(x) = 0 and factor (or use the quadratic formula).',
          sol: [a !== 1 ? T`Divide by ${a}: \(${H.poly([1, -(r1 + r2), r1 * r2])}=0\).` : T`Solve \(${H.poly(cs)}=0\).`, T`Factor: \((${H.lin(r1)})(${H.lin(r2)})=0\).`, T`Zeros: \(x=${Math.min(r1, r2)}\) and \(x=${Math.max(r1, r2)}\).`] };
      } },
      { name: 'Find the domain', gen: function (R) {
        var kind = R.pick(['sqrt', 'log', 'frac', 'logfrac', 'sqrtfrac', 'logexp']);
        var choices, ans = 0, q, sol;
        if (kind === 'sqrt' || kind === 'log') {
          var a = R.pick([1, 2, 3, -1, -2]), x0 = R.int(-5, 6), b = -a * x0;
          var inner = (a === 1 ? '' : a === -1 ? '-' : a) + 'x' + (b ? ' ' + H.signed(b) : '');
          var strict = kind === 'log', right = a > 0;
          var opts = [[right, !strict], [right, strict], [!right, !strict], [!right, strict]];
          choices = opts.map(function (o) { return P(o[0] ? iv(x0, INF, o[1], false) : iv(-INF, x0, false, o[1])); });
          q = T`Find the domain of \(f(x)=${kind === 'sqrt' ? T`\sqrt{${inner}}` : T`\ln(${inner})`}\).`;
          sol = [T`${kind === 'sqrt' ? 'A square root needs a non-negative argument' : 'A log needs a strictly positive argument'}: \(${inner}${strict ? '>' : T`\ge`}0\).`,
            T`Solve: \(x${right ? (strict ? '>' : T`\ge`) : (strict ? '<' : T`\le`)}${x0}\)${a < 0 ? ' (dividing by a negative number flips the sign)' : ''}.`, T`Domain: ${choices[0]}.`];
        } else if (kind === 'frac') {
          var p = R.nz(-6, 6), c = R.nz(-5, 5);
          choices = [P(T`\mathbb R\setminus\{${p}\}`), P(T`\mathbb R\setminus\{${-p}\}`), P(iv(p, INF, false, false)), P(T`\mathbb R`)];
          q = T`Find the domain of \(f(x)=\dfrac{${c}}{${H.lin(p)}}\).`;
          sol = [T`The denominator cannot be 0: \(${H.lin(p)}\neq0\iff x\neq${p}\).`, T`Domain: \(\mathbb R\setminus\{${p}\}\).`];
        } else if (kind === 'logfrac') {
          var p2 = R.int(-5, 3), c2 = p2 + R.int(1, 5);
          choices = [P(iv(-INF, p2) + T`\cup` + iv(p2, c2)), P(iv(-INF, c2)), P(iv(-INF, p2) + T`\cup` + iv(p2, c2, false, true)), P(iv(p2, c2))];
          q = T`Find the domain of \(f(x)=\dfrac{\log(${c2} - x)}{${H.lin(p2)}}\).`;
          sol = [T`Log: \(${c2}-x>0\iff x<${c2}\).`, T`Denominator: \(x\neq${p2}\).`, T`Together: ${choices[0]}.`];
        } else if (kind === 'sqrtfrac') {
          var p3 = R.int(-5, 3), q3 = p3 + R.int(1, 5);
          choices = [P(iv(p3, q3, true, false) + T`\cup` + iv(q3, INF)), P(iv(p3, INF, true)), P(iv(p3, q3) + T`\cup` + iv(q3, INF)), P(T`\mathbb R\setminus\{${q3}\}`)];
          q = T`Find the domain of \(f(x)=\dfrac{\sqrt{${H.lin(p3)}}}{${H.lin(q3)}}\).`;
          sol = [T`Root: \(${H.lin(p3)}\ge0\iff x\ge${p3}\).`, T`Denominator: \(x\neq${q3}\).`, T`Together: ${choices[0]}.`];
        } else {
          var B = R.pick([2, 3]), n = R.pick([2, 3]), Bn = Math.pow(B, n);
          choices = [P(iv(-INF, n)), P(iv(-INF, n, false, true)), P(iv(n, INF)), P(iv(-INF, Bn))];
          q = T`Find the domain of \(f(x)=\log_{${B}}\left(${Bn}-${B}^x\right)\).`;
          sol = [T`\(${Bn}-${B}^x>0\iff${B}^x<${Bn}=${B}^{${n}}\).`, T`Apply \(\log_{${B}}\) (increasing): \(x<${n}\).`, T`Domain: ${choices[0]}.`];
        }
        return { q: q, type: 'mc', choices: choices, ans: ans, sol: sol };
      } },
      { name: 'Find the range', gen: function (R) {
        var c = R.int(-5, 6), a = R.int(-4, 4), kind = R.pick(['sq', 'negsq', 'exp', 'abs', 'negexp']);
        var f, right, closed;
        if (kind === 'sq') { f = T`(${H.lin(a)})^2${c ? H.signed(c) : ''}`; right = true; closed = true; }
        if (kind === 'negsq') { f = T`-(${H.lin(a)})^2${c ? H.signed(c) : ''}`; right = false; closed = true; }
        if (kind === 'abs') { f = T`|${H.lin(a)}|${c ? H.signed(c) : ''}`; right = true; closed = true; }
        if (kind === 'exp') { f = T`e^{x}${c ? H.signed(c) : ''}`; right = true; closed = false; }
        if (kind === 'negexp') { f = T`${c ? c : ''}-2^{x}`; right = false; closed = false; }
        var opts = [[right, closed], [right, !closed], [!right, closed], [!right, !closed]];
        var choices = opts.map(function (o) { return P(o[0] ? iv(c, INF, o[1]) : iv(-INF, c, false, o[1])); });
        var why = { sq: T`A square is \(\ge0\) and equals 0 at \(x=${a}\), so \(y\ge${c}\).`, negsq: T`\(-(\ldots)^2\le0\), equal to 0 at \(x=${a}\), so \(y\le${c}\).`, abs: T`\(|\ldots|\ge0\), equal to 0 at \(x=${a}\), so \(y\ge${c}\).`,
          exp: T`\(e^x>0\) and gets arbitrarily close to 0, but never reaches it, so \(y>${c}\).`, negexp: T`\(2^x>0\), so \(-2^x<0\) (never 0), so \(y<${c}\).` };
        return { q: T`What is the range of \(y=${f}\)?`, type: 'mc', choices: choices, ans: 0, sol: [why[kind], T`Range: ${choices[0]}.`] };
      } },
      { name: 'y-intercept', gen: function (R) {
        var kind = R.pick(['exp', 'rat', 'log']);
        if (kind === 'exp') {
          var A = R.pick([2, 3, 5, -2]), b = R.pick([2, 3, 0.5]), c = R.int(-6, 6);
          return { q: T`Find the \(y\)-intercept of \(f(x)=${A}\cdot${fmt(b)}^{x}${c ? H.signed(c) : ''}\).`, type: 'num', ans: A + c, prompt: 'f(0)=',
            sol: [T`Set \(x=0\): \(${fmt(b)}^0=1\).`, T`\(f(0)=${A}\cdot1${c ? H.signed(c) : ''}=${A + c}\).`] };
        }
        if (kind === 'rat') {
          var a = R.nz(-5, 5), bb = R.nz(-9, 9), cc = R.nz(-4, 4), d = R.nz(-6, 6);
          return { q: T`Find the \(y\)-intercept of \(f(x)=\dfrac{${H.poly([a, bb])}}{${H.poly([cc, d])}}\).`, type: 'num', ans: bb / d, prompt: 'f(0)=', show: T`\(f(0)=${H.frac(bb, d)}\)`,
            sol: [T`\(f(0)=\dfrac{${bb}}{${d}}=${H.frac(bb, d)}\).`] };
        }
        var k = R.pick([2, 10]), m = R.pick([1, 4, 8, 16, 100]); if (k === 10) m = R.pick([1, 10, 100, 1000]); if (k === 2) m = R.pick([1, 2, 4, 8, 16]);
        var c2 = R.int(-4, 4), val = Math.round(Math.log(m) / Math.log(k)) + c2;
        return { q: T`Find the \(y\)-intercept of \(f(x)=\log_{${k}}(x+${m})${c2 ? H.signed(c2) : ''}\).`, type: 'num', ans: val, prompt: 'f(0)=',
          sol: [T`\(f(0)=\log_{${k}}${m}${c2 ? H.signed(c2) : ''}\).`, T`\(\log_{${k}}${m}=${Math.round(Math.log(m) / Math.log(k))}\), so \(f(0)=${val}\).`] };
      } },
      { name: 'Equal functions?', gen: function (R) {
        var pool = [
          [T`\sqrt{x^2}`, T`|x|`, 0, T`Both have domain \(\mathbb R\) and \(\sqrt{x^2}=|x|\) for every \(x\).`],
          [T`\sqrt{x^2}`, 'x', 2, T`Same domain \(\mathbb R\), but \(f(-5)=5\neq g(-5)=-5\).`],
          [T`\left(\sqrt x\right)^2`, 'x', 1, T`\(\operatorname{dom}f=[0,+\infty[\) but \(\operatorname{dom}g=\mathbb R\).`],
          [T`\frac{x^2}{x}`, 'x', 1, T`\(\operatorname{dom}f=\mathbb R\setminus\{0\}\) but \(\operatorname{dom}g=\mathbb R\).`],
          [T`\ln\left(x^2\right)`, T`2\ln x`, 1, T`\(\ln(x^2)\) is defined for all \(x\neq0\), \(2\ln x\) only for \(x>0\).`],
          [T`\ln\left(e^x\right)`, 'x', 0, T`\(e^x>0\) always, so the domain is \(\mathbb R\) for both, and \(\ln e^x=x\).`],
          [T`e^{\ln x}`, 'x', 1, T`\(\operatorname{dom}f=]0,+\infty[\) but \(\operatorname{dom}g=\mathbb R\).`],
          [T`(x+1)^2`, T`x^2+2x+1`, 0, T`It is the same expression expanded, domain \(\mathbb R\) for both.`],
          [T`|x|`, 'x', 2, T`Same domain, but \(f(-1)=1\neq g(-1)=-1\).`]
        ];
        var it = R.pick(pool);
        return { q: T`Are \(f(x)=${it[0]}\) and \(g(x)=${it[1]}\) equal functions?`, type: 'mc', keepOrder: true,
          choices: ['Yes, they are equal', 'No: the domains are different', 'No: same domain, but different values'], ans: it[2], sol: [it[3]] };
      } },
      { name: 'Profit function', gen: function (R) {
        var a = R.pick([4, 6, 8, 10]), b = R.pick([0.25, 0.5, 1]), F = R.pick([2, 2.25, 5, 8]), v = R.pick([0.1, 0.5, 1]);
        var cs = [-b, a - v, -F], qmax = a / b, ask = R.chance() ? 'P' : 'max';
        var q0 = R.int(1, Math.floor(qmax) - 1), Pq = -b * q0 * q0 + (a - v) * q0 - F;
        var steps = [T`\(P=p\cdot q-(${F}+${v}q)=(${a}-${b === 1 ? '' : b}q)q-${F}-${v}q\).`, T`\(P(q)=${H.poly(cs, 'q')}\).`];
        if (ask === 'P') return { q: T`Demand: \(p=${a}-${b === 1 ? '' : b}q\). Fixed cost ${F}, variable cost ${v} per unit; everything produced is sold. Compute the profit \(P(${q0})\).`, type: 'num', ans: Pq, prompt: T`P(${q0})=`,
          hint: 'Profit = price · quantity − (fixed + variable cost).', sol: steps.concat([T`\(P(${q0})=${fmt(Pq)}\).`]) };
        return { q: T`Demand: \(p=${a}-${b === 1 ? '' : b}q\). What is the largest quantity \(q\) in the domain of the profit function (price and quantity cannot be negative)?`, type: 'num', ans: qmax, prompt: 'q_{max}=',
          sol: [T`Context: \(q\ge0\) and \(p=${a}-${b === 1 ? '' : b}q\ge0\).`, T`\(${b === 1 ? '' : b}q\le${a}\iff q\le${fmt(qmax)}\). Domain \([0,${fmt(qmax)}]\).`] };
      } }
    ],
    course: [
      { q: T`Find the domain of \(y=\dfrac{\log(1-2x)}{x+1}\).`, a: T`\(\mathopen{]}-\infty,-1[\,\cup\,\mathopen{]}-1,\tfrac12[\)` },
      { q: T`Find the range of \(y=x^2+1\).`, a: T`\([1,+\infty[\)` },
      { q: T`a) Domain of \(f(x)=\log_2(8-2^x)\). b) Domain of the demand function \(q=\log_2(8-2^p)\).`, a: T`a) \(\mathopen{]}-\infty,3[\) b) \([0,\log_27]\)` },
      { q: T`Find domain and range of \(y=x,\ x^2,\ x^3,\ \sqrt x,\ \frac1x,\ |x|,\ \ln x,\ e^x\).`, a: T`See the table in “Formulas & ideas”.` }
    ]
  };

  /* ===================== 2.2 Types of functions ===================== */
  var types = {
    id: 'func-types', code: '2.2', title: 'Types of functions',
    summary: 'Polynomial, rational and case-defined functions.',
    formulas: [
      { n: 'Polynomial of degree n', t: T`y=c_nx^n+\dots+c_1x+c_0`, note: T`\(n\) a non-negative integer, \(c_n\neq0\) the leading coefficient.` },
      { n: 'Special cases', t: T`\begin{aligned}n=0&:\ \text{constant}\\ n=1&:\ \text{linear}\\ n=2&:\ \text{quadratic}\end{aligned}` },
      { n: 'Rational function', t: T`y=\frac{P(x)}{Q(x)},\quad P,Q\ \text{polynomials}` },
      { n: 'Case-defined function', t: T`f(x)=\begin{cases}f_1(x)&\text{if } x<a\\ f_2(x)&\text{if } x\ge a\end{cases}` }
    ],
    learn: [
      { h: 'Polynomials', body: T`<p>Only whole, non-negative powers of \(x\) with real coefficients. \(\frac{3x^4-5x+9}{7}\) is a polynomial of degree 4 (dividing by a number is fine). \(3x^{3/2}+5x^{1/2}\) is not (fractional powers), and neither is \(\frac7{5x^2}\) (\(x\) in the denominator). \(y=2024\) has degree 0, \(f(s)=s\) degree 1.</p>` },
      { h: 'Rational functions', body: T`<p>A quotient of two polynomials, e.g. \(\frac{3x^4-2x^3+7x^2+5x+9}{5x^2-3x+1}\) or \(\frac7{5x^2}\). Every polynomial is also rational (divide by 1).</p>` },
      { h: 'Case-defined functions', body: T`<p>Different formulas on different parts of the domain. To evaluate, first find which case the input belongs to.</p>
<p>\(f(x)=\begin{cases}2x-1&x<1\\x^2-2x&1\le x<3\end{cases}\): \(f(0)=-1\), \(f(1)=1-2=-1\), \(f(2)=0\). \(f(3)\) does not exist.</p>
<p>Car lease: €15000 for 4 years including 20000 km, €0.50 per extra km:
\(A(d)=\begin{cases}15000&0\le d\le20000\\15000+0.5(d-20000)&d>20000\end{cases}\), and the second line simplifies to \(5000+0.5d\).</p>` }
    ],
    pitfalls: [
      T`\(\sqrt x\), \(x^{-1}\) and \(x^{3/2}\) are not polynomial terms.`,
      T`The degree is the highest power that actually appears, wherever it is written in the expression.`,
      T`At a boundary point, check which case has \(\le\) or \(\ge\).`
    ],
    examples: [
      { t: 'Classify', p: T`Which are polynomials? \(3x^{3/2}+5x^{1/2}\); \(\frac{3x^4-5x+9}{7}\); \(\frac7{5x^2}\); \(2024\); \(f(s)=s\).`, s: [
        T`\(3x^{3/2}+5x^{1/2}\): no, fractional powers.`, T`\(\frac{3x^4-5x+9}7\): yes, degree 4, leading coefficient \(\frac37\).`, T`\(\frac7{5x^2}\): no, it is rational.`, T`\(2024\): yes, degree 0. \(f(s)=s\): yes, degree 1.`] },
      { t: 'Evaluate a case-defined function', p: T`\(f(x)=\begin{cases}2x-1&x<1\\x^2-2x&1\le x<3\end{cases}\). Find \(f(0)\), \(f(1)\), \(f(2)\).`, s: [
        T`\(0<1\): first case, \(f(0)=-1\).`, T`\(x=1\) belongs to \(1\le x<3\): \(f(1)=1-2=-1\).`, T`\(f(2)=4-4=0\).`] },
      { t: 'Car lease', p: T`A 4-year lease costs €15000 including 20000 km; every extra km costs €0.50. Write \(A(d)\) and compute \(A(26000)\).`, s: [
        T`Up to 20000 km: \(A=15000\).`, T`Above: \(A=15000+0.5(d-20000)=5000+0.5d\).`, T`\(A(26000)=5000+13000=18000\) euro.`] }
    ],
    practice: [
      { name: 'Classify a function', gen: function (R) {
        var pool = [
          [T`y=\frac{3x^4-5x+9}{7}`, 0, 'Only whole powers; dividing by 7 is just a coefficient.'], [T`y=2024`, 0, 'A constant: polynomial of degree 0.'], [T`y=1-99x^{10}`, 0, 'Whole powers, degree 10.'], [T`y=(x-1)(x+2)`, 0, 'Expands to x² + x − 2.'], [T`y=\sqrt2\,x^3-x`, 0, 'Coefficients may be any real number.'],
          [T`y=\frac{7}{5x^2}`, 1, 'x appears in the denominator: quotient of polynomials.'], [T`y=\frac{x+1}{x-3}`, 1, 'Quotient of two polynomials.'], [T`y=\frac{3x^2+1}{x^2+1}`, 1, 'Quotient of two polynomials.'], [T`y=x^{-2}`, 1, 'x⁻² = 1/x²: rational.'],
          [T`y=3x^{3/2}+5x^{1/2}`, 2, 'Fractional powers: not a polynomial, not a quotient of polynomials.'], [T`y=\sqrt{x}+1`, 2, 'A root of x is not a polynomial term.'], [T`y=2^x`, 2, 'Exponential: x in the exponent.'], [T`y=\ln x`, 2, 'Logarithmic.']
        ];
        var it = R.pick(pool);
        return { q: T`What kind of function is \(${it[0]}\)?`, type: 'mc', keepOrder: true, choices: ['Polynomial', 'Rational (but not a polynomial)', 'Neither'], ans: it[1], sol: [it[2]] };
      } },
      { name: 'Degree & leading coefficient', gen: function (R) {
        var n = R.int(3, 8), lead = R.nz(-9, 9), terms = [[lead, n]];
        var used = {}; used[n] = 1;
        for (var i = 0; i < 3; i++) { var p = R.int(0, n - 1); if (used[p]) continue; used[p] = 1; terms.push([R.nz(-9, 9), p]); }
        terms = R.shuffle(terms);
        var s = '';
        terms.forEach(function (t) {
          var a = Math.abs(t[0]), body = t[1] === 0 ? String(a) : (a === 1 ? '' : a) + 'x' + (t[1] > 1 ? '^{' + t[1] + '}' : '');
          s += s === '' ? (t[0] < 0 ? '-' : '') + body : (t[0] < 0 ? ' - ' : ' + ') + body;
        });
        var askDeg = R.chance();
        return { q: T`For \(y=${s}\), what is the ${askDeg ? 'degree' : 'leading coefficient'}?`, type: 'num', ans: askDeg ? n : lead, prompt: askDeg ? 'n=' : 'c_n=',
          sol: [T`The highest power is \(x^{${n}}\), with coefficient \(${lead}\).`, askDeg ? T`Degree ${n}.` : T`Leading coefficient ${lead}.`] };
      } },
      { name: 'Evaluate a case-defined function', gen: function (R) {
        var p = R.int(-2, 3), a = R.nz(-4, 4), b = R.int(-6, 6), c = R.nz(-3, 3), d = R.int(-6, 6);
        var x = R.pick([p, p - R.int(1, 3), p + R.int(1, 3)]), le = R.chance();
        var first = le ? x <= p : x < p;
        var v = first ? a * x + b : c * x * x + d;
        return { q: T`\(f(x)=\begin{cases}${H.poly([a, b])}&\text{if } x${le ? T`\le` : '<'}${p}\\ ${H.poly([c, 0, d])}&\text{if } x${le ? '>' : T`\ge`}${p}\end{cases}\). Compute \(f(${x})\).`,
          type: 'num', ans: v, prompt: T`f(${x})=`, hint: 'First decide which case x belongs to; check ≤ versus < at the boundary.',
          sol: [T`\(x=${x}\) ${first ? 'satisfies the first condition' : 'satisfies the second condition'}.`, first ? T`\(f(${x})=${a}\cdot(${x})${H.signed(b)}=${v}\).` : T`\(f(${x})=${c}\cdot(${x})^2${H.signed(d)}=${v}\).`] };
      } },
      { name: 'Tariff word problem', gen: function (R) {
        var F = R.pick([12000, 15000, 20000]), K = R.pick([15000, 20000, 30000]), e = R.pick([0.25, 0.4, 0.5]);
        if (R.chance(0.65)) {
          var d = R.pick([K - 5000, K + 2000, K + 8000, K + 16000, K]);
          var A = d <= K ? F : F + e * (d - K);
          return { q: T`A 4-year car lease costs €${F} including ${K} km. Every km above that costs €${e}. How much do you pay in total after ${d} km?`, type: 'num', ans: A, prompt: 'A=', unit: 'euro',
            sol: [T`\(A(d)=\begin{cases}${F}&0\le d\le${K}\\ ${F}+${e}(d-${K})&d>${K}\end{cases}\)`, d <= K ? T`\(${d}\le${K}\): \(A=${F}\).` : T`\(A=${F}+${e}\cdot${d - K}=${fmt(A)}\).`] };
        }
        var extra = R.pick([1000, 2500, 4000]), dd = K + extra / e;
        return { q: T`A 4-year car lease costs €${F} including ${K} km; every extra km costs €${e}. The total bill was €${F + extra}. How many km were driven?`, type: 'num', ans: dd, prompt: 'd=', unit: 'km',
          sol: [T`The bill is above €${F}, so \(d>${K}\): \(${F}+${e}(d-${K})=${F + extra}\).`, T`\(d-${K}=\frac{${extra}}{${e}}=${fmt(extra / e)}\), so \(d=${fmt(dd)}\) km.`] };
      } }
    ],
    course: [
      { q: T`Are these polynomials? \(3x^{3/2}+5x^{1/2}\), \(\frac{3x^4-5x+9}7\), \(\frac7{5x^2}\), \(2024\), \(f(s)=s\).`, a: T`No; yes (degree 4); no; yes (degree 0); yes (degree 1).` },
      { q: T`Give \(A(d)\) for the car lease (€15000 incl. 20000 km, €0.50 per extra km).`, a: T`\(A(d)=15000\) for \(0\le d\le20000\); \(A(d)=5000+0.5d\) for \(d>20000\).` }
    ]
  };

  /* ===================== 2.3 Implicit and explicit equations ===================== */
  var impl = {
    id: 'implicit', code: '2.3', title: 'Implicit and explicit equations',
    summary: 'Solve for y, relations vs functions, circles and subfunctions.',
    formulas: [
      { n: 'Explicit', t: T`y=f(x)` },
      { n: 'Implicit', t: T`F(x,y)=c,\quad\text{e.g. } 2x+7y=3` },
      { n: 'Implicit → explicit', t: T`2x+7y=3\ \Rightarrow\ y=\frac{3-2x}{7}`, note: 'Solve for y. Not always possible.' },
      { n: 'Circle', t: T`(x-a)^2+(y-b)^2=r^2`, note: T`Centre \((a,b)\), radius \(r\). Not a function of \(x\).` },
      { n: 'Subfunctions of a circle', t: T`y=b\pm\sqrt{r^2-(x-a)^2}` },
      { n: 'Completing the square', t: T`x^2+2kx=(x+k)^2-k^2` }
    ],
    learn: [
      { h: 'Linked variables', body: T`<p>A family spends €30 on milk (€1.5/l) and juice (€2/l): \(1.5q_M+2q_J=30\). This <strong>implicit</strong> equation links the two variables. Solving for \(q_J\) gives the <strong>explicit</strong> equation \(q_J=15-0.75q_M\): a linear function, and with \(q_M,q_J\ge0\) its domain is \([0,20]\). You may also choose \(q_M\) as the dependent variable: \(q_M=20-\frac43q_J\).</p>` },
      { h: 'Relation or function?', body: T`<p>\(x^2+y^2=25\) gives \(y=\pm\sqrt{25-x^2}\): one \(x\) gives two \(y\)-values, so it is a <strong>relation</strong>, not a function (vertical line test fails). It does define two <strong>subfunctions</strong>: \(y=\sqrt{25-x^2}\) (upper half of the circle) and \(y=-\sqrt{25-x^2}\) (lower half).</p>
<p>A ± sign after solving for \(y\) is the signal that \(y\) is not a function of \(x\).</p>` },
      { h: 'Circles: completing the square', body: T`<p>\(2x^2+2y^2+16x-12y+18=0\). Divide by 2: \(x^2+8x+y^2-6y=-9\). Add the squares of half the coefficients (16 and 9) on both sides: \((x+4)^2+(y-3)^2=16\). Centre \((-4,3)\), radius 4.</p>` }
    ],
    pitfalls: [
      T`Forgetting the ± when taking a square root.`,
      T`Completing the square: add the same number on both sides.`,
      T`Radius is \(\sqrt{\text{right side}}\), not the right side itself.`
    ],
    examples: [
      { t: 'Budget line', p: T`\(1.5q_M+2q_J=30\). Make \(q_J\) explicit and give the domain.`, s: [
        T`\(2q_J=30-1.5q_M\Rightarrow q_J=15-0.75q_M\).`, T`\(q_M\ge0\) and \(q_J\ge0\iff q_M\le20\). Domain \([0,20]\); the graph is the segment from \((0,15)\) to \((20,0)\).`] },
      { t: 'Function of x? Of y?', p: T`Consider \(y-2x^2=0\). Is \(y\) a function of \(x\)? Is \(x\) a function of \(y\)?`, s: [
        T`\(y=2x^2\): yes, \(y\) is a function of \(x\).`, T`\(x^2=\frac y2\Rightarrow x=\pm\sqrt{\frac y2}\): \(x\) is not a function of \(y\).`, T`Subfunctions: \(x=\sqrt{y/2}\) and \(x=-\sqrt{y/2}\).`] },
      { t: 'Find centre and radius', p: T`\(2x^2+2y^2+16x-12y+18=0\). Is \(y\) a function of \(x\)?`, s: [
        T`Divide by 2: \(x^2+y^2+8x-6y+9=0\).`, T`Group: \((x^2+8x+16)+(y^2-6y+9)=-9+16+9=16\).`, T`\((x+4)^2+(y-3)^2=16\): circle, centre \((-4,3)\), radius 4.`,
        T`Not a function. Subfunctions \(y=3\pm\sqrt{16-(x+4)^2}\).`] }
    ],
    practice: [
      { name: 'Make it explicit', gen: function (R) {
        var a = R.nz(-6, 6), b = R.pick([2, 3, 4, 5, -2, -4]), c = R.int(-12, 12);
        var m = -a / b, q = c / b, askM = R.chance();
        return { q: T`Write \(${H.poly([a, 0]).replace('x', 'x')}${b < 0 ? ' - ' + (-b) : ' + ' + b}y=${c}\) as \(y=mx+q\). What is ${askM ? T`the slope \(m\)` : T`the intercept \(q\)`}?`, type: 'num', ans: askM ? m : q, prompt: askM ? 'm=' : 'q=',
          show: askM ? T`\(m=${H.frac(-a, b)}\)` : T`\(q=${H.frac(c, b)}\)`,
          sol: [T`\(${b}y=${c}${a > 0 ? '-' : '+'}${Math.abs(a)}x\).`, T`\(y=${H.frac(-a, b)}x${c / b >= 0 ? '+' : ''}${H.frac(c, b)}\).`] };
      } },
      { name: 'Circle: centre and radius', gen: function (R) {
        var h = R.int(-5, 5), k = R.int(-5, 5), r = R.int(1, 6), m = R.pick([1, 1, 2]);
        var cs = [m, -2 * h * m, -2 * k * m, (h * h + k * k - r * r) * m];
        var eq = (m === 1 ? '' : m) + T`x^2+${m === 1 ? '' : m}y^2` + (cs[1] ? (cs[1] < 0 ? ' - ' : ' + ') + Math.abs(cs[1]) + 'x' : '') + (cs[2] ? (cs[2] < 0 ? ' - ' : ' + ') + Math.abs(cs[2]) + 'y' : '') + (cs[3] ? ' ' + H.signed(cs[3]) : '') + '=0';
        var askR = R.chance();
        return { q: T`The curve \(${eq}\) is a circle. ${askR ? 'What is its radius?' : 'Give its centre (x, y).'}`, type: askR ? 'num' : 'tuple', ans: askR ? r : [h, k], prompt: askR ? 'r=' : '',
          hint: 'Divide by the coefficient of x², then complete the square for x and for y.',
          sol: [m !== 1 ? T`Divide by ${m}.` : T`Group the \(x\)-terms and the \(y\)-terms.`, T`Complete the squares: \((${H.lin(h)})^2+(${H.lin(k, 'y')})^2=${h * h + k * k - (h * h + k * k - r * r)}\).`, T`Centre \((${h},${k})\), radius \(\sqrt{${r * r}}=${r}\).`] };
      } },
      { name: 'Is y a function of x?', gen: function (R) {
        var pool = [[T`2x+7y=3`, 0, T`\(y=\frac{3-2x}7\): one \(y\) per \(x\).`], [T`x^2-y=4`, 0, T`\(y=x^2-4\).`], [T`x^2+y^2=25`, 1, T`\(y=\pm\sqrt{25-x^2}\): two values.`], [T`y^2=x`, 1, T`\(y=\pm\sqrt x\).`],
          [T`y-2x^2=0`, 0, T`\(y=2x^2\).`], [T`x=y^2+1`, 1, T`\(y=\pm\sqrt{x-1}\).`], [T`xy=1`, 0, T`\(y=\frac1x\).`], [T`y^3=x`, 0, T`\(y=\sqrt[3]x\): a cube root has one value.`], [T`x=|y|`, 1, T`\(y=\pm x\) for \(x\ge0\).`], [T`(x-1)^2+(y+2)^2=4`, 1, 'A circle fails the vertical line test.']];
        var it = R.pick(pool);
        return { q: T`Does \(${it[0]}\) define \(y\) as a function of \(x\)?`, type: 'mc', keepOrder: true, choices: ['Yes', 'No'], ans: it[1], sol: [it[2]] };
      } },
      { name: 'Budget line', gen: function (R) {
        var B = R.pick([24, 30, 36, 60]), p1 = R.pick([1.5, 2, 3]), p2 = R.pick([2, 4, 5]);
        if (R.chance()) {
          return { q: T`A budget of €${B} is spent on goods 1 (€${p1} each) and 2 (€${p2} each): \(${p1}q_1+${p2}q_2=${B}\). What is the largest possible \(q_1\)?`, type: 'num', ans: B / p1, prompt: 'q_1=',
            sol: [T`\(q_2\ge0\) means \(${p1}q_1\le${B}\).`, T`\(q_1\le\frac{${B}}{${p1}}=${fmt(B / p1)}\).`] };
        }
        var q1 = R.int(1, Math.floor(B / p1) - 1);
        return { q: T`\(${p1}q_1+${p2}q_2=${B}\). Make \(q_2\) explicit and compute \(q_2\) when \(q_1=${q1}\).`, type: 'num', ans: (B - p1 * q1) / p2, prompt: 'q_2=',
          sol: [T`\(q_2=\frac{${B}-${p1}q_1}{${p2}}=${fmt(B / p2)}-${fmt(p1 / p2)}q_1\).`, T`\(q_2=${fmt((B - p1 * q1) / p2)}\).`] };
      } },
      { name: 'Subfunctions of a circle', gen: function (R) {
        var trip = R.pick([[3, 4, 5], [4, 3, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10], [0, 5, 5]]);
        var x0 = trip[0] * R.sign(), up = R.chance();
        return { q: T`The circle \(x^2+y^2=${trip[2] * trip[2]}\) defines two subfunctions. Compute the value of the ${up ? 'upper' : 'lower'} one at \(x=${x0}\).`, type: 'num', ans: up ? trip[1] : -trip[1], prompt: 'y=',
          sol: [T`\(y=${up ? '' : '-'}\sqrt{${trip[2] * trip[2]}-x^2}\) (${up ? 'upper' : 'lower'} half).`, T`\(y=${up ? '' : '-'}\sqrt{${trip[2] * trip[2]}-${x0 * x0}}=${up ? '' : '-'}${trip[1]}\).`] };
      } }
    ],
    course: [
      { q: T`\(y-2x^2=0\). Is \(y\) a function of \(x\)? Is \(x\) a function of \(y\)?`, a: T`\(y=2x^2\): yes. \(x=\pm\sqrt{y/2}\): no; subfunctions \(x=\sqrt{y/2}\), \(x=-\sqrt{y/2}\).` },
      { q: T`\(2x^2+2y^2+16x-12y+18=0\). Is \(y\) a function of \(x\)?`, a: T`Circle with centre \((-4,3)\), radius 4: no. Subfunctions \(y=3\pm\sqrt{16-(x+4)^2}\).` }
    ]
  };

  /* ===================== 2.4 Inverse functions ===================== */
  var inv = {
    id: 'inverse', code: '2.4', title: 'Inverse functions',
    summary: 'One-to-one, finding f⁻¹, domain/range swap, mirror in y = x.',
    formulas: [
      { n: 'One-to-one', t: T`a\neq b\Rightarrow f(a)\neq f(b)`, note: 'Horizontal line test: every horizontal line meets the graph at most once.' },
      { n: 'Inverse', t: T`f^{-1}(f(x))=x,\qquad f\left(f^{-1}(y)\right)=y` },
      { n: 'Domain and range swap', t: T`\begin{gathered}\operatorname{dom}f^{-1}=\operatorname{im}f\\ \operatorname{im}f^{-1}=\operatorname{dom}f\end{gathered}` },
      { n: 'Inverse of the inverse', t: T`\left(f^{-1}\right)^{-1}=f` },
      { n: 'Basic pairs', t: T`\begin{aligned}x+3&\leftrightarrow x-3, & 3x&\leftrightarrow\tfrac x3\\ x^3&\leftrightarrow\sqrt[3]x, & 3^x&\leftrightarrow\log_3x\end{aligned}` },
      { n: 'Graph of the inverse', t: T`f\ \xrightarrow{\ \text{mirror in } y=x\ }\ f^{-1}` }
    ],
    learn: [
      { h: 'Why inverses', body: T`<p>Demand \(q=100-0.5p\) gives the quantity for a price. To find the price for a given quantity, solve for \(p\): \(p=200-2q\), the <strong>inverse demand function</strong> \(g^{-1}\). It undoes what \(g\) does.</p>
<p>Not every function has one. Revenue \(r=100p-0.5p^2\) gives \(r=3750\) for both \(p=50\) and \(p=150\), so “the price for revenue 3750” is not unique: \(f\) is not <strong>one-to-one</strong>, and the horizontal line test fails.</p>` },
      { h: 'Finding the inverse', body: T`<p>\(f(x)=3x+1\). Start from \(y=3x+1\).</p><ol><li>Solve for \(x\): \(x=\frac{y-1}3\).</li><li>Pure maths only: swap the names \(x\) and \(y\): \(f^{-1}(x)=\frac{x-1}3\).</li></ol>
<p>In an <strong>applied</strong> context the variables mean something (price, quantity). Do not swap their names there.</p>` },
      { h: 'Restricting the domain', body: T`<p>\(y=x^2\) is not one-to-one, but \(f_1:y=x^2,\ x\ge0\) is, with inverse \(f_1^{-1}(x)=\sqrt x\). Likewise \(f_2:y=x^2,\ x\le0\) has inverse \(-\sqrt x\).</p>
<p>\(y=\frac1x\) is its own inverse: its graph is symmetric in \(y=x\).</p>` }
    ],
    pitfalls: [
      T`\(f^{-1}(x)\) is not \(\frac1{f(x)}\).`,
      T`Swapping \(x\) and \(y\) in an applied problem: keep \(p\) as price and \(q\) as quantity.`,
      T`Forgetting to check one-to-one first: an inverse only exists for one-to-one functions.`
    ],
    examples: [
      { t: 'Inverse demand function', p: T`\(q=g(p)=100-0.5p\). Find \(g^{-1}\), and its domain and range.`, s: [
        T`Solve for \(p\): \(0.5p=100-q\Rightarrow p=200-2q\). So \(g^{-1}(q)=200-2q\) (no swapping: applied context).`,
        T`\(\operatorname{dom}g=[0,200]\), \(\operatorname{im}g=[0,100]\).`, T`So \(\operatorname{dom}g^{-1}=[0,100]\) and \(\operatorname{im}g^{-1}=[0,200]\).`] },
      { t: 'Three inverses', p: T`Find \(f^{-1}\) for a) \(f(x)=\sqrt[3]{x+5}\) b) \(f(x)=\frac{\sqrt[5]x-1}{7}\) c) \(f(x)=\log_3(x+1)\).`, s: [
        T`a) \(y=\sqrt[3]{x+5}\Rightarrow y^3=x+5\Rightarrow x=y^3-5\). Swap: \(f^{-1}(x)=x^3-5\).`,
        T`b) \(7y=\sqrt[5]x-1\Rightarrow\sqrt[5]x=7y+1\Rightarrow x=(7y+1)^5\). \(f^{-1}(x)=(7x+1)^5\).`,
        T`c) \(y=\log_3(x+1)\Rightarrow x+1=3^y\Rightarrow x=3^y-1\). \(f^{-1}(x)=3^x-1\).`] },
      { t: 'A function that is its own inverse', p: T`Find the inverse demand function of \(q=\log_2(8-2^p)\).`, s: [
        T`\(2^q=8-2^p\Rightarrow2^p=8-2^q\).`, T`\(p=\log_2(8-2^q)\): the same formula with \(p\) and \(q\) swapped.`] }
    ],
    practice: [
      { name: 'Inverse of a linear function', gen: function (R) {
        var a = R.pick([2, 3, 4, 5, -2, -3, 0.5]), b = R.int(-9, 9), k = R.int(-10, 15);
        var v = (k - b) / a;
        return { q: T`\(f(x)=${H.poly([a, b])}\). Compute \(f^{-1}(${k})\).`, type: 'num', ans: v, prompt: T`f^{-1}(${k})=`, hint: T`\(f^{-1}(${k})\) is the \(x\) with \(f(x)=${k}\).`,
          sol: [T`Solve \(${H.poly([a, b])}=${k}\).`, T`\(${fmt(a)}x=${k - b}\Rightarrow x=${fmt(v)}\).`, T`Or: \(f^{-1}(x)=\dfrac{x${H.signed(-b)}}{${fmt(a)}}\).`] };
      } },
      { name: 'Inverse of exp / log functions', gen: function (R) {
        if (R.chance()) {
          var A = R.pick([1, 2, 3]), b = R.pick([2, 3, 10]), c = R.int(-5, 5), n = R.int(0, 3);
          var y = A * Math.pow(b, n) + c;
          return { q: T`\(f(x)=${A === 1 ? '' : A + T`\cdot`}${b}^{x}${c ? H.signed(c) : ''}\). Compute \(f^{-1}(${y})\).`, type: 'num', ans: n, prompt: T`f^{-1}(${y})=`,
            sol: [T`Solve \(f(x)=${y}\): \(${A === 1 ? '' : A + T`\cdot`}${b}^x=${y - c}\).`, T`\(${b}^x=${(y - c) / A}\Rightarrow x=\log_{${b}}${(y - c) / A}=${n}\).`, T`In general \(f^{-1}(x)=\log_{${b}}\dfrac{x${H.signed(-c)}}{${A}}\).`] };
        }
        var B = R.pick([2, 3, 10]), c2 = R.int(-3, 5), d = R.int(-4, 4), yy = R.int(-1, 3) + d;
        var x = Math.pow(B, yy - d) - c2;
        var logT = B === 10 ? T`\log` : T`\log_{${B}}`;
        return { q: T`\(f(x)=${logT}(x${c2 ? H.signed(c2) : ''})${d ? H.signed(d) : ''}\). Compute \(f^{-1}(${yy})\).`, type: 'num', ans: x, prompt: T`f^{-1}(${yy})=`,
          sol: [T`Solve \(${logT}(x${c2 ? H.signed(c2) : ''})=${yy - d}\).`, T`Definition: \(x${c2 ? H.signed(c2) : ''}=${B}^{${yy - d}}\).`, T`\(x=${fmt(x)}\). In general \(f^{-1}(x)=${B}^{x${d ? H.signed(-d) : ''}}${c2 ? H.signed(-c2) : ''}\).`] };
      } },
      { name: 'Pick the inverse', gen: function (R) {
        var a = R.int(1, 6), k = R.pick([2, 3, 5, 7]), B = R.pick([2, 3, 5]), n = R.pick([3, 5]);
        var tpl = R.pick([
          [T`\sqrt[3]{x+${a}}`, [T`x^3-${a}`, T`x^3+${a}`, T`(x-${a})^3`, T`\sqrt[3]{x-${a}}`], T`\(y^3=x+${a}\Rightarrow x=y^3-${a}\).`],
          [T`${k}x+${a}`, [T`\frac{x-${a}}{${k}}`, T`\frac{x+${a}}{${k}}`, T`\frac{x}{${k}}-${a}`, T`\frac{1}{${k}x+${a}}`], T`\(x=\frac{y-${a}}{${k}}\).`],
          [T`\log_{${B}}(x+${a})`, [T`${B}^x-${a}`, T`${B}^x+${a}`, T`${B}^{x-${a}}`, T`\log_{${B}}(x-${a})`], T`\(x+${a}=${B}^y\Rightarrow x=${B}^y-${a}\).`],
          [T`${B}^x+${a}`, [T`\log_{${B}}(x-${a})`, T`\log_{${B}}x-${a}`, T`\log_{${B}}(x+${a})`, T`${B}^{-x}-${a}`], T`\(${B}^x=y-${a}\Rightarrow x=\log_{${B}}(y-${a})\).`],
          [T`\frac{\sqrt[${n}]{x}-${a}}{${k}}`, [T`(${k}x+${a})^{${n}}`, T`(${k}x-${a})^{${n}}`, T`${k}x^{${n}}+${a}`, T`\sqrt[${n}]{${k}x+${a}}`], T`\(${k}y=\sqrt[${n}]x-${a}\Rightarrow\sqrt[${n}]x=${k}y+${a}\Rightarrow x=(${k}y+${a})^{${n}}\).`],
          [T`e^{x-${a}}`, [T`\ln x+${a}`, T`\ln(x+${a})`, T`\ln x-${a}`, T`\ln(x-${a})`], T`\(x-${a}=\ln y\Rightarrow x=\ln y+${a}\).`]
        ]);
        return { q: T`What is \(f^{-1}(x)\) for \(f(x)=${tpl[0]}\)?`, type: 'mc', choices: tpl[1].map(P), ans: 0,
          sol: [T`Write \(y=${tpl[0]}\) and solve for \(x\): ${tpl[2]}`, T`Swap \(x\) and \(y\): \(f^{-1}(x)=${tpl[1][0]}\).`] };
      } },
      { name: 'One-to-one?', gen: function (R) {
        var pool = [[T`y=x^3`, 0, 'Always rising: passes the horizontal line test.'], [T`y=x^2`, 1, T`\(f(-2)=f(2)=4\).`], [T`y=2^x`, 0, 'Always rising.'], [T`y=|x|`, 1, T`\(f(-1)=f(1)\).`], [T`y=\ln x`, 0, 'Always rising on its domain.'],
          [T`y=\frac1x`, 0, 'Every horizontal line (except y = 0, which it never reaches) meets it once.'], [T`y=x^2,\ x\ge0`, 0, 'Restricted to x ≥ 0 it is rising.'], [T`y=x^4-1`, 1, T`\(f(-1)=f(1)=0\).`], [T`r=100p-0.5p^2`, 1, T`\(r(50)=r(150)=3750\).`], [T`y=5-3x`, 0, 'A non-constant linear function is one-to-one.'], [T`y=(x-2)^2`, 1, T`\(f(1)=f(3)=1\).`]];
        var it = R.pick(pool);
        return { q: T`Is \(${it[0]}\) one-to-one (so that an inverse function exists)?`, type: 'mc', keepOrder: true, choices: ['Yes', 'No'], ans: it[1], sol: [it[2]] };
      } },
      { name: 'Inverse demand in context', gen: function (R) {
        var a = R.pick([60, 100, 120, 200]), b = R.pick([0.5, 2, 4, 0.25]), q0 = Math.round(a * R.pick([0.2, 0.4, 0.5, 0.75]));
        if (R.chance(0.7)) {
          return { q: T`Demand: \(q=${a}-${b}p\). What price \(p\) must be set to sell \(q=${q0}\) units? (use the inverse demand function)`, type: 'num', ans: (a - q0) / b, prompt: 'p=',
            sol: [T`Inverse: \(${b}p=${a}-q\Rightarrow p=\frac{${a}-q}{${b}}\).`, T`\(p=\frac{${a}-${q0}}{${b}}=${fmt((a - q0) / b)}\).`] };
        }
        return { q: T`Demand: \(q=g(p)=${a}-${b}p\) with \(p,q\ge0\). What is the largest value in the domain of \(g^{-1}\)?`, type: 'num', ans: a, prompt: 'q_{max}=',
          sol: [T`\(\operatorname{dom}g=[0,${fmt(a / b)}]\) (where \(q\ge0\)), \(\operatorname{im}g=[0,${a}]\).`, T`\(\operatorname{dom}g^{-1}=\operatorname{im}g=[0,${a}]\): largest value ${a}.`] };
      } }
    ],
    course: [
      { q: T`Find \(f^{-1}\): a) \(f(x)=\sqrt[3]{x+5}\) b) \(f(x)=\frac{\sqrt[5]x-1}7\) c) \(f(x)=\log_3(x+1)\).`, a: T`a) \(x^3-5\) b) \((7x+1)^5\) c) \(3^x-1\)` },
      { q: T`Find the inverse demand function of \(q=\log_2(8-2^p)\).`, a: T`\(p=\log_2(8-2^q)\)` },
      { q: T`Check that \(g^{-1}(g(p))=p\) for \(g(p)=100-0.5p\), \(g^{-1}(q)=200-2q\).`, a: T`\(200-2(100-0.5p)=200-200+p=p\) ✓` }
    ]
  };

  /* ===================== 2.5 Symmetry ===================== */
  var sym = {
    id: 'symmetry', code: '2.5', title: 'Reflections and symmetry',
    summary: 'Reflect graphs by changing the equation; test for symmetry.',
    formulas: [
      { n: 'Reflect in the x-axis', t: T`y\to-y:\quad y=-f(x)` },
      { n: 'Reflect in the y-axis', t: T`x\to-x:\quad y=f(-x)` },
      { n: 'Reflect in the origin', t: T`x\to-x,\ y\to-y:\quad y=-f(-x)` },
      { n: 'Reflect in y = x', t: T`x\leftrightarrow y:\quad x=f(y)` },
      { n: 'Symmetric', t: T`\begin{gathered}\text{substitution gives an}\\ \text{equivalent equation}\end{gathered}` },
      { n: 'Translations', t: T`\begin{aligned}a\text{ right}&:\ x\to x-a\\ b\text{ up}&:\ y\to y-b\end{aligned}` }
    ],
    learn: [
      { h: 'Geometry ↔ algebra', body: T`<p>Reflecting \(y=\sqrt x\) in the \(x\)-axis sends \((4,2)\) to \((4,-2)\): every point \((x,y)\) goes to \((x,-y)\). So replace \(y\) by \(-y\): \(-y=\sqrt x\), i.e. \(y=-\sqrt x\).</p>
<div class="table-wrap"><table class="mini"><thead><tr><th>Reflection in</th><th>Algebra</th><th>\(y=f(x)\) becomes</th><th>Domain/range</th></tr></thead><tbody>
<tr><td>\(x\)-axis</td><td>\(y\to-y\)</td><td>\(y=-f(x)\)</td><td>domain same</td></tr>
<tr><td>\(y\)-axis</td><td>\(x\to-x\)</td><td>\(y=f(-x)\)</td><td>range same</td></tr>
<tr><td>origin</td><td>both</td><td>\(y=-f(-x)\)</td><td>both may change</td></tr>
<tr><td>\(y=x\)</td><td>swap \(x,y\)</td><td>\(x=f(y)\)</td><td>swap (if one-to-one: \(f^{-1}\))</td></tr></tbody></table></div>
<p>It works for implicit curves too: the circle \((x-4)^2+(y-3)^2=4\) reflected in the \(x\)-axis is \((x-4)^2+(y+3)^2=4\), centre \((4,-3)\).</p>` },
      { h: 'Testing for symmetry', body: T`<p>A graph is symmetric about a line or point if the reflection leaves it unchanged, i.e. the substitution gives an <strong>equivalent equation</strong>.</p>
<ul><li>\(y^2=x\): \((-y)^2=x\) is the same → symmetric about the \(x\)-axis.</li><li>\(y=ax^2+bx+c\): \(x\to-x\) gives \(ax^2-bx+c\); equal for all \(x\) only if \(b=0\).</li><li>\(y=\frac ax\): \(-y=\frac a{-x}\) is the same → symmetric about the origin; swapping gives \(x=\frac ay\iff y=\frac ax\) → also about \(y=x\).</li></ul>` }
    ],
    pitfalls: [
      T`\(-f(x)\) means minus the whole expression: \(-(x^3+1)=-x^3-1\).`,
      T`\(f(-x)\) replaces every \(x\): \(f(x)=x^2+3x\Rightarrow f(-x)=x^2-3x\).`,
      T`A function graph can never be symmetric about the \(x\)-axis (unless it is \(y=0\)): it would fail the vertical line test.`
    ],
    examples: [
      { t: 'Reflect √x in the origin', p: T`Reflect the graph of \(y=\sqrt x\) about the origin.`, s: [
        T`Replace \(x\) by \(-x\) and \(y\) by \(-y\): \(-y=\sqrt{-x}\).`, T`\(y=-\sqrt{-x}\), domain \(\mathopen{]}-\infty,0]\), range \(\mathopen{]}-\infty,0]\).`] },
      { t: 'Reflect a circle in y = x', p: T`Reflect the circle \((x-4)^2+(y-3)^2=4\) in the line \(y=x\).`, s: [
        T`Swap \(x\) and \(y\): \((y-4)^2+(x-3)^2=4\).`, T`Centre \((3,4)\), radius 2.`] },
      { t: 'Symmetric about the y-axis', p: T`For which parameters is the graph of \(y=ax^2+bx+c\) symmetric about the \(y\)-axis?`, s: [
        T`Replace \(x\) by \(-x\): \(y=ax^2-bx+c\).`, T`Equivalent to the original for all \(x\iff bx=-bx\iff b=0\).`, T`Any \(a\neq0\), any \(c\), and \(b=0\).`] },
      { t: 'Logistic growth', p: T`Show that \(f(x)=\dfrac{L}{1+e^{-k(x-x_0)}}\) is symmetric about its midpoint \((x_0,\frac L2)\).`, s: [
        T`Translate the midpoint to the origin: \(x\to x+x_0\), \(y\to y+\frac L2\): \(y=\dfrac{L}{1+e^{-kx}}-\dfrac L2=\dfrac{L-Le^{-kx}}{2(1+e^{-kx})}\).`,
        T`Replace \(x\to-x\), \(y\to-y\): \(y=\dfrac{Le^{kx}-L}{2(1+e^{kx})}\).`,
        T`Multiply numerator and denominator by \(e^{-kx}\): \(y=\dfrac{L-Le^{-kx}}{2(e^{-kx}+1)}\), the same equation. Symmetric about the origin, so the original is symmetric about its midpoint.`] }
    ],
    practice: [
      { name: 'Reflect a point', gen: function (R) {
        var p = R.nz(-7, 7), q = R.nz(-7, 7), w = R.pick(['x', 'y', 'o', 'd']);
        var map = { x: [p, -q, T`the \(x\)-axis`, T`\((x,y)\to(x,-y)\)`], y: [-p, q, T`the \(y\)-axis`, T`\((x,y)\to(-x,y)\)`], o: [-p, -q, 'the origin', T`\((x,y)\to(-x,-y)\)`], d: [q, p, T`the line \(y=x\)`, T`\((x,y)\to(y,x)\)`] };
        var m = map[w];
        return { q: T`Reflect the point \((${p},${q})\) about ${m[2]}. Give the image (x, y).`, type: 'tuple', ans: [m[0], m[1]], sol: [m[3]] };
      } },
      { name: 'Reflect a circle', gen: function (R) {
        var h = R.nz(-6, 6), k = R.nz(-6, 6), r = R.int(1, 4), w = R.pick(['x', 'y', 'o', 'd']);
        var res = { x: [h, -k], y: [-h, k], o: [-h, -k], d: [k, h] }[w];
        var name = { x: T`the \(x\)-axis`, y: T`the \(y\)-axis`, o: 'the origin', d: T`the line \(y=x\)` }[w];
        var sub = { x: T`replace \(y\) by \(-y\)`, y: T`replace \(x\) by \(-x\)`, o: T`replace \(x\) by \(-x\) and \(y\) by \(-y\)`, d: T`swap \(x\) and \(y\)` }[w];
        return { q: T`The circle \((${H.lin(h)})^2+(${H.lin(k, 'y')})^2=${r * r}\) is reflected about ${name}. Give the centre (x, y) of the image.`, type: 'tuple', ans: res,
          sol: [T`Algebra: ${sub}.`, T`New equation: \((${H.lin(res[0])})^2+(${H.lin(res[1], 'y')})^2=${r * r}\), centre \((${res[0]},${res[1]})\).`] };
      } },
      { name: 'Equation of the reflection', gen: function (R) {
        var fs = [[function (s) { return T`\sqrt{${s}}`; }, false], [function (s) { return T`2^{${s}}`; }, false], [function (s) { return T`\ln(${s})`; }, false], [function (s) { return (s.length === 1 ? s : '(' + s + ')') + '^3+1'; }, true]];
        var f = R.pick(fs), w = R.pick([0, 1, 2, 3]);
        var neg = function (s) { return f[1] ? T`-\left(${f[0](s)}\right)` : '-' + f[0](s); };
        var forms = [T`y=${neg('x')}`, T`y=${f[0]('-x')}`, T`y=${neg('-x')}`, T`x=${f[0]('y')}`];
        var names = [T`the \(x\)-axis`, T`the \(y\)-axis`, 'the origin', T`the line \(y=x\)`];
        var rules = [T`replace \(y\) by \(-y\)`, T`replace \(x\) by \(-x\)`, T`replace \(x\) by \(-x\) and \(y\) by \(-y\)`, T`swap \(x\) and \(y\)`];
        return { q: T`The graph of \(y=${f[0]('x')}\) is reflected about ${names[w]}. Which equation describes the image?`, type: 'mc', choices: forms.map(P), ans: w,
          sol: [T`Reflection about ${names[w]}: ${rules[w]}.`, T`Result: \(${forms[w]}\).`] };
      } },
      { name: 'Which symmetries?', gen: function (R) {
        var pool = [[T`y=x^2`, [1]], [T`y=x^3`, [2]], [T`y^2=x`, [0]], [T`y=\frac1x`, [2, 3]], [T`x^2+y^2=9`, [0, 1, 2, 3]], [T`y=|x|`, [1]], [T`xy=4`, [2, 3]], [T`y=x`, [2, 3]],
          [T`y=x^4-2x^2`, [1]], [T`y=2^x`, [4]], [T`x^2-y^2=1`, [0, 1, 2]], [T`y=x^3-x`, [2]], [T`x+y=4`, [3]], [T`y=(x-1)^2`, [4]]];
        var it = R.pick(pool);
        var labels = ['the x-axis', 'the y-axis', 'the origin', 'the line y = x', 'none of these'];
        var tests = [T`\(y\to-y\)`, T`\(x\to-x\)`, T`\(x\to-x,\ y\to-y\)`, T`swap \(x,y\)`];
        return { q: T`About what is the graph of \(${it[0]}\) symmetric? Select all that apply.`, type: 'multi', keepOrder: true, choices: labels, ans: it[1],
          sol: [T`Apply each substitution to \(${it[0]}\) and check whether you get an equivalent equation.`, tests.map(function (t, i) { return t + ': ' + (it[1].indexOf(i) >= 0 ? 'same equation ✓' : 'different ✗'); }).join('; ') + '.'] };
      } },
      { name: 'Parameter for symmetry', gen: function (R) {
        if (R.chance()) {
          var a = R.nz(-4, 4), c = R.int(-5, 5), d = R.int(-5, 5);
          return { q: T`\(f(x)=${a}x^2+(k${H.signed(-c)})x${d ? H.signed(d) : ''}\). For which \(k\) is the graph symmetric about the \(y\)-axis?`, type: 'num', ans: c, prompt: 'k=',
            sol: [T`Symmetry about the \(y\)-axis requires the coefficient of \(x\) to be 0.`, T`\(k${H.signed(-c)}=0\Rightarrow k=${c}\).`] };
        }
        var m = R.int(-4, 4), e = R.nz(-5, 5);
        return { q: T`\(f(x)=x^3+(m${H.signed(-m)})x^2${H.signed(e)}x\). For which \(m\) is the graph symmetric about the origin?`, type: 'num', ans: m, prompt: 'm=',
          sol: [T`About the origin: \(-y=f(-x)\) must give the same equation, so only odd powers may appear.`, T`The \(x^2\) coefficient must vanish: \(m${H.signed(-m)}=0\Rightarrow m=${m}\).`] };
      } }
    ],
    course: [
      { q: T`Reflect \(y=\sqrt x\) about the \(x\)-axis, the \(y\)-axis and the origin.`, a: T`\(y=-\sqrt x\); \(y=\sqrt{-x}\); \(y=-\sqrt{-x}\).` },
      { q: T`Reflect the circle with centre \((4,3)\) and radius 2 about the \(x\)-axis, \(y\)-axis, origin and \(y=x\).`, a: T`Centres \((4,-3)\), \((-4,3)\), \((-4,-3)\), \((3,4)\); radius stays 2.` },
      { q: T`Show that \(y=\frac ax\) is symmetric about the origin and about \(y=x\).`, a: T`\(-y=\frac a{-x}\iff y=\frac ax\); swapping gives \(x=\frac ay\iff y=\frac ax\).` }
    ]
  };

  /* ===================== 2.6 Sign charts and continuity ===================== */
  var signs = {
    id: 'signs', code: '2.6', title: 'Sign charts and continuity',
    summary: 'Sign charts, continuity, and solving inequalities correctly.',
    formulas: [
      { n: 'Zero', t: T`f(x)=0` },
      { n: 'Continuous at a', t: T`a\in\operatorname{dom}f\ \text{and no gap at } x=a` },
      { n: 'Continuous functions', t: T`\begin{gathered}\text{polynomial, rational,}\\ \text{exponential, logarithmic}\end{gathered}`, note: 'And sums, products, quotients and compositions of these, on their domain.' },
      { n: 'Property', t: T`\begin{gathered}f\text{ continuous on }I,\ \text{no zeros in }I\\ \Rightarrow\ f\text{ has one sign on }I\end{gathered}` },
      { n: 'Sign chart method', t: T`\begin{gathered}\text{1. domain}\qquad\text{2. zeros}\\ \text{3. discontinuities}\qquad\text{4. test points}\end{gathered}` },
      { n: 'Inequality method', t: T`\begin{gathered}f(x)<g(x)\iff f(x)-g(x)<0\\ \to\ \text{sign chart of } f-g\end{gathered}` }
    ],
    learn: [
      { h: 'Where can the sign change?', body: T`<p>Only at three kinds of places:</p><ul><li>at a <strong>zero</strong> (often, not always: \(-x^3+2x^2-x=-x(x-1)^2\) does not change sign at 1)</li><li>where the <strong>domain is interrupted</strong> (\(\frac1x\) at 0)</li><li>at a <strong>jump</strong> (discontinuity) of a case-defined function</li></ul>
${H.chart(['-2', '-1'], ['+', '0', '-', '0', '+'], T`x^2+3x+2`)}` },
      { h: 'Continuity', body: T`<p>\(f\) is continuous at \(a\) if \(a\) is in the domain and the graph has no gap there. Polynomial, rational, exponential and log functions, and combinations of them, are continuous on their domain. \(\frac5{x-3}\) is continuous everywhere except at 3, which is not in the domain. In this course, discontinuities only appear in case-defined functions: check the transition points.</p>` },
      { h: 'Setting up a sign chart', body: T`<ol><li>Domain: mark excluded values with /.</li><li>Zeros: mark with 0.</li><li>Discontinuities.</li><li>Pick one test value in each interval and compute the sign.</li></ol>
<p>Example \(f(x)=\ln(6.76-0.04x^2)\): domain \(]-13,13[\), zeros \(\pm12\) (argument = 1); \(f(-12.5)<0\), \(f(0)>0\), \(f(12.5)<0\).</p>
${H.chart(['-13', '-12', '12', '13'], ['/', '/', '-', '0', '+', '0', '-', '/', '/'])}` },
      { h: 'Solving inequalities', body: T`<p><strong>Never multiply both sides by an expression with \(x\)</strong>: its sign is unknown. Bring everything to one side and use a sign chart.</p>
<p>\(\frac1x\ge x+1\iff\frac{x^2+x-1}{x}\le0\). Zeros \(\frac{-1\pm\sqrt5}2\approx-1.618,\ 0.618\); excluded 0.</p>
${H.chart(['-1.618', '0', '0.618'], ['-', '0', '+', '/', '-', '0', '+'], T`\tfrac{x^2+x-1}{x}`)}
<p>Solution: \(\mathopen{]}-\infty,\frac{-1-\sqrt5}2]\cup\,\mathopen{]}0,\frac{-1+\sqrt5}2]\).</p>` }
    ],
    pitfalls: [
      T`Multiplying an inequality by \(x\) (or any expression whose sign you do not know).`,
      T`Assuming the sign always changes at a zero: double zeros keep the sign.`,
      T`Including an excluded value (/) in the solution, even for \(\le\) or \(\ge\).`
    ],
    examples: [
      { t: 'Cubic with a double zero', p: T`Make a sign chart of \(f(x)=-x^3+2x^2-x\).`, s: [
        T`Domain \(\mathbb R\). Zeros: \(-x(x^2-2x+1)=-x(x-1)^2=0\Rightarrow x=0\) or \(x=1\).`,
        T`Test: \(f(-1)=4>0\), \(f(0.5)=-0.125<0\), \(f(2)=-2<0\).`,
        H.chart(['0', '1'], ['+', '0', '-', '0', '-'])] },
      { t: 'Case-defined function', p: T`Sign chart of \(f(x)=\begin{cases}2x-1&x<1\\x^2-2x&1\le x<3\end{cases}\).`, s: [
        T`Domain \(\mathopen{]}-\infty,3[\). Zeros: \(2x-1=0\Rightarrow x=\tfrac12\); \(x^2-2x=0\Rightarrow x=2\) (0 is not in that case).`,
        T`At \(x=1\) the graph jumps from \(1\) (left) to \(-1\): a sign change without a zero.`,
        H.chart([T`\tfrac12`, '1', '2', '3'], ['-', '0', '+', '-', '-', '0', '+', '/', '/'])] },
      { t: 'A rational inequality', p: T`Solve \(\dfrac{x^2}{x^2-1}\le1\).`, s: [
        T`One side: \(\dfrac{x^2}{x^2-1}-1=\dfrac{1}{x^2-1}\le0\).`,
        T`Domain \(\mathbb R\setminus\{-1,1\}\); no zeros. Test: \(f(\pm2)=\frac13>0\), \(f(0)=-1<0\).`,
        H.chart(['-1', '1'], ['+', '/', '-', '/', '+']), T`Solution: \(]-1,1[\).`] },
      { t: 'Continuous or not?', p: T`Where is \(f(x)=\begin{cases}2x-1&x\le1\\1.5-0.5(x-2)^2&x>1\end{cases}\) discontinuous?`, s: [
        T`Both pieces are polynomials, so only \(x=1\) needs checking.`, T`Left: \(2\cdot1-1=1\). Right: \(1.5-0.5\cdot1=1\). No gap.`, T`\(f\) is continuous everywhere.`] }
    ],
    practice: [
      { name: 'Find the zeros', gen: function (R) {
        var kind = R.pick(['quad', 'cubic', 'log']);
        if (kind === 'quad') {
          var r1 = R.int(-6, 6), r2 = R.int(-6, 6); while (r2 === r1) r2 = R.int(-6, 6);
          var a = R.pick([1, -1, 2]);
          return { q: T`Find all zeros of \(f(x)=${H.poly([a, -a * (r1 + r2), a * r1 * r2])}\).`, type: 'set', ans: [r1, r2],
            sol: [T`\(${a === 1 ? '' : a === -1 ? '-' : a}(${H.lin(r1)})(${H.lin(r2)})=0\).`, T`Zeros \(${Math.min(r1, r2)}\) and \(${Math.max(r1, r2)}\).`] };
        }
        if (kind === 'cubic') {
          var r = R.nz(-4, 4), s = R.pick([1, -1]);
          return { q: T`Find all zeros of \(f(x)=${H.poly([s, -2 * r * s, r * r * s, 0])}\).`, type: 'set', ans: [0, r], hint: 'Factor out x first.',
            sol: [T`\(f(x)=${s < 0 ? '-' : ''}x(x^2${H.signed(-2 * r)}x+${r * r})=${s < 0 ? '-' : ''}x(${H.lin(r)})^2\).`, T`Zeros \(0\) and \(${r}\) (a double zero: no sign change there).`] };
        }
        var z = R.pick([2, 3, 4, 5, 10, 12]), d = R.pick([0.04, 0.25, 1]), c = 1 + d * z * z;
        return { q: T`Find all zeros of \(f(x)=\ln(${fmt(c)}-${fmt(d)}x^2)\).`, type: 'set', ans: [-z, z], hint: T`\(\ln A=0\iff A=1\).`,
          sol: [T`\(${fmt(c)}-${fmt(d)}x^2=1\Rightarrow x^2=\frac{${fmt(c - 1)}}{${fmt(d)}}=${z * z}\).`, T`\(x=\pm${z}\) (both inside the domain).`] };
      } },
      { name: 'Quadratic inequality', gen: function (R) {
        var r1 = R.int(-6, 5), r2 = r1 + R.int(1, 6), a = R.pick([1, -1, 2, -2]), op = R.pick(['<', '<=', '>', '>=']);
        var inside = iv(r1, r2, op.length > 1, op.length > 1), outside = iv(-INF, r1, false, op.length > 1) + T`\cup` + iv(r2, INF, op.length > 1, false);
        var insideStrict = iv(r1, r2, op.length === 1, op.length === 1), outsideStrict = iv(-INF, r1, false, op.length === 1) + T`\cup` + iv(r2, INF, op.length === 1, false);
        var neg = op[0] === '<';
        var wantInside = a > 0 ? neg : !neg;
        var choices = [P(wantInside ? inside : outside), P(wantInside ? outside : inside), P(wantInside ? insideStrict : outsideStrict), P(wantInside ? outsideStrict : insideStrict)];
        var sg = a > 0 ? ['+', '0', '-', '0', '+'] : ['-', '0', '+', '0', '-'];
        return { q: T`Solve \(${H.poly([a, -a * (r1 + r2), a * r1 * r2])}${H.opTex[op]}0\).`, type: 'mc', choices: choices, ans: 0,
          sol: [T`Zeros: \(${a}(${H.lin(r1)})(${H.lin(r2)})=0\Rightarrow x=${r1},\ ${r2}\).`, H.chart([String(r1), String(r2)], sg), T`We need \(${H.opTex[op]}0\)${op.length > 1 ? ' (zeros included)' : ' (zeros excluded)'}: ${choices[0]}.`] };
      } },
      { name: 'Rational inequality', gen: function (R) {
        var a = R.int(-5, 5), b = R.int(-5, 5); while (b === a) b = R.int(-5, 5);
        var op = R.pick(['<', '<=', '>', '>=']), ns = op.length > 1, lo = Math.min(a, b), hi = Math.max(a, b);
        var cl = function (x, ok) { return ok && x === a; };
        var inC = iv(lo, hi, cl(lo, ns), cl(hi, ns)), outC = iv(-INF, lo, false, cl(lo, ns)) + T`\cup` + iv(hi, INF, cl(hi, ns), false);
        var inW = iv(lo, hi, true, true), outW = iv(-INF, lo, false, true) + T`\cup` + iv(hi, INF, true, false);
        var wantIn = op[0] === '<';
        var choices = [P(wantIn ? inC : outC), P(wantIn ? outC : inC), P(wantIn ? inW : outW), P(wantIn ? outW : inW)];
        var sg = lo === a ? ['+', '0', '-', '/', '+'] : ['+', '/', '-', '0', '+'];
        return { q: T`Solve \(\dfrac{${H.lin(a)}}{${H.lin(b)}}${H.opTex[op]}0\).`, type: 'mc', choices: choices, ans: 0,
          sol: [T`Domain \(\mathbb R\setminus\{${b}\}\), zero \(x=${a}\).`, H.chart([String(lo), String(hi)], sg), T`${wantIn ? 'Negative between' : 'Positive outside'}; ${ns ? T`include the zero \(${a}\), ` : ''}never include \(${b}\): ${choices[0]}.`] };
      } },
      { name: 'Make it continuous', gen: function (R) {
        var p = R.nz(-3, 3), a = R.nz(-4, 4), b = R.int(-6, 6), c = R.nz(-2, 2);
        var k = a * p + b - c * p * p;
        return { q: T`For which \(k\) is \(f(x)=\begin{cases}${H.poly([a, b])}&x\le${p}\\ ${H.poly([c, 0, 0])}+k&x>${p}\end{cases}\) continuous everywhere?`, type: 'num', ans: k, prompt: 'k=',
          hint: T`Both pieces must give the same value at \(x=${p}\).`,
          sol: [T`Left value at \(${p}\): \(${a}\cdot(${p})${H.signed(b)}=${a * p + b}\).`, T`Right value: \(${c}\cdot(${p})^2+k=${c * p * p}+k\).`, T`\(${c * p * p}+k=${a * p + b}\Rightarrow k=${k}\).`] };
      } },
      { name: 'Where is it discontinuous?', gen: function (R) {
        var p = R.nz(-3, 3), m1 = R.nz(-3, 3), b1 = R.int(-5, 5), m2 = R.nz(-3, 3), cont = R.chance();
        var b2 = cont ? m1 * p + b1 - m2 * p : m1 * p + b1 - m2 * p + R.nz(-3, 3);
        var other = p + R.pick([-2, 2]);
        var L = m1 * p + b1, Rv = m2 * p + b2;
        return { q: T`Where is \(f(x)=\begin{cases}${H.poly([m1, b1])}&x<${p}\\ ${H.poly([m2, b2])}&x\ge${p}\end{cases}\) discontinuous?`, type: 'mc', keepOrder: true,
          choices: ['Nowhere: it is continuous on ℝ', T`Only at \(x=${p}\)`, T`Only at \(x=${other}\)`, T`At every \(x\ge${p}\)`], ans: cont ? 0 : 1,
          sol: [T`Each piece is linear (continuous). Only the transition \(x=${p}\) can cause a gap.`, T`Left value: \(${L}\). Right value: \(${Rv}\).`, cont ? 'Equal: no gap, continuous everywhere.' : T`Different: a jump at \(x=${p}\).`] };
      } }
    ],
    course: [
      { q: T`Find the zeros of \(f(x)=\ln(6.76-0.04x^2)\) and make a sign chart.`, a: T`Zeros \(\pm12\); domain \(]-13,13[\); \(-\) on \(]-13,-12[\), \(+\) on \(]-12,12[\), \(-\) on \(]12,13[\).` },
      { q: T`At which \(x\) is \(f(x)=\frac5{x-3}\) continuous?`, a: T`All real \(x\) except 3 (not in the domain).` },
      { q: T`Solve \(\frac1x\ge x+1\).`, a: T`\(\mathopen{]}-\infty,\frac{-1-\sqrt5}2]\cup\,\mathopen{]}0,\frac{-1+\sqrt5}2]\)` },
      { q: T`Solve \(\frac{x^2}{x^2-1}\le1\).`, a: T`\(]-1,1[\)` }
    ]
  };

  /* ===================== 2.7 Limits and asymptotes ===================== */
  var lim = {
    id: 'limits', code: '2.7', title: 'Limits and asymptotes',
    summary: 'Limits at a point and at infinity, one-sided limits, asymptotes.',
    formulas: [
      { n: 'Limit at a point', t: T`\lim_{x\to a}f(x)=L`, note: T`\(f(x)\) is close to \(L\) for all \(x\) close to (not equal to) \(a\). The value \(f(a)\) plays no role.` },
      { n: 'One-sided limits', t: T`\begin{gathered}\lim_{x\to a}f(x)\ \text{exists}\iff\\ \lim_{x\to a^-}f(x)=\lim_{x\to a^+}f(x)\end{gathered}` },
      { n: 'Continuous function', t: T`\lim_{x\to a}f(x)=f(a)` },
      { n: 'Determined forms', t: T`\begin{gathered}\frac{c}{\pm\infty}\to0,\qquad \frac{0}{c}\to0\\ \frac{c}{0}\to\pm\infty,\qquad \frac{\pm\infty}{c}\to\pm\infty\end{gathered}`, note: 'c is a non-zero number; for c/0 check the sign of the denominator.' },
      { n: 'Undetermined', t: T`\frac00,\qquad \frac{\pm\infty}{\pm\infty}\quad\to\text{ other method}` },
      { n: 'Rational at ±∞', t: T`\lim_{x\to\pm\infty}\frac{a_nx^n+\dots}{b_mx^m+\dots}=\lim_{x\to\pm\infty}\frac{a_nx^n}{b_mx^m}` },
      { n: 'Horizontal asymptote', t: T`\begin{gathered}y=b\ \text{if}\ \lim_{x\to+\infty}f(x)=b\\ \text{or}\ \lim_{x\to-\infty}f(x)=b\end{gathered}` },
      { n: 'Vertical asymptote', t: T`x=a\ \text{if}\ \lim_{x\to a^\pm}f(x)=\pm\infty` }
    ],
    learn: [
      { h: 'Limits at a point', body: T`<p>\(f(x)=\frac{x^3-1}{x-1}\) is not defined at 1, but near 1 the values approach 3: \(\lim_{x\to1}f(x)=3\). Algebraically: \(x^3-1=(x-1)(x^2+x+1)\), so for \(x\neq1\), \(f(x)=x^2+x+1\to3\).</p>
<p>\(\lim_{x\to0}\frac1{x^2}=+\infty\): the values grow without bound. For \(\frac1x\) the one-sided limits differ (\(-\infty\) from the left, \(+\infty\) from the right), so \(\lim_{x\to0}\frac1x\) does not exist.</p>` },
      { h: 'Limits at infinity', body: T`<p>Reason step by step: as \(x\to+\infty\), \(-2x+3\to-\infty\), \((-2x+3)^2\to+\infty\), \(\frac3{(-2x+3)^2}\to0\), so \(5-\frac3{(-2x+3)^2}\to5\).</p>
<p>For a rational function, only the highest power in numerator and denominator matters:</p>
<ul><li>\(\frac{3x^2+4x-1}{4x^2+3x+1}\to\frac{3x^2}{4x^2}=\frac34\) (same degree: ratio of leading coefficients)</li><li>numerator degree lower → 0</li><li>numerator degree higher → \(\pm\infty\) (check the sign!)</li></ul>` },
      { h: 'Asymptotes', body: T`<p><strong>Horizontal</strong>: compute \(\lim_{x\to+\infty}\) and \(\lim_{x\to-\infty}\); a finite value \(b\) gives \(y=b\) (at most two).</p>
<p><strong>Vertical</strong>: candidates are boundary points of the domain that are not in it. For a rational \(\frac{P(x)}{Q(x)}\): only zeros of \(Q\), but a common factor gives a hole, not an asymptote (\(\frac{x^3-1}{x-1}\) has no asymptote at 1).</p>
<p>Production \(q=200(1-0.9^t)\): as \(t\to+\infty\), \(0.9^t\to0\), so \(q\to200\). In the long run 200 units per day; horizontal asymptote \(q=200\).</p>` }
    ],
    pitfalls: [
      T`Using \(f(a)\) for the limit when \(f\) is not continuous at \(a\) (or not defined there).`,
      T`The leading-term rule only works for rational functions at \(\pm\infty\), not at a point.`,
      T`\(\frac{c}{0}\): decide the sign of the denominator from each side.`,
      T`Every zero of the denominator is a vertical asymptote: not if it cancels with the numerator.`
    ],
    examples: [
      { t: 'A 0/0 limit', p: T`Compute \(\lim_{x\to1}\dfrac{x^3-1}{x-1}\).`, s: [
        T`Substituting gives \(\frac00\): undetermined.`, T`Factor: \(x^3-1=(x-1)(x^2+x+1)\); cancel \(x-1\) (allowed, \(x\neq1\)).`, T`\(\lim_{x\to1}(x^2+x+1)=3\).`] },
      { t: 'Rational at infinity', p: T`Compute \(\lim_{x\to+\infty}\dfrac{3x^2+4x-1}{4x^2+3x+1}\).`, s: [
        T`Factor out the highest power: \(\dfrac{3x^2(1+\frac4{3x}-\frac1{3x^2})}{4x^2(1+\frac3{4x}+\frac1{4x^2})}\).`, T`The brackets tend to 1, so the limit is \(\frac{3x^2}{4x^2}=\frac34\).`] },
      { t: 'One-sided limits of a case-defined function', p: T`\(g(x)=\begin{cases}2x-1&x\le1\\2-0.5(x-2)^2&x>1\end{cases}\). Does \(\lim_{x\to1}g(x)\) exist?`, s: [
        T`Left: \(2\cdot1-1=1\). Right: \(2-0.5\cdot1=1.5\).`, T`The one-sided limits differ, so the limit does not exist.`] },
      { t: 'Full analysis', p: T`\(f(x)=\log_2\dfrac{x^2-4x+3}{2x-5}\). Find the domain, sign chart and asymptotes.`, s: [
        T`Domain: \(g(x)=\frac{(x-1)(x-3)}{2x-5}>0\). Sign chart of \(g\): zeros 1, 3; excluded 2.5.`, H.chart(['1', '2.5', '3'], ['-', '0', '+', '/', '-', '0', '+'], 'g(x)'),
        T`\(\operatorname{dom}f=]1,2.5[\,\cup\,\mathopen{]}3,+\infty[\). Zeros of \(f\): \(g(x)=1\iff x^2-6x+8=0\iff x=2,4\).`,
        H.chart(['1', '2', '2.5', '3', '4'], ['/', '/', '-', '0', '+', '/', '/', '/', '-', '0', '+']),
        T`Horizontal: \(x\to-\infty\) is not possible (domain); \(x\to+\infty\): \(g\to+\infty\Rightarrow f\to+\infty\). None.`,
        T`Vertical: \(x\to1\): \(g\to0^+\Rightarrow f\to-\infty\); \(x\to2.5^-\): \(g\to+\infty\Rightarrow f\to+\infty\); \(x\to3^+\): \(f\to-\infty\). Asymptotes \(x=1,\ x=2.5,\ x=3\).`] },
      { t: 'In the long run', p: T`Daily production on day \(t\): \(q=200(1-0.9^t)\). When is it above 100, and what happens in the long run?`, s: [
        T`\(200(1-0.9^t)>100\iff0.9^t<0.5\iff t>\frac{\log0.5}{\log0.9}\approx6.58\) (dividing by \(\log0.9<0\) flips).`,
        T`\(\lim_{t\to+\infty}200(1-0.9^t)=200(1-0)=200\): horizontal asymptote \(q=200\).`] }
    ],
    practice: [
      { name: 'Rational limit at ±∞', gen: function (R) {
        var n = R.int(1, 3), m = R.int(1, 3), a = R.nz(-6, 6), b = R.nz(-6, 6), dir = R.pick([1, -1]);
        var num = [a], den = [b];
        for (var i = 0; i < n; i++) num.push(R.int(-5, 5));
        for (var j = 0; j < m; j++) den.push(R.int(-5, 5));
        var ans, why;
        if (n < m) { ans = 0; why = T`degree numerator < degree denominator: \(\frac{${a}x^{${n}}}{${b}x^{${m}}}=\frac{${H.frac(a, b)}}{x^{${m - n}}}\to0\)`; }
        else if (n === m) { ans = a / b; why = T`same degree: \(\frac{${a}x^{${n}}}{${b}x^{${m}}}=${H.frac(a, b)}\)`; }
        else {
          var sgn = (a / b > 0 ? 1 : -1) * (dir < 0 && (n - m) % 2 === 1 ? -1 : 1);
          ans = sgn * INF; why = T`\(\frac{${a}x^{${n}}}{${b}x^{${m}}}=${H.frac(a, b)}x^{${n - m}}\to${sgn > 0 ? '+' : '-'}\infty\) as \(x\to${dir > 0 ? '+' : '-'}\infty\)`;
        }
        var numT = R.chance(0.35) ? H.polyAsc(num) : H.poly(num), denT = R.chance(0.35) ? H.polyAsc(den) : H.poly(den);
        return { q: T`Compute \(\lim\limits_{x\to${dir > 0 ? '+' : '-'}\infty}\dfrac{${numT}}{${denT}}\). (type inf or -inf for \(\pm\infty\))`, type: 'num', ans: ans, prompt: T`\lim=`,
          show: isFinite(ans) ? T`\(${n === m ? H.frac(a, b) : '0'}\)` : T`\(${ans > 0 ? '+' : '-'}\infty\)`, hint: 'Keep only the highest power in the numerator and in the denominator.',
          sol: [T`Leading terms: \(${a}x^{${n}}\) and \(${b}x^{${m}}\).`, why + '.'] };
      } },
      { name: 'A 0/0 limit', gen: function (R) {
        var kind = R.pick(['sq', 'quad', 'cube']), a = R.nz(-5, 5);
        if (kind === 'sq') return { q: T`Compute \(\lim\limits_{x\to${a}}\dfrac{x^2-${a * a}}{${H.lin(a)}}\).`, type: 'num', ans: 2 * a, prompt: T`\lim=`,
          sol: [T`Substituting gives \(\frac00\).`, T`\(x^2-${a * a}=(${H.lin(a)})(${H.lin(-a)})\); cancel.`, T`\(\lim(${H.lin(-a)})=${2 * a}\).`] };
        if (kind === 'cube') { a = R.nz(-3, 3); var a3 = a * a * a; return { q: T`Compute \(\lim\limits_{x\to${a}}\dfrac{x^3${H.signed(-a3)}}{${H.lin(a)}}\).`, type: 'num', ans: 3 * a * a, prompt: T`\lim=`,
          sol: [T`\(\frac00\): factor \(x^3${H.signed(-a3)}=(${H.lin(a)})(x^2${H.signed(a)}x+${a * a})\).`, T`Cancel and substitute: \(${a * a}${H.signed(a * a)}+${a * a}=${3 * a * a}\).`] }; }
        var r2 = R.int(-5, 5); while (r2 === a) r2 = R.int(-5, 5);
        return { q: T`Compute \(\lim\limits_{x\to${a}}\dfrac{${H.poly([1, -(a + r2), a * r2])}}{${H.lin(a)}}\).`, type: 'num', ans: a - r2, prompt: T`\lim=`,
          sol: [T`\(\frac00\): factor the numerator: \((${H.lin(a)})(${H.lin(r2)})\).`, T`Cancel: \(\lim_{x\to${a}}(${H.lin(r2)})=${a - r2}\).`] };
      } },
      { name: 'Vertical asymptotes', gen: function (R) {
        var q = R.int(-5, 5), s = R.int(-5, 5); while (s === q) s = R.int(-5, 5);
        var hole = R.chance(0.4), p = hole ? R.pick([q, s]) : R.int(-5, 5);
        while (!hole && (p === q || p === s)) p = R.int(-5, 5);
        var vas = [q, s].filter(function (v) { return v !== p; });
        return { q: T`Find all vertical asymptotes of \(f(x)=\dfrac{${H.lin(p)}}{${H.poly([1, -(q + s), q * s])}}\). Enter their \(x\)-values.`, type: 'set', ans: vas, prompt: 'x=',
          hint: 'Factor the denominator. Does a factor cancel with the numerator?',
          sol: [T`Denominator: \((${H.lin(q)})(${H.lin(s)})\), zeros \(${q}\) and \(${s}\).`, hole ? T`\(${H.lin(p)}\) cancels: at \(x=${p}\) there is a hole (finite limit), not an asymptote.` : T`The numerator is not 0 there, so \(\frac{c}{0}\to\pm\infty\) at both.`,
            T`Vertical asymptote${vas.length > 1 ? 's' : ''}: ${vas.map(function (v) { return T`\(x=${v}\)`; }).join(' and ')}.`] };
      } },
      { name: 'Horizontal asymptote', gen: function (R) {
        var kind = R.pick(['lin', 'shift', 'exp']);
        if (kind === 'lin') {
          var a = R.nz(-6, 6), b = R.int(-5, 5), c = R.nz(-4, 4), d = R.int(-5, 5);
          return { q: T`Find the horizontal asymptote \(y=b\) of \(f(x)=\dfrac{${H.poly([a, b])}}{${H.poly([c, d])}}\). Enter \(b\).`, type: 'num', ans: a / c, prompt: 'b=', show: T`\(y=${H.frac(a, c)}\)`,
            sol: [T`Same degree: \(\lim_{x\to\pm\infty}f(x)=\frac{${a}x}{${c}x}=${H.frac(a, c)}\).`] };
        }
        if (kind === 'shift') {
          var A = R.int(-5, 5), B = R.nz(-6, 6), C = R.int(-4, 4);
          return { q: T`Find the horizontal asymptote \(y=b\) of \(f(x)=${A}+\dfrac{${B}}{${H.lin(C)}}\). Enter \(b\).`, type: 'num', ans: A, prompt: 'b=',
            sol: [T`\(\frac{${B}}{${H.lin(C)}}\to0\) as \(x\to\pm\infty\).`, T`\(f(x)\to${A}\): \(y=${A}\).`] };
        }
        var M = R.pick([50, 120, 200, 500]), g = R.pick([0.5, 0.8, 0.9]), K = R.int(-30, 30);
        return { q: T`Find the horizontal asymptote (for \(t\to+\infty\)) of \(y=${M}\cdot${g}^t${K ? H.signed(K) : ''}\).`, type: 'num', ans: K, prompt: 'y=',
          sol: [T`\(0<${g}<1\Rightarrow${g}^t\to0\).`, T`\(y\to${M}\cdot0${K ? H.signed(K) : ''}=${K}\).`] };
      } },
      { name: 'In the long run', gen: function (R) {
        if (R.chance()) {
          var M = R.pick([150, 200, 400, 1000]), g = R.pick([0.8, 0.9, 0.95]);
          return { q: T`Daily output on day \(t\) is \(q=${M}(1-${g}^t)\). How much is produced per day in the long run?`, type: 'num', ans: M, prompt: 'q\\to',
            sol: [T`\(${g}^t\to0\) as \(t\to+\infty\).`, T`\(q\to${M}(1-0)=${M}\).`] };
        }
        var L = R.pick([500, 1000, 8000]), k = R.pick([4, 9, 20]), r = R.pick([0.3, 0.5, 1.2]);
        return { q: T`A population follows \(N(t)=\dfrac{${L}}{1+${k}e^{-${r}t}}\). What is the carrying capacity (the limit as \(t\to+\infty\))?`, type: 'num', ans: L, prompt: 'N\\to',
          sol: [T`\(e^{-${r}t}\to0\), so the denominator \(\to1\).`, T`\(N\to${L}\).`] };
      } },
      { name: 'One-sided limits', gen: function (R) {
        var a = R.int(-4, 4), c = R.nz(-5, 5), k = R.pick([1, 1, 2]), side = R.pick(['+', '-']);
        var dsign = k === 2 ? 1 : side === '+' ? 1 : -1, res = c * dsign > 0 ? 0 : 1;
        var den = k === 1 ? H.lin(a) : T`(${H.lin(a)})^2`;
        return { q: T`Compute \(\lim\limits_{x\to${a}^{${side}}}\dfrac{${c}}{${den}}\).`, type: 'mc', keepOrder: true, choices: [P(T`+\infty`), P(T`-\infty`), P('0'), P(String(c))], ans: res,
          sol: [T`Numerator \(\to${c}\); denominator \(\to0\).`, k === 2 ? 'A square is positive: the denominator → 0⁺.' : T`For \(x\) slightly ${side === '+' ? 'larger' : 'smaller'} than ${a}, \(${H.lin(a)}\) is ${side === '+' ? 'positive' : 'negative'}.`,
            T`\(\frac{${c}}{0^{${dsign > 0 ? '+' : '-'}}}\to${res === 0 ? '+' : '-'}\infty\).`] };
      } }
    ],
    course: [
      { q: T`Compute \(\lim_{x\to+\infty}\left(5-\frac3{(-2x+3)^2}\right)\).`, a: T`\(5\)` },
      { q: T`\(f(x)=\log_2\frac{x^2-4x+3}{2x-5}\): domain, sign chart, horizontal and vertical asymptotes.`, a: T`Domain \(]1,2.5[\,\cup\,\mathopen{]}3,+\infty[\); zeros 2 and 4; no horizontal asymptote; vertical asymptotes \(x=1,\ 2.5,\ 3\). See example 4.` },
      { q: T`\(q=200(1-0.9^t)\): a) why is it increasing? b) when is \(q>100\)? c) long run? d) consequence for the graph?`, a: T`a) \(0.9^t\) falls; reflect (\(-0.9^t\), rises), shift up 1, stretch ×200: still rising. b) \(t>6.58\) days. c) 200 units per day. d) horizontal asymptote \(q=200\).` }
    ]
  };

  MS.addTopic({ id: 't2', code: 'Topic 2', title: 'Functions: basic concepts and applications', lessons: [def, types, impl, inv, sym, signs, lim] });
})();
