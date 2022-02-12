/**
 * Routing logic for education return on invesment calculation.
 */

const express = require('express');
const router = express.Router();

const { calculateData } = require('../controllers/educationROIController');

module.exports = function () {
  router.post('/', calculateData);

  return router;
};
