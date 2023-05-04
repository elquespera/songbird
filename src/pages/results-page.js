import BaseComponent from '../components/base-component';
import { lang, lng } from '../services/language';
import {
  EVENTS, MAX_SCORE, PAGES, state,
} from '../services/state';
import Page from './page';

class ResultsPage extends Page {
  constructor() {
    super('results');
    const wrapper = new BaseComponent('.card.card-wrapper');
    this.title = new BaseComponent('h2.page-title');
    this.message = new BaseComponent('p');
    wrapper.append(this.title, this.message);
    this.againButton = new BaseComponent('button.text-button.try-again-button');
    this.againButton.onclick(() => {
      state.currentPage = PAGES.quiz.id;
    });

    this.append(wrapper, this.againButton);

    lang.change(() => this.render());
    state.listen(EVENTS.pageChange, (index) => {
      if (index === PAGES.results.id) this.render();
    });
  }

  render() {
    this.title.text = lang.getText(lng.resultsTitle);
    let msg = lang.getText(
      state.score === MAX_SCORE ? lng.resultsMaximumMessage : lng.resultsMessage,
    );
    msg = msg.replace('xxx', state.score);
    msg = msg.replace('yyy', MAX_SCORE);
    this.message.text = msg;
    this.againButton.text = lang.getText(lng.tryAgain);
  }
}

const resultsPage = new ResultsPage();

export default resultsPage;
