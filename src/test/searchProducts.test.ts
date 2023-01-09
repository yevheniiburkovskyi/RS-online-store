import { searchProducts } from '../modules/filters/filterCards';

const product1 = document.createElement('LI');
const product2 = document.createElement('LI');
const product3 = document.createElement('LI');
const product4 = document.createElement('LI');
const product5 = document.createElement('LI');
product1.dataset.title = 'Car';
product2.dataset.title = 'Book';
product3.dataset.description = 'smartphone';
product4.dataset.title = 'smartphone';
product5.dataset.title = 'bag';

describe('check searchProducts', () => {
  const testCases = [
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: new RegExp('smartphone', 'ig'),
      },
      expected: [product3, product4],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: new RegExp('Car', 'ig'),
      },
      expected: [product1],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: new RegExp('Book', 'ig'),
      },
      expected: [product2],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: new RegExp('bag', 'ig'),
      },
      expected: [product5],
    },
  ];
  testCases.forEach((test) => {
    it(`word: ${test.in.param}`, () => {
      expect(searchProducts(test.in.arr, test.in.param)).toStrictEqual(test.expected);
    });
  });
});
