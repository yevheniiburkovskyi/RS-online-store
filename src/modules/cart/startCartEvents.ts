import buildCartPage from '../../pages/cartPage';
import { IProduct } from '../../types/types';
import { route } from '../router/router';
import changeCount from './changeCount';

function startCartEvents(data: Array<IProduct>) {
  const cartBtn = document.querySelector('.cart-button');
  cartBtn?.addEventListener('click', () => {
    buildCartPage(data);
    setTimeout(changeCount, 1);
  });
  cartBtn?.addEventListener('click', route);
}

export default startCartEvents;
