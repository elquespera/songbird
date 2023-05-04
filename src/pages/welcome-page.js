import BaseComponent from '../components/base-component';
import { lang, lng } from '../services/language';
import { PAGES, state } from '../services/state';
import Page from './page';

class WelcomePage extends Page {
  constructor() {
    super('welcome');
    const wrapper = new BaseComponent('.card.card-wrapper');
    this.title = new BaseComponent('h2.page-title');
    this.message = new BaseComponent('p');
    wrapper.append(this.title, this.message);

    this.playButton = new BaseComponent('button.text-button');
    this.playButton.onclick(() => {
      state.currentPage = PAGES.quiz.id;
    });
    this.libraryButton = new BaseComponent('button.text-button');
    this.libraryButton.onclick(() => {
      state.currentPage = PAGES.library.id;
    });

    this.append(wrapper, this.playButton, this.libraryButton);

    lang.change(() => this.render());
  }

  render() {
    this.title.text = lang.getText(lng.welcomeTitle);
    this.message.text = lang.getText(lng.welcomeMessage);
    this.playButton.text = lang.getText(lng.welcomePlay);
    this.libraryButton.text = lang.getText(lng.welcomeLibrary);
  }
}

const welcomePage = new WelcomePage();

export default welcomePage;
