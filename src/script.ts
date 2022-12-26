import './index.html';
import './scss/style.scss';

import { startRouting } from './modules/router/router';
import mainPage from './pages/main';
import startEvents from './modules/events';
import imgShow from './modules//imgShow';
import getData from './modules/services/getData';
import startSearch from './modules/filters/search';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    startEvents();
    startRouting();
    mainPage(data);
    startSearch();
    imgShow();
    startSearch();
  });
});
