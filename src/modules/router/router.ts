import { IRoutes } from '../../types/types';
import routes from './routes';

const route = (event: Event | undefined) => {
  event = event || window.event;
  event?.preventDefault();
  const target = event?.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleLocation();
};

const handleLocation = async () => {
  let routesObj: IRoutes;

  if (localStorage.getItem('onlineStoreRoutes') !== null) {
    routesObj = JSON.parse(localStorage.getItem('onlineStoreRoutes') as string);
    console.log('storage');
  } else {
    routesObj = routes;
  }

  const path = window.location.pathname;
  const route = routesObj[path as keyof typeof routesObj] || routesObj[404];
  const mainPage = document.getElementById('main-page') as HTMLDivElement;

  if (typeof route === 'string') {
    mainPage.innerHTML = route;
  } else {
    mainPage.innerHTML = '';
    mainPage.append(route);
  }
};

const startRouting = () => {
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();
};
export { route, handleLocation, startRouting };
