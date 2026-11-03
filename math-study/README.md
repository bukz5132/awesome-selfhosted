# MB-A Maths Trainer

A self-contained study site for the MB A maths course. Every lesson follows the same three steps:

1. **Formulas**: key formula cards, short explanations and common mistakes.
2. **Examples**: worked examples, revealed one step at a time.
3. **Practice**: problems generated fresh every time, checked automatically, with a hint and a full worked solution.

There is also a **formula sheet** with a self-test mode and a daily **Smart review**: 10 mixed questions, your past mistakes first, then your weakest or least recently practised skills. Progress is saved in the browser (`localStorage`).

## Contents so far

| Topic | Lessons |
| --- | --- |
| 1. Exponential and logarithmic functions | 1.1 Exponential functions · 1.2 Logarithmic functions · 1.3 Equations and inequalities · 1.4 Growth models |
| 2. Functions: basic concepts and applications | 2.1 Definitions · 2.2 Types of functions · 2.3 Implicit and explicit equations · 2.4 Inverse functions · 2.5 Symmetry · 2.6 Sign charts and continuity · 2.7 Limits and asymptotes |

## Run it

No build step. Open `index.html` through any static web server, for example:

```sh
cd math-study
python3 -m http.server 8000
# then open http://localhost:8000
```

Formulas are rendered with MathJax, loaded from the jsDelivr CDN, so you need an internet connection.

## Add a new topic

Create `content/topic3.js` and add a `<script src="content/topic3.js"></script>` line in `index.html` after the other topics. A topic looks like this:

```js
(function () {
  var T = String.raw, H = MS.h, fmt = H.fmt;   // T`...` keeps TeX backslashes intact
  MS.addTopic({
    id: 't3', code: 'Topic 3', title: 'Derivatives',
    lessons: [{
      id: 'deriv-def',            // used in the URL: #deriv-def-learn
      code: '3.1', title: 'The derivative', summary: 'One line for the home page.',
      formulas: [{ n: 'Power rule', t: T`(x^n)'=nx^{n-1}`, note: 'optional' }],
      learn: [{ h: 'Section heading', body: T`<p>HTML with \(inline\) maths.</p>` }],
      pitfalls: [T`Common mistake…`],
      examples: [{ t: 'Title', p: T`Problem…`, s: [T`Step 1…`, T`Step 2…`] }],
      practice: [{
        name: 'Power rule',
        gen: function (R) {          // R is a seeded random generator: R.int, R.pick, R.chance, R.nz, R.sample
          var n = R.int(2, 6), a = R.int(2, 9);
          return {
            q: T`Differentiate \(f(x)=${a}x^{${n}}\). What is \(f'(1)\)?`,
            type: 'num', ans: a * n, prompt: "f'(1)=",
            hint: 'Bring the exponent down and lower it by one.',
            sol: [T`\(f'(x)=${a * n}x^{${n - 1}}\)`, T`\(f'(1)=${a * n}\)`]
          };
        }
      }],
      course: [{ q: 'Exercise from the slides', a: 'Answer' }]
    }]
  });
})();
```

Answer types:

| `type` | `ans` | Student enters |
| --- | --- | --- |
| `num` | a number (or `Infinity`) | a number or expression: `3/4`, `ln(2)/ln(1.1)`, `e^2`, `inf` |
| `set` | array of numbers, any order | `-2, 3` or `none` |
| `tuple` | array of numbers, in order | `4, -3` |
| `ineq` | `{ op: '<' \| '<=' \| '>' \| '>=', v: number }` | picks the sign and types the boundary |
| `mc` | index into `choices` | clicks one option (shuffled unless `keepOrder: true`) |
| `multi` | array of indices | ticks all that apply |

Numeric answers are accepted within 0.005 or 0.2%, so answers rounded to 2 decimals count as correct.

## Test the generators

```sh
node math-study/tests/generators.test.js
```

This builds every practice generator 400 times and checks that each problem is well formed, that its own answer is accepted, that a 2-decimal rounding is accepted and that a clearly wrong answer is rejected.
