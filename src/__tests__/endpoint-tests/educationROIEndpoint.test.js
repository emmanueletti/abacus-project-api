const request = require('supertest');
const server = require('../../server');

const correctData = {
  programLengthYears: 4,
  annualTuition: 5000,
  currentSalary: 40000,
  medianExpectedSalary: 60000,
  isPartTime: false,
};

describe('Education ROI Endpoint', () => {
  test('should return correct data when correct data given 1', async () => {
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(correctData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return correct data when correct data given 2', async () => {
    const data = {
      ...correctData,
      isPartTime: true,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(200);
    expect(res.body.error).toBeFalsy();
  });

  test('should return error when no data given', async () => {
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json');
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when program length is not number', async () => {
    const data = {
      ...correctData,
      programLengthYears: 'abc',
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when program length is not positive', async () => {
    const data = {
      ...correctData,
      programLengthYears: -4,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
  test('should return error when annual tuition is not number', async () => {
    const data = {
      ...correctData,
      annualTuition: 'abc',
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when annual tuition is not positive', async () => {
    const data = {
      ...correctData,
      annualTuition: -5000,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when current salary is not number', async () => {
    const data = {
      ...correctData,
      currentSalary: 'abc',
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when current salary is not positive', async () => {
    const data = {
      ...correctData,
      currentSalary: -40000,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when median expected salary is not number', async () => {
    const data = {
      ...correctData,
      medianExpectedSalary: 'abc',
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when median expected salary is not positive', async () => {
    const data = {
      ...correctData,
      medianExpectedSalary: -60000,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when median expected salary is less than current salary', async () => {
    const data = {
      ...correctData,
      currentSalary: 60000,
      medianExpectedSalary: 20000,
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });

  test('should return error when isPartTime is not a boolean type', async () => {
    const data = {
      ...correctData,
      isPartTime: 'abc',
    };
    const res = await request(server)
      .post('/api/education-roi')
      .set('Content-type', 'application/json')
      .send(data);
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBeTruthy();
  });
});
