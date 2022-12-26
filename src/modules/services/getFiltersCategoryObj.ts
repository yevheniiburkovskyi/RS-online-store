import { IProduct } from '../../types/types';

function getFiltersCategoryObj(keyName: string, data: IProduct[]) {
  const prodArray = data;
  const categoriesObj = {};
  prodArray.forEach((e, i) => {
    const subObj = prodArray[i];
    const propName = subObj[keyName as keyof typeof subObj];
    if (!Object.prototype.hasOwnProperty.call(categoriesObj, propName as string)) {
      Object.defineProperty(categoriesObj, propName as string, {
        value: 1,
        writable: true,
      });
    } else {
      (categoriesObj[propName as keyof typeof categoriesObj] as number) += 1;
    }
  });
  return categoriesObj;
}
export default getFiltersCategoryObj;
