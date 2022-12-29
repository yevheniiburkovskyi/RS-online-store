import detailsPage from '../pages/detailsPage';
import { IProduct } from '../types/types';
import { startRouting } from './router/router';
import { routes } from './router/routes';

function showDetails(container: HTMLElement, content: HTMLElement, data: IProduct[]) {
  const productsItem = [...content.getElementsByClassName('products__item')] as Array<HTMLLinkElement>;
  routes['/'] = container.outerHTML;
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = detailsPage(
      item.href.split('/').slice(-1).toString(),
      data
    ).outerHTML;
  });
  startRouting();
}
export default showDetails;
