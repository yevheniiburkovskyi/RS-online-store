import { ICategory } from '../../types/types';

async function getData() {
  const response = await fetch('https://dummyjson.com/products?limit=20&skip=5');
  const resObj: ICategory = await response.json();
  const productArr = resObj.products;
  localStorage.setItem('productsArr', JSON.stringify(productArr));
  return productArr;
}
export default getData;
