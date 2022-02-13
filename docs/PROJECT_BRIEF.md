# Abacus Project

An API of simple personal finance calculators.

## User Stories

- as a front end developer, I want a simple API to calculator basic personal finance situations

## Tech Stack & Dependencies

- Node
- Express
- Tachyons
- Jest
- Supertest

## Considerations

### Can the API handle whatever is thrown at it?

- each route is protected by a validation step to check the data that has been sent
- detailed error messages to tell user what is wrong with the request
- each endpoints calculations happen in a try catch block to gracefully unforeseen handle error
- Improvement: bring in Typescripts for added type safety

### Is the API vulnerable to any attacks or exposes any user information?

- no user data is stored
- no identifying information is requested

### Can the API be easily maintained?

- documentation of the API
- automated tests with 95% test coverage
- Jest test runner configured to fail if test coverage falls below 90%
- basic CI workflow to run tests on PR's and Pushes to main branch

### Can the API handle a large amount of simultaneous requests?

- I don't anticipate the API to go viral any time soon
- load balancing and request rate limiting strategies would be interesting topics to explore
