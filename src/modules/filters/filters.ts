import { updateFilters, changeInput } from '../../pages/mainPage/filtersBar';
import { IQuery } from '../../types/types';
import { routes } from '../router/routes';
import filterData from './filterCards';

function filters() {
  const url = new URL(window.location.href);
  const queryUrl = url.search;
  const searchParams = new URLSearchParams(queryUrl);

  function parseQuery() {
    const queryObj: IQuery = {};
    searchParams.forEach((item, key) => {
      queryObj[key] = item;
    });
    filterData(queryObj);
    (document.querySelector('#page-menu > a') as HTMLLinkElement).href = window.location.href;
    routes[window.location.href] = (document.querySelector('.products') as HTMLDivElement).outerHTML;
    updateFilters();
  }

  function changeUrl(topic: string, ...queryArr: string[]) {
    queryArr.forEach((item) => {
      searchParams.set(topic, item);
    });
    if (queryArr.length === 1 && queryArr[0] === '') {
      searchParams.delete(topic);
    }
    window.history.pushState({}, '', `?${searchParams.toString()}`);
    if (!searchParams.toString()) {
      window.history.pushState({}, '', `.`);
    }
  }

  function startSearch() {
    const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
    if (searchParams.has('search')) {
      inputArea.value = searchParams.get('search') as string;
    } else {
      inputArea.value = '';
    }
    inputArea?.addEventListener('input', () => {
      inputArea.value = inputArea.value.replace(/[^a-z0-9]/gi, '');
      changeUrl('search', inputArea.value);
      parseQuery();
    });
  }

  function startSort() {
    const inputArea = document.querySelector('#sort-select') as HTMLInputElement;
    if (searchParams.has('sort')) {
      inputArea.value = searchParams.get('sort') as string;
    }
    inputArea.addEventListener('change', () => {
      changeUrl('sort', inputArea.value);
      parseQuery();
    });
  }

  function startPosition() {
    const inputArea = document.querySelector('#position-select') as HTMLInputElement;
    const positionsBtns = [...(inputArea.children as HTMLCollection)] as HTMLDivElement[];
    if (searchParams.has('grid')) {
      const gridParam = searchParams.get('grid') as string;
      positionsBtns.forEach((item) => {
        if (item.dataset.position === gridParam) {
          item.classList.add('products__bar-position-row-active');
        } else {
          item.classList.remove('products__bar-position-row-active');
        }
      });
    }
    inputArea?.addEventListener('click', (e) => {
      const target = e.target as HTMLParagraphElement;
      const postitionBtn = target.closest('.products__bar-position-row > div') as HTMLDivElement;
      if (
        e.target &&
        target.closest('.products__bar-position-row') &&
        !target.classList.contains('products__bar-position-row')
      ) {
        positionsBtns.forEach((item) => {
          if (item.classList.contains('products__bar-position-row-active')) {
            item.classList.remove('products__bar-position-row-active');
          }
        });
        postitionBtn.classList.add('products__bar-position-row-active');
        changeUrl('grid', postitionBtn.dataset.position as string);
        parseQuery();
      }
    });
  }

  function startCategory() {
    const categoryInputs = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    if (searchParams.has('category')) {
      const categoryParam = (searchParams.get('category') as string)?.split('↕');
      categoryInputs.forEach((item) => {
        if (categoryParam.includes(item.value)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    }
    categoryInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const categoriesArr: string[] = [];
        categoryInputs.forEach((item) => {
          if (item.checked) {
            categoriesArr.push(item.value);
          }
        });
        changeUrl('category', categoriesArr.join('↕'));
        parseQuery();
      });
    });
  }

  function startBrand() {
    const categoryInputs = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;
    if (searchParams.has('brand')) {
      const categoryParam = (searchParams.get('brand') as string)?.split('↕');
      categoryInputs.forEach((item) => {
        if (categoryParam.includes(item.value)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
    }

    categoryInputs.forEach((input) => {
      input.addEventListener('change', () => {
        const categoriesArr: string[] = [];
        categoryInputs.forEach((item) => {
          if (item.checked) {
            categoriesArr.push(item.value);
          }
        });
        changeUrl('brand', categoriesArr.join('↕'));
        parseQuery();
      });
    });
  }

  function startPrice() {
    const categoryInputs = document.querySelectorAll('.slider-input') as NodeListOf<HTMLLinkElement>;
    categoryInputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        changeInput(event);
        const minPrice = (document.querySelector('#minPriceProp') as HTMLDivElement).dataset.price as string;
        const maxPrice = (document.querySelector('#maxPriceProp') as HTMLDivElement).dataset.price as string;
        changeUrl('price', `${Math.min(+minPrice, +maxPrice)}↕${Math.max(+minPrice, +maxPrice)}`);
        parseQuery();
      });
    });
  }

  function startStock() {
    const categoryInputs = document.querySelectorAll('.slider-input') as NodeListOf<HTMLLinkElement>;
    categoryInputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        changeInput(event);
        const minStock = (document.querySelector('#minStockProp') as HTMLDivElement).dataset.stock as string;
        const maxStock = (document.querySelector('#maxStockProp') as HTMLDivElement).dataset.stock as string;
        changeUrl('stock', `${Math.min(+minStock, +maxStock)}↕${Math.max(+minStock, +maxStock)}`);
        parseQuery();
      });
    });
  }

  function copyFilters() {
    const copyBtn = document.querySelector('.filters-btns-block__copy-link-btn') as HTMLButtonElement;
    const copyBtnText = copyBtn.textContent;
    copyBtn.addEventListener('click', () => {
      window.navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = 'Сopied';
      setTimeout(() => {
        copyBtn.textContent = copyBtnText;
      }, 500);
    });
  }

  function resetFilters() {
    const resetBtn = document.querySelector('.filters-btns-block__reset-btn') as HTMLButtonElement;
    const resetBtnText = resetBtn.textContent;
    resetBtn.addEventListener('click', () => {
      searchParams.forEach((item, key) => {
        searchParams.delete(key);
      });
      window.history.pushState({}, '', `.`);
      (document.querySelector('#page-menu > a') as HTMLLinkElement).href = window.location.href;
      routes[window.location.href] = (document.querySelector('.products') as HTMLDivElement).outerHTML;
      (document.querySelector('#page-menu > a') as HTMLLinkElement).click();
      resetBtn.textContent = 'Reseted';
      setTimeout(() => {
        resetBtn.textContent = resetBtnText;
      }, 500);
    });
  }

  if (document.querySelector('.products')) {
    parseQuery();
    startSearch();
    startSort();
    startPosition();
    startCategory();
    startBrand();
    startPrice();
    startStock();
    copyFilters();
    resetFilters();
  }
}

export default filters;
