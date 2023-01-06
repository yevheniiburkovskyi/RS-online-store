import './index.html';
import './scss/style.scss';

import { addSummaryListeners } from './pages/cartPage/summaryBar';
import { startRouting } from './modules/router/router';
import buildMainPage from './pages/mainPage/mainPage';
import detailsPageEvents from './modules/details/detailsPageEvents';
import getData from './modules/services/getData';
import modaleValidateEvent from './modules/modalValidateEvent';
import scrollUp from './modules/scroll';
import startCartEvents from './modules/cart/startCartEvents';
import buildCartPage from './pages/cartPage';
import updateHeader from './modules/cart/updateHeader';
import updateCartPage from './modules/cart/updateCartPage';

window.addEventListener('DOMContentLoaded', () => {
  getData().then((data) => {
    buildMainPage(data);
    buildCartPage(data);
    startRouting();
    if (document.querySelector('.products-in-cart')) {
      updateCartPage();
    }
    detailsPageEvents(data);
    modaleValidateEvent();
    scrollUp();
    startCartEvents(data);
    updateHeader();
    addSummaryListeners();
  });
});
