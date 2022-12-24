import routes from './routes';
import { Create404Page } from '../../pages/page404';

const route = (event: Event | undefined) => {
  event = event || window.event;
  event?.preventDefault();
  const target = event?.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path as keyof typeof routes] || routes[404];
  const mainPage = document.getElementById('main-page') as HTMLDivElement;
  mainPage.innerHTML = route;
  if (route === routes[404]) {
    Create404Page(mainPage);
  }
};

const startRouting = () => {
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();
};
export { route, handleLocation, startRouting };
