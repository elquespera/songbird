import { lang, lng } from '../services/language';
import { EVENTS, PAGES, state } from '../services/state';
import BaseComponent from './base-component';

class Score extends BaseComponent {
  constructor() {
    const label = new BaseComponent('span.score-label');
    const value = new BaseComponent('span.score-value');
    const scorePlus = new BaseComponent('span.score-plus');

    super('span.score');
    this.append(label, value, scorePlus);

    lang.change(() => {
      label.text = `${lang.getText(lng.score)}: `;
    });
    this.checkVisibility();
    state.listen(EVENTS.pageChange, () => this.checkVisibility());
    state.listen(EVENTS.scoreChange, (score, scoreDifference) => {
      value.text = score;
      if (scoreDifference > 0) {
        scorePlus.text = `+${scoreDifference}`;
        scorePlus.classList.add('run-animation');
        setTimeout(() => scorePlus.classList.remove('run-animation'), 1000);
      }
    });
  }

  checkVisibility() {
    this.classList.toggle('hidden', state.currentPage !== PAGES.quiz.id);
  }
}

export default Score;
