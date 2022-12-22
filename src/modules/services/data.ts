async function getData() {
  const dataArr = [Response];
  const categories: Array<Response> = await fetch('https://dummyjson.com/products/categories').then((res) =>
    res.json()
  );
  categories.forEach(async (category) => {
    await fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((productArr) => dataArr.push(...productArr));
  });
  return dataArr;
}
export default getData;
