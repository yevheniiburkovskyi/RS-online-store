function filterData(str: string) {
  const productsArr: NodeListOf<HTMLLinkElement> = document.querySelectorAll('.products__item');
  const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
  const resArr: HTMLLinkElement[] = [];
  const pattern = new RegExp(str, 'ig');
  productsArr.forEach((product) => {
    charArr.forEach((char) => {
      if (pattern.test(product.dataset[char] as string)) {
        resArr.push(product);
      }
    });
  });
  productsArr.forEach((product) => {
    if (resArr.some((item) => item === product)) {
      product.style.display = 'grid';
    } else {
      product.style.display = 'none';
    }
  });
  return resArr;
}

export default filterData;
