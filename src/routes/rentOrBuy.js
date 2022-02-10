/**
 * Routing logic for Renting vs. Buying decision maker
 */

const express = require('express');
const router = express.Router();

const constants = require('../lib/constants');
const {
  getMortgageInterestPaid,
  getValueAfterCompoundInterest,
} = require('../lib/helpers');

// dafault overrides
// stretch: use province specific default values vs canada wide
// provide link to get tax rate: https://www.wealthsimple.com/en-ca/learn/canadian-property-taxes

//

// take value of home considering
// multiply by costs then divide by 12
// get total of  monthly unrecoverable costs

module.exports = function () {
  router.post('/', (req, res) => {
    const { simple } = req.query;
    const { homePrice, isTFSAorRRSPMaxed } = req.body;

    if (simple) {
      const unrecoverableCostsMultiplier = isTFSAorRRSPMaxed ? 0.04 : 0.05;
      return res.json({
        rentEquivalent: Math.round(
          (homePrice * unrecoverableCostsMultiplier) / 12
        ),
        reference: 'https://www.youtube.com/watch?v=Uwl3-jBNEd4',
      });
    }
    const {
      investmentReturnRate,
      inflationRate,
      marginalIncomeTaxRate,
      monthlyUtilities,
    } = req.body;

    const {
      plannedLengthOfStayInYears,
      mortgageRate,
      downPaymentPercentage,
      lengthOfMortage,
      estimatedHomePriceGrowthRate,
      annualPropertyTaxRate,
      ClosingCostsWhenBuyingHomePercentage,
      ClosingCostsWhenSellingHomePercentage,
      AnnualMaintenanceAndRenovationCosts,
      homeOwnersInsurance,
    } = req.body?.buy;

    const { estimatedRentGrowthRate, securityDeposit, annualRentersInsurance } =
      req.body?.rent;

    // Initial costs
    const initialCostsOfHomeOwnership = homePrice;

    // Calculate recurring costs of home ownership
    const maintenanceCosts = AnnualMaintenanceAndRenovationCosts
      ? AnnualMaintenanceAndRenovationCosts * plannedLengthOfStayInYears
      : homePrice *
        constants.ESTIMATED_ANNUAL_MAINTENANCE_COSTS_PERCENT *
        plannedLengthOfStayInYears;

    const propertyTaxes =
      homePrice *
      (annualPropertyTaxRate / 100 ??
        constants.ESTIMATED_ANNUAL_PROPERTY_TAX_RATE) *
      plannedLengthOfStayInYears;

    const interestCostOfMortgage = mortgageRate
      ? getValueAfterCompoundInterest(
          homePrice,
          mortgageRate / 100,
          lengthOfMortage
        ) - homePrice
      : homePrice * constants.TOTAL_MORTGAGE_INTEREST_COST;

    const insurance = homeOwnersInsurance ?? 0.46;

    const recurringCostsOfHomeOwnership =
      maintenanceCosts + propertyTaxes + interestCostOfMortgage + insurance;

    const homeEquity =
      getValueAfterCompoundInterest(
        homePrice,
        constants.ESTIMATED_HOME_PRICE_GROWTH_RATE ??
          estimatedHomePriceGrowthRate,
        plannedLengthOfStayInYears
      ) - homePrice;

    const total =
      (initialCostsOfHomeOwnership +
        recurringCostsOfHomeOwnership -
        homeEquity) /
      plannedLengthOfStayInYears;

    res.json({
      rentEquivalent: total / 12,
    });
  });

  return router;
};
