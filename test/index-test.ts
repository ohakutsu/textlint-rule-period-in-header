import TextlintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextlintTester();

tester.run("textlint-rule-period-in-header", rule, {
  valid: [
    "text",
    "- text.",
    "- text。",
    "- text．",
    "# text",
    `
# header1

## header2

### header3
`,
    {
      text: "# text.",
      options: {
        periodMarks: ["。", "．"],
      },
    },
    {
      text: "# text.",
      options: {
        periodMark: ".",
      },
    },
    "# text!",
    "# text?",
    "# text (foobar)",
  ],
  invalid: [
    {
      text: "# text.",
      output: "# text",
      errors: [
        {
          message: 'Should remove period mark(".") at end of header.',
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: "# text。",
      output: "# text",
      errors: [
        {
          message: 'Should remove period mark("。") at end of header.',
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: "# text．",
      output: "# text",
      errors: [
        {
          message: 'Should remove period mark("．") at end of header.',
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: `
# header1.

## header2。

### header3．
`,
      output: `
# header1

## header2

### header3
`,
      errors: [
        {
          message: 'Should remove period mark(".") at end of header.',
          line: 2,
          column: 10,
        },
        {
          message: 'Should remove period mark("。") at end of header.',
          line: 4,
          column: 11,
        },
        {
          message: 'Should remove period mark("．") at end of header.',
          line: 6,
          column: 12,
        },
      ],
    },
    {
      text: "# text@",
      output: "# text",
      options: {
        periodMarks: ["@"],
      },
      errors: [
        {
          message: 'Should remove period mark("@") at end of header.',
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: "# text.",
      output: "# text。",
      options: {
        periodMark: "。",
      },
      errors: [
        {
          message: 'Prefer to use period mark("。") at end of header.',
          line: 1,
          column: 7,
        },
      ],
    },
    {
      text: `
# header1.

## header2。

### header3．
`,
      output: `
# header1.

## header2.

### header3.
`,
      options: {
        periodMark: ".",
      },
      errors: [
        {
          message: 'Prefer to use period mark(".") at end of header.',
          line: 4,
          column: 11,
        },
        {
          message: 'Prefer to use period mark(".") at end of header.',
          line: 6,
          column: 12,
        },
      ],
    },
    {
      text: "# text",
      options: {
        periodMark: ".",
      },
      errors: [
        {
          message: 'Not exist period mark(".") at end of header.',
          line: 1,
          column: 6,
        },
      ],
    },
    {
      text: `
# header1

## header2

### header3
`,
      options: {
        periodMark: "。",
      },
      errors: [
        {
          message: 'Not exist period mark("。") at end of header.',
          line: 2,
          column: 9,
        },
        {
          message: 'Not exist period mark("。") at end of header.',
          line: 4,
          column: 10,
        },
        {
          message: 'Not exist period mark("。") at end of header.',
          line: 6,
          column: 11,
        },
      ],
    },
  ],
});
