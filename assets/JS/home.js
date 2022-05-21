'use strict';
//////////////////////////////
// element variables
const btnRightSlider = document.querySelector('.slider__btn--right');
const btnLeftSlider = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.hero__slide');

//////////////////////////////
// slider
const maxSlide = slides.length;
let curSlide = 1;

btnRightSlider.addEventListener('click', function () {
    slides.forEach(slide => {
        slide.classList.remove('hero__slide--active');
    });

    if (curSlide === slides.length) curSlide = 1;
    else curSlide++;

    document
        .querySelector(`.hero__slide--${curSlide}`)
        .classList.add('hero__slide--active');

});

btnLeftSlider.addEventListener('click', function () {
    slides.forEach(slide => {
        slide.classList.remove('hero__slide--active');
    });

    if (curSlide === 1) curSlide = maxSlide;
    else curSlide--;

    document
        .querySelector(`.hero__slide--${curSlide}`)
        .classList.add('hero__slide--active');

});

