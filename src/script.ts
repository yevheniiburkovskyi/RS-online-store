import './index.html';
import './scss/style.scss';

import { startRouting } from './modules/router/router';
import mainPage from './pages/mainPage';
import startEvents from './modules/events';
import imgShow from './modules//imgShow';
import getData from './modules/services/getData';
import filters from './modules/filters/filters';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    startEvents();
    startRouting();
    mainPage(data);
    imgShow();
    filters();
  });
});
