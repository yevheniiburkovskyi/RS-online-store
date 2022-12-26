function startSearch() {
  const products: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.products__item');
  const inputArea = document.querySelector('.search-block__input') as HTMLInputElement;
  inputArea?.addEventListener('input', () => {
    const pattern = new RegExp(inputArea.value, 'ig');
    products.forEach((product) => {
      if (!pattern.test(product.dataset.title as string)) {
        product.style.display = 'none';
      } else {
        product.style.display = 'grid';
      }
    });
  });
}

export default startSearch;
