import filterData from '../services/filterData';

function filters() {
  const url = new URL(window.location.href);
  const queryUrl = url.search;
  const searchParams = new URLSearchParams(queryUrl);

  function parseQuery() {
    const queryArr: string[] = [];
    searchParams.forEach((item) => {
      queryArr.push(item);
    });
    return queryArr;
  }

  function changeUrl(topic: string, ...queryArr: string[]) {
    queryArr.forEach((item) => {
      searchParams.set(topic, item);
    });
    if (queryArr.length === 1 && queryArr[0] === '') {
      window.history.pushState({}, '', '.');
    } else {
      window.history.pushState({}, '', `?${searchParams.toString()}`);
    }
  }

  function startSearch() {
    const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
    inputArea?.addEventListener('input', () => {
      changeUrl('search', inputArea.value);
      filterData(inputArea.value);
    });
  }
  parseQuery();
  startSearch();
}

export default filters;
