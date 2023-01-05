import { ICartItem } from '../types/types';
import updateHeader from './cart/updateHeader';

function updateProductProps() {
  const productItems = [...(document.querySelectorAll('.products__item') as NodeListOf<HTMLDivElement>)];
  const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);

  function updateBtns() {
    productItems.forEach((product) => {
      cartProductsArr.forEach((cartProduct) => {
        if (cartProduct.id === Number(product.id)) {
          (product.querySelector('.products__item-row-cartBtn') as HTMLDivElement).textContent = '-';
        }
      });
    });
  }
  if (cartProductsArr) {
    updateBtns();
    updateHeader();
  }
}

export default updateProductProps;
