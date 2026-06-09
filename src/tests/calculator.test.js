const { compute, modulo, power, squareRoot } = require('../calculator');

describe('Calculator compute()', () => {
  test('addition using + and add', () => {
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('add', 7, 8)).toBe(15);
  });

  test('subtraction using - and sub', () => {
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('sub', 20, 5)).toBe(15);
  });

  test('multiplication using * and mul and x', () => {
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('mul', 3, 7)).toBe(21);
    expect(compute('x', 6, 6)).toBe(36);
  });

  test('division using / and div', () => {
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('div', 9, 3)).toBe(3);
  });

  test('division by zero throws', () => {
    expect(() => compute('/', 5, 0)).toThrow('Division by zero');
    expect(() => compute('div', 5, 0)).toThrow('Division by zero');
  });

  test('unsupported operation throws', () => {
    expect(() => compute('unknown', 2, 3)).toThrow(/Unsupported operation/);
  });

  test('works with floats and negative numbers', () => {
    expect(compute('+', 2.5, 0.5)).toBeCloseTo(3.0);
    expect(compute('-', -4, -6)).toBe(2);
    expect(compute('*', -3, 2)).toBe(-6);
    expect(compute('/', 7, 2)).toBeCloseTo(3.5);
  });

  // New tests for extended operations
  test('modulo using mod and %', () => {
    expect(compute('mod', 5, 2)).toBe(1);
    expect(compute('%', 5, 2)).toBe(1);
    // behavior with negative numbers follows JS % semantics
    expect(compute('mod', -5, 2)).toBe(-1);
  });

  test('power using pow and ^', () => {
    expect(compute('pow', 2, 3)).toBe(8);
    expect(compute('^', 3, 4)).toBe(81);
    // direct function
    expect(power(5, 0)).toBe(1);
  });

  test('square root using sqrt (unary)', () => {
    expect(compute('sqrt', 16, 0)).toBe(4);
    expect(compute('sqrt', 2, 0)).toBeCloseTo(Math.sqrt(2));
    // direct function
    expect(squareRoot(9)).toBe(3);
  });

  test('square root of negative throws', () => {
    expect(() => compute('sqrt', -4, 0)).toThrow('Cannot compute square root of negative number');
    expect(() => squareRoot(-1)).toThrow('Cannot compute square root of negative number');
  });
});
