import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Sound from 'react-sound';

import SearchComponent from './components/Search';
import WordTranslation from './components/WordTranslation';

import { UPDATE_WORD, START_LOAD_WORD_TIPS, START_LOAD_WORD } from './services/constants';

class Search extends PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string,
    }).isRequired,
    word: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    wordInfo: PropTypes.shape({
      transcription: PropTypes.shape({
        uk: PropTypes.string.isRequired,
        us: PropTypes.string.isRequired,
      }),
      nouns: PropTypes.arrayOf(PropTypes.string).isRequired,
      verbs: PropTypes.arrayOf(PropTypes.string).isRequired,
      mainMeaning: PropTypes.string.isRequired,
      phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    callbacks: PropTypes.shape({
      updateText: PropTypes.func.isRequired,
      translateWord: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    playerStatus: {
      uk: Sound.status.STOPPED,
      us: Sound.status.STOPPED,
    },
  };

  componentDidMount() {
    const { search } = this.props.location;

    if (search) {
      const { word } = queryString.parse(search);

      this.props.callbacks.updateText(word);
      this.props.callbacks.translateWord(word);
    }
  }

  onChangePlayerStatus = (key, status) => {
    const { playerStatus } = this.state;

    this.setState({ ...this.state, playerStatus: { ...playerStatus, [key]: status } });
  };

  render() {
    return (
      <div>
        <SearchComponent
          text={this.props.word}
          tips={this.props.tips}
          updateText={this.props.callbacks.updateText}
          translateWord={this.props.callbacks.translateWord}
        />
        <WordTranslation
          wordInfo={this.props.wordInfo}
          playerStatus={this.state.playerStatus}
          onChangePlayerStatus={this.onChangePlayerStatus}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tips: state.search.tips,
  word: state.search.word,
  wordInfo: state.search.wordInfo,
});

const mapsDispatchToProps = (dispatch) => {
  const updateText = (value) => {
    dispatch({ type: UPDATE_WORD, payload: { word: value } });
    dispatch({ type: START_LOAD_WORD_TIPS, payload: { word: value } });
  };
  const translateWord = (value) => {
    dispatch({ type: START_LOAD_WORD, payload: { word: value } });
  };

  return { callbacks: { updateText, translateWord } };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Search);
