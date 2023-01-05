import { ICartItem } from '../../types/types';
import updateHeader from './updateHeader';

function updateCartPage() {
  const productCartArr = [...(document.querySelectorAll('.cart-item') as NodeListOf<HTMLLIElement>)];
  const productsBlock = document.querySelector('.products-in-cart') as HTMLDivElement;
  const cartContainer = document.querySelector('.cart') as HTMLDivElement;
  const storageArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);

  const controlBar = document.querySelector('.products-in-cart__top-bar') as HTMLDivElement;
  const limitInput = controlBar.querySelector('#cartViewLimit') as HTMLInputElement;
  const currPage = controlBar.querySelector('#cartCurPage') as HTMLSpanElement;

  let inputValue = Number(limitInput.value);
  let currPageValue = 1;
  let counter = inputValue;

  function changeCount() {
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
            deleteItem(product);
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

  function startPagination() {
    hideElements(inputValue, counter);
    limitInput.addEventListener('input', () => {
      currPageValue = 1;
      inputValue = Number(limitInput.value);
      counter = Number(limitInput.value);
      hideElements(inputValue, counter);
      currPage.textContent = `${currPageValue}`;
    });
    controlBar.addEventListener('click', (e) => {
      const maxPages = Math.ceil(productCartArr.length / inputValue);
      const target = e.target as HTMLDivElement;
      if (target && (target.id === 'nextPageBtn' || target.id === 'prevPageBtn')) {
        if (target.id === 'nextPageBtn' && currPageValue < maxPages) {
          counter += inputValue;
          currPageValue += 1;
        } else if (target.id === 'prevPageBtn' && currPageValue > 1) {
          counter -= inputValue;
          currPageValue -= 1;
        }
        hideElements(inputValue, counter);
        currPage.textContent = `${currPageValue}`;
      }
    });
  }

  function hideElements(startValue: number, endValue: number) {
    const endIndex = endValue;
    const startIndex = endValue - startValue;
    productCartArr.forEach((item, i) => {
      item.style.display = 'none';
      if (i >= startIndex && i < endIndex) {
        item.style.display = 'flex';
      }
    });
  }

  function deleteItem(product: HTMLLIElement) {
    product.remove();
    productCartArr.splice(productCartArr.indexOf(product), 1);
    productCartArr.forEach((item, i) => {
      (item.querySelector('#cartItemIndex') as HTMLDivElement).textContent = `${i + 1}`;
    });
    if (!productCartArr.find((item) => item.style.display === 'flex')) {
      counter -= inputValue;
      currPageValue -= 1;
      currPage.textContent = `${currPageValue}`;
    }
    hideElements(inputValue, counter);
  }
  changeCount();
  startPagination();
}

export default updateCartPage;
