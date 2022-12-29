import './index.html';
import './scss/style.scss';

import { startRouting } from './modules/router/router';
import mainPage from './pages/mainPage';
import imgShow from './modules//imgShow';
import getData from './modules/services/getData';
import { generateCategories, updateFilters } from './pages/filtersPage';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    startRouting();
    mainPage(data);
    generateCategories();
    imgShow();
  });
});

document.querySelector('.store-logo')?.addEventListener('click', () => {
  if (document.querySelector('.products__item')?.getAttribute('style')) {
    updateFilters();
  }
});
document.querySelector('.store-logo')?.addEventListener('click', () => {
  if (!document.querySelector('.category-block__item')) {
    generateCategories();
  }
});
