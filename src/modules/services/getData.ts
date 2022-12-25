import { ICategory, IProduct } from '../../types/types';

const productsArr: Array<IProduct> = JSON.parse(localStorage.getItem('productsArr') as string);

async function getData() {
  const response = await fetch('https://dummyjson.com/products?limit=30&skip=70');
  const resObj: ICategory = await response.json();
  const data = resObj.products;
  localStorage.setItem('productsArr', JSON.stringify(data));
  return data;
}
export default getData;
export { productsArr };
