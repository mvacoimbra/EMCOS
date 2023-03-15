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

