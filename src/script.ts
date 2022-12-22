import './index.html';
import './scss/style.scss';
import { route, startRouting } from './modules/router/router';
import { CreateFiltersBlock } from './modules/filter-home-page';

startRouting();
const menuRow = document.querySelector('#main-nav');
menuRow?.addEventListener('click', route);

CreateFiltersBlock();
