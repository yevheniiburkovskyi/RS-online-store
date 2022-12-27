import generateElement from '../modules/services/generateElement';
import { IProduct } from '../types/types';

function createTopBar(data: IProduct[]) {
  const row = generateElement('div', 'products__bar');
  const totalCount = generateElement('p', 'products__bar-total-count');
  const sortBuntns = generateElement('div', 'products__bar-sort');

  totalCount.innerHTML = `Showing: ${data.length}`;
  sortBuntns.innerHTML = `
  <select id="sort-select" class="products__bar-sort">
    <option value="price-ASC" selected>Sort by price ASC</option>
    <option value="price-DESC">Sort by price DESC</option>
  </select>
  `;
  const positionRow = generateElement('div', 'products__bar-position-row');
  row.append(totalCount, sortBuntns, positionRow);
  return row;
}
export default createTopBar;
