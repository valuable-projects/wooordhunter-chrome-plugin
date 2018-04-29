import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './settings.css';

export default class componentName extends PureComponent {
  static propTypes = {
    clearHistory: PropTypes.func.isRequired,
  };

  clearHistory = (event) => {
    event.preventDefault();

    this.props.clearHistory();
  };

  render() {
    return (
      <Paper className="settings-customization-area" zDepth={3}>
        <RaisedButton onClick={this.clearHistory} fullWidth>
          Очистить историю
        </RaisedButton>
      </Paper>
    );
  }
}
