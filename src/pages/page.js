import BaseComponent from '../components/base-component';

class Page extends BaseComponent {
  constructor(name) {
    super('div.page');
    this.name = name;
    this.classList.add(`${name}-page`);
  }
}

export default Page;
