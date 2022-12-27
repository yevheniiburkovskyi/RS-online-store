// import { routes } from '../router/routes';
import filterData from '../services/filterCards';

function filters() {
  const url = new URL(window.location.href);
  const queryUrl = url.search;
  const searchParams = new URLSearchParams(queryUrl);
  function parseQuery() {
    const queryArr: string[] = [];
    searchParams.forEach((item) => {
      queryArr.push(item);
    });
    return filterData(...queryArr);
  }

  function changeUrl(topic: string, ...queryArr: string[]) {
    queryArr.forEach((item) => {
      searchParams.set(topic, item);
    });
    if (queryArr.length === 1 && queryArr[0] === '') {
      searchParams.delete(topic);
      window.history.pushState({}, '', `.`);
    } else {
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    }
    (document.querySelector('#page-menu > a') as HTMLLinkElement).href = window.location.href;
    // console.log((document.querySelector('#page-menu > a') as HTMLLinkElement).href);
    // routes[window.location.href] = (document.querySelector('.products') as HTMLDivElement).outerHTML;
  }

  function startSearch() {
    const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
    if (searchParams.has('search')) {
      inputArea.value = searchParams.get('search') as string;
    }
    inputArea?.addEventListener('input', () => {
      inputArea.value = inputArea.value.replace(/[^a-z0-9]/, '');
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

  if (document.querySelector('.products')) {
    parseQuery();
    startSearch();
    startSort();
  }
}

export default filters;
