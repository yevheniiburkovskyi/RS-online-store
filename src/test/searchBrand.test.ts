import { searchBrand } from '../modules/filters/filterCards';

const product1 = document.createElement('LI');
const product2 = document.createElement('LI');
const product3 = document.createElement('LI');
const product4 = document.createElement('LI');
const product5 = document.createElement('LI');
product1.dataset.brand = 'adidas';
product2.dataset.brand = 'nike';
product3.dataset.brand = 'apple';
product4.dataset.brand = 'microsoft';
product5.dataset.brand = 'google';

describe('check searchBrands', () => {
  const testCases = [
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['adidas'],
      },
      expected: [product1],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['nike'],
      },
      expected: [product2],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['apple'],
      },
      expected: [product3],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['microsoft', 'google'],
      },
      expected: [product4, product5],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['google', 'nike'],
      },
      expected: [product2, product5],
    },
  ];
  testCases.forEach((test) => {
    it(`brand: ${test.in.param}`, () => {
      expect(searchBrand(test.in.arr, test.in.param)).toStrictEqual(test.expected);
    });
  });
});
