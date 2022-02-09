// Web server config
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const investmentFeesRoutes = require('./routes/investmentFees');
const payOverTuitionRoutes = require('./routes/payOverTuiton');

// Mount routes
app.use('/api/investment-fees', investmentFeesRoutes());
app.use('/api/pay-over-tuition', payOverTuitionRoutes());

// Start server
app.listen(PORT, () => {
  console.log(`Abacus Project API listening on port ${PORT}`);
});
