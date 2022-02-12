/**
 * Routing logic for investment fees calculation
 */

const express = require('express');
const router = express.Router();

const {
  investmentFeesController,
} = require('../controllers/investmentFeesController');

module.exports = function () {
  router.post('/', investmentFeesController);

  return router;
};
