import { IProduct } from '../types/types';
import generateElement from '../modules/services/generateElement';
import showDetails from '../modules/showDetails';

function mainPage(data: Array<IProduct>) {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');

  data.forEach((product: IProduct) => {
    productsList.innerHTML += `
          <a href="/${product.category}/${product.id}" class="products__item" data-category = "${product.category}"
          data-brand = "${product.brand}" data-title ="${product.title}">
            <img src="${product.images[0]}" alt="${product.title}" class="products__item-img">
            <h3 class="products__item-title">${product.title}</h3>
            <p class="products__item-price">${product.price}$</p>
          </a>`;
  });
  showDetails(productsList, data);
  products.append(productsList);
}
export default mainPage;
