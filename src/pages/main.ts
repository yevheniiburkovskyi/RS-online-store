import { IProduct } from '../types/types';
import generateElement from '../modules/services/generateElement';
import getData from '../modules/services/getData';
import showDetails from '../modules/showDetails';

function mainPage() {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');
  if (localStorage.getItem('productsArr') === null) {
    getData()
      .then((data) => createProductList(productsList, data))
      .then(() => showDetails(productsList));
  } else {
    const productArr: Array<IProduct> = JSON.parse(localStorage.getItem('productsArr') as string);
    createProductList(productsList, productArr);
    showDetails(productsList);
  }
  products.append(productsList);
  return products;
}

const createProductList = (contentBlock: HTMLElement, dataArr: Array<IProduct>) => {
  dataArr.forEach((product: IProduct) => {
    contentBlock.innerHTML += `
        <a href="/${product.category}/${product.id}" class="products__item">
          <img src="${product.images[0]}" alt="${product.title}" class="products__item-img">
          <h3 class="products__item-title">${product.title}</h3>
          <p class="products__item-price">${product.price}$</p>
        </a>`;
  });
};
export default mainPage;