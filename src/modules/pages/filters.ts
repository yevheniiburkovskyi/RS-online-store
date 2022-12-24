import '../../scss/style.scss';
// import generateElement from '../services/generateElement';

function createFiltersBlock() {
  // const FILTERS = generateElement('div', 'filters-container');
  // (document.getElementById('main-page') as HTMLElement).append(FILTERS);
  // FILTERS.innerHTML = `
  // <div class='filters-block'>
  //   <div class='filters-btns-block'>
  //     <button class='filters-btns-block__reset-btn'>Reset Filters</button>
  //     <button class='filters-btns-block__copy-link-btn'>Copy Link</button>
  //   </div>
  // </div>`;

  document.querySelector('.cart-block__filters-icon')?.addEventListener('click', () => {
    document.querySelector('.filters-container')?.classList.toggle('filters-container_show');
    document.querySelector('.filters-block')?.classList.toggle('filters-block_show');
  });
  document.querySelector('.filters-container')?.addEventListener('click', function (this: HTMLElement) {
    if ((this as HTMLElement) === event?.target) {
      document.querySelector('.filters-container')?.classList.toggle('filters-container_show');
      document.querySelector('.filters-block')?.classList.toggle('filters-block_show');
    }
  });
}

export { createFiltersBlock };
