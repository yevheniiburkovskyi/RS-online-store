function scrollUp() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const btn = document.querySelector('.page-up') as HTMLLinkElement;
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1400) {
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0';
    }
  });
  for (const anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const goto = anchor.getAttribute('href') as string;
      document.querySelector(goto)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}

export default scrollUp;
