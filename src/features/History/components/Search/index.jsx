import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import './search.css';

export default class Search extends PureComponent {
  static propTypes = {
    query: PropTypes.string,
    updateSearchQuery: PropTypes.func.isRequired,
  };

  static defaultProps = {
    query: '',
  };

  updateText = (event, text) => {
    event.preventDefault();

    this.props.updateSearchQuery(text);
  };

  render() {
    return (
      <div className="history-search">
        <TextField
          floatingLabelText="Поиск по истории"
          fullWidth
          id="word-history-search"
          onChange={this.updateText}
          value={this.props.query}
        />
      </div>
    );
  }
}
