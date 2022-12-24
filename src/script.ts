import './index.html';
import './scss/style.scss';
import { route, startRouting } from './modules/router/router';
import mainPage from './pages/main';

window.addEventListener('DOMContentLoaded', () => {
  startRouting();
  mainPage();
  const menuRow = document.querySelector('#main-nav');
  menuRow?.addEventListener('click', route);
});
