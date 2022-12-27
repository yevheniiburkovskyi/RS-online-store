import startEvents from '../routingEvents';
import changeNavigation from '../navigation';
import { routes } from './routes';

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

  if (typeof route === 'string') {
    mainPage.innerHTML = route;
  } else {
    mainPage.innerHTML = '';
    mainPage.append(route);
  }
  changeNavigation();
  startEvents();
};

const startRouting = () => {
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();
};
export { route, handleLocation, startRouting };
