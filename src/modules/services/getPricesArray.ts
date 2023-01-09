function getPricesArray(
  propName: string,
  prodNodeList: NodeListOf<Element> | HTMLElement[] = document.querySelectorAll('.products__item')
) {
  const pricesArr: number[] = [];
  prodNodeList.forEach((e, i) => {
    const subObj = prodNodeList[i];
    pricesArr.push(+(subObj.getAttribute(`data-${propName}`) as string));
  });
  const finalArr = sortPricesArray(pricesArr);
  return finalArr;
}

function sortPricesArray(arr: number[]) {
  return Array.from(new Set(arr.sort((a, b) => a - b)));
}

export { sortPricesArray };
export default getPricesArray;
