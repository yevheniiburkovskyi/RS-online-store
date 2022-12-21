import './index.html';
import { route, startRouting } from './modules/router/router';

startRouting();
const menuRow = document.querySelector('#main-nav');
menuRow?.addEventListener('click', route);
