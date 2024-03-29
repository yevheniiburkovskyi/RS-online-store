import buildCartPage from '../../pages/cartPage';
import { IProduct } from '../../types/types';
import { route } from '../router/router';
import updateCartPage from './updateCartPage';

function startCartEvents(data: Array<IProduct>) {
  const cartBtn = document.querySelector('.cart-button');
  cartBtn?.addEventListener('click', (e) => {
    buildCartPage(data);
    route(e);
    if (document.querySelector('.products-in-cart')) {
      updateCartPage();
    }
  });
}

export default startCartEvents;
