import { simpleCalculator, Action } from './index';

const testCases = [
  { input: { a: 1, b: 2, action: Action.Add }, expected: 3 },
  { input: { a: 2, b: 2, action: Action.Add }, expected: 4 },
  { input: { a: 3, b: 2, action: Action.Add }, expected: 5 },
  { input: { a: 3, b: 2, action: Action.Subtract }, expected: 1 },
  { input: { a: 4, b: 1, action: Action.Subtract }, expected: 3 },
  { input: { a: 4, b: 2, action: Action.Multiply }, expected: 8 },
  { input: { a: 3, b: 2, action: Action.Multiply }, expected: 6 },
  { input: { a: 4, b: 2, action: Action.Divide }, expected: 2 },
  { input: { a: 9, b: 3, action: Action.Divide }, expected: 3 },
  { input: { a: 2, b: 2, action: Action.Exponentiate }, expected: 4 },
  { input: { a: 2, b: 3, action: Action.Exponentiate }, expected: 8 },
  { input: { a: 2, b: 3, action: 'invalidAction' }, expected: null },
  { input: { a: '2', b: 'ddd', action: Action.Multiply }, expected: null },
];

describe('simpleCalculator', () => {
  testCases.forEach(({ input, expected }) => {
    test(`simpleCalculator should calculate selected action: ${input.action} for a = ${input.a} and b = ${input.b}`, () => {
      expect(simpleCalculator(input)).toBe(expected);
    });
  });
});
