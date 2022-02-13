const request = require('supertest');
const server = require('../../server');

const correctData = {
  principalInvestment: 1000,
  annualInterestRate: 6,
  monthlyContributions: 500,
  managementExpenseRatio: 2.2,
  startingAge: 30,
  retirementAge: 65,
};

describe('Investment Fees endpoint', () => {
  test('should return correct data when correct data given', async () => {
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(correctData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      finalInvestmentAmountWithOutFees: '$720,479',
      finalInvestmentAmountWithFees: '$441,632',
      amountLostToFees: '$278,847',
      percentageLostToFees: '38.70%',
    });
  });

  test('should return error when no data given', async () => {
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when principle investment is not number', async () => {
    const data = {
      ...correctData,
      principalInvestment: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when principle investment is not positive', async () => {
    const data = {
      ...correctData,
      principalInvestment: -1000,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when annual interest rate is not number', async () => {
    const data = {
      ...correctData,
      annualInterestRate: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when annual interest rate is not positive', async () => {
    const data = {
      ...correctData,
      annualInterestRate: -2.2,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when annual interest rate is greater than 10', async () => {
    const data = {
      ...correctData,
      annualInterestRate: 11,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when monthly contributions is not number', async () => {
    const data = {
      ...correctData,
      monthlyContributions: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when monthly contributions is not positive', async () => {
    const data = {
      ...correctData,
      monthlyContributions: -1000,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when starting age is not number', async () => {
    const data = {
      ...correctData,
      startingAge: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when starting age is not positive', async () => {
    const data = {
      ...correctData,
      startingAge: -20,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when retirement age is not number', async () => {
    const data = {
      ...correctData,
      retirementAge: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when retirement age is not positive', async () => {
    const data = {
      ...correctData,
      retirementAge: -50,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when retirement age is greater than starting age', async () => {
    const data = {
      ...correctData,
      startingAge: 50,
      retirementAge: 20,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when management expense ratio is greater than 20', async () => {
    const data = {
      ...correctData,
      managementExpenseRatio: 21,
    };
    const res = await request(server)
      .post('/api/investment-fees')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
});
