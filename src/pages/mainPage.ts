import { IProduct } from '../types/types';
import generateElement from '../modules/services/generateElement';
import showDetails from '../modules/createDeatilsRoutes';
import { createFiltersBlock } from './filtersPage';
import createTopBar from './topBar';

function mainPage(data: Array<IProduct>) {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');
  const emptyList = generateElement('div', 'empty__list');
  emptyList.textContent = 'No products found';
  data.forEach((product: IProduct) => {
    productsList.innerHTML += `
          <a href="/${product.category}/${product.id}" class="products__item" data-title = "${product.title}"
          data-description = "${product.description}" data-price ="${product.price}" data-rating ="${product.rating}"
          data-stock ="${product.stock}" data-brand ="${product.brand}" data-category ="${product.category}">
            <img src="${product.images[0]}" alt="${product.title}" class="products__item-img" loading="lazy">
            <h3 class="products__item-title">${product.title}</h3>
            <p class="products__item-price">${product.price}$</p>
          </a>`;
  });
  products.append(emptyList, productsList, createFiltersBlock(), createTopBar(data));
  showDetails(products, productsList, data);
}
export default mainPage;
