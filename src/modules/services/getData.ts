import { ICategory } from '../../types/types';

async function getData() {
  const response = await fetch('https://dummyjson.com/products?limit=30&skip=10');
  const resObj: ICategory = await response.json();
  const data = resObj.products;
  return data;
}
export default getData;
