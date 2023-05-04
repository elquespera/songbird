import BaseComponent from '../components/base-component';
import BirdCard from '../components/bird-card';
import { lang, lng } from '../services/language';
import { EVENTS, PAGES, state } from '../services/state';
import Page from './page';

class LibraryPage extends Page {
  constructor() {
    super('library');
    this.wrapper = new BaseComponent('.library-wrapper');
    this.append(this.wrapper);

    state.listen(EVENTS.beforePageChange, (pageIndex, newPageIndex) => {
      if (newPageIndex === PAGES.library.id) this.render();
      if (pageIndex === PAGES.library.id) this.pauseAllAudio();
    });
  }

  render() {
    if (this.birds) return;
    const birdsData = lang.getText(lng.birdsData);
    this.birds = [];
    birdsData.forEach((category, categoryIndex) => {
      category.forEach((_, birdIndex) => {
        this.birds.push(new BirdCard(
          categoryIndex,
          birdIndex,
          { beforeAudio: () => this.pauseAllAudio() },
        ));
      });
    });
    this.wrapper.append(...this.birds);
  }

  pauseAllAudio() {
    this.birds.forEach((bird) => bird.player.pause());
  }
}

const libraryPage = new LibraryPage();

export default libraryPage;
