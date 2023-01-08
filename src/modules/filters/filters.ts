import { updateFilters, changeInput } from '../../pages/mainPage/filtersBar';
import { IQuery } from '../../types/types';
import { routes } from '../router/routes';
import filterData from './filterCards';

class Filters {
  private url: URL;
  private queryUrl: string;
  private searchParams: URLSearchParams;

  constructor() {
    this.url = new URL(window.location.href);
    this.queryUrl = this.url.search;
    this.searchParams = new URLSearchParams(this.queryUrl);
  }

  private parseQuery() {
    const queryObj: IQuery = {};
    this.searchParams.forEach((item, key) => {
      queryObj[key] = item;
    });
    filterData(queryObj);
    (document.querySelector('#page-menu > a') as HTMLLinkElement).href = window.location.href;
    routes[window.location.href] = (document.querySelector('.products') as HTMLDivElement).outerHTML;
    updateFilters();
  }

  private changeUrl(topic: string, ...queryArr: string[]) {
    queryArr.forEach((item) => {
      this.searchParams.set(topic, item);
    });
    if (queryArr.length === 1 && queryArr[0] === '') {
      this.searchParams.delete(topic);
    }
    window.history.pushState({}, '', `?${this.searchParams.toString()}`);
    if (!this.searchParams.toString()) {
      window.history.pushState({}, '', `.`);
    }
  }

  private startSearch() {
    const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
    if (this.searchParams.has('search')) {
      inputArea.value = this.searchParams.get('search') as string;
    } else {
      inputArea.value = '';
    }
    inputArea?.addEventListener('input', () => {
      inputArea.value = inputArea.value.replace(/[^a-z0-9]/gi, '');
      this.changeUrl('search', inputArea.value);
      this.parseQuery();
    });
  }

  private startSort() {
    const inputArea = document.querySelector('#sort-select') as HTMLInputElement;
    if (this.searchParams.has('sort')) {
      inputArea.value = this.searchParams.get('sort') as string;
    }
    inputArea.addEventListener('change', () => {
      this.changeUrl('sort', inputArea.value);
      this.parseQuery();
    });
  }

  private startPosition() {
    const inputArea = document.querySelector('#position-select') as HTMLInputElement;
    const positionsBtns = [...(inputArea.children as HTMLCollection)] as HTMLDivElement[];
    if (this.searchParams.has('grid')) {
      const gridParam = this.searchParams.get('grid') as string;
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
        this.changeUrl('grid', postitionBtn.dataset.position as string);
        this.parseQuery();
      }
    });
  }

  private startCategory() {
    const categoryInputs = document.querySelectorAll('.category-input') as NodeListOf<HTMLInputElement>;
    if (this.searchParams.has('category')) {
      const categoryParam = (this.searchParams.get('category') as string)?.split('↕');
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
        this.changeUrl('category', categoriesArr.join('↕'));
        this.parseQuery();
      });
    });
  }

  private startBrand() {
    const categoryInputs = document.querySelectorAll('.brand-input') as NodeListOf<HTMLInputElement>;
    if (this.searchParams.has('brand')) {
      const categoryParam = (this.searchParams.get('brand') as string)?.split('↕');
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
        this.changeUrl('brand', categoriesArr.join('↕'));
        this.parseQuery();
      });
    });
  }

  private startPrice() {
    const categoryInputs = document.querySelectorAll('.slider-input') as NodeListOf<HTMLLinkElement>;
    categoryInputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        changeInput(event);
        const minPrice = (document.querySelector('#minPriceProp') as HTMLDivElement).dataset.price as string;
        const maxPrice = (document.querySelector('#maxPriceProp') as HTMLDivElement).dataset.price as string;
        this.changeUrl('price', `${Math.min(+minPrice, +maxPrice)}↕${Math.max(+minPrice, +maxPrice)}`);
        this.parseQuery();
      });
    });
  }

  private startStock() {
    const categoryInputs = document.querySelectorAll('.slider-input') as NodeListOf<HTMLLinkElement>;
    categoryInputs.forEach((input) => {
      input.addEventListener('input', (event) => {
        changeInput(event);
        const minStock = (document.querySelector('#minStockProp') as HTMLDivElement).dataset.stock as string;
        const maxStock = (document.querySelector('#maxStockProp') as HTMLDivElement).dataset.stock as string;
        this.changeUrl('stock', `${Math.min(+minStock, +maxStock)}↕${Math.max(+minStock, +maxStock)}`);
        this.parseQuery();
      });
    });
  }

  private copyFilters() {
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

  private resetFilters() {
    const resetBtn = document.querySelector('.filters-btns-block__reset-btn') as HTMLButtonElement;
    const resetBtnText = resetBtn.textContent;
    resetBtn.addEventListener('click', () => {
      this.searchParams.forEach((item, key) => {
        this.searchParams.delete(key);
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

  public startFilter() {
    if (document.querySelector('.products')) {
      this.parseQuery();
      this.startSearch();
      this.startSort();
      this.startPosition();
      this.startCategory();
      this.startBrand();
      this.startPrice();
      this.startStock();
      this.copyFilters();
      this.resetFilters();
    }
  }
}

export default Filters;
