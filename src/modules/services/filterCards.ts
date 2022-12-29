function filterData(...queryArr: string[]) {
  let productsArr: Array<HTMLLinkElement> = [
    ...(document.querySelectorAll('.products__item') as NodeListOf<HTMLLinkElement>),
  ];
  const productsCount = document.querySelector('.products__bar-total-count') as HTMLParagraphElement;
  const productsList = document.querySelector('.products__list') as HTMLUListElement;
  const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
  const sortParams = ['price-ASC', 'price-DESC', 'rating-ASC', 'rating-DESC'];
  const gridParams = ['grid-3', 'grid-4', 'grid-5'];
  const sortParam = sortParams
    .filter((param) => {
      if (queryArr.find((query) => query === param)) {
        return param;
      }
    })
    .join('');
  const gridParam = gridParams
    .filter((param) => {
      if (queryArr.find((query) => query === param)) {
        return param;
      }
    })
    .join('');
  productsArr = sortProducts(productsArr, sortParam);
  productsList.style.cssText = `grid-template-columns: repeat(${gridParam.match(/\d/gi)?.join('')},1fr);`;
  productsList.innerHTML = '';
  productsArr.forEach((productCard) => {
    productsList.append(productCard);
  });
  const matchArr = queryArr.filter((char) => char !== sortParam && char != gridParam);
  function recursiveFilter(strArr: string[], dataArr: Array<HTMLLinkElement>): Array<HTMLLinkElement> {
    if (strArr.length < 1) {
      return dataArr;
    }
    let resArr: Array<HTMLLinkElement> = [];
    const pattern = new RegExp(strArr[0], 'ig');
    dataArr.forEach((product) => {
      charArr.forEach((char) => {
        if (pattern.test(product.dataset[char] as string)) {
          resArr.push(product);
        }
      });
    });
    resArr = [...new Set(resArr)];
    dataArr.forEach((product) => {
      if (resArr.find((item) => item === product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    productsArr = resArr;
    strArr.splice(0, 1);
    productsCount.textContent = `Found: ${resArr.length} of ${dataArr.length}`;
    return recursiveFilter(strArr, productsArr);
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
    case 'rating-ASC':
      arr.sort((a, b) => Number(a.dataset.rating) - Number(b.dataset.rating));
      break;
    case 'rating-DESC':
      arr.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
      break;
    default:
      arr.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
  }
  return arr;
}

export default filterData;
