import generateElement from '../services/generateElement';
import getData from '../services/getData';
function mainPage() {
  const products = generateElement('section', 'products');
  const productsList = generateElement('ul', 'products__list');
  // productsList.innerHTML += `<li class="products__item">
  //     <img src="" alt="img" class="products__item-img">
  //     <h3 class="products__item-title">Lorem, ipsum dolor sit amet</h3>
  //     <p class="products__item-price">10.00$</p>
  // </li>`;
  getData().then((data) => data.forEach(() => (productsList.innerHTML += '1')));
  products.append(productsList);
  return products;
}
export default mainPage;
