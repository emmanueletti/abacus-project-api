/**
 * Routing logic for investment fees calculation
 */

const express = require('express');
const router = express.Router();

const { calculateData } = require('../controllers/investmentFeesController');

module.exports = function () {
  router.post('/', calculateData);

  return router;
};
