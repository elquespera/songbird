import { lang, lng } from '../services/language';
import { EVENTS, state } from '../services/state';
import BaseComponent from './base-component';
import BirdCard from './bird-card';

class Answers extends BaseComponent {
  constructor() {
    super('.answers');
    this.answerList = new BaseComponent('ul.answer-list.card');
    this.answerWrapper = new BaseComponent('.answer-wrapper');
    this.emptyCard = new BaseComponent('.card.empty-bird-card');
    this.birdCard = new BirdCard();

    lang.change(() => this.render());
    state.listen(EVENTS.questionChange, () => {
      this.stopAudio();
      this.select(-1);
      this.render();
    });
    state.listen(EVENTS.pageChange, () => this.stopAudio());
    this.select(-1);
    this.append(this.answerList, this.answerWrapper);
  }

  render() {
    this.items = state.birdsList.map((bird, index) => {
      const li = new BaseComponent('li');
      const a = new BaseComponent('a');
      a.text = bird.name;
      li.append(a);
      li.onclick(() => this.select(index));
      return li;
    });
    this.answerList.replace(...this.items);
    this.emptyCard.text = lang.getText(lng.emptyCard);
    this.checkAnswers();
  }

  select(index) {
    if (index === this.selectedIndex) return;
    this.selectedIndex = index;
    if (index === -1) {
      this.answerWrapper.replace(this.emptyCard);
      return;
    }

    this.birdCard.setData(state.currentQuestion, index);
    this.answerWrapper.replace(this.birdCard);
    state.addAnswer(index);
    this.checkAnswers();
  }

  checkAnswers() {
    this.items.forEach((item, i) => {
      const hasIndex = state.givenAnswers.has(i);
      item.classList.toggle('right', hasIndex && state.randomBirdIndex === i);
      item.classList.toggle('wrong', hasIndex && state.randomBirdIndex !== i);
    });
  }

  stopAudio() {
    this.birdCard.stopAudio();
  }
}

export default Answers;
