import { searchPriceAndStock } from '../modules/filters/filterCards';

const product1 = document.createElement('LI');
const product2 = document.createElement('LI');
const product3 = document.createElement('LI');
const product4 = document.createElement('LI');
const product5 = document.createElement('LI');
product1.dataset.price = '10';
product2.dataset.price = '10';
product3.dataset.price = '150';
product4.dataset.price = '125';
product5.dataset.price = '75';
product1.dataset.stock = '10';
product2.dataset.stock = '10';
product3.dataset.stock = '150';
product4.dataset.stock = '125';
product5.dataset.stock = '75';

describe('check searchPrice', () => {
  const testCases = [
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['5', '15'],
        attribute: 'price',
      },
      expected: [product1, product2],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['5', '150'],
        attribute: 'price',
      },
      expected: [product1, product2, product3, product4, product5],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['120', '200'],
        attribute: 'price',
      },
      expected: [product3, product4],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['0', '75'],
        attribute: 'stock',
      },
      expected: [product1, product2, product5],
    },
    {
      in: {
        arr: [product1, product2, product3, product4, product5],
        param: ['500', '1000'],
        attribute: 'stock',
      },
      expected: [],
    },
  ];
  testCases.forEach((test) => {
    it(`price: ${test.in.param}`, () => {
      expect(searchPriceAndStock(test.in.arr, test.in.param, test.in.attribute)).toStrictEqual(test.expected);
    });
  });
});
