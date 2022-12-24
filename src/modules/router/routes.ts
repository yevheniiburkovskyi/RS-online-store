import mainPage from '../../pages/main';
import { Create404Page } from '../../pages/page404';
import { IRoutes } from '../../types/types';

const routes: IRoutes = {
  '/': mainPage(),
  404: Create404Page(document.getElementById('main-page') as HTMLDivElement),
  '/cart': `cart`,
  '/details': `details`,
};
export default routes;
