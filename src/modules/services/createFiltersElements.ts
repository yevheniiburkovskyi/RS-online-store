import getFiltersCategoryObj from './getFiltersCategoryObj';
import generateElement from './generateElement';

function createFiltersElements(keyName: string, parentNodeSelector: string) {
  const categoriesObj = getFiltersCategoryObj(keyName);
  const categoriesArr = Object.getOwnPropertyNames(categoriesObj);
  categoriesArr.forEach((e) => {
    const LABEL = generateElement('label', 'category-block__item');
    LABEL.setAttribute('for', `${e}Filter`);
    const INPUT = generateElement('input', 'category-input');
    INPUT.setAttribute('type', `checkbox`);
    INPUT.setAttribute('id', `${e}Filter`);
    const SPAN = generateElement('span', 'category-items-counter');
    SPAN.innerHTML = ` (${categoriesObj[e as keyof typeof categoriesObj]}/${
      categoriesObj[e as keyof typeof categoriesObj]
    })`;
    LABEL.append(INPUT);
    LABEL.append(`${e}`);
    LABEL.append(SPAN);
    document.getElementById(parentNodeSelector)?.append(LABEL);
  });
}
export default createFiltersElements;
