import '../scss/style.scss';

function CreateElement(parentElement: HTMLElement, tagName: string, className: string) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  parentElement.append(element);
}

function CreateFiltersBlock() {
  CreateElement(document.getElementById('main-page') as HTMLElement, 'div', 'filters-container');
  CreateElement(document.querySelector('.filters-container') as HTMLElement, 'div', 'filters-block');

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

export { CreateFiltersBlock };
