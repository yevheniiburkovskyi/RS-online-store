import mainPage from '../../pages/main';
import create404Page from '../../pages/page404';
import { IRoutes } from '../../types/types';

const routes: IRoutes = {
  '/': mainPage(),
  404: create404Page().outerHTML,
  '/cart': `cart`,
  '/details': `details`,
};
export default routes;
