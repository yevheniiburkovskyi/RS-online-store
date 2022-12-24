import './index.html';
import './scss/style.scss';
import { startRouting } from './modules/router/router';
import mainPage from './pages/main';
import startEvents from './modules/events';

window.addEventListener('DOMContentLoaded', () => {
  startRouting();
  mainPage();
  startEvents();
});
