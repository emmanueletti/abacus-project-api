const NUM_TIMES_COMPOUNDED_PER_UNIT_TIME = 12;

// Implementation of compound interest for principal and Future value of a series formula
// https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
// A = P(1 + r/n)(nt)
module.exports = function (...args) {
  const areAllArgsNumbers = args.every((arg) => !isNaN(arg));

  if (!areAllArgsNumbers) return null;

  const [
    principalInvestment,
    annualInterestRate,
    monthlyContributions,
    totalInvestmentTime,
  ] = args;

  const annualInterestRateDeci = annualInterestRate / 100;

  // (1 + r/n)
  const a = 1 + annualInterestRateDeci / NUM_TIMES_COMPOUNDED_PER_UNIT_TIME;

  // (nt)
  const b = NUM_TIMES_COMPOUNDED_PER_UNIT_TIME * totalInvestmentTime;

  // (a)(b)
  const c = a ** b;

  // P * (c)
  const compoundInterestForPrincipal = principalInvestment * c;

  // Future value of a series formula
  // MonthlyContributions × {[(1 + r/n)(nt) - 1] / (r/n)}
  const d =
    (c - 1) / (annualInterestRateDeci / NUM_TIMES_COMPOUNDED_PER_UNIT_TIME);

  const FutureValueOfSeries = monthlyContributions * d;

  const finalInvestmentAmount =
    compoundInterestForPrincipal + FutureValueOfSeries;

  return Math.round(finalInvestmentAmount);
};
