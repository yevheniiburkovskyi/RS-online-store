import detailsPage from '../pages/details';
import { IProduct } from '../types/types';
import { startRouting } from './router/router';
import { routes } from './router/routes';

function showDetails(content: HTMLElement, data: IProduct[]) {
  const productsItem = [...content.getElementsByClassName('products__item')] as Array<HTMLLinkElement>;
  routes['/'] = content.outerHTML;
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = detailsPage(
      item.href.split('/').slice(-1).toString(),
      data
    ).outerHTML;
  });
  localStorage.setItem('onlineStoreRoutes', JSON.stringify(routes));
  startRouting();
}
export default showDetails;
