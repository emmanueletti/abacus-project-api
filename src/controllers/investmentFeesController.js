/**
 * Controller logic for investmentFees calculator.
 */

const formatNumToDollarString = require('../helpers/formatNumToDollarString');
const calculateInvestmentBalance = require('../helpers/calculateInvestmentBalance');

const investmentFeesValidator = (reqBody) => {
  const result = {
    isValid: true,
    errorMessages: [],
  };

  const values = Object.values(reqBody).filter((value) => value);
  if (!values.length) {
    result.isValid = false;
    result.errorMessages.push(`Body data can not be empty`);
  }

  // validate number types
  Object.keys(reqBody).forEach((key) => {
    const value = reqBody[key];
    if (isNaN(value) || value < 0) {
      result.isValid = false;
      result.errorMessages.push(`${key} must be a number type greater than 0`);
    }
  });

  // validate ages
  if (reqBody.startingAge > reqBody.retirementAge) {
    result.isValid = false;
    result.errorMessages.push(
      `startingAge can not be greater than retirementAge`
    );
  }

  // validate management expense ratio
  if (reqBody.managementExpenseRatio > 20) {
    result.isValid = false;
    result.errorMessages.push(
      `managementExpenseRatio can not be greater than 20`
    );
  }

  return result;
};

// Controller
module.exports = (req, res) => {
  try {
    const { isValid, errorMessages } = investmentFeesValidator(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errorMessages });
    }

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

    return res.json({
      finalInvestmentAmountWithOutFees: formatNumToDollarString(
        finalInvestmentAmountWithOutFees
      ),
      finalInvestmentAmountWithFees: formatNumToDollarString(
        finalInvestmentAmountWithFees
      ),
      amountLostToFees: formatNumToDollarString(amountLostToFees),
      percentageLostToFees,
    });
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};
