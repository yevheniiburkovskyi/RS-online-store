import { ICartItem } from '../types/types';
import updateHeader from './cart/updateHeader';
import { route } from './router/router';

function startProductCardEvents() {
  const catalogBtn = document.querySelector('#catalog-link') as HTMLDivElement;
  catalogBtn?.addEventListener('click', route);

  const detailsBtns = document.querySelectorAll('.products__item-row-detailsBtn') as NodeListOf<HTMLLinkElement>;
  detailsBtns.forEach((btn) => {
    btn.addEventListener('click', route);
  });
  const detailsTitle = document.querySelectorAll('.products__item-title') as NodeListOf<HTMLLinkElement>;
  detailsTitle.forEach((btn) => {
    btn.addEventListener('click', route);
  });

  const cartBtns = document.querySelectorAll('.products__item-row-cartBtn') as NodeListOf<HTMLLinkElement>;
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
      const target = e.target as HTMLDivElement;
      const productCard = target.closest('.products__item') as HTMLDivElement;
      const productCardObj: ICartItem = {
        id: Number(productCard?.id),
        price: Number(productCard?.dataset.price),
        stock: Number(productCard?.dataset.stock),
      };

      btn.textContent = '-';
      if (cartProductsArr) {
        const currentItem = cartProductsArr.find((item) => item.id === Number(productCard.id)) as ICartItem;
        if (!cartProductsArr.find((item) => item.id === Number(productCard.id))) {
          cartProductsArr.push(productCardObj);
        } else {
          btn.textContent = '+';
          cartProductsArr.splice(cartProductsArr.indexOf(currentItem) as number, 1);
        }
        localStorage.setItem('OnlineStoreCart', JSON.stringify(cartProductsArr));
      } else {
        const cartProductsArr = [productCardObj];
        localStorage.setItem('OnlineStoreCart', JSON.stringify(cartProductsArr));
      }
      updateHeader();
    });
  });

  const productItems = document.querySelectorAll('.products__item-background') as NodeListOf<HTMLDivElement>;
  productItems.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLDivElement;
      (target.querySelector('.products__item-row') as HTMLDivElement).style.bottom = '50%';
    });
    item.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLDivElement;
      (target.querySelector('.products__item-row') as HTMLDivElement).style.bottom = '-50%';
    });
  });
}

export default startProductCardEvents;
