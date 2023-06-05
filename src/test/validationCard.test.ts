import validationCard from '../modules/modal/validationCard';

describe('check inputCardFormat', () => {
  const testCases = [
    {
      in: '4444',
      expected: '4444',
    },
    {
      in: '444455',
      expected: '4444 55',
    },
    {
      in: '44444444',
      expected: '4444 4444',
    },
    {
      in: '4444444455556666',
      expected: '4444 4444 5555 6666',
    },
  ];
  testCases.forEach((test, i) => {
    it(`input: ${i + 1}`, () => {
      expect(validationCard(test.in)).toBe(test.expected);
    });
  });
});
