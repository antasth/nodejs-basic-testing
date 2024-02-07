import { Action, simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Add };
    const result = simpleCalculator(input);

    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Subtract };
    const result = simpleCalculator(input);

    expect(result).toBe(8);
  });

  test('should multiply two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);

    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 2, action: Action.Divide };
    const result = simpleCalculator(input);

    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);

    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const input = { a: 2, b: 3, action: 'Get' };
    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const input = { a: '2', b: 'arg2', action: Action.Multiply };
    const result = simpleCalculator(input);

    expect(result).toBe(null);
  });
});
