import './index.html';
import './scss/style.scss';
import { route, startRouting } from './modules/router/router';
window.addEventListener('DOMContentLoaded', () => {
  startRouting();
  const menuRow = document.querySelector('#main-nav');
  menuRow?.addEventListener('click', route);
});
