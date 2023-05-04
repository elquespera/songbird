import BaseComponent from '../components/base-component';
import { EVENTS, state } from '../services/state';

class Pages extends BaseComponent {
  constructor(...pages) {
    super('main');
    this.pages = pages;
    this.container = new BaseComponent('.pages');
    this.wrapper = new BaseComponent('.pages-wrapper');
    this.wrapper.append(...pages);
    this.container.append(this.wrapper);
    this.birds = [new BaseComponent('.aminated-bird.robin'), new BaseComponent('.aminated-bird.swallow')];
    this.append(this.container, ...this.birds);

    state.listen(EVENTS.pageChange, (pageIndex) => this.goTo(pageIndex));
    this.goTo(state.currentPage);
  }

  goTo(pageIndex) {
    this.pages.forEach((page, index) => page.classList.toggle('visible', index === pageIndex));
  }
}

export default Pages;
