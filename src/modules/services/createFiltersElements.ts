import getFiltersCategoryObj from './getFiltersCategoryObj';
import generateElement from './generateElement';

function createFiltersElements(keyName: string, parentNodeSelector: string) {
  const categoriesObj = getFiltersCategoryObj(keyName);
  const categoriesArr = Object.getOwnPropertyNames(categoriesObj);
  categoriesArr.forEach((e) => {
    const label = generateElement('label', 'category-block__item');
    label.setAttribute('for', `${e}Filter`);
    const input = generateElement('input', 'category-input');
    input.setAttribute('type', `checkbox`);
    input.setAttribute('id', `${e}Filter`);
    const SPAN = generateElement('span', 'category-items-counter');
    SPAN.innerHTML = ` (${categoriesObj[e as keyof typeof categoriesObj]}/${
      categoriesObj[e as keyof typeof categoriesObj]
    })`;
    label.append(input);
    label.append(`${e}`);
    label.append(SPAN);
    document.getElementById(parentNodeSelector)?.append(label);
  });
}
export default createFiltersElements;
