import { calculateDiscount } from '../modules/cart/summaryBar';

describe('check calculateDiscount', () => {
  const testCases = [
    {
      in: {
        totalPrice: 59,
        discountValue: 2,
      },
      expected: 47.2,
    },
    {
      in: {
        totalPrice: 100,
        discountValue: 1,
      },
      expected: 90,
    },
    {
      in: {
        totalPrice: 200,
        discountValue: 2,
      },
      expected: 160,
    },
  ];
  testCases.forEach((test) => {
    it(`value: ${test.in.totalPrice}`, () => {
      expect(calculateDiscount(test.in.totalPrice, test.in.discountValue)).toBe(test.expected);
    });
  });
});
