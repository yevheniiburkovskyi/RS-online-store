import { IProduct } from '../../types/types';
import generateElement from '../../modules/services/generateElement';
import showDetails from '../../modules/router/createDeatilsRoutes';
import { createFiltersBlock } from './filtersBar';
import createTopBar from './topBar';

function buildMainPage(data: Array<IProduct>) {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');
  const emptyList = generateElement('div', 'empty__list');
  emptyList.textContent = 'No products found';

  data.forEach((product: IProduct) => {
    const starsArr = Array(Math.round(product.rating)).fill('★');
    starsArr.length < 5 ? starsArr.push('☆') : starsArr;
    productsList.innerHTML += `
          <li class="products__item" id="${product.id}" data-title = "${product.title}"
          data-description = "${product.description}" data-price ="${product.price}" data-rating ="${product.rating}"
          data-stock ="${product.stock}" data-brand ="${product.brand}" data-category ="${product.category}">
            <div class="products__item-container">
            <div class="products__item-background">
              <div class="products__item-row">
                <div class="products__item-row-cartBtn">+</div>
                <a href="/${product.category}/${product.id}" class="products__item-row-detailsBtn">···</a>
              </div>
            </div>
              <img src="${product.thumbnail}" alt="${product.title}" class="products__item-img" loading="lazy">
            </div>
            <a href="/${product.category}/${product.id}" class="products__item-title">${product.title}</a>
            <p class="products__item-rating">${starsArr.join('')}</p>
            <p class="products__item-price">${product.price}$</p>
          </li>`;
  });
  products.append(emptyList, productsList, createFiltersBlock(), createTopBar(data));
  showDetails(products, productsList, data);
}
export default buildMainPage;
