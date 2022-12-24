import generateElement from '../modules/services/generateElement';

function detailsPage() {
  const productPage = generateElement('section', 'product');
  const productContainer = generateElement('div', 'product__container');
  productPage.append(productContainer);
  return productPage;
}

export default detailsPage;
