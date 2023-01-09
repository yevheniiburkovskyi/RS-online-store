import { sortPricesArray } from '../modules/services/getPricesArray';

describe('check sortPricesArray', () => {
  const testCases = [
    {
      in: [1, 2, 3, 3, 2, 5],
      expected: [1, 2, 3, 5],
    },
    {
      in: [3, 2, 7, 3, 2, 10],
      expected: [2, 3, 7, 10],
    },
    {
      in: [23, 145, 3, 18, 2, 5, 5],
      expected: [2, 3, 5, 18, 23, 145],
    },
  ];
  testCases.forEach((test) => {
    it(`brand: ${test.in}`, () => {
      expect(sortPricesArray(test.in)).toEqual(test.expected);
    });
  });
});
