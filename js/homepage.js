// SCROLL ANIMATIONS ----------------------------------------------
const animation_elements = document.querySelectorAll(
  '[data-scrollAni="upNdwn"]'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("upNdwn__restart--scroll");
        console.log(entry.target.classList);
      }
      // else {
      //     entry.target.classList.remove('upNdwn__restart--scroll');
      //     console.log(entry.target.classList);
      // }
    });
  },
  {
    threshold: 0.1,
  }
);

for (let i = 0; i < animation_elements.length; i++) {
  const el = animation_elements[i];

  observer.observe(el);
}

// WORKFLOW LIST DRAWER

const wrkFlwBtn = document.querySelectorAll('[data-wrkflw="button"]');
const wrkFlwBtnDesc = document.querySelectorAll('[data-wrkflw="desc"]');

for (let i = 0; i < wrkFlwBtn.length; i++) {
    wrkFlwBtn[i].addEventListener('click', () => {
        if (wrkFlwBtnDesc[i].classList.contains('wrkflw__btnDesc--hide')) {
            wrkFlwBtnDesc[i].classList.remove('wrkflw__btnDesc--hide')
        } else {
            wrkFlwBtnDesc[i].classList.add('wrkflw__btnDesc--hide')
        }
    });
}


