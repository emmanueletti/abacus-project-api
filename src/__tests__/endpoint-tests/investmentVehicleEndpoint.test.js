const request = require('supertest');
const server = require('../../server');

const correctData = {
  annualIncome: 42000,
  isTFSAContributionMaxed: false,
  isRRSPContributionMaxed: false,
};

describe('Education ROI Endpoint', () => {
  test('should return correct data when correct data given 1', async () => {
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(correctData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 2', async () => {
    const data = {
      ...correctData,
      isTFSAContributionMaxed: true,
    };

    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 3', async () => {
    const data = {
      ...correctData,
      isRRSPContributionMaxed: true,
    };

    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 4', async () => {
    const data = {
      ...correctData,
      isRRSPContributionMaxed: true,
      isTFSAContributionMaxed: true,
    };

    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 5', async () => {
    const data = {
      annualIncome: 60000,
      isRRSPContributionMaxed: true,
      isTFSAContributionMaxed: true,
    };

    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 6', async () => {
    const data = {
      annualIncome: 60000,
      isRRSPContributionMaxed: false,
      isTFSAContributionMaxed: false,
    };

    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return error when no data given', async () => {
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when annual income is not positive', async () => {
    const data = {
      ...correctData,
      annualIncome: -40000,
    };
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
  test('should return error when annual income is not number', async () => {
    const data = {
      ...correctData,
      annualIncome: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when isTFSAContributionMaxed is not a boolean type', async () => {
    const data = {
      ...correctData,
      isTFSAContributionMaxed: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when isRRSPContributionMaxed is not a boolean type', async () => {
    const data = {
      ...correctData,
      isRRSPContributionMaxed: 'abc',
    };
    const res = await request(server)
      .post('/api/investment-vehicle')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
});
