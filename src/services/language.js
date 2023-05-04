import {
  birdsDataEn, birdsDataRu, categoriesEn, categoriesRu,
} from '../data/birds-data';

const lng = {
  rss: 'rss',
  github: 'github',
  portfolio: 'portfolio',
  welcome: 'welcome',
  quiz: 'quiz',
  library: 'library',
  en: 'en',
  enHint: 'enHint',
  ru: 'ru',
  ruHint: 'ruHint',
  playHint: 'playHint',
  pauseHint: 'pauseHint',
  emptyCard: 'emptyCard',
  nextButton: 'nextButton',
  showResults: 'showResults',
  score: 'score',
  resultsTitle: 'resultsTitle',
  resultsMessage: 'resultsMessage',
  tryAgain: 'tryAgain',
  resultsMaximumMessage: 'resultsMaximumMessage',
  welcomeTitle: 'welcomeTitle',
  welcomeMessage: 'welcomeMessage',
  welcomePlay: 'welcomePlay',
  welcomeLibrary: 'welcomeLibrary',
  confirmQuizEnd: 'confirmQuizEnd',

  birdsData: 'birdsData',
  birdsCategires: 'birdsCategires',
};

const strings = {
  en: {
    [lng.rss]: 'RS School',
    [lng.github]: 'Github',
    [lng.portfolio]: 'Portfolio',
    [lng.welcome]: 'Welcome',
    [lng.quiz]: 'Quiz',
    [lng.library]: 'Gallery',
    [lng.en]: 'en',
    [lng.enHint]: 'English',
    [lng.ru]: 'ru',
    [lng.ruHint]: 'Russian (Русский)',
    [lng.playHint]: 'Play',
    [lng.pauseHint]: 'Pause',
    [lng.emptyCard]: 'Please play the song and select the bird name.',
    [lng.nextButton]: 'Next question',
    [lng.showResults]: 'Show results',
    [lng.score]: 'Score',
    [lng.resultsTitle]: 'Congratulations!',
    [lng.resultsMessage]: 'You have finished the quiz and scored xxx from yyy possible points',
    [lng.resultsMaximumMessage]: 'You have scored the maximum of yyy points in this quiz. Well done!',
    [lng.tryAgain]: 'Try again',

    [lng.welcomeTitle]: 'Welcome to SongBird!',
    [lng.welcomeMessage]: `SongBird is a quiz app that tests your ability to recognize common bird songs.
                          Please select one of the options from below.`,
    [lng.welcomePlay]: 'Start the quiz',
    [lng.welcomeLibrary]: 'Check out all birds',

    [lng.confirmQuizEnd]: 'Are you sure you want to navigate to another page? \nThis will reset quiz progress.',

    [lng.birdsData]: birdsDataEn,
    [lng.birdsCategires]: categoriesEn,
  },

  ru: {
    [lng.welcome]: 'Старт',
    [lng.quiz]: 'Викторина',
    [lng.library]: 'Галерея',
    [lng.playHint]: 'Воспроизвести',
    [lng.pauseHint]: 'Остановить',
    [lng.emptyCard]: 'Послушайте плеер и выберите птицу из списка',
    [lng.nextButton]: 'Следующий вопрос',
    [lng.showResults]: 'Показать результаты',
    [lng.score]: 'Счёт',
    [lng.resultsTitle]: 'Поздравляем!',
    [lng.resultsMessage]: 'Вы прошли викторину и набрали xxx из yyy возможных баллов',
    [lng.resultsMaximumMessage]: 'Отлично! Вы набрали масимальное количество баллов (yyy) в этой викторине!',
    [lng.tryAgain]: 'Попробовать еще раз',

    [lng.welcomeTitle]: 'Добро пожаловать в SongBird!',
    [lng.welcomeMessage]: `Songbird - это приложение-викторина для распознавания птиц по их голосам.
                          Для начала выберете одну из опций ниже`,
    [lng.welcomePlay]: 'Перейти к викторине',
    [lng.welcomeLibrary]: 'Посмотреть галерею птиц',

    [lng.confirmQuizEnd]: 'Вы уверены, что хотите перейти к другой странице? \nЭто сбросит текущий прогресс.',

    [lng.birdsData]: birdsDataRu,
    [lng.birdsCategires]: categoriesRu,
  },
};

const availableLanguages = Object.keys(strings);

const LANGUAGE_KEY = 'lang-eacdad80-d24a-4ff2';

class Language {
  constructor() {
    this.callbacks = [];
    const userLangauge = navigator && navigator.language ? navigator.language.slice(0, 2) : 'en';
    this.currentLanguage = localStorage.getItem(LANGUAGE_KEY) || userLangauge;
  }

  change(callback, call = true) {
    this.callbacks.push(callback);
    if (call) callback(this.currentLanguage);
  }

  get current() {
    return this.currentLanguage;
  }

  set current(lang) {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      localStorage.setItem(LANGUAGE_KEY, lang);
      this.callbacks.forEach((callback) => callback(lang));
    }
  }

  getText(item) {
    const items = strings[this.currentLanguage] || strings.en;
    return items[item] || strings.en[item];
  }

  get birdCategiroes() {
    return this.getText(lng.birdsCategires);
  }
}

const lang = new Language();

export { lang, lng, availableLanguages };
