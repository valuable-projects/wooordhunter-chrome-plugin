import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import isEmpty from 'lodash/isEmpty';

import Volume from 'material-ui/svg-icons/av/volume-up';

const link = 'http://wooordhunt.ru/data/sound/word/uk/mp3/word.mp3';

console.log(Sound.status.PLAYING);
console.log(Sound.status);

export default class WordTranslation extends PureComponent {
  static propTypes = {
    wordInfo: PropTypes.shape({
      transcription: PropTypes.shape({
        uk: PropTypes.string.isRequired,
        us: PropTypes.string.isRequired,
      }),
      nouns: PropTypes.arrayOf(PropTypes.string).isRequired,
      verbs: PropTypes.arrayOf(PropTypes.string).isRequired,
      mainMeaning: PropTypes.string.isRequired,
      phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
      word: PropTypes.string.isRequired,
    }).isRequired,
    playerStatus: PropTypes.shape({
      uk: PropTypes.oneOf([Sound.status.PLAYING, Sound.status.STOPPED, Sound.status.PAUSED])
        .isRequired,
      us: PropTypes.oneOf([Sound.status.PLAYING, Sound.status.STOPPED, Sound.status.PAUSED])
        .isRequired,
    }),
  };

  static defaultProps = {
    playerStatus: {
      uk: Sound.status.STOPPED,
      us: Sound.status.STOPPED,
    },
  };

  render() {
    const { wordInfo, playerStatus } = this.props;

    if (isEmpty(wordInfo.word)) return <div />;

    return (
      <div>
        <div>
          {wordInfo.transcription.uk} <Sound url={link} playStatus={playerStatus.uk} />
          {wordInfo.transcription.uk} <Sound url={link} playStatus={playerStatus.uk} />
        </div>
        <Volume /> {JSON.stringify(this.props.wordInfo)}
      </div>
    );
  }
}
