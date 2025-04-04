import { Slide, SlideNav } from './slide.js';

const slide = new SlideNav('.slide', '.quebra');
slide.init();
slide.addArrow('.prev', '.next');
