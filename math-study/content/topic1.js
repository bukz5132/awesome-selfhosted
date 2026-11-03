/* Topic 1 — Exponential and logarithmic functions (MB A, slides 1.1–1.4) */
(function () {
  'use strict';
  var T = String.raw, H = MS.h, fmt = H.fmt;
  var ln = Math.log, lg = Math.log10;

  /* ===================== 1.1 Exponential functions ===================== */
  var exp = {
    id: 'exp', code: '1.1', title: 'Exponential functions',
    summary: 'Rules for powers, the graph of b^x, A·b^x and compound interest.',
    formulas: [
      { n: 'Exponential function', t: T`y=b^x,\qquad b>0,\ b\neq 1` },
      { n: 'Zero & negative exponent', t: T`a^0=1,\qquad a^{-r}=\frac{1}{a^r}` },
      { n: 'Fractional exponent', t: T`a^{\frac pq}=\sqrt[q]{a^p}=\left(\sqrt[q]{a}\right)^p` },
      { n: 'Product & quotient', t: T`a^r\cdot a^s=a^{r+s},\qquad \frac{a^r}{a^s}=a^{r-s}` },
      { n: 'Power of a power', t: T`\left(a^r\right)^s=a^{r\cdot s}` },
      { n: 'Power of a product / quotient', t: T`(ab)^r=a^rb^r,\qquad \left(\frac ab\right)^r=\frac{a^r}{b^r}` },
      { n: 'Multiple of an exponential', t: T`f(x)=A\cdot b^x,\qquad f(0)=A` },
      { n: 'Compound interest (yearly)', t: T`S=P\cdot(1+r)^t`, note: T`\(P\) principal, \(r\) rate as a decimal (3% → 0.03), \(t\) years.` }
    ],
    learn: [
      { h: 'What makes it exponential', body: T`<p>In an exponential function the variable is the <strong>exponent</strong>: \(y=b^x\). In a power function the variable is the <strong>base</strong>: \(y=x^r\). So \(y=2^x\) is exponential and \(y=x^2\) is not.</p>
<p>The base must be positive (otherwise things like \((-1)^{1/2}\) are undefined) and different from 1 (\(1^x=1\) is just a constant).</p>
<p>Bacteria example: \(N(t)=2^t\) (thousands after \(t\) minutes). \(N(0)=2^0=1\), \(N(3)=8\), \(N(6)=64\). Remember: any \(a^0=1\).</p>` },
      { h: 'The graph of y = bˣ', body: T`<div class="two-col"><div><p><strong>\(b>1\)</strong></p><ul><li>rises from left to right, faster for larger \(b\)</li><li>passes \((0,1)\) and \((1,b)\)</li><li>the \(x\)-axis is a <em>left</em> horizontal asymptote (\(x\to-\infty\))</li></ul></div>
<div><p><strong>\(0<b<1\)</strong></p><ul><li>falls from left to right</li><li>passes \((0,1)\) and \((1,b)\)</li><li>the \(x\)-axis is a <em>right</em> horizontal asymptote (\(x\to+\infty\))</li></ul></div></div>
<p>Special bases: \(10^x\) and \(e^x\) with Euler’s number \(e=2.718281828\ldots\) (own button on the GC). Drag the slider to see how the base changes the graph.</p>`, widget: 'expLog' },
      { h: 'A multiple: A · bˣ', body: T`<p>\(f(x)=A\cdot b^x\) starts at \(f(0)=A\): the graph of \(b^x\) is stretched vertically by factor \(A\). A computer virus that reaches 20 new machines per infected machine per day, starting from 5 machines, gives \(N(t)=5\cdot 20^t\).</p>
<p>To find \(A\) and \(b\) from two points, write both equations and <strong>divide</strong> them: \(A\) cancels and you are left with a power of \(b\).</p>` },
      { h: 'Compound interest', body: T`<p>€1000 at 3% per year: every year the amount is multiplied by \(1.03\).</p>
<p>\(t=1\): \(1000\cdot1.03=1030\); \(t=2\): \(1000\cdot1.03^2=1060.90\); \(t=3\): \(1000\cdot1.03^3=1092.73\). In general \(A(t)=1000\cdot1.03^t\), and for any principal \(S=P(1+r)^t\).</p>` }
    ],
    pitfalls: [
      T`\((a+b)^2\neq a^2+b^2\). There is no simple rule for \((a+b)^r\); for \(r=2\) it is \(a^2+2ab+b^2\).`,
      T`A negative exponent does not make the number negative: \(4^{-3}=\frac1{64}\).`,
      T`3% interest means multiply by \(1.03\), not by \(0.03\) or \(3\).`,
      T`\(y=x^2\) is a power function, not an exponential one.`
    ],
    examples: [
      { t: 'A negative fractional exponent', p: T`Compute \(4^{-1.5}\) without a calculator.`, s: [
        T`Write the exponent as a fraction: \(-1.5=-\frac32\).`,
        T`A negative exponent means “one over”: \(4^{-3/2}=\dfrac{1}{4^{3/2}}\).`,
        T`Denominator of the exponent = root, numerator = power: \(4^{3/2}=\left(\sqrt4\right)^3=2^3=8\).`,
        T`So \(4^{-1.5}=\frac18=0.125\).`] },
      { t: 'One power of x', p: T`Write \(\dfrac{x^3\cdot\sqrt{x}}{x^{-1}}\) as a single power of \(x\) (\(x>0\)).`, s: [
        T`Rewrite the root: \(\sqrt x=x^{0.5}\).`,
        T`Numerator: same base, so add exponents: \(x^3\cdot x^{0.5}=x^{3.5}\).`,
        T`Quotient: subtract exponents: \(\dfrac{x^{3.5}}{x^{-1}}=x^{3.5-(-1)}=x^{4.5}\).`] },
      { t: 'Find A and b from two points', p: T`\(f(x)=A\cdot b^x\) passes through \((0.5,\,1)\) and \((2.5,\,9)\). Find \(f\).`, s: [
        T`Substitute both points: \(A\,b^{0.5}=1\) and \(A\,b^{2.5}=9\).`,
        T`Divide to eliminate \(A\): \(\dfrac{A\,b^{2.5}}{A\,b^{0.5}}=b^{2}=\dfrac91=9\), so \(b=3\) (the base is positive).`,
        T`Back-substitute: \(A\cdot3^{0.5}=1\Rightarrow A=\dfrac{1}{\sqrt3}\).`,
        T`\(f(x)=\dfrac{3^x}{\sqrt3}\), which you can also write as \(3^{\,x-0.5}\).`] },
      { t: 'Compound interest', p: T`€1000 is invested at 3% compound interest per year. How much is in the account after 10 years?`, s: [
        T`Define: \(t\) = years since the investment, \(A(t)\) = amount in euro.`,
        T`Each year ×1.03, starting value 1000: \(A(t)=1000\cdot1.03^t\).`,
        T`\(A(10)=1000\cdot1.03^{10}\approx 1343.92\) euro.`] },
      { t: 'Virus spreading', p: T`A virus mails itself to the 20 addresses of every infected computer, once a day. The attack starts from 5 computers. Give \(N(t)\), the number of infected computers after \(t\) days, and compute \(N(2)\).`, s: [
        T`Each day the number is multiplied by 20: growth factor 20.`,
        T`Starting value \(N(0)=5\), so \(N(t)=5\cdot20^t\).`,
        T`\(N(2)=5\cdot400=2000\) computers.`] }
    ],
    practice: [
      { name: 'Evaluate a power', gen: function (R) {
        var q = R.pick([2, 3]);
        var c = q === 2 ? R.pick([2, 3, 4, 5, 10]) : R.pick([2, 3, 4]);
        var a = Math.pow(c, q);
        var ps = c <= 3 ? [1, 2, 3, -1, -2, -3] : [1, 2, -1, -2];
        var p = R.pick(ps); if (Math.abs(p) === q) p = p > 0 ? 1 : -1;
        var val = Math.pow(c, p);
        var e = q === 2 && R.chance() ? fmt(p / q) : (p < 0 ? '-' : '') + T`\frac{${Math.abs(p)}}{${q}}`;
        var root = q === 2 ? T`\sqrt{${a}}` : T`\sqrt[3]{${a}}`;
        var valT = p < 0 ? T`\frac{1}{${c}^{${-p}}}=\frac{1}{${Math.pow(c, -p)}}` : T`${c}^{${p}}=${val}`;
        return { q: T`Compute \(${a}^{${e}}\) without a calculator.`, type: 'num', ans: val, prompt: T`${a}^{${e}}=`,
          hint: T`The denominator of the exponent is the root, the numerator is the power. A minus sign means “one over”.`,
          sol: [T`Exponent as a fraction: \(${p}/${q}\).`, T`Root first: \(${root}=${c}\).`, T`Then the power: \(${valT}\).`] };
      } },
      { name: 'Rules for powers', gen: function (R) {
        var a = R.pick([2, 3, 4, 5, -1, -2, 1.5]), b = R.pick([0.5, 2, -1, 1.5, 3]), c = R.pick([2, 3, -1, 0.5]), d = R.pick([2, 3, -2]);
        var n = a + b - c * d;
        var bT = b === 0.5 ? T`\sqrt{x}` : T`x^{${fmt(b)}}`;
        return { q: T`Write \(\dfrac{x^{${fmt(a)}}\cdot ${bT}}{\left(x^{${fmt(c)}}\right)^{${d}}}\) as one power \(x^n\) (\(x>0\)). What is \(n\)?`, type: 'num', ans: n, prompt: 'n=',
          hint: T`Same base: multiply → add exponents, divide → subtract, power of a power → multiply.`,
          sol: [b === 0.5 ? T`\(\sqrt x=x^{0.5}\).` : T`Collect the exponents.`, T`Numerator: \(x^{${fmt(a)}+${fmt(b)}}=x^{${fmt(a + b)}}\).`, T`Denominator: \(\left(x^{${fmt(c)}}\right)^{${d}}=x^{${fmt(c * d)}}\).`, T`Quotient: \(n=${fmt(a + b)}-(${fmt(c * d)})=${fmt(n)}\).`] };
      } },
      { name: 'Compound interest', gen: function (R) {
        var P = R.pick([500, 1000, 1500, 2000, 2500, 5000]), r = R.pick([1.5, 2, 2.5, 3, 3.5, 4, 5]), t = R.int(2, 15);
        var S = P * Math.pow(1 + r / 100, t);
        return { q: T`€${P} is invested at ${r}% compound interest per year. How much is in the account after ${t} years? (2 decimals)`, type: 'num', ans: S, prompt: 'S=', unit: 'euro',
          hint: T`Growth factor per year is \(1+\frac{${r}}{100}\).`,
          sol: [T`Factor per year: \(1+${r / 100}=${fmt(1 + r / 100)}\).`, T`\(S=P(1+r)^t=${P}\cdot${fmt(1 + r / 100)}^{${t}}\).`, T`\(S\approx ${fmt(S, 2)}\) euro.`] };
      } },
      { name: 'A·bˣ through two points', gen: function (R) {
        var A = R.pick([2, 3, 5, 10, 0.5, 4]), b = R.pick([2, 3, 4, 5, 0.5, 1.5, 0.2]), x1 = R.pick([0, 1, 2, -1]), k = R.pick([1, 2]);
        if (b === 1.5 && k === 2) k = 1;
        var x2 = x1 + k, y1 = A * Math.pow(b, x1), y2 = A * Math.pow(b, x2);
        var askB = R.chance();
        var steps = [T`Substitute: \(A\,b^{${x1}}=${fmt(y1)}\) and \(A\,b^{${x2}}=${fmt(y2)}\).`,
          T`Divide the second by the first: \(b^{${k}}=\frac{${fmt(y2)}}{${fmt(y1)}}=${fmt(y2 / y1)}\), so \(b=${fmt(b)}\).`,
          T`Back-substitute: \(A=\frac{${fmt(y1)}}{${fmt(b)}^{${x1}}}=${fmt(A)}\).`];
        return { q: T`The graph of \(f(x)=A\cdot b^x\) passes through \((${x1},\ ${fmt(y1)})\) and \((${x2},\ ${fmt(y2)})\). Find ${askB ? T`the base \(b\)` : T`\(A\)`}.`,
          type: 'num', ans: askB ? b : A, prompt: askB ? 'b=' : 'A=', hint: T`Divide the two equations so that \(A\) cancels.`, sol: steps };
      } },
      { name: 'Read the graph', gen: function (R) {
        var A = R.pick([1, 2, 3, 0.5, 5]);
        var bs = [['2', 2], ['3', 3], ['0.5', 0.5], ['0.25', 0.25], ['1.5', 1.5], ['0.8', 0.8], [T`\tfrac13`, 1 / 3], [T`\tfrac43`, 4 / 3]];
        var bb = R.pick(bs), up = bb[1] > 1;
        var f = (A === 1 ? '' : fmt(A) + T`\cdot `) + (bb[0].length > 3 ? T`\left(${bb[0]}\right)^x` : T`${bb[0]}^x`);
        var choices, ans;
        if (A !== 1) {
          choices = [T`rises; \(y\)-intercept \((0,${fmt(A)})\)`, T`falls; \(y\)-intercept \((0,${fmt(A)})\)`, T`rises; \(y\)-intercept \((0,1)\)`, T`falls; \(y\)-intercept \((0,1)\)`];
          ans = up ? 0 : 1;
        } else {
          choices = [T`rises; horizontal asymptote \(y=0\) for \(x\to-\infty\)`, T`falls; horizontal asymptote \(y=0\) for \(x\to+\infty\)`, T`rises; horizontal asymptote \(y=0\) for \(x\to+\infty\)`, T`falls; horizontal asymptote \(y=0\) for \(x\to-\infty\)`];
          ans = up ? 0 : 1;
        }
        return { q: T`Which description fits the graph of \(y=${f}\)?`, type: 'mc', choices: choices, ans: ans,
          sol: [T`The base is \(${bb[0]}\), which is ${up ? 'greater than 1, so the graph rises' : 'between 0 and 1, so the graph falls'}.`,
            A !== 1 ? T`At \(x=0\): \(y=${fmt(A)}\cdot b^0=${fmt(A)}\), so the \(y\)-intercept is \((0,${fmt(A)})\).` : T`${up ? 'For very negative \\(x\\)' : 'For very large \\(x\\)'} the values approach 0, so the \(x\)-axis is the asymptote on that side.`] };
      } },
      { name: 'Exponential or not?', gen: function (R) {
        var good = [[T`y=3^x`, 'base 3 > 0, variable in the exponent'], [T`y=(0.5)^x`, 'base 0.5 is between 0 and 1: exponential (decreasing)'], [T`y=5\cdot2^x`, 'a multiple A·bˣ with A = 5, b = 2'], [T`y=e^x`, 'base e ≈ 2.718'], [T`y=\left(\tfrac43\right)^x`, 'base 4/3 > 0']];
        var bad = [[T`y=x^3`, 'power function: x is the base'], [T`y=x^{0.5}`, 'power function (square root)'], [T`y=1^x`, 'base 1 gives the constant function y = 1'], [T`y=(-2)^x`, 'negative base is not allowed'], [T`y=4x^2`, 'quadratic (power) function'], [T`y=x^{e}`, 'power function with exponent e']];
        var g = R.pick(good), bs = R.sample(bad, 3);
        return { q: T`Which of these is an exponential function (or a multiple \(A\cdot b^x\) of one)?`, type: 'mc', choices: [T`\(${g[0]}\)`].concat(bs.map(function (b) { return T`\(${b[0]}\)`; })), ans: 0,
          sol: [T`\(${g[0]}\): ${g[1]}.`].concat(bs.map(function (b) { return T`\(${b[0]}\): ${b[1]}.`; })) };
      } }
    ],
    course: [
      { q: T`A function \(f\) has equation \(y=A\cdot b^x\). Its graph contains \((0.5,1)\) and \((2.5,9)\). Determine the equation of \(f\).`, a: T`\(f(x)=\dfrac{3^x}{\sqrt3}\)` },
      { q: T`Virus example: a virus in an e-mail attachment is sent to every address (20 per address book) once a day. Write \(N(t)\) when the attack starts from 1 computer, and from 5 computers.`, a: T`\(N(t)=20^t\); from 5 computers \(N(t)=5\cdot20^t\).` },
      { q: T`Of the graphs of \(y=8^x\), \(y=2^x\) and \(y=(0.5)^x\): which one falls, and which of the rising ones is steepest?`, a: T`\((0.5)^x\) falls; \(8^x\) rises fastest (larger base).` }
    ]
  };

  /* ===================== 1.2 Logarithmic functions ===================== */
  var log = {
    id: 'log', code: '1.2', title: 'Logarithmic functions',
    summary: 'What a log is, the log rules, change of base and the graph.',
    formulas: [
      { n: 'Definition', t: T`y=\log_b x\iff x=b^y`, note: T`\(b>0,\ b\neq1,\ x>0\). “The exponent you need on \(b\) to get \(x\).”` },
      { n: 'Special bases', t: T`\log x=\log_{10}x,\qquad \ln x=\log_e x` },
      { n: 'Basic values', t: T`\begin{gathered}\log_b1=0,\qquad \log_b b=1\\ \log_b b^x=x,\qquad b^{\log_b x}=x\end{gathered}` },
      { n: 'Product rule', t: T`\log_b(x_1x_2)=\log_b x_1+\log_b x_2` },
      { n: 'Quotient rule', t: T`\log_b\frac{x_1}{x_2}=\log_b x_1-\log_b x_2` },
      { n: 'Power rule', t: T`\log_b x^r=r\cdot\log_b x` },
      { n: 'Change of base', t: T`\log_b x=\frac{\log x}{\log b}=\frac{\ln x}{\ln b}` },
      { n: 'No sum rule', t: T`\log_b(x_1\pm x_2)\ \text{has no simple rule}` }
    ],
    learn: [
      { h: 'The idea', body: T`<p>A gambler doubles a €1 bet every time he loses. When will the bet be €1024? We need \(x\) with \(2^x=1024\). The answer is the exponent: \(x=\log_2 1024=10\).</p>
<p><strong>\(\log_b x\) is the exponent you need on \(b\) to get \(x\).</strong> So \(\log_5125=3\) because \(5^3=125\), and \(\log_2\frac18=-3\) because \(2^{-3}=\frac18\).</p>
<p>The log of 0 or of a negative number does not exist: \(b^y\) is always positive.</p>` },
      { h: 'Where the rules come from', body: T`<p>Logs turn multiplication into addition because exponents add: \(4\cdot8=2^2\cdot2^3=2^{5}\), so \(\log_2(4\cdot8)=2+3=\log_24+\log_28\). Division subtracts exponents, and a power multiplies them: \(\log_2 8^{1/5}=\frac15\cdot 3\).</p>
<p>There is no rule for a sum: \(\log_2(16+16)=\log_232=5\), but \(\log_216+\log_216=8\).</p>
<p>On the GC: <span class="kbd">MATH</span> → <span class="kbd">A: logBASE</span>, or use change of base: \(\log_30.23=\frac{\ln0.23}{\ln3}\approx-1.3377\).</p>` },
      { h: 'The graph of y = log_b x', body: T`<p>Swap \(x\) and \(y\) in a table of \(y=2^x\) and you get a table of \(y=\log_2x\): the log function is the <strong>inverse</strong> of the exponential function with the same base. Its graph is the mirror image of \(y=b^x\) in the line \(y=x\).</p>
<ul><li>domain \(]0,+\infty[\), range \(\mathbb R\)</li><li>passes \((1,0)\) (since \(\log_b1=0\)) and \((b,1)\) (since \(\log_bb=1\))</li><li>the \(y\)-axis is a vertical asymptote</li><li>rises for \(b>1\), falls for \(0<b<1\)</li></ul>`, widget: 'expLog' }
    ],
    pitfalls: [
      T`\(\log(x+y)\neq\log x+\log y\). Only products split into sums.`,
      T`\(\dfrac{\log x}{\log y}\neq\log\dfrac xy\). The quotient rule is about the log of a quotient.`,
      T`\((\ln x)^2\neq2\ln x\). The power rule needs the power inside: \(\ln(x^2)=2\ln x\).`,
      T`\(\log_b0\) and \(\log_b(\text{negative})\) do not exist; always check the argument is positive.`
    ],
    examples: [
      { t: 'Log by heart', p: T`Compute \(\log_{1/3}9\).`, s: [
        T`Ask: \(\left(\frac13\right)^{?}=9\).`,
        T`\(\left(\frac13\right)^{-1}=3\), so \(\left(\frac13\right)^{-2}=3^2=9\).`,
        T`\(\log_{1/3}9=-2\).`] },
      { t: 'Combine into one log', p: T`Write \(\ln5+2\ln3-\ln2-\ln7\) as a single natural logarithm.`, s: [
        T`Power rule first: \(2\ln3=\ln3^2=\ln9\).`,
        T`Sums become products: \(\ln5+\ln9=\ln45\).`,
        T`Differences become quotients: \(\ln45-\ln2-\ln7=\ln\dfrac{45}{2\cdot7}=\ln\dfrac{45}{14}\).`] },
      { t: 'Without a calculator', p: T`Compute \(\log20+\log500\).`, s: [
        T`Product rule: \(\log20+\log500=\log(20\cdot500)=\log10000\).`,
        T`\(10000=10^4\), so the answer is \(4\).`] },
      { t: 'Expand a log', p: T`Write \(\ln\sqrt{\dfrac{x^2y}{z^5}}\) in terms of \(\ln x,\ \ln y,\ \ln z\).`, s: [
        T`Root = power \(\tfrac12\): \(\ln\left(\dfrac{x^2y}{z^5}\right)^{1/2}=\tfrac12\ln\dfrac{x^2y}{z^5}\).`,
        T`Quotient and product rules: \(\tfrac12\left(\ln x^2+\ln y-\ln z^5\right)\).`,
        T`Power rule: \(\tfrac12\left(2\ln x+\ln y-5\ln z\right)=\ln x+0.5\ln y-2.5\ln z\).`] },
      { t: 'Solve with the definition', p: T`Solve \(\ln(x+1)=7\).`, s: [
        T`Definition of \(\ln\): \(\ln A=7\iff A=e^7\).`,
        T`\(x+1=e^7\), so \(x=e^7-1\approx1095.63\).`] },
      { t: 'Check a formula from economics', p: T`With \(C=B+E\), show that \(\ln C=\ln B+\ln\left(1+\frac EB\right)\).`, s: [
        T`Factor out \(B\): \(C=B+E=B\left(1+\frac EB\right)\).`,
        T`Product rule: \(\ln C=\ln B+\ln\left(1+\frac EB\right)\). Note we never split \(\ln(B+E)\) directly.`] }
    ],
    practice: [
      { name: 'Log by heart', gen: function (R) {
        var mode = R.pick(['int', 'int', 'frac', 'ln', 'root']);
        var bT, argT, k, b;
        if (mode === 'int') {
          b = R.pick([2, 3, 4, 5, 10]); k = R.int(-3, 4); if (b >= 4) k = R.int(-2, 3);
          argT = k >= 0 ? String(Math.pow(b, k)) : T`\tfrac{1}{${Math.pow(b, -k)}}`;
          bT = b === 10 ? T`\log` : T`\log_{${b}}`;
        } else if (mode === 'frac') {
          var m = R.pick([2, 3]); b = 1 / m; k = R.nz(-3, 3);
          argT = k < 0 ? String(Math.pow(m, -k)) : T`\tfrac{1}{${Math.pow(m, k)}}`;
          bT = T`\log_{1/${m}}`;
        } else if (mode === 'ln') {
          k = R.nz(-4, 5); b = Math.E;
          argT = R.chance() || k > 0 ? T`e^{${k}}` : T`\tfrac{1}{e^{${-k}}}`;
          if (k === 1) argT = 'e';
          bT = T`\ln`;
        } else {
          b = R.pick([2, 3, 5, 10]); k = R.pick([0.5, -0.5, 1.5]);
          argT = k === 0.5 ? T`\sqrt{${b}}` : k === -0.5 ? T`\tfrac{1}{\sqrt{${b}}}` : T`${b}\sqrt{${b}}`;
          bT = b === 10 ? T`\log` : T`\log_{${b}}`;
        }
        var bName = mode === 'ln' ? 'e' : mode === 'frac' ? T`\tfrac{1}{${Math.round(1 / b)}}` : String(b);
        return { q: T`Compute \(${bT}\left(${argT}\right)\) without a calculator.`, type: 'num', ans: k, prompt: T`${bT}\left(${argT}\right)=`,
          hint: T`Ask yourself: \(${bName}\) to which power gives \(${argT}\)?`,
          sol: [T`Write the argument as a power of the base: \(${argT}=\left(${bName}\right)^{${fmt(k)}}\).`, T`The log is that exponent: \(${fmt(k)}\).`] };
      } },
      { name: 'Solve a basic log equation', gen: function (R) {
        var mode = R.pick(['x', 'base', 'ln']);
        if (mode === 'x') {
          var b = R.pick([2, 3, 5, 10]), n = R.int(-2, 4); if (b >= 5) n = R.int(-2, 3);
          var bT = b === 10 ? T`\log` : T`\log_{${b}}`;
          return { q: T`Solve \(${bT}x=${n}\).`, type: 'num', ans: Math.pow(b, n), prompt: 'x=', hint: T`Use the definition: \(\log_b x=y\iff x=b^y\).`,
            sol: [T`Definition: \(x=${b}^{${n}}\).`, T`\(x=${fmt(Math.pow(b, n))}\).`] };
        }
        if (mode === 'base') {
          var c = R.int(2, 7), m = R.pick([2, 3]); if (c > 5) m = 2;
          var A = Math.pow(c, m);
          return { q: T`Solve \(\log_x ${A}=${m}\).`, type: 'num', ans: c, prompt: 'x=', hint: T`Definition: \(x^{${m}}=${A}\), and a base must be positive.`,
            sol: [T`Definition: \(x^{${m}}=${A}\).`, T`Positive base: \(x=\sqrt${m === 3 ? '[3]' : ''}{${A}}=${c}\).`] };
        }
        var a = R.int(1, 6), k = R.int(1, 4);
        return { q: T`Solve \(\ln(x+${a})=${k}\). (2 decimals)`, type: 'num', ans: Math.exp(k) - a, prompt: 'x=', hint: T`\(\ln A=k\iff A=e^k\).`,
          sol: [T`Definition of \(\ln\): \(x+${a}=e^{${k}}\).`, T`\(x=e^{${k}}-${a}\approx${fmt(Math.exp(k) - a, 2)}\).`] };
      } },
      { name: 'Combine into one log', gen: function (R) {
        var a = R.int(2, 9), b = R.pick([2, 3, 5]), k = R.pick([2, 3]);
        var c = R.pick([2, 3, 4, 6, 7, 8, 9].filter(function (x) { return x !== b && x !== a; }));
        var d = R.chance() ? R.pick([2, 3, 7].filter(function (x) { return x !== b && x !== c; })) : 1;
        if (k === 3 && b === 5) k = 2;
        var num = a * Math.pow(b, k), den = c * d;
        var expr = T`\ln${a}+${k}\ln${b}-\ln${c}` + (d > 1 ? T`-\ln${d}` : '');
        return { q: T`Write \(${expr}\) as \(\ln N\). What is \(N\)? (a fraction is fine)`, type: 'num', ans: num / den, prompt: 'N=',
          show: T`\(N=${H.frac(num, den)}\)`, hint: T`First the power rule (\(${k}\ln${b}=\ln${b}^{${k}}\)), then + → multiply and − → divide.`,
          sol: [T`Power rule: \(${k}\ln${b}=\ln${Math.pow(b, k)}\).`, T`Product rule: \(\ln${a}+\ln${Math.pow(b, k)}=\ln${num}\).`,
            T`Quotient rule: \(\ln\dfrac{${num}}{${den === c ? c : c + T`\cdot` + d}}=\ln${H.frac(num, den)}\).`] };
      } },
      { name: 'Compute with log rules', gen: function (R) {
        var B = R.pick([2, 3, 5, 6, 10]), n = R.pick([2, 3, 4]);
        if (B >= 6 && n === 4) n = 3;
        var bT = B === 10 ? T`\log` : T`\log_{${B}}`;
        if (R.chance()) {
          var Tt = Math.pow(B, n), divs = [];
          for (var i = 2; i < Tt; i++) if (Tt % i === 0 && i !== B && Tt / i !== B) divs.push(i);
          if (!divs.length) for (var j = 2; j < Tt; j++) if (Tt % j === 0) divs.push(j);
          var a = R.pick(divs), b = Tt / a;
          return { q: T`Compute \(${bT}${a}+${bT}${b}\) without a calculator.`, type: 'num', ans: n, hint: 'Product rule: a sum of logs is the log of a product.',
            sol: [T`\(${bT}${a}+${bT}${b}=${bT}(${a}\cdot${b})=${bT}${Tt}\).`, T`\(${Tt}=${B}^{${n}}\), so the answer is \(${n}\).`] };
        }
        var a2 = R.pick([3, 5, 7].filter(function (x) { return x !== B; })), big = a2 * Math.pow(B, n);
        return { q: T`Compute \(${bT}${big}-${bT}${a2}\) without a calculator.`, type: 'num', ans: n, hint: 'Quotient rule: a difference of logs is the log of a quotient.',
          sol: [T`\(${bT}${big}-${bT}${a2}=${bT}\dfrac{${big}}{${a2}}=${bT}${Math.pow(B, n)}\).`, T`\(${Math.pow(B, n)}=${B}^{${n}}\), so the answer is \(${n}\).`] };
      } },
      { name: 'Change of base', gen: function (R) {
        var b = R.pick([3, 5, 7, 1.5, 0.5, 12]), x = R.pick([0.23, 10, 50, 2, 0.8, 100, 7.5, 0.04]);
        var v = ln(x) / ln(b);
        return { q: T`Compute \(\log_{${fmt(b)}}${fmt(x)}\) with the change-of-base rule. (4 decimals)`, type: 'num', ans: v, prompt: T`\log_{${fmt(b)}}${fmt(x)}=`,
          hint: T`\(\log_b x=\dfrac{\ln x}{\ln b}\). On a calculator: ln(${fmt(x)})/ln(${fmt(b)}).`,
          sol: [T`\(\log_{${fmt(b)}}${fmt(x)}=\dfrac{\ln ${fmt(x)}}{\ln ${fmt(b)}}=\dfrac{${fmt(ln(x))}}{${fmt(ln(b))}}\approx${fmt(v)}\).`] };
      } },
      { name: 'Expand a log', gen: function (R) {
        var a = R.pick([1, 2, 3]), b = R.pick([1, 2, 0.5]), c = R.pick([1, 2, 3, 5]), sq = R.chance(0.4);
        var s = sq ? 0.5 : 1;
        var yT = b === 0.5 ? T`\sqrt y` : b === 1 ? 'y' : T`y^{${b}}`;
        var inner = T`\frac{${a === 1 ? 'x' : T`x^{${a}}`}${yT}}{${c === 1 ? 'z' : T`z^{${c}}`}}`;
        var expr = sq ? T`\ln\sqrt{${inner}}` : T`\ln${inner}`;
        var p = a * s, q = b * s, r = -c * s;
        return { q: T`Write \(${expr}\) as \(p\ln x+q\ln y+r\ln z\). Enter \(p, q, r\).`, type: 'tuple', ans: [p, q, r],
          hint: T`${sq ? 'A square root is the power ½ of everything inside. ' : ''}Product → +, quotient → −, power → multiply.`,
          sol: [sq ? T`\(\sqrt{\cdots}=(\cdots)^{1/2}\), so everything gets a factor \(\tfrac12\).` : T`Split the quotient and the product.`,
            T`\(${expr}=${s === 1 ? '' : T`\tfrac12\left(`}${a}\ln x+${b}\ln y-${c}\ln z${s === 1 ? '' : T`\right)`}\).`,
            T`\(p=${fmt(p)},\ q=${fmt(q)},\ r=${fmt(r)}\).`] };
      } },
      { name: 'Which rule is right?', gen: function (R) {
        var good = [T`\ln(xy)=\ln x+\ln y`, T`\log\frac xy=\log x-\log y`, T`\log_2x^5=5\log_2x`, T`\log_3x=\frac{\ln x}{\ln3}`, T`e^{\ln x}=x`, T`\log_bb=1`];
        var bad = [T`\ln(x+y)=\ln x+\ln y`, T`\log\frac xy=\frac{\log x}{\log y}`, T`(\ln x)^2=2\ln x`, T`\log_3x=\frac{\ln3}{\ln x}`, T`\log(2x)=2\log x`, T`\log_b1=1`, T`\ln(x-y)=\frac{\ln x}{\ln y}`];
        var g = R.pick(good), bs = R.sample(bad, 3);
        return { q: T`Which statement is always true (for \(x,y>0\))?`, type: 'mc', choices: [g].concat(bs).map(function (s) { return T`\(${s}\)`; }), ans: 0,
          sol: [T`True: \(${g}\).`, T`The others mix up the rules: there is no rule for the log of a sum or difference, a quotient of logs is not the log of a quotient, and the power rule needs the power inside the log.`] };
      } }
    ],
    course: [
      { q: T`If possible, compute by heart: \(\log_21,\ \log_50,\ \log_2\frac18,\ \log_2(-2),\ \log_{1/3}9,\ \log_2\sqrt[3]{\tfrac12}\).`, a: T`\(0\); does not exist; \(-3\); does not exist; \(-2\); \(-\tfrac13\).` },
      { q: T`Find \(x\): \(\log_2x=4\) and \(\log_x49=2\).`, a: T`\(x=16\) and \(x=7\).` },
      { q: T`Compute: \(\log(1\,000\,000),\ \log(10^{12}),\ \log(0.001),\ \ln1,\ \ln\sqrt e,\ \ln\frac1e\).`, a: T`\(6,\ 12,\ -3,\ 0,\ \tfrac12,\ -1\).` },
      { q: T`Solve \(\ln(x+1)=7\).`, a: T`\(x=e^7-1\approx1095.63\).` },
      { q: T`Write \(\ln5+2\ln3-\ln2-\ln7\) as a single natural log.`, a: T`\(\ln\dfrac{45}{14}\).` },
      { q: T`Compute without GC: a) \(\log20+\log500\) b) \(\log_{1/3}3^8\).`, a: T`a) \(4\) b) \(-8\).` }
    ]
  };

  /* ===================== 1.3 Exponential & log equations and inequalities ===================== */
  var expeq = {
    id: 'expeq', code: '1.3', title: 'Exponential & log equations and inequalities',
    summary: 'Isolate the power, take logs; watch the inequality sign.',
    formulas: [
      { n: 'Exponential equation', t: T`b^x=k\iff x=\frac{\log k}{\log b}`, note: 'First isolate the power, then take the log of both sides.' },
      { n: 'Same base / same log', t: T`\begin{gathered}b^m=b^n\iff m=n\\ \log_g m=\log_g n\iff m=n\end{gathered}` },
      { n: 'Log equation: definition', t: T`\log_g x=y\iff x=g^y` },
      { n: 'Inverse pair', t: T`b^{\log_b x}=x,\qquad \log_b\left(b^x\right)=x` },
      { n: 'Inequality, base > 1', t: T`x_1\le x_2\iff \log_bx_1\le\log_bx_2`, note: 'Increasing function: the sign stays.' },
      { n: 'Inequality, 0 < base < 1', t: T`x_1\le x_2\iff \log_bx_1\ge\log_bx_2`, note: 'Decreasing function: the sign flips.' },
      { n: 'Dividing by a negative number', t: T`\log0.9<0,\qquad \ln\tfrac12<0`, note: 'Dividing both sides by a negative number flips the sign.' }
    ],
    learn: [
      { h: 'Exponential equations', body: T`<p>The unknown is in the exponent. Method:</p>
<ol><li>Define your variables (what is \(t\), what is \(A(t)\), units).</li><li>Isolate the power: \(1000\cdot1.03^t=1500\Rightarrow1.03^t=1.5\).</li><li>Take \(\log\) (or \(\ln\)) of both sides: \(\log1.03^t=\log1.5\).</li><li>Power rule brings the exponent down: \(t\log1.03=\log1.5\).</li><li>Divide: \(t=\frac{\log1.5}{\log1.03}\approx13.72\).</li></ol>
<p>With an unknown on both sides (\(1000\cdot1.03^t=900\cdot1.035^t\)), either divide to get \(\left(\frac{1.03}{1.035}\right)^t=0.9\), or take logs straight away and collect the \(t\)-terms. Both give \(t\approx21.76\).</p>
<p>Some equations cannot be solved algebraically; then use the GC solver or intersect graphs.</p>` },
      { h: 'Logarithmic equations', body: T`<p>The unknown is inside a log (or in its base). Isolate the log and use the definition: \(2\ln(x+4)=5\Rightarrow\ln(x+4)=2.5\Rightarrow x+4=e^{2.5}\Rightarrow x\approx8.18\).</p>
<p>Or bring each side to one log with the same base and set the arguments equal. Logs with different bases? Use change of base first: \(\log_4(3x-2)=\frac{\log_2(3x-2)}{\log_24}=\frac{\log_2(3x-2)}2\).</p>
<p><strong>Always check your solutions</strong>: every log argument must be positive.</p>` },
      { h: 'Exponential inequalities', body: T`<p>Same technique, but keep track of the sign:</p>
<ul><li>Applying \(\log_b\) with \(b>1\) keeps the sign (increasing function).</li><li>Applying \(\log_b\) with \(0<b<1\) flips it (decreasing function).</li><li>Dividing by a negative number flips it. Watch out: \(\log0.5\), \(\ln0.9\) etc. are negative.</li></ul>
<p>Example: \(\left(\frac12\right)^x\ge4\). Take \(\log\): \(x\log\frac12\ge\log4\). Divide by \(\log\frac12<0\): \(x\le\frac{\log4}{\log0.5}=-2\).</p>` }
    ],
    pitfalls: [
      T`Taking the log of a sum: in \(3\cdot2^x+5=100\) first subtract 5 and divide by 3, then take logs.`,
      T`Forgetting to flip the inequality when dividing by \(\log b\) with \(b<1\) (negative).`,
      T`Not checking the domain: in \(\log_3\frac{x^2}{2}=\log_3x+2\) the candidate \(x=0\) must be rejected.`,
      T`Rounding too early. Keep exact expressions like \(\frac{\log1.5}{\log1.03}\) until the last step.`
    ],
    examples: [
      { t: 'When will the account reach €1500?', p: T`€1000 at 3% compound interest per year. When is the amount €1500?`, s: [
        T`Let \(t\) = years since investing, \(A(t)=1000\cdot1.03^t\). Solve \(A(t)=1500\).`,
        T`Divide by 1000: \(1.03^t=1.5\).`,
        T`Take \(\log\) of both sides and use the power rule: \(t\log1.03=\log1.5\).`,
        T`\(t=\dfrac{\log1.5}{\log1.03}\approx13.72\). After about 13.7 years.`] },
      { t: 'Two accounts', p: T`Alice: €1000 at 3%. John: €900 at 3.5%. When are the amounts equal?`, s: [
        T`\(1000\cdot1.03^t=900\cdot1.035^t\).`,
        T`Put the powers together: \(\dfrac{1.03^t}{1.035^t}=\left(\dfrac{1.03}{1.035}\right)^t=\dfrac{900}{1000}=0.9\).`,
        T`Take logs: \(t\log\dfrac{1.03}{1.035}=\log0.9\).`,
        T`\(t=\dfrac{\log0.9}{\log(1.03/1.035)}\approx21.76\). After nearly 22 years.`] },
      { t: 'A log equation', p: T`Solve \(2\ln(x+4)=5\).`, s: [
        T`Isolate the log: \(\ln(x+4)=2.5\).`,
        T`Definition: \(x+4=e^{2.5}\).`,
        T`\(x=e^{2.5}-4\approx8.18\). Check: \(x+4>0\) ✓.`] },
      { t: 'Logs on both sides', p: T`Solve \(\log_3\dfrac{x^2}{2}=\log_3x+2\) without a calculator.`, s: [
        T`Write 2 as a log: \(2=\log_39\). Then \(\log_3x+\log_39=\log_3(9x)\).`,
        T`Equal logs → equal arguments: \(\dfrac{x^2}{2}=9x\), so \(x^2-18x=0\), \(x(x-18)=0\).`,
        T`\(x=0\) is impossible (\(\log_30\) does not exist), so \(x=18\).`] },
      { t: 'Different bases', p: T`Solve \(\log_4(3x-2)=\log_2x\).`, s: [
        T`Change of base: \(\log_4(3x-2)=\dfrac{\log_2(3x-2)}{\log_24}=\dfrac{\log_2(3x-2)}{2}\).`,
        T`So \(\log_2(3x-2)=2\log_2x=\log_2x^2\), giving \(3x-2=x^2\).`,
        T`\(x^2-3x+2=0\Rightarrow(x-1)(x-2)=0\Rightarrow x=1\) or \(x=2\). Both make the arguments positive.`] },
      { t: 'An inequality with base < 1', p: T`For which \(x\) is \(\left(\tfrac12\right)^x\ge4\)?`, s: [
        T`Method 1: apply \(\log_{1/2}\), a decreasing function, so the sign flips: \(x\le\log_{1/2}4=-2\).`,
        T`Method 2: apply \(\log\) (increasing, sign stays): \(x\log\tfrac12\ge\log4\).`,
        T`Divide by \(\log\tfrac12<0\): the sign flips, \(x\le\dfrac{\log4}{\log0.5}=-2\).`] },
      { t: 'Inequality with two powers', p: T`Solve \(1.05^{t+3}>2\cdot0.9^t\).`, s: [
        T`Take \(\ln\) (sign stays): \((t+3)\ln1.05>\ln2+t\ln0.9\).`,
        T`Collect \(t\): \(t(\ln1.05-\ln0.9)>\ln2-3\ln1.05\).`,
        T`\(\ln1.05-\ln0.9>0\), so the sign stays: \(t>\dfrac{\ln2-3\ln1.05}{\ln1.05-\ln0.9}\approx3.55\).`] }
    ],
    practice: [
      { name: 'Solve A·bˣ + c = d', gen: function (R) {
        var A = R.pick([2, 3, 4, 5]), b = R.pick([2, 3, 1.5, 1.2, 0.8, 0.5]), c = R.pick([0, 1, 5, 10, -3]), k = R.pick([1.5, 2.5, 4, 7, 10, 12, 20, 0.3]);
        var d = A * k + c, x = ln(k) / ln(b);
        var lhs = T`${A}\cdot${fmt(b)}^{x}` + (c ? ' ' + H.signed(c) : '');
        return { q: T`Solve \(${lhs}=${fmt(d)}\). (2 decimals)`, type: 'num', ans: x, prompt: 'x=',
          hint: T`Isolate \(${fmt(b)}^x\) first, then take the log of both sides.`,
          sol: [c ? T`Move the constant: \(${A}\cdot${fmt(b)}^x=${fmt(d - c)}\).` : T`The constant is already isolated.`, T`Divide by ${A}: \(${fmt(b)}^x=${fmt(k)}\).`,
            T`Take logs: \(x\log${fmt(b)}=\log${fmt(k)}\).`, T`\(x=\dfrac{\log${fmt(k)}}{\log${fmt(b)}}\approx${fmt(x, 2)}\).`] };
      } },
      { name: 'When are two amounts equal?', gen: function (R) {
        var P1 = R.pick([1000, 1200, 1500, 2000]), P2 = Math.round(P1 * R.pick([0.7, 0.8, 0.85, 0.9]) / 50) * 50;
        var r1 = R.pick([2, 2.5, 3]), r2 = r1 + R.pick([0.5, 1, 1.5]);
        var g1 = 1 + r1 / 100, g2 = 1 + r2 / 100, t = ln(P1 / P2) / ln(g2 / g1);
        return { q: T`Anna invests €${P1} at ${r1}% per year, Ben invests €${P2} at ${r2}% per year (compound interest). After how many years do they have the same amount? (2 decimals)`,
          type: 'num', ans: t, prompt: 't=', unit: 'years', hint: T`Set \(${P1}\cdot${fmt(g1)}^t=${P2}\cdot${fmt(g2)}^t\) and bring the powers to one side.`,
          sol: [T`\(${P1}\cdot${fmt(g1)}^t=${P2}\cdot${fmt(g2)}^t\).`, T`\(\left(\dfrac{${fmt(g2)}}{${fmt(g1)}}\right)^t=\dfrac{${P1}}{${P2}}\).`,
            T`\(t=\dfrac{\ln(${P1}/${P2})}{\ln(${fmt(g2)}/${fmt(g1)})}\approx${fmt(t, 2)}\) years.`] };
      } },
      { name: 'Solve a log equation', gen: function (R) {
        var mode = R.pick(['ln', 'exact', 'exact', 'eln']);
        if (mode === 'ln') {
          var k = R.pick([2, 3]), a = R.int(1, 6), c = R.pick([3, 4, 5, 6]), x = Math.exp(c / k) - a;
          return { q: T`Solve \(${k}\ln(x+${a})=${c}\). (2 decimals)`, type: 'num', ans: x, prompt: 'x=', hint: T`Divide by ${k}, then use \(\ln A=y\iff A=e^y\).`,
            sol: [T`\(\ln(x+${a})=${fmt(c / k)}\).`, T`\(x+${a}=e^{${fmt(c / k)}}\).`, T`\(x=e^{${fmt(c / k)}}-${a}\approx${fmt(x, 2)}\). Check: \(x+${a}>0\) ✓.`] };
        }
        if (mode === 'eln') {
          var kk = R.pick([2, 3, 4, 5]);
          return { q: T`Solve \(e^{-\ln x}=${kk}\).`, type: 'num', ans: 1 / kk, prompt: 'x=', show: T`\(x=\frac1{${kk}}\)`, hint: T`\(-\ln x=\ln\frac1x\) and \(e^{\ln A}=A\).`,
            sol: [T`\(e^{-\ln x}=e^{\ln(1/x)}=\dfrac1x\).`, T`\(\dfrac1x=${kk}\Rightarrow x=\dfrac1{${kk}}\).`] };
        }
        var B = R.pick([2, 3, 10]), n = R.pick([1, 2, 3]); if (B === 10) n = R.pick([1, 2]);
        var a2 = R.pick([1, 2, 3]), x0 = R.int(1, 9), b = Math.pow(B, n) - a2 * x0;
        var bT = B === 10 ? T`\log` : T`\log_{${B}}`;
        var arg = (a2 === 1 ? '' : a2) + 'x' + (b ? ' ' + H.signed(b) : '');
        return { q: T`Solve \(${bT}(${arg})=${n}\) without a calculator.`, type: 'num', ans: x0, prompt: 'x=', hint: T`Definition: the argument equals \(${B}^{${n}}\).`,
          sol: [T`Definition: \(${arg}=${B}^{${n}}=${Math.pow(B, n)}\).`, T`\(${a2 === 1 ? '' : a2}x=${Math.pow(B, n) - b}\Rightarrow x=${x0}\).`, T`Check: the argument is \(${Math.pow(B, n)}>0\) ✓.`] };
      } },
      { name: 'Exponential inequality', gen: function (R) {
        var A = R.pick([1, 2, 3, 5]), b = R.pick([2, 3, 0.5, 0.8, 1.5, 0.25, 1.1]), k = R.pick([0.2, 1.5, 3, 5, 8, 12, 0.6]);
        var C = A * k, op = R.pick(['<', '<=', '>', '>=']);
        var L = ln(k) / ln(b), res = b > 1 ? op : H.flip[op];
        var lhs = (A === 1 ? '' : A + T`\cdot `) + fmt(b) + '^x';
        return { q: T`Solve \(${lhs}${H.opTex[op]}${fmt(C)}\). (boundary to 2 decimals)`, type: 'ineq', ans: { op: res, v: L },
          hint: T`Isolate the power, take \(\log\) of both sides, then divide by \(\log${fmt(b)}\). Is that number positive or negative?`,
          sol: [A === 1 ? T`The power is isolated: \(${fmt(b)}^x${H.opTex[op]}${fmt(k)}\).` : T`Divide by ${A} (positive, sign stays): \(${fmt(b)}^x${H.opTex[op]}${fmt(k)}\).`,
            T`Take \(\log\) (increasing, sign stays): \(x\log${fmt(b)}${H.opTex[op]}\log${fmt(k)}\).`,
            b > 1 ? T`\(\log${fmt(b)}>0\): dividing keeps the sign.` : T`\(\log${fmt(b)}<0\): dividing flips the sign.`,
            T`\(x${H.opTex[res]}\dfrac{\log${fmt(k)}}{\log${fmt(b)}}\approx${fmt(L, 2)}\).`] };
      } },
      { name: 'Inequality with two powers', gen: function (R) {
        var pair = R.sample([1.05, 0.9, 1.1, 1.02, 0.95, 1.2], 2), c = pair[0], d = pair[1], k = R.pick([2, 3, 0.5, 1.5]);
        var op = R.pick(['>', '<', '>=', '<=']);
        var q = ln(c / d), L = ln(k) / q, res = q > 0 ? op : H.flip[op];
        return { q: T`Solve \(${fmt(c)}^{t}${H.opTex[op]}${fmt(k)}\cdot${fmt(d)}^{t}\). (boundary to 2 decimals)`, type: 'ineq', v: 't', ans: { op: res, v: L },
          hint: T`Divide by \(${fmt(d)}^t\) (positive), take \(\ln\), then check the sign of \(\ln\frac{${fmt(c)}}{${fmt(d)}}\).`,
          sol: [T`Divide by \(${fmt(d)}^t>0\): \(\left(\frac{${fmt(c)}}{${fmt(d)}}\right)^t${H.opTex[op]}${fmt(k)}\).`,
            T`Take \(\ln\): \(t\ln\frac{${fmt(c)}}{${fmt(d)}}${H.opTex[op]}\ln${fmt(k)}\).`,
            T`\(\ln\frac{${fmt(c)}}{${fmt(d)}}\approx${fmt(q)}\) is ${q > 0 ? 'positive: sign stays' : 'negative: sign flips'}.`,
            T`\(t${H.opTex[res]}${fmt(L, 2)}\).`] };
      } },
      { name: 'Inequality by heart', gen: function (R) {
        var bb = R.pick([[2, '2'], [3, '3'], [5, '5'], [0.5, T`\left(\tfrac12\right)`], [1 / 3, T`\left(\tfrac13\right)`]]), b = bb[0];
        var k = R.nz(-3, 3); if (b === 5) k = R.nz(-2, 2);
        var v = Math.pow(b, k), m = Math.round(b > 1 ? b : 1 / b);
        var rhs = Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : T`\tfrac{1}{${Math.round(1 / v)}}`;
        var op = R.pick(['<', '<=', '>', '>=']), res = b > 1 ? op : H.flip[op], fl = H.flip[op];
        var ch = [T`\(x${H.opTex[res]}${k}\)`, T`\(x${H.opTex[H.flip[res]]}${k}\)`, T`\(x${H.opTex[res]}${-k}\)`, T`\(x${H.opTex[H.flip[res]]}${-k}\)`];
        return { q: T`Solve \(${bb[1]}^x${H.opTex[op]}${rhs}\) without a calculator.`, type: 'mc', choices: ch, ans: 0,
          sol: [T`Write the right side as a power of the base: \(${rhs}=${bb[1]}^{${k}}\).`,
            b > 1 ? T`Base \(${m}>1\): \(\log_{${m}}\) is increasing, the sign stays.` : T`Base \(\tfrac1{${m}}<1\): \(\log_{1/${m}}\) is decreasing, the sign flips.`,
            T`\(x${H.opTex[res]}${k}\).`] };
      } }
    ],
    course: [
      { q: T`Solve \(3\cdot2^x+5=100\). (2 decimals)`, a: T`\(x\approx4.98\)` },
      { q: T`Solve \(A\cdot e^{2.5x}=B\cdot e^{0.5x}\) for \(A,B>0\).`, a: T`\(x=0.5\ln\dfrac BA\)` },
      { q: T`Solve without a calculator: a) \(\log_3\frac{x^2}2=\log_3x+2\) b) \(\log_4(3x-2)=\log_2x\) c) \(e^{-\ln x}=3\).`, a: T`a) \(x=18\) b) \(x=1\) or \(x=2\) c) \(x=\tfrac13\)` },
      { q: T`Solve \(1.05^{t+3}>2\cdot0.9^t\).`, a: T`\(t>\dfrac{\ln2-3\ln1.05}{\ln1.05-\ln0.9}\approx3.55\)` }
    ]
  };

  /* ===================== 1.4 Applications ===================== */
  var growth = {
    id: 'growth', code: '1.4', title: 'Applications: growth models',
    summary: 'Linear vs exponential growth, growth factors, doubling time and half-life.',
    formulas: [
      { n: 'Linear growth', t: T`y(t)=b+m\,t`, note: T`\(b\) initial value, \(m\) growth term per time unit.` },
      { n: 'Exponential growth', t: T`y(t)=b\cdot g^t`, note: T`\(b\) initial value, \(g\) growth factor per time unit (\(g>1\) growth, \(0<g<1\) decay).` },
      { n: 'Percentage → factor', t: T`\begin{gathered}+p\%:\ \ g=1+\frac p{100}\\ -p\%:\ \ g=1-\frac p{100}\end{gathered}` },
      { n: 'Change of time period (r × as long)', t: T`\begin{gathered}m_{\text{new}}=r\cdot m_{\text{old}}\\ g_{\text{new}}=\left(g_{\text{old}}\right)^r\end{gathered}` },
      { n: 'Doubling time', t: T`T_2=\frac{\log2}{\log g}` },
      { n: 'Half-life', t: T`T_{1/2}=\frac{\log\frac12}{\log g}` },
      { n: 'Model from a half-life H', t: T`y(t)=b\cdot\left(\tfrac12\right)^{t/H}` }
    ],
    learn: [
      { h: 'Linear vs exponential', body: T`<p>Two calves weigh 18 kg at birth. On farm A one gains 2 kg per week, on farm B the other gains 10% per week.</p>
<div class="two-col"><div><p><strong>Farm A, linear</strong></p><p>\(G(t)=18+2t\)<br>a fixed amount is <em>added</em> each week</p></div><div><p><strong>Farm B, exponential</strong></p><p>\(G(t)=18\cdot1.1^t\)<br>a fixed factor <em>multiplies</em> each week</p></div></div>
<p>Doubling: A needs \(18+2t=36\Rightarrow t=9\) weeks; B needs \(1.1^t=2\Rightarrow t=\frac{\log2}{\log1.1}\approx7.27\) weeks. The exponential doubling time is the same from any starting moment; it depends only on \(g\).</p>` },
      { h: 'Changing the time period', body: T`<p>Over 4 weeks calf A gains \(4\times2=8\) kg, but calf B is multiplied by \(1.1^4\approx1.4641\) (+46.41%), not by +40%. Per day: A gains \(\frac27\) kg, B is multiplied by \(1.1^{1/7}\).</p>
<p><strong>Never multiply a percentage by the number of periods.</strong> Go via the factor: Burundi’s GDP +4% per year → factor \(1.04\) → per decade \(1.04^{10}\approx1.4802\) → +48.02% per decade.</p>` },
      { h: 'Solving a word problem', body: T`<ol><li>Define the variables precisely, with units (“\(t\) = years since …”, “\(C(t)\) = % of carbon-14 left”).</li><li>Find the initial value and the growth factor per time unit.</li><li>Write the model.</li><li>Solve the equation or inequality with logs. Keep exact expressions until the end.</li><li>Answer the question in words.</li></ol>
<p>Carbon-14 has a half-life of 5730 years: the factor per 5730 years is \(\frac12\), so per year \(\left(\frac12\right)^{1/5730}\) and \(C(t)=100\cdot\left(\frac12\right)^{t/5730}\).</p>` }
    ],
    pitfalls: [
      T`+4% per year is not +40% per decade. Convert to a factor and raise it to a power.`,
      T`A decrease of 3% per year is \(g=0.97\), not \(-0.03\) and not \(1.03\).`,
      T`Linear: the growth term scales with the period. Exponential: the factor is raised to a power.`,
      T`Rounding the yearly factor (e.g. \(0.99988\)) before solving gives a visibly wrong answer.`
    ],
    examples: [
      { t: 'Population decline', p: T`A village had 1000 inhabitants on 1 January 1980; since then the population decreased by 3% per year. Give \(N(t)\) and the population in 2000.`, s: [
        T`\(t\) = years since 1 Jan 1980, \(N(t)\) = number of inhabitants.`,
        T`Initial value 1000, factor \(g=1-\frac3{100}=0.97\): \(N(t)=1000\cdot0.97^t\).`,
        T`In 2000, \(t=20\): \(N(20)=1000\cdot0.97^{20}\approx544\) inhabitants.`] },
      { t: 'Growth per decade', p: T`GDP grows 4% per year. What is the growth percentage per decade?`, s: [
        T`Factor per year: \(1.04\).`,
        T`Decade = 10 × as long: factor \(1.04^{10}\approx1.4802\).`,
        T`Percentage per decade: \(+48.02\%\).`] },
      { t: 'Monthly rate', p: T`An investment grows 12% per year. What is the growth percentage per month?`, s: [
        T`Factor per year \(1.12\); a month is \(\frac1{12}\) of a year.`,
        T`Factor per month: \(1.12^{1/12}\approx1.009489\).`,
        T`About \(+0.95\%\) per month (not \(12/12=1\%\)).`] },
      { t: 'Dead Sea Scrolls', p: T`Carbon-14 decays exponentially with half-life 5730 years. In 1947 the scroll wrappings contained 76% of their original carbon-14. Estimate their age.`, s: [
        T`\(t\) = years since the origin of the scrolls, \(C(t)\) = % carbon-14 left; \(C(0)=100\).`,
        T`Factor per year \(\left(\frac12\right)^{1/5730}\), so \(C(t)=100\cdot\left(\frac12\right)^{t/5730}\).`,
        T`Solve \(100\cdot\left(\frac12\right)^{t/5730}=76\Rightarrow\left(\frac12\right)^{t/5730}=0.76\).`,
        T`Logs: \(\frac{t}{5730}\log\frac12=\log0.76\Rightarrow t=\dfrac{5730\log0.76}{\log0.5}\approx2269\) years.`] },
      { t: 'Doubling time', p: T`Calf B weighs \(G(t)=18\cdot1.1^t\) kg after \(t\) weeks. How long does it take to double its weight, from birth and from week 2?`, s: [
        T`From birth: \(18\cdot1.1^t=36\Rightarrow1.1^t=2\Rightarrow t=\dfrac{\log2}{\log1.1}\approx7.27\) weeks.`,
        T`At week 2 it weighs \(18\cdot1.1^2=21.78\) kg. Solve \(18\cdot1.1^t=43.56\Rightarrow t\approx9.27\), i.e. \(9.27-2=7.27\) weeks later.`,
        T`Same answer: the doubling time does not depend on the starting value.`] }
    ],
    practice: [
      { name: 'Percentage ↔ growth factor', gen: function (R) {
        var p = R.pick([2, 3, 4.5, 7, 10, 12.5, 15, 20, 25, 35]), s = R.sign(), g = 1 + (s * p) / 100;
        if (R.chance()) {
          return { q: T`A quantity ${s > 0 ? 'increases' : 'decreases'} by ${p}% per year. What is the growth factor per year?`, type: 'num', ans: g, prompt: 'g=',
            hint: T`\(g=1${s > 0 ? '+' : '-'}\frac{p}{100}\).`, sol: [T`\(g=1${s > 0 ? '+' : '-'}\frac{${p}}{100}=${fmt(g)}\).`] };
        }
        return { q: T`A model has growth factor \(g=${fmt(g)}\) per year. What is the growth percentage per year? (use a minus sign for a decrease)`, type: 'num', ans: s * p, prompt: 'p=', unit: '%',
          hint: T`Percentage \(=(g-1)\times100\).`, sol: [T`\((${fmt(g)}-1)\times100=${fmt(s * p)}\%\): ${s > 0 ? 'an increase' : 'a decrease'} of ${p}% per year.`] };
      } },
      { name: 'Change of time period', gen: function (R) {
        var pr = R.pick([['month', 'quarter', 3], ['quarter', 'year', 4], ['year', 'decade', 10], ['year', 'month', 1 / 12], ['week', 'day', 1 / 7], ['semester', 'year', 2], ['year', 'quarter', 1 / 4], ['day', 'week', 7]]);
        var p = R.pick([1, 2, 4, 5, 10, 12, 20]) * R.pick([1, 1, -1]);
        var g = 1 + p / 100, gn = Math.pow(g, pr[2]), pn = (gn - 1) * 100;
        var rT = pr[2] < 1 ? T`\tfrac{1}{${Math.round(1 / pr[2])}}` : String(pr[2]);
        return { q: T`A quantity ${p > 0 ? 'grows' : 'shrinks'} by ${Math.abs(p)}% per ${pr[0]}. What is the growth percentage per ${pr[1]}? (2 decimals; minus sign for a decrease)`,
          type: 'num', ans: pn, prompt: 'p=', unit: '%', hint: T`Convert to a factor, raise it to the power \(r\) (how many old periods fit in the new one), convert back.`,
          sol: [T`Factor per ${pr[0]}: \(${fmt(g)}\).`, T`A ${pr[1]} is \(${rT}\) ${pr[0]}${pr[2] === 1 ? '' : 's'}: factor \(${fmt(g)}^{${rT}}\approx${fmt(gn, 6)}\).`, T`Percentage: \((${fmt(gn, 6)}-1)\times100\approx${fmt(pn, 2)}\%\).`] };
      } },
      { name: 'Doubling time / half-life', gen: function (R) {
        var unit = R.pick(['year', 'week', 'day', 'hour']), p = R.pick([2, 3, 5, 6, 8, 10, 12, 15, 25]);
        if (R.chance()) {
          var g = 1 + p / 100, T2 = lg(2) / lg(g);
          return { q: T`A quantity grows by ${p}% per ${unit}. What is its doubling time? (2 decimals, in ${unit}s)`, type: 'num', ans: T2, prompt: 'T_2=', unit: unit + 's',
            hint: T`Solve \(${fmt(g)}^t=2\).`, sol: [T`Factor \(g=${fmt(g)}\); doubling: \(${fmt(g)}^t=2\).`, T`\(t=\dfrac{\log2}{\log${fmt(g)}}\approx${fmt(T2, 2)}\) ${unit}s.`] };
        }
        var gd = 1 - p / 100, Th = lg(0.5) / lg(gd);
        return { q: T`A quantity decreases by ${p}% per ${unit}. What is its half-life? (2 decimals, in ${unit}s)`, type: 'num', ans: Th, prompt: T`T_{1/2}=`, unit: unit + 's',
          hint: T`Solve \(${fmt(gd)}^t=\tfrac12\).`, sol: [T`Factor \(g=${fmt(gd)}\); half: \(${fmt(gd)}^t=0.5\).`, T`\(t=\dfrac{\log0.5}{\log${fmt(gd)}}\approx${fmt(Th, 2)}\) ${unit}s.`] };
      } },
      { name: 'Half-life dating', gen: function (R) {
        var iso = R.pick([['carbon-14', 5730, 'years'], ['caesium-137', 30, 'years'], ['iodine-131', 8, 'days'], ['radium-226', 1600, 'years']]);
        var pct = R.pick([12, 25, 40, 55, 63, 76, 85, 92]);
        var t = (iso[1] * ln(pct / 100)) / ln(0.5);
        return { q: T`${iso[0].charAt(0).toUpperCase() + iso[0].slice(1)} has a half-life of ${iso[1]} ${iso[2]}. A sample has ${pct}% of its original amount left. How old is it? (2 decimals)`,
          type: 'num', ans: t, prompt: 't=', unit: iso[2], hint: T`\(C(t)=100\cdot\left(\frac12\right)^{t/${iso[1]}}\). Solve \(C(t)=${pct}\).`,
          sol: [T`Model: \(C(t)=100\cdot\left(\tfrac12\right)^{t/${iso[1]}}\).`, T`\(\left(\tfrac12\right)^{t/${iso[1]}}=${fmt(pct / 100)}\).`,
            T`\(t=\dfrac{${iso[1]}\cdot\log${fmt(pct / 100)}}{\log0.5}\approx${fmt(t, 2)}\) ${iso[2]}.`] };
      } },
      { name: 'Build a model and predict', gen: function (R) {
        var kind = R.pick(['exp', 'exp', 'lin', 'when']);
        var N0 = R.pick([800, 1000, 2500, 5000, 12000, 40000]), p = R.pick([2, 3, 4, 5, 8, 12]), s = R.sign(), t = R.int(3, 15);
        if (kind === 'lin') {
          var m = R.pick([15, 40, 120, 250]) * s, v = N0 + m * t;
          return { q: T`A stock of ${N0} units changes by ${s > 0 ? '+' : '−'}${Math.abs(m)} units every month. How many units after ${t} months?`, type: 'num', ans: v, prompt: 'N=',
            hint: 'A fixed amount per month: linear model.', sol: [T`Linear: \(N(t)=${N0}${m > 0 ? '+' : '-'}${Math.abs(m)}t\).`, T`\(N(${t})=${fmt(v)}\).`] };
        }
        var g = 1 + (s * p) / 100;
        if (kind === 'when') {
          var target = s > 0 ? N0 * R.pick([1.5, 2, 3]) : N0 * R.pick([0.5, 0.25, 0.75]);
          var tt = ln(target / N0) / ln(g);
          return { q: T`A town has ${N0} inhabitants and ${s > 0 ? 'grows' : 'shrinks'} by ${p}% per year. After how many years does it reach ${fmt(target)} inhabitants? (2 decimals)`, type: 'num', ans: tt, prompt: 't=', unit: 'years',
            hint: T`\(N(t)=${N0}\cdot${fmt(g)}^t\). Solve \(N(t)=${fmt(target)}\).`,
            sol: [T`\(N(t)=${N0}\cdot${fmt(g)}^t\).`, T`\(${fmt(g)}^t=${fmt(target / N0)}\).`, T`\(t=\dfrac{\log${fmt(target / N0)}}{\log${fmt(g)}}\approx${fmt(tt, 2)}\) years.`] };
        }
        var val = N0 * Math.pow(g, t);
        return { q: T`A value of ${N0} ${s > 0 ? 'increases' : 'decreases'} by ${p}% per year. What is it after ${t} years? (2 decimals)`, type: 'num', ans: val, prompt: 'y=',
          hint: T`Growth factor \(g=${fmt(g)}\).`, sol: [T`\(y(t)=${N0}\cdot${fmt(g)}^t\).`, T`\(y(${t})=${N0}\cdot${fmt(g)}^{${t}}\approx${fmt(val, 2)}\).`] };
      } },
      { name: 'Choose the model', gen: function (R) {
        var sc = R.pick(['dep', 'leak', 'grow', 'add']);
        var V = R.pick([2000, 15000, 30000]), p = R.pick([5, 8, 12, 20]), m = R.pick([3, 5, 12]);
        var d = fmt(1 - p / 100), u = fmt(1 + p / 100), pp = fmt(p / 100);
        var map = {
          dep: [T`A car worth €${V} loses ${p}% of its value every year. Value after \(t\) years?`, [T`\(${V}\cdot${d}^t\)`, T`\(${V}\cdot${u}^t\)`, T`\(${V}-${pp}\,t\)`, T`\(${V}\cdot${pp}^t\)`], 'A fixed percentage lost per year: factor 1 − p/100, exponential.'],
          leak: [T`A tank holds ${V} litres and loses ${m} litres every hour. Contents after \(t\) hours?`, [T`\(${V}-${m}\,t\)`, T`\(${V}\cdot(1-${m})^t\)`, T`\(${V}\cdot${m}^{-t}\)`, T`\(${V}+${m}\,t\)`], 'A fixed amount per hour: linear with growth term −' + m + '.'],
          grow: [T`Sales of ${V} units grow by ${p}% per year. Sales after \(t\) years?`, [T`\(${V}\cdot${u}^t\)`, T`\(${V}\cdot${pp}^t\)`, T`\(${V}+${pp}\,t\)`, T`\(${V}\cdot${d}^t\)`], 'A fixed percentage per year: factor 1 + p/100, exponential.'],
          add: [T`A savings jar has €${V} and €${m * 10} is added every month. Amount after \(t\) months?`, [T`\(${V}+${m * 10}\,t\)`, T`\(${V}\cdot${m * 10}^t\)`, T`\(${V}\cdot1.${m * 10}^t\)`, T`\(${m * 10}+${V}\,t\)`], 'A fixed amount per month: linear.']
        };
        var c = map[sc];
        return { q: c[0], type: 'mc', choices: c[1], ans: 0, sol: [c[2]] };
      } }
    ],
    course: [
      { q: T`Complete: +10% per quarter → ? per year; −10% per semester → ? per year; +100% per month → ? per quarter; +12% per year → ? per month.`, a: T`\(+46.41\%\) (\(1.1^4\)); \(-19\%\) (\(0.9^2\)); \(+700\%\) (\(2^3\)); \(+0.9488\%\) (\(1.12^{1/12}\)).` },
      { q: T`Carbon-14 (half-life 5730 years): the Dead Sea Scrolls had 76% of their carbon-14 left in 1947. Estimate their age.`, a: T`\(t=\dfrac{5730\log0.76}{\log0.5}\approx2269\) years.` },
      { q: T`Calves: \(G_A(t)=18+2t\), \(G_B(t)=18\cdot1.1^t\). After how many weeks do they weigh the same (apart from \(t=0\))? Use the GC.`, a: T`\(t\approx3.14\) weeks.` }
    ]
  };

  MS.addTopic({ id: 't1', code: 'Topic 1', title: 'Exponential and logarithmic functions', lessons: [exp, log, expeq, growth] });
})();
