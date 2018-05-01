import { getWordInfoFromHtml as getEnglishWordInfoFromHtml } from './english';
import { getWordInfoFromHtml as getRussianWordInfoFromHtml } from './russian';

export default (word, html = '') => {
  let translation = {};

  if (/ru_content/.test(html)) {
    translation = getRussianWordInfoFromHtml(html);
  } else {
    translation = getEnglishWordInfoFromHtml(html);
  }

  return { ...translation, word: word.toLocaleLowerCase() };
};
