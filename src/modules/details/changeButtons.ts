import { ICartItem } from '../../types/types';

function changeButtons() {
  enum buttonsText {
    add = 'Add to cart',
    buy = 'Buy now',
    bought = 'Already in cart',
  }
  const productId = +(document.querySelector('.product__about') as HTMLDivElement).id;
  const addBtn = document.querySelector('.product__add-to-cart-btn') as HTMLButtonElement;
  const buyBtn = document.querySelector('.product__buy-now-btn') as HTMLButtonElement;
  const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  if (cartProductsArr) {
    if (cartProductsArr.find((item) => item.id === productId)) {
      addBtn.textContent = buttonsText.bought;
      buyBtn.textContent = buttonsText.bought;
      addBtn.style.pointerEvents = 'none';
      buyBtn.style.pointerEvents = 'none';
    } else {
      addBtn.textContent = buttonsText.add;
      buyBtn.textContent = buttonsText.buy;
      addBtn.style.pointerEvents = '';
      buyBtn.style.pointerEvents = '';
    }
  }
}

export default changeButtons;
