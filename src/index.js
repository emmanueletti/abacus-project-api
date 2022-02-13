const server = require('./server');
const PORT = process.env.PORT || 8080;

// Start server
server.listen(PORT, () => {
  console.log(`Abacus Project API listening on port ${PORT}`);
});
