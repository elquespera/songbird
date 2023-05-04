import rightAnswerSrc from '../assets/audio/correct-answer.mp3';
import wrongAnswerSrc from '../assets/audio/wrong-answer.mp3';
import quizEndSrc from '../assets/audio/win.mp3';

const SOUNDS = {
  right: rightAnswerSrc,
  wrong: wrongAnswerSrc,
  quizEnded: quizEndSrc,
};

const audio = new Audio();

const playAudio = async (source) => {
  audio.src = source;
  return new Promise((res) => {
    audio.onended = res;
    audio.play();
  });
};

export { playAudio, SOUNDS };
