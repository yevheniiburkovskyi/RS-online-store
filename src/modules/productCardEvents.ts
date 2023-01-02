import { route } from './router/router';

function startProductCardEvents() {
  const catalogBtn = document.querySelector('#catalog-link') as HTMLDivElement;
  catalogBtn?.addEventListener('click', route);

  const detailsBtns = document.querySelectorAll('.products__item-row-detailsBtn') as NodeListOf<HTMLLinkElement>;
  detailsBtns.forEach((btn) => {
    btn.addEventListener('click', route);
  });
  const detailsTitle = document.querySelectorAll('.products__item-title') as NodeListOf<HTMLLinkElement>;
  detailsTitle.forEach((btn) => {
    btn.addEventListener('click', route);
  });

  const productItems = document.querySelectorAll('.products__item-background') as NodeListOf<HTMLDivElement>;
  productItems.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
      const target = e.target as HTMLDivElement;
      (target.querySelector('.products__item-row') as HTMLDivElement).style.bottom = '50%';
    });
    item.addEventListener('mouseleave', (e) => {
      const target = e.target as HTMLDivElement;
      (target.querySelector('.products__item-row') as HTMLDivElement).style.bottom = '-50%';
    });
  });
}

export default startProductCardEvents;
