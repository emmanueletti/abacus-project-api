const request = require('supertest');
const server = require('../../server');

const correctData = {
  homePrice: 600000,
  isTFSAorRRSPMaxed: true,
};

describe('Rent or Buy Endpoint', () => {
  test('should return correct data when correct data given 1', async () => {
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json')
      .send(correctData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 2', async () => {
    const data = {
      ...correctData,
      isTFSAorRRSPMaxed: false,
    };
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return error when no data given', async () => {
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when home price is not positive', async () => {
    const data = {
      ...correctData,
      homePrice: -600000,
    };
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
  test('should return error when home price is not number', async () => {
    const data = {
      ...correctData,
      homePrice: 'abc',
    };
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when isTFSAorRRSPMaxed is not a boolean type', async () => {
    const data = {
      ...correctData,
      isTFSAorRRSPMaxed: 'abc',
    };
    const res = await request(server)
      .post('/api/rent-or-buy')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
});
