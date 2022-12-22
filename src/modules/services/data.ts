async function getData() {
  const productsCategoriesLinksArr: Array<string> = [];
  const productsArr: Array<object> = [];
  await fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories: Array<string>) => {
      categories.forEach((category) => {
        productsCategoriesLinksArr.push(`https://dummyjson.com/products/category/${category}`);
      });
    });
  Promise.all(
    productsCategoriesLinksArr.map((url) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => productsArr.push(data.products));
    })
  );
  return productsArr;
}
export default getData;
