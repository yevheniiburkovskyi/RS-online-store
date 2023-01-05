import './index.html';
import './scss/style.scss';

import { startRouting } from './modules/router/router';
import buildMainPage from './pages/mainPage/mainPage';
import imgShow from './modules//imgShow';
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
    updateCartPage();
    imgShow();
    modaleValidateEvent();
    scrollUp();
    startCartEvents(data);
    updateHeader();
  });
});
