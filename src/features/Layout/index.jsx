import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';

import Header from './components/Header';

import config from '../../config';
import SettingsContext from '../../services/contexts/settings';

import './layout.css';

class Layout extends PureComponent {
  static propTypes = {
    children: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object,
  };

  componentWillMount() {
    const { location } = this.props;

    if (location.pathname === '/index.html') {
      this.props.push('/');
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="layout-body">
          <Header />
          <SettingsContext.Provider value={config}>
            {/* We need to put div here, because Provider can wrap only single element */}
            <div>{this.props.children}</div>
          </SettingsContext.Provider>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  push,
};

export default withRouter(connect(null, mapDispatchToProps)(Layout));
