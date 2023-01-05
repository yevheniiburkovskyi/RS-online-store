import generateElement from '../modules/services/generateElement';
import { IProduct } from '../types/types';

function buildDetailsPage(id: number | string, data: IProduct[]) {
  const productPage = generateElement('section', 'product');
  const imagesList = generateElement('ul', 'product__images-choose');
  const productObj: IProduct = data.filter((item: IProduct) => item.id === Number(id))[0];

  const starsArr = Array(Math.round(productObj.rating)).fill('★');
  starsArr.length < 5 ? starsArr.push('☆') : starsArr;

  productObj.images.forEach((image) => {
    imagesList.innerHTML += `
    <li class="product__images-choose-item"><img src=${image} alt="photo1" loading="lazy">
    </li>
    `;
  });
  productPage.innerHTML = `
  <div class="product__wrapper">
  <aside class="product__images">
    ${imagesList.outerHTML}
  </aside>
  <div class="product__big-img"><img src=${productObj.images[0]} alt="photo1" loading="lazy"></div>
  <div class="product__about">
    <h3 class="product__title">${productObj.title}</h3>
    <p class="product__rating">${starsArr.join('')}</p>
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

export default buildDetailsPage;
