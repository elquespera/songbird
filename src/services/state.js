import homeIcon from '../assets/icons/home.svg';
import playIcon from '../assets/icons/play.svg';
import listIcon from '../assets/icons/list.svg';
import { lang, lng } from './language';
import { playAudio, SOUNDS } from './audio';

const PAGES = {
  welcome: {
    id: 0,
    name: lng.welcome,
    icon: homeIcon,
  },
  quiz: {
    id: 1,
    name: lng.quiz,
    icon: playIcon,
  },
  library: {
    id: 2,
    name: lng.library,
    icon: listIcon,
  },
  results: {
    id: 3,
    name: lng.results,
    hidden: true,
  },
};

const EVENTS = {
  pageChange: 'pagechange',
  beforePageChange: 'beforepagechange',
  questionChange: 'questionchange',
  rightAnswer: 'rightanswer',
  scoreChange: 'scorechange',
};

const MAX_SCORE = 30;

class State {
  constructor() {
    this.cb = { };
    this._currentQuestion = 0;
    this.randomBirdIndex = 0;
    this._score = 0;
    this.scoreChanged = false;
    this.givenAnswers = new Set();
    this.currentPage = PAGES.welcome.id;
  }

  listen(eventName, callback) {
    if (!this.cb[eventName]) this.cb[eventName] = [];
    this.cb[eventName].push(callback);
  }

  dispatchEvent(eventName, ...args) {
    const callbacks = this.cb[eventName];
    if (!callbacks) return [];
    return callbacks.map((callback) => callback(...args));
  }

  set currentPage(pageIndex) {
    if (this._currentPage !== pageIndex
     && this.dispatchEvent(EVENTS.beforePageChange, this._currentPage, pageIndex)
       .every((response) => !response)) {
      this._currentPage = pageIndex;
      if (pageIndex === PAGES.quiz.id) this.startQuiz();
      this.dispatchEvent(EVENTS.pageChange, pageIndex);
    }
  }

  get currentPage() {
    return this._currentPage;
  }

  startQuiz() {
    this.score = 0;
    this.currentQuestion = 0;
  }

  get score() {
    return this._score;
  }

  set score(newScore) {
    this.dispatchEvent(EVENTS.scoreChange, newScore, newScore - this._score);
    this._score = newScore;
  }

  get currentQuestion() {
    return this._currentQuestion;
  }

  set currentQuestion(questionIndex) {
    this._currentQuestion = questionIndex;
    this.scoreChanged = false;
    this.givenAnswers = new Set();
    this.randomBirdIndex = Math.floor(Math.random() * this.birdsList.length);
    this.dispatchEvent(EVENTS.questionChange, questionIndex, this.randomBirdIndex);
  }

  nextQuestion() {
    this.currentQuestion += 1;
  }

  hasRightAnswer() {
    return this.givenAnswers.has(this.randomBirdIndex);
  }

  quizEnded() {
    return this.currentQuestion >= this.birdsList.length - 1 && this.hasRightAnswer();
  }

  addAnswer(index) {
    if (this.hasRightAnswer()) return;
    this.givenAnswers.add(index);

    if (this.hasRightAnswer() && !this.scoreChanged) {
      this.scoreChanged = true;
      this.score += 6 - this.givenAnswers.size;
      this.dispatchEvent(EVENTS.rightAnswer, index);
      playAudio(this.quizEnded() ? SOUNDS.quizEnded : SOUNDS.right);
    } else {
      playAudio(SOUNDS.wrong);
    }
  }

  get birdsList() {
    return lang.getText(lng.birdsData)[this.currentQuestion];
  }
}

const state = new State();

export {
  state, PAGES, EVENTS, MAX_SCORE,
};
