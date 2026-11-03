/* Topic 2 exercise sheets: "Functions of one variable" exercises (28–36, 45–48) and "Review problems Topic 1 and 2". */
(function () {
  'use strict';
  var T = String.raw, H = MS.h, fmt = H.fmt, E = MS.ex, S = E.S, N = E.N, MC = E.MC;
  var ln = Math.log;
  function P(s) { return T`\(${s}\)`; }
  var R_ = T`\mathbb R`;

  var M_DOM = ['Context first: can the variable be negative?', T`Then the equation: denominator \(\neq0\), even root: argument \(\ge0\), log: argument \(>0\). An odd root (\(\sqrt[3]{\ }\)) and \(e^x\) give no restriction.`, 'Solve each restriction; for products and quotients use a sign chart.', T`Combine all restrictions and write the domain in interval notation (\(\cup\) for “or”).`];
  function domPart(label, f, steps) { return { label: label, q: T`\(f(x)=${f}\)`, steps: steps }; }

  var ex = [];
  ex.push({ num: '28', title: 'Find the domain', lesson: 'func-def', similar: [['func-def', 2]], method: M_DOM,
    gen: function () { return { context: 'Find the domain of each function.', parts: [
      domPart('(a)', T`\dfrac{x-0.5}{x+0.5}`, [S('Denominator ≠ 0: which x is excluded?', N(-0.5, 'x\\neq'), ''), S('Domain:', MC([P(R_ + T`\setminus\{-0.5\}`), P(R_ + T`\setminus\{0.5\}`), P(T`]-0.5,+\infty[`), P(R_)], 0), '')]),
      domPart('(b)', T`\dfrac{x+5}{x^2+x-6}`, [S(T`Zeros of the denominator \(x^2+x-6=(x+3)(x-2)\):`, E.SET([-3, 2], 'x='), ''), S('Domain:', MC([P(R_ + T`\setminus\{-3,2\}`), P(R_ + T`\setminus\{-5\}`), P(R_ + T`\setminus\{3,-2\}`), P(R_ + T`\setminus\{-5,-3,2\}`)], 0), T`The numerator may be 0; only the denominator matters.`)]),
      domPart('(c)', T`\sqrt{x-3}`, [S(T`\(x-3\ge0\)`, E.INEQ('>=', 3), T`\([3,+\infty[\)`)]),
      domPart('(d)', T`\sqrt[3]{4x+3}`, [S('A cube root of a negative number exists. Domain:', MC([P(R_), P(T`[-0.75,+\infty[`), P(T`]-0.75,+\infty[`)], 0), T`\(\sqrt[3]{-8}=-2\): no restriction.`)]),
      domPart('(e)', T`\dfrac{1}{\sqrt{3-x}}`, [S(T`Root in the denominator: \(3-x>0\) (strict, it cannot be 0).`, E.INEQ('<', 3), T`\(]-\infty,3[\)`)]),
      domPart('(f)', T`e^x`, [S('Domain:', MC([P(R_), P(T`]0,+\infty[`), P(T`[0,+\infty[`)], 0), '')]),
      domPart('(g)', T`\dfrac{1}{\log_3x}`, [S(T`Log: \(x>0\). Denominator: \(\log_3x\neq0\iff x\neq\,?\)`, N(1, 'x\\neq'), ''), S('Domain:', MC([P(T`]0,1[\,\cup\,]1,+\infty[`), P(T`]0,+\infty[`), P(T`]1,+\infty[`), P(R_ + T`\setminus\{1\}`)], 0), '')]),
      domPart('(h)', T`\ln(x^2+2x-3)`, [S(T`Need \((x+3)(x-1)>0\). Zeros:`, E.SET([-3, 1], 'x='), ''), S('Sign chart: positive outside the zeros. Domain:', MC([P(T`]-\infty,-3[\,\cup\,]1,+\infty[`), P(T`]-3,1[`), P(T`]-\infty,-3]\,\cup\,[1,+\infty[`)], 0), H.chart(['-3', '1'], ['+', '0', '-', '0', '+']))])
    ] }; } });

  ex.push({ num: '29', title: 'Find the range', lesson: 'func-def', similar: [['func-def', 3]], method: ['Start from the domain.', 'Use the shape of the basic graph: what is the lowest/highest value, which values are never reached?', T`Watch the difference between reached (\([\)) and only approached (\(]\)).`],
    gen: function () { return { context: 'Range of the functions of exercise 28 (c)–(g).', parts: [
      { label: '(a)', q: T`\(\sqrt{x-3}\)`, steps: [S('Lowest value 0 at x = 3; no upper limit.', MC([P(T`[0,+\infty[`), P(T`[3,+\infty[`), P(R_)], 0), '')] },
      { label: '(b)', q: T`\(\sqrt[3]{4x+3}\)`, steps: [S('A cube root takes every real value.', MC([P(R_), P(T`[0,+\infty[`)], 0), '')] },
      { label: '(c)', q: T`\(\frac1{\sqrt{3-x}}\)`, steps: [S('Positive; near x = 3 very large, for x → −∞ close to 0.', MC([P(T`]0,+\infty[`), P(T`[0,+\infty[`), P(R_ + T`\setminus\{0\}`)], 0), '')] },
      { label: '(d)', q: T`\(e^x\)`, steps: [S('Always positive, never 0.', MC([P(T`]0,+\infty[`), P(R_), P(T`[1,+\infty[`)], 0), '')] },
      { label: '(e)', q: T`\(\frac1{\log_3x}\)`, steps: [S(T`\(\log_3x\) takes every value except where we excluded 0, so \(\frac1{\log_3x}\) takes every value except 0.`, MC([P(R_ + T`\setminus\{0\}`), P(R_), P(T`]0,+\infty[`)], 0), '')] }] }; } });

  ex.push({ num: '30', title: 'Build a function with a given domain', lesson: 'func-def', similar: [['func-def', 2]], method: [T`\(\ln(x-a)\) has domain \(]a,+\infty[\).`, T`\(\frac{1}{x-a}\) removes the single value \(a\); a product of factors in the denominator removes several values.`, 'Combine: a log for the interval, a denominator for the holes.'],
    gen: function () { return { context: 'Which function has the given domain? (Many answers are possible; these are typical ones.)', parts: [
      { label: '(a)', q: T`\(]-4,+\infty[\)`, steps: [S('Pick one:', MC([P(T`\ln(x+4)`), P(T`\sqrt{x+4}`), P(T`\frac1{x+4}`)], 0), T`\(\sqrt{x+4}\) would include \(-4\).`)] },
      { label: '(b)', q: T`\(\mathbb R\setminus\{-1,0,1\}\)`, steps: [S('Pick one:', MC([P(T`\frac{1}{x^3-x}`), P(T`\frac1{x^2-1}`), P(T`\ln(x^3-x)`)], 0), T`\(x^3-x=x(x-1)(x+1)\) is zero exactly at \(-1,0,1\).`)] },
      { label: '(c)', q: T`\(]-4,-1[\,\cup\,]-1,+\infty[\)`, steps: [S('Pick one:', MC([P(T`\frac{\ln(x+4)}{x+1}`), P(T`\frac{\ln(x+1)}{x+4}`), P(T`\ln\left((x+4)(x+1)\right)`)], 0), '')] }] }; } });

  var imp = [
    ['(a)', T`2x-\tfrac23y+\tfrac37=0`, 0, T`y=3x+\tfrac9{14}`], ['(b)', T`2xy+3y-x+1=0`, 0, T`y(2x+3)=x-1\Rightarrow y=\frac{x-1}{2x+3}`], ['(c)', T`x^2+y^3=1`, 0, T`y=\sqrt[3]{1-x^2}`],
    ['(d)', T`y^2-x^2+1=0`, 1, T`y=\pm\sqrt{x^2-1}`], ['(e)', T`x^2+y^4=1`, 1, T`y=\pm\sqrt[4]{1-x^2}`], ['(f)', T`4x^2y^2+4xy^2-15y^2-4=0`, 1, T`y^2(4x^2+4x-15)=4\Rightarrow y=\pm\frac{2}{\sqrt{4x^2+4x-15}}`],
    ['(g)', T`y^2+xy-2x^2=0`, 1, T`(y-x)(y+2x)=0\Rightarrow y=x\ \text{or}\ y=-2x`], ['(h)', T`e^x+e^y=1`, 0, T`y=\ln(1-e^x)`], ['(i)', T`e^x-2e^y=1`, 0, T`y=\ln\frac{e^x-1}{2}`], ['(j)', T`(e^x)^2+(e^y)^2=1`, 0, T`e^{2y}=1-e^{2x}\Rightarrow y=\tfrac12\ln(1-e^{2x})`]];
  ex.push({ num: '32', title: 'Function or relation?', lesson: 'implicit', similar: [['implicit', 2], ['implicit', 0]], method: ['Try to solve the equation for y.', T`If you need a \(\pm\) (even root) or get two separate solutions, one \(x\) gives two \(y\)’s: a <strong>relation</strong>, not a function.`, T`Odd roots (\(\sqrt[3]{\ }\)), \(\ln\) and dividing give a single \(y\): a <strong>function</strong>.`, T`If \(y\) appears in several terms, factor it out first (e.g. \(y(2x+3)=x-1\)).`],
    gen: function () { return { parts: imp.map(function (it) { return { label: it[0], q: T`\(${it[1]}\)`, steps: [S('Solve for y. Does each x give one y?', MC(['Function', 'Relation (not a function)'], it[2], true), T`\(${it[3]}\)`)] }; }) }; } });

  ex.push({ num: '33', title: 'Find the other variable', lesson: 'implicit', similar: [['implicit', 4]], method: ['Substitute the given value.', 'Solve the remaining equation in the other variable (often quadratic).', T`For \(e^y\) and \(e^{-y}\): substitute \(u=e^y\) and multiply by \(u\).`, 'Keep only values that are allowed (e.g. σ > 0).'],
    gen: function () {
      var s1 = Math.sqrt(7 + Math.sqrt(63 / 4)), s2 = Math.sqrt(7 - Math.sqrt(63 / 4));
      return { parts: [
        { label: '(a)', q: T`\(\frac{(\mu-5)^2}{16}+\frac{(\sigma^2-7)^2}{36}=1\), \(\mu=8\), \(\sigma>0\)`, steps: [S(T`\(\frac{9}{16}+\frac{(\sigma^2-7)^2}{36}=1\Rightarrow(\sigma^2-7)^2=\)`, N(36 * 7 / 16, '='), T`\(15.75\)`), S(T`\(\sigma^2=7\pm\sqrt{15.75}\); both positive. \(\sigma\) values:`, E.SET([s1, s2], '\\sigma='), '')] },
        { label: '(b)', q: T`\(y^2-4xy+x^2=1\), \(x=2\)`, steps: [S(T`\(y^2-8y+3=0\): \(y=4\pm\sqrt{13}\)`, E.SET([4 + Math.sqrt(13), 4 - Math.sqrt(13)], 'y='), '')] },
        { label: '(c)', q: T`\(y^3-xy^2+xy-y=0\), \(x=0\)`, steps: [S(T`\(y^3-y=y(y-1)(y+1)=0\)`, E.SET([-1, 0, 1], 'y='), '')] },
        { label: '(d)', q: T`\(xe^y+2e^{-y}-x^2=2\), \(x=1\)`, steps: [S(T`\(e^y+2e^{-y}=3\). With \(u=e^y\): \(u^2-3u+2=0\Rightarrow u=\)`, E.SET([1, 2], 'u='), ''), S(T`\(y=\ln u\)`, E.SET([0, ln(2)], 'y='), T`\(y=0\) or \(y=\ln2\)`)] }] };
    } });

  var invs = [
    ['(a)', 'x-7', ['x+7', '7-x', '\\frac1{x-7}'], 'y=x-7\\Rightarrow x=y+7'], ['(b)', '2x', ['\\frac x2', '2x', 'x-2'], 'x=\\frac y2'], ['(c)', '4-5x', ['\\frac{4-x}5', '\\frac{x-4}5', '4+5x'], 'x=\\frac{4-y}5'],
    ['(d)', 'x^3', ['\\sqrt[3]x', 'x^{-3}', '\\frac x3'], 'x=\\sqrt[3]y'], ['(e)', '3^x', ['\\log_3x', 'x^3', '\\frac1{3^x}'], 'x=\\log_3y'], ['(f)', '\\sqrt[3]{x+5}', ['x^3-5', '(x-5)^3', 'x^3+5'], 'y^3=x+5'],
    ['(g)', '\\frac{\\sqrt[5]x-1}7', ['(7x+1)^5', '(7x-1)^5', '7x^5+1'], '7y+1=\\sqrt[5]x'], ['(h)', '\\log_3(x+1)', ['3^x-1', '3^{x-1}', '3^x+1'], 'x+1=3^y']];
  ex.push({ num: '34', title: 'Find the inverse function', lesson: 'inverse', similar: [['inverse', 2], ['inverse', 0]], method: [T`Write \(y=f(x)\).`, T`Solve for \(x\) (undo the operations in reverse order: the last thing done to \(x\) is undone first).`, T`Swap the names \(x\) and \(y\) (pure maths only).`, T`Check: \(f(f^{-1}(x))=x\).`],
    gen: function () { return { parts: invs.map(function (it) { return { label: it[0], q: T`\(f(x)=${it[1]}\)`, steps: [S(T`Solve \(y=${it[1]}\) for \(x\), then swap. \(f^{-1}(x)=\)`, MC(it[2].map(P), 0), T`\(${it[3]}\), so \(f^{-1}(x)=${it[2][0]}\).`)] }; }) }; } });

  ex.push({ num: '35', title: 'A function that is its own inverse', lesson: 'inverse', similar: [['symmetry', 3], ['inverse', 2]], method: [T`Symmetric about \(y=x\): swap \(x\) and \(y\) and check you get the same equation back.`, T`Then \(f^{-1}=f\), so \(f(f(x))=x\). Verify by substituting \(f(x)\) into \(f\).`],
    gen: function () { return { context: T`\(f(x)=\dfrac{x}{x-1}\)`, parts: [
      { label: '(a)', q: 'Show the graph is symmetric about y = x.', steps: [S(T`Swap: \(x=\frac{y}{y-1}\Rightarrow xy-x=y\Rightarrow y(x-1)=x\Rightarrow\)`, MC([P(T`y=\frac{x}{x-1}`), P(T`y=\frac{x-1}{x}`), P(T`y=x-1`)], 0), 'The same equation: symmetric about y = x.')] },
      { label: '(b)', q: T`Compute \(f(f(x))\).`, steps: [S(T`\(f(f(x))=\dfrac{\frac{x}{x-1}}{\frac{x}{x-1}-1}=\dfrac{\frac{x}{x-1}}{\frac{1}{x-1}}=\)`, MC([P('x'), P('1'), P(T`\frac1x`)], 0), '')] }] }; } });

  ex.push({ num: '36', title: 'Symmetric quartic with given zeros', lesson: 'symmetry', similar: [['symmetry', 4]], method: ['Symmetric about the y-axis: only even powers may appear, so odd coefficients are 0.', 'A zero x = 0 means the constant term is 0.', 'Substitute another zero to find the last coefficient.'],
    gen: function () { return { context: T`\(y=x^4+ax^3+bx^2+cx+d\), symmetric about the \(y\)-axis, zeros \(-1,0,1\).`, parts: [
      { label: '', q: T`Find \(a,b,c,d\).`, steps: [S(T`Symmetric about the \(y\)-axis: \(a=c=\,?\)`, N(0, 'a=c='), ''), S(T`Zero at 0: \(d=\)`, N(0, 'd='), ''), S(T`Zero at 1: \(1+b=0\Rightarrow b=\)`, N(-1, 'b='), ''), S(T`Enter \(a,b,c,d\).`, E.TUP([0, -1, 0, 0]), T`\(y=x^4-x^2\)`)] }] }; } });

  ex.push({ num: '45', title: 'Inverse demand: domain and range', lesson: 'func-def', vary: true, similar: [['func-def', 6], ['inverse', 4]], method: ['Context: quantity and price are both ≥ 0.', 'Turn p ≥ 0 into a condition on q.', 'The range follows from the end points of the domain (the function is linear).'],
    gen: function (R, orig) { var a = orig ? 26 : R.pick([20, 30, 40]), k = orig ? 40 : R.pick([10, 20, 50]);
      return { context: T`\(p=f(q)=${a}-\frac{q}{${k}}\)`, parts: [
        { label: '(a)', q: 'Domain: largest q?', steps: [S(T`\(p\ge0\iff q\le${a}\cdot${k}\)`, N(a * k, 'q_{max}='), T`\([0,${a * k}]\)`)] },
        { label: '(b)', q: 'Range: largest p?', steps: [S(T`At \(q=0\): \(p=${a}\)`, N(a, 'p_{max}='), T`\([0,${a}]\)`)] }] }; } });

  ex.push({ num: '46', title: 'Revenue: domain, range, zeros', lesson: 'func-def', vary: true, similar: [['func-def', 6], ['func-def', 1]], method: ['Context: q ≥ 0 and revenue ≥ 0.', T`A parabola \(aq^2+bq\) with \(a<0\) has its top at \(q=-\frac{b}{2a}\).`, 'Zeros: factor out q.'],
    gen: function (R, orig) { var b = orig ? 1000 : R.pick([600, 800, 1200]), a = orig ? 2 : R.pick([1, 2, 4]), qm = b / a, top = b * b / (4 * a);
      return { context: T`\(r=${b}q-${a === 1 ? '' : a}q^2\)`, parts: [
        { label: '(a)', q: 'Domain: largest q?', steps: [S(T`\(r\ge0\iff q(${b}-${a}q)\ge0\iff q\le\)`, N(qm, 'q_{max}='), T`\([0,${fmt(qm)}]\)`)] },
        { label: '(b)', q: 'Range: highest revenue?', steps: [S(T`Top at \(q=\frac{${b}}{${2 * a}}\)`, N(qm / 2, 'q='), ''), S('Revenue there:', N(top, 'r_{max}='), T`\([0,${fmt(top)}]\)`)] },
        { label: '(c)', q: 'Where is the revenue 0?', steps: [S(T`\(q(${b}-${a}q)=0\)`, E.SET([0, qm], 'q='), '')] }] }; } });

  ex.push({ num: '47', title: 'Volume of an open box', lesson: 'func-def', vary: true, similar: [['func-def', 0]], method: ['Cutting x from each corner shortens each side by 2x; the height is x.', 'Volume = length × width × height.', 'Domain: all sides must be positive.'],
    gen: function (R, orig) { var L = orig ? 10 : R.pick([12, 16, 20]), W = orig ? 8 : L - R.pick([2, 4, 6]), x0 = orig ? 1 : R.pick([1, 2]);
      return { context: T`A ${L} by ${W} plate; squares of side \(x\) are cut from the corners.`, parts: [
        { label: '(a)', q: T`Equation for \(V(x)\).`, steps: [S('Which is it?', MC([P(T`V=x(${L}-2x)(${W}-2x)`), P(T`V=(${L}-x)(${W}-x)`), P(T`V=x^2(${L}-2x)`)], 0), ''), S(T`Check: \(V(${x0})=\)`, N(x0 * (L - 2 * x0) * (W - 2 * x0), T`V(${x0})=`), '')] },
        { label: '(b)', q: 'Domain: largest x (not included)?', steps: [S(T`\(${W}-2x>0\iff x<\)`, N(W / 2, 'x<'), T`Domain \(]0,${W / 2}[\)`)] }] }; } });

  var tax = [[6430, 0, 0], [7900, 0.25, 1607.5], [11240, 0.3, 2002.5], [18730, 0.4, 3126.5], [34330, 0.45, 4063], [Infinity, 0.5, 5779.5]];
  function T_(I) { for (var i = 0; i < tax.length; i++) if (I <= tax[i][0]) return tax[i][1] * I - tax[i][2]; }
  ex.push({ num: '48', title: 'Belgian income tax (case-defined)', lesson: 'func-types', vary: true, similar: [['func-types', 2], ['func-types', 3]], method: ['Write one case per income bracket, with its own formula.', 'To evaluate: find the bracket first (watch “at most” = ≤).', 'Check continuity: at each boundary both formulas give the same tax.'],
    gen: function (R, orig) {
      var I = orig ? 10000 : R.pick([7000, 9500, 15000, 25000, 40000]), b = tax.filter(function (t) { return I <= t[0]; })[0];
      return { context: T`\(T(I)=\begin{cases}0&I\le6430\\0.25I-1607.5&6430<I\le7900\\0.30I-2002.5&7900<I\le11\,240\\0.40I-3126.5&11\,240<I\le18\,730\\0.45I-4063&18\,730<I\le34\,330\\0.50I-5779.5&I>34\,330\end{cases}\)`, parts: [
        { label: '', q: T`Tax on an income of €${I}?`, steps: [S('Which rate applies (as a decimal)?', N(b[1], 'rate='), ''), S('Tax:', N(T_(I), 'T='), '')] },
        { label: 'check', q: 'Is the tax continuous at €7900?', steps: [S(T`\(0.25\cdot7900-1607.5=\)`, N(367.5, '='), ''), S(T`\(0.30\cdot7900-2002.5=\)`, N(367.5, '='), 'Same value: no jump.')] }] };
    } });

  MS.addSheet({ id: 't2q', topic: 't2', title: 'Functions of one variable: exercises', sub: 'Exercises 28–36 and 45–48: domain, range, implicit, inverse, applications', exercises: ex });

  /* ---------------- Review problems Topic 1 and 2 ---------------- */
  var rv = [];
  rv.push({ num: 'R1', title: 'Rational function with parameters', lesson: 'limits', vary: true, similar: [['limits', 3], ['signs', 2]], method: [T`Vertical asymptote at the zero of the denominator: \(bx+8=0\).`, T`Horizontal asymptote of \(\frac{ax-4}{bx+8}\) is \(y=\frac ab\) (same degree).`, T`Domain of \(\ln\frac{P}{Q}\): sign chart of \(\frac PQ\), keep where it is \(>0\).`, T`Sign of \(\ln A\): negative if \(0<A<1\), zero if \(A=1\), positive if \(A>1\).`],
    gen: function (R, orig) {
      var va = orig ? 1.6 : R.pick([2, 4, -2, 0.8]), ha = orig ? -0.6 : R.pick([1.5, -2, 0.5, 3]), b = -8 / va, a = ha * b;
      var c = orig ? 4 : R.pick([2, 4, 8]), pole = -8 / c, z = (8 + 4) / (2 - c);
      var zeroOK = c !== 2;
      return { context: T`\(f(x)=\dfrac{ax-4}{bx+8}\) and \(g(x)=\ln\left(\dfrac{2x-4}{cx+8}\right)\) with \(c>0\).`, parts: [
        { label: '(a)', q: T`Find \(a,b\) for a horizontal asymptote \(y=${fmt(ha)}\) and a vertical asymptote \(x=${fmt(va)}\).`, steps: [S(T`\(b\cdot${fmt(va)}+8=0\Rightarrow b=\)`, N(b, 'b='), ''), S(T`\(\frac ab=${fmt(ha)}\Rightarrow a=\)`, N(a, 'a='), '')] },
        { label: '(b)', q: T`With \(c=${c}\): domain of \(g\).`, steps: [S(T`Zero of the numerator and pole of the denominator:`, E.TUP([2, pole]), T`numerator 0 at 2, denominator 0 at \(${fmt(pole)}\)`), S('Sign chart of the fraction; keep where it is positive:', MC([P(T`]-\infty,${fmt(pole)}[\,\cup\,]2,+\infty[`), P(T`]${fmt(pole)},2[`), P(T`]-\infty,${fmt(pole)}]\,\cup\,[2,+\infty[`)], 0), '')] },
        { label: '(c)', q: T`Zero of \(g\) for \(c=${c}\).`, steps: zeroOK ? [S(T`\(g=0\iff\frac{2x-4}{${c}x+8}=1\iff2x-4=${c}x+8\)`, N(z, 'x='), z < pole ? T`It lies in the domain, left of \(${fmt(pole)}\).` : 'Check it lies in the domain.')] : [S('With c = 2 the fraction never equals 1, so g has no zero.', MC(['No zero', 'x = 0'], 0, true), '')] }] };
    } });

  rv.push({ num: 'R2', title: 'Revenue, inverse demand and profit', lesson: 'inverse', similar: [['inverse', 4], ['signs', 1]], method: [T`Revenue \(r=p\cdot q\Rightarrow p=\frac rq\).`, 'Inverse: solve p(q) for q; domain and range swap.', 'Profit: r(q) − c(q) > 0. Bring everything to one side and find the zeros with the GC, then a sign chart.'],
    gen: function () {
      var P_ = function (q) { return Math.sqrt(4 * q * q - 0.25 * Math.pow(q, 5)) - (6 * q + 8) / (q + 8); }, z = [], prev = P_(0.001);
      for (var q = 0.0015; q <= Math.cbrt(16); q += 0.0005) { var v = P_(q); if (v * prev < 0) z.push(q); prev = v; }
      return { context: T`\(r(q)=\sqrt{4q^2-0.25q^5}\), cost \(c(q)=\dfrac{6q+8}{q+8}\).`, parts: [
        { label: '(a)', q: T`Inverse demand \(p(q)\) and its domain.`, steps: [S(T`\(p=\frac{r}{q}=\frac{\sqrt{q^2(4-0.25q^3)}}{q}=\)`, MC([P(T`\sqrt{4-0.25q^3}`), P(T`\sqrt{4q-0.25q^4}`), P(T`2-0.5q^{1.5}`)], 0), ''), S(T`Domain: \(4-0.25q^3\ge0\iff q\le\sqrt[3]{16}\approx\)`, N(Math.cbrt(16), 'q_{max}='), T`\([0,\sqrt[3]{16}]\)`)] },
        { label: '(b)', q: T`Demand function \(q(p)\), domain and range.`, steps: [S(T`\(p^2=4-0.25q^3\Rightarrow q=\)`, MC([P(T`\sqrt[3]{16-4p^2}`), P(T`\sqrt[3]{4-p^2}`), P(T`16-4p^2`)], 0), ''), S('Largest price (q ≥ 0):', N(2, 'p_{max}='), T`Domain \([0,2]\), range \([0,\sqrt[3]{16}]\)`)] },
        { label: '(c)', q: 'For which q is there a profit?', steps: [S(T`Solve \(r(q)-c(q)=0\) with the GC: the two zeros.`, E.TUP(z), T`about \(0.71\) and \(2.33\)`), S('Profit where r − c > 0:', MC([P(T`]${fmt(z[0], 2)},\,${fmt(z[1], 2)}[`), P(T`[0,${fmt(z[0], 2)}[`), P(T`]${fmt(z[1], 2)},\sqrt[3]{16}]`)], 0), '')] }] };
    } });

  MS.addSheet({ id: 't2r', topic: 't2', title: 'Review problems Topics 1 and 2', sub: 'Parameters and asymptotes; revenue, demand and profit', exercises: rv });
})();
