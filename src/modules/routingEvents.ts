import { route } from './router/router';

function startEvents() {
  const productsBlock = document.querySelector('.products__list');
  const catalogBtn = document.querySelector('#catalog-link') as HTMLDivElement;
  catalogBtn?.addEventListener('click', route);
  productsBlock?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const parent = target.parentNode as HTMLLinkElement;
    if (e.target && parent.classList.contains('products__item')) {
      route;
      target.parentNode?.addEventListener('click', route);
      parent.click();
    }
  });
}

export default startEvents;
