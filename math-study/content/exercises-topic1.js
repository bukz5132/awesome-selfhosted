/* Topic 1 exercise sheets: "Questions Topic 1" (1–27) and "Review problems Topic 1" (1–3). */
(function () {
  'use strict';
  var T = String.raw, H = MS.h, fmt = H.fmt, E = MS.ex, S = E.S, N = E.N, MC = E.MC;
  var ln = Math.log, lg = Math.log10;
  function f2(x) { return fmt(x, 2); }
  function f4(x) { return fmt(x, 4); }

  /* shared method texts */
  var M_POW = [T`Rewrite every root as a power: \(\sqrt[n]{x^m}=x^{m/n}\), and \(\frac{1}{x^a}=x^{-a}\).`, T`Same base multiplied → <strong>add</strong> the exponents; divided → <strong>subtract</strong>.`, T`A power of a power → <strong>multiply</strong> the exponents: \((x^a)^b=x^{ab}\).`, 'Work out the exponent as a fraction or decimal at the end.'];
  var M_EXPEQ = [T`<strong>Exponential equation</strong> (unknown in the exponent): isolate the power \(b^{x}=k\), take \(\log\) or \(\ln\) of both sides, bring the exponent down with the power rule, solve.`,
    T`If both sides are powers of the same base (\(9=3^2\), \(\frac1{7}=7^{-1}\)), write them with that base and set the exponents equal.`,
    T`<strong>Log equation</strong> (unknown inside a log): bring everything to one log on each side, or isolate the log and use \(\log_g A=y\iff A=g^y\).`,
    T`<strong>Check</strong> every solution of a log equation: all arguments must be positive.`,
    T`<strong>Inequality</strong>: same steps, but the sign flips when you apply \(\log_b\) with \(0<b<1\) or divide by a negative number (like \(\ln0.975\)).`];
  var M_GROWTH = ['Define the variables with units: what is t, what does the function measure?', 'Find the initial value b and the growth factor g per time unit (+p% → 1 + p/100, −p% → 1 − p/100).', T`Write the model \(y(t)=b\cdot g^t\) (or \(b+mt\) for linear growth).`, 'Translate the question into an equation or inequality and solve it with logs.', 'Answer in words, with units. Do not round in between.'];

  function graphPart(letter, choices, ans, why) {
    return { label: 'Graph ' + letter, q: T`Which base belongs to graph ${letter}?`, steps: [S('Look at whether it rises or falls and how steep it is.', MC(choices, ans), why)] };
  }

  var ex = [];

  ex.push({ num: '1', title: 'Write as a single power of x', lesson: 'exp', similar: [['exp', 1], ['exp', 0]], method: M_POW,
    gen: function () {
      return { context: T`Let \(x>0\). Write each expression as a single power \(x^n\) and give \(n\).`, parts: [
        { label: '(a)', q: T`\(\left(x^{0.5}\right)^3\)`, steps: [S('A power of a power: multiply the exponents. What is n?', N(1.5, 'n='), T`\(\left(x^{0.5}\right)^3=x^{0.5\cdot3}=x^{1.5}\)`)] },
        { label: '(b)', q: T`\(x^2\sqrt[3]{x}\)`, steps: [S(T`Write the cube root as a power: \(\sqrt[3]{x}=x^{?}\)`, N(1 / 3, '?='), T`\(\sqrt[3]{x}=x^{1/3}\)`), S('Same base multiplied: add the exponents.', N(7 / 3, 'n='), T`\(x^{2+\frac13}=x^{7/3}\)`)] },
        { label: '(c)', q: T`\(\left(\dfrac{1}{x^{0.25}}\right)^6\)`, steps: [S(T`Write \(\frac1{x^{0.25}}\) as a power of \(x\).`, N(-0.25, '?='), T`\(\frac1{x^{0.25}}=x^{-0.25}\)`), S('Power of a power: multiply by 6.', N(-1.5, 'n='), T`\(x^{-0.25\cdot6}=x^{-1.5}\)`)] },
        { label: '(d)', q: T`\(\dfrac{x^3\sqrt{x}}{\sqrt[4]{x^3}}\)`, steps: [S('Exponent of the numerator (√x = x^0.5):', N(3.5, '?='), T`\(x^3\cdot x^{0.5}=x^{3.5}\)`), S(T`Exponent of the denominator: \(\sqrt[4]{x^3}=x^{?}\)`, N(0.75, '?='), T`\(x^{3/4}\)`), S('Divide: subtract the exponents.', N(2.75, 'n='), T`\(x^{3.5-0.75}=x^{2.75}\)`)] }
      ] };
    } });

  ex.push({ num: '2', title: 'Simplify products of powers', lesson: 'exp', similar: [['exp', 1]], method: M_POW.concat([T`With several letters, handle each letter separately: collect all the powers of \(x\), then of \(y\), …`]),
    gen: function () {
      return { context: 'Simplify. Give the exponent of each letter.', parts: [
        { label: '(a)', q: T`\(\left(x^2y^3\right)^4=x^{?}y^{?}\)`, steps: [S('Power of a product: every factor gets the power 4. Enter the exponents of x and y.', E.TUP([8, 12], ''), T`\(x^{8}y^{12}\)`)] },
        { label: '(b)', q: T`\(x^{\frac23}y^{\frac12}x^{\frac34}y^{\frac13}\)`, steps: [S(T`Exponent of \(x\): \(\frac23+\frac34\)`, N(17 / 12, '?='), T`\(\frac{8}{12}+\frac{9}{12}=\frac{17}{12}\)`), S(T`Exponent of \(y\): \(\frac12+\frac13\)`, N(5 / 6, '?='), T`\(\frac36+\frac26=\frac56\). Result: \(x^{17/12}y^{5/6}\).`)] },
        { label: '(c)', q: T`\(\left(\dfrac{x}{yz}\right)^2\left(\dfrac{y}{xz}\right)^2\left(\dfrac{z}{xy}\right)^2\)`, steps: [
          S(T`Each bracket squared: \(\frac{x^2}{y^2z^2}\cdot\frac{y^2}{x^2z^2}\cdot\frac{z^2}{x^2y^2}\). Count the exponent of \(x\): \(2-2-2\)`, N(-2, '?='), ''),
          S('By symmetry y and z get the same. Enter the exponents of x, y, z.', E.TUP([-2, -2, -2], ''), T`\(x^{-2}y^{-2}z^{-2}=\dfrac{1}{x^2y^2z^2}\)`)] }
      ] };
    } });

  ex.push({ num: '3', title: 'Match exponential graphs to bases', lesson: 'exp', vary: true, similar: [['exp', 4]],
    method: [T`\(b>1\): the graph rises; the larger \(b\), the steeper.`, T`\(0<b<1\): the graph falls; the closer \(b\) is to 0, the steeper.`, T`All graphs of \(y=b^x\) pass through \((0,1)\), so compare them just left and right of \(x=0\).`, 'Sort the bases first: falling ones from steep to flat, rising ones from flat to steep. Then match.'],
    gen: function (R, orig) {
      var bases = [[1.2, '1.2', 'rises slowly: base a little above 1'], [2 * Math.E, '2e', 'rises steeply: base about 5.4'], [2500, '2500', 'rises extremely steeply: the largest base'], [0.01, '0.01', 'falls extremely steeply: base very close to 0'], [0.9, '0.9', 'falls slowly: base a little below 1']];
      var order = orig ? [0, 1, 2, 3, 4] : R.shuffle([0, 1, 2, 3, 4]);
      var letters = 'abcde', choices = bases.map(function (b) { return T`\(${b[1]}\)`; });
      var plot = MS.plot({ id: 'e3' + (orig ? 'o' : R.seed), x: [-4, 4], y: [-1, 6], tick: 2, label: 'five exponential graphs', fns: order.map(function (k, i) { var b = bases[k][0]; return { name: letters[i], f: function (x) { return Math.pow(b, x); } }; }) });
      return { context: T`The graphs of five exponential functions \(y=b^x\) are drawn below, with bases \(2500,\ 0.01,\ 1.2,\ 2e\) and \(0.9\).` + plot,
        parts: order.map(function (k, i) { return graphPart(letters[i], choices, k, T`Graph ${letters[i]} ${bases[k][2]}, so \(b=${bases[k][1]}\).`); }) };
    } });

  ex.push({ num: '4', title: 'Find A and b from two points', lesson: 'exp', vary: true, similar: [['exp', 3]],
    method: ['Substitute both points into y = A·bˣ: you get two equations.', 'Divide the second equation by the first: A cancels and you get a power of b.', 'Solve for b (b > 0).', 'Substitute b back into one equation to find A.'],
    gen: function (R, orig) {
      var A = orig ? 1 / Math.sqrt(3) : R.pick([2, 3, 0.5, 5]), b = orig ? 3 : R.pick([2, 3, 4, 0.5]), x1 = orig ? 0.5 : R.pick([0, 1, 0.5]), k = orig ? 2 : R.pick([1, 2]);
      if (!orig && x1 === 0.5 && b === 0.5) b = 4;
      var x2 = x1 + k, y1 = orig ? 1 : A * Math.pow(b, x1), y2 = orig ? 9 : A * Math.pow(b, x2);
      return { context: T`\(f(x)=A\cdot b^x\) passes through \((${fmt(x1)},\ ${fmt(y1)})\) and \((${fmt(x2)},\ ${fmt(y2)})\).`, parts: [
        { label: '(a)', q: T`Find \(b\).`, steps: [S(T`Write both equations: \(A\,b^{${fmt(x1)}}=${fmt(y1)}\) and \(A\,b^{${fmt(x2)}}=${fmt(y2)}\). Divide the second by the first: \(b^{${k}}=\,?\)`, N(y2 / y1, T`b^{${k}}=`), T`\(b^{${k}}=\frac{${fmt(y2)}}{${fmt(y1)}}=${fmt(y2 / y1)}\)`),
          S('Take the positive root.', N(b, 'b='), T`\(b=${fmt(b)}\)`)] },
        { label: '(b)', q: T`Find \(A\).`, steps: [S(T`Substitute \(b\) into the first equation: \(A=\dfrac{${fmt(y1)}}{${fmt(b)}^{${fmt(x1)}}}\)`, N(A, 'A='), orig ? T`\(A=\frac1{\sqrt3}\approx0.5774\), so \(f(x)=\frac{3^x}{\sqrt3}\).` : T`\(A=${fmt(A)}\), so \(f(x)=${fmt(A)}\cdot${fmt(b)}^x\).`)] }
      ] };
    } });

  var logItems = [
    ['(a)', T`\log_2 1`, 0, T`\(1=2^0\)`], ['(b)', T`\log_2\left(\tfrac18\right)`, -3, T`\(\tfrac18=2^{-3}\)`], ['(c)', T`\log_2\left(\sqrt[4]{2^5}\right)`, 5 / 4, T`\(\sqrt[4]{2^5}=2^{5/4}\)`], ['(d)', T`\log_2\left(\tfrac{1}{\sqrt[3]{2}}\right)`, -1 / 3, T`\(\tfrac1{\sqrt[3]2}=2^{-1/3}\)`],
    ['(e)', T`\log_{\frac13}9`, -2, T`\(9=\left(\tfrac13\right)^{-2}\)`], ['(f)', T`\log_3 10`, ln(10) / ln(3), T`Not a nice power: change of base \(\frac{\ln10}{\ln3}\approx2.0959\)`], ['(g)', T`\log(1\,000\,000)`, 6, T`\(10^6\)`], ['(h)', T`\log(10^{12})`, 12, T`\(10^{12}\)`],
    ['(i)', T`\log(0.001)`, -3, T`\(0.001=10^{-3}\)`], ['(j)', T`\ln1`, 0, T`\(1=e^0\)`], ['(k)', T`\ln\sqrt e`, 0.5, T`\(\sqrt e=e^{1/2}\)`], ['(l)', T`\ln\left(\tfrac1e\right)`, -1, T`\(\tfrac1e=e^{-1}\)`]];
  ex.push({ num: '5', title: 'Logarithms without a calculator', lesson: 'log', similar: [['log', 0], ['log', 4]],
    method: [T`Ask: “the base to which power gives the argument?” That power is the log.`, T`Write the argument as a power of the base: roots become fractional exponents, \(\frac1{a^k}=a^{-k}\).`, T`\(\log=\log_{10}\) and \(\ln=\log_e\).`, T`If the argument is not a power of the base, use change of base: \(\log_bx=\frac{\ln x}{\ln b}\).`],
    gen: function () { return { context: 'If possible, calculate without a calculator.', parts: logItems.map(function (it) { return { label: it[0], q: T`\(${it[1]}\)`, steps: [S('Write the argument as a power of the base. The exponent is the answer.', N(it[2], it[1] + '='), it[3] + '.')] }; }) }; } });

  ex.push({ num: '6', title: 'Find x in a log equation', lesson: 'log', similar: [['log', 1]], method: [T`Use the definition: \(\log_b x=y\iff x=b^y\).`, 'If the unknown is the base, it must be positive.', T`For \(\ln\): \(\ln A=y\iff A=e^y\).`],
    gen: function () { return { parts: [
      { label: '(a)', q: T`\(\log_2x=4\)`, steps: [S('Definition: x = 2⁴.', N(16, 'x='), T`\(x=16\)`)] },
      { label: '(b)', q: T`\(\log_x49=2\)`, steps: [S(T`Definition: \(x^2=49\), and the base is positive.`, N(7, 'x='), T`\(x=7\)`)] },
      { label: '(c)', q: T`\(\ln(x+1)=7\)`, steps: [S(T`Definition: \(x+1=e^7\). So \(x=\)`, N(Math.exp(7) - 1, 'x='), T`\(x=e^7-1\approx1095.63\)`)] }] }; } });

  ex.push({ num: '7', title: 'Why log rules work', lesson: 'log', similar: [['log', 3], ['log', 6]], method: ['Compute each log with the calculator (4 decimals).', T`Product rule: \(\log a+\log b=\log(ab)\). Power rule: \(\log a^2=2\log a\).`, 'Look for products or powers among the numbers: 25·40 and 625 = 25².'],
    gen: function () { return { parts: [
      { label: '(a)–(c)', q: T`Compute \(\log25\), \(\log40\) and \(\log625\).`, steps: [S(T`\(\log25\)`, N(lg(25), T`\log25=`), ''), S(T`\(\log40\)`, N(lg(40), T`\log40=`), ''), S(T`\(\log625\)`, N(lg(625), T`\log625=`), '')] },
      { label: '(d) i', q: T`Why is \(\log25+\log40=3\)?`, steps: [S(T`Product rule: \(\log25+\log40=\log(25\cdot40)\). What is \(25\cdot40\)?`, N(1000, '25\\cdot40='), T`\(\log1000=\log10^3=3\).`)] },
      { label: '(d) ii', q: T`Why is \(\log625=2\log25\)?`, steps: [S(T`\(625=25^{?}\)`, N(2, '?='), T`\(\log625=\log25^2=2\log25\) by the power rule.`)] }] }; } });

  ex.push({ num: '8', title: 'Write as a single logarithm', lesson: 'log', similar: [['log', 2]], method: [T`First move every coefficient inside as a power: \(k\log a=\log a^k\).`, T`Then \(+\) becomes multiplication and \(-\) becomes division.`, T`A factor in front of a whole bracket (like \(0.5\)) is a power of everything: \(0.5\log A=\log\sqrt A\).`],
    gen: function () { return { context: T`Write each expression as \(\ln N\) or \(\log N\) and give \(N\).`, parts: [
      { label: '(a)', q: T`\(\ln3+\ln7-\ln2-2\ln4\)`, steps: [S(T`Power rule: \(2\ln4=\ln{?}\)`, N(16, '?='), T`\(2\ln4=\ln16\)`), S(T`Plus → multiply, minus → divide: \(N=\dfrac{3\cdot7}{2\cdot16}\)`, N(21 / 32, 'N='), T`\(\ln\frac{21}{32}\)`)] },
      { label: '(b)', q: T`\(0.5\cdot(\log225+8\log6-3\log169)\)`, steps: [S(T`Inside the bracket: \(\log\dfrac{225\cdot6^8}{169^3}\). The factor 0.5 takes the square root. \(\sqrt{225}=\)`, N(15, '?='), ''),
        S(T`\(\sqrt{6^8}=6^4=\)`, N(1296, '?='), ''), S(T`\(\sqrt{169^3}=13^3=\)`, N(2197, '?='), ''), S(T`So \(N=\dfrac{15\cdot1296}{2197}\)`, N(19440 / 2197, 'N='), T`\(\log\frac{19440}{2197}\approx\log8.8484\)`)] }] }; } });

  ex.push({ num: '9', title: 'Logs without a calculator', lesson: 'log', similar: [['log', 3], ['log', 0]], method: ['Combine logs with the same base using the product and quotient rules.', T`Then write the argument as a power of the base: \(\log_b b^k=k\).`, T`Remember \(\log1=0\), \(\ln e=1\).`],
    gen: function () { return { parts: [
      { label: '(a)', q: T`\(\log1+\log1000\)`, steps: [S(T`\(\log1=0\), \(\log1000=\log10^3\).`, N(3, '='), '0 + 3 = 3')] },
      { label: '(b)', q: T`\(\log_7(7^8)\)`, steps: [S(T`\(\log_b b^k=k\)`, N(8, '='), '')] },
      { label: '(c)', q: T`\(\log_3\left(\frac{27}{81}\right)\)`, steps: [S(T`\(\frac{27}{81}=\frac13=3^{?}\)`, N(-1, '='), T`\(\log_33^{-1}=-1\)`)] },
      { label: '(d)', q: T`\(\ln e+\log\left(\frac1{10}\right)\)`, steps: [S(T`\(\ln e=1\) and \(\log10^{-1}=-1\).`, N(0, '='), '1 − 1 = 0')] },
      { label: '(e)', q: T`\(\log_654-\log_69\)`, steps: [S(T`Quotient rule: \(\log_6\frac{54}{9}=\log_66\)`, N(1, '='), '')] }] }; } });

  ex.push({ num: '10', title: 'A log of a huge number', lesson: 'log', similar: [['log', 4]], method: ['Split the huge number into a product: 27 · 10¹⁰⁰.', 'Product rule: the log of a product is the sum of the logs.', T`Power rule for \(10^{100}\), then change of base for \(\log_310\).`],
    gen: function () { return { context: T`Compute \(\log_3 270\,000\cdots000\), where the number is 27 followed by 100 zeros.`, parts: [
      { label: '', q: T`\(\log_3\left(27\cdot10^{100}\right)\)`, steps: [S(T`\(\log_327=\)`, N(3, '='), T`\(27=3^3\)`), S(T`\(\log_3 10^{100}=100\log_310=100\cdot\frac{\ln10}{\ln3}\approx\)`, N(100 * ln(10) / ln(3), '='), ''), S('Add them.', N(3 + 100 * ln(10) / ln(3), '='), T`\(\approx212.59\)`)] }] }; } });

  ex.push({ num: '11', title: 'Match exponential and log graphs', lesson: 'log', vary: true, similar: [['exp', 4]],
    method: [T`\(y=b^x\) passes \((0,1)\) and has the \(x\)-axis as asymptote; \(y=\log_bx\) passes \((1,0)\) and has the \(y\)-axis as asymptote.`, 'Base 4 > 1: both graphs rise. Base 0.25 < 1: both graphs fall.', T`\(\log_bx\) is the mirror image of \(b^x\) in the line \(y=x\).`],
    gen: function (R, orig) {
      var fs = [[function (x) { return Math.pow(0.25, x); }, T`y=0.25^x`, 'falls and passes (0, 1): exponential with base 0.25'], [function (x) { return Math.pow(4, x); }, T`y=4^x`, 'rises and passes (0, 1): exponential with base 4'],
        [function (x) { return Math.log(x) / Math.log(4); }, T`y=\log_4x`, 'rises and passes (1, 0): logarithm with base 4'], [function (x) { return Math.log(x) / Math.log(0.25); }, T`y=\log_{0.25}x`, 'falls and passes (1, 0): logarithm with base 0.25']];
      var order = orig ? [0, 1, 2, 3] : R.shuffle([0, 1, 2, 3]), L = 'abcd', ch = fs.map(function (f) { return T`\(${f[1]}\)`; });
      var plot = MS.plot({ id: 'e11' + (orig ? 'o' : R.seed), x: [-3, 5], y: [-3, 5], tick: 2, label: 'two exponential and two log graphs', fns: order.map(function (k, i) { return { name: L[i], f: fs[k][0], from: k >= 2 ? 0.001 : null }; }) });
      return { context: 'Two exponential and two logarithmic graphs are drawn, with bases 4 and 0.25.' + plot,
        parts: order.map(function (k, i) { return { label: 'Graph ' + L[i], q: T`Which equation belongs to graph ${L[i]}?`, steps: [S('Rising or falling? Through (0, 1) or (1, 0)?', MC(ch, k), T`Graph ${L[i]} ${fs[k][2]}.`)] }; }) };
    } });

  ex.push({ num: '12', title: 'Rewrite log expressions', lesson: 'log', similar: [['log', 5], ['log', 2]], method: [T`Change of base: \(\log x=\frac{\ln x}{\ln10}\).`, T`\(\log\frac1x=\log x^{-1}=-\log x\).`, 'Quotient rule to combine; product, quotient and power rules to split.', T`A square root is the power \(\frac12\) of everything under it.`],
    gen: function () { return { parts: [
      { label: '(a)', q: T`Write \(y=\log x\) as \(y=k\ln x\). What is \(k\)?`, steps: [S(T`\(\log x=\frac{\ln x}{\ln10}\), so \(k=\frac1{\ln10}\)`, N(1 / ln(10), 'k='), T`\(k\approx0.4343\)`)] },
      { label: '(b)', q: T`Write \(y=\log\frac1x\) as \(k\log x\).`, steps: [S(T`\(\frac1x=x^{-1}\); power rule.`, N(-1, 'k='), T`\(y=-\log x\)`)] },
      { label: '(c)', q: T`Write \(y=\log\frac1{x^2}\) as \(k\log x\).`, steps: [S(T`\(\frac1{x^2}=x^{-2}\).`, N(-2, 'k='), T`\(y=-2\log x\)`)] },
      { label: '(d)', q: T`Write \(y=\ln x-\ln(x+3)\) as a single natural log.`, steps: [S('Quotient rule.', MC([T`\(\ln\frac{x}{x+3}\)`, T`\(\ln(-3)\)`, T`\(\frac{\ln x}{\ln(x+3)}\)`, T`\(\ln(x-x-3)\)`], 0), T`\(y=\ln\dfrac{x}{x+3}\)`)] },
      { label: '(e)', q: T`Write \(y=\ln\sqrt{\dfrac{x^5(x-2)^8}{x-3}}\) as \(p\ln x+q\ln(x-2)+r\ln(x-3)\).`, steps: [S(T`The root gives a factor \(\frac12\): \(y=\frac12\left(5\ln x+8\ln(x-2)-\ln(x-3)\right)\). Enter \(p,q,r\).`, E.TUP([2.5, 4, -0.5]), T`\(y=2.5\ln x+4\ln(x-2)-0.5\ln(x-3)\)`)] }] }; } });

  var e13 = [
    ['(a)', T`\log_2x=5-\log_2(x+4)`, [S(T`Bring the logs together: \(\log_2x+\log_2(x+4)=\log_2\big(x(x+4)\big)=5\), so \(x(x+4)=\,?\)`, N(32, 'x(x+4)='), T`\(x^2+4x-32=0\)`), S('Solve the quadratic: both roots.', E.SET([4, -8], 'x='), ''), S('Check: log arguments must be positive. Which solution remains?', N(4, 'x='), T`\(x=-8\) gives \(\log_2(-8)\), impossible. So \(x=4\).`)]],
    ['(b)', T`\log_2\left(\tfrac2x\right)=3+\log_2x`, [S(T`\(\log_2\frac2x=1-\log_2x\). So \(1-\log_2x=3+\log_2x\), and \(\log_2x=\)`, N(-1, T`\log_2x=`), ''), S('Definition of the log.', N(0.5, 'x='), T`\(x=2^{-1}=\frac12\)`)]],
    ['(c)', T`3^{4x}=9^{x+1}`, [S(T`Same base: \(9^{x+1}=(3^2)^{x+1}=3^{2x+2}\). Set the exponents equal: \(4x=2x+2\).`, N(1, 'x='), '')]],
    ['(d)', T`3\cdot\left(\tfrac12\right)^x+7=55`, [S(T`Isolate the power: \(\left(\tfrac12\right)^x=\)`, N(16, '='), ''), S(T`\(16=2^4=\left(\tfrac12\right)^{-4}\)`, N(-4, 'x='), '')]],
    ['(e)', T`5+3\cdot4^{x-1}=12`, [S(T`Isolate the power: \(4^{x-1}=\)`, N(7 / 3, '='), T`\(\frac73\)`), S(T`Take logs: \(x-1=\frac{\ln(7/3)}{\ln4}\approx\)`, N(ln(7 / 3) / ln(4), 'x-1='), ''), S('So x =', N(1 + ln(7 / 3) / ln(4), 'x='), T`\(x\approx1.61\)`)]],
    ['(f)', T`2\cdot3^x-5\cdot\left(\tfrac13\right)^x=0`, [S(T`\(\left(\tfrac13\right)^x=3^{-x}\). Move it across and multiply by \(3^x\): \(2\cdot3^{2x}=5\), so \(3^{2x}=\)`, N(2.5, '3^{2x}='), ''), S(T`\(2x=\frac{\ln2.5}{\ln3}\), so \(x=\)`, N(ln(2.5) / (2 * ln(3)), 'x='), T`\(x\approx0.42\)`)]],
    ['(g)', T`\ln(2x-1)=3`, [S('Definition: 2x − 1 = e³ ≈', N(Math.exp(3), '2x-1='), ''), S('Solve for x.', N((Math.exp(3) + 1) / 2, 'x='), T`\(x=\frac{e^3+1}2\approx10.54\)`)]],
    ['(h)', T`5t^7-20=0`, [S(T`This is a power equation (the unknown is the base). \(t^7=\)`, N(4, 't^7='), ''), S(T`Take the 7th root: \(t=4^{1/7}\)`, N(Math.pow(4, 1 / 7), 't='), T`\(t\approx1.22\)`)]],
    ['(i)', T`\log(5x+1)=\log(4x+2)`, [S('Equal logs → equal arguments: 5x + 1 = 4x + 2.', N(1, 'x='), T`Check: \(\log6=\log6\) ✓`)]],
    ['(j)', T`e^{3\ln x}=8`, [S(T`\(3\ln x=\ln x^3\) and \(e^{\ln A}=A\), so \(x^3=8\).`, N(2, 'x='), '')]],
    ['(k)', T`\log(x^2-x+94)=2`, [S('Definition: the argument equals 10² =', N(100, '='), T`\(x^2-x-6=0\)`), S('Both solutions (the argument is 100 > 0 for both):', E.SET([3, -2], 'x='), '')]],
    ['(l)', T`\left|\log_{\frac13}x\right|=2`, [S(T`\(\log_{1/3}x=2\) or \(\log_{1/3}x=-2\). Give both \(x\).`, E.SET([1 / 9, 9], 'x='), T`\(x=\left(\tfrac13\right)^2=\tfrac19\) or \(x=\left(\tfrac13\right)^{-2}=9\)`)]],
    ['(m)', T`2000-1560\cdot0.975^x>800`, [S(T`Isolate: \(1560\cdot0.975^x<1200\) (sign flips when you move the term), so \(0.975^x<\)`, N(1200 / 1560, '0.975^x<'), ''), S(T`Take \(\ln\); divide by \(\ln0.975<0\), so the sign flips.`, E.INEQ('>', ln(1200 / 1560) / ln(0.975)), T`\(x>10.36\)`)]],
    ['(n)', T`\tfrac17\cdot7^x\ge49^{x+1}`, [S(T`Same base 7: \(7^{x-1}\ge7^{2x+2}\). Base > 1, so compare the exponents: \(x-1\ge2x+2\).`, E.INEQ('<=', -3), T`\(x\le-3\)`)]],
    ['(o)', T`\left(\tfrac23\right)^t<\tfrac1{30}`, [S(T`Take \(\ln\): \(t\ln\frac23<\ln\frac1{30}\). Divide by \(\ln\frac23<0\): flip.`, E.INEQ('>', ln(1 / 30) / ln(2 / 3), 't'), T`\(t>8.39\)`)]],
    ['(p)', T`0.96^{2x-1}>4`, [S(T`\((2x-1)\ln0.96>\ln4\). Divide by \(\ln0.96<0\): flip.`, E.INEQ('<', ln(4) / ln(0.96), '2x-1'), T`\(2x-1<-33.96\)`), S('Solve for x.', E.INEQ('<', (ln(4) / ln(0.96) + 1) / 2), T`\(x<-16.48\)`)]],
    ['(q)', T`\sqrt{3^x}<\tfrac19`, [S(T`\(\sqrt{3^x}=3^{x/2}\) and \(\frac19=3^{-2}\). Base > 1: \(\frac x2<-2\).`, E.INEQ('<', -4), T`\(x<-4\)`)]],
    ['(r)', T`\left(\tfrac12\right)^{1-x^2}\ge8`, [S(T`\(8=\left(\tfrac12\right)^{-3}\). Base \(\frac12<1\): the sign flips, \(1-x^2\le-3\), so \(x^2\ge\)`, N(4, 'x^2\\ge'), ''), S('Which x satisfy this?', MC([T`\(x\le-2\) or \(x\ge2\)`, T`\(-2\le x\le2\)`, T`\(x\ge2\)`, T`\(x\le-2\)`], 0), '')]]];
  ex.push({ num: '13', title: 'Solve exponential and log equations and inequalities', lesson: 'expeq', similar: [['expeq', 0], ['expeq', 2], ['expeq', 3], ['expeq', 5]], method: M_EXPEQ,
    gen: function () { return { context: T`Solve for \(x\) (or \(t\)). Round to 2 decimals where needed.`, parts: e13.map(function (it) { return { label: it[0], q: T`\(${it[1]}\)`, steps: it[2] }; }) }; } });

  ex.push({ num: '14', title: 'Formula for compound interest', lesson: 'exp', vary: true, similar: [['exp', 2]], method: M_GROWTH,
    gen: function (R, orig) {
      var P = orig ? 10000 : R.pick([2000, 5000, 8000, 12000]), r = orig ? 1 : R.pick([1.5, 2, 2.5, 3.2]), t = orig ? 10 : R.int(4, 12), g = 1 + r / 100;
      return { context: T`€${P} is invested at ${r}% compound interest per year. Let \(S(t)\) be the amount after \(t\) years.`, parts: [
        { label: '(a)', q: 'Growth factor per year?', steps: [S(T`\(g=1+\frac{${r}}{100}\)`, N(g, 'g='), T`\(S(t)=${P}\cdot${fmt(g)}^t\)`)] },
        { label: '(b)', q: T`Amount after ${t} years (check of the formula)?`, steps: [S(T`\(S(${t})=${P}\cdot${fmt(g)}^{${t}}\)`, N(P * Math.pow(g, t), 'S='), '')] }] };
    } });

  ex.push({ num: '15', title: 'Interest earned', lesson: 'exp', vary: true, similar: [['exp', 2]], method: M_GROWTH.slice(0, 3).concat([T`Interest over a period = value at the end − value at the start. Interest <em>during year n</em> = \(S(n)-S(n-1)\).`]),
    gen: function (R, orig) {
      var P = orig ? 2000 : R.pick([1000, 3000, 5000]), r = orig ? 3 : R.pick([2, 4, 5]), n = orig ? 5 : R.int(4, 8), g = 1 + r / 100, Sn = P * Math.pow(g, n), Sm = P * Math.pow(g, n - 1);
      return { context: T`€${P} is invested at ${r}% compounded annually.`, parts: [
        { label: '(a)', q: T`Value after ${n} years?`, steps: [S(T`\(S(${n})=${P}\cdot${fmt(g)}^{${n}}\)`, N(Sn, 'S='), '')] },
        { label: '(b)', q: T`Interest earned over the first ${n} years?`, steps: [S(T`\(S(${n})-${P}\)`, N(Sn - P, 'I='), '')] },
        { label: '(c)', q: T`Interest earned during year ${n} only?`, steps: [S(T`Value after ${n - 1} years: \(S(${n - 1})\)`, N(Sm, T`S(${n - 1})=`), ''), S(T`Interest in year ${n}: \(S(${n})-S(${n - 1})\)`, N(Sn - Sm, 'I='), '')] }] };
    } });

  ex.push({ num: '16', title: 'Linear, exponential or other growth', lesson: 'growth', similar: [['growth', 4], ['growth', 5]], method: M_GROWTH.concat([T`For \(F(t)=500\,000-a\,e^{bt}\): use \(F(0)\) to find \(a\), then \(F(9)\) to find \(b\).`]),
    gen: function () {
      var gm = Math.pow(315 / 285, 1 / 9), b = ln(185000 / 215000) / 9;
      return { context: 'In 9 months the number of flip-o-phone owners grew from 285 000 to 315 000. After how many months (from the start) do we expect 400 000 owners if their number grows…', parts: [
        { label: '(a)', q: 'linearly?', steps: [S('Growth term per month: 30 000 / 9 =', N(30000 / 9, 'm='), T`\(F(t)=285\,000+3333.33\,t\)`), S(T`Solve \(285\,000+3333.33\,t=400\,000\).`, N(34.5, 't='), '34.5 months')] },
        { label: '(b)', q: 'exponentially?', steps: [S(T`Factor per 9 months: \(\frac{315}{285}\). Factor per month: \(\left(\frac{315}{285}\right)^{1/9}\)`, N(gm, 'g='), ''), S(T`Solve \(285\,000\cdot g^t=400\,000\): \(t=\frac{\ln(400/285)}{\ln g}\)`, N(9 * ln(400 / 285) / ln(315 / 285), 't='), T`\(\approx30.48\) months`)] },
        { label: '(c)', q: T`according to \(F(t)=500\,000-a\,e^{bt}\)?`, steps: [S(T`\(F(0)=500\,000-a=285\,000\Rightarrow a=\)`, N(215000, 'a='), ''), S(T`\(F(9)=315\,000\Rightarrow e^{9b}=\frac{185\,000}{215\,000}\Rightarrow b=\)`, N(b, 'b='), T`\(b\approx-0.0167\)`), S(T`\(500\,000-215\,000\,e^{bt}=400\,000\Rightarrow e^{bt}=\frac{100}{215}\), so \(t=\)`, N(ln(100 / 215) / b, 't='), T`\(\approx45.84\) months`)] }] };
    } });

  ex.push({ num: '17', title: 'When is the ratio four?', lesson: 'growth', vary: true, similar: [['expeq', 1]], method: M_GROWTH.concat(['Write the ratio of the two models; the initial ratio is the starting value of that quotient.']),
    gen: function (R, orig) {
      var r0 = orig ? 3 : R.pick([2, 3]), r1 = orig ? 4 : r0 + R.pick([1, 2]), p = orig ? 2 : R.pick([1.5, 2, 2.5]), q = orig ? 0.5 : R.pick([0.3, 0.5, 1]);
      var gc = 1 + p / 100, ge = 1 - q / 100, t = ln(r1 / r0) / ln(gc / ge);
      return { context: T`At the start of 1990 there were ${r0} times as many Chinese as Europeans. The Chinese population grows ${p}% per year; the European population decreases ${q}% per year. When are there ${r1} times as many?`, parts: [
        { label: '', q: 'Find t (years after 1990).', steps: [S(T`Ratio: \(\dfrac{C(t)}{E(t)}=${r0}\cdot\left(\dfrac{${fmt(gc)}}{${fmt(ge)}}\right)^t\). Ratio factor per year:`, N(gc / ge, '='), ''), S(T`Solve \(${r0}\cdot${f4(gc / ge)}^t=${r1}\).`, N(t, 't='), T`\(t\approx${f2(t)}\): during ${1990 + Math.floor(t)}.`)] }] };
    } });

  ex.push({ num: '18', title: 'Growth per decade and per semester', lesson: 'growth', vary: true, similar: [['growth', 1]], method: ['Convert the percentage to a factor per year.', T`New period \(r\) times as long: \(g_{\text{new}}=g^r\) (decade: \(r=10\); semester: \(r=\frac12\)).`, 'Convert back to a percentage if asked.'],
    gen: function (R, orig) {
      var p = orig ? 4.5 : R.pick([2.5, 3, 6, 7.5]), g = 1 + p / 100;
      return { context: T`A country’s national income grows by ${p}% per year.`, parts: [
        { label: '(a)', q: 'Growth percentage per decade?', steps: [S(T`Factor per decade: \(${fmt(g)}^{10}\)`, N(Math.pow(g, 10), 'g='), ''), S('Percentage:', N((Math.pow(g, 10) - 1) * 100, 'p=', { unit: '%' }), '')] },
        { label: '(b)', q: 'Growth factor per semester?', steps: [S(T`A semester is half a year: \(${fmt(g)}^{1/2}\)`, N(Math.sqrt(g), 'g='), '')] }] };
    } });

  ex.push({ num: '19', title: 'Half the value of a car', lesson: 'growth', vary: true, similar: [['growth', 2]], method: ['Factor per year: 1 − p/100.', T`Half-life: solve \(g^t=\frac12\), so \(t=\frac{\log0.5}{\log g}\). It does not depend on the starting value.`],
    gen: function (R, orig) { var p = orig ? 15 : R.pick([8, 10, 12, 20, 25]), g = 1 - p / 100;
      return { context: T`The value of a car decreases by ${p}% every year.`, parts: [{ label: '', q: 'How long until it is worth half its original value?', steps: [S('Factor per year:', N(g, 'g='), ''), S(T`\(t=\frac{\log0.5}{\log${fmt(g)}}\)`, N(lg(0.5) / lg(g), 't=', { unit: 'years' }), '')] }] }; } });

  ex.push({ num: '20', title: 'Two investment plans and tax', lesson: 'growth', similar: [['growth', 1], ['expeq', 3]], method: M_GROWTH.concat(['Compare plans with the same time unit (factor per year).', T`For taxes: write the condition as an inequality in \(t\), solve, and round to whole years in the way the question asks.`]),
    watch: [T`“3.75% semi-annually” is read here as a yearly rate of 3.75% paid in two halves (1.875% per half-year). If your teacher means 3.75% every half-year, the factor is \(1.0375^2\approx1.0764\) and plan B wins.`],
    gen: function () {
      var d = 1 + ln(1660 / 760) / ln(1.076), e = 1 + ln((1660 + 100 / 0.15) / 760) / ln(1.076);
      return { context: T`Plan A: 4% compounded annually. Plan B: 3.75% compounded semi-annually. Later: €10 000 invested with interest \(I(t)=10\,000\cdot0.076\cdot1.076^{t-1}\) at the end of year \(t\); no tax below €1660, 15% tax on the part above €1660.`, parts: [
        { label: '(a)', q: 'Which plan is better?', steps: [S(T`Plan B yearly factor: \(1.01875^2\)`, N(1.01875 * 1.01875, 'g_B='), T`\(\approx1.0379<1.04\)`), S('So:', MC(['Plan A', 'Plan B'], 0, true), 'Plan A gives 4% per year, plan B about 3.79%.')] },
        { label: '(b)', q: 'Plan A: when has the sum increased by 50%?', steps: [S(T`Solve \(1.04^t=1.5\).`, N(ln(1.5) / ln(1.04), 't='), T`\(\approx10.34\) years`)] },
        { label: '(c)', q: 'Plan A with €30 000: interest earned in year t?', steps: [S(T`At the start of year \(t\) the amount is \(30\,000\cdot1.04^{t-1}\); interest is 4% of that. Interest in year 1:`, N(1200, 'I(1)='), T`\(I(t)=1200\cdot1.04^{t-1}\)`)] },
        { label: '(d)', q: 'For how many years is no tax paid?', steps: [S(T`\(I(1)=10\,000\cdot0.076=\)`, N(760, 'I(1)='), ''), S(T`Solve \(760\cdot1.076^{t-1}<1660\).`, E.INEQ('<', d, 't'), T`\(t<11.67\)`), S('Number of whole years without tax:', N(11, '='), 'Years 1 to 11.')] },
        { label: '(e)', q: 'After how many years is the tax above €100?', steps: [S(T`Tax \(=0.15\,(I-1660)>100\Rightarrow I>\)`, N(1660 + 100 / 0.15, 'I>'), T`\(2326.67\)`), S(T`Solve \(760\cdot1.076^{t-1}>2326.67\).`, E.INEQ('>', e, 't'), T`\(t>16.27\)`), S('First year in which that happens:', N(17, 't='), 'From year 17.')] }] };
    } });

  ex.push({ num: '21', title: 'Drug in the bloodstream', lesson: 'growth', vary: true, similar: [['growth', 2], ['limits', 4]], method: [T`\(D(t)=A\,e^{Bt}\): \(A=D(0)\), and \(e^B\) is the growth factor per hour.`, T`−p% per hour: \(e^B=1-\frac p{100}\Rightarrow B=\ln\left(1-\frac p{100}\right)\).`, T`−p% per 2 hours: \(e^{2B}=1-\frac p{100}\Rightarrow B=\frac12\ln\left(1-\frac p{100}\right)\).`, 'An exponential never reaches 0: it only approaches it.'],
    gen: function (R, orig) {
      var A = orig ? 20 : R.pick([10, 25, 50]), p = orig ? 20 : R.pick([10, 15, 25]), k = orig ? 0.5 : R.pick([0.25, 0.5, 1]);
      return { context: T`\(D(t)=A\cdot e^{Bt}\) mg after \(t\) hours. A person takes ${A} mg.`, parts: [
        { label: '(a)', q: T`Determine \(A\).`, steps: [S(T`\(D(0)=A\)`, N(A, 'A='), '')] },
        { label: '(b)', q: T`The amount decreases ${p}% every hour. Determine \(B\).`, steps: [S(T`\(e^B=${fmt(1 - p / 100)}\)`, N(ln(1 - p / 100), 'B='), '')] },
        { label: '(c)', q: T`Instead: ${p}% every two hours. Determine \(B\).`, steps: [S(T`\(e^{2B}=${fmt(1 - p / 100)}\)`, N(ln(1 - p / 100) / 2, 'B='), '')] },
        { label: '(d)', q: T`Another drug: \(D(t)=100\cdot2^{-${k}t}\). When is half of it left?`, steps: [S(T`\(2^{-${k}t}=\frac12=2^{-1}\Rightarrow ${k}t=1\)`, N(1 / k, 't=', { unit: 'hours' }), '')] },
        { label: '(e)', q: 'When has it disappeared completely?', steps: [S('Can 100 · 2^(−kt) become 0?', MC(['Never: it only approaches 0', 'After 2 half-lives', T`After \(\frac{100}{k}\) hours`], 0, true), T`\(2^{-kt}>0\) for every \(t\); the \(t\)-axis is a horizontal asymptote.`)] }] };
    } });

  ex.push({ num: '22', title: 'Two newspapers', lesson: 'growth', vary: true, similar: [['growth', 1], ['expeq', 1]], method: M_GROWTH.concat(['Use one time unit for both models (months here).', 'Set the two models equal and solve with logs.']),
    gen: function (R, orig) {
      var p = orig ? 2 : R.pick([1, 1.5, 2.5]), q = orig ? 12 : R.pick([8, 10, 15]), k = orig ? 2 : R.pick([2, 3]);
      var gT = 1 + p / 100, gM = Math.pow(1 - q / 100, 1 / 12), m = ln(k) / (ln(gT) - ln(gM));
      return { context: T`The Mail’s circulation is ${k} times the Times’. The Times grows ${p}% per month; the Mail decreases ${q}% per year.`, parts: [
        { label: '(a)', q: 'Yearly growth percentage of the Times?', steps: [S(T`\(${fmt(gT)}^{12}\)`, N(Math.pow(gT, 12), 'g='), ''), S('As a percentage:', N((Math.pow(gT, 12) - 1) * 100, 'p=', { unit: '%' }), '')] },
        { label: '(b)', q: 'When are the circulations equal?', steps: [S(T`Mail factor per month: \(${fmt(1 - q / 100)}^{1/12}\)`, N(gM, 'g='), ''), S(T`Solve \(${fmt(gT)}^m=${k}\cdot${f4(gM)}^m\) for \(m\) (months).`, N(m, 'm=', { unit: 'months' }), T`\(\approx${f2(m)}\) months \(\approx${f2(m / 12)}\) years`)] }] };
    } });

  ex.push({ num: '23', title: 'Equity fund and bond fund', lesson: 'growth', similar: [['growth', 2], ['growth', 4]], method: M_GROWTH.concat(['A share of the total = part / total × 100.', 'For (e) the sum of two exponentials cannot be solved algebraically: use the GC (intersect with y = 20 000).']),
    gen: function () {
      var Fp = function (t) { return 100 * 2000 * Math.pow(1.08, t) / (2000 * Math.pow(1.08, t) + 8000 * Math.pow(1.04, t)); };
      var lo = 0, hi = 40; for (var i = 0; i < 80; i++) { var mid = (lo + hi) / 2; if (2000 * Math.pow(1.08, mid) + 8000 * Math.pow(1.04, mid) < 20000) lo = mid; else hi = mid; }
      return { context: T`€10 000: 20% in an equity fund (+8% per year), 80% in a bond fund (+4% per year). \(S(t)=2000\cdot1.08^t\), \(B(t)=8000\cdot1.04^t\).`, parts: [
        { label: '(a)', q: 'Doubling time of the equity fund?', steps: [S(T`\(1.08^t=2\)`, N(ln(2) / ln(1.08), 't='), T`\(\approx9.01\) years`)] },
        { label: '(b)', q: 'Percentage in the equity fund after 5 years?', steps: [S(T`\(S(5)=\)`, N(2000 * Math.pow(1.08, 5), 'S(5)='), ''), S(T`\(B(5)=\)`, N(8000 * Math.pow(1.04, 5), 'B(5)='), ''), S(T`\(\frac{S}{S+B}\cdot100\)`, N(Fp(5), 'F=', { unit: '%' }), '')] },
        { label: '(c)', q: T`Equation for the percentage \(F(t)\).`, steps: [S(T`\(F=\dfrac{100\cdot2000\cdot1.08^t}{2000\cdot1.08^t+8000\cdot1.04^t}\). Divide by \(2000\cdot1.08^t\):`, MC([T`\(F=\dfrac{100}{1+4\left(\frac{1.04}{1.08}\right)^t}\)`, T`\(F=20\cdot\left(\frac{1.08}{1.04}\right)^t\)`, T`\(F=\dfrac{100}{4+1.04^t}\)`], 0), '')] },
        { label: '(d)', q: 'When is 40% in the equity fund? (by hand)', steps: [S(T`\(\frac{100}{1+4r^t}=40\Rightarrow1+4r^t=2.5\Rightarrow r^t=\)`, N(0.375, 'r^t='), T`with \(r=\frac{1.04}{1.08}\)`), S(T`\(t=\frac{\ln0.375}{\ln(1.04/1.08)}\)`, N(ln(0.375) / ln(1.04 / 1.08), 't='), T`\(\approx25.99\) years`)] },
        { label: '(e)', q: 'When has the total doubled? (GC)', steps: [S(T`Solve \(2000\cdot1.08^t+8000\cdot1.04^t=20\,000\) by intersecting the graphs.`, N(lo, 't='), T`\(t\approx${f2(lo)}\) years`)] }] };
    } });

  ex.push({ num: '24', title: 'Grandpa’s investments', lesson: 'growth', vary: true, similar: [['growth', 4], ['expeq', 1]], method: M_GROWTH.concat(['A ratio of two exponentials with the same factor is constant: check whether it can reach the value asked.', T`Unknown rate: \(g=\left(\frac{\text{end}}{\text{start}}\right)^{1/t}\).`]),
    gen: function (R, orig) {
      var r = orig ? 5 : R.pick([3, 4, 6]), g = 1 + r / 100, end = orig ? 2105 : Math.round(1000 * Math.pow(g, R.int(9, 15)) * 0.98), gap = orig ? 7 : R.pick([5, 6, 8]);
      var P2 = orig ? 900 : R.pick([800, 1200, 1500]), E2 = orig ? 3021 : Math.round(P2 * Math.pow(1 + R.pick([5.5, 6.5, 7]) / 100, 18));
      return { context: T`Grandpa invests €1000 at ${r}% per year at the birth of each grandchild.`, parts: [
        { label: '(a)', q: 'Value at Lisa’s 18th birthday?', steps: [S(T`\(1000\cdot${fmt(g)}^{18}\)`, N(1000 * Math.pow(g, 18), '='), '')] },
        { label: '(b)', q: T`At that moment Greg’s capital is €${end}. How old is Greg?`, steps: [S(T`Solve \(1000\cdot${fmt(g)}^t=${end}\).`, N(ln(end / 1000) / ln(g), 't=', { unit: 'years' }), '')] },
        { label: '(c)', q: T`Jonathan is ${gap} years younger than Lisa. Is Lisa’s capital ever 1.5 times Jonathan’s?`, steps: [S(T`Ratio: \(\frac{1000\cdot g^{L}}{1000\cdot g^{L-${gap}}}=g^{${gap}}\), constant. \(${fmt(g)}^{${gap}}=\)`, N(Math.pow(g, gap), '='), ''), S('So:', MC(['Yes, at one moment', 'No, the ratio never changes'], Math.abs(Math.pow(g, gap) - 1.5) < 0.0005 ? 0 : 1, true), 'The ratio is always the same number, so it equals 1.5 only if that number is 1.5.')] },
        { label: '(d)', q: T`Ahmed: €${P2} grew to €${E2} in 18 years. Yearly rate?`, steps: [S(T`\(g=\left(\frac{${E2}}{${P2}}\right)^{1/18}\)`, N(Math.pow(E2 / P2, 1 / 18), 'g='), ''), S('As a percentage:', N((Math.pow(E2 / P2, 1 / 18) - 1) * 100, 'r=', { unit: '%' }), '')] }] };
    } });

  ex.push({ num: '25', title: 'GDP on a logarithmic scale', lesson: 'growth', similar: [['log', 0]], method: ['On a log scale you plot log(value) instead of the value itself.', 'Each factor 10 is the same distance on the axis: 5, 50, 500, 5000, 50 000 are equally spaced.', 'Compute log of each value to place it.'],
    gen: function () { return { context: 'GDP per capita: United States $28 020, Chile $4860.', parts: [
      { label: '(a)', q: 'Where do the two values go on a log scale?', steps: [S(T`\(\log28\,020\)`, N(lg(28020), '='), ''), S(T`\(\log4860\)`, N(lg(4860), '='), '')] },
      { label: '(b)', q: 'Lines at $5, $50, $500, $5000, $50 000: what do you notice?', steps: [S(T`\(\log5\approx0.70,\ \log50\approx1.70,\ \log500\approx2.70\ldots\)`, MC(['They are equally spaced (1 unit apart)', 'They get further apart', 'They get closer together'], 0, true), 'Each line is 10 times the previous one, which adds exactly 1 to the log.')] }] }; } });

  ex.push({ num: '26', title: 'Algae on a lake', lesson: 'growth', vary: true, similar: [['growth', 4]], method: M_GROWTH.concat([T`On a log scale an exponential is a straight line: \(\log A=\log b+t\log g\) (slope \(\log g\)).`]),
    gen: function (R, orig) {
      var A0 = orig ? 8 : R.pick([5, 10, 20]), L = orig ? 60000 : R.pick([40000, 80000, 100000]), g = orig ? 1.25 : R.pick([1.2, 1.3, 1.5]);
      return { context: T`A ${L} m² lake; algae cover ${A0} m² and grow by ${fmt((g - 1) * 100)}% every week.`, parts: [
        { label: '(a)', q: T`Expression for \(A(t)\): growth factor per week?`, steps: [S('Factor:', N(g, 'g='), T`\(A(t)=${A0}\cdot${fmt(g)}^t\)`)] },
        { label: '(b)', q: 'When is the whole lake covered?', steps: [S(T`\(${A0}\cdot${fmt(g)}^t=${L}\)`, N(ln(L / A0) / ln(g), 't=', { unit: 'weeks' }), '')] },
        { label: '(c)–(d)', q: 'Log scale on the vertical axis: what do you see?', steps: [S(T`\(\log A=\log${A0}+t\log${fmt(g)}\). Slope \(\log${fmt(g)}=\)`, N(lg(g), '='), ''), S('So the graph is…', MC(['a straight line', 'a parabola', 'a curve that flattens'], 0, true), 'A straight line with slope log g.')] }] };
    } });

  ex.push({ num: '27', title: 'Find the interest rate and the deposit', lesson: 'growth', vary: true, similar: [['exp', 3]], method: ['Write both accounts as P · gⁿ with their own number of years.', 'Divide the two equations: P cancels and you get g to a power.', 'Then find P from either equation.'],
    gen: function (R, orig) {
      var r = orig ? 1.25 : R.pick([1.5, 2, 2.5, 3]), P = orig ? 650 : R.pick([400, 500, 800]), a = orig ? 14 : R.int(10, 16), d = orig ? 2 : R.pick([2, 3]), g = 1 + r / 100;
      var A1 = orig ? 773.47 : +(P * Math.pow(g, a)).toFixed(2), A2 = orig ? 754.49 : +(P * Math.pow(g, a - d)).toFixed(2);
      return { context: T`Lea (${a} years ago) and Jordan (${d} years later) each got the same amount at the same rate. Now Lea has €${A1}, Jordan €${A2}.`, parts: [
        { label: '(a)', q: 'Fixed yearly interest rate?', steps: [S(T`\(\frac{P g^{${a}}}{P g^{${a - d}}}=g^{${d}}=\frac{${A1}}{${A2}}\)`, N(Math.pow(A1 / A2, 1 / d), 'g='), ''), S('Rate:', N((Math.pow(A1 / A2, 1 / d) - 1) * 100, 'r=', { unit: '%' }), '')] },
        { label: '(b)', q: 'Amount invested?', steps: [S(T`\(P=\frac{${A2}}{g^{${a - d}}}\)`, N(A2 / Math.pow(A1 / A2, (a - d) / d), 'P='), '')] }] };
    } });

  MS.addSheet({ id: 't1q', topic: 't1', title: 'Questions Topic 1', sub: 'Exercises 1–27: powers, logs, equations and applications', exercises: ex });

  /* ---------------- Review problems Topic 1 ---------------- */
  var rv = [];
  rv.push({ num: 'R1', title: 'Great Barrier Reef', lesson: 'growth', vary: true, similar: [['growth', 1], ['growth', 2]], method: M_GROWTH.concat([T`Two known values a period \(T\) apart: factor per year \(=\left(\frac{\text{end}}{\text{start}}\right)^{1/T}\).`]),
    gen: function (R, orig) {
      var A0 = orig ? 97000 : R.pick([80000, 90000, 120000]), A1 = orig ? 47610 : Math.round(A0 * R.pick([0.45, 0.5, 0.55])), Y = orig ? 27 : R.pick([20, 25, 30]), pct = orig ? 70 : R.pick([60, 75, 80]), up = orig ? 0.89 : R.pick([0.7, 1, 1.2]);
      var g = Math.pow(A1 / A0, 1 / Y);
      return { context: T`Coral cover was ${A0} km² in 1985 and ${A1} km² ${Y} years later; exponential decay.`, parts: [
        { label: '(a)', q: T`Equation for \(A(t)\): factor per year?`, steps: [S(T`\(g=\left(\frac{${A1}}{${A0}}\right)^{1/${Y}}\)`, N(g, 'g='), T`\(A(t)=${A0}\cdot${f4(g)}^t\)`)] },
        { label: '(b)', q: T`Since when is the cover below ${pct}% of the 1985 value?`, steps: [S(T`\(g^t<${pct / 100}\): divide by \(\ln g<0\), flip.`, E.INEQ('>', ln(pct / 100) / ln(g), 't'), '')] },
        { label: '(c)', q: 'Predicted: the cover halves again in 10 years. Yearly decrease?', steps: [S(T`\(g=0.5^{1/10}\)`, N(Math.pow(0.5, 0.1), 'g='), ''), S('Decrease percentage:', N((1 - Math.pow(0.5, 0.1)) * 100, 'p=', { unit: '%' }), '6.70%')] },
        { label: '(d)', q: T`Recovery: +${up}% per year. How long to increase by 50%?`, steps: [S(T`\(${fmt(1 + up / 100)}^t=1.5\)`, N(ln(1.5) / ln(1 + up / 100), 't=', { unit: 'years' }), '')] }] };
    } });

  rv.push({ num: 'R2', title: 'Tennis association', lesson: 'growth', similar: [['growth', 1], ['expeq', 0]], method: M_GROWTH.concat([T`On a log scale, \(\log F(t)=\log F(0)+t\log g\) is a straight line.`, 'Revenue = members × fee: multiply the two models; the factors multiply too.']),
    gen: function () {
      var gy = Math.pow(1.18, 0.1);
      return { context: '800 members in 1902, +18% per decade. Fee €1.5 per year in 1902, +1.9% per year, maximum €25.', parts: [
        { label: '(a)', q: 'Yearly growth percentage of members?', steps: [S(T`\(1.18^{1/10}\)`, N(gy, 'g='), ''), S('Percentage:', N((gy - 1) * 100, 'p=', { unit: '%' }), '1.67%')] },
        { label: '(b)', q: 'When does the fee reach the €25 maximum?', steps: [S(T`\(1.5\cdot1.019^t=25\)`, N(ln(25 / 1.5) / ln(1.019), 't='), 'About 149.5 years: halfway through 2051.')] },
        { label: '(c)', q: 'Log scale: what does the graph look like?', steps: [S(T`\(\log F=\log1.5+t\log1.019\) until 149.5, then \(\log25\). Slope:`, N(lg(1.019), '='), ''), S('Shape:', MC(['A rising straight line, then horizontal', 'A curve bending upward', 'A horizontal line'], 0, true), '')] },
        { label: '(d)', q: 'Yearly growth of the total revenue?', steps: [S(T`Revenue \(=800\cdot1.18^{t/10}\cdot1.5\cdot1.019^t=1200\cdot\left(1.18^{1/10}\cdot1.019\right)^t\). Factor:`, N(gy * 1.019, 'g='), ''), S('Percentage:', N((gy * 1.019 - 1) * 100, 'p=', { unit: '%' }), '3.6%')] }] };
    } });

  rv.push({ num: 'R3', title: 'Almere: harbour and city', lesson: 'growth', similar: [['growth', 4], ['growth', 5]], method: M_GROWTH.concat(['Linear model: growth term = change / years. Exponential model: factor = (end/start)^(1/years).', 'Where one model is linear and the other exponential, find the intersection with the GC.']),
    watch: ['The answer sheet gives 22 868 for (e) because it rounds the city’s growth factor to 1.0339. With exact values you get about 22 845; both are accepted.'],
    gen: function () {
      var h = Math.pow(22685 / 21410, 1 / 7), D = function (t) { return 21410 * Math.pow(h, t) - (17240 + 4078 * t); };
      var lo = 0, hi = 7; for (var i = 0; i < 80; i++) { var m = (lo + hi) / 2; if (D(lo) * D(m) <= 0) hi = m; else lo = m; }
      var cg = Math.pow(108825 / 45786, 1 / 26), C12 = 45786 * Math.pow(cg, 12), hh = Math.pow(C12 / 3 / 22685, 1 / 12);
      return { context: 'Harbour: 21 410 (1985), 22 685 (1992). City: 17 240 (1985), 45 786 (1992), 108 825 (2018). t in years since January 1985.', parts: [
        { label: '(a)', q: 'Models for 1985–1992 (harbour exponential, city linear).', steps: [S(T`Harbour factor \(\left(\frac{22685}{21410}\right)^{1/7}\)`, N(h, 'g='), T`\(H(t)=21410\cdot1.0083^t\)`), S('City growth term per year:', N(4078, 'm='), T`\(C(t)=17240+4078t\)`)] },
        { label: '(b)', q: 'When did the harbour first have 22 000 inhabitants?', steps: [S(T`\(21410\cdot g^t=22000\)`, N(ln(22000 / 21410) / ln(h), 't='), '3.29 years')] },
        { label: '(c)', q: 'When were harbour and city equal? (GC)', steps: [S('Intersect H(t) and C(t) on the GC.', N(lo, 't='), '1.07 years')] },
        { label: '(d)', q: 'City 1992–2018: yearly growth percentage?', steps: [S(T`\(\left(\frac{108825}{45786}\right)^{1/26}\)`, N(cg, 'g='), ''), S('Percentage:', N((cg - 1) * 100, 'p=', { unit: '%' }), '3.39%')] },
        { label: '(e)', q: 'Harbour in 2018, if in 2004 the city had 3 times as many inhabitants as the harbour?', steps: [S('City in 2004 (12 years after 1992):', N(C12, 'C='), ''), S('Harbour in 2004 = C / 3:', N(C12 / 3, 'H='), ''), S(T`Harbour factor 1992→2004: \(\left(\frac{H_{2004}}{22685}\right)^{1/12}\)`, N(hh, 'g='), ''), S('Harbour in 2018 (26 years after 1992):', N(22685 * Math.pow(hh, 26), 'H='), 'About 22 850 (answer sheet: 22 868).')] }] };
    } });

  MS.addSheet({ id: 't1r', topic: 't1', title: 'Review problems Topic 1', sub: 'Coral reef, tennis association, Almere', exercises: rv });
})();
