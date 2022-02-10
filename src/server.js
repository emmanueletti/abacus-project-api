const path = require('path');

// Web server config
const express = require('express');
const morgan = require('morgan');
var cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Import routes
const investmentFeesRoutes = require('./routes/investmentFees');
const educationROIRoutes = require('./routes/educationROI');
const investmentVehicleRoutes = require('./routes/investmentVehicle');
const rentOrBuyRoutes = require('./routes/rentOrBuy');

// Mount API routes
app.use('/api/investment-fees', investmentFeesRoutes());
app.use('/api/education-roi', educationROIRoutes());
app.use('/api/investment-vehicle', investmentVehicleRoutes());
app.use('/api/rent-or-buy', rentOrBuyRoutes());

// View Routes
app.get('/investment-fees/new', (req, res) => {
  res.render('investment-fees_new.ejs');
});

app.get('/', (req, res) => {
  res.render('index');
});

// Start server
app.listen(PORT, () => {
  console.log(`Abacus Project API listening on port ${PORT}`);
});
