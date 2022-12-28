import generateElement from '../modules/services/generateElement';
import { IProduct } from '../types/types';

function createTopBar(data: IProduct[]) {
  const row = generateElement('div', 'products__bar');
  const totalCount = generateElement('p', 'products__bar-total-count');
  const sortBuntns = generateElement('div', 'products__bar-sort');

  totalCount.innerHTML = `Found: ${data.length} of ${data.length}`;
  sortBuntns.innerHTML = `
  <select id="sort-select" class="products__bar-sort">
    <option value="price-ASC" selected>Sort by price ASC</option>
    <option value="price-DESC">Sort by price DESC</option>
    <option value="rating-ASC" selected>Sort by rating ASC</option>
    <option value="rating-DESC">Sort by rating DESC</option>
  </select>
  `;
  const positionRow = generateElement('div', 'products__bar-position-row');
  row.append(totalCount, sortBuntns, positionRow);
  return row;
}
export default createTopBar;
