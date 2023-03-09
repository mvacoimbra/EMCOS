// SCROLL ANIMATIONS ----------------------------------------------
const animation_elements = document.querySelectorAll(
  '[data-scrollAni="upNdwn"]'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("upNdwn__restart--scroll");
        // console.log(entry.target.classList);
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
const wrkFlwBtnIcon = document.querySelectorAll('[data-wrkflw="btnIcon"]');

for (let i = 0; i < wrkFlwBtn.length; i++) {
    wrkFlwBtn[i].addEventListener('click', () => {
        if (wrkFlwBtnDesc[i].classList.contains('wrkflw__btnDesc--hide')) {
            wrkFlwBtnDesc[i].classList.remove('wrkflw__btnDesc--hide');
            wrkFlwBtnIcon[i].classList.add('wrkflw__btn--active');
        } else {
            wrkFlwBtnDesc[i].classList.add('wrkflw__btnDesc--hide');
            wrkFlwBtnIcon[i].classList.remove('wrkflw__btn--active');
        }
    });
}

// // SCREEN TOP FORCED
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// }

// DARK THEME
let drkBtn = document.querySelector('[data-theme="btn"]');
let drkLogo = document.querySelector('[data-theme="logo"]')

drkBtn.addEventListener('click', ()=> {
  document.body.classList.toggle('darkTheme')
  if(document.body.classList.contains("darkTheme")) {
    drkLogo.src = "imgs/header/emcos-logo-white.png";
    drkBtn.classList.remove("fa-moon");
    drkBtn.classList.add("fa-sun");
    
  } else {
    drkLogo.src = "imgs/header/emcos-logo.png"
    drkBtn.classList.remove("fa-sun");
    drkBtn.classList.add("fa-moon");
  }
});

// SCROLL CONTROL

let aboutBtn = document.querySelector('[data-scrollCrtl="aboutBtn"]');
let projectsBtn = document.querySelector('[data-scrollCrtl="projectsBtn"]');
let topBtn = document.querySelector('[data-scrollCrtl="topBtn"]')

let aboutAnchor = document.querySelector('[data-scrollCrtl="aboutSrcl"]');
let mvvAnchor = document.querySelector('[data-scrollCrtl="mvvScrl"]');
let wrkFlwAnchor = document.querySelector('[data-scrollCrtl="wrkflwScrl"]')
let projectsAnchor = document.querySelector('[data-scrollCrtl="projectSrcl"]');

topBtn.addEventListener('click', ()=> {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

aboutBtn.addEventListener('click', ()=> {
  window.scroll({
    top: aboutAnchor.scrollHeight,
    left: 0,
    behavior: "smooth",
  });
});

projectsBtn.addEventListener('click', ()=> {
  let scrollY = (aboutAnchor.scrollHeight + mvvAnchor.scrollHeight + wrkFlwAnchor.scrollHeight + projectsAnchor.scrollHeight) - 30
  window.scroll({
    top: scrollY,
    left: 0,
    behavior: "smooth",
  });
});



