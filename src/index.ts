import type {
  TextlintFixableRuleModule,
  TextlintRuleReporter,
} from "@textlint/types";
import { checkEndsWithPeriod } from "check-ends-with-period";

const checkEndsWithoutPeriod = (text: string, periodMarks: string[]) => {
  const { index, periodMark, valid } = checkEndsWithPeriod(text, {
    periodMarks,
  });

  return {
    index,
    periodMark,
    valid: !valid,
  };
};

interface Options {
  periodMark?: string;
  periodMarks?: string[];
}

const reporter: TextlintRuleReporter<Options> = (context, options = {}) => {
  const { RuleError, Syntax, fixer, getSource, report } = context;

  const preferPeriodMark = options?.periodMark || "";
  const isNotNeededPeriodMark = preferPeriodMark === "";
  const periodMarks = options?.periodMarks || [".", "。", "．"];

  return {
    [Syntax.Header](node) {
      const text = getSource(node);

      // Prefer no needed period
      if (isNotNeededPeriodMark) {
        const { index, periodMark, valid } = checkEndsWithoutPeriod(
          text,
          periodMarks,
        );
        if (valid) {
          return;
        }

        const ruleError = new RuleError(
          `Should remove period mark("${periodMark}") at end of header.`,
          {
            fix: fixer.replaceTextRange([index, index + periodMark.length], ""),
            index,
          },
        );
        report(node, ruleError);
        return;
      }

      // Prefer to use period
      const { index, periodMark, valid } = checkEndsWithPeriod(text, {
        periodMarks,
      });
      if (valid) {
        if (periodMark === preferPeriodMark) {
          return;
        }

        const ruleError = new RuleError(
          `Prefer to use period mark("${preferPeriodMark}") at end of header.`,
          {
            index,
            fix: fixer.replaceTextRange(
              [index, index + periodMark.length],
              preferPeriodMark,
            ),
          },
        );
        report(node, ruleError);
      } else {
        const ruleError = new RuleError(
          `Not exist period mark("${preferPeriodMark}") at end of header.`,
          { index },
        );
        report(node, ruleError);
      }
    },
  };
};

const rule: TextlintFixableRuleModule<Options> = {
  linter: reporter,
  fixer: reporter,
};
export default rule;
