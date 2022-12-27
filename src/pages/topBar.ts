import generateElement from '../modules/services/generateElement';
import { IProduct } from '../types/types';

function createTopBar(data: IProduct[]) {
  const row = generateElement('div', 'products__bar');
  const totalCount = generateElement('p', 'products__bar-total-count');
  const sortBuntns = generateElement('div', 'products__bar-sort');

  totalCount.innerHTML = `Showing: ${data.length}`;
  sortBuntns.innerHTML = `
  <select id="sort-select" class="products__bar-sort">
    <option value="value1">Значение 1</option>
    <option value="value2" selected>Значение 2</option>
  </select>
  `;
  const positionRow = generateElement('div', 'products__bar-position-row');
  row.append(totalCount, sortBuntns, positionRow);
  return row;
}
export default createTopBar;
