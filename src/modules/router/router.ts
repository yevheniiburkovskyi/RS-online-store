const route = (event: Event | undefined) => {
  event = event || window.event;
  event?.preventDefault();
  const target = event?.target as HTMLLinkElement;
  window.history.pushState({}, '', target.href);
  handleLocation();
};

const routes = {
  '/': 'home',
  404: `404`,
  '/about': `about`,
  '/lorem': `lorem`,
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path as keyof typeof routes] || routes[404];
  // const html = await fetch(route).then((data) => data.text());
  // console.log(html);
  const mainPage = document.getElementById('main-page') as HTMLDivElement;
  mainPage.innerHTML = route;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
export default route;
