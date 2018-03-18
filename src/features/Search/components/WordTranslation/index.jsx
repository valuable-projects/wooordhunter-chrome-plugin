import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import isEmpty from 'lodash/isEmpty';

import Volume from 'material-ui/svg-icons/av/volume-up';

import SoundPlayer from './components/SoundPlayer';

const link = 'http://wooordhunt.ru/data/sound/word/uk/mp3/word.mp3';

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
    onChangePlayerStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    playerStatus: {
      uk: Sound.status.STOPPED,
      us: Sound.status.STOPPED,
    },
  };

  onFinish = (key) => {
    this.props.onChangePlayerStatus(key, Sound.status.STOPPED);
  };

  onPlayerClick = (key) => {
    this.props.onChangePlayerStatus(key, Sound.status.PLAYING);
  };

  render() {
    const { wordInfo, playerStatus } = this.props;

    if (isEmpty(wordInfo.word)) return <div />;

    return (
      <div>
        <div>
          <SoundPlayer
            description="брит."
            id="uk"
            onClick={this.onPlayerClick}
            onFinish={this.onFinish}
            playerStatus={playerStatus.uk}
            soundUrl={`http://wooordhunt.ru/data/sound/word/uk/mp3/${wordInfo.word}.mp3`}
            transcription={wordInfo.transcription.uk}
          />
          <SoundPlayer
            description="амер."
            id="us"
            onClick={this.onPlayerClick}
            onFinish={this.onFinish}
            playerStatus={playerStatus.us}
            soundUrl={`http://wooordhunt.ru/data/sound/word/us/mp3/${wordInfo.word}.mp3`}
            transcription={wordInfo.transcription.us}
          />
        </div>
        <div>
          <h3>Существительное</h3>
          {wordInfo.nouns.map(line => <div key={line}>{line}</div>)}
        </div>
        <div>
          <h3>Глагол</h3>
          {wordInfo.verbs.map(line => <div key={line}>{line}</div>)}
        </div>
        <div>
          <h3>Словосочетания</h3>
          {wordInfo.phrases.map(line => <div key={line}>{line}</div>)}
        </div>
      </div>
    );
  }
}
