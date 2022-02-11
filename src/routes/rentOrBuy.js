/**
 * Routing logic for Renting vs. Buying decision maker
 */

const express = require('express');
const router = express.Router();

const formatNumToDollarString = require('../lib/formatNumToDollarString');

module.exports = function () {
  router.post('/', (req, res) => {
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
  });

  return router;
};
