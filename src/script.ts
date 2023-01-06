import './index.html';
import './scss/style.scss';

import { addSummaryListeners } from './pages/cartPage/summaryBar';
import { startRouting } from './modules/router/router';
import mainPage from './pages/mainPage/mainPage';
import imgShow from './modules//imgShow';
import getData from './modules/services/getData';
import modaleValidateEvent from './modules/modalValidateEvent';
import scrollUp from './modules/scroll';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    startRouting();
    mainPage(data);
    imgShow();
    modaleValidateEvent();
    scrollUp();
  });
});

addSummaryListeners();
