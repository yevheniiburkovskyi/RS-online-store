import { ICartItem } from '../../types/types';
import updateHeader from './updateHeader';

function changeCount() {
  const productsBlock = document.querySelector('.products-in-cart') as HTMLDivElement;
  const cartContainer = document.querySelector('.cart') as HTMLDivElement;
  const storageArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  if (productsBlock) {
    productsBlock.addEventListener('click', (e) => {
      const target = e.target as HTMLButtonElement;
      if (target && (target.classList.contains('item-add-btn') || target.classList.contains('item-remove-btn'))) {
        const product = target.closest('.cart-item') as HTMLLIElement;
        const count = product.querySelector('.item-count') as HTMLSpanElement;
        const price = product.querySelector('#totalPriceItem') as HTMLSpanElement;
        const storageItem = storageArr.find((item) => item.id === +product.id) as ICartItem;
        let countValue = storageItem.count;
        const stockValue = storageItem.stock;
        const priceValue = storageItem.price;

        if (target.classList.contains('item-add-btn') && stockValue > countValue) {
          countValue += 1;
        } else if (target.classList.contains('item-remove-btn')) {
          countValue -= 1;
        }
        if (countValue === 0) {
          storageArr.splice(storageArr.indexOf(storageItem), 1);
          product.remove();
          if (storageArr.length < 1) {
            cartContainer.textContent = 'cart is empty';
          }
        } else {
          storageItem.count = countValue;
          storageItem.totalPrice = priceValue * countValue;
          storageArr.splice(storageArr.indexOf(storageItem), 1, storageItem);
          count.textContent = `${storageItem.count}`;
          price.textContent = `${storageItem.totalPrice}`;
        }
        localStorage.setItem('OnlineStoreCart', JSON.stringify(storageArr));
        updateHeader();
      }
    });
  }
}

export default changeCount;
