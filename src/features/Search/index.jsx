import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchComponent from './components/Search';

import { UPDATE_WORD, START_LOAD_WORD_TIPS } from './services/constants';

class Search extends PureComponent {
  static propTypes = {
    word: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    callbacks: PropTypes.shape({
      updateText: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (<SearchComponent
      text={this.props.word}
      tips={this.props.tips}
      updateText={this.props.callbacks.updateText}
    />);
  }
}

const mapStateToProps = (state) => ({
  tips: state.search.tips,
  word: state.search.word,
});

const mapsDispatchToProps = (dispatch) => {
  const updateText = value => {
    dispatch({ type: UPDATE_WORD, payload: { word: value } });
    dispatch({ type: START_LOAD_WORD_TIPS, payload: { word: value } });
  };

  return { callbacks: { updateText } };
};

export default connect(mapStateToProps, mapsDispatchToProps)(Search);
