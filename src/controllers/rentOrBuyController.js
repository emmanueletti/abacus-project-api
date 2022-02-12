/**
 * Controller logic for Renting vs. Buying decision maker
 */

const formatNumToDollarString = require('../helpers/formatNumToDollarString');

const rentOrBuyValidator = ({ homePrice, isTFSAorRRSPMaxed }) => {
  const result = {
    isValid: true,
    errorMessages: [],
  };

  // validate number types
  if (isNaN(homePrice) || homePrice <= 0 || !homePrice) {
    result.isValid = false;
    result.errorMessages.push(`homePrice must be a number type greater than 0`);
  }

  // validate booleans
  if (isTFSAorRRSPMaxed && typeof isTFSAorRRSPMaxed !== 'boolean') {
    result.isValid = false;
    result.errorMessages.push(`isTFSAorRRSPMaxed must be a boolean`);
  }

  return result;
};

module.exports = {
  calculateData: (req, res) => {
    // Validate
    const { isValid, errorMessages } = rentOrBuyValidator(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errorMessages });
    }

    const { homePrice, isTFSAorRRSPMaxed } = req.body;
    const unrecoverableCostsMultiplier = isTFSAorRRSPMaxed ? 0.04 : 0.05;
    const monthsInTheYear = 12;

    const rentEquivalent = Math.round(
      (homePrice * unrecoverableCostsMultiplier) / monthsInTheYear
    );

    return res.json({
      rentEquivalent: formatNumToDollarString(rentEquivalent),
      referenceURL: 'https://www.youtube.com/watch?v=Uwl3-jBNEd4',
    });
  },
};
