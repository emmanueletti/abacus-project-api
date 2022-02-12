/**
 * Routing logic for Renting vs. Buying decision maker
 */

const express = require('express');
const router = express.Router();

const { calculateData } = require('../controllers/rentOrBuyController');

module.exports = function () {
  router.post('/', calculateData);

  return router;
};
