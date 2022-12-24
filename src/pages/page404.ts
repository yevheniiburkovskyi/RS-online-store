import '../scss/style.scss';

function Create404Page(element: HTMLDivElement) {
  element.innerHTML = 'PAGE NOT FOUND (404)';
  element.classList.add('page-404');
  return element;
}

export { Create404Page };
