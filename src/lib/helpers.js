module.exports = {
  getValueAfterCompoundInterest: function (
    principal,
    annualInterestRate,
    time
  ) {
    // Implementation of compound interest for principal
    // https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
    // A = P(1 + r/n)(nt)

    const annualInterestRateDecimal = annualInterestRate / 100;

    // (1 + r/n)
    const a = 1 + annualInterestRateDecimal / 12;

    // (nt)
    const b = 12 * time;

    // (a)(b)
    const c = a ** b;

    // P * (c)
    const compoundInterestForPrincipal = principal * c;

    return compoundInterestForPrincipal;
  },

  getMortgageInterestPaid: function (principal, annualInterestRate, time) {
    return (
      this.getValueAfterCompoundInterest(principal, annualInterestRate, time) -
      principal
    );
  },
};
