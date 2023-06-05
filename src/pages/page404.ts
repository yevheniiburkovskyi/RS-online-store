import '../scss/style.scss';

function create404Page() {
  const element = document.createElement('div');
  element.innerHTML = 'PAGE NOT FOUND (404)';
  element.classList.add('page-404');
  return element;
}

export default create404Page;
