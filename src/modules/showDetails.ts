import { route, startRouting } from './router/router';
import routes from './router/routes';

function showDetails(content: HTMLElement) {
  const productsItem: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.products__item');
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = item.href.split('/').splice(-2, 2).join('/');
    item.addEventListener('click', () => {
      routes['/'] = content.outerHTML;
      localStorage.setItem('onlineStoreRoutes', JSON.stringify(routes));
      startRouting();
      route;
    });
  });
}
export default showDetails;
