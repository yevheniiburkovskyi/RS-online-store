import generateElement from '../../modules/services/generateElement';
import createFiltersElements from '../../modules/services/createFiltersElements';
import { getPricesArray } from '../../modules/services/getPricesArray';

function createFiltersBlock() {
  const filters = generateElement('aside', 'products__filter');
  filters.innerHTML = `<div class='filters-block'>
    <div class='filters-btns-block'>
      <button class='filters-btns-block__reset-btn'>Reset Filters</button>
      <button class='filters-btns-block__copy-link-btn'>Copy Link</button>
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block__title">Category</div>
    <div class="category-block" id="categoryBlock">
    </div>
    <div class="filters-block__line"></div>
    <div class="brand-block__title">Brand</div>
    <div class="brand-block" id="brandBlock">
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block category-block_sliders">
      <div class="category-block__title">Price</div>
      <div class="category-block__properties">
        <div class="category-block__prop" id="minPriceProp"></div><span id="betPriceSpan">&lt;&gt;</span>
        <div class="category-block__prop" id="maxPriceProp"></div>
      </div>
      <div class="category-block__slider">
        <input class="slider-input slider-input__min" id="minPrice" type="range" min="0" value="0" max="100">
        <input class="slider-input" id="maxPrice" type="range" min="0" value="100" max="100">
      </div>
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block category-block_sliders">
      <div class="category-block__title">Stock</div>
      <div class="category-block__properties">
        <div class="category-block__prop" id="minStockProp"></div><span id="betStockSpan">&lt;&gt;</span>
        <div class="category-block__prop" id="maxStockProp"></div>
      </div>
      <div class="category-block__slider">
        <input class="slider-input slider-input__min" id="minStock" type="range" min="0" value="0" max="100">
        <input class="slider-input" id="maxStock" type="range" min="0" value="100" max="100">
      </div>
    </div>
  </div>`;
  return filters;
}

function generateCategories() {
  createFiltersElements('category', 'categoryBlock');
  createFiltersElements('brand', 'brandBlock');

  const priceArray = getPricesArray('price');
  (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = `${priceArray[priceArray.length - 1]} $`;
  (document.getElementById('maxPriceProp') as HTMLElement).dataset.price = `${priceArray[priceArray.length - 1]}`;
  (document.getElementById('maxPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${priceArray[0]} $`;
  (document.getElementById('minPriceProp') as HTMLElement).dataset.price = `${priceArray[0]}`;

  const stockArray = getPricesArray('stock');
  (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${stockArray[stockArray.length - 1]}`;
  (document.getElementById('maxStockProp') as HTMLElement).dataset.stock = `${stockArray[stockArray.length - 1]}`;
  (document.getElementById('maxStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${stockArray[0]}`;
  (document.getElementById('minStockProp') as HTMLElement).dataset.stock = `${stockArray[0]}`;

  document.querySelector('.cart-block__filters-icon')?.addEventListener('click', () => {
    document.querySelector('.filters-container')?.classList.toggle('filters-container_show');
    document.querySelector('.filters-block')?.classList.toggle('filters-block_show');
    document.getElementsByTagName('html')[0].classList.toggle('html_scroll-lock');
  });
  document.querySelector('.filters-container')?.addEventListener('click', function (this: HTMLElement) {
    if ((this as HTMLElement) === event?.target) {
      document.querySelector('.filters-container')?.classList.toggle('filters-container_show');
      document.querySelector('.filters-block')?.classList.toggle('filters-block_show');
      document.getElementsByTagName('html')[0].classList.toggle('html_scroll-lock');
    }
  });

  addEventListener('input', (event) => {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    if (eventTarget.classList.contains('slider-input')) {
      const maxPriceInput = document.getElementById('maxPrice') as HTMLInputElement;
      const minPriceInput = document.getElementById('minPrice') as HTMLInputElement;
      const maxPriceOutput = document.getElementById('maxPriceProp') as HTMLElement;
      if (+maxPriceInput.value < +minPriceInput.value) {
        (maxPriceOutput.parentNode as HTMLElement).classList.add('category-block__properties_reverse');
      }
      if (+maxPriceInput.value > +minPriceInput.value) {
        (maxPriceOutput.parentNode as HTMLElement).classList.remove('category-block__properties_reverse');
      }
      const maxStockInput = document.getElementById('maxStock') as HTMLInputElement;
      const minStockInput = document.getElementById('minStock') as HTMLInputElement;
      const maxStockOutput = document.getElementById('maxStockProp') as HTMLElement;
      if (+maxStockInput.value < +minStockInput.value) {
        (maxStockOutput.parentNode as HTMLElement).classList.add('category-block__properties_reverse');
      }
      if (+maxStockInput.value > +minStockInput.value) {
        (maxStockOutput.parentNode as HTMLElement).classList.remove('category-block__properties_reverse');
      }

      if (eventTarget === document.getElementById('minStock') || eventTarget === document.getElementById('maxStock')) {
        const prodArr = document.querySelectorAll('.products__item');
        const shownArr: Array<HTMLElement> = [];
        prodArr.forEach((e) => {
          if ((e as HTMLElement).getAttribute('style') === 'display: grid;') {
            shownArr.push(e as HTMLElement);
          }
        });
        const priceArray = getPricesArray('price', shownArr);
        const priceArrayAll = getPricesArray('price');
        const curMax = priceArray[priceArray.length - 1];
        const curMin = priceArray[0];
        (document.getElementById('maxPrice') as HTMLInputElement).value = `${priceArrayAll.indexOf(curMax)}`;
        (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = `${curMax} $`;
        (document.getElementById('minPrice') as HTMLInputElement).value = `${priceArrayAll.indexOf(curMin)}`;
        (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${curMin} $`;
        (document.getElementById('betPriceSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
        if (!curMax || !curMin) {
          (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = ``;
          (document.getElementById('minPriceProp') as HTMLElement).innerHTML = ``;
          (document.getElementById('betPriceSpan') as HTMLElement).innerHTML = `Not found`;
        }
      }

      if (eventTarget === document.getElementById('minPrice') || eventTarget === document.getElementById('maxPrice')) {
        const prodArr = document.querySelectorAll('.products__item');
        const shownArr: Array<HTMLElement> = [];
        prodArr.forEach((e) => {
          if ((e as HTMLElement).getAttribute('style') === 'display: grid;') {
            shownArr.push(e as HTMLElement);
          }
        });
        const stockArray = getPricesArray('stock', shownArr);
        const stockArrayAll = getPricesArray('stock');
        const curMax = stockArray[stockArray.length - 1];
        const curMin = stockArray[0];
        (document.getElementById('maxStock') as HTMLInputElement).value = `${stockArrayAll.indexOf(curMax)}`;
        (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${curMax}`;
        (document.getElementById('minStock') as HTMLInputElement).value = `${stockArrayAll.indexOf(curMin)}`;
        (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${curMin}`;
        (document.getElementById('betStockSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
        if (!curMax || !curMin) {
          (document.getElementById('maxStockProp') as HTMLElement).innerHTML = ``;
          (document.getElementById('minStockProp') as HTMLElement).innerHTML = ``;
          (document.getElementById('betStockSpan') as HTMLElement).innerHTML = `Not found`;
        }
      }
      if (
        eventTarget === document.getElementById('maxPrice') &&
        (document.getElementById('minPriceProp') as HTMLElement).textContent === ''
      ) {
        (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${priceArray[0]} $`;
      }
      if (
        eventTarget === document.getElementById('maxStock') &&
        !(document.getElementById('minStockProp') as HTMLElement).textContent
      ) {
        (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${stockArray[0]}`;
      }
    }
  });

  addEventListener('change', (event) => {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    if (eventTarget.classList.contains('category-input') || eventTarget.classList.contains('brand-input')) {
      updateSliders();
    }
  });
}

function changeInput(event: Event) {
  const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
  const priceArray = getPricesArray('price');
  const stockArray = getPricesArray('stock');
  const i = +(eventTarget as HTMLInputElement).value;
  const targetId = (eventTarget as HTMLInputElement).id;
  if (targetId === 'maxPrice' || targetId === 'minPrice') {
    (document.getElementById('betPriceSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
    (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${priceArray[i]} $`;
    (document.getElementById(`${targetId}Prop`) as HTMLElement).dataset.price = `${priceArray[i]}`;
  }
  if (targetId === 'maxStock' || targetId === 'minStock') {
    (document.getElementById('betStockSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
    (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${stockArray[i]}`;
    (document.getElementById(`${targetId}Prop`) as HTMLElement).dataset.stock = `${stockArray[i]}`;
  }
}

function updateFilters() {
  const countsArr = document.querySelectorAll('.category-items-counter');
  countsArr.forEach((e) => {
    e.innerHTML = '0';
  });
  const brandCountsArr = document.querySelectorAll('.brand-items-counter');
  brandCountsArr.forEach((e) => {
    e.innerHTML = '0';
  });

  const prodArr = document.querySelectorAll('.products__item');
  const shownArr: Array<HTMLElement> = [];
  prodArr.forEach((e) => {
    if ((e as HTMLElement).getAttribute('style') === 'display: grid;') {
      shownArr.push(e as HTMLElement);
    }
  });
  shownArr.forEach((e) => {
    const count = +((document.getElementById(`category${e.getAttribute('data-category')}Count`) as HTMLSpanElement)
      .textContent as string);
    (document.getElementById(`category${e.getAttribute('data-category')}Count`) as HTMLElement).innerHTML = `
    ${count + 1}`;
  });
  shownArr.forEach((e) => {
    const count = +((document.getElementById(`brand${e.getAttribute('data-brand')}Count`) as HTMLSpanElement)
      .textContent as string);
    (document.getElementById(`brand${e.getAttribute('data-brand')}Count`) as HTMLElement).innerHTML = `${count + 1}`;
  });

  countsArr.forEach((e) => {
    if (e.textContent === '0') {
      (e.parentNode as HTMLElement).classList.add('category-block__item_out-of-stock');
    } else {
      (e.parentNode as HTMLElement).classList.remove('category-block__item_out-of-stock');
    }
  });
  brandCountsArr.forEach((e) => {
    if (e.textContent === '0') {
      (e.parentNode as HTMLElement).classList.add('brand-block__item_out-of-stock');
    } else {
      (e.parentNode as HTMLElement).classList.remove('brand-block__item_out-of-stock');
    }
  });
}

function updateSliders() {
  const prodArr = document.querySelectorAll('.products__item');
  const shownArr: Array<HTMLElement> = [];
  prodArr.forEach((e) => {
    if ((e as HTMLElement).getAttribute('style') === 'display: grid;') {
      shownArr.push(e as HTMLElement);
    }
  });
  const stockArray = getPricesArray('stock', shownArr);
  const stockArrayAll = getPricesArray('stock');
  const curMax = stockArray[stockArray.length - 1];
  const curMin = stockArray[0];
  (document.getElementById('maxStock') as HTMLInputElement).value = `${stockArrayAll.indexOf(curMax)}`;
  (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${curMax}`;
  (document.getElementById('minStock') as HTMLInputElement).value = `${stockArrayAll.indexOf(curMin)}`;
  (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${curMin}`;
  (document.getElementById('betStockSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
  if (!curMax || !curMin) {
    (document.getElementById('maxStockProp') as HTMLElement).innerHTML = ``;
    (document.getElementById('minStockProp') as HTMLElement).innerHTML = ``;
    (document.getElementById('betStockSpan') as HTMLElement).innerHTML = `Not found`;
  }
  const priceArray = getPricesArray('price', shownArr);
  const priceArrayAll = getPricesArray('price');
  const curPrMax = priceArray[priceArray.length - 1];
  const curPrMin = priceArray[0];
  (document.getElementById('maxPrice') as HTMLInputElement).value = `${priceArrayAll.indexOf(curPrMax)}`;
  (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = `${curPrMax} $`;
  (document.getElementById('minPrice') as HTMLInputElement).value = `${priceArrayAll.indexOf(curPrMin)}`;
  (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${curPrMin} $`;
  (document.getElementById('betPriceSpan') as HTMLElement).innerHTML = `&lt;&gt;`;
  if (!curPrMax || !curPrMin) {
    (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = ``;
    (document.getElementById('minPriceProp') as HTMLElement).innerHTML = ``;
    (document.getElementById('betPriceSpan') as HTMLElement).innerHTML = `Not found`;
  }
}

function filterBarHideEvent() {
  addEventListener('click', (e) => {
    if (e.target === document.querySelector('.filter-btn') || e.target === document.querySelector('.filters-bg')) {
      document.querySelector('.filters-block')?.classList.toggle('filters-block_show');
      document.querySelector('.filters-bg')?.classList.toggle('filters-bg_show');
      document.getElementsByTagName('html')[0].classList.toggle('html_scroll-lock');
    }
  });
}

export { createFiltersBlock, generateCategories, updateFilters, changeInput, updateSliders, filterBarHideEvent };
