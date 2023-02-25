'use strict'
// seletores data pra selecionar os elementos correspondentes no HTML
const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlWrapper = document.querySelector('[data-slide="controls-wrapper"]');
let slideItems = document.querySelectorAll('[data-slide="item"]');
let controlButtons
let slideInterval

// variáveis com uso múltiplo nas funções do carrossel
const state = {
    startingPoint: 0,
    savedPosition: 0,
    currentPoint: 0,
    movement: 0,
    currentSlideIndex: 0,
    autoPlay: true,
    timeInterval: 0
}

// função que "move" o slide para a posição de destaque
function translateSlide({ position }) {
    slideList.style.transform = `translateX(${position}px)`;
    state.savedPosition = position;
}

// função que determina a posição do slide
function getCenterPosition({ index }) {
    const slideItem = slideItems[index];
    const slideWidth = slideItem.clientWidth;
    // cálculo da margem para centralizar o slide
    const windowWidth = document.body.clientWidth;
    const margin = (windowWidth - slideWidth) / 2;
    const position = margin - (index * slideWidth);
    return position;
}

// função que determina o slide que entrará em destaque
function setVisibleSlide({ index, animate }) {
    if (index === 0 || index === slideItems.length - 1) {
        index = state.currentSlideIndex;
    }

    const position = getCenterPosition({ index })
    state.currentSlideIndex = index;
    slideList.style.transition = animate ? 'transform 1s' : 'none';
    activeControlButton({ index });
    translateSlide({ position });
}

// função que calcula a posição do próximo slide
function nextSlide() {
    setVisibleSlide({index: state.currentSlideIndex + 1, animate: true});
}

// função que calcula a posição do slide anterior
function previousSlide() {
    setVisibleSlide({index: state.currentSlideIndex - 1, animate: true});
}

// função que cria os botões bolinhas no HMTL e atribui as classes desejadas automáticamente baseado na quantidade de slide items
function createControlButtons() {
    slideItems.forEach(function(){
        const controlButton = document.createElement('button');
        controlButton.classList.add('slide-control-button');
        controlButton.classList.add('fa-solid');
        controlButton.classList.add('fa-circle');
        controlButton.dataset.slide = 'control-button';
        controlWrapper.append(controlButton);
    });
}

// função que adiciona e remove a classe "active" das bolinhas
function activeControlButton({ index }) {
    const slideItem = slideItems[index];
    const dataIndex = Number(slideItem.dataset.index);
    const controlButton = controlButtons[dataIndex];
    controlButtons.forEach(function(controlButtonItem) {
        controlButtonItem.classList.remove('active')
    });
    if(controlButton)controlButton.classList.add('active')
}

function createSlideClones() {
    const firstSlide = slideItems[0].cloneNode(true);
    firstSlide.classList.add('slide-cloned');
    firstSlide.dataset.index = slideItems.length;

    const secondSlide = slideItems[1].cloneNode(true);
    secondSlide.classList.add('slide-cloned');
    secondSlide.dataset.index = slideItems.length + 1;

    const lastSlide = slideItems[slideItems.length - 1].cloneNode(true);
    lastSlide.classList.add('slide-cloned');
    lastSlide.dataset.index = -1;

    const penultimateSlide = slideItems[slideItems.length - 2].cloneNode(true);
    penultimateSlide.classList.add('slide-cloned');
    penultimateSlide.dataset.index = -2;

    slideList.append(firstSlide);
    slideList.append(secondSlide);
    slideList.prepend(lastSlide);
    slideList.prepend(penultimateSlide);

    slideItems = document.querySelectorAll('[data-slide="item"]');
    slideItems = document.querySelectorAll('[data-slide="item"]');
}

// função clique m1 é add um eventlistener para o movimento horizontal do cursor
function onMouseDown(event, index) {
    const slideItem = event.currentTarget;
    state.startingPoint = event.clientX;
    state.currentPoint = event.clientX - state.savedPosition;
    state.currentSlideIndex = index;
    slideList.style.transition = 'none'
    slideItem.addEventListener('mousemove', onMouseMove);
}

// função que mantém o track da movimentação do m1 enquanto clicado
function onMouseMove(event) {
    state.movement = event.clientX - state.startingPoint;
    const position = event.clientX - state.currentPoint;
    translateSlide({position: position});
    
}

// função que avalia a movimentação e direção horizontal para determinar qual slide ir ou manter no mesmo
function onMouseUp(event) {
    const pointsToMove = event.type.includes('touch') ? 50 : 150
    const slideItem = event.currentTarget;
    if (state.movement < -pointsToMove) {
        nextSlide();
    } else if (state.movement > pointsToMove) {
        previousSlide();
    } else {
        setVisibleSlide({index: state.currentSlideIndex, animate: true});
    }

    slideItem.removeEventListener('mousemove', onMouseMove);
}

function onTouchStart(event, index) {
    event.clientX = event.touches[0].clientX;
    onMouseDown(event, index);
    const slideItem = event.currentTarget;
    slideItem.addEventListener('touchmove', onTouchMove);
}

function onTouchMove(event) {
    event.clientX = event.touches[0].clientX;
    onMouseMove(event);
}

function onTouchEnd(event) {
    onMouseUp(event);
    const slideItem = event.currentTarget;
    slideItem.removeEventListener('touchmove', onTouchMove);
}

function onControlButtonClick(index) {
    setVisibleSlide({ index: index + 2, animate: true });
}

function onSlideListTrasitionEnd() {
    const slideItem = slideItems[state.currentSlideIndex]

    if (slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) > 0) {
        setVisibleSlide({ index: 2, animate: false})
    }
    if (slideItem.classList.contains('slide-cloned') && Number(slideItem.dataset.index) < 0) {
        setVisibleSlide({ index: slideItems.length - 3, animate: false})
    }
}

function setAutoPlay() {
    if (state.autoPlay) {
        slideInterval = setInterval(function() {
            // setVisibleSlide({index: state.currentSlideIndex + 1, animate: true})
            nextSlide()
        }, state.timeInterval)
    }
}

function setListeners() {
    // selecionando os controlButtons (bolinhas)
    controlButtons = document.querySelectorAll('[data-slide="control-button"]');

    // atribuindo o eventlistener a cada bolinha
    controlButtons.forEach(function(controlButton, index) {
        controlButton.addEventListener('click', function(event) {
            onControlButtonClick(index);
        })
        
    });  

    // função para adicionar e remover os event listener nos cliques e no mover do mouse
    slideItems.forEach(function(slideItem, index) {
        // MOUSE
        slideItem.addEventListener('dragstart', function(event) {
            event.preventDefault();
        });
        slideItem.addEventListener('mousedown', function(event) {
            onMouseDown(event, index);
        });
        slideItem.addEventListener('mouseup', onMouseUp);
        // TOUCH
        slideItem.addEventListener('touchstart', function(event) {
            onTouchStart(event, index);
        });
        slideItem.addEventListener('touchend', onTouchEnd);

    });

    navNextButton.addEventListener('click', nextSlide);
    navPreviousButton.addEventListener('click', previousSlide);
    slideList.addEventListener('transitionend', onSlideListTrasitionEnd);
    slideWrapper.addEventListener('mouseenter', function() {
        clearInterval(slideInterval)
        });
    slideWrapper.addEventListener('mouseleave', function() {
            setAutoPlay();
        });
    let resizeTimeout
    window.addEventListener('resize', function(){
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function() {
            setVisibleSlide({index: state.currentSlideIndex, animate:true})
        }, 700)
    })
}

function initSlider({startAtIndex, autoPlay = true, timeInterval = 3000}) {
    state.autoPlay = autoPlay;
    state.timeInterval = timeInterval;
    createControlButtons();
    createSlideClones();
    setListeners();
    setVisibleSlide({index: startAtIndex + 2, animate: true});
    setAutoPlay();
}

// initSlider(0, );
