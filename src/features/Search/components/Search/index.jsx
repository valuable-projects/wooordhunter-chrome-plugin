import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AutoComplete from 'material-ui/AutoComplete';

import './search.css';

export default class Search extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    tips: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateText: PropTypes.func.isRequired,
  };

  render() {
    const { text, tips } = this.props;

    return (
      <div className="search-body">
        <AutoComplete
          hintText="Введите слово для поиска"
          searchText={text}
          onUpdateInput={this.props.updateText}
          dataSource={tips}
          openOnFocus={true}
          filter={() => true}
          maxSearchResults={5}
          fullWidth
        />
      </div>
    );
  }
}
