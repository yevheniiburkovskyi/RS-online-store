import '../scss/style.scss';

function CreateElement(parentElement: HTMLElement, tagName: string, className: string, content?: string) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (content) element.innerHTML = content;
  parentElement.append(element);
}

function CreateFiltersBlock() {
  CreateElement(document.getElementById('main-page') as HTMLElement, 'div', 'filters-container');
  CreateElement(document.querySelector('.filters-container') as HTMLElement, 'div', 'filters-block');

  CreateElement(document.querySelector('.filters-block') as HTMLElement, 'div', 'filters-btns-block');
  CreateElement(
    document.querySelector('.filters-btns-block') as HTMLElement,
    'button',
    'filters-btns-block__reset-btn',
    'Reset Filters'
  );
  CreateElement(
    document.querySelector('.filters-btns-block') as HTMLElement,
    'button',
    'filters-btns-block__copy-link-btn',
    'Copy Link'
  );

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
