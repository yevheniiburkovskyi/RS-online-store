function filterData(...queryArr: string[]) {
  let productsArr: Array<HTMLLinkElement> = [
    ...(document.querySelectorAll('.products__item') as NodeListOf<HTMLLinkElement>),
  ];
  const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
  const matchArr = queryArr;

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

export default filterData;
