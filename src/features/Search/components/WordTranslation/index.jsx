import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import isEmpty from 'lodash/isEmpty';

import SoundPlayer from './components/SoundPlayer';

import SingleWordTranslation from './components/SingleWordTranslation';
import SingleSentenceExample from './components/SingleSentenceExample';
import SettingsContext from '../../../../services/contexts/settings';

import './translation.css';

export default class WordTranslation extends PureComponent {
  static propTypes = {
    wordInfo: PropTypes.shape({
      commonMeanings: PropTypes.arrayOf(PropTypes.string).isRequired,
      mainMeaning: PropTypes.string.isRequired,
      nouns: PropTypes.arrayOf(PropTypes.string).isRequired,
      phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
      transcription: PropTypes.shape({
        uk: PropTypes.string.isRequired,
        us: PropTypes.string.isRequired,
      }),
      verbs: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  get hasCommonMeanings() {
    const { wordInfo } = this.props;

    return !isEmpty(wordInfo.commonMeanings);
  }

  get hasNounMeaning() {
    const { wordInfo } = this.props;

    return !isEmpty(wordInfo.nouns);
  }

  get hasVerbMeaning() {
    const { wordInfo } = this.props;

    return !isEmpty(wordInfo.verbs);
  }

  render() {
    const { wordInfo, playerStatus } = this.props;

    if (isEmpty(wordInfo.word)) return <div />;

    return (
      <div className="word-translation-container">
        <div>
          <SettingsContext.Consumer>
            {config => [
              <SoundPlayer
                description="брит."
                id="uk"
                onClick={this.onPlayerClick}
                onFinish={this.onFinish}
                playerStatus={playerStatus.uk}
                soundUrl={`${config.wooordhuntUKSoundPrefix}/${wordInfo.word}.mp3`}
                transcription={wordInfo.transcription.uk}
              />,
              <SoundPlayer
                description="амер."
                id="us"
                onClick={this.onPlayerClick}
                onFinish={this.onFinish}
                playerStatus={playerStatus.us}
                soundUrl={`${config.wooordhuntUSSoundPrefix}/${wordInfo.word}.mp3`}
                transcription={wordInfo.transcription.us}
              />,
            ]}
          </SettingsContext.Consumer>
        </div>
        {this.hasCommonMeanings && (
          <div>
            <h3 className="word-translation-title">Значения</h3>
            {wordInfo.commonMeanings.map(text => <SingleWordTranslation text={text} />)}
          </div>
        )}
        {this.hasNounMeaning && (
          <div>
            <h3 className="word-translation-title">Существительное</h3>
            {wordInfo.nouns.map(text => <SingleWordTranslation text={text} />)}
          </div>
        )}
        {this.hasVerbMeaning && (
          <div>
            <h3 className="word-translation-title">Глагол</h3>
            {wordInfo.verbs.map(text => <SingleWordTranslation text={text} />)}
          </div>
        )}
        <div>
          <h3 className="word-translation-title">Словосочетания</h3>
          {wordInfo.phrases.map(text => <SingleSentenceExample text={text} />)}
        </div>
      </div>
    );
  }
}
