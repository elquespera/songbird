import BaseComponent from './base-component';
import rssIcon from '../assets/icons/rs-school.svg';
import githubIcon from '../assets/icons/github.svg';
import portfolioIcon from '../assets/icons/portfolio.svg';
import Link from './link';
import { lng } from '../services/language';

const footerLinks = [
  { name: lng.rss, icon: rssIcon, url: 'https://rs.school' },
  { name: lng.github, icon: githubIcon, url: 'https://github.com/elquespera/' },
  { name: lng.portfolio, icon: portfolioIcon, url: 'https://pavelgrinkevich.com' },
];

class Footer extends BaseComponent {
  constructor() {
    const year = new BaseComponent('span.year');
    year.text = '2022';
    const links = footerLinks.map(({ name, icon, url }) => new Link({ hint: name, url, icon }));
    super('footer');
    this.append(links[0], year, links[1], links[2]);
  }
}

const footer = new Footer();

export default footer;
