import mainPage from '../../pages/main';
import { IRoutes } from '../../types/types';

const routes: IRoutes = {
  '/': mainPage(),
  404: `404`,
  '/cart': `cart`,
  '/details': `details`,
};
export default routes;
