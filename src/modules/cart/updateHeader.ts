import { ICartItem } from '../../types/types';

function updateHeader() {
  const productsCountContainer = document.querySelector('.cart-icon__count') as HTMLDivElement;
  const productsPriceContainer = document.querySelector('.cart-block__total-price') as HTMLDivElement;
  const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  productsCountContainer.textContent = `${cartProductsArr.length}`;
  productsPriceContainer.textContent = `Cart total: $ ${cartProductsArr.reduce((sum, item) => sum + item.price, 0)}`;
}
export default updateHeader;
