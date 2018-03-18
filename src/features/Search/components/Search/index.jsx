import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';

import './search.css';

export default class Search extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateText: PropTypes.func.isRequired,
    translateWord: PropTypes.func.isRequired,
  };

  translateWord = (event) => {
    event.preventDefault();
    this.props.translateWord(this.props.text);
  };

  render() {
    const { text, tips } = this.props;

    return (
      <form className="search-body" onSubmit={this.translateWord}>
        <AutoComplete
          dataSource={tips}
          filter={() => true}
          fullWidth
          hintText="Введите слово для поиска"
          maxSearchResults={5}
          onUpdateInput={this.props.updateText}
          openOnFocus
          searchText={text}
        />
      </form>
    );
  }
}
