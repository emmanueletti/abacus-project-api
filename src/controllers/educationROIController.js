/**
 * Controller logic for educationROI calculator.
 */

const formatNumToDollarString = require('../helpers/formatNumToDollarString');

const educationROIValidator = (reqBody) => {
  const result = {
    isValid: true,
    errorMessages: [],
  };

  const values = Object.values(reqBody).filter((value) => value);
  if (!values.length) {
    result.isValid = false;
    result.errorMessages.push(`Body data can not be empty`);
  }

  const {
    programLengthYears,
    annualTuition,
    currentSalary,
    medianExpectedSalary,
    isPartTime,
  } = reqBody;

  // validate number types
  Object.keys({
    programLengthYears,
    annualTuition,
    currentSalary,
    medianExpectedSalary,
  }).forEach((key) => {
    const value = reqBody[key];
    if (isNaN(value) || value < 0) {
      result.isValid = false;
      result.errorMessages.push(`${key} must be a number type greater than 0`);
    }
  });

  if (medianExpectedSalary < currentSalary) {
    result.isValid = false;
    result.errorMessages.push(
      `medianExpectedSalary must be greater than or equal to currentSalary`
    );
  }

  // validate bool
  if (isPartTime && typeof isPartTime !== 'boolean') {
    result.isValid = false;
    result.errorMessages.push(`isPartTime must be a boolean`);
  }

  return result;
};

// Controller
module.exports = (req, res) => {
  try {
    const { isValid, errorMessages } = educationROIValidator(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errorMessages });
    }

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

    return res.json({
      increaseInSalary: formatNumToDollarString(increaseInSalary),
      returnOnInvestmentPercentage: `${returnOnInvestmentPercentage}%`,
      yearsForEducationToPayForItself: `${yearsForEducationToPayForItself} Years`,
    });
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' });
  }
};
