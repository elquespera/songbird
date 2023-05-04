import { lang, lng } from '../services/language';
import BaseComponent from './base-component';

const formatDuration = (duration) => {
  const time = Math.round(duration);
  const [minutes, seconds] = [Math.floor(time / 60), time % 60];
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatVolume = (volume) => `${Math.round(volume * 100)}%`;

class Player extends BaseComponent {
  constructor(src) {
    super('.audio-player');
    this.playButton = new BaseComponent('button.play-button.icon-button');
    this.playButton.onclick(() => this.togglePlay());

    const seekWrapper = new BaseComponent('.seek-wrapper');
    this.seekInput = new BaseComponent('input.seek-input.range-input');
    this.seekInput.element.type = 'range';
    this.seekCurrent = new BaseComponent('span.seek-current');
    this.seekDuration = new BaseComponent('span.seek-duration');
    seekWrapper.append(this.seekInput, this.seekCurrent, this.seekDuration);

    const volumeWrapper = new BaseComponent('.volume-wrapper');
    this.volumeInput = new BaseComponent('input.volume-input.range-input');
    this.volumeInput.element.type = 'range';
    this.volumeButton = new BaseComponent('button.volume-button.icon-button');
    this.volumeButton.onclick(() => this.toggleVolume());
    this.volumeCurrent = new BaseComponent('span.volume-current');
    volumeWrapper.append(this.volumeCurrent, this.volumeInput, this.volumeButton);

    this.append(this.playButton, seekWrapper, volumeWrapper);

    this.audio = new Audio();
    this.audio.addEventListener('loadedmetadata', () => {
      this.playButton.element.disabled = false;
      this.seekInput.element.disabled = false;
      this.seekCurrent.text = formatDuration(0);
      this.seekDuration.text = formatDuration(this.audio.duration);
      this.seekInput.element.min = 0;
      this.seekInput.element.max = Math.round(this.audio.duration);
      this.seekInput.element.value = 0;
      this.volumeCurrent.text = formatVolume(this.audio.volume);
      this.volumeInput.element.min = 0;
      this.volumeInput.element.max = 100;
      this.volumeInput.element.value = this.audio.volume * 100;
      this.render();
    });

    this.audio.addEventListener('timeupdate', () => {
      this.seekInput.element.value = Math.round(this.audio.currentTime);
      this.seekCurrent.text = formatDuration(this.audio.currentTime);
    });

    this.audio.addEventListener('volumechange', () => {
      this.volumeCurrent.text = formatVolume(this.audio.volume);
      this.volumeButton.classList.toggle('mute', this.audio.volume === 0);
      this.volumeInput.element.value = this.audio.volume * 100;
    });

    this.audio.addEventListener('ended', () => {
      this.render();
      this.seekCurrent.text = formatDuration(0);
      this.seekInput.element.value = 0;
    });

    this.seekInput.addEvent('input', () => {
      this.audio.currentTime = +this.seekInput.element.value;
    });

    this.volumeInput.addEvent('input', () => {
      this.audio.volume = +this.volumeInput.element.value / 100;
    });

    this.src = src;
    this.render();
  }

  render() {
    this.playButton.classList.toggle('playing', !this.audio.paused);
    this.playButton.element.title = lang.getText(this.audio.paused ? lng.playHint : lng.pauseHint);
  }

  set src(source) {
    this.playButton.element.disabled = true;
    this.seekInput.element.disabled = true;
    this.audio.src = source;
  }

  async togglePlay() {
    if (this.audio.paused) {
      if (this.callback) this.callback();
      await this.audio.play();
      this.render();
    } else {
      this.audio.pause();
      this.render();
    }
  }

  pause() {
    if (!this.audio.paused) this.togglePlay();
  }

  play() {
    if (this.audio.paused) this.togglePlay();
  }

  beforePlay(callback) {
    this.callback = callback;
  }

  toggleVolume() {
    this.audio.volume = this.audio.volume === 0 ? 1 : 0;
  }
}

export default Player;
