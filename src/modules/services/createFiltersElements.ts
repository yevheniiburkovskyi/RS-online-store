import getFiltersCategoryObj from './getFiltersCategoryObj';
import generateElement from './generateElement';

function createFiltersElements(keyName: string, parentNodeSelector: string) {
  const categoriesObj = getFiltersCategoryObj(keyName);
  const categoriesArr = Object.getOwnPropertyNames(categoriesObj);
  categoriesArr.forEach((e) => {
    const label = generateElement('label', `${keyName}-block__item`);
    label.setAttribute('for', `${e}Filter`);
    const input = generateElement('input', `${keyName}-input`) as HTMLInputElement;
    input.setAttribute('type', `checkbox`);
    input.setAttribute('id', `${e}Filter`);
    input.value = e;
    const span = generateElement('span', `${keyName}-items-counter`);
    span.setAttribute('id', `${keyName}${e}Count`);
    span.innerHTML = `${categoriesObj[e as keyof typeof categoriesObj]}`;
    label.append(input);
    label.append(`${e} (`);
    label.append(span);
    label.append(` /${categoriesObj[e as keyof typeof categoriesObj]})`);
    document.getElementById(parentNodeSelector)?.append(label);
  });
}
export default createFiltersElements;
