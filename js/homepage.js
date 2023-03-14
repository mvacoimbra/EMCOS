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

// SCREEN TOP FORCED
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

// DARK THEME
let drkBtn = document.querySelectorAll('[data-theme="btn"]');
let drkLogo = document.querySelector('[data-theme="logo"]');

for (let i = 0; i < drkBtn.length; i++) {
  drkBtn[i].addEventListener('click', ()=> {
    document.body.classList.toggle('darkTheme')
    if(document.body.classList.contains("darkTheme")) {
      drkLogo.src = "imgs/header/emcos-logo-white.png";
      drkBtn[i].classList.remove("fa-moon");
      drkBtn[i].classList.add("fa-sun");
      
    } else {
      drkLogo.src = "imgs/header/emcos-logo.png"
      drkBtn[i].classList.remove("fa-sun");
      drkBtn[i].classList.add("fa-moon");
    }
  });
}

// SCROLL CONTROL
let aboutBtn = document.querySelectorAll('[data-scrollCrtl="aboutBtn"]');
let projectsBtn = document.querySelectorAll('[data-scrollCrtl="projectsBtn"]');
let topBtn = document.querySelector('[data-scrollCrtl="topBtn"]')

let navAnchor = document.querySelector('[data-scrollCrtl="navSrcl"]')
let slideAnchor = document.querySelector('[data-scrollCrtl="slideSrcl"]');
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

for (let i = 0; i < aboutBtn.length; i++) {
  aboutBtn[i].addEventListener('click', ()=> {
    window.scroll({
      top: slideAnchor.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  });

  projectsBtn[i].addEventListener('click', ()=> {
    let scrollY = (navAnchor.scrollHeight + slideAnchor.scrollHeight + aboutAnchor.scrollHeight + mvvAnchor.scrollHeight + wrkFlwAnchor.scrollHeight)
    window.scroll({
      top: scrollY,
      left: 0,
      behavior: "smooth",
    });
  });
}

// MOBILE NAVBAR
const shwBtn = document.querySelector('[data-mblNav="showBtn"]');
const navMenu = document.querySelector('[data-mblNav="nav-menu"]');

shwBtn.addEventListener('click', ()=> {
  if (navMenu.classList.contains('mblnav__container--active')) {
    navMenu.classList.remove('mblnav__container--active');
  } else {
    navMenu.classList.add('mblnav__container--active');
  }
});

