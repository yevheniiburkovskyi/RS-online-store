import { createStars } from '../pages/detailsPage';

describe('check createStars', () => {
  const testCases = [
    {
      in: 4,
      expected: ['★', '★', '★', '★', '☆'],
    },
    {
      in: 3,
      expected: ['★', '★', '★', '☆', '☆'],
    },
    {
      in: 2,
      expected: ['★', '★', '☆', '☆', '☆'],
    },
    {
      in: 5,
      expected: ['★', '★', '★', '★', '★'],
    },
  ];
  testCases.forEach((test) => {
    it(`brand: ${test.in}`, () => {
      expect(createStars(test.in)).toEqual(test.expected);
    });
  });
});
