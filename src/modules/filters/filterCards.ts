import { IQuery } from '../../types/types';

function filterData(queryObj: IQuery) {
  const queryMap = new Map(Object.entries(queryObj));
  const productsArr: Array<HTMLLinkElement> = [
    ...(document.querySelectorAll('.products__item') as NodeListOf<HTMLLinkElement>),
  ];
  const productsList = document.querySelector('.products__list') as HTMLUListElement;
  const emptyList = document.querySelector('.empty__list') as HTMLDivElement;

  productsList.style.display = 'grid';
  emptyList.style.display = 'none';

  let searchArr: HTMLLinkElement[] = [];

  if (queryMap.has('sort')) {
    sortProducts(productsArr, queryMap.get('sort'));
    productsList.innerHTML = '';
    productsArr.forEach((productCard) => {
      productsList.append(productCard);
    });
  }

  if (queryMap.has('grid')) {
    productsList.style.cssText = `grid-template-columns: repeat(${queryMap.get('grid')},1fr);`;
  }

  if (queryMap.has('category')) {
    const categoryArr = queryMap.get('category')?.split('↕');
    productsArr.forEach((product) => {
      if (categoryArr?.includes(product.dataset.category as string)) {
        product.style.display = 'grid';
        searchArr.push(product);
      } else {
        product.style.display = 'none';
      }
    });
  } else {
    productsArr.forEach((product) => {
      product.style.display = 'grid';
      searchArr.push(product);
    });
  }

  if (queryMap.has('search')) {
    const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
    const pattern = new RegExp(queryMap.get('search') as string, 'ig');
    let matchArr: HTMLLinkElement[] = [];
    searchArr.forEach((product) => {
      charArr.forEach((char) => {
        if (pattern.test(product.dataset[char] as string)) {
          matchArr.push(product);
        }
      });
    });
    matchArr = [...new Set(matchArr)];
    searchArr.forEach((product) => {
      if (matchArr.includes(product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    searchArr = matchArr;
  }

  if (queryMap.has('brand')) {
    const categoryArr = queryMap.get('brand')?.split('↕');
    const matchArr: HTMLLinkElement[] = [];
    searchArr.forEach((product) => {
      if (categoryArr?.includes(product.dataset.brand as string)) {
        matchArr.push(product);
      }
    });
    searchArr.forEach((product) => {
      if (matchArr.includes(product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    searchArr = matchArr;
  }

  if (queryMap.has('price')) {
    const priceArr = queryMap.get('price')?.split('↕') as Array<string>;
    const matchArr: HTMLLinkElement[] = [];
    searchArr.forEach((product) => {
      const currentPrice = Number(product.dataset['price']) as number;
      if (currentPrice >= +priceArr[0] && currentPrice <= +priceArr[1]) {
        matchArr.push(product);
      }
    });
    searchArr.forEach((product) => {
      if (matchArr.includes(product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    searchArr = matchArr;
  }

  if (queryMap.has('stock')) {
    const stockArr = queryMap.get('stock')?.split('↕') as Array<string>;
    const matchArr: HTMLLinkElement[] = [];
    searchArr.forEach((product) => {
      const currentPrice = Number(product.dataset['stock']) as number;
      if (currentPrice >= +stockArr[0] && currentPrice <= +stockArr[1]) {
        matchArr.push(product);
      }
    });
    searchArr.forEach((product) => {
      if (matchArr.includes(product)) {
        product.style.display = 'grid';
      } else {
        product.style.display = 'none';
      }
    });
    searchArr = matchArr;
  }

  (
    document.querySelector('.products__bar-total-count') as HTMLParagraphElement
  ).textContent = `Found: ${searchArr.length} of ${productsArr.length}`;

  if (searchArr.length === 0) {
    productsList.style.display = 'none';
    emptyList.style.display = 'flex';
  }
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
      arr.sort(() => Math.random() - 0.5);
  }
  return arr;
}

export default filterData;
