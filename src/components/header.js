import BaseComponent from './base-component';
import LanguageSwitch from './language-switch';
import Menu from './menu';
import Score from './score';

class Header extends BaseComponent {
  constructor() {
    const logo = new BaseComponent('h1.logo');
    const [song, bird] = [new BaseComponent('span.logo-song'), new BaseComponent('span.logo-bird')];
    song.text = 'Song';
    bird.text = 'Bird';
    logo.append(song, bird);
    super('header');
    this.append(logo, new Score(), new Menu(), new LanguageSwitch());
  }
}

const header = new Header();

export default header;
