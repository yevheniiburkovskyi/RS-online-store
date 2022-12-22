import { IRoutes } from '../../types/types';
import mainPage from '../pages/main';

const routes: IRoutes = {
  '/': mainPage(),
  404: `404`,
  '/cart': `cart`,
  '/details': `details`,
};
export default routes;
