const path = require('path');

// Web server config
const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Import API routes
const investmentFeesRoute = require('./routes/investmentFeesRoute');
const educationROIRoute = require('./routes/educationROIRoute');
const investmentVehicleRoute = require('./routes/investmentVehicleRoute');
const rentOrBuyRoute = require('./routes/rentOrBuyRoute');

// Mount API routes
app.use('/api/investment-fees', investmentFeesRoute());
app.use('/api/education-roi', educationROIRoute());
app.use('/api/investment-vehicle', investmentVehicleRoute());
app.use('/api/rent-or-buy', rentOrBuyRoute());

module.exports = app;
