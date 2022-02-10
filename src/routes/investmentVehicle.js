/**
 * Routing logic for TFSA vs. RRSP decision maker
 */

const express = require('express');
const router = express.Router();

const { FEDERAL_TAX_BRACKET_TIER_1 } = require('../lib/constants');

module.exports = function () {
  router.post('/', (req, res) => {
    const { annualIncome, isTFSAContributionMaxed, isRRSPContributionMaxed } =
      req.body;

    if (isTFSAContributionMaxed && !isRRSPContributionMaxed) {
      return res.json({
        vehicle: 'RRSP',
        amount: 'till contribution room is maxed',
        then: 'Non-Registered / Non-Tax-Advantaged Investment Account',
      });
    }

    if (!isTFSAContributionMaxed && isRRSPContributionMaxed) {
      return res.json({
        vehicle: 'TFSA',
        amount: 'Till contribution room is maxed',
        then: 'Non-Registered / Non-Tax Advantaged Investment Account',
      });
    }

    if (isTFSAContributionMaxed && isRRSPContributionMaxed) {
      return res.json({
        vehicle: 'Non-Registered / Non-Tax Advantaged Investment Account',
        amount: 'As much as possible',
      });
    }

    if (annualIncome > FEDERAL_TAX_BRACKET_TIER_1) {
      const amountForRRSP = annualIncome - FEDERAL_TAX_BRACKET_TIER_1;
      return res.json({
        vehicle: 'RRSP',
        amount: `Contribute at most ${amountForRRSP} without going past max RRSP contribution room`,
        then: 'TFSA',
      });
    }

    res.json({
      vehicle: 'TFSA',
      amount: 'Till contribution room is maxed',
      then: 'RRSP',
    });
  });

  return router;
};
