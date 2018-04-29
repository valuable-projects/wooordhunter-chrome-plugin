import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

import { GET_WORDS_FROM_HISTORY, DELETE_WORD_FROM_HISTORY } from './services/constants';

import HistoryLine from './components/HistoryLine';
import Search from './components/Search';

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

  state = {
    query: '',
  };

  componentDidMount() {
    this.props.getWordsFromHistory();
  }

  getWordsFromHistory = debounce((options) => {
    this.props.getWordsFromHistory(options);
  }, 500);

  deleteWordFromHistory = (id) => {
    this.props.deleteWordFromHistory({ id });
  };

  updateSearchQuery = (query) => {
    this.setState({ query });
    this.getWordsFromHistory({ query });
  };

  translateWord = (word) => {
    this.props.push(`/?word=${word}`);
  };

  render() {
    const { words } = this.props;

    return (
      <div>
        <Search query={this.state.query} updateSearchQuery={this.updateSearchQuery} />
        {words.map(record => (
          <HistoryLine
            id={record.id}
            key={record.id}
            onClick={this.translateWord}
            onDelete={this.deleteWordFromHistory}
            word={record.word}
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
