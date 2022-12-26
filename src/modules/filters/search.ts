import filterData from '../services/filterData';

function startSearch() {
  const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
  inputArea?.addEventListener('input', () => {
    filterData(inputArea.value);
  });
}

export default startSearch;
