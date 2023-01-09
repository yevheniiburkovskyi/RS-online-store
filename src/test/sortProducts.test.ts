import { sortProducts } from '../modules/filters/filterCards';
const product1 = document.createElement('LI');
const product2 = document.createElement('LI');
const product3 = document.createElement('LI');
const product4 = document.createElement('LI');
const product5 = document.createElement('LI');
product1.dataset.price = '1';
product2.dataset.price = '2';
product3.dataset.price = '3';
product4.dataset.price = '4';
product5.dataset.price = '5';
product1.dataset.rating = '10';
product2.dataset.rating = '15';
product3.dataset.rating = '7';
product4.dataset.rating = '12';
product5.dataset.rating = '25';

describe('check sortProducts', () => {
  const testCases = [
    {
      in: {
        arr: [product2, product5, product3, product4, product1],
        param: 'price-ASC',
      },
      expected: [product1, product2, product3, product4, product5],
    },
    {
      in: {
        arr: [product2, product5, product3, product4, product1],
        param: 'price-DESC',
      },
      expected: [product5, product4, product3, product2, product1],
    },
    {
      in: {
        arr: [product2, product5, product3, product4, product1],
        param: 'rating-ASC',
      },
      expected: [product3, product1, product4, product2, product5],
    },
    {
      in: {
        arr: [product2, product5, product3, product4, product1],
        param: 'rating-DESC',
      },
      expected: [product5, product2, product4, product1, product3],
    },
  ];
  testCases.forEach((test) => {
    it(`sort: ${test.in.param}`, () => {
      expect(sortProducts(test.in.arr, test.in.param)).toStrictEqual(test.expected);
    });
  });
});
