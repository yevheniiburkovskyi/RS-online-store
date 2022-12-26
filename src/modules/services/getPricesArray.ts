import { IProduct } from '../../types/types';

function getPricesArray() {
  const prodArray: Array<IProduct> = JSON.parse(localStorage.getItem('productsArr') as string);
  const pricesArr: number[] = [];
  prodArray.forEach((e, i) => {
    const subObj = prodArray[i];
    pricesArr.push(subObj.price);
  });
  const finalArr = Array.from(new Set(pricesArr.sort((a, b) => a - b)));
  return finalArr;
}

function getStockArray() {
  const prodArray: Array<IProduct> = JSON.parse(localStorage.getItem('productsArr') as string);
  const pricesArr: number[] = [];
  prodArray.forEach((e, i) => {
    const subObj = prodArray[i];
    pricesArr.push(subObj.stock);
  });
  const finalArr = Array.from(new Set(pricesArr.sort((a, b) => a - b)));
  return finalArr;
}
export { getPricesArray, getStockArray };
