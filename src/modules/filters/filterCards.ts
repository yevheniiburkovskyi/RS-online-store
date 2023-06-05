import { IQuery } from '../../types/types';

function filterData(queryObj: IQuery) {
  const queryMap = new Map(Object.entries(queryObj));
  const productsArr: Array<HTMLElement> = [
    ...(document.querySelectorAll('.products__item') as NodeListOf<HTMLElement>),
  ];
  const productsList = document.querySelector('.products__list') as HTMLUListElement;
  const emptyList = document.querySelector('.empty__list') as HTMLDivElement;

  productsList.style.display = 'grid';
  emptyList.style.display = 'none';

  let searchArr: HTMLElement[] = [];

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
    const pattern = new RegExp(queryMap.get('search') as string, 'ig');
    const matchArr = searchProducts(searchArr, pattern);
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
    const categoryArr = queryMap.get('brand')?.split('↕') as string[];
    const matchArr = searchBrand(searchArr, categoryArr);
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
    const matchArr = searchPriceAndStock(searchArr, priceArr, 'price');
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
    const matchArr = searchPriceAndStock(searchArr, stockArr, 'stock');
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

function sortProducts(arr: Array<HTMLElement>, param?: string) {
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

function searchProducts(productsArr: HTMLElement[], pattern: RegExp) {
  const matchArr: HTMLElement[] = [];
  const charArr = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
  productsArr.forEach((product) => {
    charArr.forEach((char) => {
      if (pattern.test(product.dataset[char] as string)) {
        matchArr.push(product);
      }
    });
  });
  return [...new Set(matchArr)];
}

function searchBrand(productsArr: HTMLElement[], categoryArr: string[]) {
  const matchArr: HTMLElement[] = [];
  productsArr.forEach((product) => {
    if (categoryArr?.includes(product.dataset.brand as string)) {
      matchArr.push(product);
    }
  });
  return matchArr;
}

function searchPriceAndStock(productsArr: HTMLElement[], pattern: string[], attribute: string) {
  const matchArr: HTMLElement[] = [];
  productsArr.forEach((product) => {
    const currentValue = Number(product.dataset[attribute]) as number;
    if (currentValue >= +pattern[0] && currentValue <= +pattern[1]) {
      matchArr.push(product);
    }
  });
  return matchArr;
}

export { sortProducts, searchProducts, searchBrand, searchPriceAndStock };
export default filterData;
