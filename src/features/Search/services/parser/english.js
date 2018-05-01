import jquery from 'jquery';

const preprocessDomModel = (content) => {
  content.find('#word_action_block').remove();
  content.find('#word_action_block_help').remove();
  content.find('img').remove();
  content.find('audio').remove();
  content.find('span.sound_pic').remove();
  content
    .find('#wd_title')
    .find('h1')
    .remove();
};

const getMeaning = (content, marker) => {
  const node = content.find(marker).next();

  node.find('#pos_noun').removeClass('hidden');
  node.find('.hidden').remove();
  node.find('.more').remove();

  return node
    .text()
    .split('-')
    .map(v => v.trim())
    .filter(v => v);
};

const getPhrases = (content) => {
  content.find('.snoska').remove();

  return content
    .find('.block.phrases')
    .text()
    .split('  ')
    .map(v => v.trim())
    .filter(v => v);
};

const getUKTranscription = content =>
  content
    .find('#uk_tr_sound')
    .find('span')
    .text()
    .trim();

const getUSTranscription = content =>
  content
    .find('#us_tr_sound')
    .find('span')
    .text()
    .trim();

const getWordInfoFromHtml = (html) => {
  const $ = jquery('<div></div>').append(html);

  const content = $.find('#wd');

  preprocessDomModel(content);

  const [noun, verb] = content.find('.pos_item');

  const data = {};

  data.transcription = {
    uk: getUKTranscription(content),
    us: getUSTranscription(content),
  };
  data.nouns = getMeaning(content, noun);
  data.verbs = getMeaning(content, verb);
  data.mainMeaning = content.find('.t_inline_en').text();
  data.phrases = getPhrases(content);

  return data;
};

export {
  getMeaning,
  getPhrases,
  getUKTranscription,
  getUSTranscription,
  getWordInfoFromHtml,
  preprocessDomModel,
};
