import getFiltersCategoryObj from './getFiltersCategoryObj';
import generateElement from './generateElement';
import { IProduct } from '../../types/types';

function createFiltersElements(keyName: string, parentNodeSelector: string, data: IProduct[]) {
  const categoriesObj = getFiltersCategoryObj(keyName, data);
  const categoriesArr = Object.getOwnPropertyNames(categoriesObj);
  categoriesArr.forEach((e) => {
    const label = generateElement('label', 'category-block__item');
    label.setAttribute('for', `${e}Filter`);
    const input = generateElement('input', 'category-input');
    input.setAttribute('type', `checkbox`);
    input.setAttribute('id', `${e}Filter`);
    const span = generateElement('span', 'category-items-counter');
    span.innerHTML = ` (${categoriesObj[e as keyof typeof categoriesObj]}
      /${categoriesObj[e as keyof typeof categoriesObj]})`;
    label.append(input);
    label.append(`${e}`);
    label.append(span);
    document.getElementById(parentNodeSelector)?.append(label);
  });
}
export default createFiltersElements;
