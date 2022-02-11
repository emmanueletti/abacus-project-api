/**
 * Routing logic for education return on invesment calculation
 */

const express = require('express');
const router = express.Router();

const formatNumToDollarString = require('../lib/formatNumToDollarString');

module.exports = function () {
  router.post('/', (req, res) => {
    const {
      programLengthYears,
      annualTuition,
      currentSalary,
      medianExpectedSalary,
      isPartTime,
    } = req.body;

    let educationCost = programLengthYears * annualTuition;
    let lossOfIncome = currentSalary * programLengthYears;
    educationCost = programLengthYears * annualTuition + lossOfIncome;

    educationCost = isPartTime
      ? programLengthYears * annualTuition + lossOfIncome * 0.66
      : programLengthYears * annualTuition + lossOfIncome;

    const increaseInSalary = medianExpectedSalary - currentSalary;

    const returnOnInvestmentPercentage = (
      (increaseInSalary / educationCost) *
      100
    ).toFixed(1);

    const yearsForEducationToPayForItself = (
      educationCost / increaseInSalary
    ).toFixed(1);

    console.log(yearsForEducationToPayForItself);

    res.json({
      increaseInSalary: formatNumToDollarString(increaseInSalary),
      returnOnInvestmentPercentage: `${returnOnInvestmentPercentage}%`,
      yearsForEducationToPayForItself: `${yearsForEducationToPayForItself} Years`,
    });
  });
  return router;
};
