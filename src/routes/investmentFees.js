/**
 * Routing logic for investment fees calculation
 */

const express = require('express');
const router = express.Router();

const calculateInvestmentBalance = require('../lib/calculateInvestmentBalance');
const formatNumToDollarString = require('../lib/formatNumToDollarString');

const investmentFeesValidator = (args) => {
  const result = {
    isValid: true,
    errorMessages: [],
  };

  // validate number types
  Object.keys(args).forEach((key) => {
    const value = args[key];
    if (isNaN(value) || value < 0) {
      result.isValid = false;
      result.errorMessages.push(`${key} must be a number type greater than 0`);
    }
  });

  // validate ages
  if (args.startingAge > args.retirementAge) {
    result.isValid = false;
    result.errorMessages.push(
      `startingAge can not be greater than retirementAge`
    );
  }

  // validate management expense ratio
  if (args.managementExpenseRatio > 20) {
    result.isValid = false;
    result.errorMessages.push(
      `managementExpenseRatio can not be greater than 20`
    );
  }

  return result;
};

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

    // Validate
    const { isValid, errorMessages } = investmentFeesValidator(req.body);

    if (!isValid) {
      return res.status(400).json({ error: errorMessages });
    }

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
