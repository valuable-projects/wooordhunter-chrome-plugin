import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchComponent from './components/Search';
import WordTranslation from './components/WordTranslation';

import { UPDATE_WORD, START_LOAD_WORD_TIPS, START_LOAD_WORD } from './services/constants';

class Search extends PureComponent {
  static propTypes = {
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

  render() {
    return (
      <div>
        <SearchComponent
          text={this.props.word}
          tips={this.props.tips}
          updateText={this.props.callbacks.updateText}
          translateWord={this.props.callbacks.translateWord}
        />
        <WordTranslation wordInfo={this.props.wordInfo} />
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
