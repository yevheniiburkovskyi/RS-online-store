// import { route } from './router/router';
import detailsPage from '../pages/details';
import { route, startRouting } from './router/router';
import { routes } from './router/routes';

function showDetails(content: HTMLElement) {
  const productsItem: NodeListOf<HTMLLinkElement> = content.querySelectorAll('.products__item');
  routes['/'] = content.outerHTML;
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = detailsPage(
      item.href.split('/').slice(-1).toString()
    ).outerHTML;
    item.addEventListener('click', (e) => {
      e.preventDefault();
      route;
    });
  });
  localStorage.setItem('onlineStoreRoutes', JSON.stringify(routes));
  startRouting();
}
export default showDetails;
