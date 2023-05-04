import { lang, lng } from '../services/language';
import BaseComponent from './base-component';
import hiddenBird from '../assets/images/hidden-bird.jpg';
import Player from './player';

const NAME_ALIAS = '******';
const UNKNOWN_BIRD = 'Unknown bird';

class BirdCard extends BaseComponent {
  constructor(...data) {
    super('.bird-card.card');

    this.image = new BaseComponent('img');
    const info = new BaseComponent('.info');
    this.commonName = new BaseComponent('h3.common-name');
    this.scientificName = new BaseComponent('span.scientific-name');
    this.player = new Player();
    info.append(this.commonName, this.scientificName, this.player);
    const infoWrapper = new BaseComponent('.info-wrapper');
    infoWrapper.append(this.image, info);
    this.desc = new BaseComponent('p.description');
    this.setData(...data);
    this.append(infoWrapper, this.desc);

    lang.change(() => this.render(), false);
  }

  setData(categoryIndex, birdIndex, options) {
    this.categoryIndex = categoryIndex || 0;
    this.birdIndex = birdIndex || 0;
    this.hidden = options && options.hidden;
    this.hideDescription = options && options.hideDescription;
    this.beforeAudio = options && options.beforeAudio ? options.beforeAudio : null;
    this.render();
  }

  render() {
    const birds = lang.getText(lng.birdsData);
    const bird = birds[this.categoryIndex][this.birdIndex];
    this.image.element.src = this.hidden ? hiddenBird : bird.image;
    this.image.element.alt = this.hidden ? UNKNOWN_BIRD : bird.species;
    this.commonName.text = this.hidden ? NAME_ALIAS : bird.name;
    this.scientificName.classList.toggle('hidden', this.hidden === true);
    this.scientificName.text = this.hidden ? NAME_ALIAS : bird.species;
    this.player.src = bird.audio;
    this.player.beforePlay(() => { if (this.beforeAudio) this.beforeAudio(); });
    const hideDesc = this.hidden === true || this.hideDescription === true;
    this.desc.classList.toggle('hidden', hideDesc);
    this.desc.text = hideDesc ? NAME_ALIAS : bird.description;
  }

  showNames() {
    this.hidden = false;
    this.render();
  }

  hideNames() {
    this.hidden = true;
    this.render();
  }

  stopAudio() {
    this.player.pause();
  }
}

export default BirdCard;
