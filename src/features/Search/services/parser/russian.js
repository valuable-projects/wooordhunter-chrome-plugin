import jquery from 'jquery';

import languages from './languages';

const getPhrasesFromDiv = div =>
  div
    .html()
    .replace(/<br>/g, '\n')
    .replace(/<br\/>/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(line => line.replace(/<span>/g, '').replace(/<\/span>/g, ''));

const getPhrases = (content) => {
  content.find('.more_up').remove();
  content.find('.more_ru').remove();
  content.find('.more_down').remove();

  const div = content.find('.word_ex');

  const hiddenPhrases = getPhrasesFromDiv(div.find('.hidden'));

  content.find('.hidden').remove();

  const visiblePhrases = getPhrasesFromDiv(div);

  return [...visiblePhrases, ...hiddenPhrases];
};

const getCommonMeanging = (content) => {
  const divWithWord = content.find('#wd_content');
  divWithWord.find('.word_ex').remove();

  const rawValues = [];
  const meanings = [];

  let hasGap = false;

  divWithWord.children().each(function () {
    hasGap = hasGap || jquery(this).hasClass('gap');

    const string = jquery(this).text();

    if (hasGap || !string) return;

    rawValues.push(string);
  });

  for (let i = 0; i < rawValues.length; i += 2) {
    const string = `${rawValues[i]} - ${rawValues[i + 1]}`;

    meanings.push(string);
  }

  return meanings;
};

const getWordInfoFromHtml = (html) => {
  const $ = jquery('<div></div>').append(html);

  const content = $.find('#wd');

  const data = {};

  data.transcription = {
    uk: '',
    us: '',
  };
  data.nouns = [];
  data.verbs = [];
  data.mainMeaning = '';
  data.phrases = getPhrases(content);
  data.commonMeanings = getCommonMeanging(content);
  data.language = languages.russian;

  return data;
};

export { getPhrases, getCommonMeanging, getWordInfoFromHtml };
