import { IProduct } from '../../types/types';

function getPricesArray(data: IProduct[]) {
  const prodArray = data;
  const pricesArr: number[] = [];
  prodArray.forEach((e, i) => {
    const subObj = prodArray[i];
    pricesArr.push(subObj.price);
  });
  const finalArr = Array.from(new Set(pricesArr.sort((a, b) => a - b)));
  return finalArr;
}

function getStockArray(data: IProduct[]) {
  const prodArray = data;
  const pricesArr: number[] = [];
  prodArray.forEach((e, i) => {
    const subObj = prodArray[i];
    pricesArr.push(subObj.stock);
  });
  const finalArr = Array.from(new Set(pricesArr.sort((a, b) => a - b)));
  return finalArr;
}
export { getPricesArray, getStockArray };
