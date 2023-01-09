import validationDate from '../modules/modal/validationDate';

describe('check inputCardFormat', () => {
  const testCases = [
    {
      in: '1126',
      expected: '11/26',
    },
    {
      in: '0925',
      expected: '09/25',
    },
    {
      in: '0336',
      expected: '03/36',
    },
    {
      in: '1128',
      expected: '11/28',
    },
  ];
  testCases.forEach((test, i) => {
    it(`input: ${i + 1}`, () => {
      expect(validationDate(test.in)).toBe(test.expected);
    });
  });
});
