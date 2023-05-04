import BaseComponent from './base-component';
import Link from './link';
import { EVENTS, PAGES, state } from '../services/state';

class Menu extends BaseComponent {
  constructor() {
    super('.menu');
    const pages = Object.values(PAGES).filter(({ hidden }) => !hidden);
    this.links = pages.map(({ name, icon }) => new Link({ text: name, url: `#${name}`, icon }));
    this.links.forEach((link, index) => {
      link.onclick(() => {
        state.currentPage = index;
      });
    });
    this.checkLinks();
    this.append(...this.links);
    state.listen(EVENTS.pageChange, () => this.checkLinks());
  }

  checkLinks() {
    this.links.forEach((link, index) => {
      link.classList.toggle('active', index === state.currentPage);
    });
  }
}

export default Menu;
