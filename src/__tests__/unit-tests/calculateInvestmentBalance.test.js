// calculation results validated against https://smartasset.com/investing/investment-calculator

const calculateInvestmentBalance = require('../../helpers/calculateInvestmentBalance');

describe('calculateInvestmentBalance', () => {
  let principalInvestment = 5000;
  let annualInterestRate = 5;
  let monthlyContributions = 100;
  let totalInvestmentTime = 30;

  test('returns null if any input is not a number', () => {
    const result = calculateInvestmentBalance('abc');
    expect(result).toBeNull();
  });

  test('returns correct final balance 1', () => {
    const result = calculateInvestmentBalance(
      principalInvestment,
      annualInterestRate,
      monthlyContributions,
      totalInvestmentTime
    );
    expect(result).toBe(105565);
  });

  test('returns correct final balance 2', () => {
    monthlyContributions = 0;
    const result = calculateInvestmentBalance(
      principalInvestment,
      annualInterestRate,
      monthlyContributions,
      totalInvestmentTime
    );
    expect(result).toBe(22339);
  });
});
