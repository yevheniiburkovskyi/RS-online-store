import detailsPage from '../pages/details';
import { startRouting } from './router/router';
import { routes } from './router/routes';

function showDetails(content: HTMLElement) {
  const productsItem = [...content.getElementsByClassName('products__item')] as Array<HTMLLinkElement>;
  routes['/'] = content.outerHTML;
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = detailsPage(
      item.href.split('/').slice(-1).toString()
    ).outerHTML;
  });
  localStorage.setItem('onlineStoreRoutes', JSON.stringify(routes));
  startRouting();
}
export default showDetails;
