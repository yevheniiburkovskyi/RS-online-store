import generateElement from '../../modules/services/generateElement';
import { IProduct } from '../../types/types';

function createTopBar(data: IProduct[]) {
  const row = generateElement('div', 'products__bar');
  const totalCount = generateElement('p', 'products__bar-total-count');
  const sortBuntns = generateElement('div', 'products__bar-sort');
  const positionRow = generateElement('div', 'products__bar-position-row');
  positionRow.id = 'position-select';
  totalCount.innerHTML = `Found: ${data.length} of ${data.length}`;
  sortBuntns.innerHTML = `
  <select id="sort-select" class="products__bar-sort-select">
    <option value="default" selected>Default(random)</option>
    <option value="price-ASC">Sort by price: low to high</option>
    <option value="price-DESC">Sort by price: high to low</option>
    <option value="rating-ASC">Sort by rating: low to high</option>
    <option value="rating-DESC">Sort by rating: high to low</option>
  </select>
  `;
  positionRow.innerHTML = `
  <div class="products__bar-position-row-3" data-position="3">
    <p></p>
    <p></p>
    <p></p>
  </div>
  <div class="products__bar-position-row-4 products__bar-position-row-active" data-position="4">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
  </div>
  <div class="products__bar-position-row-5" data-position="5">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
  </div>
  `;
  row.append(totalCount, sortBuntns, positionRow);
  return row;
}
export default createTopBar;
