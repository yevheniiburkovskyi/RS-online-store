import { routes } from '../modules/router/routes';
import generateElement from '../modules/services/generateElement';
import { ICartItem, IProduct } from '../types/types';
import { generateSummaryBar } from './cartPage/summaryBar';

function buildCartPage(data: Array<IProduct>) {
  const page = generateElement('section', 'cart');
  const productsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  const itemsList = generateElement('ul', 'products-in-cart__items');

  if (productsArr && productsArr.length > 0) {
    productsArr.forEach((storageItem, i) => {
      const product = data.find((obj) => obj.id === storageItem.id);
      if (product) {
        itemsList.innerHTML += `
        <li class="cart-item" id="${storageItem.id}">
        <div class="cart-item__index">${i + 1}</div>
        <div class="cart-item__info">
          <img src=${product.thumbnail} alt=${product.title} class="item-img">
          <div class="item-details">
            <div class="item-title">${product.title}</div>
            <div class="item-line"></div>
            <div class="item-description"> ${product.description} </div>
            <div class="item-other">
              <div class="item-rating">${product.rating}</div>
              <div class="item-discount">${product.discountPercentage}</div>
            </div>
          </div>
        </div>
        <div class="cart-item__control">
          <div class="item-stock"> ${storageItem.stock} </div>
          <div class="item-add-control">
            <button class="item-remove-btn">-</button>
            <span class="item-count">${storageItem.count}</span>
            <button class="item-add-btn">+</button>
          </div>
          <div class="item-amount-price">$<span id="totalPriceItem">
          ${storageItem.price * storageItem.count}</span></div>
        </div>
      </li>
        `;
      }
    });
    page.innerHTML = `
  <div class="products-in-cart">
          <div class="products-in-cart__top-bar">
            <h2 class="top-bar__title">Products in Cart</h2>
            <div class="top-bar__control">
              <label for="cartViewLimit">LIMIT: <input type="number" id="cartViewLimit" value="3"
                  placeholder="3" min="1"></label>
              <div class="cart-page-number">
                <span>Page:</span>
                <button class="cart-page-btn" id="prevPageBtn">
                  < </button>
                    <span class="cart-cur-page" id="cartCurPage">1</span>
                    <button class="cart-page-btn" id="nextPageBtn"> > </button>
              </div>
            </div>
          </div>
          ${itemsList.outerHTML}
        </div>
        ${generateSummaryBar().outerHTML}
  `;
  } else {
    page.innerHTML = 'cart is empty';
  }
  routes['/cart'] = page;
}

export default buildCartPage;
