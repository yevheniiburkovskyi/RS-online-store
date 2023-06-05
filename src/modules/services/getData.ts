import { ICategory } from '../../types/types';

async function getData(url: string) {
  const response = await fetch(url);
  const resObj: ICategory = await response.json();
  const data = resObj.products;
  return data;
}
export default getData;
