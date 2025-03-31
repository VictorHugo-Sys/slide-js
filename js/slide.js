export default class Slide {
  constructor(slide, quebra) {
    this.slide = document.querySelector(slide);
    this.quebra = document.querySelector(quebra);
    this.dist = {
      final: 0,
      start: 0,
      move: 0,
    };
  }

  moveSlide(distX) {
    this.dist.move = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updateMove(clientX) {
    this.dist.move = (this.dist.start - clientX) * 1.8;
    return this.dist.final - this.dist.move;
  }

  onStart(event) {
    event.preventDefault();

    let movetype;
    if (event.type === 'mousedown') {
      this.dist.start = event.clientX;
      movetype = 'mousemove';
    } else if (event.type === 'touchstart') {
      this.dist.start = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }

    this.quebra.addEventListener(movetype, this.onMove);
  }

  onEnd(event) {
    const movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove';
    this.dist.final = this.dist.move;
    this.quebra.removeEventListener(movetype, this.onMove);
  }

  onMove(event) {
    event.preventDefault();
    const pointer =
      event.type === 'mousemove'
        ? event.clientX
        : event.changedTouches[0].clientX;
    const final = this.updateMove(pointer);
    this.moveSlide(final);
  }

  addEvents() {
    this.quebra.addEventListener('mousedown', this.onStart);
    this.quebra.addEventListener('touchstart', this.onStart);
    this.quebra.addEventListener('mouseup', this.onEnd);
    this.quebra.addEventListener('touchend', this.onEnd);
  }

  slidePosition(element) {
    const quebraWidth = this.quebra.offsetWidth;
    const elementWidth = element.offsetWidth;
    const elementLeft = element.offsetLeft;
    const margin = (quebraWidth - elementWidth) / 2;

    return -(elementLeft - margin);
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      return {
        position: this.slidePosition(element),
        element,
      };
    });
  }

  slideIndex(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }

  slideChange(index) {
    const active = this.slideArray[index];
    this.moveSlide(this.slideArray[index].position);
    this.slideIndex(index);
    this.dist.final = active.position;
    console.log(this.index);
  }

  

  bindEvent() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvent();
    this.slideConfig();
    this.addEvents();
    return this;
  }
}
