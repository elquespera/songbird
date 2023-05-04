import { lang, lng } from '../services/language';
import BaseComponent from './base-component';

class Link extends BaseComponent {
  constructor({
    text, url, icon, hint, active,
  }) {
    super('a');
    this.element.href = url || '#';
    if (icon) {
      const img = new BaseComponent('img');
      img.element.src = icon;
      this.append(img);
    }
    let textSpan;
    if (text) {
      textSpan = new BaseComponent('span');
      this.append(textSpan);
    }

    lang.change(() => {
      if (hint) {
        this.element.title = lang.getText(lng[hint]);
      }
      if (text) {
        textSpan.text = lang.getText(lng[text]);
      }
    });

    this.active = active;
  }

  get active() {
    return this.classList.contains('active');
  }

  set active(active) {
    this.classList.toggle('active', active === true);
  }
}

export default Link;
