import BaseComponent from '../components/base-component';
import QuestionsList from '../components/questions-list';
import BirdCard from '../components/bird-card';
import Page from './page';
import { EVENTS, PAGES, state } from '../services/state';
import Answers from '../components/answers';
import { lang, lng } from '../services/language';

class QuizPage extends Page {
  constructor() {
    super('quiz');
    const questionsList = new QuestionsList();
    const wrapper = new BaseComponent('.quiz-wrapper');
    this.unknownBirdCard = new BirdCard(
      state.currentQuestion,
      state.randomBirdIndex,
      { hidden: true, hideDescription: false },
    );
    this.answers = new Answers();
    wrapper.append(this.unknownBirdCard, this.answers);

    this.nextButton = new BaseComponent('button.next-button.text-button');
    this.nextButton.onclick(() => {
      if (state.quizEnded()) {
        state.currentPage = PAGES.results.id;
      } else {
        state.nextQuestion();
      }
    });
    this.append(questionsList, wrapper, this.nextButton);
    state.listen(EVENTS.questionChange, () => {
      this.unknownBirdCard.setData(
        state.currentQuestion,
        state.randomBirdIndex,
        { hidden: true, hideDescription: true },
      );
      this.nextButton.element.disabled = true;
    });
    state.listen(EVENTS.rightAnswer, () => {
      this.unknownBirdCard.showNames();
      this.checkButton();
      this.nextButton.element.disabled = false;
    });
    state.listen(EVENTS.pageChange, () => this.unknownBirdCard.stopAudio());
    state.listen(EVENTS.beforePageChange, (current) => {
      if (current === PAGES.quiz.id && !state.quizEnded()
      && !window.confirm(lang.getText(lng.confirmQuizEnd))) {
        return true;
      }
      return false;
    });

    lang.change(() => this.checkButton());
  }

  checkButton() {
    this.nextButton.text = lang.getText(state.quizEnded() ? lng.showResults : lng.nextButton);
  }
}

const quizPage = new QuizPage();

export default quizPage;
