import getData from './services/getData';

function changeNavigation() {
  getData().then((data) => {
    const pathSpan = document.querySelector('.page-menu__path') as HTMLDivElement;
    pathSpan.innerHTML = '';
    const url = new URL(window.location.href);
    const pathUrl = url.pathname;
    if (pathUrl) {
      const pathUrlComponents = pathUrl.split('/');
      const urlId = Number(pathUrlComponents[pathUrlComponents.length - 1]);
      const productsArr = data;
      if (typeof urlId === 'number') {
        const product = productsArr?.filter((item) => item.id === urlId)[0];
        if (product) {
          pathSpan.textContent = ` / ${product.category} / ${product.brand} / ${product.title}`;
        }
      }
    }
  });
}

export default changeNavigation;
