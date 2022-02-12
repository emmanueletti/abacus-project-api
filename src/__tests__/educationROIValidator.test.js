const educationROIValidator = require('../helpers/educationROIValidator');

describe('educationROIValidator', () => {
  const data = {
    programLengthYears: 4,
    annualTuition: 5000,
    currentSalary: 40000,
    medianExpectedSalary: 60000,
    isPartTime: false,
  };

  test('returns true if correct inputs given', () => {
    const result = educationROIValidator(data);
    console.log(result.errorMessages);
    expect(result.isValid).toBeTruthy();
  });

  test('returns false if empty data given', () => {
    const result = educationROIValidator({});
    expect(result.isValid).toBeFalsy();
  });

  test('returns false if program length is not a positive number type', () => {
    data.programLengthYears = -2;
    let result = educationROIValidator(data);

    data.programLengthYears = 'abc';
    result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });

  test('returns false if annual tuition is not a positive number type', () => {
    data.annualTuition = -2;
    let result = educationROIValidator(data);

    data.annualTuition = 'abc';
    result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });

  test('returns false if current salary is not a positive number type', () => {
    data.currentSalary = -2;
    let result = educationROIValidator(data);

    data.currentSalary = 'abc';
    result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });

  test('returns false if median expected salary is not a positive number type', () => {
    data.medianExpectedSalary = -2;
    let result = educationROIValidator(data);

    data.medianExpectedSalary = 'abc';
    result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });

  test('returns false if median expected salary is less than current salary', () => {
    data.currentSalary = 400;
    data.medianExpectedSalary = 200;
    let result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });

  test('returns false if is part time is not a boolean type', () => {
    data.isPartTime = 'abc';
    let result = educationROIValidator(data);

    expect(result.isValid).toBeFalsy();
  });
});
