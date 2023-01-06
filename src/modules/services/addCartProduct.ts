import { ICartItem } from '../../types/types';
import updateHeader from '../cart/updateHeader';

function addCartProduct(...productData: string[]) {
  const cartProductsArr: Array<ICartItem> = JSON.parse(localStorage.getItem('OnlineStoreCart') as string);
  const productCardObj: ICartItem = {
    id: Number(productData[0]),
    price: Number(productData[1]),
    stock: Number(productData[2]),
    count: 1,
    totalPrice: Number(productData[1]),
  };
  if (cartProductsArr) {
    if (!cartProductsArr.find((item) => item.id === Number(productCardObj.id))) {
      cartProductsArr.push(productCardObj);
    }
    localStorage.setItem('OnlineStoreCart', JSON.stringify(cartProductsArr));
  } else {
    const cartProductsArr = [productCardObj];
    localStorage.setItem('OnlineStoreCart', JSON.stringify(cartProductsArr));
  }
  updateHeader();
}

export default addCartProduct;
