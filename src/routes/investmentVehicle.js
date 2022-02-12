/**
 * Routing logic for TFSA vs. RRSP decision maker
 */

const express = require('express');
const router = express.Router();

const { FEDERAL_TAX_BRACKET_TIER_1 } = require('../lib/constants');
const formatNumToDollarString = require('../lib/formatNumToDollarString');

const investmentVehicleValidator = ({
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
  if (isTFSAContributionMaxed && typeof isTFSAContributionMaxed !== 'boolean') {
    result.isValid = false;
    result.errorMessages.push(`isTFSAContributionMaxed must be a boolean`);
  }

  if (isRRSPContributionMaxed && typeof isRRSPContributionMaxed !== 'boolean') {
    result.isValid = false;
    result.errorMessages.push(`isRRSPContributionMaxed must be a boolean`);
  }

  return result;
};

module.exports = function () {
  router.post('/', (req, res) => {
    // Validate
    const { isValid, errorMessages } = investmentVehicleValidator(req.body);
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
  });

  return router;
};
