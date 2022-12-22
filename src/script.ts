import './index.html';
import { route, startRouting } from './modules/router/router';
import getData from './modules/services/data';

startRouting();
console.log(getData());
const menuRow = document.querySelector('#main-nav');
menuRow?.addEventListener('click', route);
