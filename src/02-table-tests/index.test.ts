// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 3, b: 12, action: Action.Subtract, expected: -9 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },

  { a: 2, b: 4, action: Action.Multiply, expected: 8 },
  { a: 2, b: -2, action: Action.Multiply, expected: -4 },
  { a: 0, b: 11, action: Action.Multiply, expected: 0 },

  { a: 5, b: 5, action: Action.Divide, expected: 1 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },

  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: -2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },

  { a: 1, b: 2, action: 'NoneExistent', expected: null },
  { a: 'lol', b: 2, action: Action.Add, expected: null },
];

describe.each(testCases)(
  'Test for SimpleCalculator',
  ({ a, b, action, expected }) => {
    test('Actions working as expected and returning expected values', () => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    });
  },
);
