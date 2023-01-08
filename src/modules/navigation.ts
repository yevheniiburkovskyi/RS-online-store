import { route } from './router/router';
import getData from './services/getData';

function changeNavigation() {
  const catalogBtn = document.querySelector('#catalog-link') as HTMLDivElement;
  catalogBtn?.addEventListener('click', route);
  getData().then((data) => {
    const pathSpan = document.querySelector('.page-menu__path') as HTMLDivElement;
    pathSpan.innerHTML = '';
    const url = new URL(window.location.href);
    const pathUrl = url.pathname;
    if (pathUrl) {
      const pathUrlComponents = pathUrl.split('/');
      const urlId = Number(pathUrlComponents[pathUrlComponents.length - 1]);
      const productsArr = data;
      const product = productsArr?.filter((item) => item.id === urlId)[0];

      if (product && product.category === pathUrlComponents[pathUrlComponents.length - 2]) {
        pathSpan.textContent = ` / ${product.category} / ${product.brand} / ${product.title}`;
      } else {
        pathSpan.textContent = ` ${pathUrl}`;
      }
    }
  });
}

export default changeNavigation;
