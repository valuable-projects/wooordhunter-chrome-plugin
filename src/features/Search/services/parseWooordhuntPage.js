import jquery from 'jquery';

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

export default async (word, html) => {
  const $ = jquery('<div></div>').append(html);

  const content = $.find('#wd');

  content.find('#word_action_block').remove();
  content.find('#word_action_block_help').remove();
  content.find('img').remove();
  content.find('audio').remove();
  content.find('span.sound_pic').remove();
  content
    .find('#wd_title')
    .find('h1')
    .remove();

  const [noun, verb] = content.find('.pos_item');

  const data = {};

  data.transcription = {
    uk: content
      .find('#uk_tr_sound')
      .find('span')
      .text()
      .trim(),
    us: content
      .find('#us_tr_sound')
      .find('span')
      .text()
      .trim(),
  };
  data.nouns = getMeaning(content, noun);
  data.verbs = getMeaning(content, verb);
  data.mainMeaning = content.find('.t_inline_en').text();
  data.phrases = getPhrases(content);
  data.word = word;

  return data;
};
