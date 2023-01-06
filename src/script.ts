import './index.html';
import './scss/style.scss';

// import { startRouting } from './modules/router/router';
// import mainPage from './pages/mainPage/mainPage';
// import imgShow from './modules//imgShow';
// import getData from './modules/services/getData';
// import scrollUp from './modules/scroll';
import { addSummaryListeners, generateSummaryBar } from './pages/cartPage/summaryBar';

// window.addEventListener('DOMContentLoaded', () => {
//   getData().then((data) => {
//     startRouting();
//     mainPage(data);
//     imgShow();
//     scrollUp();
//   });
// });

document.querySelector('.cart')?.append(generateSummaryBar());
addSummaryListeners();
