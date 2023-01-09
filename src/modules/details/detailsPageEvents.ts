import buildCartPage from '../../pages/cartPage';
import { IProduct } from '../../types/types';
import updateCartPage from '../cart/updateCartPage';
import { route } from '../router/router';
import addCartProduct from '../services/addCartProduct';

function detailsPageEvents(data: IProduct[]) {
  const main = document.querySelector('#main-page');
  main?.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentNode as HTMLLIElement;
    if (e.target && parent !== null && parent.classList.contains('product__images-choose-item')) {
      const bigImg = document.querySelector('.product__big-img') as HTMLDivElement;
      bigImg.innerHTML = target.outerHTML;
    }
    if (
      target &&
      (target.classList.contains('product__buy-now-btn') || target.classList.contains('product__add-to-cart-btn'))
    ) {
      const productAbout = target.closest('.product__about') as HTMLDivElement;
      const productId = productAbout.id;
      const productPrice = (
        (productAbout.querySelector('.product__price') as HTMLParagraphElement).textContent as string
      )
        .match(/\d/gi)
        ?.join('') as string;
      const productStock = (
        (productAbout.querySelector('.product__stock') as HTMLParagraphElement).textContent as string
      )
        .match(/\d/gi)
        ?.join('') as string;
      target.textContent = 'already in cart';
      addCartProduct(productId, productPrice, productStock);
      if (target.classList.contains('product__buy-now-btn')) {
        buildCartPage(data);
        document.querySelector('.modal-container')?.classList.remove('modal-container_hide');
        route(e);
        updateCartPage();
      }
    }
  });
}

export default detailsPageEvents;
