import { ICartItem } from '../../types/types';
import updateHeader from './updateHeader';

function updateCartPage() {
  const productCartArr = [...(document.querySelectorAll('.cart-item') as NodeListOf<HTMLLIElement>)];

  const productsBlock = document.querySelector('.products-in-cart') as HTMLDivElement;
  const cartContainer = document.querySelector('.cart') as HTMLDivElement;
  const storageArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);

  const controlBar = document.querySelector('.products-in-cart__top-bar') as HTMLDivElement;
  const currPage = controlBar.querySelector('#cartCurPage') as HTMLSpanElement;
  const limitInput = controlBar.querySelector('#cartViewLimit') as HTMLInputElement;

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
    let currPosition = +limitInput.value * Number(currPage.textContent);

    hideElements(+limitInput.value, currPosition);

    limitInput.addEventListener('input', () => {
      if (limitInput.value === '0' || +limitInput.value < 0) {
        limitInput.value = '1';
      }
      const maxPages = Math.ceil(productCartArr.length / Number(limitInput.value));
      if (Number(currPage.textContent) > maxPages) {
        currPage.textContent = `${maxPages}`;
      }
      currPosition = +limitInput.value * Number(currPage.textContent);
      changeCartUrl('limit', limitInput.value);
      hideElements(+limitInput.value, currPosition);
    });

    controlBar.addEventListener('click', (e) => {
      const maxPages = Math.ceil(productCartArr.length / Number(limitInput.value));
      const target = e.target as HTMLDivElement;
      let currPageValue = Number(currPage.textContent);
      if (target && (target.id === 'nextPageBtn' || target.id === 'prevPageBtn')) {
        if (target.id === 'nextPageBtn' && Number(currPage.textContent) < maxPages) {
          currPageValue += 1;
        } else if (target.id === 'prevPageBtn' && Number(currPage.textContent) > 1) {
          currPageValue -= 1;
        }
        const currPosition = +limitInput.value * currPageValue;
        changeCartUrl('page', `${currPageValue}`);
        hideElements(+limitInput.value, currPosition);
        currPage.textContent = `${currPageValue}`;
      }
    });
  }

  function hideElements(interval: number, endValue: number) {
    const endIndex = endValue;
    const startIndex = endIndex - interval;
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
    const maxPages = Math.ceil(productCartArr.length / Number(limitInput.value));
    if (Number(currPage.textContent) > maxPages) {
      currPage.textContent = `${maxPages}`;
    }

    const currPosition = +limitInput.value * Number(currPage.textContent);

    productCartArr.forEach((item, i) => {
      (item.querySelector('.cart-item__index') as HTMLDivElement).textContent = `${i + 1}`;
    });
    hideElements(+limitInput.value, currPosition);
    changeCartUrl('page', `${Number(currPage.textContent)}`);
  }

  function getSearchParams() {
    const url = new URL(window.location.href);
    const queryUrl = url.search;
    const searchParams = new URLSearchParams(queryUrl);
    return searchParams;
  }

  function changeCartUrl(topic: string, value: string) {
    const searchParams = getSearchParams();
    searchParams.set(topic, value);
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    if (!searchParams.toString()) {
      window.history.pushState({}, '', `.`);
    }
  }

  function updateCartPageFromUrl() {
    const searchParams = getSearchParams();
    searchParams.forEach((value, key) => {
      if (key === 'page') {
        currPage.textContent = value;
      }
      if (key === 'limit') {
        limitInput.value = value;
      }
    });
  }
  updateCartPageFromUrl();
  changeCount();
  startPagination();
}

export default updateCartPage;
