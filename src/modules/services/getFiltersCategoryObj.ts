function getFiltersCategoryObj(keyName: string) {
  const categoriesObj = {};
  const prodNodeList = document.querySelectorAll('.products__item');
  prodNodeList.forEach((e, i) => {
    const subObj = prodNodeList[i];
    const propName = subObj.getAttribute(`data-${keyName}`);
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
