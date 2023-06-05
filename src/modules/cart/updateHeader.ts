import { ICartItem } from '../../types/types';
import { updateTotalPrice } from './summaryBar';

function updateHeader() {
  const productsCountContainer = document.querySelector('.cart-icon__count') as HTMLDivElement;
  const productsPriceContainer = document.querySelector('.cart-block__total-price') as HTMLDivElement;
  const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  if (cartProductsArr) {
    productsCountContainer.textContent = `${cartProductsArr.reduce(
      (sum, item) => (sum += item.totalPrice / item.price),
      0
    )}`;
    productsPriceContainer.textContent = `Cart total: $${cartProductsArr.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )}`;
  }
  updateTotalPrice();
}
export default updateHeader;
