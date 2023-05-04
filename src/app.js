import './styles/style.scss';

import Pages from './pages/pages';
import welcomePage from './pages/welcome-page';
import quizPage from './pages/quiz-page';
import libraryPage from './pages/library-page';
import resultsPage from './pages/results-page';
import header from './components/header';
import footer from './components/footer';

const App = () => {
  const pages = new Pages(welcomePage, quizPage, libraryPage, resultsPage);
  document.body.replaceChildren(header.element, pages.element, footer.element);
};

App();
