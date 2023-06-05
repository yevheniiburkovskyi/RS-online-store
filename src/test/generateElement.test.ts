import generateElement from '../modules/services/generateElement';

const product1 = document.createElement('div');
product1.classList.add('cart');
const product2 = document.createElement('span');
product2.classList.add('home');
const product3 = document.createElement('li');
product3.classList.add('catalog');
const product4 = document.createElement('p');
product4.classList.add('grid');

describe('check generateElements', () => {
  const testCases = [
    {
      in: {
        tag: 'div',
        class: 'cart',
      },
      expected: product1.classList.contains('cart'),
    },
    {
      in: {
        tag: 'span',
        class: 'home',
      },
      expected: product2.classList.contains('home'),
    },
    {
      in: {
        tag: 'li',
        class: 'catalog',
      },
      expected: product3.classList.contains('catalog'),
    },
    {
      in: {
        tag: 'p',
        class: 'grid',
      },
      expected: product4.classList.contains('grid'),
    },
  ];
  testCases.forEach((test) => {
    it(`brand: ${test.in.class}`, () => {
      expect(generateElement(test.in.tag, test.in.class).classList.contains(test.in.class)).toBe(test.expected);
    });
  });
});
