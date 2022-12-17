import './index.html';
import route from './modules/router/router';

const menuRow = document.querySelector('#main-nav');

menuRow?.addEventListener('click', route);
