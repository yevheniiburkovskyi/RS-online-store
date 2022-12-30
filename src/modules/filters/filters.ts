import { updateFilters } from '../../pages/filtersPage';
import { routes } from '../router/routes';
import filterData from '../services/filterCards';

function filters() {
  const url = new URL(window.location.href);
  const queryUrl = url.search;
  const searchParams = new URLSearchParams(queryUrl);

  function parseQuery() {
    const queryArr: string[] = [' '];
    searchParams.forEach((item) => {
      queryArr.push(item);
    });
    filterData(...queryArr);
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
    }
    inputArea?.addEventListener('input', () => {
      changeUrl('search', inputArea.value);
      parseQuery();
    });
  }

  function startSort() {
    const inputArea = document.querySelector('#sort-select') as HTMLInputElement;
    if (searchParams.has('sort')) {
      inputArea.value = searchParams.get('sort') as string;
    }
    inputArea?.addEventListener('change', () => {
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

  // function startCategory() {
  //   const categoryBlock = document.querySelector('categoryBlock') as NodeListOf<HTMLInputElement>;
  //   console.log(categoryContainer);
  // }

  if (document.querySelector('.products')) {
    parseQuery();
    startSearch();
    startSort();
    startPosition();
    // startCategory();
  }
}

export default filters;
