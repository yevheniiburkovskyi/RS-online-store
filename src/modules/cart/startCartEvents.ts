import buildCartPage from '../../pages/cartPage';
import { IProduct } from '../../types/types';
import { route } from '../router/router';
import updateCartPage from './updateCartPage';

function startCartEvents(data: Array<IProduct>) {
  const cartBtn = document.querySelector('.cart-button');
  cartBtn?.addEventListener('click', () => {
    buildCartPage(data);
    setTimeout(updateCartPage, 1);
  });
  cartBtn?.addEventListener('click', route);
}

export default startCartEvents;
