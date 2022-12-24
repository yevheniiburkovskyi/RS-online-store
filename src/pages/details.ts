import generateElement from '../modules/services/generateElement';
import { IProduct } from '../types/types';

function detailsPage(id: number | string) {
  const productPage = generateElement('section', 'product');
  const productObj: IProduct = JSON.parse(localStorage.getItem('productsArr') as string).filter(
    (item: IProduct) => item.id === Number(id)
  )[0];
  productPage.innerHTML = `
  <div class="product__wrapper">
  <aside class="product__images">
    <ul class="product__images-choose">
      <li class="product__images-choose-item"><img src=${productObj.images[0]} alt="photo1">
      </li>
      <li class="product__images-choose-item"><img src=${productObj.images[1]} alt="photo2">
      </li>
      <li class="product__images-choose-item"><img src=${productObj.images[2]} alt="photo3">
      </li>
    </ul>
  </aside>
  <div class="product__big-img"><img src=${productObj.images[0]} alt="photo1"></div>
  <div class="product__about">
    <h3 class="product__title">${productObj.title}</h3>
    <p class="product__price">$${productObj.price}</p>
    <p class="product__descr">${productObj.description}</p>
    <a href="#" class="product__add-to-cart-btn">Add to cart</a>
    <a href="#" class="product__buy-now-btn">Buy now</a>
    <p class="product__rate"><span>Rate:</span>${productObj.rating}</p>
    <p class="product__stock"><span>Stock:</span>${productObj.stock}</p>
    <p class="product__brand"><span>Brand:</span>${productObj.brand}</p>
    <p class="product__category"><span>Category:</span>${productObj.category}</p>
  </div>
  </div>
  `;
  return productPage;
}

export default detailsPage;
