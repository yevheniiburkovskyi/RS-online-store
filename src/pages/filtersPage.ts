import '../scss/style.scss';
import generateElement from '../modules/services/generateElement';
import createFiltersElements from '../modules/services/createFiltersElements';
import { getPricesArray } from '../modules/services/getPricesArray';

function createFiltersBlock() {
  const filters = generateElement('aside', 'products__filter');
  filters.innerHTML = `<div class='filters-block'>
    <div class='filters-btns-block'>
      <button class='filters-btns-block__reset-btn'>Reset Filters</button>
      <button class='filters-btns-block__copy-link-btn'>Copy Link</button>
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block" id="categoryBlock">
      <div class="category-block__title">Category</div>
    </div>
    <div class="filters-block__line"></div>
    <div class="brand-block" id="brandBlock">
      <div class="brand-block__title">Brand</div>
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block">
      <div class="category-block__title">Price</div>
      <div class="category-block__properties">
        <div class="category-block__prop" id="minPriceProp"></div><span>&lt;&gt;</span>
        <div class="category-block__prop" id="maxPriceProp"></div>
      </div>
      <div class="category-block__slider">
        <input class="slider-input slider-input__min" id="minPrice" type="range" min="0" value="0" max="100">
        <input class="slider-input" id="maxPrice" type="range" min="0" value="100" max="100">
      </div>
    </div>
    <div class="filters-block__line"></div>
    <div class="category-block">
      <div class="category-block__title">Stock</div>
      <div class="category-block__properties">
        <div class="category-block__prop" id="minStockProp"></div><span>&lt;&gt;</span>
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
  (document.getElementById('maxPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${priceArray[0]} $`;

  const stockArray = getPricesArray('stock');
  (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${stockArray[stockArray.length - 1]}`;
  (document.getElementById('maxStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${stockArray[0]}`;

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
      const targetId = eventTarget.id;
      if (targetId === 'maxPrice' || targetId === 'maxStock') {
        if (+eventTarget.value <= +(eventTarget.previousElementSibling as HTMLInputElement).value) {
          eventTarget.value = `${+(eventTarget.previousElementSibling as HTMLInputElement).value}`;
        }
      }
      if (targetId === 'minPrice' || targetId === 'minStock') {
        if (+eventTarget.value >= +(eventTarget.nextElementSibling as HTMLInputElement).value) {
          eventTarget.value = `${+(eventTarget.nextElementSibling as HTMLInputElement).value}`;
        }
      }
      const i = +eventTarget.value;
      if (targetId === 'maxPrice' || targetId === 'minPrice') {
        (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${priceArray[i]} $`;
      }
      if (targetId === 'maxStock' || targetId === 'minStock') {
        (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${stockArray[i]}`;
      }
    }
  });
}

function updateFilters() {
  const countsArr = document.querySelectorAll('.category-items-counter');
  countsArr.forEach((e) => {
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

  const priceArray = getPricesArray('price', shownArr);
  (document.getElementById('maxPriceProp') as HTMLElement).innerHTML = `${priceArray[priceArray.length - 1]} $`;
  (document.getElementById('maxPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPrice') as HTMLElement).setAttribute('max', `${priceArray.length - 1}`);
  (document.getElementById('minPriceProp') as HTMLElement).innerHTML = `${priceArray[0]} $`;

  const stockArray = getPricesArray('stock', shownArr);
  (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${stockArray[stockArray.length - 1]}`;
  (document.getElementById('maxStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${stockArray[0]}`;
  // (document.getElementById('maxStockProp') as HTMLElement).innerHTML = `${stockArray[stockArray.length - 1]}`;
  (document.getElementById('maxStock') as HTMLElement).setAttribute('value', `${stockArray.length - 1}`);
  (document.getElementById('minStock') as HTMLElement).setAttribute('max', `${stockArray.length - 1}`);
  // (document.getElementById('minStockProp') as HTMLElement).innerHTML = `${stockArray[0]}`;

  addEventListener('input', (event) => {
    const eventTarget: HTMLInputElement = event.target as HTMLInputElement;
    if (eventTarget.classList.contains('slider-input')) {
      const targetId = eventTarget.id;
      if (targetId === 'maxPrice' || targetId === 'maxStock') {
        if (+eventTarget.value <= +(eventTarget.previousElementSibling as HTMLInputElement).value) {
          eventTarget.value = `${+(eventTarget.previousElementSibling as HTMLInputElement).value}`;
        }
      }
      if (targetId === 'minPrice' || targetId === 'minStock') {
        if (+eventTarget.value >= +(eventTarget.nextElementSibling as HTMLInputElement).value) {
          eventTarget.value = `${+(eventTarget.nextElementSibling as HTMLInputElement).value}`;
        }
      }
      const i = +eventTarget.value;
      if (targetId === 'maxPrice' || targetId === 'minPrice') {
        (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${priceArray[i]} $`;
      }
      if (targetId === 'maxStock' || targetId === 'minStock') {
        (document.getElementById(`${targetId}Prop`) as HTMLElement).innerHTML = `${stockArray[i]}`;
      }
    }
  });

  countsArr.forEach((e) => {
    if (e.textContent === '0') {
      (e.parentNode as HTMLElement).classList.add('category-block__item_out-of-stock');
    } else {
      (e.parentNode as HTMLElement).classList.remove('category-block__item_out-of-stock');
    }
  });
}

export { createFiltersBlock, generateCategories, updateFilters };
