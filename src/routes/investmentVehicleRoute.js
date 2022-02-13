/**
 * Routing logic for TFSA vs. RRSP decision maker
 */

const express = require('express');
const router = express.Router();

const investmentVehicleController = require('../controllers/investmentVehicleController');

module.exports = function () {
  router.post('/', investmentVehicleController);

  return router;
};
