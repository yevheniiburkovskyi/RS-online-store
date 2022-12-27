function filterData(...queryArr: string[]) {
  let productsArr: Array<HTMLLinkElement> = [
    ...(document.querySelectorAll('.products__item') as NodeListOf<HTMLLinkElement>),
  ];
  const productsList = document.querySelector('.products__list') as HTMLUListElement;
  const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
  const sortParams = ['price-ASC', 'price-DESC'];
  const sortParam = sortParams.filter((param) => {
    if (queryArr.find((query) => query === param)) {
      return param;
    }
  })[0];

  productsArr = sortProducts(productsArr, sortParam);
  productsList.innerHTML = '';
  productsArr.forEach((productCard) => {
    productsList.append(productCard);
  });
  const matchArr = queryArr.filter((char) => !sortParams.find((item) => item === char));

  function recursiveFilter(strArr: string[], dataArr: Array<HTMLLinkElement>): Array<HTMLLinkElement> {
    if (strArr.length < 1) {
      return dataArr;
    }
    const resArr: Array<HTMLLinkElement> = [];
    const pattern = new RegExp(strArr[0], 'ig');
    dataArr.forEach((product) => {
      charArr.forEach((char) => {
        if (pattern.test(product.dataset[char] as string)) {
          resArr.push(product);
        }
      });
    });

    dataArr.forEach((product) => {
      if (resArr.some((item) => item === product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    productsArr = resArr;
    matchArr.splice(0, 1);
    return recursiveFilter(matchArr, productsArr);
  }
  recursiveFilter(matchArr, productsArr);
}

function sortProducts(arr: Array<HTMLLinkElement>, param?: string) {
  switch (param) {
    case 'price-ASC':
      arr.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
      break;
    case 'price-DESC':
      arr.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
      break;
    default:
      arr.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
  }
  return arr;
}

export default filterData;
