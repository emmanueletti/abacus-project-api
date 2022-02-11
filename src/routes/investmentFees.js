/**
 * Routing logic for investment fees calculation
 */

const express = require('express');
const router = express.Router();

const calculateInvestmentBalance = require('../lib/calculateInvestmentBalance');
const formatNumToDollarString = require('../lib/formatNumToDollarString');

module.exports = function () {
  router.post('/', (req, res) => {
    const {
      principalInvestment,
      annualInterestRate,
      monthlyContributions,
      managementExpenseRatio,
      startingAge,
      retirementAge,
    } = req.body;

    const totalInvestmentTime = retirementAge - startingAge;

    const finalInvestmentAmountWithFees = calculateInvestmentBalance(
      principalInvestment,
      annualInterestRate - managementExpenseRatio,
      monthlyContributions,
      totalInvestmentTime
    );

    const finalInvestmentAmountWithOutFees = calculateInvestmentBalance(
      principalInvestment,
      annualInterestRate,
      monthlyContributions,
      totalInvestmentTime
    );

    const amountLostToFees =
      finalInvestmentAmountWithOutFees - finalInvestmentAmountWithFees;

    const percentageLostToFees = `${(
      (amountLostToFees / finalInvestmentAmountWithOutFees) *
      100
    ).toFixed(2)}%`;

    res.json({
      finalInvestmentAmountWithOutFees: formatNumToDollarString(
        finalInvestmentAmountWithOutFees
      ),
      finalInvestmentAmountWithFees: formatNumToDollarString(
        finalInvestmentAmountWithFees
      ),
      amountLostToFees: formatNumToDollarString(amountLostToFees),
      percentageLostToFees,
    });
  });

  return router;
};
