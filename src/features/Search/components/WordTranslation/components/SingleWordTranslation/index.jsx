import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './translation.css';

export default class SingleWordTranslation extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const { text } = this.props;

    return <div className="single-word-translation-container">- {text}</div>;
  }
}
