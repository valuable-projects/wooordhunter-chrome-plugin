import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

import { GET_WORDS_FROM_HISTORY, DELETE_WORD_FROM_HISTORY } from './services/constants';

import HistoryLine from './components/HistoryLine';

class History extends PureComponent {
  static propTypes = {
    deleteWordFromHistory: PropTypes.func.isRequired,
    getWordsFromHistory: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    words: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      word: PropTypes.string,
    })),
  };

  static defaultProps = {
    words: [],
  };

  componentDidMount() {
    this.props.getWordsFromHistory();
  }

  translateWord = (word) => {
    this.props.push(`/?word=${word}`);
  };

  deleteWordFromHistory = (id) => {
    this.props.deleteWordFromHistory({ id });
  };

  render() {
    const { words } = this.props;

    return (
      <div>
        {words.map(record => (
          <HistoryLine
            key={record.id}
            id={record.id}
            word={record.word}
            onClick={this.translateWord}
            onDelete={this.deleteWordFromHistory}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  words: state.history.words,
});

const mapDispatchToProps = (dispatch) => {
  const getWordsFromHistory = ({ query } = {}) => {
    dispatch({ type: GET_WORDS_FROM_HISTORY, payload: { query } });
  };
  const deleteWordFromHistory = ({ id } = {}) => {
    dispatch({ type: DELETE_WORD_FROM_HISTORY, payload: { id } });
  };

  return { getWordsFromHistory, push: (...args) => dispatch(push(...args)), deleteWordFromHistory };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(History));
