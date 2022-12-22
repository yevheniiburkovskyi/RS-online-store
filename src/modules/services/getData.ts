import { ICategory } from '../../types/types';

async function getData() {
  const response = await fetch('https://dummyjson.com/products/categories');
  const categories: Array<string> = await response.json();
  const res = categories.map(async (category: string) => {
    return await fetch(`https://dummyjson.com/products/category/${category}`).then((res) => res.json());
  });
  const promiseArr = await Promise.all(res).then((data: Array<ICategory>) => data.map((item) => item.products));
  return promiseArr;
}
export default getData;
