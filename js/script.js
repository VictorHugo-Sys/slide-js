import Slide from './slide.js';

const slide = new Slide('.slide', '.quebra');
slide.init();
console.log(slide);

slide.changeSlide(3);
slide.activePrevSlide();