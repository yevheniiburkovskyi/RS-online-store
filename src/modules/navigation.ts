import { IProduct } from '../types/types';

function changeNavigation() {
  enum homeUrl {
    localHost = 'http://localhost:4200/',
  }
  const menu = document.querySelector('#page-menu') as HTMLDivElement;
  const menuBtn = `<a href="/">Catalog</a>`;
  menu.innerHTML = menuBtn;
  const pattern = new RegExp(homeUrl.localHost, 'ig');
  const currentUrl = `${window.location.href}`;
  const pathUrl = currentUrl.replace(pattern, '');
  if (pathUrl && localStorage.getItem('productsArr') !== null) {
    const pathUrlComponents = pathUrl.split('/');
    const urlId = Number(pathUrlComponents[pathUrlComponents.length - 1]);
    const productsArr: Array<IProduct> = JSON.parse(localStorage.getItem('productsArr') as string);
    if (typeof urlId === 'number') {
      const product = productsArr.filter((item) => item.id === urlId)[0];
      if (product) {
        menu.innerHTML += ` / ${product.category} / ${product.brand} / ${product.title}`;
      }
    }
  }
}

export default changeNavigation;
