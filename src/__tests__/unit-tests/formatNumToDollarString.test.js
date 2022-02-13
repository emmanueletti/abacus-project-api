const formatNumToDollarString = require('../../helpers/formatNumToDollarString');

describe('formatNumToDollarString', () => {
  test('returns null if input is not a number', () => {
    const result = formatNumToDollarString('abc');
    expect(result).toBeNull();
  });

  test('properly formats dollar value where comma is not needed', () => {
    const result = formatNumToDollarString(100);
    expect(result).toBe('$100');
  });

  test('properly formats dollar value in the thousands', () => {
    const result = formatNumToDollarString(1000);
    expect(result).toBe('$1,000');
  });

  test('properly formats dollar value in the 10 thousands', () => {
    const result = formatNumToDollarString(10000);
    expect(result).toBe('$10,000');
  });

  test('properly formats dollar value in 100 thousands', () => {
    const result = formatNumToDollarString(100000);
    expect(result).toBe('$100,000');
  });

  test('properly formats dollar value in the millions', () => {
    const result = formatNumToDollarString(1000000);
    expect(result).toBe('$1,000,000');
  });

  test('properly formats dollar value in the 10 millions', () => {
    const result = formatNumToDollarString(10000000);
    expect(result).toBe('$10,000,000');
  });
});
