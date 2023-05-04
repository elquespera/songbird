import { availableLanguages, lang } from '../services/language';
import Switch from './switch';

class LanguageSwitch extends Switch {
  constructor() {
    const languages = availableLanguages.map((language) => ({
      text: language,
      hint: `${language}Hint`,
    }));

    super(languages);

    lang.change((current) => {
      this.checked = languages.findIndex((language) => language.text === current);
    });

    this.change((index) => {
      lang.current = languages[index].text;
    });
  }
}

export default LanguageSwitch;
