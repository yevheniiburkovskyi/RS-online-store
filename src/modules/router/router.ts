import startProductCardEvents from '../productCardEvents';
import changeNavigation from '../navigation';
import { routes } from './routes';
import Filters from '../filters/filters';
import updateProductProps from '../updateProductProps';
import { generateCategories, updateSliders } from '../../pages/mainPage/filtersBar';
import changeButtons from '../details/changeButtons';

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
  if (mainPage.querySelector('.products')) {
    startProductCardEvents();
    generateCategories();
    new Filters().startFilter();
    updateProductProps();
    updateSliders();
  } else if (mainPage.querySelector('.product')) {
    changeButtons();
  }
};

const startRouting = () => {
  window.onpopstate = handleLocation;
  window.route = route;
  handleLocation();
};
export { route, handleLocation, startRouting };
