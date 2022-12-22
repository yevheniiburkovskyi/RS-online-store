import { IProduct } from '../../types/types';
import generateElement from '../services/generateElement';
import getData from '../services/getData';
function mainPage() {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');
  getData().then((data) =>
    data.forEach((product: IProduct) => {
      productsList.innerHTML += `
      <li class="products__item">
        <img src="${product.images[0]}" alt="${product.title}" class="products__item-img">
        <h3 class="products__item-title">${product.title}</h3>
        <p class="products__item-price">${product.price}$</p>
      </li>`;
    })
  );
  products.append(productsList);
  return products;
}
export default mainPage;
