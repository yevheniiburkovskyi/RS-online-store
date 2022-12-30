import './index.html';
import './scss/style.scss';

import { startRouting } from './modules/router/router';
import mainPage from './pages/mainPage';
import imgShow from './modules//imgShow';
import getData from './modules/services/getData';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    startRouting();
    mainPage(data);
    imgShow();
  });
});
