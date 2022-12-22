async function getData() {
  const productsCategoriesLinksArr: Array<string> = [];
  await fetch('https://dummyjson.com/products/categories')
    .then((res) => res.json())
    .then((categories: Array<string>) => {
      categories.forEach((category) => {
        productsCategoriesLinksArr.push(`https://dummyjson.com/products/category/${category}`);
      });
    });
  const productsArr: Array<object> = [];
  Promise.all(
    productsCategoriesLinksArr.map((url) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => productsArr.push(data.products));
    })
  );
  console.log(productsArr);
  return productsArr;
}
export default getData;
