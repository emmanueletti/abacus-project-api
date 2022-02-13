/**
 * Routing logic for Renting vs. Buying decision maker
 */

const express = require('express');
const router = express.Router();

const rentOrBuyController = require('../controllers/rentOrBuyController');

module.exports = function () {
  router.post('/', rentOrBuyController);

  return router;
};
