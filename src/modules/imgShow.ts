function imgShow() {
  const main = document.querySelector('#main-page');
  main?.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement;
    const parent = target.parentNode as HTMLLIElement;
    if (e.target && parent.classList.contains('product__images-choose-item')) {
      const bigImg = document.querySelector('.product__big-img') as HTMLDivElement;
      bigImg.innerHTML = target.outerHTML;
    }
  });
}

export default imgShow;
