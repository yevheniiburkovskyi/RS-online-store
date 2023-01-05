import buildDetailsPage from '../../pages/detailsPage';
import { IProduct } from '../../types/types';
import { routes } from './routes';

function createDeatilsRoutes(container: HTMLElement, content: HTMLElement, data: IProduct[]) {
  const productsItem = [...content.getElementsByClassName('products__item-row-detailsBtn')] as Array<HTMLLinkElement>;
  routes['/'] = container.outerHTML;
  productsItem.forEach((item) => {
    routes[`/${item.href.split('/').splice(-2, 2).join('/')}`] = buildDetailsPage(
      item.href.split('/').slice(-1).toString(),
      data
    ).outerHTML;
  });
}
export default createDeatilsRoutes;
