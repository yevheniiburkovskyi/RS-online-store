function generateElement(tag: string, selector: string) {
  const element = document.createElement(tag);
  element.classList.add(selector);
  return element;
}
export default generateElement;
