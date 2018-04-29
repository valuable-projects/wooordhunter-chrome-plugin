import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import SettingsComponent from './components/Settings';

import { CLEAR_HISTORY } from './services/constants';

class Settings extends PureComponent {
  static propTypes = {
    clearHistory: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <SettingsComponent clearHistory={this.props.clearHistory} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const clearHistory = () => dispatch({ type: CLEAR_HISTORY });

  return { clearHistory };
};

export default connect(null, mapDispatchToProps)(Settings);
