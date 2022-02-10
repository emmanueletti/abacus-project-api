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
const educationROIRoutes = require('./routes/educationROI');
const investmentVehicleRoutes = require('./routes/investmentVehicle');
const rentOrBuyRoutes = require('./routes/rentOrBuy');

// Mount routes
app.use('/api/investment-fees', investmentFeesRoutes());
app.use('/api/education-roi', educationROIRoutes());
app.use('/api/investment-vehicle', investmentVehicleRoutes());
app.use('/api/rent-or-buy', rentOrBuyRoutes());

// Start server
app.listen(PORT, () => {
  console.log(`Abacus Project API listening on port ${PORT}`);
});
