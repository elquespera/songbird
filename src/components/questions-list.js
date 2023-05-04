import { lang } from '../services/language';
import { EVENTS, state } from '../services/state';
import BaseComponent from './base-component';

class QuestionsList extends BaseComponent {
  constructor() {
    super('ul.questions-list');
    lang.change(() => this.render());

    state.listen(EVENTS.questionChange, () => this.checkCurrent());
  }

  render() {
    this.items = lang.birdCategiroes.map((question) => {
      const li = new BaseComponent('li');
      li.text = question;
      return li;
    });
    this.checkCurrent();
    this.replace(...this.items);
  }

  checkCurrent() {
    if (this.items) {
      this.items.forEach((item, index) => {
        item.classList.toggle('current', state.currentQuestion === index);
      });
    }
  }
}

export default QuestionsList;
