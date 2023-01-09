import generateElement from '../services/generateElement';
import { EPromoCodes } from '../../types/types';

function generateSummaryBar() {
  const totalPriceStr = document.querySelector('.cart-block__total-price')?.textContent as string;
  const totalPriceHeader = totalPriceStr.split('$')[totalPriceStr.split('$').length - 1];
  const summaryBar = generateElement('div', 'summary-wrapper');
  summaryBar.innerHTML = `<div class="total-cart"><h2 class="total-title">Summary</h2>
  <div class="total-products">Products: <span id="totalItems">99</span></div>
  <div class="total-price">Total: $<span id="totalPriceCart">${totalPriceHeader}</span></div>
  <input type="text" class="total-promo" placeholder="Enter promo code">
  <span class="total-promo-ex">Promo for test: 'RS', 'EPM'</span>
  <button class="total-buy-btn">BUY NOW</button></div>`;
  if (localStorage.getItem('cartSummaryBlock')) {
    summaryBar.innerHTML = localStorage.getItem('cartSummaryBlock') as string;
  }
  return summaryBar;
}

function addSummaryListeners() {
  document.getElementsByTagName('body')[0].addEventListener('input', (e) => {
    if (e.target === document.querySelector('.total-promo')) {
      const inputPromoValue = (e.target as HTMLInputElement).value.toUpperCase();
      const inputPromo = e.target as HTMLInputElement;
      if (EPromoCodes[inputPromoValue as keyof typeof EPromoCodes] && !document.querySelector('.avaliable-promo')) {
        inputPromo.after(generateAvaliablePromo(inputPromoValue));
      }
      if (!EPromoCodes[inputPromoValue as keyof typeof EPromoCodes] && document.querySelector('.avaliable-promo')) {
        document.querySelector('.avaliable-promo')?.remove();
      }
      saveSummary();
    }
  });
  document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
    if (e.target === document.querySelector('.add-promo-code-btn')) {
      const inputPromo = document.querySelector('.total-promo') as HTMLInputElement;
      const promoKey = ((e.target as HTMLElement).parentNode as HTMLElement).id;
      if (!document.querySelector('.total-apply-codes')) inputPromo.before(generateApplyPromoBlock());
      const promoBlock = document.querySelector('.total-apply-codes') as HTMLInputElement;
      if (!document.getElementById(`apply${promoKey}`)) promoBlock.append(generateApplyPromo(promoKey));
      updateTotalPrice();
    }
    if ((e.target as HTMLElement).classList.contains('remove-promo-code-btn')) {
      ((e.target as HTMLElement).parentNode as HTMLElement).remove();
      if (!document.querySelector('.remove-promo-code-btn')) {
        document.querySelector('.total-apply-codes')?.remove();
      }
      updateTotalPrice();
    }
  });
}

function generateAvaliablePromo(inputPromo: string) {
  const avaliablePromo = generateElement('div', 'avaliable-promo');
  avaliablePromo.setAttribute('id', `${inputPromo}`);
  avaliablePromo.innerHTML = `<span class="promo-content">${EPromoCodes[inputPromo as keyof typeof EPromoCodes]}</span>
    <button class="add-promo-code-btn">ADD</button>`;
  return avaliablePromo;
}

function generateApplyPromoBlock() {
  const applyPromoBlock = generateElement('div', 'total-apply-codes');
  applyPromoBlock.innerHTML = `<div class="total-apply-codes__title">Applied codes</div></div>`;
  return applyPromoBlock;
}

function generateApplyPromo(inputPromo: string) {
  const applyPromo = generateElement('div', 'total-apply-codes__item');
  applyPromo.setAttribute('id', `apply${inputPromo}`);
  applyPromo.innerHTML = `<span class="promo-content">${EPromoCodes[inputPromo as keyof typeof EPromoCodes]}</span>
    <button class="remove-promo-code-btn">DROP</button>`;
  return applyPromo;
}

function updateTotalPrice() {
  const totalPriceStr = document.querySelector('.cart-block__total-price')?.textContent as string;
  const totalPriceHeader = totalPriceStr.split('$')[totalPriceStr.split('$').length - 1];
  if (document.getElementById('totalPriceCart')) {
    (document.getElementById('totalPriceCart') as HTMLElement).innerHTML = totalPriceHeader;
  }
  const totalItems = (document.getElementById('totalItemsHeader') as HTMLElement).textContent as string;
  if (document.getElementById('totalItems')) {
    (document.getElementById('totalItems') as HTMLElement).innerHTML = totalItems;
  }
  if (document.querySelector('.total-apply-codes')) {
    (document.querySelector('.total-price') as HTMLElement).classList.add('total-price_inactive');
    const promoItems = document.querySelectorAll('.total-apply-codes__item');
    const newPrice = calculateDiscount(+totalPriceHeader, promoItems.length);
    if (!document.getElementById('newTotalPriceCart')) {
      const newPriceBlock = generateElement('div', 'total-price');
      newPriceBlock.innerHTML = `Total: $<span id="newTotalPriceCart">${newPrice}</span>`;
      (document.querySelector('.total-price') as HTMLElement).after(newPriceBlock);
    } else {
      (document.getElementById('newTotalPriceCart') as HTMLElement).innerHTML = `${newPrice}`;
    }
  }
  if (!document.querySelector('.total-apply-codes')) {
    if (document.querySelector('.total-price')) {
      (document.querySelector('.total-price') as HTMLElement).classList.remove('total-price_inactive');
    }
    if (document.getElementById('newTotalPriceCart')) {
      ((document.getElementById('newTotalPriceCart') as HTMLElement).parentNode as HTMLElement).remove();
    }
  }
  saveSummary();
}

function saveSummary() {
  if (document.querySelector('.total-cart')) {
    localStorage.setItem('cartSummaryBlock', `${document.querySelector('.total-cart')?.outerHTML}`);
  }
}

function calculateDiscount(totalPrice: number, discountValue: number) {
  return Math.round(totalPrice * (1 - discountValue * 0.1) * 100) / 100;
}

export { generateSummaryBar, addSummaryListeners, updateTotalPrice, calculateDiscount };
