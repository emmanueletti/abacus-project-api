/**
 * Controller logic for investment vehicle decision maker
 */

const formatNumToDollarString = require('../helpers/formatNumToDollarString');

const FEDERAL_TAX_BRACKET_TIER_1 = 50197;

module.exports = {
  _investmentVehicleValidator: ({
    annualIncome,
    isTFSAContributionMaxed,
    isRRSPContributionMaxed,
  }) => {
    const result = {
      isValid: true,
      errorMessages: [],
    };

    // validate number types
    if (isNaN(annualIncome) || annualIncome <= 0 || !annualIncome) {
      result.isValid = false;
      result.errorMessages.push(
        `annualIncome must be a number type greater than 0`
      );
    }

    // validate booleans
    if (
      isTFSAContributionMaxed &&
      typeof isTFSAContributionMaxed !== 'boolean'
    ) {
      result.isValid = false;
      result.errorMessages.push(`isTFSAContributionMaxed must be a boolean`);
    }

    if (
      isRRSPContributionMaxed &&
      typeof isRRSPContributionMaxed !== 'boolean'
    ) {
      result.isValid = false;
      result.errorMessages.push(`isRRSPContributionMaxed must be a boolean`);
    }

    return result;
  },

  investmentVehicleController: (req, res) => {
    // Validate
    const { isValid, errorMessages } =
      module.exports._investmentVehicleValidator(req.body);
    if (!isValid) {
      return res.status(400).json({ error: errorMessages });
    }

    const { annualIncome, isTFSAContributionMaxed, isRRSPContributionMaxed } =
      req.body;

    if (annualIncome > FEDERAL_TAX_BRACKET_TIER_1 && !isRRSPContributionMaxed) {
      const amountForRRSP = annualIncome - FEDERAL_TAX_BRACKET_TIER_1;
      return res.json({
        investmentVehicle: 'RRSP',
        amountToContribute: `Contribute at most ${formatNumToDollarString(
          amountForRRSP
        )} without going past max RRSP contribution room`,
      });
    }

    if (isTFSAContributionMaxed && !isRRSPContributionMaxed) {
      return res.json({
        investmentVehicle: 'RRSP',
        amountToContribute: 'till contribution room is maxed',
      });
    }

    if (!isTFSAContributionMaxed && isRRSPContributionMaxed) {
      return res.json({
        investmentVehicle: 'TFSA',
        amountToContribute: 'Till contribution room is maxed',
      });
    }

    if (isTFSAContributionMaxed && isRRSPContributionMaxed) {
      return res.json({
        investmentVehicle:
          'Non-Registered / Non-Tax Advantaged Investment Account',
        amountToContribute: 'As much as possible',
      });
    }

    res.json({
      investmentVehicle: 'TFSA',
      amountToContribute: 'Till contribution room is maxed',
    });
  },
};
