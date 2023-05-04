import BaseComponent from './base-component';
import Link from './link';

const CHECKED_CLASS = 'checked';

class Switch extends BaseComponent {
  constructor(items, checked = -1) {
    super('ul.switch');
    this.items = items.map(({ text, hint }, index) => {
      const li = new BaseComponent(`li.${text}`);
      li.append(new Link({ text, hint }));
      li.onclick(() => {
        this.checked = index;
      });
      return li;
    });
    this.append(...this.items);
    this.checked = checked;
  }

  set checked(checkedIndex) {
    if (this.checked !== checkedIndex) {
      this.items.forEach((item, index) => {
        item.classList.toggle(CHECKED_CLASS, checkedIndex === index);
      });
      if (this.callback) this.callback(this.checked);
    }
  }

  get checked() {
    return this.items.findIndex((item) => item.classList.contains(CHECKED_CLASS));
  }

  change(callback) {
    this.callback = callback;
  }
}

export default Switch;
