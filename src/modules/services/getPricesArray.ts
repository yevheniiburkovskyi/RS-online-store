function getPricesArray(
  propName: string,
  prodNodeList: NodeListOf<Element> | HTMLElement[] = document.querySelectorAll('.products__item')
) {
  const pricesArr: number[] = [];
  prodNodeList.forEach((e, i) => {
    const subObj = prodNodeList[i];
    pricesArr.push(+(subObj.getAttribute(`data-${propName}`) as string));
  });
  const finalArr = Array.from(new Set(pricesArr.sort((a, b) => a - b)));
  return finalArr;
}

export { getPricesArray };
