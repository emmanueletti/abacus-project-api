/**
 * Routing logic for TFSA vs. RRSP decision maker
 */

const express = require('express');
const router = express.Router();

const { FEDERAL_TAX_BRACKET_TIER_1 } = require('../lib/constants');
const formatNumToDollarString = require('../lib/formatNumToDollarString');

module.exports = function () {
  router.post('/', (req, res) => {
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
